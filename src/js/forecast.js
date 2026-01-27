"use strict";

// Import axios
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";

// Export forecast
export const forecast = function forecast(api_key, city) {
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api_key}`;
  return axios.get(urlForecast);
};
