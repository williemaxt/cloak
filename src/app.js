const path = require('path');
//access environment variables
require('dotenv').config({path:path.join(__dirname, '../.env')}) 
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('weatherData');

// create table if one does not exist
db.run('CREATE TABLE IF NOT EXISTS savedDays (`condition` VARCHAR(255) NOT NULL,`clothes` VARCHAR NOT NULL,`zip` INT(10),`date` DATETIME DEFAULT CURRENT_TIMESTAMP)');

// using packages across entire application
app.use(bodyParser.json())
app.use(cors())

/**
 * This function is a listener that will take a user's input, 
 * call an api and return that data
 * @param {string} input a json string
 * @returns {string} returns a json string.
 */
app.get('/getWeather/:zipCode', async(req,res) => {
    const zipCode = req.params.zipCode;
    console.log(zipCode)
    const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${process.env.API_KEY}&units=imperial&exclude=hourly,daily`;
    fetch(url)
    .then(res => res.json())
    .then(json => {
        // send response 
        res.send(json.list)
    });
    // res.send('weather')
});

/**
 * This function is a listener that will take a user's input, 
 * and store it in a database
 * @param {string} input a json string
 * @returns {number} returns a status.
 */
app.post('/saveWeather', (req,res) => {
    const condition = req.body.condition;
    const clothes = req.body.clothes;
    const zip = req.body.zip;

    // check for empty strings 
    if(condition.length <= 0 || clothes.length <= 0 || zip.length <= 0) {
        res.sendStatus(400);
    } else {
        // preparing sql statement
        var stmt = db.prepare("INSERT INTO savedDays (condition, clothes, zip) VALUES (?,?,?)");
        // running query
        stmt.run(condition, clothes, zip);
        stmt.finalize();
        // sending status
        res.sendStatus(200);
    }

});

/**
 * This function is a listener that will query a database for a user's saved information
 * @returns {string} returns a json string.
 */
app.get('/getSavedData', (req,res) => {
    db.all("SELECT * FROM savedDays", function(err, result) {
        // check for errors and return a 500 if one exists
        if (err) {
            // sending a status
            res.sendStatus(500)
        } else {
            // sending database result
            res.send(result)
        }

    });
});

console.log('Application running ...')
console.log('on')
console.log(process.env.PORT);

// application listening
app.listen(process.env.PORT)