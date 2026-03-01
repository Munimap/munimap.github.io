<div align="center">

# 🦄 GMTW Muni Map 🌲
**Die serverlose Offline-PWA für das German Muni Trail Weekend**

**Das serverlose Offline-Ökosystem für Mountain-Unicycling & Freeride Events**


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: 100% Offline](https://img.shields.io/badge/Status-100%25_Offline_Ready-success)](#)
[![Map: Leaflet](https://img.shields.io/badge/Map-Leaflet.js-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Geospatial: Turf.js](https://img.shields.io/badge/Geospatial-Turf.js-green)](#)
[![Storage: IndexedDB](https://img.shields.io/badge/Storage-IndexedDB_Unlimited-blueviolet)](#)

Ein technologisches Meisterwerk, verpackt in **einer einzigen HTML-Datei**. Entwickelt von Muni-Fahrern für Muni-Fahrer. Diese Progressive Web App (PWA) kombiniert hochpräzises Leaflet-Mapping, Turn-by-Turn Navigation, Sturzerkennung, Trail-Editoren und Multi-QR-Datenübertragung für den Einsatz in den tiefsten Wäldern – **komplett ohne Handynetz, Cloud oder App-Store.**

[**📖 Das Ultimative Handbuch**](#-das-lückenlose-muni-handbuch-bedienung) • [**🚀 The Black Magic (Algorithmen)**](#-the-black-magic--innovative-ansätze) • [**🛡️ Offline-Resilienz**](#%EF%B8%8F-hardcore-offline-resilienz)

</div>

<br>

> [!IMPORTANT]  
> **Das Paradigma dieser App:** 
> Einrad-Downhill und Enduro-Events finden dort statt, wo Handys keinen Empfang haben. Klassische Timing-Systeme sind teuer, herkömmliche Apps versagen offline völlig. Diese App ändert die Spielregeln radikal: **Dein Smartphone *ist* der Transponder, das Navi, der Kamera-Scanner, der Server und die Datenbank in einem.**

---

## ✨ Feature-Matrix

| 🗺️ Map & Leaflet Engine | ⏱️ Race Engine & Sensoren | 🗂️ Daten, Admin & Kamera |
| :--- | :--- | :--- |
| **Topo & Satellit** (Kacheln cachebar) | **Auto-Start** via Turf.js Vektoren | **Integrierter Kamera-Scanner** (jsQR) |
| **Turn-by-Turn HUD** (Off-Route Warnung) | **Dynamische Zwischenzeiten (Splits)** | **Multi-QR-Chunking** für Tracks |
| **Leaflet Mini-Map Editor** (Features setzen) | **Sensor-Fusion** für Sturz-Erkennung | **Krypto-Signaturen** für Resultate |
| **GPX-Parser** (inkl. Live-Höhenprofil) | **Web Bluetooth** Smartwatch GPS | **Leaderboard CSV/JSON Exporte** |
| **A11Y (TTS)** Sprachsteuerung & Shortcuts | **Live-GPS Recorder** (inkl. Auto-Save) | **IndexedDB Full-State-Backups** |

---

## 📖 Das lückenlose Muni-Handbuch (Bedienung)
*Eine detaillierte Aufschlüsselung jedes UI-Elements, jedes Menüs und jeder Unterfunktion.*

### 1. Die Karten-Oberfläche (Leaflet) & Basis-Steuerung
Die primäre Ansicht der App ist die voll interaktive **Leaflet-Karte**.
* **Layer-Umschalter (Oben rechts):** Wechselt nahtlos zwischen *OpenTopoMap* (inklusive Höhenlinien, ideal für Trails) und *Esri Satellitenbildern*.
* **Filter-Chips (Oben links):** Blendet Kategorien ein/aus (🟢 Beginner, 🟡 Mittel, 🔴 Expert, 🔵 Logistik). *Tiefendetail: Der "Weg ins Camp" ist ein eigenes Polyline-Element, das nur eingeblendet wird, wenn der "Logistik"-Filter aktiv ist.*
* **Listen-Ansicht (Burger-Menü):** Öffnet ein Bottom-Sheet mit allen aktuell sichtbaren Markern, aufgeteilt nach Kategorien, inklusive Schnellzugriff auf Navigation und Teilen-QRs.
* **FABs (Floating Action Buttons - Rechts unten):**
  * `📍 GPS`: Zentriert die Karte auf dich. (Aktiviert Auto-Follow).
  * `📂 GPX`: Öffnet die Streckenverwaltung.
  * `🔴 REC`: Startet sofort eine neue Strecken-Aufzeichnung.
  * `🌓 Theme`: Schaltet das gesamte UI zwischen Dark-Mode (OLED-optimiert) und Light-Mode (High-Contrast für direkte Sonneneinstrahlung) um.
  * `⛶ Fit Bounds`: Zoomt die Karte automatisch so, dass alle sichtbaren Trails und Marker ins Bild passen.
  * `⚙️ Settings`: Öffnet das Hauptmenü.

### 2. Offline-Caching & PWA-Installation (WICHTIG!)
Die App MUSS installiert werden, um im Wald zu überleben. Gehe auf **⚙️ Einstellungen ➔ 📲 App**.
* **Smart Install Prompt:** Die App analysiert deinen Browser (Safari, Chrome, Firefox) und zeigt dir exakt die bebilderten Schritte, um die App als PWA auf den Homescreen zu legen.
* **Aggressives Map-Caching:** Zoome auf der Leaflet-Karte in das Trail-Gebiet (mindestens Zoom 12). Klicke auf `🗺️ Sichtbaren Kartenbereich cachen`. Der ServiceWorker berechnet die Bounding-Box und lädt hunderte Kartenkacheln geräuschlos in den lokalen Speicher.
* **Storage Lock:** Mit `🔒 Dauerhaften Speicher anfragen` verbietest du dem Smartphone, deine gecachten Karten bei Speichermangel zu löschen.

### 3. Fahrer-Profil & Hardware (Avatar Builder)
Gehe auf **⚙️ Einstellungen ➔ 👤 Profil**. Diese Daten sind essentiell für Leaderboards und Auswertungen:
* **Avatar-Builder:** Kombiniere 20 Rider-Emojis (🦄, 🚵, 🦅) mit 8 Hintergrundfarben zu deinem Piloten-Avatar. Dieser wird im Run-Detail-Screen angezeigt.
* **Muni-Hardware:** Trage Fahrername, Muni-Name, Radgröße (19" Trial bis 36" Road) und Bremse ein. Nutze die Quick-Buttons für Besonderheiten wie *Schlumpf-Nabe* oder *Freewheel*.
* **Sprache:** Wähle 🇩🇪, 🇬🇧, 🇫🇷 oder 🇪🇸. Dies steuert das UI und den Akzent der TTS-Vorlesestimme.

### 4. Eigene Marker setzen & Deep-Linking
Du hast eine gefährliche Wurzel oder einen perfekten Zeltplatz gefunden?
* **Marker-Modus:** Aktiviere unter *⚙️ Einstellungen ➔ Marker* den Button `📍 Karte`. Ein **Doppelklick** auf die Leaflet-Map setzt einen neuen Pin.
* **Marker Modal:** Wähle ein Emoji (⚠️, 🔥), schreibe eine Beschreibung und weise eine Kategorie zu. 
* **Deep-Linking (Auto-GMaps):** Die App generiert automatisch einen Link, der bei einem Klick auf "Navigation" nativ **Apple Maps** (auf iOS) oder **Google Maps** (auf Android) mit der perfekten Route zum Marker öffnet.
* **Skalierung:** Mit dem *Marker-Größen-Slider* kannst du alle Icons stufenlos auf 50% bis 200% skalieren.

### 5. Das GPX-Panel (Import, Tracks & Live-Aufzeichnung)
Tippe auf das **Ordner-Symbol (FAB)**.
* **📥 Laden:** Importiere GPX per Upload, Drag&Drop oder füge eine GitHub-Raw-URL ein. Ein integrierter CORS-Proxy hilft, wenn fremde Server den Download blockieren.
* **🗺️ Tracks:** Wähle eine Strecke. Die App parst die XML-Daten live und generiert ein **Farbverlaufs-Höhenprofil** auf einem HTML-Canvas (inkl. Min/Max und Gesamtanstieg).
* **🔴 Aufnahme:** Zeichne neue Lines auf! Die App zieht eine rote Linie. **Schutzfunktionen:** Ein `WakeLock` hält das Display an, und alle 15 Sekunden feuert ein Auto-Save in die IndexedDB. Stürzt das Handy ab, fragt die App beim Neustart: *"Unterbrochene Aufnahme gefunden. Wiederherstellen?"*.
* **Web Share API:** Fertige Aufnahmen können direkt über das native Teilen-Menü (WhatsApp, AirDrop) als `.gpx` gesendet werden.

### 6. Turn-by-Turn Navigation & Off-Route Detection
Öffne das Popup einer Strecke und klicke auf `🧭 Navigation`. Ein dynamisches HUD erscheint oben im Bild:
* **Modus 1 (Zum Start):** Ein Richtungspfeil und die Distanz lotsen dich zum Trailhead. Gehst du falsch, warnt dich das HUD rot pulsierend.
* **Modus 2 (Auf der Strecke):** Am Start angekommen, wechselt die Logik. Die App peilt den GPX-Pfad **ca. 50 Meter in Fahrtrichtung voraus** an. Sie erkennt Kurven und zeigt rechtzeitig Abbiegepfeile (`↰`, `↱`).
* **Off-Route Warnung:** Verlässt du den Pfad um mehr als 25 Meter, wird das HUD rot und die Stimme ruft: *"Achtung, du bist neben der Strecke!"*.

### 7. Trail-Tagebuch & Mini-Map Editor
Unter **⚙️ Einstellungen ➔ Strecken ➔ ⚙️ Einstellungen** findest du das ultimative Planungstool für jede Strecke:
* **📝 Mein Rating:** Vergib 1-5 Sterne für *Schwierigkeit*, *Spaß* und *Flow*. Ein Statistik-Dashboard rechnet dir aus, wie viel Prozent des Wochenendes du bereits gemeistert hast.
* **🎽 Condition:** Setze den aktuellen Untergrund: ☀️ Trocken, 🌧 Matschig, ❄️ Eisig.
* **🚀 Trail Features (Der Editor):** Klicke auf `➕ Schlüsselstelle`. Es öffnet sich ein Full-Screen-Modal mit einer **separaten Leaflet Mini-Map und Fadenkreuz**. Schiebe die Karte exakt über die Position (oder nutze `📡 Live GPS`), wähle den Typ (⬇️ Drop, 🪨 Steinfeld, 🌉 Northshore) und speichere. Diese Hindernisse werden als Emojis auf der Hauptkarte gerendert!
* **🕐 Historie:** Jedes editierte Feld und jedes neue Feature wird in einem lokalen Changelog mit Timestamp protokolliert.

### 8. Enduro Race-Engine ⏱️ (Die Rennleitung in der Tasche)
Absolut professionelle Zeitmessung durch Turf.js Geofencing.
1. Wähle eine Strecke und drücke `⏱ Timing`.
2. **Smartwatch (Optional):** Nutze `🔵 Smartwatch verbinden`, um via Web Bluetooth das hochpräzise GPS deiner Garmin/Apple Watch abzugreifen.
3. **Die Startbox (≤ 5m):** Bei 5m ändert sich das Display: Ein Canvas-Render zeigt die Distanz zentimetergenau und farbcodiert an.
4. **Arming (≤ 2m):** Die App fragt `✓ Ja, Start!`. Bestätige. Das System ist scharf (die Uhr steht auf 00:00).
5. **GO!:** Die App berechnet eine 6m breite, unsichtbare Vektor-Linie im 90-Grad-Winkel zum Trail. Fährst du über diese Linie, feuert der Startschuss.
6. **Dynamische Splits:** Die Strecke wird mathematisch in 4 Sektoren unterteilt. Im Hintergrund pulsieren Boxen. Passierst du einen Sektor, wird die Zwischenzeit geloggt.
7. **Ziel:** Fährst du durch das Ziel, vibriert das Handy wild, die Zeit stoppt, und die **Krypto-Signatur** deines Laufs wird erstellt. (Klick auf den Lauf im Leaderboard für eine genaue Split- und Sturz-Analyse!).

### 9. Der Interne Kamera-Scanner & Das QR-Ökosystem
Im Wald gibt es kein Internet. Die Datenübertragung läuft optisch. Gehe auf **⚙️ Einstellungen ➔ QR-Scan**. Die `jsQR`-Kamera erkennt automatisch:
* **GPX-Strecken via Multi-QR-Chunking:** (Siehe unter "Black Magic").
* **Einfache Links:** Lade GPX-URLs direkt aus dem Code.
* **Einzelne Marker:** Scanne den Code eines Kumpels und übernimm seine Drops und Notizen.
* **Full-State-Backups:** Lies ein kompaktes Backup-JSON direkt aus einem Code aus.

### 10. Barrierefreiheit & Sprachsteuerung (A11Y)
Die Sonne blendet extrem oder das Handy steckt im Rucksack?
* Aktiviere die **♿ Vorlesefunktion**. Es erscheint eine schwebende **TTS Control Bar**.
* **Steuerung:** Du kannst die Stimme pausieren <kbd>⏸</kbd>, den letzten Satz wiederholen <kbd>⏮</kbd> oder überspringen <kbd>⏭</kbd>.
* Tippe auf die `🔊` FAB (oder <kbd>V</kbd> auf dem PC): Die App liest dir die gesamte Kartenlage vor (Zoomstufe, sichtbare Strecken, Entfernung vom GPS).
* Tippe auf <kbd>N</kbd>: *"Nächster Punkt: Start Expert 2, 450 Meter entfernt."*

### 11. Admin-Modus (Exporte & Geräte klonen)
Unter **⚙️ Einstellungen ➔ Backup** hast du die absolute Datenkontrolle:
* **📊 Zeiten Export:** Lade *alle* gefahrenen Zeiten aller Teilnehmer (inkl. Splits, Stürze, Muni-Specs und Signaturen) als **UTF-8 BOM CSV** herunter (perfekt formatiert für Excel).
* **📦 Full Backup:** Ein Klick packt *alles* (Strecken, Zeiten, Avatar, Features, Marker, History) in ein JSON. Importiere diese Datei auf einem anderen Tablet, und das Gerät ist ein exakter Klon.

---

## 🚀 The "Black Magic" – Innovative Ansätze
*Hier wird es für Software-Engineers spannend. Diese App reizt Web-APIs gnadenlos aus.*

<details open>
<summary><b>🛸 Multi-QR-Chunking (Daten beamen ohne Netz)</b></summary>
Ein QR-Code fasst nicht genug Daten für einen GPX-Track. Wie sendest du im Wald eine Strecke von Handy zu Handy, wenn AirDrop/Bluetooth versagt?
<br><br>
<b>Die Protokoll-Pipeline:</b>
<ol>
  <li><b>Ramer-Douglas-Peucker (RDP):</b> Die Strecke wird iterativ mathematisch geglättet, um redundante Trackpunkte zu löschen.</li>
  <li><b>Delta-Encoding:</b> Statt dicker <code>[lat, lng, ele, time]</code> Arrays speichert die App nur die relativen Millimeter-Abstände zum vorherigen Punkt in einer kompakten 10^-5 Matrix.</li>
  <li><b>DEFLATE-Kompression:</b> Das Delta-JSON wird via <code>pako</code> (Zlib) direkt im Browser extrem komprimiert.</li>
  <li><b>Base64Url & Chunking:</b> Die Binärdaten werden zu URL-sicheren Strings konvertiert, in 1100-Zeichen-Blöcke zerschnitten und mit einem Sync-Header <code>{v:1, id, i, n, z, d}</code> versehen.</li>
  <li><b>Das Daumenkino:</b> Die App spielt diese Chunks als animierte QR-Bilder in einer Endlosschleife ab. Der integrierte <code>jsQR</code> Scanner des Empfängers puzzelt die Frames asynchron zusammen.</li>
</ol>
</details>

<details open>
<summary><b>💥 Sensor Fusion (Crash & Dismount Detection)</b></summary>
Die App misst nicht nur die Zeit, sondern <i>wie hart</i> du fährst. Sie überwacht die native <code>DeviceMotionEvent</code> API (Beschleunigungssensor) in Echtzeit.
<ul>
  <li><b>Sturzerkennung (Crash):</b> Der 3D-Vektor <code>√(ax² + ay² + az²)</code> wird alle paar Millisekunden berechnet. Gibt es einen Spike von über <b>35 m/s² (ca. 3.5 G)</b> und das Handy ist ~400ms danach auffällig ruhig, geht das System von einem Sturz aus. Es loggt "💥 Sturz" mitsamt Timestamp in die Rennakte.</li>
  <li><b>Absteigen (Dismount):</b> Fällt die GPS-Geschwindigkeit auf dem Trail abrupt von dynamischer Fahrt (>5 km/h) auf Stillstand (<1 km/h), wird ein "🚶 Absteigen" registriert.</li>
</ul>
</details>

<details open>
<summary><b>🔐 Serverless Crypto-Signing (Anti-Cheat System)</b></summary>
Da es keinen zentralen Server gibt: Wie verhindert man, dass jemand sein exportiertes JSON-Zeitenfile am PC bearbeitet und eine Fabelzeit einträgt?
<br><br>
Beim Passieren der Ziellinie nutzt die App die native <code>window.crypto.subtle</code> API. Sie generiert einen <b>HMAC-SHA256 Hash</b> aus: <i>Gesamtzeit + Splits + Fahrername + Muni-Setup + Einem internen, tagesaktuellen Secret-Key</i>.
Dieser kryptografische Hash wird im JSON und im Ziel-QR-Code unlöschbar hinterlegt. Ändert ein Cheater später nur eine Millisekunde der Zeit, bricht die Signatur bei der Prüfung durch den Rennleiter sofort zusammen.
</details>

<details open>
<summary><b>🎯 Dynamisches Geofencing (Turf.js Vektor-Startlinien)</b></summary>
Eine Startlinie ist kein simpler "Radius" (Kreis), in den man hineinfährt – das gäbe krasse Fehlstarts, wenn man sich dem Punkt von der Seite nähert. 
Die App nutzt die Geomathematik von <b>Turf.js</b>: Sie misst das <i>Bearing</i> (den Kompass-Winkel) der ersten Trail-Meter. Im exakten 90-Grad-Winkel dazu errechnet sie live die Koordinaten für eine virtuelle, 6 Meter breite Linie quer auf dem Trail. Erst wenn du <i>genau diese Vektor-Linie in Fahrtrichtung</i> durchbrichst, startet der Timer.
</details>

---

## 🛡️ Hardcore Offline-Resilienz
*Ein Mountain-Unicycle Event verzeiht keine Software-Fehler. Diese App ist auf das Überleben im Extremfall programmiert.*

> [!TIP]  
> **Unlimited Storage via IndexedDB:**
> Der normale `localStorage` eines Browsers crasht bei 5 MB. Diese App umgeht das Limit elegant durch den Einsatz von `localForage`. Alle GPX-Files, Tausende Map-Tiles und riesige JSON-Backups werden asynchron in die **IndexedDB** des Browsers geschrieben. Gigabytes an Offline-Daten sind möglich.

* **🔋 WakeLock API:** iOS und Android killen inaktive Browser-Tabs gnadenlos, wenn das Display aus ist. Beim Rennstart ruft die App `navigator.wakeLock.request('screen')` auf. Das Betriebssystem hält die App priorisiert am Leben, das GPS loggt ungebremst im Hintergrund.
* **⚠️ GPS-Retry-Logik:** Verliert das Handy im dichten Wald das Signal, gibt die App nicht auf. Sie registriert den Error-Code und versucht in immer länger werdenden Abständen, die Hardwaresensoren neu zu initialisieren.

---

## 💻 Tech Stack & Architektur

Der absolute Clou an diesem Projekt: Es ist eine **Single-File-App (SFA)**.
Kein Node.js, kein Webpack, kein React, keine `.env` Dateien. Alle ~3900 Zeilen Code stecken in einer `index.html`.

**Eingesetzte Open-Source Schwergewichte (CDNs / Inlined):**
*   **[Leaflet.js](https://leafletjs.com/):** High-Performance Map Rendering.
*   **[Turf.js](https://turfjs.org/):** Fortgeschrittene Geomathematik (Distance, Bearing, Destination, Line-Splitting).
*   **[jsQR](https://github.com/cozmo/jsQR):** Kamera-Scanning in purem JavaScript.
*   **[Pako](https://github.com/nodeca/pako):** Rasante Zlib/Deflate In-Browser-Kompression.
*   **[localForage](https://localforage.github.io/localForage/):** Asynchroner Offline-Storage Wrapper.
*   **Web APIs:** `DeviceMotionEvent`, `Web Crypto API`, `Web Bluetooth API`, `Web Share API`, `WakeLock API`, `Web Speech API`, `MediaDevices API`.

---

## 🛠️ Setup (Für Entwickler & Event-Orgas)

Es ist so einfach, wie Software nur sein kann:

1. Lade dieses Repository als `.zip` herunter oder klone es:
   ```bash
   git clone https://github.com/DeinUsername/GMTW-Trail-Map.git

    Gehe in den Ordner. Es müssen nur 3 Dateien vorhanden sein: index.html, manifest.json und service-worker.js (und der /icons Ordner).

    Starte einen lokalen Webserver. (WICHTIG: Moderne APIs wie Kamera, Bluetooth und ServiceWorker blockieren aus Sicherheitsgründen, wenn man die Datei nur per Doppelklick file:// öffnet. Sie benötigen zwingend localhost oder HTTPS).
    code Bash

    # Mit Python (Mac/Linux/Windows)
    python3 -m http.server 8080

    # Oder mit Node.js
    npx serve

    Öffne http://localhost:8080 im Browser deines Handys oder PCs. Fertig.

📜 Lizenz

Dieses Projekt steht unter der MIT Lizenz.

Du bist völlig frei, diesen Code zu forken, ihn in Stücke zu reißen, das Design zu ändern und die "Muni"-Begriffe durch Mountainbike-, Trailrunning- oder Geocaching-Begriffe zu ersetzen.

Baue darauf dein eigenes, komplett kostenloses, hardware-unabhängiges und serverloses Zeitmesssystem für dein nächstes lokales Offroad-Event! (Siehe LICENSE Datei für den genauen Rechtstext).
<div align="center">
<b>Built with ☕, 🦄 and raw Vanilla JavaScript for GMTW 2026.</b><br>
<i>"Where we're going, we don't need servers."</i>
</div>
