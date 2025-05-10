/**
 * @file ctcCallRouter.js
 * @brief Router for the CTC Call page.
 *
 * This module defines the routes related to CTC Call and renders the CTC Call page.
 *
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted, or assigned
 * without the prior written authorization of CENTUM T&S.
 */

const express = require('express');
const router = express.Router();
const { webDDR, getVariableValue } = require('../services/mainDDRConfig');
const {
  DDR_IDENTIFICATION_VEHICLE_ID,
  PAS_INTERCOME_REQUEST_V1_D53,
  PAS_INTERCOME_REQUEST_V3_D54,
  PAS_INTERCOME_REQUEST,
  PAS_INTERCOME_REQUEST_ANSWERED,
  PAS_CAB_TO_CAB_ACTIVE,
} = require('../constant/globalDDRVariables');

const disconnectCTC = async () => {
  await Promise.all([
    webDDR.setVariableValue(PAS_INTERCOME_REQUEST, false),
    webDDR.setVariableValue(PAS_INTERCOME_REQUEST_V1_D53, false),
    webDDR.setVariableValue(PAS_INTERCOME_REQUEST_V3_D54, false),
    webDDR.setVariableValue(PAS_INTERCOME_REQUEST_ANSWERED, false),
    webDDR.setVariableValue(PAS_CAB_TO_CAB_ACTIVE, false),
  ]);
};

/**
 * @route GET /
 * @description Serve the CTC Call page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/', async (req, res) => {
  res.json({ message: 'CTC Call page.' });
});

/**
 * @route POST /
 * @description Handles intercom call status updates
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/', async (req, res) => {
  try {
    const { status } = req.body;

    // Fetch Identification Vehicle ID
    const IDENTIFICATION_VEHICLE_ID = await getVariableValue(
      DDR_IDENTIFICATION_VEHICLE_ID
    );

    // Determine the correct Intercom Request Variable
    const PAS_Intercom_Request_Vehicle =
      IDENTIFICATION_VEHICLE_ID == 1
        ? PAS_INTERCOME_REQUEST_V1_D53
        : PAS_INTERCOME_REQUEST_V3_D54;

    // Get current intercom request state
    const requestVehicle_Value = await getVariableValue(
      PAS_Intercom_Request_Vehicle
    );
    // Determine the correct Intercom Request Variable
    const toggle_Vehicle =
      IDENTIFICATION_VEHICLE_ID == 1
        ? PAS_INTERCOME_REQUEST_V3_D54
        : PAS_INTERCOME_REQUEST_V1_D53;

    const toggleRequestVehicle_Value = await getVariableValue(toggle_Vehicle);

    switch (status) {
      case 'call-request':
        if (!requestVehicle_Value) {
          await webDDR.setVariableValue(PAS_Intercom_Request_Vehicle, false);
          await webDDR.setVariableValue(PAS_Intercom_Request_Vehicle, true);
          await webDDR.setVariableValue(PAS_INTERCOME_REQUEST, true);
        }
        break;

      case 'call-pending':
        // Check if intercom request is active
        const intercomRequestValue = await getVariableValue(
          PAS_INTERCOME_REQUEST
        );

        if (intercomRequestValue) {
          if (!toggleRequestVehicle_Value) {
            // Same device clicked again -> cancel request
            disconnectCTC();
          } else {
            // Different device clicked -> Answer the request
            await webDDR.setVariableValue(PAS_INTERCOME_REQUEST_ANSWERED, true);
            await webDDR.setVariableValue(PAS_CAB_TO_CAB_ACTIVE, true);
          }
        }
        break;

      case 'call-active':
        // Check if the intercom request was answered
        const intercomRequestAnsweredValue = await getVariableValue(
          PAS_INTERCOME_REQUEST_ANSWERED
        );

        if (intercomRequestAnsweredValue) {
          //Call active: Resetting all intercom states
          disconnectCTC();
        }
        break;

      default:
        console.warn('Unknown status received:', status);
        break;
    }
    res.json({ message: 'Successful.' });
  } catch (err) {
    console.error('Error in handling request:', err);
    res.json({ error: 'Failed: line selection unsuccessful.' });
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
