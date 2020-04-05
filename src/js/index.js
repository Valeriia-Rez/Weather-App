import "../scss/main.scss";
import "regenerator-runtime/runtime";
import Weather from "./model/getWeatherByCityName";
import geoLocator from "./model/getWeatherByLocation";
import requestedCity from "./model/getRequestedCity";
import viewWeather from "./view/viewController";

const weather = new Weather("Poltava");
const view = new viewWeather();
/*const requestCity = new requestedCity();
requestCity.getRequestedCity();*/


const displayResults = () => {
    const weatherLocation = document.querySelector("[data-selector='weather-location']");
    const weatherResults = document.querySelector("[data-selector='weather-results']");
    if (weatherLocation.classList.contains("d-none") && weatherResults.classList.contains("d-none")) {
        weatherLocation.classList.remove("d-none");
        weatherResults.classList.remove("d-none");
        weatherResults.classList.add("d-flex");
    }
}

const error = () => {
    weather.alertMessage("Unable to retrieve your location", "alert-message");
}

const success = async(position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const geolocator = new geoLocator(latitude, longitude);
    await geolocator.getWeatherByLocation();
    displayResults();
    view.displayWeather(geolocator.result);
}
const getWeatherByMyLocation = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        weather.alertMessage("Geolocation is not supported by your browser", "alert-message");
    }
}

const changeWeatherUnits = () => {
    view.displayFahrenheit(weather.result);
    document.querySelector("[data-selector='celcius']").addEventListener("click", renderWeatherApp);
}

const changeWeatherByCityName = () => {
    let input = document.querySelector("[data-selector='input']");
    if (input.value) {
        weather.changeCityName(input.value);
        displayResults();
        renderWeatherApp();
        input.value = "";
    }
}

const renderWeatherApp = async() => {
    await weather.getWeatherByCityName();
    view.displayWeather(weather.result);
    view.displayBackgroundImage(weather.result);
}


document.querySelector("[data-selector='fahrenheit']").addEventListener("click", changeWeatherUnits);
document.querySelectorAll("[data-selector='myLocation']").forEach(button => button.addEventListener("click", getWeatherByMyLocation));
document.querySelector("[data-selector='button']").addEventListener("click", changeWeatherByCityName);
window.addEventListener("DOMContentLoaded", renderWeatherApp);

document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        changeWeatherByCityName();
    }
});