'use strict';

// Node Module Dependencies
const moment = require('moment');
const Stream = require('user-stream');

// User Module Dependencies
const config = require('../config');

var stream = new Stream({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessTokenKey,
    access_token_secret: config.accessTokenSecret
});

var params = {
    track: ['theRealBra_Zee']
}

module.exports = (bot) => {
    stream.stream(params);

    //listen stream data
    stream.on('data', function (json) {
        if (json.quoted_status && json.in_reply_to_screen_name == 'theRealBra_Zee') {

            if (json.text.toString().indexOf('#ZeeBot') > -1) {
                var url = json.text.replace("@theRealBra_Zee", "").replace("#ZeeBot", "");
                var message = `From <b>@${json.quoted_status.user.screen_name}</b>, Quoted by <i>@${json.user.screen_name} ${moment(parseInt(json.timestamp_ms)).fromNow() }</i>:

${url}`;

                bot.sendMessage('-18752834', message, { parse_mode: 'HTML' });
            }
        }
    });
}
