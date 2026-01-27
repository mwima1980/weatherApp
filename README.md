# weatherApp

# Wetter App (Vanilla JS)

Eine kleine Wetter-App, die über die OpenWeather-API das **aktuelle Wetter** sowie eine **4-Tage-Vorhersage** für eine gesuchte Stadt anzeigt (inkl. Icons, Min/Max-Temperaturen, Luftfeuchtigkeit, Wind sowie Sonnenauf- und -untergang).

---

## Features

- 🔎 Suche nach Stadt (Button / Formular)
- 🌡️ Aktuelle Temperatur + „Feels like“
- 💧 Luftfeuchtigkeit
- 🌬️ Windgeschwindigkeit
- 🌅 Sonnenaufgang & Sonnenuntergang (lokal formatiert)
- 📅 Vorhersage für die nächsten 4 Tage (Min/Max + Icon)
- 🎨 Eigene Icon-Sets (Tag/Nacht) per OpenWeather `icon`-Code Mapping

---

## Tech-Stack

- HTML / CSS
- Vanilla JavaScript (ES Modules)
- OpenWeather API
- `use strict`

---

## Projektstruktur (Beispiel)

> Deine Pfade können abweichen – hier die Idee anhand deiner Imports/Assets.

```
weatherApp/
└─ src/
   ├─ js/
   │  ├─ app.js
   │  ├─ config.js        # API_KEY Export
   │  ├─ search_city.js   # aktuelles Wetter
   │  └─ forecast.js      # Forecast (5 Tage / 3h)
   ├─ css/
   │  └─ style.css
   └─ assets/
      └─ images/
         ├─ icons/
         │  ├─ day/
         │  └─ night/
         └─ favicons/
```

---

## Voraussetzungen

- Browser mit ES-Module Support (aktuelle Chrome/Edge/Firefox)
- Ein OpenWeather API Key

---

## Setup

### 1) API Key hinterlegen

Lege/öffne die Datei:

`/weatherApp/src/js/config.js`

Inhalt (Beispiel):

```js
export const API_KEY = "DEIN_OPENWEATHER_API_KEY";
```

> **Wichtig:** API Keys niemals in öffentlichen Repos committen. Nutze `.gitignore` oder Umgebungsvariablen/Build-Setup, wenn du es veröffentlichst.

---

### 2) App starten

Du kannst die App entweder mit einem kleinen lokalen Server starten (empfohlen), oder (je nach Browser-Setup) direkt über die Datei öffnen.

**Empfohlen: lokaler Server**

Mit VS Code:

- Extension **Live Server** installieren
- `index.html` öffnen → „Go Live“

Alternativ über Node:

```bash
npx serve .
# oder
npx http-server .
```

Dann im Browser die `index.html` bzw. den entsprechenden Pfad öffnen.

---

## Nutzung

1. Stadtname in das Suchfeld eingeben (z. B. `Berlin`)
2. Button **Suchen** klicken
3. Die App lädt:
   - aktuelles Wetter (City, Temperatur, Feels like, Humidity, Wind, Icon, Beschreibung)
   - Forecast für die nächsten 4 Tage (Min/Max + Icon)
   - Sonnenauf- und -untergang

---

## Wie es funktioniert (kurz)

### Aktuelles Wetter

- `search_city(API_KEY, city)` liefert die aktuellen Daten.
- Wichtige Werte werden ins DOM geschrieben.
- Das passende Icon wird über `WEATHER_ICON[icon]` gesetzt.
- Sunrise/Sunset kommen als Unix-Timestamp (Sekunden) und werden in lokale Zeit umgewandelt.

### Forecast (Min/Max)

- `forecast(API_KEY, city)` liefert `list` (3-Stunden-Intervalle).
- Die App gruppiert nach Datum (`dt_txt.slice(0, 10)`).
- Pro Tag wird `min` und `max` berechnet.
- Es werden **4 Tage** angezeigt (`Object.values(days).slice(1, 5)`).

---

## Hinweise / mögliche Verbesserungen

- **Enter-Taste im Input**: Aktuell wird auf den Button-Klick gehört. Optional könntest du auch das `submit`-Event des Formulars nutzen.
- **Wind-Einheit**: OpenWeather liefert standardmäßig m/s – im UI steht teils km/h. (Wenn du km/h willst: `m/s * 3.6`).
- **Forecast-Icon Logik**: Pro Tag wird aktuell das zuletzt gelesene Icon überschrieben. Optional: z. B. Icon zur Mittagszeit (12:00) wählen oder häufigstes Icon des Tages.
- **Fehlerhandling**: Statt `alert()` könntest du eine Meldung im UI anzeigen.

---

## Lizenz

Dieses Projekt ist ein Lernprojekt. Nutze es frei für eigene Übungen/Portfolio.
