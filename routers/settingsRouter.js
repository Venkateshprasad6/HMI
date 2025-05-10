/**
 * @file settingRoute.js
 * @brief router call for setting page.
 *
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted or assigned
 * without the prior written authorization of CENTUM T&S.
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const {volumeRangeArray, cabinSpeakerRangeArray} = require('../constant/variable');
const { webDDR } = require('../services/mainDDRConfig');
const {
  PAS_CABIN_SPEAKERS_VOLUME, PAS_INTERNAL_SPEAKERS_VOLUME, PAS_EXTERNAL_SPEAKERS_VOLUME, PAS_INTERNAL_AMBIENT_SPEAKERS_VOLUME
} = require('../constant/globalDDRVariables');

// File Declaration path
const localDbFilePath = 'public/data/localDatabase.json';

// Checking file is exists or Not
if (!fs.existsSync(localDbFilePath)) {
  fs.writeFileSync('public/data/localDatabase.json', JSON.stringify(defaultSetting));
}
const updateLocalDB = async (key, value) => {
  try {
    // Read the existing data from the file
    const readDataFromFile = fs.readFileSync(localDbFilePath, 'utf8');
    const jsonObject = JSON.parse(readDataFromFile);
    // Update the existing JSON object with the new value
    jsonObject[key] = value;
    const updatedJsonObj = JSON.stringify(jsonObject, null, 2);

    await new Promise((resolve, reject) => {
      fs.writeFile(localDbFilePath, updatedJsonObj, 'utf8', (err) => {
        if (err) {
          reject(err); 
        } else {
          console.log(`File has been updated for ${key}`);
          resolve(); // Resolve the promise if successful
        }
      });
    });
  } catch (err) {
    console.log("Error while updating the file:", err);
    throw err;
  }
};

// Get- Router Call
router.get('/', async (req, res) => {
  res.render('pages/settingsPage', {
    title: 'Settings',
    script: 'settingHandler',
    clientWSScript: 'DDRWebInterface',
    activeSettings: 'active',
    range: volumeRangeArray.VolumeOptionValues, // Pass available option values to the view
    cabinValueRange: cabinSpeakerRangeArray.VolumeOptionValues,
    message:req.flash('message'),
  });
});

router.post('/internal', async (req, res) => {
  try {
    const internalspeakerName = Object.keys(req.body)[0];
    const internalspeakerVol = +req.body.internalSpeaker;
    await webDDR.setVariableValue(PAS_INTERNAL_SPEAKERS_VOLUME, internalspeakerVol);
    await updateLocalDB(internalspeakerName, internalspeakerVol);
    res.json({success:"Success: Internal Speaker Volume Set...!!!"});
  }catch(err) {
    console.log("Error", err);
    res.json({error:"Failed: Setting Internal speaker volume unsuccessful."});
  }
});

router.post('/cabin', async (req, res) => {
  try {
    const cabinSpeakerName = Object.keys(req.body)[0];
    const cabinSpeakerVol = +req.body.cabinSpeaker;
    await webDDR.setVariableValue(PAS_CABIN_SPEAKERS_VOLUME, cabinSpeakerVol);
    await updateLocalDB(cabinSpeakerName, cabinSpeakerVol);
    res.json({ success: 'Success: Cabin Speaker Volume Set...!!!' });
  } catch (err) {
    console.log('Error', err);
    res.json({ error: 'Failed: Setting cabin speaker volume unsuccessful.' });
  }
});

router.post('/external', async (req, res) => {
  try {
    const externalSpeakerName = Object.keys(req.body)[0];
    const externalSpeakerVol = +req.body.externalSpeaker;
    await webDDR.setVariableValue(PAS_EXTERNAL_SPEAKERS_VOLUME, externalSpeakerVol);
    await updateLocalDB(externalSpeakerName, externalSpeakerVol);
    res.json({ success: 'Success: External Speaker Volume Set...!!!' });
  } catch (err) {
    console.log('Error', err);
    res.json({ error: 'Failed: Setting external speaker volume unsuccessful.' });
  }
});

router.post('/combinedVol', async (req, res) => {
  try {
    const combinedSpeakerVol = +req.body.combinedSpeaker; 
    
    await webDDR.setVariableValue(PAS_INTERNAL_SPEAKERS_VOLUME, combinedSpeakerVol);
    await updateLocalDB('internalSpeaker', combinedSpeakerVol);

    await webDDR.setVariableValue(PAS_EXTERNAL_SPEAKERS_VOLUME, combinedSpeakerVol);
    await updateLocalDB('externalSpeaker', combinedSpeakerVol);

    await updateLocalDB('combinedSpeaker', combinedSpeakerVol);

    res.json({ 
      combinedSpeakerVol,
      success: 'Success: Speaker Volume Set...!!!'
    });
  } catch (err) {
    console.log('Error', err);
    res.json({ error: 'Failed: Setting speaker volume unsuccessful.' });
  }
});


// POST - Update AVC state
router.post('/avc', async (req, res) => {
  try {
    const avcEnabled = req.body.avcEnabled;
    if (avcEnabled) {
      await webDDR.setVariableValue(PAS_INTERNAL_AMBIENT_SPEAKERS_VOLUME, true);
      res.json({ success: 'Success: AVC is ON.' });
    } else {
      await webDDR.setVariableValue(PAS_INTERNAL_AMBIENT_SPEAKERS_VOLUME, false);
      res.json({ success: 'Success: AVC is OFF.' });
    }
  } catch (err) {
    console.log('Error', err);
    res.json({ error: 'Failed: Setting AVC unsuccessful.' });
  }
});

module.exports = router;