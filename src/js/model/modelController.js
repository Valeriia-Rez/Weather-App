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

    error() {
        console.log('Unable to retrieve your location');
    }
    success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);

    }
    checkGeo() {
        if ('geolocation' in navigator) {
            this.navigator = navigator;
            this.navigator.geolocation.getCurrentPosition(this.success, this.error);
        } else {
            console.log("Geolocation is not supported by your browser");
        }
    }

}