// OpenWeather API Key and Endpoint
const APIkey = "44472f610c3a2c4bed80fd76e027b9cd"; //API key
const city = "London"; // City name
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

// Fetch API
function fetchWeather() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    })
    .then((data) => {
      const weatherDiv = document.getElementById("fetch-weather");
      weatherDiv.innerHTML = `
                <p>City: ${data.name}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
    })
    .catch((error) => {
      document.getElementById(
        "fetch-weather"
      ).innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

// XMLHttpRequest
function xhrWeather() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const weatherDiv = document.getElementById("xhr-weather");
      weatherDiv.innerHTML = `
                <p>City: ${data.name}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
    } else {
      document.getElementById(
        "xhr-weather"
      ).innerHTML = `<p>Error: Failed to fetch weather data</p>`;
    }
  };
  xhr.onerror = function () {
    document.getElementById(
      "xhr-weather"
    ).innerHTML = `<p>Error: Network Error</p>`;
  };
  xhr.send();
}

// Call both functions
fetchWeather();
xhrWeather();
