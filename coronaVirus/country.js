const countryName = document.getElementById("country");
const searchBtn = document.querySelector(".search-btn");

document.querySelector(".search-btn").addEventListener("click", function () {
  if (!countryName.value) {
    alert("Select a country first!");
    searchBtn.href = "country.html";
  }
  localStorage.setItem("country", document.getElementById("country").value);
});
