'use strict';
require('./config/config');

let express = require('express');
let { google } = require('googleapis');


let urlshortener = google.urlshortener('v1');
let OAuth2Client = google.auth.OAuth2;
let oauth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);

let app = express();
app.get('/', (req, res) => res.send('Google URL Shortener'));

// Obtener información de la url
app.get('/extender', (req, res) => {
    var params = {
        "auth": process.env.KEY_API,
        "shortUrl": 'https://goo.gl/MTEs4'
    };
    urlshortener.url.get(params, function(err, response) {
        if (err || !response) {
            res.send("Error On Get");
        } else {
            res.json(response.data);
        }
    });
});

// Acortar url
app.get('/acortar', (req, res) => {
    var params = {
        "auth": process.env.KEY_API,
        "resource": {
            "longUrl": "https://www.facebook.com/"
        }
    };


    urlshortener.url.insert(params, function(err, response) {
        if (err || !response) {
            res.send(`Error al acortar la url ${err}`);
        } else {
            res.json(response.data);
        }
    });
});

// Retrieves a list of URLs shortened by the authenticated user.
app.get('/listas', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // OAuth2 (Generate AuthUrl)
        scope: 'https://www.googleapis.com/auth/urlshortener'
    });
    res.redirect(url);
});

app.get('/oauth2callback', (req, res) => {
    var code = req.query.code + '#';
    oauth2Client.getToken(code, (err, tokens) => {
        if (err || !tokens) {
            res.send("Error On OAuth");
        } else {
            oauth2Client.setCredentials(tokens);
            urlshortener.url.list({ auth: oauth2Client }, function(err, response) {
                if (err || !response) {
                    res.send("Error On Listing");
                } else {
                    res.json(response.data);
                }
            });
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});