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

            const objects = [];

            $('.res_item').each((i, element) => {

                const title = $(element).find('.restitle').text();
                const description = $(element).find('.res_desc').text();
                const website = $(element).find('.res_main_bottom').text();
                const categories = $(element).find('.res_similarity')
                    .first()
                    .text()
                    .replace('Site Category: ', '')
                    .split('/')
                    .map(x => x.trim());
                const similarity = $(element).find('.res_similarity')
                    .eq(1)
                    .html()
                    .match(/[0-9]{0,2}%/)[0];
                const popularity = $(element).find('.res_similarity')
                    .eq(1)
                    .html()
                    .match(/is very high|is high|is medium|is low|is very low/)[0]
                const languageLocation = $(element).find('.res_similarity')
                    .eq(1)
                    .html()
                    .match(/<font color="\#[0-9]{6}\">(.*)<\/font>/g)[0]
                    .replace(/<font color=\"#424242\">/g, '')
                    .replace(/<\/font>/g, '')
                    .split('-')
                    .map(x => x.trim());
                const matchingTags = $(element).find('.res_similarity')
                    .eq(2)
                    .html()
                    .match(/(?<= Top [0-9]{1} matches are )(.*)(?=\.)/g)[0]
                    .split(',')
                    .map(x => x.trim());
                const ratingVotes = $(element).find('.ri')
                    .text()
                    .replace(/[()]+/g, '')
                    .split(',')
                    .map(x => x.trim());
                const rating = ratingVotes[0];
                const votes = ratingVotes && ratingVotes[1] && ratingVotes[1].match(/[0-9]{1,10}/g)[0];
            

                objects.push({
                    id: i,
                    search: searchQuery,
                    title: title,
                    description: description,
                    website: website,
                    categories: categories,
                    similarity: similarity,
                    popularity: popularity,
                    language: languageLocation[0],
                    location: languageLocation[1],
                    matchingTags: matchingTags,
                    rating: rating,
                    votes: votes
                });
            });

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