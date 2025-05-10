/**
* @file TrainStatusHandler.js
* @brief Management of station information display.
*
* This script fetches station data from a local JSON file and updates the
* DOM elements with the mission ID, line name, and route details when the page loads.
* 
* (C) Copyright Centum T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, 
* or assigned without the prior written authorization of CENTUM T&S.
*/


// DOM Selector
const selectorTabs = {
  modeSelector: '#OpetationMode',
  typeAutomatic: '#automatic',
  typeManual: '#manual',
  bothMode: '#OpetationMode button'
};

//constand declaretion
const TXT_AUTOMATIC = 'automatic';
const TXT_MANUAL = 'manual';

// DOM Elements: Select elements based on provided selectors
const operationMode = document.querySelector(selectorTabs.modeSelector);
const typeAutomaticBtn = document.querySelector(selectorTabs.typeAutomatic);
const typeManualBtn = document.querySelector(selectorTabs.typeManual);
const bothModeBtn = document.querySelectorAll(selectorTabs.bothMode);

// Handles key presses on the virtual keyboard
const onClickOperationModeType = (event) => {
  if (event.target.tagName === 'BUTTON') {
    const modeType = event.target.name;
    postJSON({ modeType });
    setTimeout(() => statusAlert.classList.add('d-none'), 2000)
  }
};

/**
 * @function postJSON
 * @description Sends a POST request with JSON data to the backend server.
 * @param {Object} data - The data to be sent in the POST request body.
 * @returns {Promise<void>} - Redirects to '/trainStatus' on success.
 */
async function postJSON(data) {
  try {
    const response = await fetch('/trainstatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    showMessageAlert(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * @param {Object} result - The result object containing the message to display.
 * @param {string} [result.success] - The success message to display, if available.
 * @param {string} [result.error] - The error message to display, if available.
 */
const showMessageAlert = (result) => {
  if (result.success) {
    // Display an success message
    statusAlert.innerText = result.message;
    statusAlert.classList.remove('alert-error', 'd-none');
    statusAlert.classList.add('alert-success');
    bothModeBtn.forEach(ele => ele.classList.remove('autoMode-active', 'manualMode-active'));
    result.type == TXT_AUTOMATIC ? 
    typeAutomaticBtn.classList.add('autoMode-active') :
    typeManualBtn.classList.add('manualMode-active'); 
  } else if (result.error) {
    // Display an error message
    statusAlert.innerText = result.error;
    statusAlert.classList.add('alert-error', 'd-none');
    statusAlert.classList.remove('alert-success');
  }
};

// Handles on Click Operation mode
operationMode.addEventListener('click', onClickOperationModeType);

// Function to handle beforeunload
const handleBeforeUnload = () => {
  cleanUp(); // Ensure other listeners are cleaned up too
};

/**
 * @function cleanUp
 * @description Removes all event listeners to prevent memory leaks when the page is closed or refreshed.
 */
const cleanUp = () => {
  operationMode.removeEventListener('click', onClickOperationModeType);
  window.removeEventListener('beforeunload', handleBeforeUnload); // Remove beforeunload listener
};

// Add the beforeunload listener
window.addEventListener('beforeunload', handleBeforeUnload);
