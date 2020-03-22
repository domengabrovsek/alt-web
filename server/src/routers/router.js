'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const { parse } = require('../parser');
const { get, update, insert, remove } = require('../db/db-helpers');
const { saveToCsv } = require('../fs/csv-helpers');

const website = require('../db/models/website');

// status test endpoint
router.get('/status', async(req, res) => {
    console.log(`\n[GET] - '/website/status'.`);
    res.send('Server is working!');
});

// data test endpoint
router.get('/test', async(req, res) => {
    console.log(`\n[GET] - '/website/test'.`);

    let testData = {
        data: []
    };

    for(let i = 0; i < 50; i++) {
        testData.data.push(
            { 
                id: i, 
                name: `Name ${i}`, 
                description: `Description something ${i}`,
                column1: `Column data - ${i}`,
                column2: `Column data - ${i}`,
                column3: `Column data - ${i}`,
                column4: `Column data - ${i}`,
                column5: `Column data - ${i}`,
                column6: `Column data - ${i}`,
                column7: `Column data - ${i}`,
            });
    }

    res.set("Access-Control-Allow-Origin", '*');
    res.send(testData);
});

// delete
router.delete('/website/delete', async(req, res) => {
    
    console.log(`\n[DELETE] - '/website/delete'.`);

    const result = await remove(website);

    res.send(`Removed: ${result}`);
})

// get
router.get('/website/get', async(req, res) => {

    console.log(`\n[GET] - '/website/get'.`);

    const result = await get(website);

    res.send(`Results: ${JSON.stringify(result)}`);
})

// create
router.post('/website/create', async(req, res) => {

    console.log(`\n[POST] - '/website/create'.`);

    let record = { name: 'test', rating: 15 }

    const result = await insert(website, record);

    res.send(`Created website with id: ${result.website_id}`);
})

router.get('/website/scrape', async(req, res) => {

    console.log(`\n[GET] - '/website/scrape'.`);

    const query = 'google-chrome';

    const options = {
        uri: `https://www.alternativeto.net/software/${query}`,
        transform: function (body) { return cheerio.load(body); }
    }

    function clean(object) {

        let newObject = {};

        Object.keys(object).forEach(key => {
            newObject[key] = object[key].replace(/\r?\n|\r/g, '');
        })

        return newObject;
    }

    rp(options).then(async($) => {

        let appHeader = $('#appHeader');

        let title = appHeader.find('h1').text();
        let description = appHeader.find('.lead').text();
        let noOfLikes = appHeader.find('.like-box > .num').text();
        let overview = appHeader.find('.limit > item-desc > p').text();

        let result = {
            title,
            description,
            noOfLikes,
            overview
        }


        res.send(clean(result));
    })

    
})

// save to csv
router.get('/website/save-to-csv', async(req, res) => {

})


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

    console.log(`\nRequest received for: ${req.params.search}\n`);

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
            console.log(`\nRequest for: ${req.params.search} was successful.`);
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