'use strict';

const cheerio = require('cheerio');

function parse(html) {

    const $ = cheerio.load(html);


    // console.log($('restitle').each((i, element) => console.log($(this).text())));

    console.log($('.restitle').html());

}

module.exports = {
    parse
};

