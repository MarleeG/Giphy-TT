const log = console.log;

// packages

// dotenv
const dot = require('dotenv').config();

// express
const express = require('express');
const app = express();
const PORT = 8080;

// path
const path = require('path');

// API KEY
const API_KEY = dot.parsed.API_KEY;



app.get('/', (req, res) =>{
    res.send('Hello!');
})

app.listen(PORT, err => {
    err ? log(err) : log(`http://localhost:${PORT}`);
})




// log(process.env.API_KEY)