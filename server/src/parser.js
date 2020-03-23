'use strict';

const parse = ($) => {

  let appHeader = $('#appHeader');

  let title = appHeader.find('h1').text().replace(/\r?\n|\r/g, '');
  let description = appHeader.find('.lead').text().replace(/\r?\n|\r/g, '');
  let noOfLikes = appHeader.find('.like-box > .num').text();
  let overview = $('.item-desc > p')[0].children.map(element => element.data).join(" ").replace(/\s\s+/g, ' ');
  let features = Array.from($('p >.label-feature').map((index, element) => element.firstChild.data));
  let categories = Array.from($('p > .label-default').filter((index, element) => element.name === 'a').map((index, element) => element.firstChild.data));
  let alternatives = Array.from($('.app-list-item h3 > a').map((index, element) => element.firstChild.data));
  let platforms = Array.from($('.labels > li').map((index, element) => element.firstChild.data))
  let tags = Array.from($('p > .label-default').filter((index, element) => element.name === 'span').map((index, element) => element.firstChild.data));
  let website = $('.icon-official-website')[0].attribs.href;

  let result = {
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
  }

  return result;
}

module.exports = {
  parse
};
