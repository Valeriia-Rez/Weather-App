import "../scss/main.scss";
import "regenerator-runtime/runtime";
import Weather from "./model/modelController";
import viewWeather from "./view/viewController";

const weather = new Weather("Kharkiv");
const view = new viewWeather();



const clearLocation = () => {
    let location = document.querySelector("[data-selector='location']");
    location.value = "";
}

const changeWeather = () => {
    let location = document.querySelector("[data-selector='location']").value;
    weather.changeLocation(location);
    renderWeather();
    clearLocation();
}

const renderWeather = async() => {
    await weather.getWeather();
    view.displayResults(weather.result);
    if (weather.result.current.temp_c < 0) {
        const div = document.querySelector("[data-selector='weather']");
        div.style.background = "url('/img/winter.jpg')";
        div.style.backgroundSize = "cover";
    } else if (weather.result.current.temp_c > 0 && weather.result.current.temp_c < 10) {
        const div = document.querySelector("[data-selector='weather']");
        div.style.background = "url('/img/background.jpg')";
        div.style.backgroundSize = "cover";
    } else if (weather.result.current.temp_c > 10 && weather.result.current.temp_c < 20) {
        const div = document.querySelector("[data-selector='weather']");
        div.style.background = "url('/img/spring.jpg')";
        div.style.backgroundSize = "cover";
    } else if (weather.result.current.temp_c > 20) {
        const div = document.querySelector("[data-selector='weather']");
        div.style.background = "url('/img/summer.jpg')";
        div.style.backgroundSize = "cover";
    }

}

document.querySelector("[data-selector='button']").addEventListener("click", changeWeather);
window.addEventListener("DOMContentLoaded", renderWeather);