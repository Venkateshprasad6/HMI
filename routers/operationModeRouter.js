/**
 * @file OperationModeRouter.js
 * @brief Router for managing OperationModeRouter to set Automatic or Manual Mode.
 *
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted, or assigned
 * without the prior written authorization of CENTUM T&S.
 */

const express = require('express');
const router = express.Router();
const { HMI_CMD_OPERATION_MODE } = require('../constant/globalDDRVariables');
const { webDDR, getVariableValue } = require('../services/mainDDRConfig');

//constand declaretion
const TXT_AUTOMATIC = 'automatic';
const TXT_MANUAL = 'manual';

// GET - Route for rendering the Operation Mode page
router.get('/', async (req, res) => {
  const isAutoActive = await getVariableValue(HMI_CMD_OPERATION_MODE);
  res.render('pages/operationModePage', {
    title: 'Operation Mode',
    script: 'operationMode',
    clientWSScript: 'DDRWebInterface',
    activeOperation: 'active',
    automaticMode: 'AUTOMATIC MODE',
    manualMode: 'MANUAL MODE',
    typeAutomatic: 'automatic',
    typeManual: 'manual',
    isAutoActive:isAutoActive
  });
});

router.post('/', async (req, res) => {
  const { modeType } = req.body;
  try {
    const type = modeType === TXT_AUTOMATIC ? false : true;
    await webDDR.setVariableValue(HMI_CMD_OPERATION_MODE, type);

    // Send success response if the operation is successful
    res.status(200).json({ success: true, type: modeType, message: `${modeType} mode set successfully.` });
  } catch (e) {
    // Handle errors and send an error response
    console.error('Error setting operation mode:', error);
    res
      .status(500)
      .json({
        success: false,
        message: 'Failed to set operation mode.',
      });
  }

});

// Export the router for use in the main application
module.exports = router;
