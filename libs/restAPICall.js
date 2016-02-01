'use strict';

// Node Module Dependency
const unirest = require('unirest');

exports.get = (url, headers, callb) => {
    unirest.get(url)
        .headers(headers)
        .end(function (result) {
            callb(result);
        });
}