import { useState } from "react";
import WeatherService from "../WeatherService";

const WeatherWidgetComponent = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        if (!city.trim()) return;

        setLoading(true);
        setError("");
        setWeather(null);

        try {
            const res = await WeatherService.getCurrentWeather(city);
            setWeather(res.data);
        } catch (err) {
            console.error(err);
            setError("Could not load weather");
        } finally {
            setLoading(false);
        }
    };

    const getStudyAdvice = (temp, condition) => {
        if (!temp) return "";

        const cold = temp < 50;
        const hot = temp > 90;
        const badWeather = condition?.includes("rain") || condition?.includes("storm");

        if (badWeather || cold) {
            return "You should study indoors today.";
        } else if(hot) {
            return "Stay in the shade if you study outside today.";
        } else {
            return "Good weather today! Maybe go outside and study!";
        }
        
    }

    return (
        <div className="studyset-card weather-card">

                <h3>Weather</h3>

                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}

                {weather && (
                    <div className="weather-info">
                        <h4>{weather.city}</h4>
                        <p className="weather-condition">{weather.condition}</p>
                        <p className="weather-temp">{weather.temp}°F (feels {weather.feels_like}°)</p>

                        <div className="weather-advice">
                            {getStudyAdvice(weather.temp, weather.condition)}
                        </div>
                    </div>
                )}

            <div className="weather-controls">
                <input
                    className="weather-input"
                    placeholder="City..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <button className="btn-view weather-btn" onClick={fetchWeather}>
                    Go
                </button>
            </div>

        </div>
    );
}

export default WeatherWidgetComponent;