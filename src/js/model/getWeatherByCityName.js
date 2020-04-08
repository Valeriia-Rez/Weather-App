import axios from 'axios';

export default class Weather {
    constructor() {
        this.city = "";
        this.key = "858a0ada55c44814a02193154202901";
        this.result = null;
        this.error = null;
    }

    async getWeatherByCityName(city) {
        try {
            this.city = city;
            const res = await axios(`https://api.weatherapi.com/v1/current.json?key=${this.key}&q=${this.city}`);
            this.result = res.data;
            this.error = false;
        } catch (error) {
            this.error = true;
        }
    }

    clearCity() {
        this.city = "";
    }
}