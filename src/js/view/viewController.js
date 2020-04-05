export default class ViewWeather {
    constructor() {
        this.latitude;
        this.longitude;
        this.timeStamp;
    }

    getResponseCity(result) {
        this.latitude = result.location.lat;
        this.longitude = result.location.lon;
        this.timeStamp = new Date().getTime() / 1000 + new Date().getTimezoneOffset() * 60;
    }

    displayFahrenheit(result) {
        const temperature = document.querySelector("[data-selector='temperature']");
        temperature.innerHTML = `<strong>${result.current.temp_f}</strong>`;
        const feelslike = document.querySelector("[data-selector='feelslike']");
        feelslike.innerHTML = `<strong>Feels Like:</strong> ${result.current.feelslike_f} &#176;F`;
    }

    displayBackgroundImage(result) {
        const div = document.querySelector("body");
        div.style.backgroundSize = "cover";
        div.style.backgroundPosition = "top";
        div.style.backgroundRepeat = "no-repeat";
        if (!result) {
            div.style.background = "url('./img/winter.jpg')";
            return
        } else {
            if (result.current.temp_c < 0) {
                div.style.background = "url('./img/winter.jpg')";
            } else if (result.current.temp_c > 0 && result.current.temp_c < 10) {
                div.style.background = "url('./img/background.jpg')";
            } else if (result.current.temp_c > 10 && result.current.temp_c < 20) {
                div.style.background = "url('./img/spring.jpg')";
            } else if (result.current.temp_c > 20) {
                div.style.background = "url('./img/summer.jpg')";
            }
        }
    }

    alertMessage(message, className) {
        this.clearAlert();
        const div = document.createElement('div');
        div.className = className;
        const textNode = document.createTextNode(message);
        div.appendChild(textNode);
        const alert = document.querySelector("[data-selector='alert']");
        alert.appendChild(div);
        setTimeout(() => {
            this.clearAlert();
        }, 5000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert-message');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    displayResults(result) {
        const html = `
                <div class="weather__location pb-3" data-selector="weather-location">
                    <span data-selector="name">${result.location.name}</span>
                    <span data-selector="country">${result.location.country}</span>
                    <div class="d-flex flex-row justify-content-center">
                        <h2 class="text-center pt-2" data-selector="temperature"><strong>${result.current.temp_c}</strong></h2>
                        <span class="weather__unit pl-2 pt-2" data-selector="celcius">&#176;C /</span>
                        <span class="weather__unit pt-3" data-selector="fahrenheit">&#176;F</span>
                    </div>
                    <span data-selector="description"><strong>${result.current.condition.text}</strong></span>
                    <span><img src="${result.current.condition.icon}" class="pl-4" data-selector="icon"></span>
                </div>
                <div class="d-flex flex-row justify-content-between justify-content-md-around px-3 py-2" data-selector="weather-results">
                    <div class="d-flex flex-column">
                        <span class="pb-3" data-selector="feelslike"><strong>Feels like:</strong> ${result.current.feelslike_c}&#176;C</span>
                        <span data-selector="pressure"><strong>Pressure:</strong> ${result.current.pressure_mb} hPa</span>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="pb-3" data-selector="humidity"><strong>Humidity:</strong> ${result.current.humidity}%</span>
                        <span data-selector="wind"><strong>Wind:</strong> ${result.current.wind_kph} kph</span>
                    </div>
                </div>
                <div class="text-center py-4" data-selector="time"><strong>${result.location.localtime}</strong></div>
               `;

        const resultWrapper = document.querySelector("[data-selector='result']");
        resultWrapper.innerHTML = html;
    }

}