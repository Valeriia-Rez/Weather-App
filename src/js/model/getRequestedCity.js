import axios from 'axios';

export default class requestedCity {
    constructor(lat, long, timestamp) {
        this.lat = lat;
        this.long = long;
        this.timestamp = timestamp;
        this.key = "AIzaSyAf-DvOHPWpqrx_382gHT5ue05lCgdgiiE";
    }

    async getRequestedCity() {
        try {
            const res = await axios(`https://maps.googleapis.com/maps/api/timezone/json?location=${this.lat},${this.long}&timestamp=${this.timestamp}&key=${this.key}`);

            console.log(res);
        } catch (error) {
            alert(error);
        }
    }

}