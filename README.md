<div align="center">

# 🦄 GMTW Muni Map
**serverlose Offline-PWA für das German Muni Trail Weekend**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: 100% Offline](https://img.shields.io/badge/Status-100%25_Offline_Ready-success)](#)
[![Tech: Vanilla JS](https://img.shields.io/badge/Tech-Vanilla_JS-f7df1e?logo=javascript&logoColor=black)](#)
[![Geospatial: Turf.js](https://img.shields.io/badge/Geospatial-Turf.js-green)](#)
[![Storage: IndexedDB](https://img.shields.io/badge/Storage-IndexedDB_Unlimited-blueviolet)](#)

Ein technologisches Meisterwerk, verpackt in **einer einzigen HTML-Datei**. Entwickelt von Muni-Fahrern für Muni-Fahrer. Diese Web-App bringt Muni-Zeitmessung, Sturzerkennung, kryptografisch gesicherte Leaderboards und QR-basierte Datenübertragung in die tiefsten Wälder – **komplett ohne Handynetz, Cloud oder App-Store.**

[**📖 Das große Munimap-Handbuch**](#-das-grosse-munimap-handbuch-bedienung) • [**🚀 The "Black Magic"**](#-the-black-magic--innovative-ansätze) • [**🛡️ Offline-Resilienz**](#%EF%B8%8F-hardcore-offline-resilienz) • [**📜 Lizenz**](#-lizenz)

</div>

<br>

> [!IMPORTANT]  
> **Warum existiert das?** 
> Einrad-Enduro und Downhill finden dort statt, wo es keinen Empfang gibt. Klassische Timing-Systeme sind teuer, herkömmliche Apps versagen offline. Diese App dreht das Paradigma um: Dein Smartphone *ist* der Transponder, der Server und die Datenbank in einem.

---

## 📖 Das große Munimap-Handbuch (Bedienung)
*Damit am Renntag oder bei der Freeride-Tour alles perfekt läuft, hier die lückenlose Erklärung aller Funktionen.*

### 1. Installation & Offline-Vorbereitung (WICHTIG!)
Da es im Wald kein Internet gibt, muss die App vorher "scharf" gemacht werden.
1. Öffne die Seite im Browser deines Smartphones.
2. Gehe in die **Einstellungen (Zahnrad) ➔ 📲 App**.
3. Die App erkennt dein Gerät (iOS, Android, Safari, Firefox etc.) und zeigt eine exakte Schritt-für-Schritt-Anleitung, um die App **auf dem Homescreen zu installieren (PWA)**.
4. **Karten-Caching:** Zoome auf der Karte in das Trail-Gebiet von Hohensyburg (mindestens Zoom-Stufe 12). Klicke in den App-Einstellungen auf `🗺️ Sichtbaren Kartenbereich cachen`. Hunderte Kartenkacheln werden nun lokal gesichert.

### 2. Das Fahrer-Profil
Gehe auf **Einstellungen ➔ 👤 Profil**. Diese Daten werden für die Leaderboards und die Signatur genutzt:
* **Fahrername & Muni-Name:** Wie heißt du und wie heißt dein Einrad (z.B. "Fluffmaster 3000").
* **Rad-Details:** Wähle dein Setup (19" Trial, 24" Standard, 26", 29" oder 36" Road).
* **Besonderheiten:** Hast du eine *Schlumpf-Nabe*, fährst du *Freewheel* oder hast du eine spezielle Bremse (z.B. Magura MT5)? Trage es hier ein!

### 3. Karte, Filter & Navigation
* **Layer:** Oben rechts (Layer-Icon) wechselst du zwischen *Topo-Karte* (ideal für Trails) und *Satellitenbild*.
* **Trail-Kategorien (Chips):** Oben links filterst du die Anzeige nach Muni-Level: 🟢 Beginner, 🟡 Mittel, 🔴 Expert oder 🔵 Logistik (Camp, Duschen).
* **Deep-Linking:** Klickst du auf einen Punkt, öffnet sich ein Popup. Wähle `🧭 Navigation`, und die App generiert eine Route zu diesem Punkt in Apple Maps oder Google Maps.

### 4. Streckenverwaltung (Das GPX-Panel)
Tippe auf das **Ordner-Symbol (GPX)** unten in der Mitte. Es hat 3 Tabs:
* **Laden:** Importiere GPX-Dateien vom Handy oder füge eine GitHub-Raw-URL ein (CORS-Proxy ist integriert).
* **Tracks:** Hier siehst du alle Strecken. Klickst du auf eine Strecke, öffnet sich das **Höhenprofil**, die Distanz und die Bestenliste.
* **Aufnahme:** Tracke deine eigene Freeride-Tour! Start drücken, Handy einstecken. Es speichert Distanz, Zeit und sogar Top-Speed. (Kann danach als GPX geteilt werden).

### 5. Das Herzstück: Der Enduro-Race-Modus ⏱️
Das Handy in deiner Tasche ist die Zeitmessanlage. So fährst du ein Rennen:
1. Wähle in der Track-Liste die Rennstrecke und tippe auf `⏱ Timing`.
2. **Annäherung:** Die App navigiert dich zur Startlinie.
3. **Smartwatch (Optional):** Nutzt du eine Garmin/Apple Watch? Klicke auf `🔵 Smartwatch verbinden`. Die App greift via Web Bluetooth auf das hochpräzise GPS deiner Uhr zu.
4. **Die Startbox (≤ 5m):** Kommst du dem Start näher als 5 Meter, füllt eine riesige, farbige Entfernungsanzeige das Display.
5. **Arming (≤ 2m):** Bist du am Startpunkt, fragt die App: `Strecke starten & Zeit messen?`. Klicke auf **✓ Ja, Start!**. *Das System ist nun scharf, die Zeit läuft noch nicht.*
6. **GO!:** Tritt in die Pedale. Sobald das GPS erkennt, dass du dich 1,5 Meter von der Linie wegbewegst, feuert der Startschuss. Handy sperren und ab auf den Trail!
7. **Splits & Ziel:** Die App misst Zwischenzeiten (Checkpoints) automatisch im Hintergrund. Fährst du durch das virtuelle Ziel, vibriert das Handy stark, die Zeit stoppt.

### 6. Eigene Marker setzen (Geheimtipps)
Du hast eine krasse Wurzelpassage oder einen guten Drop gefunden?
* Gehe zu **Einstellungen ➔ Marker** und klicke auf `📍 Karte`.
* Der **Marker-Modus** ist aktiv: Mache einen **Doppelklick** auf die Karte.
* Wähle ein passendes Emoji (z.B. ⚠️ oder 🔥), gib ihm einen Namen und speichere. Du kannst diese Marker später per QR-Code an andere Muni-Fahrer weitergeben.

### 7. Barrierefreiheit / Text-to-Speech (A11Y)
Die Sonne blendet oder das Handy steckt im Rucksack?
* Aktiviere in den Einstellungen die **♿ Vorlesefunktion**.
* Drücke den schwebenden Lautsprecher-Button (oder `Taste V`). Die App liest dir vor: *"Karte, Zoomstufe 16. Strecke Expert 1 sichtbar."*
* Drücke `Taste N`: *"Nächster Punkt: Ziel Mittel, 450 Meter entfernt."*

---

## 🚀 The "Black Magic" – Innovative Ansätze
*Hier trennt sich die Spreu vom Weizen. Diese App pusht die Grenzen dessen, was reine Web-Technologie im Browser fernab der Zivilisation leisten kann.*

<details open>
<summary><b>🛸 Das Multi-QR-Chunking Protokoll (Datentransfer ohne Netz)</b></summary>
Ein normaler QR-Code fasst nicht genug Daten für einen ganzen GPX-Track. Wie schickst du eine Strecke im Wald an einen Kumpel?
<br><br>
<b>Der Algorithmus:</b>
<ol>
  <li><b>Ramer-Douglas-Peucker (RDP):</b> Die Strecke wird mathematisch geglättet (irrelevante Punkte gelöscht).</li>
  <li><b>Delta-Encoding:</b> Statt langer Koordinaten <code>(51.419, 7.485)</code> speichert die App nur die relativen Millimeter-Abstände zum vorherigen Wegpunkt.</li>
  <li><b>DEFLATE-Kompression:</b> Das Delta-JSON wird via <code>pako</code> stark komprimiert.</li>
  <li><b>Chunking & Loop:</b> Der komprimierte Base64-String wird in Blöcke à 1100 Zeichen zerschnitten. Die App zeigt diese nun als <b>animierte QR-Code-Diashow</b> (ca. 3-4 Bilder in Dauerschleife) auf dem Display an.</li>
  <li><b>Empfang:</b> Der jsQR-Scanner des Kumpels filmt das Display ab, sammelt die Puzzleteile im Hintergrund und baut die GPX-Datei wieder zusammen. <i>AirDrop für Arme, aber extrem robust!</i></li>
</ol>
</details>

<details open>
<summary><b>💥 Sensor Fusion (Crash & Dismount Detection)</b></summary>
Es geht nicht nur um die Zeit, sondern wie du fährst. Die App greift auf die <code>DeviceMotionEvent</code> API zu (Beschleunigungssensor des Handys).
<ul>
  <li><b>Sturzerkennung (Crash):</b> Der 3D-Vektor der G-Kräfte <code>√(ax² + ay² + az²)</code> wird permanent überwacht. Gibt es einen Spike von über <b>35 m/s² (ca. 3.5 G)</b> und das Handy ist 400ms danach auffällig ruhig, loggt das System einen "Sturz" in die Rennakte ein.</li>
  <li><b>Absteigen (Dismount):</b> Fällt die GPS-Geschwindigkeit auf dem Trail abrupt von >5 km/h auf <1 km/h, wird ein unfreiwilliges Absteigen registriert.</li>
</ul>
</details>

<details open>
<summary><b>🔐 Serverless Crypto-Signing (Anti-Cheat System)</b></summary>
Da es keinen Server gibt, auf dem die Zeiten sicher liegen: Wie verhindert man, dass jemand das exportierte JSON am PC bearbeitet und sich auf Platz 1 der Bestenliste setzt?
<br><br>
Beim Passieren der Ziellinie feuert die native <code>window.crypto.subtle</code> API. Sie baut einen <b>HMAC-SHA256 Hash</b> aus: <i>Rennzeit + Split-Zeiten + Fahrername + Muni-Setup + Tages-Secret-Key</i>.
Diese Signatur wird im finalen Resultat-QR-Code hinterlegt. Verändert jemand nachträglich nur eine Millisekunde der Zeit, stimmt der kryptografische Hash nicht mehr mit den Daten überein – der Betrug fliegt bei der Rennleitung sofort auf.
</details>

<details>
<summary><b>🎯 Dynamisches Geofencing (Turf.js Start/Ziellinien)</b></summary>
Eine Startlinie ist kein simpler "Radius", in den man hineinfährt (das gäbe Fehlstarts, wenn man von hinten anrollt). 
Die App nutzt <b>Turf.js</b>: Sie misst das <i>Bearing</i> (den Winkel) der ersten Trail-Meter. Im exakten 90-Grad-Winkel dazu errechnet sie live die Geokoordinaten für eine virtuelle, 6 Meter breite Linie im Wald. Erst wenn du <i>diese Linie nach vorne</i> durchbrichst, startet die Uhr.
</details>

---

## 🛡️ Hardcore Offline-Resilienz
*Auf einem Muni-Event gibt es Schlamm, Stürze und leere Akkus. Die Software darf niemals der Grund für Datenverlust sein.*

| Feature | Wie es dich rettet |
| :--- | :--- |
| **IndexedDB (localForage)** | Der normale Browser-Cache (`localStorage`) crasht bei 5 MB. Diese App schiebt alle GPX-Files, Zeiten und Kartendaten in die IndexedDB. *Gigabytes an Daten sind möglich.* |
| **15-Sekunden Auto-Recovery** | Der Strecken-Recorder speichert deinen Lauf alle 15 Sekunden. Schließt du den Browser aus Versehen, fragt die App beim Neustart: *"Unterbrochene Aufnahme gefunden. Wiederherstellen?"* Nichts geht verloren. |
| **WakeLock API** | iOS und Android killen inaktive Browser-Tabs gnadenlos, wenn das Display aus ist. Beim Rennstart ruft die App `navigator.wakeLock.request()` auf. Das Betriebssystem hält die App priorisiert am Leben. |
| **Full-State JSON Backups** | Unter *Einstellungen ➔ Backup* lässt sich der komplette Zustand der App (Alle Tracks, alle Zeiten, alle Marker, alle Profile) in eine einzige JSON-Datei packen. Ein Klick, und du kannst dein komplettes Handy auf das eines Freundes spiegeln. |

---

## 💻 Tech Stack & Architektur

Der absolute Clou an diesem Projekt: Es ist eine **Single-File-App (SFA)**.
Es gibt kein Node.js, kein Webpack, kein React, keine `.env` Dateien. 

**Eingesetzte Open-Source Schwergewichte:**
*   **[Leaflet.js](https://leafletjs.com/):** High-Performance Map Rendering.
*   **[Turf.js](https://turfjs.org/):** Fortgeschrittene Geomathematik (Distance, Bearing, Line-Intersect).
*   **[jsQR](https://github.com/cozmo/jsQR):** Frame-by-Frame Kamera-Scanning in purem JavaScript.
*   **[Pako](https://github.com/nodeca/pako):** Rasante Zlib/Deflate In-Browser-Datenkompression.
*   **[localForage](https://localforage.github.io/localForage/):** Asynchroner Offline-Storage Wrapper.
*   **Web APIs:** `DeviceMotionEvent`, `Web Crypto API`, `Web Bluetooth API`, `Web Share API`, `WakeLock API`.

---

## 🛠️ Setup (Für Entwickler & Event-Orgas)

Es ist so einfach, wie Software nur sein kann:

1. Lade dieses Repository als `.zip` herunter oder klone es:
   ```bash
   git clone https://github.com/Munimap/munimap.github.io.git
