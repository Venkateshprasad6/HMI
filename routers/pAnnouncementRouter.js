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
  PAS_ANNOUNCEMENT_ACTIVE,
  PAS_ANNOUNCEMENT_REQUEST_V1,
  PAS_ANNOUNCEMENT_REQUEST_V3
} = require('../constant/globalDDRVariables');

const TXT_PA_REQUEST = 'pa-request';

/**
 * @route GET /
 * @description Serve the CTC Call page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/', async (req, res) => {
  res.json({ message: 'PA Call page.' });
});

// Route to handle line selection updates
router.post('/', async (req, res) => {
  try {
    console.log('req.body', req.body);
    // Validate request body
    if (!req.body || !req.body.status) {
      throw new Error('Invalid request body or status missing.');
    }

    const { status } = req.body;
    console.log('status', status);

  // Get IDENTIFICATION_VEHICLE_ID
    const IDENTIFICATION_VEHICLE_ID = await getVariableValue(DDR_IDENTIFICATION_VEHICLE_ID);
    console.log('IDENTIFICATION_VEHICLE_ID:', IDENTIFICATION_VEHICLE_ID);

    const PAS_Announcement_Request_Vehicle =
      IDENTIFICATION_VEHICLE_ID == 1
        ? PAS_ANNOUNCEMENT_REQUEST_V1
        : PAS_ANNOUNCEMENT_REQUEST_V3;
    console.log("PAS_Announcement_Request_Vehicle", PAS_Announcement_Request_Vehicle);
    if(status === TXT_PA_REQUEST) {
    await webDDR.setVariableValue(PAS_Announcement_Request_Vehicle, true);
    } else {
    await webDDR.setVariableValue(PAS_Announcement_Request_Vehicle, false)
  }
    res.status(200).json({ message: 'successful: PA - Announcement.' });
  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).json({ error: 'Failed: PA - Announcement.' });
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
