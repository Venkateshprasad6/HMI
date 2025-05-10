/**
* @file trainStatusRoute.js
* @brief Router for managing the train status information page.
*
* This module handles GET requests to render the train status page,
* which provides information about the current and next stations,
* as well as any stations to be skipped. It prepares the necessary
* data for the view and specifies the appropriate script to be
* included in the rendered page.
*
* (C) Copyright Centum T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express');
const router = express.Router();
const {
  LMT_LOCALTIME,
  LMT_OP_TRAIN_NUMBER,
  LMT_OP_MISSION_NAME,
  LMT_MISSION_ID,
  LMT_OP_LINE_ID,
  LMT_OP_CURRENT_STATION_NAME,
  LMT_OP_NEXT_STATION_NAME,
  LMT_OP_NEXT_SKIP_STATION_NAME,
  UMC_CONSOLE_RAKEID,
  HMI_CMD_OPERATION_MODE
} = require('../constant/globalDDRVariables');
const { webDDR } = require('../services/mainDDRConfig');

//constand declaretion
const TXT_AUTOMATIC = 'automatic';


router.get('/', async (req, res) => {
  res.render('pages/trainStatusPage', {
    title: 'Train Status',
    script: 'trainStatusHandler',
    clientWSScript: 'DDRWebInterface',
    activeTrainStatus: 'active',
    LMTTrainNumber:LMT_OP_TRAIN_NUMBER,
    LMTMissionName:LMT_OP_MISSION_NAME,
    LMTLineID:LMT_MISSION_ID,
    LMTCurrentStationName:LMT_OP_CURRENT_STATION_NAME,
    LMTNextStationName:LMT_OP_NEXT_STATION_NAME,
    LMTNextSkipStationName:LMT_OP_NEXT_SKIP_STATION_NAME,
    DDRRackID:UMC_CONSOLE_RAKEID,
    LMT_LOCALTIME:LMT_LOCALTIME,
    automaticMode: 'AUTOMATIC MODE',
    manualMode: 'MANUAL MODE',
    typeAutomatic: 'automatic',
    typeManual: 'manual',
    operationMode: HMI_CMD_OPERATION_MODE,
  });
});

router.post('/', async (req, res) => {
  const { modeType } = req.body;
  try {
    const type = modeType === TXT_AUTOMATIC ? false : true;
    await webDDR.setVariableValue(HMI_CMD_OPERATION_MODE, type);

    // Send success response if the operation is successful
    res.status(200).json({ 
      success: true, type: modeType, message: `${modeType} mode set successfully.` 
    });
  } catch (e) {
    // Handle errors and send an error response
    console.error('Error setting operation mode:', error);
    res.status(500).json({
      success: false,
        message: 'Failed to set operation mode.',
      });
  }

});

module.exports = router;
