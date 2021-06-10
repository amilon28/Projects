const searchBtn = document.getElementById("search");
const numberOfDeathEl = document.getElementById("numberOfDeath");
const container = document.querySelector(".country-container");

const getJson = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

function renderCountry(data, deathNum) {
  const html = `<div class="country">
      <img
        class="country__img"
        src="${data[0].flag}"
        alt="${data[0].name} flag"
      />
  
      <div class="country__info">
        <h3 class="country__name">${data[0].name}</h3>
        <p class="country__row"><span>Population:</span>${data[0].population.toLocaleString(
          "en-US",
          { maximumFractionDigits: 0 }
        )}</p>
        <p class="country__row"><span>Capital:</span>${data[0].capital}</p>
        <p class="country__row"><span>Deaths:</span>${deathNum}</p>
      </div>
    </div>`;

  container.insertAdjacentHTML("beforeend", html);
}

function findTargetCountries(list, numOfDeath) {
  list.forEach(([countryName, countryInfo]) => {
    if (
      countryInfo.All.deaths >= numOfDeath &&
      countryName !== "Global" &&
      countryName !== "Czechia"
    ) {
      console.log(countryName);
      (async () => {
        try {
          const countryData = await getJson(
            `https://restcountries.eu/rest/v2/name/${countryName}`
          );
          console.log(countryData);
          renderCountry(countryData, countryInfo.All.deaths);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  });
}

searchBtn.addEventListener("click", function () {
  const numOfDeath = numberOfDeathEl.value;
  const url = "https://covid-api.mmediagroup.fr/v1/cases";
  (async () => {
    const data = await getJson(url);
    const countryList = Object.entries(data);
    findTargetCountries(countryList, numOfDeath);
  })();
});
