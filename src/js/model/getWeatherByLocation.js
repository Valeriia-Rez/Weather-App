import axios from 'axios';

export default class GeoLocator {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.key = "858a0ada55c44814a02193154202901";
        this.error = null;
    }

    async getWeatherByLocation() {
        try {
            const res = await axios(`https://api.weatherapi.com/v1/current.json?key=${this.key}&q=${this.latitude}&q=${this.longitude}`);
            this.result = res.data;
            console.log(this.result);
            this.error = false;
        } catch (error) {
            this.error = true;
        }
    }
}