//server.js
"use strict";
require('dotenv').config();
console.log("CLIENT_BASE_URL:", process.env.CLIENT_BASE_URL);

const express = require("express");
const app = express();

const cors = require('cors');
app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL || 'http://localhost:5173', // Vite frontend URL
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    })
);


const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


const session = require('express-session');
const passport = require('passport');
require('./auth/passport');
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false, 
  cookie: {
    httpOnly: true,
    secure: false,          
    sameSite: 'lax'       
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const studySetRoutes = require('./routes/StudySetRoutes');
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

app.use('/study-sets', studySetRoutes);
app.use('/notes', noteRoutes);
app.use('/users', userRoutes);
app.use('/auth', require('./auth/authRoute'));
app.use("/weather", weatherRoutes);

app.use(express.static(Path2D.join(__dirname, '../react-frontend-client/dist')));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-frontend-client/dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});