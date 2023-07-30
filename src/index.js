import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    console.log(response);
    if (this.status === 200) {
      printElements(response, city);
    } else {
      printError(this, response, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, city) {
  document.querySelector('#showResponse').innerText = `The weather in ${city} is ${apiResponse.weather[0].description}.
  The humidity is ${apiResponse.main.humidity}%.
  The temperature in Kelvins is ${apiResponse.main.temp} degrees.
  The temperature in Fahrenheit is ${Math.round(1.8 * (apiResponse.main.temp - 273.15) + 32)} degrees.
  The atmospheric pressure is ${apiResponse.main.pressure}
  The wind speed is ${apiResponse.wind.speed}
  ${city} is in the ${apiResponse.sys.country}
  `
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city); 
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
