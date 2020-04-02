import "../scss/main.scss";
import "regenerator-runtime/runtime";

import Weather from "./model/modelController";
import viewWeather from "./view/viewController";

const weather = new Weather("London");
const view = new viewWeather();

const renderWeather = async() => {
    await weather.getWeather();
    view.displayResults(weather.result);


}


window.addEventListener("DOMContentLoaded", renderWeather);