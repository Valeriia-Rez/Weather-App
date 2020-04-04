import "../scss/main.scss";
import "regenerator-runtime/runtime";
import Weather from "./model/getWeatherByCityName";
import geoLocator from "./model/getWeatherByLocation";
import viewWeather from "./view/viewController";

const weather = new Weather("Poltava");
const view = new viewWeather();

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
    alert('Unable to retrieve your location');
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
        console.log("Geolocation is not supported by your browser");
    }
}

const changeWeatherUnits = () => {
    view.displayFahrenheit(weather.result);
    document.querySelector("[data-selector='celcius']").addEventListener("click", renderWeatherApp);
}

const clearInput = () => {
    let input = document.querySelector("[data-selector='input']");
    input.value = "";
}

const changeWeatherByCityName = () => {
    let input = document.querySelector("[data-selector='input']").value;
    weather.changeCityName(input);
    displayResults();
    renderWeatherApp();
    clearInput();
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