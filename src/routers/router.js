'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const { parse } = require('../parser');

router.get('/websites/:search', async(req, res) => {

    console.log('Request received for:', req.params.search);

    try {
        const searchQuery = req.params.search.includes('.com') 
            ? req.params.search
            : `${req.params.search}.com`;

        const uri = `https://www.similarsitesearch.com/search/`;
        const options = {
            uri: uri,
            qs: {
                URL:searchQuery
            },
            transform: function (body) {
                return cheerio.load(body);
            }
        };
    
        rp(options).then($ => {
            const objects = parse($, searchQuery);
            res.send(objects);
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
});

module.exports = router;