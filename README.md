# 🌲 MuniMap / GMTW Trail Map

<div align="center">

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-success?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Offline First](https://img.shields.io/badge/Offline-100%25-blue?style=for-the-badge&logo=signal&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
[![License](https://img.shields.io/badge/License-Apache%202.0-red?style=for-the-badge)](LICENSE)
[![Privacy](https://img.shields.io/badge/Privacy-Local%20Only-green?style=for-the-badge&logo=privacy&logoColor=white)](https://github.com/munimap)

**Offline-Trail-Karte für das GMTW Event in Hohensyburg/Herdecke.**
*Kein Server. Kein Tracking. Keine Datenverbindung nötig. Jaman!*

[Live Demo ansehen](https://munimap.github.io/) · [Fehler melden](https://github.com/munimap/issues) · [Feature anfragen](https://github.com/munimap/issues)

</div>

---

## 🧐 Über das Projekt

**MuniMap** ist eine spezialisierte **Progressive Web App (PWA)**, die für den Einsatz in Gebieten mit schlechter Netzabdeckung entwickelt wurde. Im Gegensatz zu herkömmlichen Karten-Apps, die ständig Daten nachladen, setzt MuniMap auf eine aggressive **Offline-First-Strategie**.

Die App wurde spezifisch für das **GMTW (German Muni and Trial Weekend)** konfiguriert, ist aber technisch als universeller GPX-Viewer und Tracker einsetzbar. Sie läuft vollständig client-seitig im Browser deines Smartphones.

### ✨ Key Features

| Funktion | Beschreibung |
| :--- | :--- |
| **🗺️ Smart Mapping** | Interaktive Karte mit automatischer Ausrichtung (Kompass) und Live-GPS. |
| **📡 100% Offline** | Intelligentes Caching von Kartenkacheln und GPX-Daten. Flugmodus-ready. |
| **🔍 Filter-System** | Filtere Strecken nach Kategorie: `Beginner`, `Mittel`, `Expert`, `Logistik`. |
| **📊 Live-Stats** | Zeigt Höhenmeter, Distanz, Pace und Herzfrequenz (wenn im GPX vorhanden). |
| **🌓 Adaptive UI** | Automatische Erkennung von **Dark Mode** und Light Mode basierend auf Systemeinstellungen. |
| **⚡ QR-Air-Gap** | Teile Strecken und Positionen offline via QR-Code (Device-to-Device). |

---

## 📱 Bedienungsanleitung (User Guide)

Diese App muss nicht über einen App Store installiert werden. Sie lebt im Browser, fühlt sich aber an wie eine native App.

### 1. Installation & Ersteinrichtung
Da es sich um eine PWA handelt, speicherst du sie direkt vom Browser auf deinen Homescreen:

*   **Android (Chrome):** Menü `⋮` → "App installieren" oder "Zum Startbildschirm".
*   **iOS (Safari):** "Teilen"-Button `⎋` → "Zum Home-Bildschirm".

> **Wichtig:** Öffne die App einmal mit Internetverbindung und zoome in das Zielgebiet. Der Service Worker lädt automatisch alle benötigten Ressourcen und Kartenkacheln herunter. Danach bist du "Autark".

### 2. Die Benutzeroberfläche

#### **Der "Filter Bar" (Oben)**
Hier behältst du den Überblick bei vielen Tracks.
*   <kbd>ALLE</kbd> Zeigt alle verfügbaren Routen.
*   <kbd>BEGINNER</kbd> / <kbd>MITTEL</kbd> / <kbd>EXPERT</kbd> Filtert die Routen nach Schwierigkeitsgrad.
*   <kbd>LOGISTIK</kbd> Zeigt wichtige POIs (Points of Interest) wie Verpflegungsstationen oder Erste Hilfe.

#### **Karten-Steuerung & GPS**
*   **Zentrieren:** Tippe auf den <kbd>⌖</kbd> Button (unten rechts), um auf deine Position zu springen.
*   **Kompass-Modus:** Ein zweiter Klick auf <kbd>⌖</kbd> aktiviert den Kompass-Modus. Die Karte dreht sich nun mit dir.

#### **Strecken-Details (Bottom Sheet)**
Tippe auf eine beliebige Strecke auf der Karte, um das **Info-Sheet** zu öffnen.
*   **Höhenprofil:** Sieh dir die Steigungen und Gefälle an.
*   **Statistik:** Distanz, geschätzte Dauer und technische Daten.
*   **Aktionen:** Starte die Navigation oder teile die Strecke.

### 3. Offline-Datenaustausch (QR)
Wie teilt man eine Route mitten im Wald ohne Empfang?
1.  Öffne die gewünschte Strecke.
2.  Tippe auf **"Teilen"** (QR-Icon).
3.  Dein Partner öffnet MuniMap und tippt auf den **Scanner** (Kamera-Icon).
4.  Die Strecke wird sofort übertragen – **ohne Internet, Bluetooth oder WLAN**.

---

## 🛠️ Technische Dokumentation

Dieser Abschnitt ist für Entwickler, die den Code verstehen oder forken möchten.

### 🏗️ Tech Stack

Wir nutzen einen "Vanilla+" Ansatz ohne schwere Frameworks (wie React oder Angular), um maximale Performance auf mobilen Geräten zu garantieren.

*   **Core:** HTML5, CSS3 (Variables), Modern ES6+ JavaScript.
*   **Maps:** [Leaflet 1.9.4](https://leafletjs.com/) (Rendering).
*   **Geo-Logic:** [Turf.js 7](https://turfjs.org/) (Client-side Geofencing & Calc).
*   **Storage:** [localForage 1.10](https://localforage.github.io/localForage/) (IndexedDB Wrapper).
*   **QR-Engine:** [jsQR](https://github.com/cozmo/jsQR) (Scanner) & [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (Generator).

### 🧠 Service Worker Strategie

Der Herzschlag der App ist der `service-worker.js`. Er implementiert komplexe Caching-Logiken, um das Offline-Erlebnis zu sichern.

<details>
<summary><b>🔧 Klick für Details zur Caching-Logik</b></summary>

#### 1. App Shell (Cache-First)
HTML, CSS, JS und Icons werden beim `install`-Event sofort gecacht.
*   **Update:** Nutzt `Stale-While-Revalidate` für Fonts, damit die UI immer sofort da ist, aber im Hintergrund aktuell bleibt.

#### 2. Tile Caching (Smart FIFO)
Kartenkacheln (Tiles) sind speicherintensiv. Wir nutzen eine **Network-First mit Fallback** Strategie inkl. Garbage Collection:
*   **Online:** Lädt Tile vom Server → speichert Kopie im Cache (`TILECACHE`).
*   **Offline:** Lädt Tile aus Cache. Falls nicht vorhanden: Zeigt transparentes Pixel (damit die Map nicht "bricht").
*   **Rotation:** Ein integrierter `trimCache()` Algorithmus (FIFO) begrenzt den Cache auf **2000 Kacheln**, um den Handyspeicher nicht vollzumüllen.

```javascript
// Beispiel: FIFO Rotation im Service Worker
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    // Löscht die ältesten Einträge überschüssiger Tiles
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map(k => cache.delete(k)));
  }
}
