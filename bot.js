'use strict';

// Node Module Dependencies
const Bot = require('node-telegram-bot-api');

// User Module Dependencies
const config = require('./config');
const forex = require('./libs/forex');
const utils = require('./libs/utils');


var bot;

if (process.env.NODE_ENV === 'production') {
    bot = new Bot(config.telegramBotToken);
    bot.setWebHook(config.webHook);
    require('./libs/twitter-stream')(bot);
}
else {
    bot = new Bot(config.telegramBotToken, { polling: true });
}



// forex_usd command
bot.onText(/^\/forex_usd (.+)$/, function (msg, match) {
    var amount = match[1];
    if (utils.isCurrency(amount)) {
        utils.getExchangeRate(amount, 'USD', function (err, message) {
            if (!err) {
                bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
            } else {
                bot.sendMessage(msg.chat.id, `<b>Well, that's disgraceful. Go tell Zee it crashed.</b>.`, { parse_mode: 'HTML' });
            }
        });
    } else {
        let message = `Really ${msg.from.username || msg.from.first_name}??? ${amount} is not a valid number.`;
        bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
    }
});

// forex_gbp command
bot.onText(/^\/forex_gbp (.+)$/, function (msg, match) {
    var amount = match[1];
    if (utils.isCurrency(amount)) {
        utils.getExchangeRate(amount, 'GBP', function (err, message) {
            if (!err) {
                bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
            } else {
                bot.sendMessage(msg.chat.id, `<b>Well, that's disgraceful. Go tell Zee it crashed.</b>.`, { parse_mode: 'HTML' });
            }
        });
    } else {
        let message = `Really ${msg.from.username || msg.from.first_name}??? ${amount} is not a valid number.`;
        bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
    }
});

// forex_eur command
bot.onText(/^\/forex_eur (.+)$/, function (msg, match) {
    var amount = match[1];
    if (utils.isCurrency(amount)) {
        utils.getExchangeRate(amount, 'EUR', function (err, message) {
            if (!err) {
                bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
            } else {
                bot.sendMessage(msg.chat.id, `<b>Well, that's disgraceful. Go tell Zee it crashed.</b>.`, { parse_mode: 'HTML' });
            }
        });
    } else {
        let message = `Really ${msg.from.username || msg.from.first_name}??? ${amount} is not a valid number.`;
        bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
    }
});

// game_rating command
bot.onText(/^\/game_rating (.+)$/, function (msg, match) {
    var game = match[1];

    utils.getIGNRating(game.trim(), function (result) {
        if (result.status == 200 && result.body.message == "result not found" && result.body.possibleChoices.length) {
            var options = {
                keyboard: [],
                one_time_keyboard: true,
                parse_mode: 'HTML'
            }
            for (let i = 0; i < result.body.possibleChoices.length; i++) {
                options.keyboard.push([result.body.possibleChoices[i]]);
                if (i === 3) { break; }
            }
            bot.sendMessage(msg.chat.id, `Hmmm...these are the closest matches i could find. Choose one...`, options).then(() => {
                bot.onReplyToMessage(msg.chat.id, msg.chat.message_id, (data) => {
                    console.log('Reply Data', data);
                });
            });
        } else if (result.status == 200 && result.body.result) {
            var message = `<b>${utils.toTitleCase(result.body.result.name) }</b> ${utils.createPrettyCSV(result.body.result.availablePlatform, ', available on ') } ${utils.showRating(result.body.result.ign, result.body.result.metacritic) }`;
            bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
        } else {
            bot.sendMessage(msg.chat.id, '<b>Something terrible happened. Tell Zee.</b>', { parse_mode: 'HTML' });
        }
    });
});

module.exports = bot;