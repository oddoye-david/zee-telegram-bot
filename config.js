'use strict';

module.exports = {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessTokenKey: process.env.TWITTER_ACSESS_TOKEN_KEY,
    accessTokenSecret: process.env.TWITTER_ACSESS_TOKEN_SECRET,
    webHook: process.env.WEB_HOOK,
    currencyRegex: new RegExp('^\\d+(\\.\\d{1,2})?$')
}