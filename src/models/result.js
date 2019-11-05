'use strict';

const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    search: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    // TODO have to check why mongoose complains about this type when saving do database
    // categories: [{
    //     category: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     }
    // }],
    similarity: {
        type: String,
        trim: true
    },
    popularity: {
        type: String,
        trim: true
    },
    language: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    // TODO have to check why mongoose complains about this type when saving do database
    // matchingTags: [{
    //     tag: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     }
    // }],
    rating: {
        type: String,
        trim: true
    },
    votes: {
        type: String,
        trim: true
    }
});

// create unique index based on search and title fields
resultSchema.index({ "search": 1, "title": 1 }, { unique: true });

// create model for Result
const Result = mongoose.model('Result', resultSchema);

module.exports = Result;