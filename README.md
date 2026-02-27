# GMTW Trail Map

**Interaktive, offline-fähige Trail-Karte für das GMTW-Event in Hohensyburg / Herdecke.**  
Gebaut als Single-File Progressive Web App – kein Backend, kein Tracking, vollständig im Browser.

<p align="center">
  <a href="https://munimap.github.io/"><img src="https://img.shields.io/badge/Live%20Demo-munimap.github.io-c8ff00?style=for-the-badge&logo=github&logoColor=black" alt="Live Demo"></a>
  &nbsp;
  <img src="https://img.shields.io/badge/PWA-Installierbar-5a67d8?style=for-the-badge" alt="PWA">
  &nbsp;
  <img src="https://img.shields.io/badge/Offline-95%25-22c55e?style=for-the-badge" alt="Offline">
  &nbsp;
  <img src="https://img.shields.io/badge/DSGVO-konform-blue?style=for-the-badge" alt="DSGVO">
</p>

---

## Inhaltsverzeichnis

1. [Überblick](#überblick)
2. [Internet-Anforderungen](#internet-anforderungen-wann-wird-was-benötigt)
3. [App installieren (PWA)](#app-installieren-pwa)
4. [Karte & Layer](#karte--layer)
5. [GPX-Tracks](#gpx-tracks)
6. [Renntimer & Race-Modus](#renntimer--race-modus)
7. [GPS & Navigation](#gps--navigation)
8. [Custom-Marker](#custom-marker)
9. [QR-Code-System](#qr-code-system)
10. [Einstellungen & Profil](#einstellungen--profil)
11. [Backup & Restore](#backup--restore)
12. [Offline-Betrieb & Service Worker](#offline-betrieb--service-worker)
13. [Technische Umsetzung](#technische-umsetzung)
14. [Projektstruktur](#projektstruktur)
15. [Lokale Entwicklung](#lokale-entwicklung)
16. [Bibliotheken](#verwendete-bibliotheken)

---

## Überblick

Die GMTW Trail Map ist eine vollständig im Browser laufende Webanwendung, die keine Serverinstallation, kein Framework und keine Laufzeitabhängigkeiten benötigt. Alle Funktionen laufen client-seitig in einer einzigen HTML-Datei. Die App ist als Progressive Web App (PWA) installierbar und kann nach dem ersten Laden zu ~95 % offline betrieben werden.

---

## Internet-Anforderungen: Wann wird was benötigt?

> **TL;DR:** Einmalig online → danach dauerhaft offline nutzbar.

### Einmalig notwendig (Erststart)

Diese Ressourcen werden beim ersten Laden automatisch gecacht und stehen danach offline zur Verfügung:

| Was | Warum | Einmalig? |
|---|---|---|
| `index.html`, `manifest.json`, `service-worker.js` | App-Shell | ✅ |
| Leaflet 1.9.4 (JS + CSS, ~140 KB) | Karten-Engine | ✅ |
| localforage 1.10.0 | IndexedDB-Wrapper | ✅ |
| Turf.js 7 | Geo-Berechnungen | ✅ |
| jsQR 1.4.0 | QR-Scanner | ✅ |
| qrcode-generator 1.4.4 | QR-Generierung (inline) | ✅ bereits inline |
| Barlow / Barlow Condensed (Bunny.net) | Schriftarten | ✅ |
| App-Icons (192 + 512 px, maskable) | Startbildschirm-Icon | ✅ |
| GPX-Strecken vom Repository | Streckendaten | ✅ nach Laden |

### Für Karten-Tiles (einmalig pro Bereich)

Karten-Kacheln (Kartenbilder) werden on-demand gecacht wenn der Nutzer über einen Bereich scrollt/zoomt. Sie bleiben bis zum Cache-Limit (3.000 Tiles) gespeichert. Alternativ: **Einstellungen → App → Karten-Bereich cachen** lädt alle Tiles eines definierten Gebiets auf einmal vor.

### Nie wieder nötig (nach einmaligem Setup)

- ✅ GPS-Ortung
- ✅ Renntimer mit Checkpoint-Erkennung
- ✅ GPX-Track-Anzeige und Höhenprofil
- ✅ Custom-Marker anlegen, bearbeiten, löschen
- ✅ QR-Codes generieren
- ✅ Vollständiges Backup exportieren/importieren
- ✅ Alle Einstellungen und Fahrerprofil
- ✅ Leaderboard und Rennergebnisse
- ✅ Kryptografische Signatur von Rennergebnissen
- ✅ Dark / Light Mode

---

## App installieren (PWA)

Die App kann wie eine native App auf dem Gerät installiert werden – kein App Store erforderlich.

**Android (Chrome / Edge):**
1. Seite aufrufen: [munimap.github.io](https://munimap.github.io/)
2. Menü (⋮) → „Zum Startbildschirm hinzufügen"
3. Oder: Installations-Banner abwarten und antippen

**iOS (Safari):**
1. Seite in Safari öffnen
2. Teilen-Button (□↑) → „Zum Home-Bildschirm"

**Desktop (Chrome / Edge):**
1. Installations-Icon in der Adressleiste klicken
2. Oder: Menü → „App installieren"

> Nach der Installation erscheint die App im Vollbild (`standalone`), ohne Browserleiste. Der `window-controls-overlay`-Modus wird auf unterstützten Desktops ebenfalls aktiviert.

**PWA-Prompt in der App:**  
Beim ersten Besuch erscheint ein nativer Installations-Banner mit Schritt-für-Schritt-Anleitung (plattformspezifisch). Dieser kann über „Später" dauerhaft geschlossen werden. Status und Geräteinfo sind jederzeit unter **Einstellungen → App** einsehbar.

---

## Karte & Layer

### Bedienung

Die Karte ist das Herzstück der App. Sie öffnet beim Start auf:
- Die gespeicherte **Home-Region** (falls in den Einstellungen gesetzt)
- Die letzte bekannte Kartenposition (aus LocalStorage)
- Oder den Standard-View: **Hohensyburg / Herdecke**

**Topbar (oben):**
- Links: **Hamburger-Menü** → öffnet das GPX/Rec-Panel
- Mitte: **MUNI** Logo-Pill + App-Titel + Untertitel
- Rechts: **Layer-Wechsel-Button** (Karten-Icon)

**Floating Action Buttons (FABs, rechte Seite):**

| Button | Funktion |
|---|---|
| GPS-Icon | GPS aktivieren / deaktivieren, Auto-Follow |
| Track-Icon + Zähler-Badge | GPX-Panel öffnen (Track-Tab) |
| Record-Dot-Icon | GPX-Panel öffnen (Aufnahme-Tab) |
| Mond/Sonne-Icon | Dark/Light Mode umschalten |
| Übersicht-Icon | Auf alle geladenen Tracks zoomen (`fitAll`) |
| Zahnrad-Icon | Einstellungen öffnen |

**Filter-Leiste (unterhalb der Topbar):**
Schnellfilter für Track-Kategorien:

| Chip | Farbe | Kategorie |
|---|---|---|
| Alle | Weiß | Alle Tracks anzeigen |
| Beginner | 🟢 `#27AE60` | Einsteigerfreundliche Strecken |
| Mittel | 🟡 `#D4A017` | Mittelschwere Strecken |
| Expert | 🟣 `#8E44AD` | Anspruchsvolle Trails |
| Logistik | 🔵 Blau | Organisationswege |

Ein aktiver Filter blendet alle anderen Track-Kategorien auf der Karte aus.

### Kartenlayer

Per **Layer-Button** kann zwischen den Hintergrundkarten gewechselt werden. Die Auswahl wird in LocalStorage gespeichert:

| Layer | Anbieter | Besonderheit |
|---|---|---|
| OpenTopoMap | opentopomap.org | Höhenlinien, topografisch (Standard) |
| OpenStreetMap | tile.openstreetmap.org | Klassische OSM-Karte |
| Waymarked Trails | tile.waymarkedtrails.org | MTB-/Wanderrouten als Overlay |
| Wikimedia Maps | maps.wikimedia.org | Klares, reduziertes Design |

> Tiles werden im Service Worker **Network-First** gecacht (bis zu 3.000 Kacheln). Bei Offline wird ein transparentes 1×1 px PNG als Platzhalter geliefert – die Karte bricht nicht ab.

---

## GPX-Tracks

### Tracks laden

Das **Seitenmenü** (Hamburger-Button) öffnet das Panel mit zwei Tabs: **Tracks** und **Aufnahme**.

#### Datei-Upload
1. Im Track-Tab auf **GPX hochladen** tippen
2. Eine oder mehrere `.gpx`-Dateien auswählen (Mehrfachauswahl unterstützt)
3. Tracks erscheinen sofort auf der Karte

#### URL-Import
1. GPX-URL in das URL-Feld einfügen
2. GitHub-Blob-URLs (`/blob/`) werden automatisch in `raw.githubusercontent.com`-Links umgewandelt
3. Bei CORS-Fehlern: optionaler Proxy-Schalter (Datenschutzhinweis wird angezeigt)
4. Tracks werden nach dem Laden gecacht (Service Worker GPX-Cache)

#### Offizielle GMTW-Strecken
Unter **Einstellungen → Strecken** sind alle offiziellen GMTW 2026-Strecken aus dem Repository (`Munimap/munimap.github.io`) aufgelistet. Einzeln oder alle auf einmal laden. Ein **Nach Updates suchen**-Button prüft das Repository auf neue oder geänderte GPX-Dateien (max. 50 Tracks, benötigt Internet).

### Kategorien & Farben

Jede Strecke erhält beim Laden eine Kategorie, die als Farbe auf der Karte und im Panel dargestellt wird:

- 🟢 **Beginner** – Grüne Linie
- 🟡 **Mittel** – Gelbe Linie  
- 🟣 **Expert** – Lila Linie
- 🔵 **Logistik** – Blaue Linie

### Track-Popup

Ein Klick auf eine GPX-Linie oder den Start-/Zielpin öffnet ein **Leaflet-Popup** mit:
- Kategorie-Badge (farbig)
- Track-Name
- Entfernung (km) + Koordinaten (klickbar → in Zwischenablage)
- Buttons: **Zur Startlinie navigieren** | **Strecke starten** | **Gesamte Strecke anzeigen** + Google Maps öffnen

### Track-Detail-Panel

Ein Klick auf einen Track in der Liste öffnet das **Detail-Panel** direkt in der Track-Liste:
- Kategorie-Punkt + Track-Name
- Statistiken: **Distanz (km)** | **Fahrtzeit** | **Runs** (gespeicherte Runden)
- Bestenliste (Leaderboard) mit Datum, Zeit und Gold-Highlight für Platz 1
- Export aller Rundenzeiten als **JSON**
- Buttons:
  - **Strecke starten & Zeit messen** → startet den Race-Modus
  - **Zur Startlinie navigieren** → aktiviert Navigation-HUD
  - **Gesamte Strecke anzeigen** → Karte zoomt auf Track + öffnet Höhenprofil
  - Google Maps öffnen (Fahrrad-Navigation zur Startlinie)

### Höhenprofil

Beim Klick auf **Gesamte Strecke anzeigen** wird ein interaktives **Canvas-Höhenprofil** im unteren Panel angezeigt:
- X-Achse: Entfernung (km)
- Y-Achse: Höhe (m)
- Angezeigt: Min-/Max-Höhe, Gesamtaufstieg (m), Streckenlänge (km)
- Generiert aus den `<ele>`-Tags der GPX-Datei via leaflet-gpx

---

## Renntimer & Race-Modus

Der Race-Modus ist die Kernfunktion für den Wettkampfeinsatz. Er besteht aus einer **5-Phasen State Machine**:

```
idle → approaching → atline → go → racing → finished
```

### Phase 1 – Approaching (Annäherung)

Nachdem **„Strecke starten"** getippt wurde:

- Vollbild-Overlay öffnet sich
- Große Distanzanzeige zeigt Meter bis zur Startlinie
- GPS-Genauigkeit und Sensor-Status werden als Badges angezeigt:
  - **GPS** – grün (≤20 m), gelb (>20 m), grau (kein Signal)
  - **Sensor** – grün wenn Bewegungssensor aktiv (iOS/Android)
  - **BT** – Bluetooth-Smartwatch-Status
- Optional: **„Smartwatch BLE-GPS verbinden"** → startet Web Bluetooth Pairing
- Fahrer nähert sich der Startlinie

> **Technisch:** Adaptiver Detektionsradius = `max(3, min(8, GPS-Genauigkeit × 0.4))` Meter

### Phase 2 – At Line (Canvas-Annäherung)

Ab **5 Metern** zur Startlinie:

- Vollbild-Canvas-Animation:
  - **5 m → 2 m:** Distanz-Zahl in Amber (#f59e0b) → Lime (#c8ff00), wächst von 80px auf 150px
  - Text „Vorwärts zur Startlinie!" wird größer und heller
- GPS-Genauigkeit live in der Canvas-Ecke
- Ab **2 Metern** mit GPS-Genauigkeit ≤15 m: Bestätigungsdialog erscheint als Overlay über der Canvas:
  - **„Ja, Start!"** → armt den Auto-Cross-Detektor
  - **„Nochmal anfahren"** → zurück zu Phase 1 ohne Abbruch
- Nach Bestätigung wechselt Canvas zu **BEREIT!** / **START**-Anzeige (grün pulsierend)
- **Auto-Cross-Detektor:** Wenn der Fahrer nach dem Armen 1,5 m über den Minimalpunkt hinaus weiterfährt → automatischer Startschuss (kein Tippen nötig!)

### Phase 3 – GO!

- Kurze Vollbild-Anzeige: **„GO!"** (Animation pop-in, 800 ms)
- Vibration: 300 ms
- Timer startet (`performance.now()` für Millisekunden-Präzision)
- GPS-Track-Aufzeichnung beginnt
- Wake Lock wird aktiviert (Bildschirm bleibt an)

**Hintergrundmodus:** Wenn der Fahrer bereits fahrend bestätigt hat (App minimiert), läuft der Timer unsichtbar weiter – nur Toast-Benachrichtigungen bei Checkpoints.

### Phase 4 – Racing (Timer läuft)

Auf dem Renn-Screen sind sichtbar:
- **Track-Name**
- **Großer Timer** (mm:ss.t, 100 ms Intervall, Canvas-Font `Barlow Condensed`)
- **4 Split-Boxen** (Split 1, 2, 3, Ziel) – aktiver Split pulsiert blau, abgeschlossene leuchten grün
- **Aktuelle Geschwindigkeit** (km/h aus GPS)
- **Sturz/Absteige-Badges** (erscheinen live bei Erkennung)
- **Abbrechen**-Button mit Bestätigung

#### Checkpoint-Erkennung

Die 4 Checkpoints (3 Splits + Ziel) werden automatisch aus dem GPX-Track berechnet:
- Via `turf.lineChunk`: Track wird in 4 gleich lange Abschnitte geteilt
- Jeder Checkpoint liegt am Ende seines Abschnitts
- Erkannt wenn Fahrer-GPS < `cpRadius` Meter vom Checkpoint
- Bei Crossing: Vibration 100 ms, Split-Zeit wird eingetragen

#### Sturz- & Abstiege-Erkennung (Sensor Fusion)

```
Sturz:    Beschleunigungsmagnitude > 35 m/s² (3.5G-Spike) 
          → 400 ms später: Magnitude < 4 m/s² (liegt still) → "Sturz"
Absteigen: GPS-Geschwindigkeit fällt von > 5 km/h auf < 1 km/h → "Absteigen"
Throttle:  max. 1 Event alle 3 Sekunden
```

Events werden mit Zeitstempel (ms seit Start), GPS-Koordinaten und Typ gespeichert.

#### Bluetooth-Smartwatch GPS (optional)

- **Web Bluetooth API** – verbindet sich mit BLE-Geräten
- Dienste: Location & Navigation (`0x1819`), Cycling Speed & Cadence (`0x1816`), Heart Rate (`0x180D`)
- GPS-Koordinaten aus dem BT-Characteristic `0x2A67` (Location & Navigation)
- **Sensor Fusion:** BT-GPS und Geräte-GPS werden gemittelt wenn BT-Fix frisch (<3 s)
  `usedLat = (deviceLat + btLat) / 2` → höhere Positionsgenauigkeit

### Phase 5 – Ergebnisse

Nach dem Zieleinlauf:
- **Vibration:** 200-100-200-100-400 ms Muster
- Ergebnis-Screen mit:
  - Gesamtzeit (groß, `Barlow Condensed`)
  - Split-Karten (1–4)
  - **Kryptografische Signatur** (24-Zeichen HEX, HMAC-SHA-256)
  - **QR-Code** mit kompaktem signiertem Payload
  - **Bestenliste** (Top 8 für diese Strecke, Goldzeile = Platz 1)
- Buttons: **GPX exportieren** | **QR** | **Fertig**

#### Kryptografische Signatur (HMAC-SHA-256)

```javascript
secret = "GMTW26-RACE-" + run.date.slice(0, 10)  // tagesrotierender Schlüssel
payload = { trackId, date, totalMs, splits, rider, muni }
signature = HMAC-SHA256(secret, JSON.stringify(payload)).slice(0, 24)
```

Der Schlüssel rotiert täglich – eine Signatur ist nur am Erstellungstag gültig. Läuft vollständig via **Web Crypto API** im Browser, kein externes Service.

---

## GPS & Navigation

### GPS-FAB

- **Tippen:** GPS aktivieren → blaue Position + Genauigkeitskreis auf Karte
- **Auto-Follow:** Karte zentriert sich automatisch auf erste GPS-Fix und während Navigation
- **Zweites Tippen:** GPS deaktivieren
- Fehlerbehandlung mit konkreten Hinweisen:
  - Zugriff verweigert → Browser-Einstellungen öffnen
  - Kein Signal → draußen gehen / WLAN aktivieren
  - Timeout → Erneut versuchen

### Navigation-HUD

Nach **„Zur Startlinie navigieren"** erscheint ein fixiertes HUD unter der Topbar:
- **Richtungspfeil** (8 Himmelsrichtungen: ↑ ↗ → ↘ ↓ ↙ ← ↖) berechnet via Haversine + Bearing
- **Distanz** (m < 1.000 m, km ≥ 1.000 m) zum Startpunkt
- **Sub-Zeile:** Kompass-Grad + GPS-Genauigkeit
- **Google Maps öffnen** → Deep-Link (`maps.google.com/maps/dir/?api=1&travelmode=bicycling`)
- **X-Button** → Navigation beenden

**Auto-Transition:** Wenn der Fahrer <50 m vom Startpunkt entfernt ist und kein Rennen läuft → automatischer Wechsel in den Pre-Race-Modus.

### Startlinien-Visualisierung

Im Race-Modus wird die Startlinie als **Leaflet-Polyline** senkrecht zur Track-Richtung auf der Karte eingezeichnet (6 m breit, `#c8ff00`). Berechnet via `turf.destination` mit Bearing ±90°.

---

## Custom-Marker

Eigene Ortsmarken auf der Karte setzen und verwalten.

### Marker anlegen

1. **Doppelklick-Modus aktivieren** (Button in der Toolbar oder Einstellungen → Marker)
2. **Doppelklick** auf beliebige Kartenposition → Marker-Dialog öffnet sich
3. Felder ausfüllen:
   - **Name** (Pflichtfeld)
   - **Beschreibung** (optional, mehrzeilig)
   - **Kategorie** (farbige Pill-Auswahl)
   - **Emoji** (Emoji-Picker mit 15+ Optionen)
   - **Pin-Farbe** (Farbpalette)
4. **Speichern** → Pin erscheint sofort auf der Karte

### Marker-Design

Jeder Marker besteht aus:
- Einem **gedrehten Diamond-Pin** (CSS `rotate(-45deg)`, 30×36 px)
- Einem **Emoji** in der Mitte (rückgedreht mit `rotate(45deg)`)
- Einer **Schattenspitze** (CSS-Dreieck unten)
- Farblich kodiert nach Kategorie/Farbe

### Marker bearbeiten & löschen

Über **Einstellungen → Marker-Tab**:
- Vollständige Liste aller eigenen Marker, gruppiert nach Kategorie
- Je Marker: **Bearbeiten**, **Auf Karte springen**, **Löschen**
- Marker-Größe global anpassen via **Slider** (Prozentwert, persistent)

### Marker teilen

Über **Einstellungen → Backup → Nur eigene Marker**:
- Export als JSON
- Import von JSON (Merge-Logik, keine Duplikate)
- QR-Code für einzelnen Marker → Google-Maps-Navigation beim Scannen

---

## QR-Code-System

Alle QR-Codes werden vollständig lokal generiert – kein externer Dienst, kein Tracking.

### QR-Typen

| Typ | Inhalt | Verwendung |
|---|---|---|
| **Standort-QR** | `https://www.google.com/maps?q=lat,lng` | Navigation zu Marker/POI |
| **Race-Ergebnis-QR** | Kompakter JSON-Payload mit Signatur | Ergebnis teilen/scannen |
| **Track-QR** | GPX-URL oder Bundle | Track übertragen |

### Race-Ergebnis-QR-Payload

```json
{
  "app": "GMTW26",
  "track": "Track-Name",
  "date": "ISO-Datum",
  "total": "02:34.5",
  "splits": [
    { "s": "Split 1", "t": "00:38.2" }
  ],
  "falls": 0,
  "pts": 142,
  "sig": "a3f7c2b19e4d8f61"
}
```

### QR-Scanner

Unter **Einstellungen → QR-Tab**:
- **Kamera-basierter Scanner** (jsQR 1.4.0, läuft lokal)
- Erkennt automatisch:
  - GPX-Track-URLs → direkt laden
  - Marker-Pakete (JSON) → importieren
  - GMTW-Backups → importieren
  - GPX-Bundles
- Kamera wird beim Schließen der Einstellungen freigegeben (`stopQrScanner()`)

### QR-Code Actions

- **Anzeigen** – QR-Canvas im Dialog
- **Kopieren** – als PNG in die Zwischenablage
- **Herunterladen** – `qr-code.png` via `<a download>`

---

## Einstellungen & Profil

Das Einstellungs-Panel öffnet sich von unten (Slide-Up-Animation). Es ist in **6 Tabs** gegliedert:

### Tab: Allgemein

| Einstellung | Funktion | Speicherort |
|---|---|---|
| GPS-Emoji | Eigenes Emoji für den GPS-Standortpunkt | LocalStorage |
| Home-Region | Lat/Lng als Standard-Kartenmittelpunkt | LocalStorage |
| Aktuelle Kartenmitte übernehmen | Füllt Lat/Lng-Felder automatisch | – |
| Home-Fokus löschen | Entfernt gespeicherte Home-Koordinaten | LocalStorage |
| Karten-Layer | Standard-Hintergrundkarte wählen | LocalStorage |

Koordinaten-Validierung: `-90 ≤ lat ≤ 90`, `-180 ≤ lng ≤ 180`.

### Tab: Profil

Das Fahrerprofil wird automatisch in alle Rennergebnisse eingetragen:

| Feld | Beschreibung |
|---|---|
| Name | Echter Name des Fahrers |
| Muni-Name | Spitzname / Muni-Alias |
| Radgröße | z.B. 24", 26", 29" |
| Farbe | Farbe des Einrads |
| Bremse | Bremstyp |
| Sattelklemmen-Farbe | Farbdetail |
| Besonderheiten | Freitext |

Das Profil-Card zeigt Avatar (Initialen-Emoji), Name, Muni-Name und alle Details als Chips.  
**Quick-Actions:** Schnell in einen Rennenstart springen.

Gespeichert als JSON in LocalStorage (`gmtw-profile`).

### Tab: Strecken

- Liste aller offiziellen GMTW 2026 Strecken aus dem Repository
- Status je Strecke: geladen / nicht geladen
- **Einzeln laden** oder **Alle fehlenden Strecken laden** (benötigt Internet)
- **Nach Updates suchen** – prüft Repository auf neue GPX-Dateien
- Geladene Strecken können per Bestätigungsdialog entfernt werden

### Tab: Marker

- Vollständige Marker-Liste, nach Kategorien gruppiert
- Bearbeiten, Löschen, Auf Karte springen
- **Marker-Größen-Slider** (skaliert alle Marker-Pins prozentual)
- Zähler je Kategorie-Abschnitt

### Tab: Backup

→ Siehe Abschnitt [Backup & Restore](#backup--restore)

### Tab: App (PWA-Installation)

- Installations-Status-Card (installiert / nicht installiert)
- Geräteinfo (Browser, Plattform)
- **Cache-Statistiken:**
  - Tile-Cache (Anzahl gecachter Karten-Kacheln)
  - Shell-Cache (App-Dateien)
  - GPX-Cache (Strecken)
  - Font-Cache (Schriftarten)
  - Data-Cache (sonstige)
  - **Gesamt**
- **Karten-Bereich cachen** – lädt alle Tiles des sichtbaren Bereichs vor
- **Tile-Cache leeren** – löscht nur Karten-Kacheln
- **Factory Reset** – löscht alle Caches via `CLEARALLCACHES`-Message an Service Worker
- Persistenter Speicher-Status (IndexedDB dauerhaft gesichert?)

### Tab: QR-Scanner

→ Siehe Abschnitt [QR-Code-System](#qr-code-system)

---

## Backup & Restore

### Vollständiges Backup exportieren

**Einstellungen → Backup → GMTWBackup.json erstellen**

Enthält:
```
✅ GPX-Strecken (mit gpxString)      ✅ Alle Rennergebnisse
✅ Custom-Marker                      ✅ Marker-Größe
✅ GPS-Emoji                          ✅ Home-Position + Theme
✅ Fahrerprofil                       ✅ Karten-Layer-Konfiguration
```

Format: `GMTWBackup_YYYY-MM-DD.json` (Version 5).

**Plattform-Handling:**
- Chrome/Edge Desktop: **File System Access API** (Speicherort wählbar)
- iOS/Firefox/PWA: Fallback auf `Blob`-Download

### Backup importieren

1. **Einstellungen → Backup → Backup-Datei auswählen**
2. JSON-Datei wählen
3. **Merge-Logik:** Vorhandene Daten werden nicht gelöscht, neue Einträge hinzugefügt
4. App wird nach dem Import automatisch neu geladen

### Nur Marker exportieren/importieren

- Export: einzelne Marker-Kategorie oder alle Custom-Marker als JSON
- Import: JSON-Datei, Duplikat-Prüfung über ID
- Teilen mit anderen GMTW-Nutzern

### Lauf-GPX exportieren

Im Race-Ergebnis-Screen: **GPX-Button** → exportiert den aufgezeichneten GPS-Track als `.gpx`-Datei:
- Format: GPX 1.1 mit `gpxtpx:speed`-Extension
- Enthält: alle Track-Punkte mit Koordinaten, Höhe, Zeit, Geschwindigkeit
- Dateiname: `<Trackname>_lauf_YYYY-MM-DD.gpx`

### Lauf-JSON exportieren

**GPX-Tab nach Ergebnis oder Profil-Tab:**
- Vollständiger Lauf-Datensatz inkl. GPS-Track, Splits, Fallereignisse, Signatur
- Dateiname: `<Trackname>_lauf_YYYY-MM-DD.json`

---

## Offline-Betrieb & Service Worker

### Offline-Fähigkeit

| Funktion | Offline möglich? |
|---|---|
| Karte laden (gecachte Tiles) | ✅ |
| GPX-Tracks anzeigen | ✅ (wenn gecacht) |
| Renntimer & Race-Modus | ✅ |
| Custom-Marker | ✅ |
| QR generieren | ✅ |
| QR scannen | ✅ |
| Backup exportieren | ✅ |
| Neue GPX-Tracks per URL laden | ❌ (benötigt Internet) |
| Neue Karten-Tiles in unbekannten Gebieten | ❌ |
| Nach Track-Updates suchen | ❌ |

### Service Worker v6 – Cache-Strategien

Der Service Worker (`service-worker.js`) verwendet **5 getrennte Caches**:

```
gmtw-v6-shell   → App-Shell (HTML, JS, CSS, Icons, Libs)
gmtw-v6-tiles   → Karten-Tiles (max. 3.000, FIFO-Rotation)
gmtw-v6-gpx     → GPX-Strecken (max. 200)
gmtw-v6-fonts   → Schriftarten (max. 150)
gmtw-v6-data    → Sonstiges
```

**Routing-Tabelle:**

| Request-Typ | Strategie | Fallback |
|---|---|---|
| Navigation (HTML) | Network-First | gecachte `index.html`, dann Offline-HTML |
| App-Shell Assets | Cache-First | – |
| Karten-Tiles | Network-First | Transparent-PNG (1×1 px) |
| GPX-Tracks | Cache-First + Hintergrund-Update | 503 |
| Fonts | Stale-While-Revalidate | gecachter Font |
| Alles andere | Network-First | Cache-Fallback, 503 |

**Offline-Fallback-Seite:** Wenn komplett offline und kein Cache vorhanden → eigene Offline-HTML-Seite mit Anleitung zum Vorab-Cachen.

### Vorab-Cachen per Message API

```javascript
// Tiles eines Gebiets vorab cachen
sw.postMessage({ type: 'PREFETCH_TILES', urls: [...] })

// GPX-Tracks vorab cachen  
sw.postMessage({ type: 'PREFETCH_GPX', urls: [...] })

// Cache-Statistik abfragen
sw.postMessage({ type: 'GET_CACHE_SIZE' })

// Tile-Cache leeren
sw.postMessage({ type: 'CLEAR_TILE_CACHE' })

// Factory-Reset (alle Caches)
sw.postMessage({ type: 'CLEAR_ALL_CACHES' })
```

**FIFO-Rotation:** Wenn ein Cache das Limit überschreitet, werden älteste Einträge automatisch entfernt (`trimCache()`).

---

## Technische Umsetzung

### Architektur: Single-File PWA

```
index.html
├── <style>         Gesamtes CSS (~2.000 Zeilen, CSS Custom Properties)
├── <script>        Inline: leaflet-gpx 1.7.0 + qrcode-generator 1.4.4
└── <script>        App-Logik (~5.000+ Zeilen vanilla JS)
```

Keine Build-Pipeline, kein Transpiler, kein Framework. Läuft direkt im Browser.

### Datenspeicherung

| Datenkategorie | Speicherort | Limit |
|---|---|---|
| Einstellungen (Theme, Layer, Emoji, Home) | LocalStorage | ~5 MB |
| Fahrerprofil | LocalStorage (`gmtw-profile`) | – |
| GPX-Track-Daten (Strings) | localforage (IndexedDB) | Browser-Limit |
| Rennergebnisse / Leaderboard | localforage (IndexedDB) | max. 50/Track |
| Custom-Marker | localforage (IndexedDB) | – |
| Karten-Tiles | Service Worker Cache API | 3.000 Tiles |
| GPX-Dateien | Service Worker Cache API | 200 Dateien |
| App-Shell | Service Worker Cache API | statisch |

**Persistenter Speicher:** Die App fordert beim ersten Start `navigator.storage.persist()` an – verhindert Browser-seitiges automatisches Cache-Löschen.

### GPS-Stack

```
navigator.geolocation.watchPosition()
  ├── Koordinaten → GPS-Dot auf Karte (L.circleMarker)
  ├── → onNavGpsUpdate() → Navigation-HUD (Bearing, Distanz)
  ├── → onRaceGpsUpdate() → Race State Machine
  │     ├── BT-Sensor-Fusion (Durchschnitt wenn fresh)
  │     ├── approaching: Distanz zur Startlinie
  │     ├── atline: Canvas-Animation + Auto-Cross-Detektor
  │     ├── racing: GPS-Track aufzeichnen, Checkpoint-Check
  │     └── finished: Wake Lock freigeben
  └── Throttling: Punkt wird nur hinzugefügt wenn >5m bewegt oder >2s
```

### Race State Machine (vereinfacht)

```
idle
 └─[beginPreRace(trackId)]──→ approaching
      └─[dist < 5m, acc ≤ 20m]──→ atline (Canvas)
           └─[dist < 2m + confirm OR auto-cross]──→ go (800ms)
                └─[setTimeout 800ms]──→ racing (Timer läuft)
                     └─[Ziel-Checkpoint passiert]──→ finished
                          └─[closeRaceOverlay()]──→ idle
```

### Geo-Berechnung: Checkpoints

```javascript
// Turf.js: Track in 4 Segmente teilen
const line = turf.lineString(coords)           // GPX-Punkte → GeoJSON
const totalKm = turf.length(line, {units: 'kilometers'})
const segKm = totalKm / 4

for (let i = 1; i <= 4; i++) {
  const pt = turf.along(line, segKm * i, {units: 'kilometers'})
  checkpoints.push({ lat, lng, isFinish: i === 4 })
}
```

### Signatur-Verifikation (HMAC-SHA-256)

```javascript
// Web Crypto API, kein externes Package
const secret = "GMTW26-RACE-" + date.slice(0, 10)
const key = await crypto.subtle.importKey("raw",
  new TextEncoder().encode(secret),
  { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
const sig = await crypto.subtle.sign("HMAC", key,
  new TextEncoder().encode(payload))
// → 24-Zeichen HEX-String
```

### CSS-Theming: Custom Properties

```css
:root {
  --bg:  #0b0e14;   /* Hintergrund */
  --s1:  #141620;   /* Ebene 1     */
  --s2:  #1c1f2e;   /* Ebene 2     */
  --s3:  #22263a;   /* Ebene 3     */
  --ac:  #c8ff00;   /* Akzent (Lime-Grün) */
  --tx:  #eee;      /* Text        */
  --td:  #8a9ab5;   /* Text gedimmt */
  --bd2: #2a3349;   /* Border      */
  --fh:  'Barlow Condensed'; /* Headline-Font */
}
```

Light-Mode überschreibt alle Werte via `[data-theme="light"]`.

### Manifest & PWA-Konfiguration

```json
{
  "display": "standalone",
  "display_override": ["window-controls-overlay", "standalone", "minimal-ui"],
  "orientation": "any",
  "categories": ["sports", "navigation", "maps"],
  "launch_handler": { "client_mode": "navigate-existing" },
  "handle_links": "preferred"
}
```

---

## Projektstruktur

```
munimap.github.io/
├── index.html                  # Gesamte App (HTML + CSS + ~7.000 Zeilen JS)
├── manifest.json               # PWA-Manifest
├── service-worker.js           # Offline-Caching (v6, 5 Strategien, ~350 Zeilen)
├── icons/
│   ├── icon-192.png            # App-Icon standard
│   ├── icon-512.png
│   ├── icon-maskable-192.png   # Adaptive Icon (Android)
│   └── icon-maskable-512.png
└── (tracks/)                   # Optional: GPX-Dateien (auch per URL ladbar)
```

---

## Lokale Entwicklung

Da die App ein statisches Single-File-Projekt ohne Build-Pipeline ist, genügt ein lokaler HTTP-Server:

```bash
# Python 3
python3 -m http.server 8080

# Node.js
npx serve .

# Browser öffnen
open http://localhost:8080
```

> **Wichtig:** Das `file://`-Protokoll funktioniert **nicht** – der Service Worker erfordert zwingend `http://` oder `https://`.

### HTTPS für GPS & Sensoren

GPS (`navigator.geolocation`), DeviceMotion, Web Bluetooth und Web Crypto erfordern **HTTPS** oder `localhost`. Für lokale Entwicklung reicht `localhost`; für Deployment auf GitHub Pages ist HTTPS automatisch aktiv.

---

## Verwendete Bibliotheken

| Bibliothek | Version | Einbindung | Zweck |
|---|---|---|---|
| [Leaflet](https://leafletjs.com/) | 1.9.4 | CDN (unpkg) | Kartenrendering, Marker, Popups |
| [leaflet-gpx](https://github.com/mpetazzoni/leaflet-gpx) | 1.7.0 | **Inline** (kein CDN) | GPX-Parsing, Höhenprofil, Waypoints |
| [localforage](https://localforage.github.io/localForage/) | 1.10.0 | CDN (jsDelivr) | IndexedDB-Wrapper (Tracks, Runs, Marker) |
| [Turf.js](https://turfjs.org/) | 7 | CDN (jsDelivr) | Checkpoint-Berechnung, Startlinie, Distanzen |
| [jsQR](https://github.com/cozmo/jsQR) | 1.4.0 | CDN (jsDelivr) | Kamera-basierter QR-Scanner |
| [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) | 1.4.4 | **Inline** | QR-Code-Generierung (Canvas) |
| [Barlow / Barlow Condensed](https://fonts.bunny.net/) | – | Bunny.net (EU) | UI-Schriftarten (DSGVO-konform) |

> **Datenschutz:** Alle CDN-Bibliotheken (Leaflet, localforage, Turf, jsQR) werden beim ersten Start gecacht und danach offline geliefert. Kein Tracking, keine Cookies, keine Analytics. Fonts kommen von **Bunny.net** (EU-Hosting) statt Google Fonts.

---

## Datenschutz

- Alle Nutzerdaten (Tracks, Rennen, Marker, Profil) bleiben **ausschließlich lokal** im Browser
- Kein Backend, keine Datenbank, keine API-Calls mit Nutzerdaten
- GPS-Koordinaten werden nie an externe Server übermittelt
- QR-Codes werden lokal generiert
- Rennsignaturen laufen via Web Crypto API lokal

---

<p align="center">
  Gebaut mit ❤️ für das <strong>GMTW</strong> · Hohensyburg / Herdecke · Ja man!
</p>
