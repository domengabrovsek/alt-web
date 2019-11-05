'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const { parse } = require('../parser');
const { saveToDb } = require('../db/db-helpers');

router.get('/websites/:search', async(req, res) => {

    console.log(`Request received for: ${req.params.search}`);

    try {
        const options = {
            uri: `https://www.similarsitesearch.com/search/`,
            qs: { URL: req.params.search },
            transform: function (body) { return cheerio.load(body); }
        };
    
        // first get results for provided search query then for each result repeat the same
        rp(options).then(async($) => {
            // parse useful data from static website, cheerio and some regex magic is used here
            const objects = parse($, searchQuery);
            await saveToDb(objects);

            // normalize all urls, get rid of 'http://www'
            const websites = objects.map(object => object.website.replace(/http:\/\//, '').replace(/www\./, ''));

            // for each result fetch new results
            for(let website of websites) {
                options.qs.URL = website;
                rp(options).then(async($) => {
                    const objects = parse($, website);
                    await saveToDb(objects);
                    numberOfPages += objects.length;
                });
            }

            res.send(`Success!`);
            console.log(`Request for: ${req.params.search} was successful.`);
        }).catch(error => {
            console.log('Something went wrong. Please try again.');
            console.log(error);
            res.status(400).send('Something went wrong. Please try again.');
        }); 
        
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }

    // because it makes testing in terminal much easier and more readable
    console.log('\n\n ----------------- NEW REQUEST ----------------- \n\n');
});

module.exports = router;