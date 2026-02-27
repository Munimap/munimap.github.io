// =========================================================
// GMTW Trail Map — Service Worker v6
// OFFLINE-FIRST: Echte 95%+ Offline-Fähigkeit
//
// Cache-Strategien:
//   Navigations-Requests (HTML):  Network-First → Cache → Offline-Fallback
//   App-Shell (JS/CSS/Icons/Libs): Cache-First
//   Karten-Tiles:                  Network-First → Cache → Transparent-PNG
//   Fonts (Bunny/Gstatic):         Stale-While-Revalidate (eigener Cache)
//   GPX-Tracks:                    Cache-First + Hintergrund-Update
//   Sonstiges:                     Network-First → Cache-Fallback
//
// v6 Verbesserungen gegenüber v5:
//   • Eigener FONT_CACHE (Font-Dateien getrennt gecacht)
//   • Navigation-Handler: index.html aus Shell-Cache bei Offline
//   • Offline-Fallback-HTML-Seite bei totalem Offline
//   • PREFETCH_TILES Message: Karten-Bereich vorab cachen
//   • CLEAR_ALL_CACHES: Factory-Reset per App-Befehl
//   • Robusteres ACTIVATE: alle ungültigen Caches löschen
// =========================================================

const SW_VERSION  = 'gmtw-v6';
const SHELL_CACHE = SW_VERSION + '-shell';
const TILE_CACHE  = SW_VERSION + '-tiles';
const DATA_CACHE  = SW_VERSION + '-data';
const GPX_CACHE   = SW_VERSION + '-gpx';
const FONT_CACHE  = SW_VERSION + '-fonts';

const MAX_TILE_CACHE = 3000;
const MAX_GPX_CACHE  = 200;
const MAX_FONT_CACHE = 150;

// App-Shell: beim Install vorab cachen (alle für 100% Offline-Betrieb)
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // App-Icons (für Installierbarkeit & Offline-Icon)
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  // Leaflet (Karten-Engine — kritisch)
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  // Offline-Speicher (IndexedDB-Wrapper — kritisch)
  'https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js',
  // Geospatial-Berechnungen
  'https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js',
  // QR-Code-Scanner
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js',
  // Bunny Fonts CSS (DSGVO-konformes EU-Hosting)
  'https://fonts.bunny.net/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap',
];

// URL-Muster für Routing-Entscheidungen
const TILE_PATTERNS = [
  /opentopomap\.org/,
  /arcgisonline\.com/,
  /tile\.openstreetmap\.org/,
  /tile\.waymarkedtrails\.org/,
  /maps\.wikimedia\.org/,
];

const FONT_PATTERNS = [
  /fonts\.bunny\.net/,
  /fonts\.gstatic\.com/,
];

const GPX_PATTERNS = [
  /raw\.githubusercontent\.com.*\.gpx/i,
  /munimap\.github\.io.*\.gpx/i,
  /\.gpx(\?.*)?$/i,
];

// Transparentes 1x1 PNG als Tile-Platzhalter (Karte bricht nicht)
const TRANSPARENT_PNG = Uint8Array.from(
  atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='),
  c => c.charCodeAt(0)
);

// Offline-Fallback-Seite
const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0b0e14">
<title>GMTW Map - Offline</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e14;color:#e0e6f0;
     display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
.box{max-width:360px;width:100%;text-align:center}
.ico{font-size:72px;line-height:1;margin-bottom:16px}
h1{font-size:26px;font-weight:800;color:#c8ff00;letter-spacing:.5px;text-transform:uppercase;margin-bottom:10px}
p{color:#8a9ab5;line-height:1.6;margin-bottom:8px;font-size:14px}
.tip{background:#161b25;border:1px solid #2a3349;border-radius:12px;padding:14px;
     font-size:12px;color:#6b7a99;line-height:1.9;margin-top:16px;text-align:left}
.tip strong{color:#c8ff00}
button{background:#c8ff00;color:#0b0e14;border:none;border-radius:12px;
       padding:14px 28px;font-size:13px;font-weight:800;cursor:pointer;
       margin-top:20px;letter-spacing:.5px;text-transform:uppercase;width:100%}
button:active{opacity:.8}
</style>
</head>
<body>
<div class="box">
  <div class="ico">🗺️</div>
  <h1>Kein Internet</h1>
  <p>Die GMTW Trail Map ist gerade nicht erreichbar.</p>
  <p>Öffne die App einmal mit Internet, damit alle Karten-Daten lokal gespeichert werden.</p>
  <div class="tip">
    <strong>Tipp fuer Offline-Betrieb:</strong><br>
    ① Oeffne die App mit WLAN oder Mobilnetz<br>
    ② Zoome auf das Trail-Gebiet<br>
    ③ Tippe Einstellungen → App → Karten-Bereich cachen<br>
    ④ Danach funktioniert die App vollstaendig offline! 🎉
  </div>
  <button onclick="location.reload()">🔄 Erneut versuchen</button>
</div>
</body>
</html>`;

// ==========================================================
// INSTALL: App-Shell vorab cachen
// ==========================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Install:', SW_VERSION);
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache =>
      // allSettled: ein Fehler bricht nicht den gesamten Install ab
      Promise.allSettled(
        SHELL_ASSETS.map(url =>
          cache.add(url).catch(err =>
            console.warn('[SW] Shell-Cache miss:', url, err.message)
          )
        )
      )
    ).then(() => {
      console.log('[SW] Shell gecacht, skipWaiting...');
      return self.skipWaiting();
    })
  );
});

// ==========================================================
// ACTIVATE: Alte Cache-Versionen bereinigen
// ==========================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate:', SW_VERSION);
  const validCaches = new Set([SHELL_CACHE, TILE_CACHE, DATA_CACHE, GPX_CACHE, FONT_CACHE]);

  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => !validCaches.has(k))
          .map(k => {
            console.log('[SW] Loesche alten Cache:', k);
            return caches.delete(k);
          })
      ))
      .then(() => {
        console.log('[SW] Aktiv, claim clients...');
        return self.clients.claim();
      })
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

  // 1. Navigations-Requests: Shell-First mit Offline-Fallback
  if (req.mode === 'navigate') {
    event.respondWith(handleNavigation(req));
    return;
  }

  // 2. Karten-Tiles: Network-First → Cache-Fallback → Transparent-PNG
  if (TILE_PATTERNS.some(p => p.test(url))) {
    event.respondWith(networkFirstTile(req));
    return;
  }

  // 3. Fonts: Stale-While-Revalidate (eigener Cache)
  if (FONT_PATTERNS.some(p => p.test(url))) {
    event.respondWith(staleWhileRevalidate(req, FONT_CACHE, MAX_FONT_CACHE));
    return;
  }

  // 4. GPX-Tracks: Cache-First + Hintergrund-Update
  if (GPX_PATTERNS.some(p => p.test(url))) {
    event.respondWith(cacheFirstWithNetworkFallback(req, GPX_CACHE, MAX_GPX_CACHE));
    return;
  }

  // 5. App-Shell (Bibliotheken, Icons, CSS): Cache-First
  if (isShellAsset(url)) {
    event.respondWith(cacheFirst(req, SHELL_CACHE));
    return;
  }

  // 6. Rest: Network-First mit Cache-Fallback
  event.respondWith(networkFirstGeneral(req));
});

// ==========================================================
// NAVIGATION: index.html aus Cache, Offline-Seite als Fallback
// ==========================================================
async function handleNavigation(req) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const fresh = await fetch(req);
    if (fresh.ok) {
      cache.put(req, fresh.clone());
      return fresh;
    }
    throw new Error('Bad status: ' + fresh.status);
  } catch (e) {
    // Offline: gecachte index.html zurueckgeben
    const cached = await cache.match('./index.html')
                || await cache.match('./')
                || await cache.match(req);
    if (cached) {
      console.log('[SW] Navigation offline -> gecachte index.html');
      return cached;
    }
    // Letzter Ausweg: statische Offline-Seite
    console.log('[SW] Navigation offline -> Offline-Fallback-Seite');
    return new Response(OFFLINE_HTML, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}

// ==========================================================
// STRATEGIE: Cache-First (Shell-Assets)
// ==========================================================
async function cacheFirst(req, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;

  try {
    const fresh = await fetch(req);
    if (fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    return new Response('Offline - Ressource nicht gecacht', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// ==========================================================
// STRATEGIE: Cache-First + Hintergrund-Update (GPX)
// ==========================================================
async function cacheFirstWithNetworkFallback(req, cacheName, maxEntries) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(req);

  if (cached) {
    // Hintergrund-Aktualisierung (nicht blockierend)
    fetch(req).then(fresh => {
      if (fresh && fresh.ok) cache.put(req, fresh.clone());
    }).catch(() => {});
    return cached;
  }

  try {
    const fresh = await fetch(req);
    if (fresh.ok) {
      cache.put(req, fresh.clone());
      if (maxEntries) trimCache(cacheName, maxEntries);
    }
    return fresh;
  } catch (e) {
    return new Response('GPX offline nicht verfuegbar', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// ==========================================================
// STRATEGIE: Network-First fuer Karten-Tiles
// ==========================================================
async function networkFirstTile(req) {
  const cache = await caches.open(TILE_CACHE);

  try {
    const response = await fetch(req, { cache: 'no-store' });
    if (response.ok) {
      cache.put(req, response.clone());
      trimCache(TILE_CACHE, MAX_TILE_CACHE);
    }
    return response;
  } catch (e) {
    const cached = await cache.match(req);
    if (cached) return cached;

    return new Response(TRANSPARENT_PNG, {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    });
  }
}

// ==========================================================
// STRATEGIE: Stale-While-Revalidate (Fonts)
// ==========================================================
async function staleWhileRevalidate(req, cacheName, maxEntries) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(req);

  const fetchPromise = fetch(req)
    .then(fresh => {
      if (fresh && fresh.ok) {
        cache.put(req, fresh.clone());
        if (maxEntries) trimCache(cacheName, maxEntries);
      }
      return fresh;
    })
    .catch(() => null);

  return cached || fetchPromise;
}

// ==========================================================
// STRATEGIE: Network-First allgemein
// ==========================================================
async function networkFirstGeneral(req) {
  const cache = await caches.open(DATA_CACHE);
  try {
    const fresh = await fetch(req);
    if (fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached || new Response('Offline', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// ==========================================================
// HILFSFUNKTION: Cache-Groesse begrenzen (FIFO-Rotation)
// ==========================================================
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys  = await cache.keys();

  if (keys.length > maxEntries) {
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map(k => cache.delete(k)));
    console.log('[SW] Rotation:', cacheName, '-', toDelete.length, 'entfernt,', maxEntries, 'behalten');
  }
}

// ==========================================================
// HILFSFUNKTION: Shell-Asset erkennen
// ==========================================================
function isShellAsset(url) {
  return SHELL_ASSETS.some(asset => {
    if (!asset.startsWith('http')) {
      return url.includes(asset.replace('./', ''));
    }
    return url.startsWith(asset.split('?')[0]);
  });
}

// ==========================================================
// MESSAGE HANDLER: Kommunikation mit der App
// ==========================================================
self.addEventListener('message', (event) => {
  if (!event.data) return;

  switch (event.data.type) {

    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'CLEAR_TILE_CACHE':
      caches.delete(TILE_CACHE).then(() => {
        console.log('[SW] Tile-Cache manuell geleert');
        event.ports[0]?.postMessage({ success: true });
      });
      break;

    // GPX-Tracks aggressiv vorab cachen
    case 'PREFETCH_GPX':
      if (Array.isArray(event.data.urls)) {
        caches.open(GPX_CACHE).then(cache => {
          const fetches = event.data.urls.map(url =>
            cache.match(url).then(cached => {
              if (cached) return;
              return fetch(url)
                .then(r => { if (r && r.ok) cache.put(url, r); })
                .catch(err => console.warn('[SW] GPX prefetch miss:', url, err.message));
            })
          );
          return Promise.allSettled(fetches);
        }).then(() => {
          event.ports[0]?.postMessage({ success: true, count: event.data.urls.length });
        });
      }
      break;

    // Karten-Tiles fuer eine Region vorab cachen
    case 'PREFETCH_TILES':
      if (Array.isArray(event.data.urls)) {
        caches.open(TILE_CACHE).then(async cache => {
          let cached = 0, fetched = 0, failed = 0;
          for (const url of event.data.urls) {
            const hit = await cache.match(url);
            if (hit) { cached++; continue; }
            try {
              const r = await fetch(url, { cache: 'no-store' });
              if (r && r.ok) {
                cache.put(url, r.clone());
                fetched++;
              } else {
                failed++;
              }
            } catch (e) {
              failed++;
            }
          }
          await trimCache(TILE_CACHE, MAX_TILE_CACHE);
          console.log('[SW] Tile-Prefetch:', fetched, 'neu,', cached, 'cached,', failed, 'Fehler');
          event.ports[0]?.postMessage({ success: true, count: fetched + cached, fetched, cached, failed });
        });
      }
      break;

    // Cache-Statistik an App senden
    case 'GET_CACHE_SIZE':
      Promise.all([
        caches.open(TILE_CACHE).then(c  => c.keys()),
        caches.open(SHELL_CACHE).then(c => c.keys()),
        caches.open(DATA_CACHE).then(c  => c.keys()),
        caches.open(GPX_CACHE).then(c   => c.keys()),
        caches.open(FONT_CACHE).then(c  => c.keys()),
      ]).then(([tiles, shell, data, gpx, fonts]) => {
        event.ports[0]?.postMessage({
          tileCount:  tiles.length,
          shellCount: shell.length,
          dataCount:  data.length,
          gpxCount:   gpx.length,
          fontCount:  fonts.length,
          total:      tiles.length + shell.length + data.length + gpx.length + fonts.length,
        });
      });
      break;

    // Alle Caches leeren (Factory-Reset)
    case 'CLEAR_ALL_CACHES':
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
        .then(() => {
          console.log('[SW] Alle Caches geleert');
          event.ports[0]?.postMessage({ success: true });
        });
      break;
  }
});
