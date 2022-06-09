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

let todayDay = document.querySelector(".today");
todayDay.innerHTML = `${day}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
          <h6 class="weather-forecast-date">${formatDay(forecastDay.dt)}</h6>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="forecastIcon" class="typesOfWeatherWeek">
          <p class="card-title" class="weekDegree">${Math.round(
            forecastDay.temp.day
          )}°</p>
      </div>
  `;

      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}

function getForecast(coordinates) {
  console.log(coordinates);
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "59f40513e09ff0b79a28ee79de3b43e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#current-city");

  let mainCity = document.querySelector(".bigCity");
  mainCity.innerHTML = `${searchInput.value}`;
  console.log(searchInput.value);

  let apiKey = "59f40513e09ff0b79a28ee79de3b43e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showTemperature);

  celsiusConvert.classList.add("active");
  fahrenheitConvert.classList.remove("active");
}

function primaryLocation(position) {
  let apiKey = "59f40513e09ff0b79a28ee79de3b43e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(position);
  axios.get(apiUrl).then(showTemperature);
}

function primary(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(primaryLocation);
}
let currentLocation = document.querySelector(".pin");
currentLocation.addEventListener("click", primary);

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

  let humidity = response.data.main.humidity;
  humidity = Math.round(response.data.main.humidity);
  let cityHumidity = document.querySelector("#local-hum");
  cityHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = response.data.wind.speed;
  wind = Math.round(response.data.wind.speed);
  let cityWind = document.querySelector("#local-wind");
  cityWind.innerHTML = `Wind: ${wind}km/h`;

  let mainCity = document.querySelector(".bigCity");
  mainCity.innerHTML = response.data.name;

  let mainCountry = document.querySelector("#country");
  mainCountry.innerHTML = response.data.sys.country;

  let icon = response.data.weather[0].icon;
  let weatherIcon = document.querySelector("#currentIcon");
  weatherIcon.innerHTML = `${icon}`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
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
  celsiusConvert.classList.add("active");
  fahrenheitConvert.classList.remove("active");
  celsiusTemperature = Math.round(celsiusTemperature);
  cityCelsius.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let fahrenheitConvert = document.querySelector("#fahrenheit-link");
fahrenheitConvert.addEventListener("click", showFahrenheit);

let celsiusConvert = document.querySelector("#celsius-link");
celsiusConvert.addEventListener("click", showCelsius);
