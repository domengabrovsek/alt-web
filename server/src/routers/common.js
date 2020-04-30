'use strict';

const express = require('express');
const cors = require('cors');
const router = new express.Router();

// status test endpoint
router.get('/status', cors(), async (req, res) => {
  console.log(`\n[GET] - '/status'.`);
  res.send('Server is working!');
});

module.exports = router;
