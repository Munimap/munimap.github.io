<div align="center">

# 🦄 GMTW Muni Map 🌲
**Die serverlose Offline-PWA für das German Muni Trail Weekend**

**Das serverlose Offline-Ökosystem für Mountain-Unicycling & Freeride Events**


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: 100% Offline](https://img.shields.io/badge/Status-100%25_Offline_Ready-success)](#)
[![Tech: Vanilla JS](https://img.shields.io/badge/Tech-Vanilla_JS-f7df1e?logo=javascript&logoColor=black)](#)
[![Geospatial: Turf.js](https://img.shields.io/badge/Geospatial-Turf.js-green)](#)
[![Storage: IndexedDB](https://img.shields.io/badge/Storage-IndexedDB_Unlimited-blueviolet)](#)

Ein technologisches Meisterwerk, verpackt in **einer einzigen HTML-Datei**. Entwickelt von Muni-Fahrern für Muni-Fahrer. Diese Progressive Web App (PWA) bringt hochpräzise Enduro-Zeitmessung mit dynamischen Zwischenzeiten, Turn-by-Turn Navigation, Sturzerkennung, Trail-Feature-Mapping und Multi-QR-Datenübertragung in die tiefsten Wälder – **komplett ohne Handynetz, Cloud oder App-Store.**

[**📖 Das Ultimative Handbuch**](#-das-lückenlose-muni-handbuch-alle-funktionen) • [**🚀 Black Magic (Tech-Deep-Dive)**](#-the-black-magic--innovative-ansätze) • [**🛡️ Offline-Resilienz**](#%EF%B8%8F-hardcore-offline-resilienz)

</div>

<br>

> [!IMPORTANT]  
> **Das Paradigma dieser App:** 
> Einrad-Downhill und Enduro-Events finden dort statt, wo es keinen Empfang gibt. Klassische Timing-Systeme (RFID) sind teuer, herkömmliche Apps versagen offline völlig. Diese App ändert die Spielregeln: **Dein Smartphone *ist* der Transponder, das Navi, der Kamera-Scanner, der Server und die Datenbank in einem.**

---

## ✨ Feature-Matrix im Überblick

| 🗺️ Map & Navigation | ⏱️ Race Engine & Sensoren | 🗂️ Daten, Admin & Sync |
| :--- | :--- | :--- |
| **Topo & Satellit** (Lokal speicherbar) | **Auto-Start** via Geofence-Vektoren | **Multi-QR-Chunking** für GPX |
| **Turn-by-Turn HUD** (Richtungsvorhersage) | **Dynamische Zwischenzeiten (Splits)** | **Krypto-Signaturen** für Resultate |
| **Mini-Map Editor** (Features setzen) | **Sensor-Fusion** für Sturz-Erkennung | **Integrierter Kamera-Scanner** |
| **GPX-Parser** (inkl. Höhenprofil) | **Web Bluetooth** Smartwatch GPS | **Leaderboard CSV/JSON Exporte** |
| **A11Y (TTS)** Sprachsteuerung & Shortcuts | **Live-GPS Recorder** (inkl. Auto-Save) | **IndexedDB Full-State-Backups** |

---

## 📖 Das lückenlose Muni-Handbuch (Alle Funktionen)
*Damit am Renntag jedes Detail sitzt, hier die exakte Erklärung des gesamten Funktionsumfangs.*

### 1. PWA Installation & Hardcore Offline-Caching
Die App MUSS installiert werden, um im Wald zu funktionieren.
1. Öffne die Seite im Browser. Gehe in die **Einstellungen ⚙️ ➔ 📲 App**.
2. **Smart Install:** Die App analysiert deinen User-Agent (iOS Safari, Android Chrome, Firefox) und zeigt dir die *exakte* Anleitung, um sie als App auf dem Homescreen zu speichern.
3. **Karten-Caching:** Zoome auf der Hauptkarte in das Trail-Gebiet. Klicke in den Einstellungen auf `🗺️ Sichtbaren Kartenbereich cachen`. Die App berechnet die Bounding-Box und lädt hunderte Topo-Kacheln direkt in den lokalen Cache.
4. **Speicher-Lock:** Klicke auf `🔒 Dauerhaften Speicher anfragen`. Dies verhindert, dass das OS des Handys bei Speichermangel deine Offline-Karten löscht.

### 2. Das Fahrer-Profil (Avatar & Hardware)
Gehe auf **Einstellungen ⚙️ ➔ 👤 Profil**. Diese Daten fließen in alle Export-Dateien, Krypto-Signaturen und das Run-Detail-Modal ein.
* **Avatar-Builder:** Kombiniere 20 Rider-Emojis (🦄, 🚵, 🦅) mit 8 Hintergrundfarben zu deinem Piloten-Avatar.
* **Muni-Details:** Hinterlege deinen Namen, den Namen deines Einrads, Radgröße (von 19" Trial bis 36" Road) und Bremsenmodell.
* **Spezial-Setup:** Hast du eine *Schlumpf-Nabe* oder fährst du *Freewheel*? Nutze die Quick-Buttons, um es einzutragen.
* **App-Sprache:** Wähle 🇩🇪, 🇬🇧, 🇫🇷 oder 🇪🇸. Dies steuert das UI und den Akzent der TTS-Vorlesestimme.

### 3. Karte, Filter, Marker & Deep-Linking
* **Floating Action Buttons (FABs):** Rechts unten steuerst du das GPS (mit deinem personalisierten 🦄-Emoji), den GPX-Manager, den Dark-Mode und die Übersicht.
* **Chips-Filter:** Oben links blendest du Kategorien ein/aus (🟢 Beginner, 🟡 Mittel, 🔴 Expert, 🔵 Logistik). *Geheimtipp: Der "Weg ins Camp" wird nur im Logistik-Filter als Pfad eingeblendet.*
* **Marker-Modus:** Aktiviere unter *Einstellungen ➔ Marker* die Funktion `📍 Karte`. Ein **Doppelklick** setzt einen eigenen Marker.
* **Deep-Linking:** Ein Klick auf "Navigation" im Marker-Popup generiert einen Link, der automatisch **Apple Maps** oder **Google Maps** öffnet und dich zum Trailhead lotst.

### 4. Das GPX-Panel (Die Streckenverwaltung)
Tippe auf das **Ordner-Symbol**. Es hat 3 Tabs:
* **📥 Laden:** Importiere GPX per Upload, Drag&Drop oder füge eine GitHub-Raw-URL ein. Ein integrierter CORS-Proxy hilft bei geblockten Links.
* **🗺️ Tracks:** Klickst du auf eine geladene Strecke, generiert die App live ein **Farbverlaufs-Höhenprofil** (inkl. Min/Max/Gesamtanstieg) auf einem HTML-Canvas. Du siehst zudem die lokale Bestenliste.
* **🔴 Aufnahme:** Tracke deine eigene Freeride-Tour! Die Aufnahme ist per **WakeLock** und **15-Sekunden-Auto-Save** vor Handy-Abstürzen gesichert. Nach dem Stoppen kannst du Notizen hinzufügen, die App rechnet die Vektorlänge aus und du kannst den Track sofort per **Web Share API** (WhatsApp, AirDrop) verschicken.

### 5. Turn-by-Turn Navigation & HUD (Off-Route Detection)
Klicke im Track-Popup auf `🧭 Navigation`. Oben im Bild erscheint das Navi-HUD:
* **Zum Start (Modus 1):** Das HUD zeigt dir per dynamischem Pfeil und Distanz den Weg zum Start. Gehst du falsch, warnt dich das HUD rot blinkend.
* **Auf der Strecke (Modus 2):** Am Start angekommen, dreht die Logik. Die App rechnet den Algorithmus rückwärts, sucht deinen Punkt auf der Strecke und peilt den Pfad **50 Meter in Fahrtrichtung voraus** an. Sie erkennt Kurven vorab und zeigt: `↰` oder `↱`. Nähert sich die Kurve, warnt die Sprachausgabe: *"Links abbiegen"*.
* **Off-Route Warnung:** Verlässt du den Pfad um mehr als 25 Meter, wird das HUD rot und die Stimme ruft: *"Achtung, du bist neben der Strecke!"*.

### 6. Der Trail-Editor (Mini-Map & Version History)
Unter **Einstellungen ⚙️ ➔ Strecken ➔ ⚙️ Einstellungen** findest du das ultimative Planungstool für jede geladene Strecke:
* **🚀 Mini-Map Feature Scanner:** Klicke auf `➕ Schlüsselstelle`. Es öffnet sich ein Full-Screen-Modal mit einer eigenen **Leaflet Mini-Map und Fadenkreuz**. Schiebe die Karte exakt an den Baum, an dem der Drop liegt (oder nutze `📡 Live GPS`), wähle den Typ (⬇️ Drop, 🪨 Steinfeld, 🌉 Northshore, 🦘 Sprung) und bewerte die Härte (1-5 Sterne). Diese Features erscheinen danach auf deiner Hauptkarte!
* **🎽 Condition:** Ist der Trail heute ☀️ Trocken, 🌧 Matschig oder ❄️ Eisig?
* **🕐 Historie:** Jede Änderung (neue Beschreibung, neuer Drop) wird lokal in einem detaillierten Version-Changelog mit Timestamp für diese Strecke geloggt.

### 7. Die Enduro Race-Engine ⏱️ (Das Meisterstück)
Keine Chips, keine Lichtschranken. Dein Handy regelt alles. Absolute Präzision durch Turf.js.
1. Wähle eine Strecke und drücke `⏱ Timing`. Das Race-Overlay legt sich über den Bildschirm.
2. **Smartwatch (Optional):** Klicke auf `🔵 Smartwatch verbinden`, um das GPS deiner Garmin/Apple Watch via Web Bluetooth abzugreifen (deutlich präziser als das Handy im Rucksack).
3. **Die Startbox (≤ 5m):** Bei 5m ändert sich das Display radikal: Ein Canvas-Render zeigt die Distanz zentimetergenau und farbcodiert an.
4. **Arming (≤ 2m):** Die App fragt `✓ Ja, Start!`. Bestätige. Das System ist nun scharfgestellt. Die Zeit steht auf 00:00.
5. **GO!:** Die App berechnet eine 6 Meter breite Vektor-Startlinie im 90-Grad-Winkel zum Trail. Überquerst du sie in Fahrtrichtung (> 1,5m Bewegung), feuert der Startschuss. Handy sperren und abfahren!
6. **Dynamische Zwischenzeiten (Splits):** Die App zerschneidet die Strecke mathematisch in 4 Sektoren. Im Hintergrund pulsieren die Split-Boxen blau. Passierst du einen Sektor, wird die Zwischenzeit gebongt und die Box wird grün.
7. **Ziel:** Fährst du durch das virtuelle Ziel, vibriert das Handy 5-fach, die Zeit stoppt, und die **kryptografische Signatur** deines Laufs wird erstellt.

### 8. Run-Detail-Modal & Analyse
Klickst du im Track-Menü auf eine gefahrene Zeit, öffnet sich die Detail-Analyse:
* Oben prangt dein Avatar und deine Muni-Specs (Schlumpf, Radgröße) als Kapseln.
* Eine Grid-Ansicht zeigt dir deine exakten Sektor-Zeiten (Splits).
* **Crash-Log:** Hier siehst du sekundengenau, wann du gestürzt bist oder abgestiegen bist (ermittelt durch Sensor-Fusion).
* **GPX-Export:** Ein Button generiert dir sofort eine GPX-Datei *dieses speziellen Laufs* – inklusive der GPS-Speed-Daten pro Wegpunkt!

### 9. Der integrierte Kamera-Scanner & Das QR-Ökosystem
Da es im Wald kein Netz gibt, tauschen die Handys Daten per Kamera aus. Aktiviere in den Einstellungen den **QR-Scan** (Live-Video). Er erkennt automatisch:
* **Einfache Links:** GPX-Dateien aus dem Internet laden.
* **Einzelne Marker:** Scanne den Code eines Kumpels und übernimm seine Drops und Notizen.
* **Full-State-Backups:** Lies ein gigantisches JSON-Backup aus.
* **GPX-Strecken via Multi-QR-Chunking:** (Siehe unter "Black Magic").

### 10. Sprachsteuerung & Barrierefreiheit (A11Y)
Die Sonne blendet extrem oder das Handy steckt fest im Rucksack?
* Aktiviere die **♿ Vorlesefunktion**.
* Es erscheint eine schwebende **TTS Control Bar**. Du kannst die Sprachausgabe pausieren <kbd>⏸</kbd>, den letzten Satz wiederholen <kbd>⏮</kbd> oder überspringen <kbd>⏭</kbd>.
* Tippe auf die schwebende `🔊` FAB (oder <kbd>V</kbd> auf der Tastatur): Die App liest dir die gesamte Kartenlage vor (Zoomstufe, sichtbare Strecken, Entfernung vom GPS).
* Tippe auf <kbd>N</kbd>: *"Nächster Punkt: Start Expert 2, 450 Meter entfernt."*

### 11. Der Admin-Modus (Leaderboards & Backups)
Unter **Einstellungen ⚙️ ➔ Backup** hat der Event-Leiter die Kontrolle:
* **📊 Zeiten Export:** Lade *alle* gefahrenen Zeiten aller Teilnehmer (inkl. Splits, Stürze, Muni-Hardware und Krypto-Signaturen) als formatiertes, Excel-kompatibles **CSV (inkl. UTF-8 BOM)** oder JSON herunter.
* **📦 Full Backup:** Ein Klick packt *alles* (Strecken, Zeiten, Profil-Daten, Ratings, Marker, Version-Histories) in eine einzige JSON-Datei. Importiere diese auf einem anderen Gerät, und das Handy ist ein exakter Klon.

---

## 🚀 The "Black Magic" – Innovative Ansätze
*Hier wird es für Software-Engineers extrem spannend. Diese App reizt moderne Web-APIs gnadenlos aus.*

<details open>
<summary><b>🛸 Das Multi-QR-Chunking Protokoll (Transfer ohne Netz)</b></summary>
Ein normaler QR-Code fasst nicht annähernd genug Daten für einen kompletten GPX-Track. Wie sendest du im Wald eine Strecke von Handy zu Handy, ohne Bluetooth-Pairing?
<br><br>
<b>Die Protokoll-Pipeline:</b>
<ol>
  <li><b>Ramer-Douglas-Peucker (RDP):</b> Die Strecke wird iterativ mathematisch geglättet, um redundante Trackpunkte zu löschen.</li>
  <li><b>Delta-Encoding:</b> Statt dicker <code>[lat, lng, ele, time]</code> Arrays speichert die App nur die relativen Millimeter-Abstände zum vorherigen Punkt in einer kompakten 10^-5 Matrix.</li>
  <li><b>DEFLATE-Kompression:</b> Das Delta-JSON wird via <code>pako</code> (Zlib) direkt im Browser extrem komprimiert.</li>
  <li><b>Base64Url & Chunking:</b> Die Binärdaten werden zu URL-sicheren Base64-Strings konvertiert, in 1100-Zeichen-Blöcke zerschnitten und mit einem Sync-Header <code>{v:1, id, i, n, z, d}</code> versehen.</li>
  <li><b>Visualisierung:</b> Die App spielt diese Chunks als QR-Bilder in einer Endlosschleife (Daumenkino) ab. Der integrierte <code>jsQR</code> Kamera-Scanner des Empfängers puzzelt die verrauschten Frames asynchron zusammen! <i>Wie AirDrop, aber es klappt OS-übergreifend!</i></li>
</ol>
</details>

<details open>
<summary><b>💥 Sensor Fusion (Crash & Dismount Detection)</b></summary>
Die App misst nicht nur die Zeit, sondern <i>wie hart</i> du fährst. Sie überwacht die native <code>DeviceMotionEvent</code> API in Echtzeit.
<ul>
  <li><b>Sturzerkennung (Crash):</b> Der 3D-Vektor der Beschleunigung inkl. Gravitation <code>√(ax² + ay² + az²)</code> wird alle paar Millisekunden berechnet. Gibt es einen Spike von über <b>35 m/s² (ca. 3.5 G)</b> und das Handy ist ~400ms danach auffällig ruhig, geht das System von einem Sturz aus. Es loggt "💥 Sturz" mitsamt Timestamp in die Rennakte.</li>
  <li><b>Absteigen (Dismount):</b> Fällt die GPS-Geschwindigkeit auf dem Trail abrupt von dynamischer Fahrt (>5 km/h) auf Stillstand (<1 km/h), wird ein "🚶 Absteigen" registriert. Ideal für die spätere Analyse im CSV-Export.</li>
</ul>
</details>

<details open>
<summary><b>🔐 Serverless Crypto-Signing (Anti-Cheat System)</b></summary>
Da es keinen zentralen Server gibt: Wie verhindert man, dass jemand sein exportiertes JSON-Zeitenfile am PC bearbeitet und eine Fabelzeit einträgt?
<br><br>
Beim Passieren der Ziellinie nutzt die App die native <code>window.crypto.subtle</code> API. Sie generiert einen <b>HMAC-SHA256 Hash</b> aus: <i>Gesamtzeit + Alle Splits + Fahrername + Muni-Setup + Tages-Secret-Key</i>.
Dieser kryptografische Hash wird im JSON und im Ziel-QR-Code unlöschbar hinterlegt. Ändert ein Cheater später nur eine Millisekunde der Zeit, bricht die Signatur bei der Prüfung durch den Rennleiter sofort zusammen.
</details>

<details open>
<summary><b>🎯 Dynamisches Geofencing (Turf.js Vektor-Startlinien)</b></summary>
Eine Startlinie ist kein simpler "Radius" (Kreis), in den man hineinfährt – das gäbe krasse Fehlstarts, wenn man sich dem Punkt von der falschen Seite nähert. 
Die App nutzt die Geomathematik von <b>Turf.js</b>: Sie misst das <i>Bearing</i> (den Kompass-Winkel) der ersten Trail-Meter. Im exakten 90-Grad-Winkel dazu errechnet sie live die Koordinaten für eine virtuelle, 6 Meter breite Linie quer auf dem Trail. Erst wenn du <i>genau diese Vektor-Linie nach vorne</i> durchbrichst, startet der Timer.
</details>

---

## 🛡️ Hardcore Offline-Resilienz
*Ein Mountain-Unicycle Event verzeiht keine Software-Fehler. Diese App ist auf das Überleben im Extremfall programmiert.*

> [!TIP]  
> **Unlimited Storage via IndexedDB:**
> Der normale `localStorage` eines Browsers crasht bei 5 MB. Diese App umgeht das Limit elegant durch den Einsatz von `localForage`. Alle GPX-Files, Tausende Map-Tiles und riesige JSON-Backups werden asynchron in die **IndexedDB** des Browsers geschrieben. Gigabytes an Offline-Daten sind möglich.

* **🔋 WakeLock API:** iOS und Android killen inaktive Browser-Tabs gnadenlos, wenn das Display aus ist. Beim Rennstart ruft die App `navigator.wakeLock.request('screen')` auf. Das Betriebssystem hält die App priorisiert am Leben, das GPS loggt ungebremst im Hintergrund.
* **⚠️ GPS-Retry-Logik:** Verliert das Handy im dichten Wald das Signal, gibt die App nicht auf. Sie registriert den Error-Code und versucht in immer länger werdenden Abständen (bis zu 3x), die Hardwaresensoren des Handys neu zu initialisieren.
* **💾 Persistenz API:** Die App bittet den Browser über `navigator.storage.persist()` um den Status "Dauerhafter Speicher", damit das OS die gecachten Karten bei Speichermangel auf dem Handy nicht im Hintergrund löscht.
* **🗂 Echtzeit-Recovery:** Alle 15 Sekunden wird der GPS-Recorder in die DB gesichert. Schließt du den Browser aus Versehen, stellt die App den Lauf beim nächsten Öffnen punktgenau wieder her.

---

## 💻 Tech Stack & Architektur

Der absolute Clou an diesem Projekt: Es ist eine **Single-File-App (SFA)**.
Kein Node.js, kein Webpack, kein React, keine `.env` Dateien. Alle ~3800 Zeilen Code stecken in einer `index.html`.

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
