'use strict';

const config = require('../config');

/*
*   Params: ign: Object, metacritic: array   eg {"criticScore": "8.7","userScore": "6.2","url": "http:..."} {"criticScore": "87","userScore": "6.2","url": "http:..."}
    }
*   Return: String  'got a Critic Dcore of 87% on Metacritic and 8.7 on IGN'.
*/

exports.showRating = (ign, metacritic) => {
    const currencyRegex = config.currencyRegex;
    let msg = '';
    
    /*  
    *   LOLZ. Someone wanna try simplifying this if/else hell??
    *   Basically, check if there's a METACRITIC object and it has a decimal(1 or 2) criticScore
    *   If so say it has a critic score of x....see read it and see.
    */
    if (metacritic && metacritic.criticScore && currencyRegex.test(metacritic.criticScore.toString())) {
        msg = `got a Critic Score of <b>${metacritic.criticScore}%</b> on <i>Metacritic</i>`;
        if (ign && ign.criticScore && currencyRegex.test(ign.criticScore.toString())) {
            msg += ` and a Critic Score of <b>${ign.criticScore}</b> on <i>IGN</i>.`;
        } else if (ign && ign.userScore && currencyRegex.test(ign.userScore.toString())) {
            msg += ` and a User Score of <b>${ign.userScore}</b> on <i>IGN</i>.`;
        }
    } else if (metacritic && metacritic.userScore && currencyRegex.test(metacritic.userScore.toString())) {
        msg = `got a User score of <b>${metacritic.userScore}</b> on <i>Metacritic</i>`;
        if (ign && ign.criticScore && currencyRegex.test(ign.criticScore.toString())) {
            msg += ` and a Critic Score of <b>${ign.criticScore}</b> on <i>IGN</i>.`;
        } else if (ign && ign.userScore && currencyRegex.test(ign.userScore.toString())) {
            msg += ` and a User Score of <b>${ign.userScore}</b> on <i>IGN</i>.`;
        }
    } else if (ign && ign.criticScore && currencyRegex.test(ign.criticScore.toString())) {
        msg = `got a Critic Score of <b>${ign.criticScore}</b> on <i>IGN</i>`;
    } else if (ign && ign.userScore && currencyRegex.test(ign.userScore.toString())) {
        msg = `got a User Score of <b>${ign.userScore}</b> on <i>IGN</i>`;
    }
    else {
        msg = '<b>Sorry no ratings...</b>';
    }

    return msg;
}

/*
*   Params: arr: Array, prepend: String   eg ['kenkey', 'fish', 'shrimps'], 'This is'.
*   Return: String  'This is Kenkey, fish and shrimps'.
*/
exports.createPrettyCSV = (arr, prepend) => {
    let outStr = "";
    if (arr.length === 1) {
        outStr = arr[0];
        outStr = prepend.toString() + ' <i>' + outStr + '</i>,';
    } else if (arr.length === 2) {
        //joins all with "and" but no commas
        //example: "kenkey and fish"
        outStr = arr.join(' and ');
        outStr = prepend.toString() + ' <i>' + outStr + '</i>,';
    } else if (arr.length > 2) {
        //joins all with commas, but last one gets " and"
        //example: "kenkey, fish, and shrimps"
        outStr = arr.slice(0, -1).join(', ') + ' and ' + arr.slice(-1);
        outStr = prepend.toString() + ' <i>' + outStr + '</i>,';
    }
    return outStr;
}

/*
*   Params: str: String   eg 'kenkey and fish'.
*   Return: String  'Kenkey And Fish'.
*/
exports.toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

/*
*   Params: amount: Number, shortCode: String   eg 100 'USD'.
*   Return: String  '$100'.
*/
exports.AmountWithSymbol = (amount, shortcode) => {
    switch (shortcode) {
        case 'USD':
            return '$' + amount;
            break;
        case 'GBP':
            return '£' + amount;
            break;
        case 'EUR':
            return '€' + amount;
            break;
        default:
            return '';
    }
}

exports.isCurrency = (amount) => {
    return config.currencyRegex.test(amount);
}

