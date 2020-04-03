import "../scss/main.scss";
import "regenerator-runtime/runtime";
import Weather from "./model/modelController";
import viewWeather from "./view/viewController";

const weather = new Weather("Kharkiv");
const view = new viewWeather();



const changeWeather = () => {
    const location = document.querySelector("[data-selector='location']").value;
    weather.changeLocation(location);
    renderWeather();
    const location = "";

}

const renderWeather = async() => {
    await weather.getWeather();
    view.displayResults(weather.result);
}

document.querySelector("[data-selector='button']").addEventListener("click", changeWeather);
window.addEventListener("DOMContentLoaded", renderWeather);