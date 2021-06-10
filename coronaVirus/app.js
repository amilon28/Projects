"use strict";

//select Elements
const numberOfConfirmed = document.querySelector(".number-confirmed");
const numberOfRecovered = document.querySelector(".number-recovered");
const numberOfDeath = document.querySelector(".number-death");
const numberOfVaccin = document.querySelector(".number-vaccin");
const countryFlag = document.querySelector(".flag");
const deathRate = document.querySelector(".number-mortal");
const vaccinRate = document.querySelector(".number-vaccin-rate");
const loadingImg = document.querySelector(".loading");
const card = document.querySelector(".card");
const flag = document.querySelector(".country-flag");

setTimeout(() => {
  loadingImg.style.display = "none";
  card.style.opacity = 1;
  flag.style.opacity = 1;
}, 3500);
// return country flag
const getFlag = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      countryFlag.src = data[0].flag;
    });
};

// for number of vaccinate people and vaccinated rate
const vaccin = (country) => {
  fetch("https://covid-api.mmediagroup.fr/v1/vaccines")
    .then((res) => res.json())
    .then((data) => {
      const countryLists = Object.entries(data);
      countryLists.forEach(([countryName, countryInfo]) => {
        if (country === countryName) {
          numberOfVaccin.innerText = countryInfo.All.people_vaccinated;
          vaccinRate.innerText =
            (
              (countryInfo.All.people_vaccinated / countryInfo.All.population) *
              100
            ).toFixed(2) + " %";
        } else {
          return;
        }
      });
    });
};

// death rate
const mortalRate = (c) => {
  fetch("https://covid-api.mmediagroup.fr/v1/cases")
    .then((res) => res.json())
    .then((data) => {
      const countryList = Object.entries(data);
      countryList.forEach(([countryName, countryInfo]) => {
        if (c === countryName) {
          deathRate.innerText =
            (
              (countryInfo.All.deaths / countryInfo.All.population) *
              100
            ).toFixed(4) + " %";
        }
      });
    });
};

const getInfo = function (country) {
  fetch(`https://covid-19-data.p.rapidapi.com/country?name=${country}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "cac15a225bmshd823d9b87677022p1b06b9jsn288fef545a57",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      getFlag(data[0].country);
      numberOfConfirmed.innerText = data[0].confirmed;
      numberOfRecovered.innerText = data[0].recovered;
      numberOfDeath.innerText = data[0].deaths;
      mortalRate(data[0].country);
      vaccin(data[0].country);
    })
    .catch((err) => {
      console.error(err);
    });
  // ---------------
};

getInfo(localStorage.getItem("country"));
