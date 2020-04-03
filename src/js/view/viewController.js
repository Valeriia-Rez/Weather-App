export default class viewWeather {
    constructor() {
        this.nameCity = document.querySelector("[data-selector='name']");
        this.country = document.querySelector("[data-selector='country']");
        this.time = document.querySelector("[data-selector='time']");
        this.temperature = document.querySelector("[data-selector='temperature']");
        this.temperature_f = document.querySelector("[data-selector='temperature_f']");
        this.feelslike = document.querySelector("[data-selector='feelslike']");
        this.description = document.querySelector("[data-selector='description']");
        this.icon = document.querySelector("[data-selector='icon']");
        this.pressure = document.querySelector("[data-selector='pressure']");
        this.humidity = document.querySelector("[data-selector='humidity']");
        this.wind = document.querySelector("[data-selector='wind']");
    }
    displayResults(result) {
        this.nameCity.textContent = `${result.location.name},`;
        this.country.textContent = result.location.country;
        this.time.textContent = result.location.localtime;
        this.temperature.innerHTML = `<strong>${result.current.temp_c}</strong>`;
        this.feelslike.innerHTML = `<strong>Feels Like:</strong> ${result.current.feelslike_c} &#176;C`;
        this.description.innerHTML = `<strong>${result.current.condition.text}</strong>`;
        this.icon.setAttribute("src", `${result.current.condition.icon}`);
        this.pressure.innerHTML = `<strong>Pressure:</strong> ${result.current.pressure_mb} hPa`;
        this.humidity.innerHTML = `<strong>Humidity:</strong> ${result.current.humidity}%`;
        this.wind.innerHTML = `<strong>Wind:</strong> ${result.current.wind_kph} kph`;
    }

    displayFahrenheit(result) {
        this.temperature.innerHTML = `<strong>${result.current.temp_f}</strong>`;
        this.feelslike.innerHTML = `<strong>Feels Like:</strong> ${result.current.feelslike_f} &#176;F`;
    }


}