'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const { parse } = require('../parser');

router.get('/websites/:search', async(req, res) => {

    try {
        const searchQuery = req.params.search.includes('.com') 
            ? req.params.search
            : `${req.params.search}.com`;

        const uri = `https://www.similarsitesearch.com/alternatives-to/${searchQuery}`;
        const options = {
            uri: uri,
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
                    .match(/[0-9]{2}%/)[0];
                const popularity = $(element).find('.res_similarity')
                    .eq(1)
                    .html()
                    .match(/is very high|is high|is low/)[0];
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
                const votes = ratingVotes[1].match(/[0-9]{1,10}/g)[0];
            

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

            console.log(objects);
            res.send(objects);
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

module.exports = router;