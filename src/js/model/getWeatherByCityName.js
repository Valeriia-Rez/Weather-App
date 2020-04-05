import axios from 'axios';

export default class Weather {
    constructor(city) {
        this.city = city;
        this.key = "858a0ada55c44814a02193154202901";
    }

    async getWeatherByCityName() {
        try {
            const res = await axios(`https://api.weatherapi.com/v1/current.json?key=${this.key}&q=${this.city}`);
            this.result = res.data;
            console.log(this.result);
            this.latitude = this.result.location.lat;
            this.longitude = this.result.location.lon;
            console.log(this.latitude, this.longitude);
        } catch (error) {
            this.alertMessage("Please, enter correct city", "alert-message");
        }
    }

    changeCityName(city) {
        this.city = city;
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
}