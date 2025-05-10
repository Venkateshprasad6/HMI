/**
 * @file padHandler.js
* 
* (C) Copyright Centum T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, 
* or assigned without the prior written authorization of CENTUM T&S.
*/

// DOM Selector: holds all selectors for various UI elements related to train and station selection
const selectorTabs = {
  padList: '#padListSelection',
  padButtonList: '#padListSelection button',
  resetAll: '#resetAll',
}

//constant 
const UMC_CAllPEIRst = 'UMC_CAllPEIRst';

// DOM Elements: Select elements based on provided selectors
const padList = document.querySelector(selectorTabs.padList);
const padButtonList = document.querySelectorAll(selectorTabs.padButtonList);
const resetAllBtn = document.querySelector(selectorTabs.resetAll);


/** 
 * @param {Object} result - The result object containing the message to display.
 * @param {string} [result.success] - The success message to display, if available.
 * @param {string} [result.error] - The error message to display, if available.
*/
const showMessageAlert = (result) => {

  if (result.success) {
    // Display a success message
    statusAlert.innerText = result.success;
    statusAlert.classList.remove('alert-error');
    statusAlert.classList.add('alert-success');
  } else if (result.error) {
    // Display an error message
    statusAlert.innerText = result.error;
    statusAlert.classList.add('alert-error');
    statusAlert.classList.remove('alert-success');
  }

  // Ensure the alert is visible
  statusAlert.style.display = 'block';

  // Hide the alert after 2000 milliseconds
 setTimeout(() => {
    statusAlert.style.display = 'none';
  }, 2000);
} 


/**
 * @function postJSON
 * @description Sends a POST request with JSON data to the backend server.
 * @param {Object} data - The data to be sent in the POST request body.
 * @returns {Promise<void>} - Redirects to '/trainStatus' on success.
 */
async function postJSON(data) {
  try {
    const response = await fetch('/pad', {
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

const resetALLPEI = () => {
    postJSON({'resetAllDDRname': UMC_CAllPEIRst})
}

//PEI-PEIcallInitiat
const PEIcallInitiat = (event) => {
  if(event.target.nodeName === 'BUTTON') {
    const { ddrstatusid, peicall} = event.target.dataset;
    postJSON({'PEIcallStatus':ddrstatusid, 'PEIcallRequested' :peicall});
  }
}

// Attach event listeners to various DOM elements for user interactions
padList.addEventListener('click', PEIcallInitiat);
resetAllBtn.addEventListener('click', resetALLPEI);

// Function to handle beforeunload
const handleBeforeUnload = () => {
  cleanUp(); // Ensure other listeners are cleaned up too
};

/**
 * @function cleanUp
 * @description Removes all event listeners to prevent memory leaks when the page is closed or refreshed.
 */
const cleanUp = () => {
  resetAllBtn.removeEventListener('click', resetALLPEI);
  window.removeEventListener('beforeunload', handleBeforeUnload); 
};

// Add the beforeunload listener
window.removeEventListener('beforeunload', handleBeforeUnload);