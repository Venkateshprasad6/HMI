/**
 * @file self-testRouter.js
 * @brief Router call for the Check Test page.
 *
 * This module defines the route for rendering the self-test page, which
 * allows users to perform various diagnostic tests, including touch screen,
 * LED display, vertical bar, and audio tests for the system.
 *
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted or assigned
 * without the prior written authorization of CENTUM T&S.
 */

const express = require('express');
const router = express.Router();
const {
  HMI_CMD_LCDTest,
  HMI_CMD_LEDTest,
  HMI_CMD_AudioTest,
} = require('../constant/globalDDRVariables');
const { webDDR } = require('../services/mainDDRConfig');


// Route to render the self-test page
router.get('/', async (req, res) => {
  res.render('pages/selfTestPage', {
    title: 'SelfTest',
    script: 'selfTestHandler',
    clientWSScript: 'DDRWebInterface',
    activeSettings: 'active',
    touchScreenTest: 'Touch Screen Test',
    LEDTest: 'LED Display Test',
    LCDTest: 'LCD Display Test',
    audioTest: 'Audio Test',
    HMI_CMD_LCDTest: HMI_CMD_LCDTest,
    HMI_CMD_LEDTest: HMI_CMD_LEDTest,
    HMI_CMD_AudioTest: HMI_CMD_AudioTest,
  });
});

// POST
router.post('/', async (req, res) => {
  try {
    const { checkTestDDRname, type } = req.body;
    const triggerClick = type === 'Start';
   
    if (checkTestDDRname !== HMI_CMD_AudioTest) {
      if (triggerClick) {
        await webDDR.setVariableValue(checkTestDDRname, true);
        res.json({ success: 'Test operation started successfully.' });
      } else {
        await webDDR.setVariableValue(checkTestDDRname, false);
        res.json({ success: 'Test operation stopped successfully.'});
      }
    }

    if (checkTestDDRname === HMI_CMD_AudioTest) {
      if (triggerClick) {
        await webDDR.setVariableValue(checkTestDDRname, 1);
        res.json({ success: 'Audio Test started successfully.' });
      } else {
        await webDDR.setVariableValue(checkTestDDRname, 0);
        res.json({ success: 'Audio Test stopped successfully.'});
      }
    }
  } catch (err) {
    console.log('Error:', err);
    res.json({ error: 'Failed: selection failed.'});
  }
});


module.exports = router;
