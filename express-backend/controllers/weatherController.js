"use strict";

const model = require('../models/weatherModel');

async function fetchCurrentWeather(req, res) {
    const { city } = req.query;

    if (!city) {
        return res.status(400).send("City is required");
    }

    try {
        const weather = await model.getCurrentWeather(city);
        res.json(weather);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send("Failed to fetch weather");
    }
}

module.exports = {
    fetchCurrentWeather
}