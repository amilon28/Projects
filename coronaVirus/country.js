document.querySelector(".search-btn").addEventListener("click", function () {
  localStorage.setItem("country", document.getElementById("country").value);
});
