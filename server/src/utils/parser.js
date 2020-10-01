'use strict';

const parse = ($) => {

  const appHeader = $('#appHeader');

  const title = appHeader.find('h1').text().replace(/\r?\n|\r/g, '').toString();
  const description = appHeader.find('.lead').text().replace(/\r?\n|\r/g, '').toString();
  const noOfLikes = appHeader.find('.like-box > .num').text().toString();
  const overview = $('.item-desc > p')[0].children.map(element => element.data).join(" ").replace(/\s\s+/g, ' ').toString();
  const features = Array.from($('p >.label-feature').map((index, element) => element.firstChild.data)).toString();
  const categories = Array.from($('p > .label-default').filter((index, element) => element.name === 'a').map((index, element) => element.firstChild.data)).toString();
  const alternatives = Array.from($('.app-list-item h3 > a').map((index, element) => element.firstChild.data)).toString();
  const platforms = Array.from($('.labels > li').map((index, element) => element.firstChild.data)).toString();
  const tags = Array.from($('p > .label-default').filter((index, element) => element.name === 'span').map((index, element) => element.firstChild.data)).toString();
  const website = $('.icon-official-website')[0].attribs.href.toString();

  const result = {
    title,
    website,
    description,
    noOfLikes,
    overview,
    features,
    categories,
    alternatives,
    platforms,
    tags
  };

  return result;
};

module.exports = {
  parse
};
