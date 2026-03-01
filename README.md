<div align="center">

# 🦄 GMTW Muni Map 🌲
**Die serverlose Offline-PWA für das German Muni Trail Weekend**

**Das serverlose Offline-Ökosystem für Mountain-Unicycling & Freeride Events**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: 100% Offline](https://img.shields.io/badge/Status-100%25_Offline_Ready-success)](#)
[![Tech: Vanilla JS](https://img.shields.io/badge/Tech-Vanilla_JS-f7df1e?logo=javascript&logoColor=black)](#)
[![Geospatial: Turf.js](https://img.shields.io/badge/Geospatial-Turf.js-green)](#)
[![Storage: IndexedDB](https://img.shields.io/badge/Storage-IndexedDB_Unlimited-blueviolet)](#)

Ein technologisches Meisterwerk, verpackt in **einer einzigen HTML-Datei**. Entwickelt von Muni-Fahrern für Muni-Fahrer. Diese Progressive Web App (PWA) bringt hochpräzise Enduro-Zeitmessung, Turn-by-Turn Navigation, Sturzerkennung, Trail-Feature-Mapping und QR-basierte Datenübertragung in die tiefsten Wälder – **komplett ohne Handynetz, Cloud oder App-Store.**

[**📖 Das Ultimative Handbuch**](#-das-lückenlose-muni-handbuch-alle-funktionen) • [**🚀 Black Magic (Tech-Deep-Dive)**](#-the-black-magic--innovative-ansätze) • [**🛡️ Offline-Resilienz**](#%EF%B8%8F-hardcore-offline-resilienz)

</div>

<br>

> [!IMPORTANT]  
> **Das Paradigma dieser App:** 
> Einrad-Downhill und Enduro-Events finden dort statt, wo es keinen Empfang gibt. Klassische Timing-Systeme (RFID) sind teuer, herkömmliche Apps versagen offline völlig. Diese App ändert die Spielregeln: **Dein Smartphone *ist* der Transponder, das Navi, der Kamera-Scanner, der Server und die Datenbank in einem.**

---

## ✨ Feature-Matrix im Überblick

| 🗺️ Karte & Navigation | ⏱️ Race Engine & GPS | 🗂️ Daten, Sync & Kamera |
| :--- | :--- | :--- |
| **Topo & Satellit** (Offline speicherbar) | **Auto-Start** via Turf.js Geofencing | **Integrierter Kamera-Scanner** |
| **Dynamisches Navi-HUD** (Off-Route Warnung)| **Sensor-Fusion** für Sturz-Erkennung | **Multi-QR-Chunking** für Tracks |
| **Trail Feature Editor** (Mini-Map Crosshair) | **Web Bluetooth** Smartwatch GPS | **Crypto-Signaturen** für Resultate |
| **GPX-Parser** (inkl. Höhenprofil) | **Live-GPS Recorder** (inkl. Auto-Save) | **Persönliches Strecken-Rating** |
| **Apple/Google Maps** Deep-Linking | **Muni-Profile** (Radgrößen, Kurbeln) | **Full-State-Backups** (Geräte klonen) |

---

## 📖 Das lückenlose Muni-Handbuch (Alle Funktionen)

### 1. PWA Installation & Offline-Caching (Pflicht!)
Die App MUSS installiert werden, um im Wald zu funktionieren.
1. Öffne die Seite im Browser deines Handys.
2. Gehe in die **Einstellungen ⚙️ ➔ 📲 App**.
3. **Smart Install:** Die App analysiert deinen User-Agent (iOS Safari, Android Chrome, Firefox) und zeigt dir die *exakte* bebilderte Anleitung, um sie als App auf dem Homescreen zu speichern.
4. **Karten-Caching:** Zoome auf der Hauptkarte in das Trail-Gebiet (mind. Zoom 12). Klicke in den App-Einstellungen auf `🗺️ Sichtbaren Kartenbereich cachen`. Hunderte Topo-Kacheln werden direkt in deinen lokalen Cache geladen. Du bist jetzt netzunabhängig.

### 2. Das Fahrer-Profil (Avatar & Hardware)
Gehe auf **Einstellungen ⚙️ ➔ 👤 Profil**. Diese Daten fließen in alle Leaderboards, Export-Dateien und QR-Krypto-Signaturen ein.
* **Avatar-Builder:** Wähle aus 20 Emojis (🦄, 🚵, 🦅, 🐉) und 8 Hintergrundfarben deinen Piloten-Avatar.
* **Muni-Details:** Hinterlege Fahrername, Muni-Name, Radgröße (von 19" Trial bis 36" Road).
* **Hardware-Specials:** Fährst du eine *Schlumpf-Nabe*, *Freewheel* oder eine spezielle *Magura MT5*? Trag es ein!
* **Sprache:** Wähle 🇩🇪, 🇬🇧, 🇫🇷 oder 🇪🇸 (Steuert auch die Sprache der TTS-Vorlesestimme).

### 3. Das Hauptmenü & Die Karte (FABs & Filter)
Auf dem Startbildschirm hast du alles im Griff:
* **Floating Action Buttons (FABs):** Rechts unten findest du Tasten für: GPS zentrieren, GPX-Menü öffnen, Aufnahme starten, Light/Dark-Mode umschalten, Karte auf alle Marker anpassen und die Einstellungen.
* **Karten-Layer:** Oben rechts (Karten-Icon) wechselst du nahtlos zwischen OpenTopoMap (Höhenlinien) und Esri Satellitenbild.
* **Chips-Filter:** Oben links blendest du Kategorien ein/aus (🟢 Beginner, 🟡 Mittel, 🔴 Expert, 🔵 Logistik). *Geheimtipp: Der "Weg ins Camp" wird nur im Logistik-Filter als gestrichelte Linie angezeigt.*
* **Sheet-Menü:** Klicke auf das Burger-Menü oben links, um alle sichtbaren Wegpunkte als klickbare Liste anzuzeigen.

### 4. Eigene Marker & Deep-Linking
* **Marker Setzen:** Gehe in *Einstellungen ➔ Marker* und aktiviere `📍 Karte`. Der **Marker-Modus** ist aktiv. Ein **Doppelklick** auf die Karte öffnet das Erstellungs-Menü. Wähle ein Emoji (⚠️, 🔥, 🏕️), gib einen Namen ein und speichere. 
* **Skalierung:** Sind dir die Pins zu klein? Nutze den Slider unter *Einstellungen ➔ Marker*, um alle Icons stufenlos auf bis zu 200% zu vergrößern.
* **Deep-Linking:** Ein Klick auf "Navigation" im Marker-Popup generiert einen Link, der automatisch **Apple Maps** oder **Google Maps** (je nach Handy) öffnet und dich zum Trailhead lotst.

### 5. Das GPX-Panel (Die Streckenverwaltung)
Tippe auf das **Ordner-Symbol** unten in der Mitte. Es hat 3 Tabs:
* **📥 Laden:** Importiere GPX-Dateien per Datei-Upload, Drag&Drop oder füge eine GitHub-Raw-URL ein. Ein integrierter CORS-Proxy hilft bei blockierten Links.
* **🗺️ Tracks:** Klickst du auf eine geladene Strecke, siehst du Distanz, Dauer, ein errechnetes **Farbverlaufs-Höhenprofil** (inkl. Min/Max/Gesamtanstieg) und die lokale Bestenliste. Über die Tasten am Track blendest du ihn ein/aus oder löschst ihn.
* **🔴 Aufnahme:** Starte einen Live-GPS-Tracker. Die App zieht eine gestrichelte rote Linie hinter dir her. Die Aufnahme ist per **WakeLock** und **15-Sekunden-Auto-Save** vor Abstürzen gesichert. Nach dem Stoppen kannst du Notizen hinzufügen und die Freeride-Tour direkt speichern oder teilen.

### 6. Das Trail-Tagebuch (Rating, Features & Changelog)
Unter **Einstellungen ⚙️ ➔ Strecken** findest du das ultimative Tool zur Streckenplanung. Es hat 3 Sub-Tabs:
* **📥 Strecken:** Die Auto-Sync Funktion. Klicke auf `🔄 Updates suchen` und die App zieht fehlende GMTW-Strecken direkt über die GitHub-API.
* **📝 Mein Rating:** Vergib 1 bis 5 Sterne für *Schwierigkeit*, *Spaß* und *Flow*. Setze deinen Status (Noch nicht / In Arbeit / Geschafft). Ein Dashboard rechnet dir aus, wie viel Prozent des Events du überlebt hast.
* **🚀 Features (Der Editor):** Wähle eine Strecke aus dem Dropdown. Hier kannst du folgendes tun:
  * **Streckenzustand:** Ist der Trail ☀️ Trocken, 🌧 Matschig oder ❄️ Eisig?
  * **Feature Scanner:** Klicke auf `➕ Schlüsselstelle`. Es öffnet sich ein **Full-Screen-Modal mit einer Mini-Map und Fadenkreuz**. Schiebe die Karte exakt an den Baum, an dem der Drop ist (oder nutze den Button `📡 Live GPS`), wähle den Typ (⬇️ Drop, 🪨 Steinfeld, 🌉 Northshore) und die Schwierigkeit (1-5 Sterne). Diese Features erscheinen fortan als kleine Emojis auf deiner Hauptkarte!
  * **Historie:** Jede Änderung (neue Beschreibung, neuer Drop) wird in einem Version-Changelog mit Timestamp für diese Strecke gespeichert.

### 7. Turn-by-Turn Navigation & Off-Route Detection (Das HUD)
Die App hat ein eigenes, intelligentes Head-Up Display (HUD) für den Wald:
* Klicke im Track-Popup auf `🧭 Navigation`.
* **Zum Start:** Das HUD zeigt dir per dynamischem Pfeil und Distanz den direkten Weg zum Start. Gehst du in die falsche Richtung, wird das HUD rot und pulsiert.
* **Auf der Strecke (On-Track):** Am Start angekommen, wechselt der Modus. Die App rechnet den RDP-Algorithmus ab und schaut auf dem GPX-Pfad **ca. 50 Meter in Fahrtrichtung voraus**. Sie erkennt Kurven und zeigt den Pfeil entsprechend an (`↰`, `↱`, `↑`).
* **Off-Route Detection:** Verlässt du den Pfad um mehr als 25 Meter, warnt das Display (und die Sprachausgabe): *"⚠️ Neben der Strecke!"*.

### 8. Der Enduro-Race-Modus ⏱️ (Das Meisterstück)
Das Handy ist die Zeitmessanlage. Keine RFID-Chips nötig. Absolute Präzision durch Turf.js.
1. Wähle eine Strecke und drücke `⏱ Timing`.
2. **Smartwatch (Optional):** Klicke auf `🔵 Smartwatch verbinden`, um das GPS deiner Garmin/Apple Watch via Web Bluetooth abzugreifen (deutlich präziser als das Handy im Rucksack).
3. **Annäherung:** Die App navigiert dich per HUD zur Startlinie.
4. **Die Startbox (≤ 5m):** Bei 5m füllt eine riesige, farbige Entfernungsanzeige das Display (Canvas-Render).
5. **Arming (≤ 2m):** Die App fragt `✓ Ja, Start!`. Bestätige. Das System ist nun scharf (die Uhr steht noch auf 00:00).
6. **GO!:** Die App berechnet eine 6 Meter breite, unsichtbare Vektor-Startlinie im 90-Grad-Winkel zum Trail. Fährst du über diese Linie, feuert der Startschuss. Handy sperren und abfahren!
7. **Ziel:** Fährst du durch das virtuelle Ziel, vibriert das Handy mehrfach wild, die Zeit stoppt, und die **kryptografische Signatur** deines Laufs wird erstellt.

### 9. Der Kamera-Scanner & Das QR-Ökosystem (Datentausch)
Da es im Wald kein Netz gibt, kommunizieren die Handys per Kamera miteinander. Gehe auf **Einstellungen ⚙️ ➔ QR-Scan** und aktiviere die Kamera. Die App erkennt automatisch:
* **Einfache Links:** GPX-Dateien aus dem Internet laden.
* **Einzelne Marker:** Scanne den Code eines Kumpels und speichere seine "Gefahrenstelle" inkl. Koordinaten ab.
* **Full-State-Backups:** Lies ein gigantisches JSON-Backup aus.
* **GPX-Strecken via Multi-QR-Chunking:** (Siehe unter "Black Magic").

### 10. Barrierefreiheit / Sprachsteuerung (A11Y)
Die Sonne blendet extrem oder das Handy steckt fest im Rucksack?
* Aktiviere unter den Einstellungen die **♿ Vorlesefunktion**.
* Es erscheint links unten eine **TTS Control Bar** (Vorlesen, Pause <kbd>⏸</kbd>, Wiederholen <kbd>⏮</kbd>, Überspringen <kbd>⏭</kbd>).
* Tippe auf die schwebende `🔊` FAB (oder <kbd>V</kbd> auf der Tastatur): Die App liest dir die gesamte Kartenlage vor (Zoomstufe, sichtbare Strecken, Entfernung vom GPS).
* Tippe auf <kbd>N</kbd>: *"Nächster Punkt: Ziel Expert, 450 Meter entfernt."*

### 11. Der Admin-Modus (Exporte & Klonen)
Unter **Einstellungen ⚙️ ➔ Backup** hat der Rennleiter die Kontrolle:
* **📊 Zeiten Export:** Lade alle gefahrenen Zeiten aller Teilnehmer (inkl. Splits, Stürze und Signaturen) als formatierte, Excel-kompatible `.csv` herunter.
* **📦 Full Backup:** Ein Klick packt *alle* Strecken, Zeiten, Profil-Daten, Ratings und Marker in eine einzige JSON-Datei. Importiere diese Datei auf einem anderen Gerät, und das Handy ist ein exakter Klon.

---

## 🚀 The "Black Magic" – Innovative Ansätze
*Hier wird es für Entwickler spannend. Diese App reizt moderne Web-APIs gnadenlos aus.*

<details open>
<summary><b>🛸 Das Multi-QR-Chunking Protokoll (Transfer ohne Netz)</b></summary>
Ein normaler QR-Code fasst nicht genug Daten für einen kompletten GPX-Track. Wie sendest du im Wald eine Strecke von Handy zu Handy?
<br><br>
<b>Die Protokoll-Pipeline:</b>
<ol>
  <li><b>Ramer-Douglas-Peucker (RDP):</b> Die Strecke wird iterativ mathematisch geglättet, um redundante Trackpunkte zu löschen.</li>
  <li><b>Delta-Encoding:</b> Statt dicker <code>[lat, lng, ele, time]</code> Arrays speichert die App nur die relativen Millimeter-Abstände zum vorherigen Punkt (10^-5 Matrix).</li>
  <li><b>DEFLATE-Kompression:</b> Das JSON wird via <code>pako</code> (Zlib) hochkomprimiert.</li>
  <li><b>Base64Url & Chunking:</b> Die Binärdaten werden zu Base64 Strings, zerschnitten in 1100-Zeichen-Blöcke und mit Header <code>{v:1, id, i, n, z, d}</code> versehen.</li>
  <li><b>Visualisierung:</b> Die App spielt diese Chunks als QR-Bilder in einer Endlosschleife (Daumenkino) ab. Der integrierte <code>jsQR</code> Kamera-Scanner des Empfängers puzzelt die Frames asynchron zusammen! <i>AirDrop für Arme, aber es klappt überall!</i></li>
</ol>
</details>

<details open>
<summary><b>💥 Sensor Fusion (Crash & Dismount Detection)</b></summary>
Die App nutzt nicht nur GPS, sondern überwacht die <code>DeviceMotionEvent</code> API in Echtzeit.
<ul>
  <li><b>Sturzerkennung (Crash):</b> Der 3D-Vektor der Beschleunigung inkl. Gravitation <code>√(ax² + ay² + az²)</code> wird berechnet. Gibt es einen Spike von über <b>35 m/s² (ca. 3.5 G)</b> und das Handy ist ~400ms danach auffällig ruhig, loggt das System einen "💥 Sturz" mitsamt Timestamp im Run-Detail-Modal ein.</li>
  <li><b>Absteigen (Dismount):</b> Fällt die GPS-Geschwindigkeit auf dem Trail abrupt von dynamischer Fahrt (>5 km/h) auf Stillstand (<1 km/h), wird ein "🚶 Absteigen" registriert.</li>
</ul>
</details>

<details open>
<summary><b>🔐 Serverless Crypto-Signing (Anti-Cheat)</b></summary>
Da es keinen Server gibt: Wie verhindert man, dass jemand sein exportiertes JSON am PC bearbeitet und eine Fabelzeit einträgt?
<br><br>
Beim Passieren der Ziellinie nutzt die App die native <code>window.crypto.subtle</code> API. Sie generiert einen <b>HMAC-SHA256 Hash</b> aus: <i>Gesamtzeit + Alle Splits + Fahrername + Muni-Setup + Einem internen, tagesaktuellen Secret-Key</i>.
Dieser Hash wird im JSON und im Ziel-QR-Code hinterlegt. Ändert man nur eine Millisekunde der Zeit im Nachhinein, bricht die Signatur bei der Prüfung durch den Rennleiter zusammen.
</details>

<details open>
<summary><b>🎯 Dynamisches Geofencing & Heading (Turf.js)</b></summary>
Eine Startlinie ist kein simpler "Radius" (Kreis), in den man hineinfährt – das gäbe Fehlstarts, wenn man sich von hinten nähert. 
Die App nutzt <b>Turf.js</b>: Sie misst das <i>Bearing</i> (den Kompass-Winkel) der ersten Trail-Meter. Im exakten 90-Grad-Winkel dazu errechnet sie live die Koordinaten für eine virtuelle, 6 Meter breite Linie quer auf dem Trail. Erst wenn du <i>diese Vektor-Linie</i> in Fahrtrichtung durchbrichst, startet der Timer.
</details>

---

## 🛡️ Hardcore Offline-Resilienz
*Ein Mountain-Unicycle Event verzeiht keine Software-Fehler. Diese App ist auf Überleben programmiert.*

> [!TIP]  
> **Unlimited Storage via IndexedDB:**
> Der normale `localStorage` eines Browsers crasht bei 5 MB. Diese App umgeht das elegant durch den Einsatz von `localForage`. Alle GPX-Files, Tausende Map-Tiles und riesige JSON-Backups werden asynchron in die **IndexedDB** des Browsers geschrieben. Gigabytes an Offline-Daten sind möglich.

* **🔋 WakeLock API:** iOS und Android killen inaktive Browser-Tabs gnadenlos, wenn das Display aus ist. Beim Rennstart ruft die App `navigator.wakeLock.request('screen')` auf. Das OS hält die App priorisiert am Leben.
* **⚠️ GPS-Retry-Logik:** Verliert das Handy im Wald das Signal, gibt die App nicht auf. Sie registriert den Error-Code und versucht in immer länger werdenden Abständen (bis zu 3x), die Hardwaresensoren neu zu initialisieren.
* **💾 Persistenz API:** Die App bittet den Browser über `navigator.storage.persist()` um den Status "Dauerhafter Speicher", damit das OS die gecachten Karten bei Speichermangel nicht löscht.
* **🍏 Hostile-Environment PWA Prompts:** Apple blockiert den Standard-`beforeinstallprompt`. Die App beinhaltet einen extrem komplexen Parser, der dein Gerät, OS und Browser erkennt und dir die *exakt richtige, bebilderte* Anleitung anzeigt, wie du die App auf den Homescreen zwingst.

---

## 💻 Tech Stack & Architektur

Der absolute Clou an diesem Projekt: Es ist eine **Single-File-App (SFA)**.
Kein Node.js, kein Webpack, kein React, keine `.env` Dateien. Alle ~3500 Zeilen Code stecken in einer HTML-Datei.

**Eingesetzte Open-Source Schwergewichte (CDNs / Inlined):**
*   **[Leaflet.js](https://leafletjs.com/):** High-Performance Map Rendering.
*   **[Turf.js](https://turfjs.org/):** Fortgeschrittene Geomathematik (Distance, Bearing, Destination).
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

    Gehe in den Ordner. Es müssen 3 Dateien vorhanden sein: index.html, manifest.json und service-worker.js.

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
