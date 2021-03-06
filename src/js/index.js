import "../scss/main.scss";
import "regenerator-runtime/runtime";
import Weather from "./model/getWeatherByCityName";
import GeoLocator from "./model/getWeatherByLocation";
import ViewWeather from "./view/viewController";

const weather = new Weather();
const view = new ViewWeather();

const error = () => view.alertMessage("Unable to retrieve your location", "alert-message");

const success = async(position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const geolocator = new GeoLocator(latitude, longitude);
    await geolocator.getWeatherByLocation();
    view.displayBackgroundImage(geolocator.result);
    if (geolocator.error) {
        view.alertMessage("Error", "alert-message");
    } else {
        view.displayResults(geolocator.result);
        document.querySelector("[data-selector='fahrenheit']").addEventListener("click", () => changeWeatherUnits(geolocator.result, "location"));
        document.querySelector("[data-selector='celcius']").addEventListener("click", () => changeWeatherUnits(geolocator.result, "location"));
    }
}

const getWeatherByMyLocation = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        weather.alertMessage("Geolocation is not supported by your browser", "alert-message");
    }
}

const changeWeatherUnits = (result, type) => {
    view.displayFahrenheit(result);
    if (type === "location") {
        document.querySelector("[data-selector='celcius']").addEventListener("click", getWeatherByMyLocation);
        document.querySelector("[data-selector='fahrenheit']").addEventListener("click", getWeatherByMyLocation);
    } else {
        document.querySelector("[data-selector='celcius']").addEventListener("click", changeWeatherByCityName);
        document.querySelector("[data-selector='fahrenheit']").addEventListener("click", changeWeatherByCityName);
    }
}

const changeWeatherByCityName = async() => {
    const input = document.querySelector("[data-selector='input']");
    if (!weather.city || input.value) {
        await weather.getWeatherByCityName(input.value);
        view.displayBackgroundImage(weather.result);
        if (weather.error) {
            view.alertMessage("Please,enter the correct city", "alert-message");
            input.value = "";
            weather.clearCity();
        } else {
            view.displayResults(weather.result);
            view.changeFahrenheitOnCelcius();
            document.querySelector("[data-selector='fahrenheit']").addEventListener("click", () => changeWeatherUnits(weather.result, "city"));
            document.querySelector("[data-selector='celcius']").addEventListener("click", () => changeWeatherUnits(weather.result, "city"));
            input.value = "";
        }
    } else {
        await weather.getWeatherByCityName(weather.city);
        view.displayResults(weather.result);
        view.displayBackgroundImage(weather.result);
        document.querySelector("[data-selector='fahrenheit']").addEventListener("click", () => changeWeatherUnits(weather.result, "city"));
        document.querySelector("[data-selector='celcius']").addEventListener("click", () => changeWeatherUnits(weather.result, "city"));
    }
}

const renderWeatherApp = () => {
    view.displayBackgroundImage(weather.result);
}

document.querySelectorAll("[data-selector='my-location']").forEach(button => button.addEventListener("click", getWeatherByMyLocation));
document.querySelector("[data-selector='button']").addEventListener("click", changeWeatherByCityName);
window.addEventListener("DOMContentLoaded", renderWeatherApp);

document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        changeWeatherByCityName();
    }
});