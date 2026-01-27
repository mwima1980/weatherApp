"use strict";

// Import file
import { API_KEY } from "./config.js";
import { search_city } from "./search_city.js";
import { forecast } from "./forecast.js";

console.log(API_KEY);
// Variable
const el = {
  searchButton: document.getElementById("search-button"),
  searchCity: document.getElementById("search-city"),
  forecastDayWeekdays: document.querySelectorAll(".forecast__day-weekday"),
  weatherCity: document.getElementById("weather-city"),
  currentTemp: document.getElementById("current-temp"),
  feelsLike: document.getElementById("feels-like"),
  weatherHumidity: document.getElementById("weather-humidity"),
  windSpeed: document.getElementById("wind-speed"),
  forecastTempsMax: document.querySelectorAll(".forecast__temp--max"),
  forecastTempsMin: document.querySelectorAll(".forecast__temp--min"),
  forecastIconElement: document.querySelectorAll(".forecast__day-icon img"),
  sunriseElement: document.getElementById("sunrise"),
  sunsetElement: document.getElementById("sunset"),
  currentWeatherIcon: document.getElementById("current-weather-icon"),
  tempDescription: document.getElementById("temp-description"),
};

//Icons Weather Object
const WEATHER_ICON = {
  "01d": "/src/assets/images/icons/day/clear_sky_d.svg",
  "02d": "/src/assets/images/icons/day/few_clouds_d.svg",
  "03d": "/src/assets/images/icons/day/scattered_clouds_d.svg",
  "04d": "/src/assets/images/icons/day/broken_clouds_d.svg",
  "09d": "/src/assets/images/icons/day/shower_rain_d.svg",
  "10d": "/src/assets/images/icons/day/rain_d.svg",
  "11d": "/src/assets/images/icons/day/thunderstorm_d.svg",
  "13d": "/src/assets/images/icons/day/snow_d.svg",
  "50d": "/src/assets/images/icons/day/mist_d.svg",
  "01n": "/src/assets/images/icons/night/clear_sky_n.svg",
  "02n": "/src/assets/images/icons/night/few_clouds_n.svg",
  "03n": "/src/assets/images/icons/night/scattered_clouds_n.svg",
  "04n": "/src/assets/images/icons/night/broken_clouds_n.svg",
  "09n": "/src/assets/images/icons/night/shower_rain_n.svg",
  "10n": "/src/assets/images/icons/night/rain_n.svg",
  "11n": "/src/assets/images/icons/night/thunderstorm_n.svg",
  "13n": "/src/assets/images/icons/night/snow_n.svg",
  "50n": "/src/assets/images/icons/night/mist_n.svg",
};

// DocumentLoaded
document.addEventListener("DOMContentLoaded", () => {
  el.searchButton.addEventListener("click", handleSearchCity);
});

// Function handleSearchCity
function handleSearchCity(event) {
  event.preventDefault();

  search_city(API_KEY, el.searchCity.value.trim())
    .then(function (response) {
      const icon = response.data["weather"][0]["icon"];
      el.weatherCity.textContent = response.data.name;

      el.currentTemp.textContent = `${Math.round(response.data.main.temp)} °C`;

      el.feelsLike.textContent = `${Math.round(response.data.main.feels_like) + " °C"}`;

      el.weatherHumidity.textContent = `${response.data.main.humidity + " %"}`;

      el.windSpeed.innerText = "";
      el.windSpeed.textContent = `${Math.round(response.data.wind.speed) + " m/s"}`;

      el.currentWeatherIcon.src = WEATHER_ICON[icon];

      el.tempDescription.textContent = response.data["weather"][0]["main"];

      sunriseSunset(response.data.sys);
    })
    .catch(function (error) {
      alert("Stadt nicht gefunden!");
      return;
    });

  forecast(API_KEY, el.searchCity.value.trim())
    .then((res) => res.data.list)
    .then((list) => {
      console.log(list);
      const days = {};

      list.forEach((item) => {
        const day = item.dt_txt.slice(0, 10);

        // Min / Max
        if (!days[day]) {
          days[day] = {
            min: item.main.temp,
            max: item.main.temp,
            icons: item.weather[0]["icon"],
          };
        } else {
          days[day].min = Math.min(days[day].min, item.main.temp);
          days[day].max = Math.max(days[day].max, item.main.temp);
          days[day].icons = item.weather[0]["icon"];
        }
      });

      const tempForecast = {
        tempMin: [],
        tempMax: [],
      };
      const forecastIcon = {
        icons: [],
      };
      Object.values(days)
        .slice(1, 5)
        .forEach((d) => {
          tempForecast.tempMin.push(d.min);
          tempForecast.tempMax.push(d.max);
          forecastIcon.icons.push(d.icons);
        });

      for (let i = 0; i < el.forecastTempsMax.length; i++) {
        el.forecastTempsMax[i].textContent =
          Math.round(tempForecast.tempMax[i]) + "°C /";
        el.forecastTempsMin[i].textContent =
          Math.round(tempForecast.tempMin[i]) + "°C";
      }
      for (let i = 0; i < el.forecastIconElement.length; i++) {
        el.forecastIconElement[i].src = WEATHER_ICON[forecastIcon.icons[i]];
      }
      el.searchCity.value = "";
    })
    .catch(function (error) {
      alert("Forecast konnte nicht geladen werden!");
      return;
    });

  forecastDay();
}

// Forecast Day
function forecastDay() {
  const heute = new Date();

  for (let i = 0; i < el.forecastDayWeekdays.length; i++) {
    const d = new Date(heute);
    d.setDate(heute.getDate() + i + 1);

    el.forecastDayWeekdays[i].textContent = d.toLocaleDateString("de-DE", {
      weekday: "short",
    });
  }
}
// Sunrise + Sunset
function sunriseSunset(dataSys) {
  const todaySunrise = new Date(dataSys.sunrise * 1000);
  const sunrise = todaySunrise.toLocaleString("de-DE");

  el.sunriseElement.textContent = sunrise.slice(
    sunrise.indexOf(",") + 2,
    sunrise.indexOf(",") + 7,
  );

  const todaySunset = new Date(dataSys.sunset * 1000);
  const sunset = todaySunset.toLocaleString("de-DE");

  el.sunsetElement.textContent = sunset.slice(
    sunset.indexOf(",") + 2,
    sunset.indexOf(",") + 7,
  );
}
