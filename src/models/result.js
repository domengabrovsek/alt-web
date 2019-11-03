'use strict';

const resultSchema = new mongoose.Schema({
    search: {},
    title: {},
    description: {},
    website: {},
    categories: [{
        category: {}
    }],
    similarity: {},
    popularity: {},
    language: {},
    location: {},
    matchingTags: [{
        tag: {}
    }],
    rating: {},
    votes: {}
});

// create model for Result
const Result = mongoose.model('Result', resultSchema);

module.exports = Result;