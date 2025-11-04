"use strict";

import "./style.css";
import "./base.css";
import "./toolbar.css";
import "./responsive.css";
// import "./img/logo.svg";

const elements = {
  year: document.querySelector(".year"),
  month: document.querySelector(".month"),
  numberDay: document.querySelector(".number-day"),
  day: document.querySelector(".day"),
  minutes: document.querySelector(".minutes"),
  hours: document.querySelector(".hours"),
  input: document.getElementById("site-search"),
  inputTablet: document.getElementById("site-search-tablet"),
  inputSearch: document.querySelector(".search-icon"),
  locationTitle: document.querySelector(".city"),
  tempDegree: document.querySelector(".num-degree"),
  tempMax: document.querySelector(".temp-max"),
  tempMin: document.querySelector(".temp-min"),
  humidity: document.querySelector(".humadity"),
  cloudy: document.querySelector(".cloudy"),
  wind: document.querySelector(".wind"),
  descriptionWeather: document.querySelector(".content-title"),
  weatherIcon: document.querySelector(".weather-icon"),
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const updateDateTime = () => {
  const now = new Date();
  elements.hours.textContent = now.getHours();
  elements.minutes.textContent = now.getMinutes();
  elements.numberDay.textContent = now.getDate();
  elements.day.textContent = days[now.getDay()];
  elements.month.textContent = months[now.getMonth()].slice(0, 3);
  elements.year.textContent = now.getFullYear().toString().slice(-2);
};

const fetchJSON = (url) => fetch(url).then((response) => response.json());

const getSearchLocation = async (value) => {
  try {
    const data = await fetchJSON(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${process.env.API_KEY}`
    );
    const location = data[0];
    elements.locationTitle.textContent = location.name;
    getCurrentWeather(location.lat, location.lon);
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};

const getCurrentWeather = async (lat, lon) => {
  try {
    const data = await fetchJSON(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
    );
    elements.tempDegree.textContent = Math.round(data.main.temp);
    elements.tempMax.textContent = Math.round(data.main.temp_max);
    elements.tempMin.textContent = Math.round(data.main.temp_min);
    elements.humidity.textContent = data.main.humidity;
    elements.cloudy.textContent = data.clouds.all;
    elements.wind.textContent = data.wind.speed;
    elements.descriptionWeather.textContent = data.weather[0].description;
    elements.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};

elements.input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchLocationInput = elements.input.value;
    elements.input.value = "";
    getSearchLocation(searchLocationInput);
  }
});

elements.inputSearch.addEventListener("click", () => {
  const searchLocationInput = elements.input.value;
  elements.input.value = "";
  getSearchLocation(searchLocationInput);
});

elements.inputTablet.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchLocationInput = elements.inputTablet.value;
    elements.inputTablet.value = "";
    getSearchLocation(searchLocationInput);
  }
});

// elements.inputSearch.addEventListener("click", () => {
//   const searchLocationInput = elements.inputTablet.value;
//   elements.inputTablet.value = "";
//   getSearchLocation(searchLocationInput);
// });

updateDateTime();
