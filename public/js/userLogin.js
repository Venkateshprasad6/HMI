/**
* @file loginPinHandler.js
* @brief Handles PIN-based login for the train status system.
* This module manages user input for a PIN code, checks it against a predefined PIN, and triggers login actions.
*
* Usage:
* Users enter a 4-digit PIN. If the PIN matches, the user is redirected to the train status page.
* 
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

const PINCODE = '1234'; // Predefined PIN for login verification

// DOM Selector
const selectorTabs = {
  inputPin: '#passCode',
  parentNode: '#pin-number',
  loginSubmit: '#loginBtnSubmit',
  errorPin: '#pinError',
  clearBtn: '#clearBtn',
};

// DOM elements for handling user input, errors, and actions
const inputPIN = document.querySelector(selectorTabs.inputPin);
const parentNode = document.querySelector(selectorTabs.parentNode);
const loginSubmit = document.querySelector(selectorTabs.loginSubmit);
const errorPin = document.querySelector(selectorTabs.errorPin);
const clearBtn = document.querySelector(selectorTabs.clearBtn);

let pinNumber = ''; // Variable to store user-entered PIN

/**
 * @function enterPin
 * @description Appends the digit of the clicked button to the PIN input field,
 * until a maximum of 4 digits is reached.
 * @param {HTMLElement} event - The clicked button element in the DOM.
 */
const enterPin = (event) => {
  if (event.target.tagName === 'BUTTON') {
    const digit = event.target.innerText.trim(); 
    if (pinNumber.length < 4) {
      pinNumber += digit;
      inputPIN.value = pinNumber; // Update the input field
    }
  }
};

/**
 * Fetches a resource with a timeout to prevent hanging requests.
 * 
 * @param {string} url - The URL to fetch.
 * @param {object} [options] - Options for the fetch request (e.g., method, headers, body).
 * @param {number} [timeout=2000] - Timeout duration in milliseconds (default is 2000ms).
 * @returns {Promise<Response>} - Resolves with the fetch response if successful.
 * @throws {Error} - Rejects with an error if the request times out or fetch fails.
 */

const fetchWithTimeout = (url, options, timeout = 3000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

/**
 * @function submitLogin
 * @description Verifies the entered PIN with the predefined PIN and
 * either redirects the user on success or displays an error message on failure.
 */
const submitLogin = async (event) => {
  event.preventDefault();
  if (pinNumber.length !== 4) {
    errorPin.innerText = 'Please enter a 4-digit PIN.'; // Ensure the PIN is 4 digits
    return;
  }

  try {
    const response = await fetchWithTimeout('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ passCode: pinNumber }), // Send the PIN to the server
    });
  
    const result = await response.json(); // Parse JSON response
  
    if (response.ok) {
      // Redirect on successful login
      //window.location.href = '/trainstatus';
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get('redirect') || '/trainstatus'; // Default redirect if not specified
      window.location.href = redirectUrl; // Redirect to the specified URL
    } else {
      // Display error message if login fails
      errorPin.innerText = result.message || "Error"; 
      inputPIN.value = '';
      pinNumber = '';
    }
  } catch (e) {
    console.error("Error during login:", e);
    if (e.message === "Request timed out") {
      errorPin.innerText = "The server took too long to respond. Please try again.";
    } else {
      errorPin.innerText = "An unexpected error occurred. Please try again later.";
    }
  }
};

/**
 * @function clearInput
 * @description Clears the PIN input field and resets the stored PIN.
 */
const clearInput = () => {
  inputPIN.value = '';
  pinNumber = '';
  errorPin.innerText = ''; // Clear any error messages
};

// Adds event listeners for input, login, and clear actions
parentNode.addEventListener('click', enterPin);
loginSubmit.addEventListener('click', submitLogin);
clearBtn.addEventListener('click', clearInput);

// Function to handle beforeunload
const handleBeforeUnload = () => {
  cleanUp(); // Ensure other listeners are cleaned up too
};

/**
 * @function cleanUp
 * @description Removes event listeners for cleanup when the page is about to unload,
 * preventing memory leaks.
 */
function cleanUp() {
  parentNode.removeEventListener('click', enterPin);
  loginSubmit.removeEventListener('click', submitLogin);
  clearBtn.removeEventListener('click', clearInput);
  window.removeEventListener('beforeunload', handleBeforeUnload); // Remove beforeunload listener
}

// Add the beforeunload listener
window.addEventListener('beforeunload', handleBeforeUnload);
