export default class viewWeather {
    constructor() {
        this.nameCity = document.querySelector("[data-selector='name']");
        this.country = document.querySelector("[data-selector='country']");
        this.time = document.querySelector("[data-selector='time']");
        this.temperature_c = document.querySelector("[data-selector='temperature_c']");
        this.temperature_f = document.querySelector("[data-selector='temperature_f']");
        this.feelslike_c = document.querySelector("[data-selector='feelslike_c']");
        this.feelslike_f = document.querySelector("[data-selector='feelslike_f']");
        this.description = document.querySelector("[data-selector='description']");
        this.icon = document.querySelector("[data-selector='icon']");
        this.pressure = document.querySelector("[data-selector='pressure']");
        this.humidity = document.querySelector("[data-selector='humidity']");
        this.wind = document.querySelector("[data-selector='wind']");

    }
    displayResults(result) {
        this.nameCity.textContent = result.location.name;
        this.country.textContent = result.location.country;
        this.time.textContent = result.location.localtime;
        this.temperature_c.textContent = result.current.temp_c;
        this.temperature_f.textContent = result.current.temp_f;
        this.feelslike_c.textContent = result.current.feelslike_c;
        this.feelslike_f.textContent = result.current.feelslike_f;
        this.description.textContent = result.current.condition.text;
        this.icon.setAttribute("src", result.current.condition.icon);
        this.pressure.textContent = `Pressure: ${result.current.pressure_mb} hPa`;
        this.humidity.textContent = `Humidity: ${result.current.humidity}%`;
        this.wind.textContent = `Wind: ${result.current.wind_mph} m/s`;
    }
}