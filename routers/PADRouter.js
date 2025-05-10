/**
* @file PADRouter.js
* @brief Router call for the PA page.
*
* This module defines the routes related to PA calls and renders the PA call page.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express');
const router = express.Router();
const { HMI_CMD_PEI_ALLRESET, PAS_EmergencyCallAccepted, ddrFaultVariables, ddrLostVariables, ddrStatusVariable, ddrPEICallVariables } = require('../constant/padDDRVariable');
const { webDDR } = require('../services/mainDDRConfig');

/**
* Fetches the value of a specified DDR variable asynchronously.
*/
const getCurrentDDRNameValue = async (variableName) => {
  return new Promise((resolve, reject) => {
    webDDR.getVariableValue(variableName, (variableValue) => {
      resolve(variableValue);
    });
  });
};

router.get('/', async (req, res) => {
  res.render('pages/PADPage', {
    title: 'PAD',
    script: 'padHandler',
    clientWSScript: 'DDRWebInterface',
    activePAD: 'active-top',
    ddrFaults: ddrFaultVariables,
    ddrLosts: ddrLostVariables,
    ddrPADStatus: ddrStatusVariable,
    ddrPEICall: ddrPEICallVariables
  });
});


// POST
router.post('/', async (req, res) => {
  try {
    const { PEIcallStatus, PEIcallRequested, resetAllDDRname } = req.body;

    if (resetAllDDRname) {
      await webDDR.setVariableValue(HMI_CMD_PEI_ALLRESET, true);
      return res.json({ success: 'Success: Reset All.' });
    }

    if(PEIcallStatus) {
      const currentPEIState = await getCurrentDDRNameValue(PEIcallStatus);
      if (currentPEIState.value === 'REQUESTED') {
        await Promise.all([
          webDDR.setVariableValue(PEIcallRequested, true),
         setTimeout(async () => {
          await webDDR.setVariableValue(PAS_EmergencyCallAccepted, true);
          }, 500)
        ]);
        return res.json({ success: 'Success: Call Connected.' });
      } else if(currentPEIState.value === 'INPROGRESS') {
        await Promise.all([
          webDDR.setVariableValue(PEIcallRequested, false),
          webDDR.setVariableValue(PAS_EmergencyCallAccepted, false)
        ]);
        return res.json({ success: 'Success: Call Ended.' });
      }
    }
    res.json({ message: "No action taken." });
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).json({ error: 'Failed: Something went wrong.' });
  }

});

module.exports = router;
