/**
* @file networkConnectionRouter.js
* @brief Router call for the network connection page.
*
* This module defines the route for rendering the network connection page,
* which provides information about the current network status and 
* loading indicators for the CMRL application.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express');
const router = express.Router();

// Route to render the network connection page
router.get('/', async (req, res) => {
  res.render('pages/welcomePage', {
    title: 'Welcome to CMRL',         // Title of the page
    layout: 'index',               // Layout template to be used
    script: 'welcomeScreen', // JavaScript file for network configuration
    welcomeTitle: 'Welcome to CMRL', // Welcome message displayed on the page
  });
});

// Export the router for use in the main application
module.exports = router;
