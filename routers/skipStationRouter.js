/**
* @file skipStationRoute.js
* @brief Router for managing the skip station page.
*
* This module handles GET requests to display the list of stations 
* that can be skipped during train operations. It renders a view 
* with the current train status and a list of skip stations, 
* allowing users to manage station skipping.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express');
const router = express.Router();
const { stationList } = require('../constant/stationList');

router.get('/', async (req, res) => {
  res.render('pages/skipStationPage', {
    title: 'Skip Station List',
    script: 'skipStationHandler',
    clientWSScript: 'DDRWebInterface',
    trainstatus: 'Active',
    skipStation: stationList,
    activeSkipstation: 'active',
  });
});

module.exports = router;
