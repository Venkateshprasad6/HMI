/**
* @file StationRoute.js
* @brief Router for managing the Station page related to train stations.
*
* This module handles GET requests to render the station page, 
* which displays information about the current station, next station, 
* door statuses, and options for announcements. It prepares the data 
* necessary for the view and specifies the appropriate script to be 
* included in the rendered page.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express');
const router = express.Router();
const {webDDR} = require('../services/mainDDRConfig');
const {
  LMT_CURRENT_STATION_SHORT_NAME,
  LMT_NEXT_STATION_SHORT_NAME,
  HMI_CMD_DOOR_OPEN_SIDE_LEFT,
  HMI_CMD_DOOR_OPEN_SIDE_RIGHT,
  HMI_CMD_STATION_TRIGGER_CODE_ID
} = require("../constant/globalDDRVariables");


//constant variables
const TXT_TRAIN_DOOR_STATUS = "DoorIndication";
const TXT_ACTIVE_STATION_ANNOUNCEMENT = "Announcement";

/**
* @function renderStationPage
* @brief Renders the station page with necessary data.
*/
router.get('/', async (req, res) => {
  res.render('pages/stationPage', {
    title: 'Station',
    script: 'stationTabHandler',
    clientWSScript: 'DDRWebInterface',
    activeStation: 'active',
    LMTCurrentStationShortName: LMT_CURRENT_STATION_SHORT_NAME,
    LMTNextStationShortName: LMT_NEXT_STATION_SHORT_NAME,
    leftDoor: "LEFT",
    bothDoor: "BOTH",
    rightDoor: "RIGHT",
    departureMsgPlay: "DEPARTURE",
    approachMsgPlay: "APPROACH",
    arrivalAnnouncement: "ARRIVAL",
    stopAnnouncement: "STOP",
    DDRNameDoorOpenLeft:HMI_CMD_DOOR_OPEN_SIDE_LEFT,
    DDRNameDoorOpenRight:HMI_CMD_DOOR_OPEN_SIDE_RIGHT,
    DDRNameStationTriggerCodeID:HMI_CMD_STATION_TRIGGER_CODE_ID,
  });
});

// BACK-END POST CALL FOR THE DOOR-INDICATION & STATION-ANNOUNCEMENT
router.post("/", async (req, res) => {
 const { type, ddrName, ddrValue } = req.body;
 try {
   if (type === TXT_TRAIN_DOOR_STATUS) {
     await webDDR.setVariableValue(ddrName, ddrValue);
     res.status(200).json({
       message: " Door Indication  updated!",
     });
   } else if (type === TXT_ACTIVE_STATION_ANNOUNCEMENT) {
     await webDDR.setVariableValue(ddrName, ddrValue);
     res.status(200).json({
       message: " Station announcement updated!",
     });
   }
 } catch (err) {
   res.status(500).json({ message: "Error!" });
 }
});

module.exports = router;
