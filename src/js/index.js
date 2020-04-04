import "../scss/main.scss";
import "regenerator-runtime/runtime";
import Weather from "./model/modelController";
import viewWeather from "./view/viewController";


const weather = new Weather("Kharkiv");
const view = new viewWeather();


const getWeatherByLocation = () => {
    weather.checkGeo();
}
const changeTemperature = () => {
    view.displayFahrenheit(weather.result);

}

const clearLocation = () => {
    let local = document.querySelector("[data-selector='location']");
    local.value = "";
}

const changeWeather = () => {
    let local = document.querySelector("[data-selector='location']").value;
    weather.changeLocation(local);
    renderWeather();
    clearLocation();
}

const renderWeather = async() => {
    await weather.getWeather();
    view.displayResults(weather.result);
    view.displayBackgroundImage(weather.result);
}

document.querySelector("[data-selector='celcius']").addEventListener("click", renderWeather);
document.querySelector("[data-selector='fahrenheit']").addEventListener("click", changeTemperature);
document.querySelector("[data-selector='myLocation']").addEventListener("click", getWeatherByLocation);
document.querySelector("[data-selector='button']").addEventListener("click", changeWeather);
window.addEventListener("DOMContentLoaded", renderWeather);