/**
 * common.js
 * 
 * This file contains common utility functions and shared code
 * used across the entire application.
 *
 * Description:
 * - Utility functions
 * - Shared constants
 * - Common event handlers
 * 
 * Usage:
 * Include this file in your HTML to access the common functionalities.
 * 
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted, or assigned
 * without the prior written authorization of CENTUM T&S.
 */

// DOM Selector: holds all selectors for various UI elements related to train and station selection
const commonSelectorNode = {
    CTCIntercome: '#CTCIntercome',
    callState: '#callState',
    PAnnouncement: '#PAnnouncement',
    PAState: '#PAState',
}

//contants variable declaration
const TXT_PAnnouncement = 'PAnnouncement';
const TXT_CTCIntercome = 'CTCIntercome';

// DOM Elements: Select elements based on provided selectors
const CTCIntercome = document.querySelector(commonSelectorNode.CTCIntercome);
const callState = document.querySelector(commonSelectorNode.callState);
const PAnnouncement = document.querySelector(commonSelectorNode.PAnnouncement);
const PAState = document.querySelector(commonSelectorNode.PAState);


//
// POST Call implementation:
const sendPostRequest = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
    //console.log('Fetch API', result);      
    } catch (err) {
      console.error('Fetch API', err);
    }
  };


// Event Handlers: Define event handlers for various user interactions
const handleIncomingRequest = async (event) => {  
    event.preventDefault();
    const clickedElement = event.currentTarget;
    const requestFrom = clickedElement.getAttribute('data-requestFrom');
    let currentStatus = clickedElement.getAttribute('data-status');
    if(requestFrom === TXT_CTCIntercome) {
      sendPostRequest('/ctc', { status: currentStatus});
    } else if(requestFrom === TXT_PAnnouncement) {
      sendPostRequest('/pannouncement', { status: currentStatus});
    }
}

// Attach event listeners to various DOM elements for user interactions
CTCIntercome.addEventListener('click', handleIncomingRequest);
PAnnouncement.addEventListener('click', handleIncomingRequest);


// Function to handle beforeunload
const clearBeforeUnload = () => {
  clearAll(); // Ensure other listeners are cleaned up too
};

/**
 * @function cleanUp
 * @description Removes all event listeners to prevent memory leaks when the page is closed or refreshed.
 */
const clearAll = () => {
  CTCIntercome.removeEventListener('click', handleIncomingRequest);
  PAnnouncement.removeEventListener('click', handleIncomingRequest);
  window.removeEventListener('beforeunload', clearBeforeUnload); 
};

// Add the beforeunload listener
window.addEventListener('beforeunload', clearBeforeUnload);