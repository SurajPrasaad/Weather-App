# Weather Dashboard

A React-based Weather Dashboard application that allows users to search for current weather and 5-day forecasts of any city using the Open-Meteo API. The app provides a clean and responsive interface with features such as unit switching (Celsius/Fahrenheit), search history, and error handling.

---

## 🚀 Features

### ✅ Core Features
- **City Search Functionality**
  - Search for weather by city name.
  - Displays error messages if city is not found or in case of network issues.
  - Maintains search history in local storage.

- **Current Weather Display**
  - Shows city name, current temperature, weather condition, wind speed, humidity, and an icon representing the weather.

- **5-Day Weather Forecast**
  - Displays forecasted temperature, weather condition, date, and an icon for the next 5 days.
  - Allows switching between Celsius and Fahrenheit units.

- **Responsive UI**
  - Mobile-friendly and clean design.
  - Loading spinner while fetching data.

---

## 🌐 API Integration

- Open-Meteo API is used to fetch weather data and geolocation.
- API Documentation: [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)

Example API endpoints used:
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={city}`
- Weather Data: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=...`

---

## 🎨 Technologies Used

- React (with functional components & hooks)
- CSS (with basic responsive styling)
- Local Storage (for search history)

---

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SurajPrasaad/Weather-App.git
cd weather-app
```

### 2. Install Dependencies
```
npm install
```

### 3. Run the App
```
npm run dev
```