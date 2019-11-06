'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const { parse } = require('../parser');
const { saveToDb, deleteFromDb, readFromDb } = require('../db/db-helpers');
const { saveToCsv } = require('../fs/csv-helpers');

router.get('/websites/save-to-csv', async(req, res) => {

    try {
        // get all records from db
        const data = await readFromDb();
        const columns = Object.keys(JSON.parse(JSON.stringify(data))[0]);

        await saveToCsv({ columns, data });

        res.send({ message: 'Success', noOfRecords: data.length });

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Something went wrong, try again.'});
    }
});

// delete all records from db
router.delete('/websites', async(req, res) => {

    await deleteFromDb();
    res.send();
});

// get websites
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
            const objects = parse($, req.params.search);
            await saveToDb(objects);

            // normalize all urls, get rid of 'http://www'
            const websites = objects.map(object => object.website.replace(/http:\/\//, '').replace(/www\./, ''));

            // for each result fetch new results
            for(let website of websites) {
                options.qs.URL = website;
                rp(options).then(async($) => {
                    const objects = parse($, website);
                    await saveToDb(objects);
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