"use strict";

const year = document.querySelector(".year"),
  month = document.querySelector(".month"),
  numberDay = document.querySelector(".number-day"),
  day = document.querySelector(".day"),
  minutes = document.querySelector(".minutes"),
  hours = document.querySelector(".hours");

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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

let now = new Date();

hours.textContent = now.getHours();
minutes.textContent = now.getMinutes();
day.textContent = days[now.getDay()];
month.textContent = months[now.getMonth()].slice(0, 3);
year.textContent = now.getFullYear().toString().slice(-2);
