const apiKey = "03bc83edc5489f933696c7e4a52c208a";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const toggle = document.getElementById("toggle");

let isCelsius = true;

searchBtn.addEventListener("click", fetchWeather);
toggle.addEventListener("click", toggleUnit);

function fetchWeather() {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    weatherInfo.textContent = "Please enter a city name.";
    return;
  }

  const units = isCelsius ? "metric" : "imperial";
  const unitSymbol = isCelsius ? "°C" : "°F";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      weatherInfo.innerHTML = `
        City: ${data.name}<br>
        Temperature: ${data.main.temp}${unitSymbol}<br>
        Description: ${data.weather[0].description}<br>
        Humidity: ${data.main.humidity}%<br>
        Wind Speed: ${data.wind.speed}${units === "metric" ? " m/s" : " mph"}<br>
      `;
    })
    .catch(err => {
      weatherInfo.textContent = err.message;
    });
}

function toggleUnit() {
  isCelsius = !isCelsius;
  toggle.textContent = isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius";
  fetchWeather();
}
