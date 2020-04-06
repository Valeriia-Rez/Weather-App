import "../scss/main.scss";
import "regenerator-runtime/runtime";
import Weather from "./model/getWeatherByCityName";
import GeoLocator from "./model/getWeatherByLocation";
import Request from "./model/getRequestedCity";
import ViewWeather from "./view/viewController";

const weather = new Weather();
const view = new ViewWeather();
const request = new Request();

/*const getCity = async() => {
    view.getResponseCity(weather.result);
    await request.getRequestedCity(view.latitude, view.longitude, view.timeStamp);
    console.log(view.latitude, view.longitude, view.timeStamp, "lat");
}*/

const error = () => view.alertMessage("Unable to retrieve your location", "alert-message");

const success = async(position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const geolocator = new GeoLocator(latitude, longitude);
    await geolocator.getWeatherByLocation();
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

    let input = document.querySelector("[data-selector='input']");
    if (!weather.city || input.value) {
        await weather.getWeatherByCityName(input.value);

        if (weather.error) {
            view.alertMessage("Please,enter the correct city", "alert-message");
            input.value = "";
            weather.clearCity();
        } else {

            view.displayResults(weather.result);

            document.querySelector("[data-selector='fahrenheit']").addEventListener("click", () => changeWeatherUnits(weather.result, "city"));
            document.querySelector("[data-selector='celcius']").addEventListener("click", view.changeFahrenheitOnCelcius);

            input.value = "";
        }

    } else {
        await weather.getWeatherByCityName(weather.city);
        view.displayResults(weather.result);
        document.querySelector("[data-selector='fahrenheit']").addEventListener("click", () => changeWeatherUnits(weather.result, "city"));
        document.querySelector("[data-selector='celcius']").addEventListener("click", view.changeFahrenheitOnCelcius);
    }
}

const renderWeatherApp = () => {
    view.displayBackgroundImage(weather.result);
}

/*document.querySelector("[data-selector='input']").addEventListener("click", getCity);*/

document.querySelectorAll("[data-selector='myLocation']").forEach(button => button.addEventListener("click", getWeatherByMyLocation));
document.querySelector("[data-selector='button']").addEventListener("click", changeWeatherByCityName);
window.addEventListener("DOMContentLoaded", renderWeatherApp);

document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        changeWeatherByCityName();
    }
});