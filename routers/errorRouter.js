/**
* @file errorRouter.js
* @brief Router for handling error pages.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express'); // Import the Express library
const router = express.Router(); // Create a new router instance

/**
 * @route GET /
 * @description Serve the error page for 404 Not Found
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/', (req, res) => {
  res.render('pages/errorPage', { // Render the error page
    statusCode: '404', // Set the status code for the error
    message: 'Page Not Found', // Message to display on the error page
    layout: 'main', // Specify the layout to be used for the page
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
