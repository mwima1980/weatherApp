"use strict";

// Import Axios
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";

// Export Axios
export const search_city = function searchCity(api_key, city) {
  console.log(api_key);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
  return axios.get(url);
};
