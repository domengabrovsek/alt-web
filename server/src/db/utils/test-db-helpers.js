'use strict';

const { insert, update, remove, get } = require('./db-helpers');
const Website = require('./models/website');

(async () => {
  console.log(await insert(Website, { name: 'domen_test' }));
  console.log(await get(Website, 'website_id', '14'));
  console.log(await remove(Website, 'name', 'tste'));
  console.log(await update(Website, 'name', 'domen_test', 'no_of_reviews', 5));
})();