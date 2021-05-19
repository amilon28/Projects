"use strict";

// Select Elements

const weatherContainer = document.querySelector(".weather");
console.log(weatherContainer);
// App data
const weather = {
  temperature: {
    unit: "celsius",
  },
};

const getData = function (city) {
  const key = "fba637befb9cd34965a5d8e1e42d58c6";
  const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  if (weatherContainer) {
    weatherContainer.innerHTML = `<div class='loading'>Loading...</div>`;
  }
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        weatherContainer.innerHTML = `<div class='error'>${data.message}</div>`;
      }
      const html = ` 
      <div class="weather-city">
      <h3>${data.name}</h3>
    </div>
    <div class="weather_info">
      <div class="weather_info--icon"><img src="icons/${
        data.weather[0].icon
      }.png" alt="" /></div>
      <div class="weather_info--value">${Math.floor(
        data.main.temp - 273.5
      )} °C</div>
      <div class="weather_info--description">${
        data.weather[0].description
      }</div>
    </div>
    `;
      console.log(html);

      console.log("test1", weatherContainer, html);
      if (weatherContainer) {
        weatherContainer.innerHTML = html;
      }
      console.log(data);
    })
    .catch((err) => console.log(err.message));
};

const city = window.location.search.split("=")[1];
getData(city);
