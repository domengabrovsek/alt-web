'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');


router.get('/websites/:search', async(req, res) => {

    try {
        const searchQuery = req.params.search;

        const uri = `https://www.similarsitesearch.com/alternatives-to/${searchQuery}.com`;
        const options = {
            uri: uri,
            transform: function(body) {
                return cheerio.load(body);
            }
        };
    
        await rp(options).then($ => {

            let titles = [];


            titles.push($('.restitle').data(key, value));


            const object = {
                title: titles
            }

            res.send(object);

        });
        
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;