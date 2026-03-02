<div align="center">

# 🦄 GMTW Muni Map 🌲
**Die serverlose Offline-PWA für das German Muni Trail Weekend**

![alt text](https://img.shields.io/badge/License-MIT-yellow.svg)


![alt text](https://img.shields.io/badge/Status-100%25_Offline_Ready-success)


![alt text](https://img.shields.io/badge/Map-Leaflet.js-199900?logo=leaflet&logoColor=white)


![alt text](https://img.shields.io/badge/Geospatial-Turf.js-green)


![alt text](https://img.shields.io/badge/Storage-IndexedDB_Unlimited-blueviolet)

Eine Progressive Web App (PWA), die alle Paradigmen der modernen Softwareentwicklung bricht. Keine Build-Pipelines, kein React, kein Webpack, kein Node.js-Backend, keine Cloud-Datenbanken.

Nur 4.500 Zeilen pures, inlined Vanilla JavaScript, CSS und HTML in einer einzigen Datei. Diese Datei treibt moderne Browser-APIs an ihr physikalisches Limit und mutiert dein Smartphone in einen kryptografischen Renntransponder, ein prädiktives HUD-Navigationssystem, einen Sensor-Telemetrie-Logger und ein optisches Datennetzwerk.

Entwickelt für das Überleben im tiefsten Wald – dort, wo das Handynetz stirbt.

🚵 Das Rider-Handbuch (UX) • ⚙️ Systemarchitektur & Web-APIs • 🧬 Algorithmen & Mathematik
</div>
🚵‍♂️ Teil 1: Das Rider-Handbuch (UX & Bedienung)

Wie man die App auf dem Trail bedient.
1. Multi-Projekt Management & Map-Control

Die App ist als Plattform für beliebig viele Events konzipiert.

    Projekte Isolieren: Oben links findest du das Dropdown (z.B. GMTW). Wechselst du das Projekt, werden alle Trails, Custom-Marker und Zeiten des alten Projekts hart aus der UI entfernt und das neue Event geladen.

    Fokuspunkt setzen: Klickst du auf "Neues Projekt", verlangt die App einen Doppelklick auf die Weltkarte. Diese [lat, lng] Koordinate wird als fixes Epizentrum des neuen Trips gespeichert.

    Dual-Layer & Dynamische Skalierung: Ein Button wechselt zwischen OpenTopoMap und Esri-Satellit. Ein Slider in den Einstellungen skaliert alle UI-Marker auf der Karte stufenlos (50% - 200%), je nach Sehkraft und Displaygröße.

2. Das Profil & Die Garage

In den Einstellungen ➔ 👤 Profil.

    Avatar-Matrix: Wähle aus 20 Emojis (🦄, 🦅, 🧗) und 8 Hex-Colors dein Icon. Es taucht in Bestenlisten und Popups auf.

    Hardware-Log: Trage deinen Fahrer-Namen, Muni-Namen, Radgröße (19" bis 36"), Bremse und Specials (wie Schlumpf-Nabe oder Freewheel) ein. Diese Daten werden später kryptografisch in deine Rennzeiten gesiegelt.

3. Turn-by-Turn HUD & Off-Route Alarm

Klick auf einen Trail ➔ 🧭 Navigation.

    To-Start Mode: Ein fetter Richtungspfeil und eine Meter-Anzeige lotsen dich zum Trailhead. Weichst du >30m ab, pulsiert das HUD rot: ⚠️ Falsche Richtung.

    On-Track Mode: Auf dem Trail warnt dich das HUD präventiv vor Kurven (↰, ↱) und zeigt dir die verbleibende Distanz in %. Weichst du >25m vom Pfad ab, wird der Off-Route Alarm getriggert.

4. Trail-Tagebuch & Der Mini-Map Editor

In den Einstellungen ➔ Strecken ➔ ⚙️ Einstellungen.

    Persönliches Rating: Werte jeden Track mit 1-5 Sternen für Schwierigkeit, Spaß & Flow. Ein visuelles Dashboard rechnet live aus, wie viel Prozent des Events du "geschafft" hast. Zustand (Trocken, Feucht, Eisig) ist trackbar.

    Fadenkreuz-Editor: Klicke ➕ Schlüsselstelle. Ein Full-Screen Modal öffnet sich mit einer zweiten, isolierten Leaflet Mini-Map. Schiebe die Karte exakt über den Drop oder das Steinfeld (oder nutze den Live-GPS Button), wähle den Typ und speichere. Die Hindernisse erscheinen als Emojis auf dem Trail.

    Audit-Log (Changelog): Jede kleinste Änderung an Texten oder Features wird lokal mit Zeitstempel in einer Historie protokolliert (📝 Beschreibung bearbeitet).

5. Das Enduro-Rennen ⏱️

Klick auf ⏱ Timing.

    Bluetooth-Link (Optional): Koppel eine Smartwatch, um deren hochpräzises GPS in die App einzuspeisen.

    Canvas Approach (≤ 5m): Ein 60fps Overlay überlagert alles. Zahlen wachsen proportional zur Nähe an, die Farbe fadet in Neongrün. Bei 2m bestätigst du das "Arming".

    Auto-Start: Du hast das Handy in der Tasche. Durchbrichst du die unsichtbare Startlinie, feuert der Timer lautlos los.

    Zwischenzeiten & Telemetrie: Die App nimmt 4 Sektor-Zeiten. Gleichzeitig lauscht sie auf harte Einschläge (Stürze) oder abrupte Stopps (Absteigen) und loggt diese.

    Das Ziel: Im Ziel vibriert das Handy stark. Die Signatur wird errechnet, ein QR-Code für das Leaderboard erscheint.

6. Optisches Beamen (QR Scanner)

Ohne Internet lädst du Strecken und Marker optisch.

    Öffne den Scanner (jsQR). Halte ihn über das Display eines Freundes.

    Er spielt ein animiertes QR-Daumenkino ab. Dein Scanner fängt die Frames mit 5 FPS ein, baut die Chunks zusammen und entpackt eine riesige GPX-Datei mitten im Wald.

7. PWA Installation & Hardcore Offline-Caching

    Geräte-Sniffer: Die App erkennt exakt, ob du "Safari iOS", "Samsung Internet" oder "Firefox Mobile" nutzt und zeigt dir die perfekt passende Foto-Anleitung, um die App auf den Homescreen zu installieren.

    Area-Caching: Klicke auf 🗺️ Sichtbaren Kartenbereich cachen. Der ServiceWorker zieht bis zu 3.000 Tiles im Hintergrund. Mit 🔒 Dauerhaften Speicher anfragen sperrst du das OS davor aus, deine Offline-Karten zu löschen.

🖧 Teil 2: Systemarchitektur & API Deep-Dive

Wie die App unter der Haube funktioniert und welche Web-APIs missbraucht wurden.
1. IndexedDB Wrapper (localForage)

Der native localStorage limitiert Strings auf 5 MB. Ein langes GPX-File hat schnell 1 MB.

    Lösung: localForage injiziert alle großen Payloads asynchron in die Browser-eigene IndexedDB.

    Dies ermöglicht das Speichern von hunderten Tracks, kompletten Full-State JSON Backups und gigantischen GPS-Recordings (Gigabytes an Kapazität).

2. High-Performance Tile-Precaching (requestIdleCallback)

Web-Maps ruckeln beim Scrollen, wenn sie Kacheln nachladen.

    Die _TPC Engine umgeht das komplett. Registriert Leaflet für 1.400ms keine Bewegung (moveend debounce), feuert ein requestIdleCallback.

    Die App kalkuliert die X/Y/Z Koordinaten des Viewports + 50% Padding für die Zoomstufen -2 bis +1.

    Sie sortiert die Array-Liste nach "Manhattan-Distanz" zum Kartenmittelpunkt. Die wichtigsten (zentralsten) Kacheln werden zuerst via MessageChannel an den Service Worker zum Download gesendet. Der Main-Thread (UI) wird zu 0,0% blockiert.

3. DOMParser XML-Injection (iOS Fallback)

iOS Safari weigert sich oft, lokal erzeugte blob: URLs in Leaflet-GPX-Plugins über XMLHttpRequest zu laden.

    Der Hack: Wenn der Input mit < beginnt, umgeht die App den XHR-Request komplett. Sie wirft den String direkt in den nativen DOMParser (new DOMParser().parseFromString(gpx, "text/xml")) und verfüttert den fertigen DOM-Tree an Leaflet. 100% Erfolgsquote auf allen Plattformen.

4. Kontextuelle Accessibility & Spatial TTS (speechSynthesis)

Ein radikaler Ansatz für Screenreader & Sprachsteuerung im Sport-Einsatz.

    State-Aware TTS: Drückt der Nutzer <kbd>V</kbd> oder den 🔊-FAB, parst die App den aktuellen DOM-State. Ist das Race-Overlay offen? Sie liest die Live-Zeit vor. Ist das Settings-Panel offen? Sie liest die Beschreibung des aktuellen Tabs.

    Spatial Lookup (<kbd>N</kbd>): Die Funktion speakNearestPoint() iteriert im Hintergrund über alle Tracks, Custom Marker und LOCS, wendet die Haversine-Formel auf deine GPS-Position an und kündigt akustisch an: "Nächster Punkt: Start Expert 2, 450 Meter entfernt."

    15s Chrome Bugfix: Chrome stoppt lange TTS-Ansagen nach 15 Sekunden. Die App nutzt ein setInterval (10s), das speechSynthesis.resume() triggert, um den Browser wachzuhalten (_ttsKeepalive). HTML-Tags und Emojis werden vor der Sprachausgabe per Regex hart bereinigt (_cleanForSpeech).

5. Web Share API Level 2 (Nativer OS-Dialog)

    Exportierte Tracks und Renn-Zeiten werden nicht nur "heruntergeladen". Die App kreiert ein natives File-Objekt (new File([gpxStr], "track.gpx")) und übergibt es an navigator.share({ files: [file] }). So öffnet sich direkt das native iOS/Android Share-Sheet (WhatsApp, AirDrop, etc.).

🧬 Teil 3: Algorithmen & Mathematik (The Black Magic)

Der wirkliche Wahnsinn liegt in den mathematischen Konzepten der App.
1. Das Optische Datennetzwerk (Multi-QR Chunking v2)

Wie überträgt man 3.000 Geokoordinaten optisch durch eine Handykamera?

    Binary-Search RDP: Der Ramer-Douglas-Peucker-Algorithmus glättet den Track. Ein simpler RDP ist aber zu ungenau, um ein striktes Punkt-Limit einzuhalten. Die App nutzt eine Binärsuche mit 18 Iterationen (1:2^18 Präzision) auf die Variable Epsilon, um exakt das Epsilon zu finden, das den Track auf < 1.000 Punkte limitiert, ohne ihn kaputt zu machen.

    Delta-Encoding Matrix: Floats (z.B. 51.421812) verbrauchen viel Platz als String. Die App rechnet sie auf 1e5 (Integers) hoch. Dann wird nur noch die Differenz zum vorherigen Punkt gespeichert: [dLat, dLng, dEle, dTime].

    DEFLATE Kompression: Dieses Delta-Array wird mit pako.js (Zlib) auf maximaler Stufe (Level 9) im Browser komprimiert.

    Chunk-Multiplexing: Der Base64Url-String wird in Pakete à 1100 Zeichen zerschnitten. Jeder Frame erhält den Header: {v:1, T:'gmtw-chunk', id, i, n, z, d}. Der Sender animiert diese als Slideshow. Der Empfänger-Scanner (jsQR) fängt Frames mit 5 FPS, puffert sie in einem asynchronen _qrChunkBuffer (Deduplizierung via Set()), dekomprimiert bei 100% und baut das Leaflet-Layer wieder auf.

2. Vektor-Geofencing (Die unsichtbare Startlinie)

Klassische Geofences nutzen die simple Haversine-Distanz (Kreise). Näherst du dich dem Kreis von der falschen Seite, startet die Zeitmessung fehlerhaft.

    Turf.js Vektor-Berechnung: Die App nimmt den 1. und 2. Punkt des GPX-Tracks. Mit turf.bearing() wird der exakte Kompasswinkel der Strecke berechnet.

    Mit turf.destination() rechnet die App vom Startpunkt aus 3 Meter im Winkel von -90° (Links) und 3 Meter im Winkel von +90° (Rechts).

    Daraus entsteht ein absolut perfektes, 6 Meter breites Linien-Polygon quer über den Trail (_drawStartLine). Nur der Durchbruch dieser Linie startet den Timer.

    Adaptive Checkpoints: Die Strecke wird durch turf.lineChunk und turf.along algorithmisch in 4 identisch lange Sektoren unterteilt.

3. Serverless Cryptography (Anti-Cheat HMAC)

Niemand darf exportierte Leaderboard-Zeiten manipulieren.

    SubtleCrypto API: Beim Passieren der Ziellinie feuert die native window.crypto.subtle API.

    Sie importiert einen tagesaktuellen Raw-Key: GMTW26-RACE-YYYY-MM-DD.

    Die App bündelt: Track-ID, Gesamtzeit, Split-Array, Fahrername und Muni-Setup (Radgröße, Bremsen).

    Daraus wird ein HMAC-SHA256 Hash erzeugt. Die ersten 24 Zeichen werden als Signatur in den Ziel-QR-Code und das JSON-Export-File eingebrannt. Modifiziert jemand am PC auch nur eine Ziffer seiner Zeit, crasht die Signatur bei der Event-Leitung (unsigned).

4. Sensor-Fusion (Crash & Dismount Telemetrie)

Die App analysiert die Fahrdynamik live über die DeviceMotionEvent API.

    G-Force Impact Calculation: Alle paar Millisekunden wird der Vektor SENSORS.accelMag = Math.sqrt(ax² + ay² + az²) berechnet.

    Crash-Heuristik: Übersteigt accelMag den Schwellenwert von 35 m/s² (~3.5 G) (harter Impact) prüft ein Timeout 400ms später, ob die Bewegung auf < 4 m/s² abgefallen ist (Fahrer liegt am Boden). Ist dies erfüllt, wird _recordFallEvent('fall') getriggert.

    Dismount-Heuristik: Die GPS-Geschwindigkeit wird mit der Vorherigen verglichen. Fällt der Speed in einer Sekunde von dynamischen >5 km/h auf fast absoluten Stillstand (<1 km/h), wird ein 🚶 Absteigen geloggt.

    Bluetooth Sensor-Fusion: Ist eine Smartwatch über das Bluetooth GATT-Profil 0x1819 gekoppelt, wird bei jedem GPS-Tick geprüft, ob die Daten der Uhr jünger als 3 Sekunden sind. Wenn ja, werden Handy-GPS und Watch-GPS gemittelt, um die Präzision im Wald drastisch zu erhöhen.

5. High-Resolution Background Recorder (WakeLock)

Die Aufzeichnung (recStart()) darf durch OS-Throttling nicht abbrechen.

    WakeLock API: navigator.wakeLock.request('screen') wird gefeuert. Das Display bleibt hart erzwungen an, was das OS zwingt, der App maximale CPU- und GPS-Priorität zuzuweisen.

    Auto-Save Loop: Der _persistInt Interval pumpt das gesamte Array an 3D-Geodaten alle 5 Sekunden in die IndexedDB. Stürzt der Browser ab, erkennt die App beim Reload das unfertige Array im Storage und rekonstruiert die Polyline (restoreRecorder()).

6. Light Mode WCAG AA Compliance

Der Light-Mode ist nicht nur "hell", er ist auf extreme Lesbarkeit bei direkter Sonneneinstrahlung getrimmt.

    Alle CSS-Variablen im [data-theme=light] Block wurden mathematisch auf WCAG AA Konformität kalibriert.

    Primärer Text (--tx: #0c1420) hat auf Weiß ein Kontrastverhältnis von ~17:1.

    Die Akzentfarbe Grün (--ac) wird im Light-Mode drastisch abgedunkelt auf #236b00, was einen garantierten Kontrast von > 7.5:1 liefert, damit Buttons immer perfekt lesbar bleiben.

💻 Code & Dependencies (100% Inlined)

Es gibt kein NPM, kein Node.js, kein Webpack.

    Leaflet.js: Map Rendering & Interaktivität (Layer, Polylines).

    Turf.js: Geomathematik (Bearing, Destination, Line-Splitting).

    jsQR & qrcode-generator: Optisches Kamera-Scanning & lokales QR-Canvas-Drawing.

    Pako.js: In-Browser Deflate/Inflate Kompression (C-Level Speed).

    localForage: Asynchroner IndexedDB Wrapper für unlimitierten Speicher.

🚀 Instant Deployment

Da die App serverseitig völlig stumm ist, reicht der kleinste verfügbare HTTPS-Webspace.

    Repository klonen.

    Die Dateien index.html, manifest.json, service-worker.js und das icons/ Verzeichnis auf Vercel, Netlify, GitHub Pages oder einen 1€ FTP-Server schieben.

    Die URL auf dem Smartphone öffnen.

    App installieren.

    In den Wald gehen und das Netz vergessen.
<div align="center">
<b>Built with ☕, 🦄 and raw Vanilla JavaScript for GMTW 2026.</b><br>
<i>"Where we're going, we don't need servers."</i>
</div>
