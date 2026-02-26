<div align="center">

<img src="icons/icon-192.png" alt="GMTW Trail Map Logo" width="96" height="96" style="border-radius:20px"/>

# 🌲 GMTW Trail Map

**Die lokale, offline-fähige Trail-Karte für das GMTW Event in Hohensyburg/Herdecke.**

*Kein Server. Kein Tracking. Kein Internet nötig. Läuft auf deinem Gerät. Ja man!*

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-4ade80?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Offline First](https://img.shields.io/badge/Offline-100%25-38bdf8?style=for-the-badge&logo=signal&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
[![License](https://img.shields.io/badge/License-Apache%202.0-c8ff00?style=for-the-badge&logoColor=black)](LICENSE)
[![Privacy](https://img.shields.io/badge/Privacy-Local%20Only-a78bfa?style=for-the-badge&logo=shield&logoColor=white)](https://munimap.github.io/)
[![No Backend](https://img.shields.io/badge/Backend-None-ef4444?style=for-the-badge)](https://munimap.github.io/)

[**→ Live Demo öffnen**](https://munimap.github.io/)

</div>

---

## 🧭 Was ist MuniMap?

MuniMap ist eine **Progressive Web App (PWA)**, die als vollständige Trail-Navigation, Zeitnahme-System und lokaler Datenaustausch-Hub funktioniert – **komplett ohne Backend, ohne Cloud, ohne Tracking**. Die App ist eine einzige `index.html`-Datei und läuft vollständig im Browser deines Smartphones.

Entwickelt für das **GMTW Event in Hohensyburg/Herdecke**, ist sie jedoch universell als GPX-Viewer, Strecken-Recorder und Offline-Karte einsetzbar.

**Das Design-Prinzip:** Alles, was du brauchst, ist lokal. GPS-Daten, Strecken, Zeiten, Marker – alles bleibt auf deinem Gerät.

---

## 📋 Inhaltsverzeichnis

- [Installation](#-installation)
- [Die Benutzeroberfläche auf einen Blick](#-die-benutzeroberfläche-auf-einen-blick)
- [Karte & Navigation](#-karte--navigation)
- [Strecken (GPX-System)](#-strecken-gpx-system)
- [Der Renn-Modus — vollständige Dokumentation](#-der-renn-modus--vollständige-dokumentation)
- [GPS-Recorder — eigene Strecken aufzeichnen](#-gps-recorder--eigene-strecken-aufzeichnen)
- [Eigene Marker setzen](#-eigene-marker-setzen)
- [QR-Code System — Lokaler Datenaustausch](#-qr-code-system--lokaler-datenaustausch)
- [Einstellungen](#-einstellungen)
- [Offline-Architektur](#-offline-architektur)
- [Tech Stack & Lizenzen](#-tech-stack--lizenzen)

---

## 📲 Installation

MuniMap kommt ohne App Store aus. Es wird direkt aus dem Browser auf den Homescreen installiert.

**Android (Chrome / Samsung Internet)**
1. Öffne [munimap.github.io](https://munimap.github.io/) im Browser
2. Tippe auf das Menü `⋮` → **„App installieren"** oder **„Zum Startbildschirm"**
3. Die App erscheint als Icon auf dem Homescreen und startet wie eine native App (Fullscreen, kein Browser-Chrome)

**iOS (Safari)**
1. Öffne die Seite in Safari
2. Tippe auf das **Teilen-Symbol** `⎋`
3. Wähle **„Zum Home-Bildschirm"**

> **💡 Offline-Hinweis:** Öffne die App einmal mit Internetverbindung und navigiere zur Zielregion auf der Karte. Der Service Worker lädt dabei automatisch alle Assets, Bibliotheken und sichtbaren Kartenkacheln in den Browser-Cache. Danach funktioniert die App dauerhaft im **Flugmodus**.

---

## 🖥️ Die Benutzeroberfläche auf einen Blick

### Top Bar
| Element | Funktion |
|:---|:---|
| `☰` Hamburger | Öffnet die **POI-Liste** (Bottom Sheet) mit allen Trailpunkten |
| `MUNI` Badge | Logo / Markenzeichen |
| `GMTW Trail Map` | Titelzeile mit Event-Standort |
| `⧉` Layer-Button | Wechselt zwischen **OpenTopoMap** (Topo) und **Esri Satellit** |

### Filter Bar (Chips)
Filtert sowohl die **Karten-Layer** als auch die **POI-Liste** gleichzeitig:

| Chip | Farbe | Zeigt |
|:---|:---|:---|
| `ALLE` | Weiß/Aktiv | Alle Kategorien sichtbar |
| `BEGINNER` | 🟢 Grün `#27AE60` | Einsteigerrouten |
| `MITTEL` | 🟡 Gelb `#D4A017` | Mittelschwere Routen |
| `EXPERT` | 🟣 Lila `#8E44AD` | Expertenstrecken |
| `LOGISTIK` | 🔵 Blau `#38bdf8` | Camp, WC, Sammelpunkte |

### FAB-Buttons (rechts unten, schwebend)
| Icon | Funktion |
|:---|:---|
| `⊕ GPS` | GPS aktivieren / deaktivieren |
| `📈 GPX` | GPX-Panel öffnen (Laden / Tracks / Aufnahme) |
| `● REC` | Direkt zur GPS-Aufnahme springen |
| `☀/🌙` | Dark/Light Mode umschalten |
| `⊞` | Alle sichtbaren Tracks/Marker in der Karte einpassen |
| `⚙` | Einstellungen öffnen |

---

## 🗺️ Karte & Navigation

### Kartenmodus wechseln
Über den **Layer-Button** (oben rechts) wechselst du zwischen zwei Karten:
- **OpenTopoMap** — Topografische Karte mit Höhenlinien, ideal für Trails
- **Esri Satellit** — Luftbild für maximale Geländeübersicht

Die aktuelle Kartenposition (Koordinaten + Zoom) wird automatisch in `localStorage` gespeichert und beim nächsten Start wiederhergestellt.

### GPS-Tracking
Tippe auf den **GPS-FAB** (`⊕`):

1. **Erster Klick:** GPS-Watcher wird gestartet (`navigator.geolocation.watchPosition` mit `enableHighAccuracy: true`). Der Button dreht sich (Ladeindikator) bis zum ersten Fix.
2. **Erster Fix:** Toast `"Standort ±Xm"` erscheint. Der Button leuchtet blau auf (`--log`). Auf der Karte erscheint:
   - **Blauer Dot** (16×16px) — deine Position
   - **Blaue Genauigkeitskreis-Fläche** — Radius entspricht GPS-Genauigkeit in Metern
3. **Zweiter Klick:** GPS wird deaktiviert, Dot und Kreis werden entfernt.

> Der GPS-Dot-Icon skaliert sich dynamisch mit dem Zoom-Level der Karte (Zoom 10 = 20px, Zoom 20 = 52px).

Das aktive GPS-Emoji (Standard: `📍`, anpassbar in Einstellungen) wird als Icon auf der Karte angezeigt. Bei Zoom-Änderungen skaliert das Icon automatisch.

### Navigation zum Startpunkt einer Strecke

Aus dem **Track-Popup** oder **Track-Detail-Panel** heraus startet die **In-App-Navigation**:

1. Ein **Nav-HUD** erscheint unterhalb der Filter-Bar mit:
   - Richtungs-Pfeil (Kompasspeilung in 8 Himmelsrichtungen `↑ ↗ → ↘ ↓ ↙ ← ↖`)
   - Distanz zum Startpunkt (in m / km)
   - GPS-Genauigkeit in Metern
   - Link zu Google Maps (externe Navigation)
2. Eine **gestrichelte Linie** auf der Karte verbindet deinen GPS-Standort mit dem Startpunkt der Strecke.
3. Die Karte fliegt automatisch zum Startpunkt (`flyTo`, Zoom 16, animiert).
4. **Auto-Übergabe:** Sobald du dich auf **≤ 50m** dem Startpunkt näherst und der Renn-Modus inaktiv ist, startet automatisch `beginPreRace()` — der Übergang in den Rennmodus ist nahtlos.

---

## 📁 Strecken (GPX-System)

Das GPX-Panel wird über den **GPX-FAB** geöffnet. Es hat drei Tabs:

### Tab 1: Laden

#### A) Datei-Upload (lokal, kein Server)
- Wähle eine oder mehrere `.gpx`-Dateien vom Gerätespeicher
- Alternativ: **Drag & Drop** auf die Karte (grüner gestrichelter Overlay erscheint)
- Der `FileReader` liest die Dateien als UTF-8-Text, bereinigt BOM und prüft auf valides GPX-XML
- Maximum **50 Tracks** gleichzeitig

#### B) URL-Laden
- GPX direkt von einer URL laden (z.B. `https://raw.githubusercontent.com/...track.gpx`)
- **Auto-Korrektur:** GitHub `blob/`-URLs werden automatisch in `raw.githubusercontent.com`-Links umgewandelt
- Bei CORS-Fehlern kann ein **CORS-Proxy** (`corsproxy.io`) aktiviert werden

#### C) Kategorie-Auswahl
Vor dem Laden wird die Kategorie des Tracks festgelegt: `Beginner / Mittel / Expert`

---

### Tab 2: Tracks

Hier siehst du alle geladenen GPX-Strecken als Liste. Pro Track:

| Element | Beschreibung |
|:---|:---|
| **Farbpunkt** | Kategoriefarbe des Tracks |
| **Name** | Trackname (aus GPX-Metadaten oder Dateiname) |
| **Meta** | Kategorie · Distanz (km) · Dauer · Laufanzahl · Bestzeit |
| `LIVE`-Badge | Erscheint in Rot wenn dieser Track gerade gezählt wird |
| **Auge-Icon** | Track auf Karte ein-/ausblenden |
| **QR-Icon** | Track-QR-Code für Offline-Weitergabe generieren |

Tippe auf einen Track-Eintrag → öffnet das **Track-Detail-Panel**.

#### Kategorie-Filter im GPX-Panel
Separater Filter nur für die Track-Liste: `Alle / Beginner / Mittel / Expert`

---

### Track-Detail-Panel

Öffnet sich beim Klick auf einen Track in der Liste oder via Start-Marker-Popup auf der Karte. Zeigt:

- **Stats-Leiste:** Distanz (km), Dauer, Höhenmeter (Aufstieg)
- **Höhenprofil:** Gezeichnet auf einem `<canvas>` mit Min/Max/Aufstieg/Distanz-Anzeige
- **Bestenliste (Leaderboard):** Bis zu 5 beste Zeiten dieses Tracks mit Datum (gold hervorgehoben)
- **Aktionsbuttons:**

| Button | Aktion |
|:---|:---|
| 🏁 **Timing starten** | Startet den Renn-Modus für diesen Track |
| 🔵 **Navigation** | Startet die In-App-Navigation zum Startpunkt |
| 🗺️ **Google Maps** | Öffnet Google Maps mit Fahrrad-Navigation zum Start |

---

### Start- und Ziel-Marker auf der Karte

Jeder geladene Track bekommt automatisch:
- **Start-Pin** (rautenförmig, Kategoriefarbe, Flag-Emoji `🚩`) am ersten GPX-Punkt
- **Ziel-Pin** (rautenförmig, dunkler Hintergrund, Checkered-Flag `🏁`) am letzten GPX-Punkt

Klick auf den Start-Pin öffnet ein **Track-Popup** mit:
- Kategorie-Badge (farbig)
- Trackname
- GPS-Koordinaten (anklickbar → kopiert in Zwischenablage)
- Buttons: `Navigation` / `Timing` / `QR` / `Details`

---

### Offizieller Auto-Download (GMTW 2026)

Beim Start prüft die App automatisch, welche offiziellen GMTW-Strecken noch nicht geladen sind, und lädt sie **still im Hintergrund** von GitHub:

```
GMTW 2026 Beginner
GMTW 2026 Beginner/Mittel
GMTW 2026 Expert 1, 2, 3
GMTW 2026 Mittel
```

Quelle: `https://raw.githubusercontent.com/Munimap/munimap.github.io/main/gpx/`

Im Einstellungen → Tab **„Strecken"** kann manuell nach neuen Strecken gesucht werden (GitHub API-Abfrage).

---

## 🏁 Der Renn-Modus — vollständige Dokumentation

Der Renn-Modus ist das Herzstück der App. Er ist eine vollständige **GPS-basierte Zeitnahme** mit Checkpoint-System, lokalem Leaderboard und Ergebnis-QR-Code — vollständig offline.

### Übersicht: State Machine

```
IDLE ──► APPROACHING ──► AT_LINE ──► GO ──► RACING ──► FINISHED
          (Anfahrt)      (Canvas)   (GO!)  (Timer)    (Ergebnis)
              │
              └──► BACKGROUND_MODE (Timer läuft still, kein Overlay)
```

---

### Phase 1: APPROACHING — Anfahrt zur Startlinie

**Auslöser:** Klick auf „Timing starten" in Track-Detail oder Popup.

Was passiert beim Start:
1. `beginPreRace(trackId)` wird aufgerufen
2. GPS wird sichergestellt (`ensureGpsActive()` — falls noch nicht aktiv, wird `watchPosition` gestartet)
3. **Wake Lock** wird angefordert (`navigator.wakeLock.request('screen')`) → Bildschirm bleibt an
4. **Checkpoint-Marker** werden auf der Karte platziert:
   - 3 Zwischenpunkte (leuchtendes Grün `rgba(196,255,0)`)
   - 1 Ziel-Checkpoint (leuchtend Rot)
5. Das **Race-Overlay** erscheint als Vollbild (`z-index: 2000`)

**Anfahrt-Screen (`rp-approaching`):**

```
        🚩
   FAHRE ZUR STARTLINIE
   [Trackname]

        847
         m

   GPS ±8m
   ┌─────────────────────────────────────────┐
   │ Tipp: Fahre zur grünen Startlinie auf  │
   │ der Karte und warte auf das Signal.     │
   └─────────────────────────────────────────┘
```

- Die große Zahl zeigt die **aktuelle Distanz zum Startpunkt in Metern** (live aktualisiert via GPS)
- GPS-Genauigkeit wird darunter angezeigt
- Ein `×`-Button (oben rechts) bricht ab ohne Bestätigung

**Trigger bei ≤ 5m + GPS-Genauigkeit ≤ 20m:**
→ Wechsel zu **Phase 2 (AT_LINE)**

---

### Phase 2: AT_LINE — Canvas-Annäherung & Startlinie

Sobald du **weniger als 5 Meter** vom Startpunkt entfernt bist und die GPS-Genauigkeit ≤ 20m beträgt:

1. Die **Startlinie** wird auf der Karte eingezeichnet: ein leuchtend grüner (`#c8ff00`) Querbalken, **6 Meter breit**, senkrecht zur Fahrtrichtung (berechnet via `turf.bearing` + `turf.destination`)
2. Das Overlay wechselt zur **Canvas-Ansicht** (`rp-approach`)

**Canvas-Approach-Screen:**

Der Vollbild-Canvas (`requestAnimationFrame`-Loop) zeigt:
- **Dunkel-animierter Hintergrund**
- Die **Distanz in Metern** als große Zahl — die Farbe wechselt dynamisch:
  - `5m → 2m`: Von Amber `#f59e0b` zu Neongrün `#4ade80`
  - Die Zahlengröße wächst von 80px auf 150px je näher du kommst
- Text `"Bitte vorwärts fahren"` mit wachsender Deckkraft
- GPS-Genauigkeit-Anzeige unten (`GPS ±Xm`)

**Puls-Animation bei "BEREIT":** Wenn du ≤ 2m bist und Genauigkeit ≤ 15m, erscheint die grüne Startlinien-Visualisierung (`rsl-vis`) mit pulsierendem Glow.

**Bestätigungsdialog bei ≤ 2m** (erscheint einmalig, `confirmShown`-Flag):

```
┌──────────────────────────────────┐
│  STARTLINIE ERREICHT             │
│  Rennen starten?                 │
│                                  │
│  [JA, LOS!]    [Nein, zurück]   │
└──────────────────────────────────┘
```

- **JA, LOS!** → `confirmRaceStart(true)` → **Background-Modus** oder normaler Start
- **Nein, zurück** → Kein Abbruch! Der Fahrer kehrt zur Anfahrtsphase zurück — er kann es erneut versuchen. Startlinie wird entfernt, `confirmShown` wird zurückgesetzt.

**Background-Modus (opt-in):**
Falls der Nutzer „JA" bestätigt hat, läuft der Timer **ohne Fullscreen-Overlay** — Toast `"Zeitmessung gestartet – Viel Erfolg!"` und das Rennen läuft still im Hintergrund. Nützlich, wenn du die Karte weiter nutzen willst.

---

### Phase 3: GO! — Startschuss

```
         GO!
    ZEITMESSUNG LÄUFT
```

- Große `GO!`-Animation (100px, Pop-Animation mit Cubic-Bezier)
- **Vibration:** 300ms Impuls
- Nach 800ms automatischer Übergang zu **Phase 4 (RACING)**
- Timer-Interval wird gestartet (`setInterval`, 100ms Takt)
- `RACE.startTs = performance.now()` → hochpräziser Timestamp

---

### Phase 4: RACING — Zeitmessung

**Lauf-Screen (`rp-running`):**

```
  [TRACKNAME]

     04:23.7      ← Laufzeit (58px, Neon-Grün)
      23.4 kmh    ← Aktuelle Geschwindigkeit live

  ┌────────┬────────┬────────┬────────┐
  │Split 1 │Split 2 │Split 3 │  Ziel  │
  │        │        │        │        │   ← Aktiver Split blinkt blau
  │  --:-- │  --:-- │  --:-- │  --:-- │
  └────────┴────────┴────────┴────────┘

             [RENNEN ABBRECHEN]
```

**Was passiert technisch:**
- `tickTimer()` (100ms): Aktualisiert die Timer-Anzeige via `performance.now() - RACE.startTs`
- `processRacePosition(lat, lng, acc, speed)`: Wird bei jedem GPS-Update aufgerufen
  - Berechnet Distanz zu nächstem Checkpoint (`distM()`)
  - Bei ≤ 5m: Split wird ausgelöst, `RACE.splitTimes.push(splitMs)`, Vibration 100ms
  - Split-Box wechselt von `active` (blau pulsierend) zu `done` (grün)
  - Nächster Checkpoint wird aktiviert

**Checkpoint-System:**
Die 4 Checkpoints (3 Splits + Ziel) werden automatisch gleichmäßig entlang des GPX-Tracks verteilt (`computeCheckpoints()`).

**Abbruch-Bestätigung:**
Klick auf „Rennen abbrechen" → Inline-Bestätigungsdialog erscheint im laufenden Screen:
```
  Rennen wirklich abbrechen?
  [Ja, abbrechen]   [Weiterlaufen]
```

---

### Phase 5: FINISHED — Ergebnis & Speicherung

**Was passiert beim Ziel-Erreichen (`finishRace()`):**

1. **Vibration:** `200, 100, 200, 100, 400ms` (Victory-Muster)
2. **Zeit wird gespeichert** in IndexedDB via `localForage.setItem()`:
   ```json
   {
     "trackId": "...",
     "trackName": "GMTW 2026 Expert 1",
     "date": "2026-02-26T...",
     "totalMs": 263400,
     "splits": 
   }
   ```
3. **Max. 50 Runs pro Track** werden vorgehalten (sortiert nach Bestzeit, FIFO)
4. **Wake Lock** wird freigegeben

**Ergebnis-Screen (`rp-results`):**

```
          👑
       NEUE BESTZEIT
   GMTW 2026 Expert 1

       04:23.40        ← Gesamtzeit (52px, Neon-Grün)
        GESAMTZEIT

  ┌──────────┬──────────┐
  │ Split 1  │ Split 2  │
  │  1:01.20 │  1:08.40 │
  ├──────────┼──────────┤
  │ Split 3  │   Ziel   │
  │  1:12.10 │  1:01.70 │
  └──────────┴──────────┘

  BESTENLISTE
  🥇 1   26.02.26   04:23.40   ← Gold-Hervorhebung
     2   24.02.26   04:31.12
     3   23.02.26   04:44.89

  [QR-Code des Ergebnisses]   ← 120×120px Canvas

  [📤 ERGEBNIS TEILEN]   [💾 JSON EXPORT]
```

**Lokal generierter Ergebnis-QR-Code:**
Der QR-Code wird **sofort auf einem `<canvas>` lokal gerendert** (keine externe API). Das kodierte JSON-Payload:
```json
{
  "track": "GMTW 2026 Expert 1",
  "date": "2026-02-26T...",
  "total": "04:23.40",
  "splits": [
    {"s": "Split 1", "t": "01:01.20"},
    {"s": "Split 2", "t": "01:08.40"},
    {"s": "Split 3", "t": "01:12.10"},
    {"s": "Ziel",    "t": "01:01.70"}
  ]
}
```

**Aktionen nach dem Rennen:**
- **QR teilen:** Ein anderer Fahrer scannt diesen QR mit der App → Ergebnis wird angezeigt
- **JSON Export:** Vollständige Lauf-Daten als `.json`-Datei herunterladen
- **QR als Bild:** Canvas → PNG → Download

---

### Leaderboard & Persistenz

- Zeiten werden pro Track in **IndexedDB** gespeichert (kein Quota-Limit, überlebt Browser-Neustarts)
- Das **Track-Detail-Panel** zeigt die Top-5-Zeiten direkt am Track
- Der **Ergebnis-Screen** zeigt Top-8 mit Datum, Gold-Hervorhebung für Platz 1
- Die eigene aktuelle Zeit wird mit einem blauen Rahmen markiert (`cur-row`)
- Im Track-Listen-Eintrag wird die **Anzahl Läufe + Bestzeit** direkt angezeigt

---

## 🔴 GPS-Recorder — eigene Strecken aufzeichnen

> **Tab:** GPX-Panel → „Aufnahme"

Mit dem integrierten Recorder kannst du eigene GPX-Tracks direkt auf dem Gerät aufzeichnen.

### Aufnahme starten

1. Tippe auf **„Aufnahme starten"** — GPS wird aktiviert
2. Die rote **Rec-Bar** erscheint oben (pulsierender Dot + Laufzeit)
3. Eine **rote gestrichelte Linie** wird live auf der Karte gezeichnet

**Live-Anzeige während der Aufnahme:**
| Wert | Beschreibung |
|:---|:---|
| **Timer** | `HH:MM:SS` hochpräzise |
| **km** | Zurückgelegte Distanz (Haversine-Berechnung) |
| **Punkte** | Anzahl aufgezeichneter GPS-Punkte |
| **km/h** | Aktuelle Geschwindigkeit |

**Qualitätskontrolle:** GPS-Punkte mit Genauigkeit > 50m werden **automatisch verworfen**. Punkte werden nur hinzugefügt, wenn eine Mindestgeschwindigkeit (`MINSPEED`) überschritten wird (verhindert Drift beim Stehen).

### Pause & Fortsetzen
- **Pause:** Elapsed-Zeit wird gesichert, Aufnahme stoppt kurz
- **Weiter:** Nahtlose Fortsetzung — die Zeit läuft weiter, neue Punkte werden angehängt

### Aufnahme beenden & speichern

1. Tippe auf **„Stop"**
2. Ein **Speichern-Panel** erscheint:
   - Streckenname eingeben
   - Kategorie wählen (`Beginner / Mittel / Expert`)
3. **„In Karte laden & anzeigen"** → Der aufgezeichnete Track wird sofort als GPX in die Karte geladen und kann wie jede andere Strecke für den Renn-Modus genutzt werden
4. **GPX exportieren** → Valides `.gpx`-File mit `<trkpt>`, Elevation, Zeitstempeln und Geschwindigkeit
5. **JSON exportieren** → Rohdaten als JSON
6. **Aufnahme verwerfen** → Löscht alles

**Crash-Recovery:** Der aktuelle Aufnahme-Stand wird fortlaufend in `localStorage` gesichert (`gmtwrecv2`). Bei einem App-Crash oder Browser-Neustart wird die laufende Aufnahme automatisch wiederhergestellt.

---

## 📍 Eigene Marker setzen

> **Einstellungen → Tab „Marker"**

Du kannst eigene Punkte auf der Karte setzen und persistent speichern.

### Marker-Modus aktivieren

1. Einstellungen öffnen → Tab **„Marker"** → **„Neuen Marker setzen"**
2. Eine gelbe Info-Bar erscheint oben: `MARKER-MODUS • Doppelklick auf Karte zum Setzen`
3. **Doppelklick auf die Karte** → Öffnet das Marker-Erstellungs-Sheet mit den angeklickten Koordinaten

### Marker bearbeiten

Im **Marker-Dialog** (Bottom Sheet):
- **Name** (Pflichtfeld, max. 60 Zeichen)
- **Kategorie** (`Beginner / Mittel / Expert / Logistik`) → bestimmt die Pin-Farbe
- **Beschreibung** (optional, max. 500 Zeichen)
- **Google Maps Link** (optional)
- **Koordinaten** (automatisch gesetzt, readonly angezeigt)

### Marker auf der Karte

Eigene Marker erscheinen als farbige **Diamant-Pins** mit dem Kategorie-Emoji. Das **Popup** zeigt alle Infos und bietet:
- Navigation starten
- Marker bearbeiten
- Marker löschen

### Speicherung & Export

- Marker werden in **IndexedDB** via `localForage` gespeichert (`gmtwcustommarkersv1`)
- Im Einstellungen-Tab werden alle eigenen Marker aufgelistet
- Jeder Marker kann per **QR-Code geteilt** werden — ein anderes Gerät importiert den Marker beim Scannen direkt

---

## 📡 QR-Code System — Lokaler Datenaustausch

MuniMap verwendet QR-Codes als **serverlose, offline-fähige Datenschnittstelle** zwischen Geräten. Alle QR-Codes werden **lokal auf dem `<canvas>` gerendert** — keine externe API.

### Was kann per QR geteilt werden?

| Typ | Inhalt | Verwendung |
|:---|:---|:---|
| **POI-Navigation** | Google Maps URL mit Koordinaten | Öffnet direkt Navigation auf dem Empfänger-Gerät |
| **Ergebnis-QR** | JSON: Track, Datum, Gesamtzeit, alle Splits | Weitergabe von Rennergebnissen Gerät zu Gerät |
| **Track-QR** | GPX-Bundle oder URL + Metadaten | Importiert den Track direkt in die App |
| **Custom Marker** | JSON: Name, Kategorie, Koordinaten | Importiert einen Marker in die andere Instanz |
| **Vollbackup** | `gmtw-backup`-JSON | Überträgt alle Tracks + Marker auf neues Gerät |

### QR scannen

**Einstellungen → Tab „QR-Scan"**

1. QR-Scanner aktivieren (erfordert Kamerazugriff)
2. Kamera auf QR-Code richten — `jsQR` verarbeitet jeden Frame (`requestAnimationFrame`)
3. Die App **erkennt automatisch** den Typ des QR-Codes:
   - GMTW-Vollbackup → Import-Button erscheint
   - GPX-Bundle → Alle Tracks werden importiert
   - Einzel-Marker → Marker wird sofort hinzugefügt
   - Ergebnis-JSON → Wird als Ergebnis-Screen angezeigt

### QR speichern / teilen
- **Kopieren:** URL/Payload in Zwischenablage
- **Als PNG herunterladen:** Canvas → Blob → `<a download>`

---

## ⚙️ Einstellungen

> Einstellungen öffnen über den **⚙ FAB**

Das Einstellungs-Panel hat 5 Tabs:

### Tab: Allgemein
| Einstellung | Funktion |
|:---|:---|
| **GPS-Emoji** | Wähle ein Emoji aus dem Grid oder tippe ein eigenes ein. Wird als GPS-Icon auf der Karte verwendet. |
| **Home-Fokus** | Startkoordinaten der Karte (Lat/Lng). „Aktuelle Kartenposition" übernimmt die sichtbare Mitte. |

### Tab: Strecken
- Liste aller offiziellen GMTW-Strecken mit Status `GELADEN` / `FEHLT`
- Eigene (hochgeladene) Strecken werden separat aufgelistet
- **„Nach Updates suchen"** — prüft das GitHub-Repository auf neue `.gpx`-Dateien und bietet fehlende zum Import an

### Tab: Backup
- **Vollständiges Backup exportieren:** Alle Tracks + Marker als JSON-Datei
- **Backup importieren:** JSON per QR-Scan oder Datei wiederherstellen
- **Speichernutzung:** Zeigt `localStorage`-Belegung + IndexedDB-Einträge + Persistenz-Status
- **Tile-Cache leeren:** Entfernt alle gecachten Kartenkacheln
- **Alle Tracks löschen:** Entfernt alle GPX-Daten aus dem Speicher

### Tab: Marker
- Liste aller eigenen Custom-Marker
- Aktionen pro Marker: `Anzeigen` / `Bearbeiten` / `Löschen`
- Button: **„Neuen Marker setzen"** → aktiviert den Karten-Marker-Modus

### Tab: QR-Scan
- QR-Scanner ein-/ausschalten
- Ergebnis des letzten Scans wird hier angezeigt

---

## 🔌 Offline-Architektur

MuniMap ist von Grund auf für den Offline-Betrieb konzipiert. Der `service-worker.js` implementiert vier Caching-Strategien:

### Caching-Strategien im Überblick

```
Request → Service Worker → Strategie?
                │
       ┌────────┴────────┬────────────────┬─────────────────┐
       │                 │                │                 │
  App Shell        Karten-Tiles       Fonts           Sonstiges
  Cache-First      Network-First   Stale-While-     Network-First
                   + FIFO          Revalidate       + Cache-Fallback
```

### Cache-First (App Shell)
HTML, CSS, JS, Icons — alles wird beim **`install`-Event** sofort gecacht.
- Lädt **immer aus dem Cache** → sofortiger Start, auch offline
- Kein Netzwerk-Roundtrip für das UI

### Network-First + FIFO (Karten-Tiles)
Kacheln von `opentopomap.org`, `arcgisonline.com`, `tile.openstreetmap.org`:
- **Online:** Lädt frische Kachel → legt Kopie in `TILECACHE` ab
- **Offline:** Holt Kachel aus Cache → falls nicht gecacht: transparentes 1×1px PNG (Karte bleibt stabil, bricht nicht)
- **FIFO-Rotation:** `trimCache()` begrenzt den Tile-Cache auf **2000 Kacheln** — älteste werden automatisch entfernt

### Stale-While-Revalidate (Fonts)
Bunny Fonts (`fonts.bunny.net`):
- Antwortet **sofort aus dem Cache** → keine Font-Loading-Verzögerung
- Aktualisiert im **Hintergrund** ohne den Nutzer zu blockieren

### Cache-Persistenz
GPX-Tracks und Rennergebnisse werden in **IndexedDB** gespeichert (via `localForage`):
- Kein Quota-Limit wie bei `localStorage`
- Überlebt Browser-Neustarts und App-Updates
- Strukturierte Daten: Tracks (`gmtwtracksv2`), Runs (`gmtwrunsv1`), Custom Markers (`gmtwcustommarkersv1`)

### Datenschutz
- ✅ Keine Cookies, kein Tracking, kein Analytics
- ✅ GPS-Daten verlassen nie das Gerät
- ✅ Fonts via `bunny.net` (EU-Hosting) statt Google Fonts (DSGVO-konform)
- ✅ Alle Berechnungen (Distanz, Checkpoints, QR) laufen client-seitig
- ✅ Kein Backend, keine User-IDs, keine Server-Logs

---

## 🛠️ Tech Stack & Lizenzen

### Technologien

| Schicht | Technologie | Version | Zweck |
|:---|:---|:---|:---|
| **Core** | HTML5 / CSS3 / ES6+ JS | — | Single-Page App, kein Framework |
| **Maps** | [Leaflet](https://leafletjs.com/) | 1.9.4 | Karten-Rendering, Layer, Marker, Popups |
| **Geo** | [Turf.js](https://turfjs.org/) | 7.x | Distanz, Bearing, Geofencing, Startlinie |
| **Storage** | [localForage](https://localforage.github.io/localForage/) | 1.10.0 | IndexedDB-Wrapper (GPX, Runs, Marker) |
| **QR lesen** | [jsQR](https://github.com/cozmo/jsQR) | 1.4.0 | Kamera-QR-Scanner |
| **QR schreiben** | [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) | 1.4.4 | Lokale QR-Generierung auf Canvas |
| **GPX parsen** | [leaflet-gpx](https://github.com/mpetazzoni/leaflet-gpx) | 1.7.0 | GPX-Dateien parsen & auf Karte laden |
| **Fonts** | [Bunny Fonts](https://fonts.bunny.net/) | — | DSGVO-konformer Font-Host (Barlow) |
| **Offline** | Service Worker API | — | Caching, Offline-First, PWA |
| **Tiles** | OpenTopoMap / Esri | — | Kartenmaterial |

### Lizenz-Matrix

Alle verwendeten Open-Source-Bibliotheken sind mit der **Apache 2.0**-Lizenz kompatibel:

| Bibliothek | Lizenz | Kompatibel |
|:---|:---|:---:|
| Leaflet | [BSD-2-Clause](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) | ✅ |
| Turf.js | [MIT](https://github.com/Turfjs/turf/blob/master/LICENSE) | ✅ |
| localForage | [Apache 2.0](https://github.com/localForage/localForage/blob/master/LICENSE) | ✅ |
| jsQR | [Apache 2.0](https://github.com/cozmo/jsQR/blob/master/LICENSE) | ✅ |
| qrcode-generator | [MIT](https://github.com/kazuhikoarase/qrcode-generator/blob/master/LICENSE) | ✅ |
| leaflet-gpx | [BSD-2-Clause](https://github.com/mpetazzoni/leaflet-gpx/blob/master/LICENSE) | ✅ |

> ⚠️ Kartenmaterial (OpenTopoMap, Esri) unterliegt separaten Nutzungsbedingungen: [ODbL (OpenStreetMap)](https://www.openstreetmap.org/copyright) und [Esri Terms of Use](https://www.esri.com/en-us/legal/terms/full-master-agreement).

### Projekt-Lizenz

Dieses Projekt ist unter der **Apache License 2.0** lizenziert.

```
Copyright 2026 MuniMap Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
```

---

## 🏗️ Projektstruktur

```
munimap.github.io/
├── index.html            # Die gesamte App (UI + Logik, ~8000 LOC)
├── service-worker.js     # Offline-Caching, 4 Strategien, FIFO
├── manifest.json         # PWA-Manifest (Icons, Theme, Orientation)
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-192.png
│   └── icon-maskable-512.png
└── gpx/
    ├── GMTW2026Beginner.gpx
    ├── GMTW2026Intermediate.gpx
    ├── GMTW2026Expert1.gpx
    ├── GMTW2026Expert2.gpx
    └── GMTW2026Expert3.gpx
```

---

<div align="center">

**[⬆ Nach oben](#-gmtw-trail-map)**

<br>

Gebaut mit ❤️ für die Muni-Community · Läuft überall · Trackt alles · Braucht kein Internet

</div>
