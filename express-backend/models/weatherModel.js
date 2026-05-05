"use strict";

const axios = require("axios");

async function getCurrentWeather(city) {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const url = "https://api.openweathermap.org/data/2.5/weather"

    const response = await axios.get(url, {
        params: {
            q: city,
            appid: apiKey,
            units: "imperial"
        }
    });

    const data = response.data;

    return {
        city: data.name,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        condition: data.weather[0].description,
        icon: data.weather[0].icon
    };
}

module.exports = {
    getCurrentWeather
}