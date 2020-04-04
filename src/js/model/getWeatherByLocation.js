import axios from 'axios';

export default class geoLocator {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.key = "858a0ada55c44814a02193154202901";
    }

    async getWeatherByLocation() {
        try {
            const res = await axios(`https://api.weatherapi.com/v1/current.json?key=${this.key}&q=${this.latitude}&q=${this.longitude}`);
            this.result = res.data;
            console.log(this.result);
        } catch (error) {
            alert("Error...");
        }
    }
}