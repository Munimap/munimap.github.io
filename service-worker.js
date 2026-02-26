// =========================================================
// GMTW Trail Map - Service Worker v4
// Strategien:
//   App-Shell (HTML/CSS/JS/Icons): Cache-First
//   Karten-Tiles (OTM/Esri):      Network-First + Cache-Fallback
//   Fonts (Bunny Fonts DSGVO):    Stale-While-Revalidate
//   Sonstiges:                    Network-First + Cache-Fallback
//
// Offline-GPS-Hinweis:
//   GPS-Position kommt vom Geraete-Hardware (navigator.geolocation).
//   Bei Offline-Betrieb werden bereits gecachte Karten-Tiles angezeigt.
//   Neuer Standort wird nahtlos auf dem gecachten Kartenbild dargestellt.
// =========================================================

const SW_VERSION  = 'gmtw-v4';
const SHELL_CACHE = SW_VERSION + '-shell';
const TILE_CACHE  = SW_VERSION + '-tiles';
const DATA_CACHE  = SW_VERSION + '-data';

// Max. Tile-Cache-Groesse: FIFO-Rotation verhindert unendlichen Speicher
const MAX_TILE_CACHE = 2000;

// App-Shell Assets: werden beim Install vorab gecacht (alle offline verfügbar)
const SHELL_ASSETS = [
  './GMTW_Map.html',
  './manifest.json',
  // Leaflet (Karten-Engine)
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  // Offline-Speicher (IndexedDB-Wrapper)
  'https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js',
  // Geospatial-Berechnungen (Distanz, Checkpoints, Startlinie)
  'https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js',
  // QR-Code-Erkennung (Kamera-Scanner)
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js',
  // Fonts: DSGVO-konformes EU-Hosting (Bunny Fonts statt Google Fonts)
  'https://fonts.bunny.net/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap',
];

// Tile-URL-Erkennungsmuster
const TILE_PATTERNS = [
  /opentopomap\.org/,
  /arcgisonline\.com/,
  /tile\.openstreetmap\.org/,
];

// Font-Muster (Bunny Fonts: DSGVO-konform, EU-Hosting)
const FONT_PATTERNS = [
  /fonts\.bunny\.net/,
  /fonts\.gstatic\.com/,
];

// ==========================================================
// INSTALL: App-Shell vorab cachen
// ==========================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Install:', SW_VERSION);
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache =>
      // Alle Shell-Assets einzeln cachen (ein Fehler blockiert nicht den Rest)
      Promise.allSettled(
        SHELL_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Shell-Cache miss:', url, err.message))
        )
      )
    ).then(() => self.skipWaiting())
  );
});

// ==========================================================
// ACTIVATE: Alte Cache-Versionen aufraeumen
// ==========================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate:', SW_VERSION);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== SHELL_CACHE && k !== TILE_CACHE && k !== DATA_CACHE)
          .map(k => {
            console.log('[SW] Loesche alten Cache:', k);
            return caches.delete(k);
          })
      ))
      .then(() => self.clients.claim())
  );
});

// ==========================================================
// FETCH: Request abfangen und Strategie anwenden
// ==========================================================
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = req.url;

  // Nur GET, nur HTTP(S)
  if (req.method !== 'GET') return;
  if (!url.startsWith('http')) return;

  // Karten-Tiles: Network-First + Offline-Cache-Fallback
  if (TILE_PATTERNS.some(p => p.test(url))) {
    event.respondWith(networkFirstTile(req));
    return;
  }

  // Fonts: Stale-While-Revalidate (schnell + aktuell)
  if (FONT_PATTERNS.some(p => p.test(url))) {
    event.respondWith(staleWhileRevalidate(req, SHELL_CACHE));
    return;
  }

  // App-Shell: Cache-First (schnellste Ladezeit)
  if (isShellAsset(url)) {
    event.respondWith(cacheFirst(req, SHELL_CACHE));
    return;
  }

  // Alles andere: Network-First mit Cache-Fallback
  event.respondWith(networkFirstGeneral(req));
});

// ==========================================================
// STRATEGIE: Cache-First
// Asset aus Cache laden; nur bei Cache-Miss vom Netz holen.
// ==========================================================
async function cacheFirst(req, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;

  try {
    const fresh = await fetch(req);
    if (fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch(e) {
    return new Response('Offline - Ressource nicht gecacht', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// ==========================================================
// STRATEGIE: Network-First fuer Karten-Tiles
// Neues Tile vom Netz -> in Cache speichern.
// Bei Offline -> gecachtes Tile oder transparentes PNG.
// Cache-Rotation verhindert unendlichen Speicherwachstum.
// ==========================================================
async function networkFirstTile(req) {
  const cache = await caches.open(TILE_CACHE);

  try {
    const response = await fetch(req, { cache: 'no-store' });
    if (response.ok) {
      // Tile im Cache speichern (clone: Body kann nur einmal gelesen werden)
      cache.put(req, response.clone());
      // FIFO-Rotation asynchron ausfuehren (blockiert nicht den Response)
      trimCache(TILE_CACHE, MAX_TILE_CACHE);
    }
    return response;
  } catch(e) {
    // Offline: gecachtes Tile zurueckgeben
    const cached = await cache.match(req);
    if (cached) {
      console.log('[SW] Offline-Tile aus Cache:', req.url);
      return cached;
    }

    // Platzhalter: transparentes 1x1 PNG (Karte bleibt weiss, aber bricht nicht)
    const transparentPng = Uint8Array.from(
      atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='),
      c => c.charCodeAt(0)
    );
    return new Response(transparentPng, {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    });
  }
}

// ==========================================================
// STRATEGIE: Stale-While-Revalidate
// Sofort aus Cache antworten; im Hintergrund aktualisieren.
// Ideal fuer Fonts und andere selten aendernde Ressourcen.
// ==========================================================
async function staleWhileRevalidate(req, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(req);

  // Im Hintergrund aktualisieren (kein await => nicht blockierend)
  const fetchPromise = fetch(req)
    .then(fresh => {
      if (fresh.ok) cache.put(req, fresh.clone());
      return fresh;
    })
    .catch(() => { /* Offline - ignorieren */ });

  // Gecachte Version sofort zurueck, oder auf Netz warten
  return cached || fetchPromise;
}

// ==========================================================
// STRATEGIE: Network-First (allgemein)
// Netz bevorzugen, bei Fehler Cache-Fallback.
// ==========================================================
async function networkFirstGeneral(req) {
  const cache = await caches.open(DATA_CACHE);
  try {
    const fresh = await fetch(req);
    if (fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch(e) {
    const cached = await cache.match(req);
    return cached || new Response('Offline', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// ==========================================================
// HILFSFUNKTION: Cache-Groesse begrenzen (FIFO)
// Entfernt aelteste Eintraege, wenn maxEntries ueberschritten.
// Verhindert, dass der Tile-Cache den Geraete-Speicher fuellt.
// ==========================================================
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys  = await cache.keys();

  if (keys.length > maxEntries) {
    // Aelteste Eintraege (Anfang der Liste) loeschen
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map(k => cache.delete(k)));
    console.log('[SW] Tile-Cache Rotation:', toDelete.length, 'Eintraege entfernt,', maxEntries, 'verbleiben');
  }
}

// ==========================================================
// HILFSFUNKTION: Shell-Asset erkennen
// ==========================================================
function isShellAsset(url) {
  return SHELL_ASSETS.some(asset => {
    // Relative Pfade: Dateiname im URL suchen
    if (!asset.startsWith('http')) {
      return url.includes(asset.replace('./', ''));
    }
    // Absolute Pfade: URL-Anfang ohne Query-Parameter vergleichen
    return url.startsWith(asset.split('?')[0]);
  });
}

// ==========================================================
// MESSAGE HANDLER: App <-> Service Worker Kommunikation
// ==========================================================
self.addEventListener('message', (event) => {
  if (!event.data) return;

  switch (event.data.type) {
    case 'SKIP_WAITING':
      // App fordert sofortige Aktivierung des neuen SW
      self.skipWaiting();
      break;

    case 'CLEAR_TILE_CACHE':
      // App-seitig ausgeloest: Tile-Cache komplett leeren
      caches.delete(TILE_CACHE).then(() => {
        console.log('[SW] Tile-Cache manuell geleert');
        event.ports[0]?.postMessage({ success: true });
      });
      break;

    case 'GET_CACHE_SIZE':
      // Cache-Statistik an die App senden
      Promise.all([
        caches.open(TILE_CACHE).then(c => c.keys()),
        caches.open(SHELL_CACHE).then(c => c.keys()),
        caches.open(DATA_CACHE).then(c => c.keys()),
      ]).then(([tiles, shell, data]) => {
        event.ports[0]?.postMessage({
          tileCount:  tiles.length,
          shellCount: shell.length,
          dataCount:  data.length,
          total:      tiles.length + shell.length + data.length,
        });
      });
      break;
  }
});
