export default class ViewWeather {
    constructor() {
        this.latitude;
        this.longitude;
        this.timeStamp;
        this.celcius;
        this.fahrenheit;
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
        this.changeCelciusOnFahrenheit();
    }

    displayBackgroundImage(result) {

        if (!result) {
            document.body.style.background = "url('./img/spring.jpg')";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";

        } else {
            if (result.current.temp_c < 0) {
                document.body.style.background = "url('./img/winter.jpg')";

                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundRepeat = "no-repeat";
            } else if (result.current.temp_c > 0 && result.current.temp_c < 10) {
                document.body.style.background = "url('./img/background.jpg')";

                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundRepeat = "no-repeat";
            } else if (result.current.temp_c > 10 && result.current.temp_c < 20) {
                document.body.style.background = "url('./img/spring.jpg')";

                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundRepeat = "no-repeat";
            } else if (result.current.temp_c > 20) {
                document.body.style.background = "url('./img/summer.jpg')";

                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundRepeat = "no-repeat";
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
                <div class="weather__location pb-3">
                    <span>${result.location.name}</span>
                    <span>${result.location.country}</span>
                    <div class="d-flex flex-row justify-content-center align-items-center">
                        <h2 class="text-center pt-2" data-selector="temperature"><strong>${result.current.temp_c}</strong></h2>
                      
                        <span class="weather__unit px-2 pt-2 active" data-selector="celcius">&#176;C</span>
                        <span class="px-1">/</span>
                        <span class="weather__unit pt-3" data-selector="fahrenheit">&#176;F</span>
                        
                    </div>
                    <span><strong>${result.current.condition.text}</strong></span>
                    <span><img src="${result.current.condition.icon}" class="pl-4"></span>
                </div>
                <div class="d-flex flex-row justify-content-between justify-content-md-around px-3 py-2">
                    <div class="d-flex flex-column">
                        <span class="pb-3" data-selector="feelslike"><strong>Feels like:</strong> ${result.current.feelslike_c}&#176;C</span>
                        <span><strong>Pressure:</strong> ${result.current.pressure_mb} hPa</span>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="pb-3"><strong>Humidity:</strong> ${result.current.humidity}%</span>
                        <span><strong>Wind:</strong> ${result.current.wind_kph} kph</span>
                    </div>
                </div>
                <div class="text-center py-4"><strong>${result.location.localtime}</strong></div>
               `;

        const resultWrapper = document.querySelector("[data-selector='result']");
        resultWrapper.innerHTML = html;
    }

    changeCelciusOnFahrenheit() {
        this.celcius = document.querySelector("[data-selector='celcius']");
        this.fahrenheit = document.querySelector("[data-selector='fahrenheit']");
        this.toggleClassess(this.celcius, this.fahrenheit);
    }

    changeFahrenheitOnCelcius() {
        this.celcius = document.querySelector("[data-selector='celcius']");
        this.fahrenheit = document.querySelector("[data-selector='fahrenheit']");
        this.toggleClassess(this.fahrenheit, this.celcius);
    }

    toggleClassess(first, second) {
        if (first.classList.contains('active')) {
            first.classList.remove('active');
            second.classList.add('active');
        }
    }
}