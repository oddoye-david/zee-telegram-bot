'use strict';

// Node Modules Dependencies
var random_ua = require('random-ua');
const cheerio = require('cheerio');
const request = require('request');

// User Module Dependencies
const utils = require('./utils');

exports.getExchangeRate = (amount, shortcode, cb) => {
    request(`http://www.xe.com/currencyconverter/convert/?Amount=${amount}&From=${shortcode}&To=GHS`, { headers: { 'User-Agent': random_ua.generate() } }, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);
            let amount = $('tr.uccRes').children('td')[2];
            let amountGHS = $(amount).text().replace("GHS", "");
            let numAmountGHS = parseFloat(amountGHS.toString().replace(",", ""));
            cb(null, `${ utils.getAmountWithSymbol(amount, shortcode) } is equivalent to GHS ${amountGHS} at an exchange rate of ${(numAmountGHS/amount).toFixed(4)}`)
        } else {
            cb(response, null);
        }
    });
}