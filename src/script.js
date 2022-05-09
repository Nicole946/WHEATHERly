let now = new Date();

let h1 = document.querySelector(".bigTime");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? "0" + minutes : minutes;

h1.innerHTML = `${hours}:${minutes}${ampm}`;

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];
let day = days[now.getDay()];
let year = now.getFullYear();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let currentDate = document.getElementById("fullDate");
currentDate.innerHTML = `${day}, ${date} ${month} ${year}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#current-city");
  let countryInput = prompt("What is the country?");

  let mainCity = document.querySelector(".bigCity");
  mainCity.innerHTML = `${searchInput.value}`;
  console.log(searchInput.value);

  let mainCountry = document.querySelector("#country");
  mainCountry.innerHTML = `${countryInput}`;
  console.log(countryInput);

  let apiKey = "59f40513e09ff0b79a28ee79de3b43e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    console.log(response);

    let cityTemperature = document.querySelector("#mainDegree");
    cityTemperature.innerHTML = `${temperature}`;

    let weather = response.data.weather[0].main;
    console.log(weather);

    let cityWeather = document.querySelector(".typesOfWeather");
    cityWeather.innerHTML = `${weather}`;

    celsiusTemperature = response.data.main.temp;
  }

  axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector("#city");
form.addEventListener("submit", search);

function showFahrenheit(event) {
  event.preventDefault();
  let cityFahrenheit = document.querySelector("#mainDegree");
  celsiusConvert.classList.remove("active");
  fahrenheitConvert.classList.add("active");
  let tempConversion = (cityFahrenheit.innerHTML * 9) / 5 + 32;
  tempConversion = Math.round(tempConversion);
  cityFahrenheit.innerHTML = `${tempConversion}`;
}

function showCelsius(event) {
  event.preventDefault();
  let cityCelsius = document.querySelector("#mainDegree");
  celsiusTemperature = Math.round(celsiusTemperature);
  cityCelsius.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let fahrenheitConvert = document.querySelector("#fahrenheit-link");
fahrenheitConvert.addEventListener("click", showFahrenheit);

let celsiusConvert = document.querySelector("#celsius-link");
celsiusConvert.addEventListener("click", showCelsius);

search("");
//let temperatureElement = document.querySelector("mainDegree");
//temperatureElement.innerHTML = tempConversion;

// function showPosition(position) {
//   console.log(position);
// }
// function getCurrentLocation() {
//   navigator.geolocation.getCurrentPosition(showPosition);
// }

// let buttonPosition = document.querySelector(".pin");
// buttonPosition.addEventListener("click", getCurrentLocation);

// navigator.geolocation.getCurrentPosition(showPosition);
