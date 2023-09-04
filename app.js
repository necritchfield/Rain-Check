'use strict';

const express = require('express');
const fs = require('fs');
const { spawn } = require('child_process');
const { engine } = require('express-handlebars');

const app = express();
const hostname = '127.0.0.1';


const mysql = require('mysql');
const connection = mysql.createConnection(process.env.JAWSDB_URL);

// handlebars setup
app.engine('hbs', engine({defaultLayout: "", layoutsDir: "", partialsDir: "partials", extname: "hbs", helpers: require('./handlebars-helpers')}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

//app.listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
//});

// render main page
app.get('/', (req, res) => {
    res.render('main');
});

// get form data and call microservice
app.post('/', (req, res) => {
    let location = `${req.body.location}`;
    api_call(location, res);
});

app.get('/garments', (req, res) => {
    connection.query('SELECT * FROM garments;', function(err, rows, fields) {
        if (err) throw err;
      
        console.log('Garment ID: %d. User ID: %d. Image URL: %s. Category ID: %d. Date updated: %s', rows[0].garment_id, rows[0].user_id, rows[0].image_url, rows[0].category_id, rows[0].date_updated);
      });

    res.render('garments', {tab: 'view'});
});

function viewTab(tab) {
    app.get('/garments', (req, res) => {
        res.render('garments', {tab: tab})
    })
};

async function api_call(location, res) {
    let url = 'https://api.weatherapi.com/v1/forecast.json?q=' + location;
    let api_key = '1600e6c3710e409486e165557232808';
    let params = {
        headers: {
            "key": api_key,
            "days": 1
        },
    }

    const response = await fetch(url, params).then(response => response.json()).then(data => {
        let high = data['forecast']['forecastday'][0]['day']['maxtemp_f'];
        let low = data['forecast']['forecastday'][0]['day']['mintemp_f'];
        let prec = data['forecast']['forecastday'][0]['day']['totalprecip_in'];

        res.render('main', {location: location, high: high, low: low, prec: prec, recommendation: generate_recommendation(high)});
    });
}

function generate_recommendation(high) {
    let recommendation = ''
    if (high > 70) {
        recommendation = "Given today's high, you will probably want to wear lighter clothing, such as a T-shirt and shorts.";
    }
    else if (high <= 70 && high > 55) {
        recommendation = "Given today's high, you may want to wear a sweater or a long-sleeved shirt and pants.";
    }
    else if (high <= 55) {
        recommendation = "Given today's high, you may want to dress warmer, perhaps in layers or with a coat.";
    }
    return recommendation;
}