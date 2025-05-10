/**
 * (C) Copyright CENTUM T&S 2023. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted or assigned
 * without the prior written authorization of CENTUM T&S.
 */

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('pages/isolationPage', {
    title: 'isolation',
    script: 'isolation',
    activeSettings: 'active',
  });
});

module.exports = router;
