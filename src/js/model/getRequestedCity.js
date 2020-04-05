import axios from 'axios';

export default class Request {
    constructor(latitude, longitude, timestamp) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp;
        this.key = "AIzaSyAf-DvOHPWpqrx_382gHT5ue05lCgdgiiE";
    }

    async getRequestedCity() {
        try {
            const res = await axios(`https://maps.googleapis.com/maps/api/timezone/json?location=${this.latitude},${this.longitude}&timestamp=${this.timestamp}&key=${this.key}`);

            console.log("kkk", res);
        } catch (error) {
            alert(error);
        }
    }

}