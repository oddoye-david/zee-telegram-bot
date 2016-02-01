'use strict';

// Node Modules Dependencies
const express = require('express');
const packageInfo = require('./package.json');
const bodyParser = require('body-parser');

// User Created Module Dependencies
var config = require('./config');
var bot = require('./bot');
var forex = require('./utils/forex');


const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        name: packageInfo.name,
        version: packageInfo.version
    });
});

app.get('/forex', (req, res) => {
    forex.getForexUSD(req.query.amount, 'USD');
});

app.post('/' + config.telegramBotToken, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Web server started at http://%s:%s', host, port);
});

