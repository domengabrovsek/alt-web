'use strict';

const parse = ($) => {

  try {
    let appHeader = $('#appHeader');

    let title = appHeader.find('h1').text().replace(/\r?\n|\r/g, '').toString();
    let description = appHeader.find('.lead').text().replace(/\r?\n|\r/g, '').toString();
    let noOfLikes = appHeader.find('.like-box > .num').text().toString();
    let overview = $('.item-desc > p')[0].children.map(element => element.data).join(" ").replace(/\s\s+/g, ' ').toString();
    let features = Array.from($('p >.label-feature').map((index, element) => element.firstChild.data)).toString();
    let categories = Array.from($('p > .label-default').filter((index, element) => element.name === 'a').map((index, element) => element.firstChild.data)).toString();
    let alternatives = Array.from($('.app-list-item h3 > a').map((index, element) => element.firstChild.data)).toString();
    let platforms = Array.from($('.labels > li').map((index, element) => element.firstChild.data)).toString();
    let tags = Array.from($('p > .label-default').filter((index, element) => element.name === 'span').map((index, element) => element.firstChild.data)).toString();
    let website = $('.icon-official-website')[0].attribs.href.toString();

    let result = {
      title,
      query: title.split(' ').join('-').toLowerCase(),
      website,
      description,
      noOfLikes,
      overview,
      features,
      categories,
      alternatives,
      platforms,
      tags
    }

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  parse
};
