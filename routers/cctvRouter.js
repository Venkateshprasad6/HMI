/**
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted or assigned
 * without the prior written authorization of CENTUM T&S.
 */

const express = require('express');
const router = express.Router();
require('../services/WSLiveStream'); 

// Serve the CCTV page
router.get('/', async (req, res) => {
  res.render('pages/cctvPage', {
    title: 'CCTV',
    script: '',
    clientWSScript: 'DDRWebInterface',
    activeCCTV: 'active-top',
  });
});


// Export the router and the server
module.exports = router;