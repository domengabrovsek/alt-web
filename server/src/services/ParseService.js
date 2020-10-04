'use strict';

module.exports = class ParseService {

  ParseAlternatives($) {
    const prefix = 'https://alternativeto.net/';
    const website = $('.alternatives-header').text().match(/(?<=to)(.*?)(?=for)/)[0].trim();
    const alternatives = $('.app-list-item h3 > a')
      // filter out sponsored links which have "outgoing" in url
      .filter((index, element) => !element.attribs.href.includes("/outgoing/"))
      .map((index, element) => ({
        website: website,
        name: element.firstChild.data,
        url: `${prefix}${element.attribs.href}`
      }));

    return Array.from(alternatives);
  }

  Parse = ($) => {

    const appHeader = $('#appHeader');

    const title = appHeader.find('h1').text().replace(/\r?\n|\r/g, '').toString();
    const description = appHeader.find('.lead').text().replace(/\r?\n|\r/g, '').toString();
    const noOfLikes = appHeader.find('.like-box > .num').text().toString();
    const overview = $('.item-desc > p')[0].children.map(element => element.data).join(" ").replace(/\s\s+/g, ' ').toString();
    const features = Array.from($('p >.label-feature').map((index, element) => element.firstChild.data)).toString();
    const categories = Array.from($('p > .label-default').filter((index, element) => element.name === 'a').map((index, element) => element.firstChild.data)).toString();
    const alternatives = parseAlternatives($);
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
}
