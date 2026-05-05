"use strict";

const { Router } = require("express");
const router = Router();

const weatherController = require('../controllers/weatherController');

router.get("/current", weatherController.fetchCurrentWeather);

module.exports = router;