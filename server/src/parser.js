'use strict';

const parse = ($, searchQuery) => {

    const objects = [];
    const properties = [
        'title', 
        'description', 
        'website',
        'categories',
        'similarity',
        'popularity',
        'language',
        'location',
        'matchingTags',
        'rating',
        'votes'
    ];

    // TODO try to find a better way to parse this
    // https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags?page=1&tab=votes#tab-top
    $('.res_item').each((i, element) => {
        let object = {
            search: searchQuery
        };
        properties.forEach(property => {
            object[property] = tryParseElement($, element, property);
        })
        // console.log('\n object: ', object);
        objects.push(object);
    });

    return objects;
}

const tryParseElement = ($, element, type) => {
    let result;

    try {
        switch(type) {
            case 'title':
                result = $(element).find('.restitle').text();    
                break;
            case 'description':
                result = $(element).find('.res_desc').text();
                break;
            case 'website':
                result = $(element).find('.res_main_bottom').text();
                break;
            case 'categories':
                result = $(element).find('.res_similarity').first().text().replace('Site Category: ', '').split('/').map(x => x.trim());
                break;
            case 'similarity':
                result = $(element).find('.res_similarity').eq(1).html().match(/[0-9]{0,2}%/)[0];
                break;
            case 'popularity':
                result = $(element).find('.res_similarity').eq(1).html().match(/is very high|is high|is medium|is low|is very low/)[0];
                break;
            case 'language': 
                result = $(element).find('.res_similarity').eq(1).html().match(/<font color="\#[0-9]{6}\">(.*)<\/font>/g)[0].replace(/<font color=\"#424242\">/g, '').replace(/<\/font>/g, '').split('-').map(x => x.trim())[0];
                break;
            case 'location':
                result = $(element).find('.res_similarity').eq(1).html().match(/<font color="\#[0-9]{6}\">(.*)<\/font>/g)[0].replace(/<font color=\"#424242\">/g, '').replace(/<\/font>/g, '').split('-').map(x => x.trim())[1];
                break;
            case 'matchingTags':
                result = $(element).find('.res_similarity').eq(2).html().match(/(?<= Top [0-9]{1} matches are )(.*)(?=\.)/g)[0].split(',').map(x => x.trim());
                break;
            case 'rating':
                result = $(element).find('.ri').text().replace(/[()]+/g, '').split(',').map(x => x.trim())[0];
                break;
            case 'votes':
                result = $(element).find('.ri').text().replace(/[()]+/g, '').split(',').map(x => x.trim())[1].match(/[0-9]{1,10}/g)[0];
                break;
        }

        return result;

    } catch (error) {
        return "";
    }
};

module.exports = {
    parse
};
