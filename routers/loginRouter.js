/**
* @file loginRoute.js
* @brief Router call for the login page.
*
* This module defines the routes related to user authentication,
* specifically rendering the login page.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express');
const router = express.Router();
const { LOGIN_SECURITY_PIN } = require('../constant/globalDDRVariables');
const { getVariableValue } = require('../services/mainDDRConfig');


// Route to serve the login page
router.get('/', async (req, res) => {
  res.render('pages/loginPage', {
    title: 'Login-HMI',
    script: 'userLogin',
    layout: 'index',
    activeLogin: 'active',
  });
});

// Route to handle login form submission
router.post('/', async (req, res) => {
  const enteredPin = +req.body.passCode; 
  //console.log(enteredPin);
  const PASS_CODE = await getVariableValue(LOGIN_SECURITY_PIN);

  // Check if the entered PIN matches the predefined PIN
  if (enteredPin === PASS_CODE) {
    // Successful login
    res.status(200).json({ message: 'Login successful!' });
  } else {
    // Invalid PIN
    res.status(401).json({ message: 'Invalid PIN. Please try again.' });
  }
});

// Export the router for use in the main application
module.exports = router;
