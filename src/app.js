const path = require('path');
//access environment variables
require('dotenv').config({path:path.join(__dirname, '../.env')}) 
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('weatherData');

// db.serialize(function() {
//     db.run('CREATE TABLE savedDays (`id` INT(10),`condition` VARCHAR(255) NOT NULL,`temperature` INT NOT NULL,`details` TEXT DEFAULT NULL,`clothes` VARCHAR NOT NULL,`date` DATETIME DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY (`id`))');
// });
   
//   db.close();



/**
 * This function is a listener that will take a user's input, 
 * call an api and return that data
 * @param {string} input a json string
 * @returns {string} returns a json string.
 */
app.get('/getWeather', (req,res) => {
    db.each("SELECT * FROM savedDays", function(err, row) {
        if (err) throw err;
        console.dir(row);
    });
    res.send('getting data')
});

/**
 * This function is a listener that will take a user's input, 
 * and store it in a database
 * @param {string} input a json string
 * @returns {string} returns a json string.
 */
app.post('/saveWeather', (req,res) => {
    const condition = 'cloudy with a chance of meatballs';
    const temperature = 67;
    const details = 'there may be some light showers in the NE region';
    
    const clothes = 'Long sleeve t-shirt';

    var stmt = db.prepare("INSERT INTO savedDays (condition, temperature, details, clothes) VALUES (?,?,?,?)");
    
   
    stmt.run(condition, temperature, details, clothes);

    
    stmt.finalize();
   
    res.send('saving data')
});

/**
 * This function is a listener that will query a database for a user's saved information
 * @returns {string} returns a json string.
 */
app.get('/getSavedData', (req,res) => {

});

console.log('Application running ...')
console.log('on')
console.log(process.env.PORT);

// application listening
app.listen(process.env.PORT)