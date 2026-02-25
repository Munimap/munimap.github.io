# munimap.github.io
Open munimap

***

# GMTW Trail Map – Vollständige Bedienungsanleitung

***

## Schnellübersicht: Die Oberfläche

```
┌─────────────────────────────────────────────┐
│  ☰  [MUNI] GMTW Trail Map  Hohensyburg  ⧉  │  ← Top-Bar
│  [Alle] [Beginner] [Mittel] [Expert] [Log]  │  ← Filter-Chips
├─────────────────────────────────────────────┤
│                                             │
│            KARTE (Vollbild)                 │
│                                      🎯    │
│  ┌──────────┐               📈 (Badge)    │  ← FABs rechts
│  │ Legende  │               ⏺             │
│  │ Beginner │               🌙             │
│  │ Mittel   │               ⊞             │
│  │ Expert   │                             │
│  │ Logistik │                             │
│  └──────────┘                             │
└─────────────────────────────────────────────┘
```

***

## MODUL 1 – Karte & Grundfunktionen

### 1.1 Karte bedienen

| Aktion | Geste / Button |
|---|---|
| Verschieben | Finger ziehen / Maus-Drag |
| Zoomen | Zwei Finger spreizen oder Zoom-Buttons (rechts unten) |
| Auf alle Marker zoomen | **⊞ Übersicht-FAB** (rechts unten, vier Quadrate) |
| Karte auf eigene Position zentrieren | **🎯 GPS-FAB** antippen |
| Kartenposition wird automatisch gespeichert | beim Loslassen – beim nächsten Öffnen wiederhergestellt |

### 1.2 Kartenlayer wechseln (Topo ↔ Satellit)

1. **⧉ Layer-Button** oben rechts in der Top-Bar antippen
2. Toast-Meldung bestätigt: *„Topo Ansicht"* oder *„Satellit Ansicht"*
3. Erneutes Antippen wechselt zurück

> **Tipp:** Topo-Karte für Geländeübersicht und Höhenlinien, Satellit für genaue Bodensicht vor Ort.

### 1.3 Dark/Light-Mode

- **🌙 Mond-FAB** antippen → wechselt zu Hell-Modus (☀️ erscheint)
- Einstellung wird gespeichert und beim Reload wiederhergestellt [1]

***

## MODUL 2 – Marker & POI-System

### 2.1 Farbcode der Marker verstehen

| Farbe | Kategorie | Bedeutung |
|---|---|---|
| 🟢 Grün | Beginner | Einstiegspunkte, einfache Strecken |
| 🟡 Amber | Mittel | Mittleres Niveau |
| 🔴 Rot/Lila | Expert | Nur für erfahrene Fahrer |
| 🔵 Blau | Logistik | Camp, Tor, WC, Sammelpunkte, Zeltplatz |

Große Marker (z.B. GMTW Camp) sind Hauptanlaufpunkte. [1]

### 2.2 Filter-Chips (Marker ein-/ausblenden)

- Chips in der Leiste unter der Top-Bar antippen: **Alle / Beginner / Mittel / Expert / Logistik**
- Aktiver Chip leuchtet farbig auf
- Karten-Marker **und** POI-Liste filtern gleichzeitig
- Horizontales Scrollen in der Chip-Leiste bei vielen Kategorien [1]

### 2.3 Marker-Popup öffnen

1. Marker auf der Karte antippen
2. Popup zeigt: **Name, Kategorie-Badge, GPS-Koordinaten, Beschreibung**
3. Zwei Buttons im Popup:
   - **„Navigation"** → öffnet native Karten-App (Apple Maps auf iOS, Google Maps auf Android) mit Fahrrad-Routing
   - **„Nav-QR"** → öffnet QR-Code-Modal für diesen Punkt

### 2.4 POI-Liste öffnen (Sheet)

1. **☰ Hamburger-Button** oben links antippen
2. Sheet fährt von unten hoch: alle Punkte, nach Kategorien gruppiert
3. Aktiver Filter gilt auch hier
4. Pro Eintrag zwei Buttons: **→ Navigation** (gelb) und **QR-Code**
5. Eintrag antippen → Karte fliegt zum Marker, Popup öffnet sich automatisch
6. Schließen: **✕-Button** oben rechts im Sheet, oder **außerhalb** antippen

***

## MODUL 3 – GPS & Standort

### 3.1 GPS aktivieren / deaktivieren

1. **🎯 GPS-FAB** antippen
2. Browser fragt nach Standort-Berechtigung → **„Erlauben"**
3. FAB dreht sich (Spin-Animation) während GPS sucht
4. Bei erstem Fix: blaue Positionsmarkierung erscheint auf Karte, Toast zeigt Genauigkeit
5. Karte fliegt einmalig zur eigenen Position (Zoom 17)
6. **Erneutes Antippen** deaktiviert GPS und entfernt den Marker

### 3.2 GPS-Fehlermeldungen verstehen

| Fehlermeldung | Ursache | Lösung |
|---|---|---|
| „Zugriff verweigert" | Berechtigung abgelehnt | Browser-/App-Einstellungen öffnen |
| „Kein Signal" | Innenraum oder kein WLAN | Ins Freie gehen |
| „Zeitüberschreitung" | GPS zu langsam | Erneut versuchen |

Der Hinweis erscheint oben rechts und verschwindet nach 8 Sekunden automatisch. [1]

***

## MODUL 4 – GPX-Tracks (Panel)

Das **GPX-Panel** öffnest du mit dem **📈 Track-FAB** (rechts, mit Zahlen-Badge). Es hat drei Tabs.

***

### TAB 1: „Laden" – Tracks hinzufügen

#### Option A: Datei vom Gerät

1. Kategorie oben auswählen (Beginner / Mittel / Expert)
2. Gestrichelte Upload-Fläche antippen oder GPX-Datei **per Drag & Drop** darauf ziehen
3. Mehrere Dateien gleichzeitig wählbar
4. Track erscheint sofort auf der Karte und im Track-Tab [1]

#### Option B: URL laden

1. GPX-URL in das Textfeld eingeben
   - GitHub-`blob`-URLs werden automatisch in Raw-URLs umgewandelt
2. **Pfeil-Button** (Laden) antippen
3. Bei CORS-Fehler: Link **„Proxy aktivieren"** antippen (Datenschutz beachten)

> **Wichtig:** Maximal **50 Tracks** gleichzeitig ladbar. Tracks werden im **IndexedDB** gespeichert und überleben den Browser-Reload. [1]

***

### TAB 2: „Tracks" – Geladene Tracks verwalten

#### Track-Liste lesen

Jede Track-Zeile zeigt:
- **Farbiger Punkt** (Kategorie-Farbe)
- **Name** + ggf. „LIVE"-Badge bei laufendem Rennen
- **Meta:** Kategorie, Distanz in km, Dauer, Anzahl bisheriger Runs + Bestzeit

#### Track-Zeilen-Buttons (drei kleine Icons rechts)

| Icon | Funktion |
|---|---|
| 👁 Auge (leuchtet gelb = sichtbar) | Track auf Karte ein-/ausblenden |
| QR-Quadrat | Track-QR-Code + GPX-Download öffnen |
| 🗑 Mülleimer (rot) | Track entfernen |

#### Track-Detail aufrufen

1. Auf **Track-Name / Meta-Zeile** tippen
2. Detail-Panel erscheint darunter mit:
   - Distanz, Zeit, Runs-Zahl
   - **„🏁 Rennen starten"** (gelb) → startet Race-Modus
   - **„→ Zur Startlinie"** (blau) → Navigation-HUD aktivieren
   - **„Google Maps"** → externe Navigation
   - **Bestenliste** der eigenen Zeiten für diesen Track

#### Kategorie-Filter innerhalb des Panels

- Chips **Alle / Beginner / Mittel / Expert** oben in der Track-Liste
- Filtert nur die Track-Liste, nicht die Karten-Marker [1]

#### Höhenprofil

- Erscheint automatisch nach Anklicken eines Tracks, wenn Höhendaten vorhanden
- Canvas-Diagramm zeigt Verlauf, darunter: **Min, Max, Aufstieg (m), Distanz (km)**
- Verschwindet beim Wechsel des Filters [1]

#### Track-QR-Modal

1. QR-Button in der Track-Zeile antippen
2. Modal zeigt QR-Code der GPX-URL
3. Buttons im Modal:
   - **„Zurück"** → schließen
   - **„GPX laden"** → Datei-Download der GPX
   - **„QR Bild"** → QR-Code als PNG speichern
   - **„Link"** → URL in die Zwischenablage kopieren

***

### TAB 3: „Aufnahme" – Eigene Strecke aufzeichnen

> ⚠️ **Getrennt vom Race-Modus halten!** Der Recorder ist für freies Aufzeichnen. Race ist für Zeitnahme auf vorhandenen Tracks.

#### Aufnahme starten

1. GPX-Panel öffnen → Tab **„Aufnahme"**
2. **„Aufnahme starten"** antippen
3. Roter blinkender **REC-Statusbalken** erscheint oben (sichtbar in allen Tabs)
4. Statistiken laufen: **km / Punkte / km/h**
5. Rote Linie zeichnet sich live auf der Karte mit [1]

#### Aufnahme pausieren / fortsetzen

- **„Pause"** antippen → Zeit und Linie stoppen, Statusbalken bleibt sichtbar
- **„Weiter"** antippen → Aufnahme läuft in neuem Segment weiter
- Pausenzeit wird **nicht** in die Gesamtzeit eingerechnet

#### Aufnahme beenden

1. **„Stop"** antippen → Speicherbereich erscheint
2. **Name eingeben** (Textfeld)
3. **Kategorie wählen** (Beginner / Mittel / Expert)
4. Dann eine der Optionen:

| Button | Aktion |
|---|---|
| **„In Karte laden & anzeigen"** | Track wird sofort auf Karte geladen, Race/Navigation verfügbar |
| **„GPX"** | Valide GPX-Datei herunterladen (für Komoot, Strava, Garmin etc.) |
| **„JSON"** | Alle Rohdaten als JSON exportieren |
| **„Aufnahme verwerfen"** | Löscht alles unwiderruflich |

#### Crash-Schutz

- App speichert laufende Aufnahmen **alle 15 Sekunden** automatisch
- Nach Browser-Reload erscheint Dialog: *„Aufnahme von vor X Minuten wiederherstellen?"*
- **„Wiederherstellen"** → Punkte und Zeit werden wiederhergestellt
- **„Verwerfen"** → Aufnahme wird gelöscht [1]

***

## MODUL 5 – Navigation zur Startlinie (HUD)

### 5.1 Navigation starten

**Weg A (aus Track-Detail):**
1. GPX-Panel → Track antippen → Detail öffnet → **„→ Zur Startlinie"**

**Weg B (automatisch):**
- Wenn GPS aktiv und du dich einem Track auf < 50 m näherst, wechselt die App automatisch in den Race-Annäherungs-Modus

### 5.2 Navigation-HUD lesen

Das HUD erscheint unterhalb der Top-Bar und zeigt: [1]

```
┌────────────────────────────────────────┐
│  ↗   ZUR STARTLINIE                  ✕ │
│      1.3 km                             │
│      Kurs 47° · GPS ±8m                 │
│      🗺 In Google Maps öffnen           │
└────────────────────────────────────────┘
```

- **Pfeil** dreht sich bei Richtungsänderung sanft nach (8 Himmelsrichtungen)
- **Lime-grüne Zahl** = Distanz zur Startlinie
- **Blaue gestrichelte Linie** auf der Karte = Route von dir zur Startlinie
- **✕** schließt die Navigation ohne Race zu starten

### 5.3 Navigation beenden

- **✕-Button** im HUD antippen
- Oder Race-Modus starten (HUD wird automatisch ersetzt)

***

## MODUL 6 – Race-Modus / Zeitnahme

> ⚠️ **Voraussetzungen:** GPX-Track geladen + GPS aktiv. Race läuft vollständig getrennt vom Recorder.

### 6.1 Race starten

1. GPX-Panel → Track-Detail → **„🏁 Rennen starten"** (gelb)
2. GPS wird automatisch aktiviert falls nicht bereits aktiv
3. Race-Overlay öffnet sich (Vollbild)

### 6.2 Die 5 Race-Phasen

***

**Phase 1 – ANNÄHERUNG (> 5 m von Startlinie)**

- Großes Display: Streckenname + Distanz zur Startlinie in Metern
- GPS-Genauigkeit wird angezeigt
- Beim Warten: Karte bleibt im Hintergrund aktiv
- **✕ oben rechts** bricht Race komplett ab [1]

***

**Phase 2 – CANVAS-APPROACH (≤ 5 m von Startlinie)**

- Vollbild-Canvas-Animation erscheint automatisch
- Balken füllt sich: **Amber → Lime** je näher du der Linie kommst
- Distanzanzeige wechselt von Weiß zu **Grün** bei ≤ 2 m
- Die grün leuchtende animierte Startlinie pulsiert

***

**Phase 3 – START-DIALOG (≤ 2 m)**

Vibration + Dialog erscheint: [1]

> *„Strecke starten und Zeit messen?"*

| Button | Wirkung |
|---|---|
| **„Ja, Start!"** (Lime) | Timer startet, Vollbild-Anzeige bleibt aktiv |
| **„Nein"** | Abbrechen, zurück zur Annäherung |

> **Hintergrundmodus-Tipp:** Nach dem Start kannst du das Display ausschalten. Die Zeit läuft weiter im Hintergrund.

***

**Phase 4 – GO! & RENNEN**

- Kurze **„GO!"**-Animation (grüne Explosion) erscheint
- Danach **Lauf-Ansicht:**
  - Lime-grüner Live-Timer im Format `mm:ss.t`
  - **4 Split-Boxen** (Strecke wird automatisch in 4 gleiche Viertel aufgeteilt)
  - Aktiver Split pulsiert blau, abgeschlossene leuchten lime
  - Aktuelle Geschwindigkeit in km/h
  - **„Abbruch"** → Bestätigungs-Dialog erscheint

**Auto-Pause:** Bei Stillstand > 4 Sekunden pausiert der Timer (blinkt rot). Bei Bewegung läuft er automatisch weiter. [1]

***

**Phase 5 – ERGEBNIS**

Nach Überqueren des Ziels erscheint automatisch das Ergebnis-Screen: [1]

```
👑 NEUES ERGEBNIS
TRAIL-NAME
02:34.7
GESAMTZEIT

┌──────────┬──────────┐
│  S1      │  S2      │
│ 00:38.2  │ 00:41.5  │
├──────────┼──────────┤
│  S3      │  Ziel    │
│ 00:39.8  │ 00:35.2  │
└──────────┴──────────┘

BESTENLISTE
🥇 02:28.4 – 24.02.2026
   02:34.7 – 25.02.2026  ← aktuell
```

**Buttons:**
- **„Teilen"** → QR-Code der Gesamtzeit erscheint + Scan-Option
- **„JSON"** → Exportiert Zeiten und Splits als Datei
- **„Fertig"** → schließt Race, zurück zur Karte

***

## MODUL 7 – QR-Code-System

### 7.1 QR für Marker/POI

1. Marker antippen → **„Nav-QR"**
2. QR-Code wird **lokal** generiert (kein Internet nötig)
3. Inhalt: Google Maps Fahrrad-Navigation zu diesem Punkt
4. Buttons: **Zurück / Kopieren / QR herunterladen**

### 7.2 QR für GPX-Tracks

1. Track-Zeile → QR-Quadrat-Button
2. QR-Code enthält die GPX-Quell-URL
3. Buttons: **Zurück / GPX laden / QR Bild / Link kopieren**

### 7.3 QR nach dem Rennen

1. Ergebnis-Screen → **„Teilen"**
2. QR-Code enthält Gesamtzeit und Track-Name
3. Als Bild speicherbar

***

## MODUL 8 – Wichtige Regeln & Tipps

### Was gleichzeitig geht ✅

- GPS aktiv + Karte verschieben
- Filter setzen + Navigation aktiv
- Mehrere Tracks geladen + einzelne aus-/einblenden

### Was sich gegenseitig ausschließt ❌

| Kombination | Warum |
|---|---|
| **Race** + **Recorder** gleichzeitig | Race beendet Navigation-HUD; Recorder ist unabhängig aber zeitlich verwirrend |
| **Race** während **Race** | Nur ein Rennen gleichzeitig möglich |
| **Navigation-HUD** + **Race-Overlay** | Race übernimmt Vollbild, HUD verschwindet |

### Empfohlene Reihenfolge für Race-Tag

1. **Zuhause (WLAN):** App öffnen → GPX-Tracks laden → werden gecacht
2. **Vor Ort:** GPS aktivieren → zum Startpunkt navigieren (HUD)
3. **Am Start:** Race starten → Phase 1–3 durchlaufen
4. **Unterwegs:** Display kann aus sein (Hintergrundmodus)
5. **Nach dem Ziel:** Ergebnis prüfen, JSON/QR sichern
6. **Eigene Strecken:** Recorder-Tab nutzen, danach GPX exportieren [1]

Quellen:
[1] GMTW_Map.html https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/14127666/a11cd675-07ee-470c-a099-97cdd401ad18/GMTW_Map.html

