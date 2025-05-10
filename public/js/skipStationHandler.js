/**
* @file skipStation.js
* @brief Management of skip stations including selecting a station and enabling a skip button.
*
* This script handles the user interface for managing skip stations by allowing users 
* to select a station from a list. When a station is selected, the corresponding skip 
* button is enabled for further actions.
* 
* (C) Copyright Centum T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, 
* or assigned without the prior written authorization of CENTUM T&S.
*/

// DOM Selectors
const selectorTabs = {
  skipStationList: '#skipStationList',  // Selector for the list of skip stations
  arrayNodelistOfSkipStation: '#skipStationList li', // Selector for individual skip station items
  skipButton: '#skipStationBtn'           // Selector for the skip button
};

// Selecting DOM elements
const skipStationList = document.querySelector(selectorTabs.skipStationList);
const arrayNodelistOfSkipStation = document.querySelectorAll(
  selectorTabs.arrayNodelistOfSkipStation
);
const skipButton = document.querySelector(selectorTabs.skipButton);

// Variable to hold the selected message ID
let selectedMessageID = null;

/**
 * @function onMessageSelect
 * @description Handles the selection of a skip station from the list.
 * @param {HTMLElement} targetNode - The clicked list item (skip station).
 */
const onMessageSelect = (targetNode) => {
  // Remove selection from all skip stations
  arrayNodelistOfSkipStation.forEach((el) => el.classList.remove('selected'));
  
  // Add selection to the clicked station
  targetNode.classList.add('selected');
  
  // Enable the skip button
  skipButton.removeAttribute('disabled');
  
  // Store the selected message ID from the data attribute
  selectedMessageID = targetNode.dataset.messageid;
};

// Event listener for selecting a skip station
skipStationList.addEventListener('click', (event) => {
  const targetNode = event.target.closest('li'); // Get the closest list item
  if (targetNode) {
    onMessageSelect(targetNode);
  }
});

// Function to handle beforeunload
const handleBeforeUnload = () => {
  cleanUp(); // Ensure other listeners are cleaned up too
};

/**
 * @function cleanUp
 * @description Cleans up event listeners when the page is unloaded.
 */
const cleanUp = () => {
  skipStationList.removeEventListener('click', onMessageSelect);
  window.removeEventListener('beforeunload', handleBeforeUnload); // Remove beforeunload listener
};

// Add the beforeunload listener
window.addEventListener('beforeunload', handleBeforeUnload);
