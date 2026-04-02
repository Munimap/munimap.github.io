# GMTW Trail Map — Vollständige Anwendungsspezifikation

**Version:** 2.0
**Stand:** 2026-04-02
**Typ:** Progressive Web App (PWA), Offline-First, Serverless
**Technologie:** Vanilla JavaScript, HTML5, CSS3, Leaflet.js, Service Worker
**Zielgruppe:** Teilnehmer des German Muni Trail Weekend (GMTW) 2026
**Einsatzort:** Hohensyburg / Herdecke (NRW, Deutschland)

---

## 1. ARCHITEKTUR-ÜBERSICHT

### 1.1 Dateistruktur

```
munimap.github.io-main/
├── index.html              # Monolithische App (~14.750 Zeilen, ~680 KB)
├── service-worker.js       # Offline-Caching-Strategie (~540 Zeilen)
├── manifest.json           # PWA-Manifest
├── icons/                  # 13 PNG-Icons (16×16 bis 512×512)
│   ├── icon-16x16.png
│   └── ... (12 weitere Größen)
└── gpx/                    # 6 vordefinierte Event-Strecken
    ├── GMTW2026_Beginner.gpx
    ├── GMTW2026_Beginner_Intermediate.gpx
    ├── GMTW2026_Expert_1.gpx
    ├── GMTW2026_Expert_2.gpx
    ├── GMTW2026_Expert_3.gpx
    └── GMTW2026_Intermediate.gpx
```

### 1.2 Externe Abhängigkeiten (CDN mit SRI)

| Bibliothek | Version | Zweck | SRI |
|---|---|---|---|
| Leaflet.js | 1.9.4 | Interaktive Karte | ✅ |
| localforage | 1.10.0 | IndexedDB-Wrapper | ✅ |
| Turf.js | 7.0 | Geo-Berechnungen | ✅ |
| jsQR | 1.4.0 | QR-Code-Scanner | ✅ |
| pako | 2.1.0 | DEFLATE-Komprimierung | ✅ |
| Bunny Fonts | latest | DSGVO-konforme Schriften | — |

### 1.3 Eingebettete Bibliotheken

| Bibliothek | Zeilen | Zweck |
|---|---|---|
| leaflet-gpx 1.7.0 | 43–681 | GPX-Parsing für Leaflet |
| qrcode-generator | 712–2981 | QR-Code-Erzeugung (Canvas) |

### 1.4 Genutzte Browser-APIs

| API | Zweck |
|---|---|
| Geolocation (watchPosition) | GPS-Tracking in Echtzeit |
| DeviceMotionEvent | Sturzererkennung (Beschleunigungssensor) |
| Service Worker | Offline-Caching, Tile-Prefetch |
| IndexedDB (via localforage) | Persistente Datenspeicherung (>5 MB) |
| localStorage | Konfiguration, Einstellungen |
| SubtleCrypto (HMAC-SHA256) | Rennzeit-Signaturen |
| WakeLock | Bildschirm wach halten bei Aufnahme |
| Web Share API Level 2 | Natives Teilen (GPX-Dateien) |
| SpeechSynthesis | Text-to-Speech (Barrierefreiheit) |
| Web Bluetooth GATT | Smartwatch-GPS-Fusion |
| Canvas 2D | QR-Code-Rendering, Höhenprofil |
| MediaDevices (getUserMedia) | Kamera für QR-Scanner |
| requestIdleCallback | Nicht-blockierendes Tile-Prefetching |

---

## 2. DATENMODELL

### 2.1 LOCS — Feste Trail-Punkte

**Typ:** `const` Array (14 Einträge)
**Speicher:** Hardcodiert im Quellcode

```javascript
{
  id:      string,           // Eindeutiger Bezeichner ("muni", "camp", "wc", ...)
  name:    string,           // Anzeigename (Deutsch)
  lat:     number,           // Breitengrad (WGS84)
  lng:     number,           // Längengrad (WGS84)
  color:   string,           // Hex-Farbe (#22c55e, #f59e0b, #ef4444, #38bdf8)
  emoji:   string,           // Anzeige-Emoji
  cat:     "beginner"|"mittel"|"expert"|"logistik",
  desc:    string,           // Beschreibung (Deutsch)
  nameI18n: {en, fr, es, it},  // Übersetzte Namen
  descI18n: {en, fr, es, it},  // Übersetzte Beschreibungen
  large?:  boolean,          // Vergrößertes Icon (nur Camp)
  line?:   boolean           // Als Polyline rendern (nur Rückweg)
}
```

**Kategorien:**

| Kategorie | Farbe | CSS-Variable | Emoji-Beispiele |
|---|---|---|---|
| beginner | #22c55e | `--beg` | 🚩 |
| mittel | #f59e0b | `--mit` | 🟡, 🏆, 👥 |
| expert | #ef4444 | `--exp` | ⚠️, 🎇 |
| logistik | #38bdf8 | `--log` | ⛺, 🚧, 🏕️, 🚿, 🔁, 👥 |

### 2.2 trackStore — GPX-Strecken

**Typ:** `const` Objekt mit `tracks: []` und `_id: number`
**Speicher:** IndexedDB (Key: `gmtw_tracks_v2`)

```javascript
{
  id:        string,          // "trk-1", "trk-2", ...
  name:      string,          // Streckenname aus GPX <name>
  cat:       string,          // Kategorie (beginner|mittel|expert)
  color:     string,          // Darstellungsfarbe (#27AE60, #D4A017, #ef4444)
  gpxLayer:  L.GeoJSON,       // Leaflet-Layer (gerendert)
  visible:   boolean,         // Sichtbarkeits-Toggle
  sourceUrl: string|null,     // Herkunfts-URL (falls per URL geladen)
  gpxString: string,          // Roher GPX-XML-String
  bounds:    L.LatLngBounds,  // Berechnete Streckenausdehnung
  startPt:   {lat, lng},      // Erster GPS-Punkt
  finishPt:  {lat, lng},      // Letzter GPS-Punkt
  stats:     {dist, dur},     // Distanz (km), Dauer (falls vorhanden)
  elevData:  array,           // Höhenprofil-Datenpunkte
  projectId: string,          // Zugehöriges Projekt
  _startMkr: L.Marker,        // Start-Pin auf Karte
  _finishMkr: L.Marker        // Ziel-Pin auf Karte
}
```

**GPX-Farbzuordnung:**

| Kategorie | Hex-Farbe |
|---|---|
| beginner | #27AE60 |
| mittel | #D4A017 |
| expert | #ef4444 |

### 2.3 recorder — GPS-Aufnahme

**Typ:** `const` Objekt
**Speicher:** localStorage (`gmtw_rec_v2`) + IndexedDB-Backup

```javascript
{
  isRecording:    boolean,
  isPaused:       boolean,
  points:         [{lat, lng, ele, speed, accuracy, time: ISO8601}, ...],
  watchId:        number|null,    // geolocation.watchPosition ID
  elapsed:        number,         // Akkumulierte Millisekunden
  _segStart:      number|null,    // Segment-Startzeit
  _timerInt:      number|null,    // Timer-Intervall-ID
  _persistInt:    number|null,    // Auto-Save-Intervall (5s)
  _lastPos:       {lat, lng},     // Für Ausreißer-Erkennung
  _lastTime:      number|null,    // Für Geschwindigkeits-Berechnung
  totalDist:      number,         // Gesamtdistanz in Metern
  previewLine:    L.Polyline,     // Live-Routen-Vorschau (rot)
  _previewCasing: L.Polyline,     // Weiße Umrandung
  _gpsState:      string,         // 'idle'|'acquiring'|'lost'|'weak'|'moderate'|'good'
  MIN_SPEED:      0.5             // Schwellwert für Bewegungserkennung (m/s)
}
```

### 2.4 RACE — Rennzeit-Zustandsmaschine

**Typ:** `const` Objekt
**Speicher:** In-Memory (nicht persistiert)

```javascript
{
  state:          "idle"|"approaching"|"at_line"|"go"|"racing"|"finished",
  trackId:        string|null,
  trackName:      string,
  startPt:        {lat, lng}|null,
  startLine:      L.Polyline,     // 6m breite Startlinie (senkrecht zur Strecke)
  checkpoints:    [{lat, lng, isFinish, label}, ...],  // 3 Splits + Ziel
  cpMarkers:      [L.Marker, ...],
  nextCpIdx:      number,         // 0–4
  totalKm:        number,
  startTs:        number|null,    // performance.now() bei Rennstart
  startWallTs:    number|null,    // Date.now() für Signatur
  splitTimes:     [ms, ...],      // Elapsed ms an jedem Checkpoint
  gpsTrack:       [{lat, lng, alt, ts, speed, acc}, ...],
  fallEvents:     [{type: 'fall'|'dismount', ts, lat, lng}, ...],
  signature:      string|null,    // HMAC-SHA256 (24 Hex-Zeichen)

  // Bluetooth Smartwatch
  btDevice:       BluetoothDevice|null,
  btGpsLat:       number|null,
  btGpsLng:       number|null,
  btGpsTs:        number          // Letzte BT-GPS-Messung
}
```

### 2.5 _cmMarkers — Benutzerdefinierte Marker

**Typ:** `let` Array
**Speicher:** IndexedDB (`gmtw_custom_markers_v1`)

```javascript
{
  id:         "cm_${timestamp}_${idx}_${random}",
  name:       string,         // max 60 Zeichen
  lat:        number,
  lng:        number,
  emoji:      string,         // Standard: "📍"
  cat:        string,         // Kategorie
  desc:       string,         // max 300 Zeichen
  color:      string,         // Aus Kategorie abgeleitet
  projectId:  string,
  visible:    boolean,
  gmapsUrl:   string|null,    // Google Maps Navigation Link
  lastEdited: string|null     // ISO-Zeitstempel
}
```

### 2.6 _projects — Multi-Projekt-System

**Typ:** `let` Array
**Speicher:** localStorage (`gmtw_projects_v1`)

```javascript
{
  id:        "proj_${timestamp}"|"proj_0",
  name:      string,           // max 40 Zeichen
  enabled:   boolean,          // Sichtbar auf Karte
  centerLat: number,           // Fokuspunkt
  centerLng: number,
  zoom:      number,
  createdAt: string            // ISO-Zeitstempel
}
```

### 2.7 Profil-System

**Speicher:** localStorage (`gmtw_profile_v1`)

```javascript
{
  name:      string,    // Fahrername (max 32 Zeichen)
  muniName:  string,    // Einrad-Name (max 40 Zeichen)
  lang:      string,    // Sprache (de|en|fr|es|it)
  avatar:    string,    // Emoji-Avatar
  avatarBg:  string,    // Avatar-Hintergrundfarbe
  wheelSize: string,    // Radgröße (19"–36")
  frameColor:string,    // Rahmenfarbe
  brakeType: string,    // Bremsentyp
  seatClamp: string,    // Sattelklemme-Farbe
  special:   string     // Besonderheit (Schlumpf-Nabe, Freewheel, etc.)
}
```

---

## 3. SPEICHERSYSTEM

### 3.1 localStorage-Schlüssel

| Schlüssel | Inhalt | Quota-relevant |
|---|---|---|
| `gmtw_tracks_v2` | Track-Metadaten (Fallback) | Ja |
| `gmtw_rec_v2` | Laufende Aufnahme (Points, Timer) | Ja |
| `gmtw_view_v1` | Kartenposition {lat, lng, zoom} | Nein |
| `gmtw_theme` | "dark" oder "light" | Nein |
| `gmtw_gps_emoji` | GPS-Positions-Emoji | Nein |
| `gmtw_home_region` | {lat, lng} Heimat-Fokus | Nein |
| `gmtw_install_decline` | PWA-Install abgelehnt | Nein |
| `gmtw_profile_v1` | Fahrerprofil (JSON) | Nein |
| `gmtw_a11y_v1` | Barrierefreiheits-Einstellungen | Nein |
| `gmtw_projects_v1` | Projekt-Array (JSON) | Nein |
| `gmtw_active_project_v1` | Aktive Projekt-ID | Nein |
| `gmtw_lang_v1` | App-Sprache (de/en/fr/es/it) | Nein |
| `gmtw_locs_hidden` | Ausgeblendete LOCS-IDs (JSON Array) | Nein |
| `gmtw_locs_overrides` | LOCS-Anpassungen (JSON Object) | Nein |
| `gmtw_marker_scale` | Marker-Skalierung (0.5–2.0) | Nein |
| `gmtw_trk_features_v1` | Schlüsselstellen pro Track | Nein |
| `gmtw_trk_ratings_v1` | Persönliche Track-Bewertungen | Nein |
| `gmtw_trk_edits_v1` | Track-Beschreibungen | Nein |
| `gmtw_qr_scanner_enabled` | QR-Scanner aktiviert | Nein |

### 3.2 IndexedDB (via localforage)

| Schlüssel | Inhalt | Größe |
|---|---|---|
| `gmtw_tracks_v2` | Vollständige Track-Objekte mit GPX-Strings | Bis mehrere MB |
| `gmtw_runs_v1` | Rennhistorie {trackId → [runs]} | Bis 50 Runs/Track |
| `gmtw_custom_markers_v1` | Benutzerdefinierte Marker | Variable |
| `gmtw_rec_backup_v2` | Aufnahme-Backup (>200 Punkte) | Variable |

### 3.3 Quota-Handling

```javascript
LS.set(key, val):
  1. JSON.stringify + setItem
  2. Bei QuotaExceededError:
     a) removeItem(key) + erneuter setItem
     b) Bei erneutem Fehler: return false
  3. Erkennt: QuotaExceededError, NS_ERROR_DOM_QUOTA_REACHED, code 22
```

---

## 4. KARTE & KARTENSCHICHTEN

### 4.1 Kartenkonfiguration

- **Startposition:** 51.4192°N, 7.4855°E (Hohensyburg)
- **Standard-Zoom:** 16
- **Min/Max Zoom:** 1–26 (native max: 17 Topo / 19 Sat)
- **Bibliothek:** Leaflet 1.9.4

### 4.2 Tile-Layer

| Layer | Anbieter | URL-Muster | Native Max |
|---|---|---|---|
| **TOPO** (Standard) | OpenTopoMap | `https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png` | 17 |
| **SAT** | Esri World Imagery | `https://server.arcgisonline.com/.../tile/{z}/{y}/{x}` | 19 |

### 4.3 Overlay-Elemente

- **Trail-Punkte (LOCS):** 14 fest definierte Marker mit Emoji-Icons
- **GPX-Strecken:** Polylines mit kategorie-abhängiger Farbe und Start/Ziel-Pins
- **Benutzerdefinierte Marker:** Emoji-basierte Marker mit Popup und Tooltip
- **Rückweg-Polyline:** Gestrichelte Linie Camp ↔ Sammelpunkt (gelb)
- **GPS-Positionsmarker:** Blauer Punkt mit Genauigkeitskreis
- **Navigations-Linie:** Gestrichelte cyanfarbene Linie (User → Ziel)
- **Start-/Ziellinie (Rennen):** 6m breite senkrechte Linie (limette)

### 4.4 Tile-Prefetch-Engine (_TPC)

**Zweck:** Proaktives Cachen sichtbarer Kartenkacheln für Offline-Nutzung

| Parameter | Wert | Beschreibung |
|---|---|---|
| Debounce | 1400 ms | Verzögerung nach Kartenbewegung |
| Viewport-Padding | 50% | Zusätzlicher Bereich um sichtbaren Ausschnitt |
| Zoom unten | −2 Level | Kacheln 2 Stufen unter aktuellem Zoom |
| Zoom oben | +1 Level | Kacheln 1 Stufe über aktuellem Zoom |
| Max Tiles/Run | 600 | Harte Obergrenze pro Prefetch-Lauf |
| Scheduling | requestIdleCallback | Nicht-blockierend |

---

## 5. GPS-MODUL

### 5.1 Positionserfassung

```javascript
navigator.geolocation.watchPosition(callback, error, {
  enableHighAccuracy: true,
  timeout:           20000,  // 20 Sekunden
  maximumAge:        3000    // 3 Sekunden
});
```

### 5.2 Visuelles Feedback

- **GPS-FAB:** Dreht sich während Positionssuche (`spin`-Klasse)
- **Positionsmarker:** 16px blauer Punkt mit pulsierender Halo (36px)
- **Genauigkeitskreis:** Cyan-farbener Leaflet-Circle mit `accuracy` Radius
- **Auto-Follow:** Karte folgt GPS-Position (Zoom 17, 1s Animation)

### 5.3 Fehlerbehandlung

| Code | Meldung | Aktion |
|---|---|---|
| 1 | Zugriff verweigert | 8s Toast, GPS deaktiviert |
| 2 | Kein Signal | 8s Toast |
| 3 | Zeitüberschreitung | 8s Toast |

---

## 6. GPS-AUFNAHME-MODUL

### 6.1 Aufnahme-Pipeline (4-stufig)

```
GPS-Fix → Genauigkeitsfilter → Ausreißer-Erkennung → Deduplikation → Speicherung
```

**Stufe 1 — Adaptive Genauigkeitsschwelle:**

| Punkte aufgenommen | Max. Genauigkeit (m) |
|---|---|
| 0 | 200 |
| 1–4 | 150 |
| 5–14 | 100 |
| 15+ | 50 |

**Stufe 2 — Ausreißer-Erkennung:**
- Verwirft wenn `Δt < 0.5s` (GPS-Callback-Duplikat)
- Verwirft wenn Geschwindigkeit `> 13.9 m/s` (50 km/h, großzügig für Downhill)

**Stufe 3 — Deduplikation:**
- Verwirft wenn Distanz zum letzten Punkt `< 1.5m`

**Stufe 4 — Speicherung:**
- Punkt: `{lat, lng, ele, speed, accuracy, time: ISO8601}`
- Haversine-Distanzberechnung
- Vorschau-Polyline auf Karte aktualisieren

### 6.2 Nachbearbeitung (bei Speicherung)

**Sturz-Zickzack-Bereinigung:**
```
Fenster:           7 Punkte (symmetrisch)
Sinuosität:        > 3.0 (Weglänge / Luftlinie)
Max. Verschiebung: 8m End-zu-End im Fenster
Max. Episodendauer: 30 Sekunden
```
Entfernt Innenpunkte bei Zickzack ohne Nettobewegung (Sturz-Artefakte).

### 6.3 Auto-Save & Recovery

- **Auto-Save:** Alle 5 Sekunden nach localStorage
- **IndexedDB-Backup:** Bei >200 Punkten
- **WakeLock:** Bildschirm bleibt eingeschaltet
- **Visibility-Handling:** GPS-Watch wird bei Tab-Wechsel neu gestartet
- **Beforeunload:** Zustand wird vor Schließen persistiert

### 6.4 GPS-Signal-Anzeige

| Genauigkeit | Anzeige | Farbe |
|---|---|---|
| Wird gesucht | 🔍 GPS wird gesucht… | Amber |
| Signal verloren | ❌ GPS-Signal verloren | Rot |
| > 100m | 📡 GPS schwach (±Xm) | Amber |
| > 50m | 📡 GPS mäßig (±Xm) | Hellgrün |
| ≤ 50m | ✅ GPS gut (±Xm) | Grün |

### 6.5 Export-Formate

- **GPX 1.1:** Standardformat mit `<gmtw:speed>` und `<gmtw:accuracy>` Extensions
- **JSON:** Rohformat mit allen Metadaten
- **Web Share API:** Natives Teilen als GPX-Datei

---

## 7. RENNZEIT-MODUL

### 7.1 Zustandsmaschine

```
idle → approaching → at_line → go → racing → finished
  ↑                                              |
  └──────────────── abbrechen ←──────────────────┘
```

### 7.2 Startlinien-Erkennung (Vektor-basiert)

1. Richtung aus den ersten zwei GPX-Punkten berechnen (Turf.bearing)
2. Senkrechte Linie erstellen: 6m Breite (3m je Seite)
3. Turf.destination für Endpunkte
4. Darstellung: Limette (#c8ff00), 5px, 0.9 Opacity

### 7.3 Annäherungs-System

| Entfernung | Aktion |
|---|---|
| < 50m | Navigation → Pre-Race-Modus (auto) |
| 5m–2m | Canvas: Amber Distanzzahl, Prompt-Text einblenden |
| ≤ 2m | Canvas: "BEREIT!" (grün wenn bestätigt) |
| Bestätigt + > minDist+1.5m | Auto-Crossing → Rennen startet |

### 7.4 Sektor-Splits

- Strecke wird in 4 gleiche Segmente unterteilt (turf.lineChunk)
- Checkpoints bei 25%, 50%, 75%, 100% der Gesamtdistanz
- Labels: "S1", "S2", "S3", "Ziel"
- **Adaptiver Erkennungsradius:** `max(3m, min(8m, accuracy × 0.4))`

### 7.5 Sturz-/Absteigerkennung

| Typ | Schwellwert | Methode |
|---|---|---|
| Sturz (fall) | 35 m/s² (≈3.5G) + 400ms Stillstand (<4 m/s²) | DeviceMotion |
| Absteigen (dismount) | Geschwindigkeit: >5 km/h → <1 km/h | GPS-Geschwindigkeit |

- Throttle: Min. 3 Sekunden zwischen Events
- Haptisches Feedback: `navigator.vibrate([60, 60, 60])`

### 7.6 HMAC-SHA256 Signierung

```javascript
Secret:  'GMTW26-RACE-' + YYYY-MM-DD (tagesrotierend)
Algo:    HMAC-SHA256 (Web Crypto API)
Payload: {trackId, date, totalMs, splits, rider, muni}
Output:  24 Hex-Zeichen
```

> **Hinweis:** Client-Side-Only Signierung dient als Tamper-Detection, nicht als echte Anti-Cheat-Sicherheit. Für Fälschungssicherheit wäre Server-Side-Validation nötig.

### 7.7 Bluetooth-Sensor-Fusion

- **Service:** 0x1819 (Location & Navigation)
- **Characteristic:** 0x2A67 (Location)
- **Fusion:** Mittelwert aus Phone-GPS und Watch-GPS wenn BT-Fix < 3s alt
- **Genauigkeit:** `min(phone_acc, 5)` (Annahme: BT-GPS genauer)

### 7.8 Lauf-Ergebnis

```javascript
{
  trackId, trackName, date: ISO8601,
  totalMs:        number,        // Netto-Gesamtzeit
  splits:         [ms, ...],     // Split-Zeiten
  fallEvents:     [{type, ts, lat, lng}, ...],
  gpsTrack:       [{lat, lng, alt, ts, speed, acc}, ...],
  riderName, muniName,
  muniDetails:    {wheelSize, color, brake, seatClampColor, special},
  signature:      string         // HMAC-SHA256 (24 Hex)
}
```

---

## 8. NAVIGATIONS-MODUL

### 8.1 Modi

| Modus | Beschreibung |
|---|---|
| `to-start` | Navigation zum Startpunkt der Strecke |
| `on-track` | Streckenbegleitung mit Abbiegehinweisen |

### 8.2 HUD-Elemente (Heads-Up Display)

- **Streckenname** (nh-title)
- **Distanz** (nh-dist): "X km" oder "Y m"
- **Richtungspfeil** (nh-arrow): 8 Unicode-Pfeile ↑↗→↘↓↙←↖
- **Status-Text** (nh-mode-txt): "Navigiere zum Start", "🎯 Fast da!", "🟢 Auf Strecke"
- **Google Maps Link**

### 8.3 Abbiege-Erkennung

Vorausschauende Berechnung über 3 Punkte (nah, 20m, 50m):

| Winkeländerung | Symbol | TTS-Ansage |
|---|---|---|
| < −50° | ↰ | "Links abbiegen" |
| −50° bis −22° | ↖ | — |
| −22° bis +22° | ↑ | — |
| +22° bis +50° | ↗ | — |
| > +50° | ↱ | "Rechts abbiegen" |

### 8.4 Abweichungs-Erkennung

**Modus to-start:**
- Entfernung steigt um >8m UND >30m gesamt → falsche Richtung
- 3 aufeinanderfolgende schlechte Fixes → Warnung
- TTS: "Falsche Richtung. Bitte umkehren."

**Modus on-track:**
- >25m vom nächsten Streckenpunkt → Off-Route
- 3 aufeinanderfolgende → Warnung
- TTS: "Achtung, du bist X Meter von der Strecke entfernt."

---

## 9. QR-CODE-SYSTEM

### 9.1 Sender-Pipeline

```
Track-Daten → RDP-Vereinfachung → Kompakt-Encoding → DEFLATE → Base64url → Chunking → QR
```

| Schritt | Parameter |
|---|---|
| Max. Punkte nach RDP | 1000 |
| Koordinaten-Präzision | ×1e5 (≈0.1m) |
| Höhen-Präzision | ×10 (1 Dezimeter) |
| Kompression | pako DEFLATE Level 9 |
| Chunk-Größe | **700 Zeichen** (QR-Version ~22) |
| Canvas-Größe | **300×300 px** (~2.86 px/Modul) |
| Fehlerkorrektur | Level M (15% Recovery) |
| Transfer-ID | 7-stellig zufällig |

### 9.2 Chunk-Format

```json
{
  "v": 1,
  "T": "gmtw-chunk",
  "id": "abc1234",
  "i": 0,
  "n": 3,
  "z": 1,
  "d": "KLUv/Q..."
}
```

| Feld | Beschreibung |
|---|---|
| v | Protokoll-Version |
| T | Typ-Marker |
| id | 7-Zeichen Transfer-ID |
| i | Chunk-Index (0-basiert) |
| n | Gesamtzahl Chunks |
| z | Kompression: 1=DEFLATE, 0=Raw |
| d | Base64url-Datenblock (max 700 Zeichen) |

### 9.3 Scanner-Pipeline

```
Kamera → Frame-Capture (5 FPS) → jsQR → Payload-Parsing → Chunk-Buffer → Import
```

- **Kamera:** Rückseite bevorzugt, 640×640px
- **Frame-Rate:** 200ms Intervall (5 FPS)
- **Deduplikation:** Letztes Ergebnis gecacht
- **Auto-Cleanup:** 15 Minuten Timeout pro Transfer

### 9.4 Dekompression (4 Fallback-Stufen)

1. pako.inflate (wenn z=1 und pako verfügbar)
2. pako.inflate (auch wenn z=0, falls Fehlmarkierung)
3. TextDecoder UTF-8 (unkomprimierte Daten)
4. Legacy decodeURIComponent(escape(atob()))

### 9.5 Kompakt-Track-Payload

```json
{
  "v": 1,
  "type": "gmtw-track",
  "n": "Track Name",
  "c": "mittel",
  "he": 1,
  "ht": 1,
  "ts": "2026-04-02T10:00:00Z",
  "p": [
    [lat0_abs, lon0_abs, ele0?, time0?],
    [Δlat, Δlon, Δele?, Δtime?],
    ...
  ]
}
```

---

## 10. STRECKEN-FEATURES (Schlüsselstellen)

### 10.1 Feature-Typen

| Typ | Icon | Name |
|---|---|---|
| drop | ⬇️ | Drop |
| steinfeld | 🪨 | Steinfeld |
| verblockt | 🪵 | Verblockt |
| steil | 🏔 | Tech. Steil |
| northshore | 🌉 | Northshore |
| sprung | 🦘 | Sprung |
| flow | 🌊 | Flow-Sektion |
| aussicht | 👁 | Aussichtspunkt |
| goal | 🎯 | Ziel |
| pause | ⛺ | Pause |

### 10.2 Feature-Daten

```javascript
{
  type:  string,       // Typ-Schlüssel
  name:  string,       // max 60 Zeichen
  diff:  1–5,          // Schwierigkeits-Sterne
  date:  number,       // Date.now() bei Erstellung
  lat?:  number,       // GPS-Position (optional)
  lng?:  number
}
```

### 10.3 Platzierung

1. Strecke auswählen → Feature-Position-Picker öffnet sich
2. Mini-Karte zeigt Strecke mit bestehendem Overlay
3. Kartemitte = Feature-Position (Fadenkreuz)
4. Alternativ: GPS-Modus (Live-Position verwenden)
5. Feature-Typ und Schwierigkeit wählen
6. Speichern → Marker auf Hauptkarte

---

## 11. UI-KOMPONENTEN

### 11.1 Haupt-Panels

| Panel | ID | Öffnung | Inhalt |
|---|---|---|---|
| Top Bar | `topbar` | Immer sichtbar | Menü, Titel, Layer-Toggle |
| Filter Bar | `fbar` | Immer sichtbar | Kategorie-Chips, Projekt-Selektor |
| Bottom Sheet | `sheet` | `toggleSheet()` | Trail-Punkt-Liste (filtriert) |
| GPX Panel | `gpx-panel` | `openGpxPanel()` | 3 Tabs: Laden, Tracks, Aufnahme |
| Settings | `settings-panel` | `openSettings()` | 7 Tabs (siehe 11.3) |
| Race Overlay | `race-overlay` | Auto (Annäherung) | 5 Seiten: Approach → Results |

### 11.2 Modale Dialoge

| Dialog | ID | Zweck |
|---|---|---|
| QR-Modal | `qrm` | Standort-QR (Google Maps Link) |
| Track-QR-Modal | `trk-qrm` | Multi-Frame Track-QR mit Navigation |
| Marker-Modal | `md-overlay` | Marker erstellen/bearbeiten |
| Run-Detail | `run-detail-modal` | Lauf-Details anzeigen |
| Feature-Picker | `feat-pos-modal` | Schlüsselstelle platzieren |
| Projekt-Step2 | `proj-step2-modal` | Neues Projekt konfigurieren |
| PWA-Install | `pwa-install` | App-Installation vorschlagen |

### 11.3 Settings-Tabs

| Tab | data-t | Inhalt |
|---|---|---|
| Profil | `profile` | Name, Einrad-Daten, Avatar, Sprache |
| Allgemein | `general` | GPS-Emoji, Projekte, Barrierefreiheit & TTS |
| Strecken | `tracks` | Offizielle Strecken, Rating, Features-Editor |
| Backup | `backup` | Export/Import: Vollbackup, Marker, Zeiten, Projekte |
| Marker | `markers` | Marker-Liste, Größen-Slider, Import/Export |
| QR-Scan | `qr` | Kamera-Scanner mit Toggle |
| App | `app` | PWA-Status, Cache-Info, Offline-Speicher |

### 11.4 Floating Action Buttons (FABs)

| Button | Funktion | Badge |
|---|---|---|
| 🔊 | Aktuellen Kontext vorlesen (TTS) | — |
| GPS | GPS-Position zentrieren | — |
| 📊 | GPX-Panel öffnen | Track-Anzahl |
| ⏺ | Aufnahme starten | — |
| 🌙/☀️ | Theme umschalten | — |
| ⊞ | Übersicht (alle Strecken zoomen) | — |
| ⚙ | Einstellungen öffnen | — |

---

## 12. BARRIEREFREIHEIT

### 12.1 ARIA-Implementierung

- `role="dialog"` und `aria-modal="true"` auf allen Modalen
- `aria-label` auf allen interaktiven Elementen
- `aria-live="polite"` für Statusmeldungen
- `aria-live="assertive"` für Warnungen
- `role="toolbar"` für TTS-Steuerleiste
- `role="listbox"` und `role="group"` für Projekt-Dropdown

### 12.2 Text-to-Speech (TTS)

**Steuerleiste (5 Buttons):**
- 🔊 Vorlesen (aktueller Kontext)
- ⏪ Wiederholen
- ⏸/▶ Pause/Weiter
- ⏩ Überspringen
- ⏹ Stopp

**Kontexte:**
- Kartenübersicht: Zoom-Level, sichtbare Tracks, nächster Punkt
- Nächster Trail-Punkt: Name, Entfernung, Richtung
- Navigation: Abbiegehinweise, Off-Route-Warnungen
- Rennen: "GO!", Splits, Ergebnisse

**Sprechrate:** 0.5× – 2.0× (konfigurierbar)

### 12.3 Hoher Kontrast

- CSS-Selector: `[data-theme=light][data-a11y-hc]`
- WCAG AA Kontrastverhältnis ≥ 4.5:1
- Stärkere Rahmen und dunklere Texte

### 12.4 Tastaturnavigation

| Taste | Funktion |
|---|---|
| V | Kartenübersicht vorlesen |
| N | Nächsten Punkt vorlesen |
| S | Einstellungen öffnen |
| Esc | Aktuelles Panel schließen |

---

## 13. INTERNATIONALISIERUNG (i18n)

### 13.1 Unterstützte Sprachen

| Code | Sprache | Flagge | Status |
|---|---|---|---|
| de | Deutsch | 🇩🇪 | Primär (vollständig) |
| en | English | 🇬🇧 | Übersetzung vorhanden |
| fr | Français | 🇫🇷 | Übersetzung vorhanden |
| es | Español | 🇪🇸 | Übersetzung vorhanden |
| it | Italiano | 🇮🇹 | Übersetzung vorhanden |

### 13.2 Übersetzungs-Mechanismus

```javascript
function t(key, vars = {}) {
  let s = TRANSLATIONS[_appLang]?.[key]
       || TRANSLATIONS.de[key]
       || key;
  for (const [k, v] of Object.entries(vars))
    s = s.replace(`{${k}}`, v);
  return s;
}
```

### 13.3 DOM-Attribute

| Attribut | Ziel |
|---|---|
| `data-i18n` | textContent |
| `data-i18n-ph` | placeholder |
| `data-i18n-aria` | aria-label |
| `data-i18n-title` | title |

---

## 14. SERVICE WORKER & OFFLINE-STRATEGIE

### 14.1 Cache-Architektur

| Cache | Strategie | Max Einträge |
|---|---|---|
| `gmtw-v9-shell` | Cache-First | Unbegrenzt |
| `gmtw-v9-tiles` | Stale-While-Revalidate + Dedup | 3.000 |
| `gmtw-v9-gpx` | Cache-First + Background-Update | 200 |
| `gmtw-v9-fonts` | Stale-While-Revalidate | 150 |
| `gmtw-v9-data` | Network-First + Cache-Fallback | Unbegrenzt |

### 14.2 Routing-Regeln

| URL-Muster | Cache | Strategie |
|---|---|---|
| Navigation (HTML) | Shell | Network-First → Cache → Offline-Fallback |
| App Shell (JS/CSS/Icons) | Shell | Cache-First |
| `*.tile.opentopomap.org` | Tiles | Stale-While-Revalidate |
| `server.arcgisonline.com` | Tiles | Stale-While-Revalidate |
| `*.tile.openstreetmap.org` | Tiles | Stale-While-Revalidate |
| `tile.waymarkedtrails.org` | Tiles | Stale-While-Revalidate |
| `maps.wikimedia.org` | Tiles | Stale-While-Revalidate |
| `fonts.bunny.net`, `fonts.gstatic.com` | Fonts | Stale-While-Revalidate |
| `raw.githubusercontent.com` (GPX) | GPX | Cache-First + BG-Update |
| `*.gpx` | GPX | Cache-First + BG-Update |
| Alles andere | Data | Network-First |

### 14.3 Tile-Dedup

- `_bgFetching` Set verhindert gleichzeitige Anfragen derselben URL
- `_tileInserts` Counter: `trimCache()` nur alle 50 Inserts (Performanz)

### 14.4 Message-Handler (App → SW)

| Nachricht | Aktion |
|---|---|
| `SKIP_WAITING` | Sofort aktivieren |
| `CLEAR_TILE_CACHE` | Tile-Cache löschen |
| `PREFETCH_GPX` | GPX-URLs mit Deduplikation cachen |
| `PREFETCH_TILES` | Batch-Tile-Prefetch (Concurrency=6) |
| `GET_CACHE_SIZE` | Einträge pro Cache zurückgeben |
| `CLEAR_ALL_CACHES` | Alle Caches löschen |

### 14.5 Offline-Fallback

Vollständige HTML-Seite mit Offline-Hinweis, Tipps und Reload-Button (in `OFFLINE_HTML` im SW eingebettet).

---

## 15. THEME-SYSTEM

### 15.1 CSS-Variablen

| Variable | Dunkel | Hell |
|---|---|---|
| `--bg` | #0b0e14 | #f5f5f0 |
| `--s1` | #14171f | #ffffff |
| `--s2` | #1c2029 | #f0efe8 |
| `--tx` | #e8eaed | #1a1a1a |
| `--ac` | #c8ff00 | #7ab800 |
| `--bd` | #2a2e38 | #d5d3c8 |

### 15.2 Umschaltung

- `data-theme="dark"` / `data-theme="light"` auf `<html>`
- `data-a11y-hc` Attribut für hohen Kontrast (nur im hellen Modus)
- Persistiert in localStorage (`gmtw_theme`)

---

## 16. PROJEKT-SYSTEM

### 16.1 Konzept

Projekte isolieren Strecken und Marker voneinander. Jedes Projekt hat:
- Eigenen Fokuspunkt (Lat/Lng/Zoom)
- Eigene Strecken und Marker (via `projectId`)
- Aktivierungs-Toggle (ein-/ausblenden)

### 16.2 Standard-Projekt

- ID: `proj_0`
- Name: "GMTW"
- Fokus: Hohensyburg (51.4192°N, 7.4855°E)
- Kann nicht gelöscht werden

### 16.3 Projekt-Erstellung

1. Doppelklick auf Karte → Fokuspunkt setzen
2. Name eingeben (max 40 Zeichen)
3. Aktion wählen: Marker setzen, GPX laden, JSON importieren, oder nur erstellen

---

## 17. BACKUP & EXPORT

### 17.1 Vollständiges Backup (JSON)

Enthält:
- Alle Tracks (Metadaten + GPX-Strings)
- Alle Custom Markers
- Alle Rennzeiten
- Alle Track-Features und Ratings
- Profil-Daten
- Projekt-Konfiguration

### 17.2 Teil-Exporte

| Export | Format | Inhalt |
|---|---|---|
| Marker | JSON | Alle benutzerdefinierten Marker |
| Zeiten | JSON oder CSV | Alle Rennläufe aller Strecken |
| Projekt | JSON | Einzelnes Projekt mit allen Daten |
| Aufnahme | GPX oder JSON | Einzelne GPS-Aufnahme |
| Rennergebnis | GPX | GPS-Track des Rennlaufs |

---

## 18. PWA-INSTALLATION

### 18.1 Erkennung

- `beforeinstallprompt` Event (Chrome/Edge)
- Manuelle Anleitung für iOS Safari ("Zum Homescreen")
- `display-mode: standalone` Detection (bereits installiert)

### 18.2 Install-Prompt

- Erscheint automatisch nach 30s Nutzung
- "Nicht mehr fragen" Option (persistent über localStorage)
- Geräte-spezifische Anleitung (iOS, Android, Desktop)

### 18.3 Manifest-Konfiguration

```json
{
  "name": "GMTW Trail Map",
  "short_name": "GMTW Map",
  "display": "standalone",
  "display_override": ["window-controls-overlay", "standalone", "minimal-ui"],
  "orientation": "any",
  "theme_color": "#0b0e14",
  "categories": ["sports", "navigation", "maps"]
}
```

---

## 19. SICHERHEIT

### 19.1 XSS-Schutz

**Escape-Funktionen:**
- `escHtml(s)`: Escaped `& < > " '` (für HTML-Inhalte)
- `esc(s)`: JS-String-Escape + HTML-Attribut-Escape (für onclick-Attribute)
- `escXml(s)`: Escaped `& < >` (für GPX-XML-Erzeugung)

### 19.2 SRI (Subresource Integrity)

Alle 5 CDN-Bibliotheken haben SHA-384 Integrity-Hashes + `crossorigin="anonymous"`.

### 19.3 Content Security

- Keine externe Datenübertragung (rein clientseitig)
- Kein Tracking, keine Cookies
- DSGVO-konforme Schriften (Bunny Fonts, EU-Hosting)
- Kamera-Zugriff nur nach expliziter Erlaubnis

### 19.4 Bekannte Einschränkungen

- HMAC-Signierung ist Client-Only (kein Server zur Validierung)
- Race-Ergebnisse können von technisch versierten Nutzern gefälscht werden
- LocalStorage-Daten sind im Browser-DevTools einsehbar

---

## 20. PERFORMANCE-OPTIMIERUNGEN

| Technik | Beschreibung |
|---|---|
| Tile-Dedup (SW) | Verhindert doppelte gleichzeitige Tile-Requests |
| Batch-Trim (SW) | Cache.keys() nur alle 50 Inserts statt bei jedem |
| requestIdleCallback | Tile-Prefetch blockiert nicht den Main Thread |
| Debounced Prefetch | 1400ms Verzögerung nach Kartenbewegung |
| Center-First Tile Order | Naheste Tiles werden zuerst gecacht |
| Adaptive GPS Filter | Lockert Schwellen bei wenigen Punkten |
| RDP-Vereinfachung | Reduziert QR-Datenmenge auf max. 1000 Punkte |
| DEFLATE Level 9 | Maximale Kompression für QR-Transfer |
| Auto-Save Interval | 5s statt pro Punkt (reduziert I/O) |

---

## ANHANG A: GPX-STRECKEN

| Datei | Kategorie | Punkte | Beschreibung |
|---|---|---|---|
| GMTW2026_Beginner.gpx | beginner | 53 | Einsteiger-Strecke |
| GMTW2026_Beginner_Intermediate.gpx | mittel | 34 | Beginner/Mittel Verbindung |
| GMTW2026_Expert_1.gpx | expert | 91 | Expert-Strecke 1 |
| GMTW2026_Expert_2.gpx | expert | 23 | Expert-Strecke 2 |
| GMTW2026_Expert_3.gpx | expert | 50 | Expert-Strecke 3 |
| GMTW2026_Intermediate.gpx | mittel | 47 | Mittlere Strecke |

## ANHANG B: TRAIL-PUNKTE (LOCS)

| ID | Name | Kategorie | Koordinaten | Emoji |
|---|---|---|---|---|
| muni | Muni Start Beginner/Mittel | beginner | 51.4218, 7.4926 | 🚩 |
| ein-mit | Einstieg Mittel | mittel | 51.4234, 7.4808 | 🟡 |
| ziel-mit | Ziel Mittel | mittel | 51.4193, 7.5111 | 🏆 |
| exp-zone | Expert Zone | expert | 51.4187, 7.4754 | ⚠️ |
| exp-kurs | Zerstörer | expert | 51.4164, 7.4539 | 🎇 |
| camp | GMTW Camp | logistik | 51.4177, 7.4949 | ⛺ |
| camp-tor | Camp Tor | logistik | 51.4175, 7.4909 | 🚧 |
| zeltplatz | Zeltplatz Eingang | logistik | 51.4201, 7.4951 | 🏕️ |
| sam-beg | Sammelpunkt Beginner | logistik | 51.4198, 7.4847 | 👥 |
| sam-mit | Sammelpunkt Mittel | logistik | 51.4234, 7.5136 | 👥 |
| sam-camp | Sammelpunkt → Camp | logistik | 51.4182, 7.4786 | 🔁 |
| wc | Dusche / WC | logistik | 51.4188, 7.4938 | 🚿 |
| weg-camp | Weg zurück ins Camp | logistik | 51.4178, 7.4846 | ↩️ |
