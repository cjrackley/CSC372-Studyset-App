import axios from "axios";

const WEATHER_API_BASE_URL = import.meta.env.VITE_API_URL;

class WeatherService {

    getCurrentWeather(city) {
        return axios.get (
            `${WEATHER_API_BASE_URL}/weather/current`, {
                params: { city },
                withCredentials: true
            }
        );
    }
}

export default new WeatherService();