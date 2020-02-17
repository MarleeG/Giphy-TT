const log = console.log;

// packages

// dotenv
const dot = require('dotenv').config();

// express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// path
const path = require('path');

// Middleware
app.use(express.static(__dirname + '/public/assets'));
app.use('/', express.static(path.join(__dirname + '/node_modules')));

app.route('/')
    .post((req, res) =>{
        res.send({API_KEY: process.env.API_KEY})
    })
    .get((req, res) =>{
        res.sendFile(path.join(__dirname, "/index.html"));
    });

app.listen(PORT);