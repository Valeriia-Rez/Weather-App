import axios from 'axios';

export default class Weather {
    constructor(city) {
        this.city = city;
        this.key = "858a0ada55c44814a02193154202901";
    }

    async getWeather() {
        try {
            const res = await axios(`https://api.weatherapi.com/v1/current.json?key=${this.key}&q=${this.city}`);
            this.result = res.data;
            console.log(this.result);
        } catch (error) {
            alert("Error...");
        }
    }

    changeLocation(city) {
        this.city = city;
    }


}