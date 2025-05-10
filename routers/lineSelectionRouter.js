/**
* @file lineSelectionRoute.js
* @brief Router call for the Line Selection page.
*
* This module defines the routes related to the Line Selection page,
* including rendering the page and handling line selection updates.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express');
const router = express.Router();
const runClientRequest = require('../zeroMQ/getLMTClientRequest');
const { webDDR, getVariableValue } = require('../services/mainDDRConfig');
const {
  LMT_OP_LINE_ID,
  LMT_OP_TRAIN_NUMBER,
  LMT_OP_ORIGIN_STATION_NAME,
  LMT_OP_CURRENT_STATION_NAME,
  LMT_OP_DESTINATION_STATION_NAME,
  HMI_CONSOLE_MISSION_INITIALIZED,
} = require('../constant/globalDDRVariables');

async function fetchLineListFromLMT() {
  try {
    const { lineList } = await runClientRequest(
      global.protobufRoot,
      'GetLineList_Request',
      'GetLineList_Response',
      { languageCode: 'eng' },
      'GetLineList'
    );
    return lineList;
  } catch (error) {
    console.log(error);
  }
}

async function fetchStationListFromLMT(paramID) {
  try {
    const { stationList } = await runClientRequest(
      global.protobufRoot,
      'GetStationList_Request',
      'GetStationList_Response',
      { missionId: paramID, languageCode: 'eng' },
      'GetStationList'
    );
    return stationList;
  } catch (error) {
    console.log(error);
  }
}

const setDDRVariableValues = async (gName, gValue) => {
  try {
    return await webDDR.setVariableValue(gName, gValue);
  } catch (error) {
    throw new AppError(
      INTERNAL_SERVER_ERR,
      "Unable to connect to WebDDR Server. "
    );
  }
};

// Route to serve the Line Selection page
router.get('/', async (req, res) => {
  const listSelectionList = await fetchLineListFromLMT();
  const missionState = await getVariableValue(HMI_CONSOLE_MISSION_INITIALIZED);
  res.render('pages/lineSelectionPage', {
    title: 'Line Selection',
    script: 'lineSelectionHandler',
    clientWSScript: 'DDRWebInterface',
    lineSelection: listSelectionList,
    activeLineSelecton: 'active',
    isMissionActive: missionState,
    LMT_OP_TRAIN_NUMBER: LMT_OP_TRAIN_NUMBER,
    LMT_OP_LINE_ID: LMT_OP_LINE_ID,
    LMT_OP_ORIGIN_STATION_NAME: LMT_OP_ORIGIN_STATION_NAME,
    LMT_OP_CURRENT_STATION_NAME: LMT_OP_CURRENT_STATION_NAME,
    LMT_OP_DESTINATION_STATION_NAME: LMT_OP_DESTINATION_STATION_NAME,
  });
});

// Route to handle line selection updates
router.post('/', async (req, res) => {
  try {
    //console.log("req.body", req.body);
    if (req.body.lineID) {
      const lineID = req.body.lineID;
      const stationList = await fetchStationListFromLMT(lineID);
      return res.json({ stationList });
    } 
    
    Object.entries(req.body).forEach(([key, value]) => {
      setDDRVariableValues(key, value);
    });
    
    const responseMessage = (() => {
      if (req.body.HMI_CFirstStation) {
        return 'Success! Please set the current station.';
      } else if (req.body.HMI_CCurrentStation) {
        return 'Success! Mission started successfully.';
      }
      return 'Success! Mission stopped successfully.';
    })();
    
    res.status(200).json({ success: responseMessage });
    
  } catch (err) {
    console.log("Error", err);
    res.json({ error: "Failed: line selection unsuccessful." });
  }
});

module.exports = router;
