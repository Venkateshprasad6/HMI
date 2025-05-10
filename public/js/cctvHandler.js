/**
 * @file cctvHandler.js
 * @brief Manage CCTV Selection and Submission.
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted, or assigned
 * without the prior written authorization of CENTUM T&S.
 */


const ws = new WebSocket('wss://127.0.0.1:8181'); // Ensure the correct WebSocket URL

// DOM Selector: holds all selectors for various UI elements related to train and station selection
const selectorTabs = {
  cctvTabContainer: '#cctvTabContainer',
  singleCameraMode: '#singleCameraMode',
  multipleCameraMode: '#multipleCameraMode',
  eventCameraMode: '#eventCameraMode',
  singleTabContent: '#singleTabContent',
  multipleTabContent: '#multipleTabContent',
  eventsTabContent: '#eventsTabContent',
  patentCCTVTabContainer: '#cctvTabContainer div',
  patentCCTVTabContent: '#cctvTabContent .cctv-content-tab',
  carSelection: '#carSelection',
  cameraSelection: '#cameraSelection',
  statusAlert: '#statusAlert',
  multiModeGroup: '#multiModeGroup',
  multiModeButtonGroup: '#multiModeGroup button',
  defaultCycleMode: '#defaultCycleMode',
  livefeedCamera: '#livefeedCamera',
};

// DOM Elements: Select elements based on provided selectors
const parentCCTVTab = document.querySelector(selectorTabs.cctvTabContainer);
const singleCameraMode = document.querySelector(selectorTabs.singleCameraMode);
const multipleCameraMode = document.querySelector(
  selectorTabs.multipleCameraMode
);
const eventCameraMode = document.querySelector(selectorTabs.eventCameraMode);
const singleTabContent = document.querySelector(selectorTabs.singleTabContent);
const multipleTabContent = document.querySelector(
  selectorTabs.multipleTabContent
);
const eventsTabContent = document.querySelector(selectorTabs.eventsTabContent);
const nodeListTabContainer = document.querySelectorAll(
  selectorTabs.patentCCTVTabContainer
);
const nodeListCCTVTabContent = document.querySelectorAll(
  selectorTabs.patentCCTVTabContent
);
const carSelection = document.querySelector(selectorTabs.carSelection);
const cameraSelection = document.querySelector(selectorTabs.cameraSelection);
const livefeedCamera = document.querySelector(selectorTabs.livefeedCamera);

//MultiMode button group
const defaultCycleMode = document.querySelector(selectorTabs.defaultCycleMode);
const multiModeGroup = document.querySelector(selectorTabs.multiModeGroup);
const multiModeButtonGroup = document.querySelectorAll(selectorTabs.multiModeButtonGroup);

//Status Alert - success or Failer
const statusAlert = document.querySelector(selectorTabs.statusAlert);

//constant variable declartion
const SINGLEMODE_URL = 'cctv/singlemode';
const MULTIMODE_URL = 'cctv/multimode';
const STOP_STREAMING_URL = 'cctv/stop';
const TXT_PREVIOUS = 'Previous';
const TXT_NEXT = 'Next';
const TXT_CYCLIC = 'Cyclic';
const carName = ['DM1', 'T1', 'M1', 'M2', 'T2', 'DM2'];


/**
 * Handles switching between CCTV tabs by capturing the clicked tab element.
 * This function is triggered by an event listener when a tab is clicked.
 * which tab was clicked and update the display accordingly.
 */
// Tab names associated with each mode for flexible referencing

// Tab names associated with each mode for flexible referencing
const SINGLE_CAMERA = 'Single Camera';
const MULTIPLE_CAMERA = 'Multiple Camera';
const EVENTS_CAMERA = 'Events';

const fetchAPIcall = () =>
  fetch('/cctv/api/cameraGroups')
    .then((response) => response.json())
    .then((json) => json);
    
fetchAPIcall();

/**
* Stops the video stream for the specified camera(s).
* 
*/
const stopStreaming = async (url) => {
  try {
    const response = await fetch(`/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    showMessageAlert(result);
  } catch (error) {
    console.error('Error:', error);
  }
};

const switchCCTVTab = (event) => {
  nodeListTabContainer.forEach((tab) =>
    tab.classList.remove(
      'singleCam-active',
      'multipleCam-active',
      'eventCam-active'
    )
  );
  nodeListCCTVTabContent.forEach((displayContent) =>
    displayContent.classList.add('d-none')
  );

  switch (true) {
    case event.target.innerText === SINGLE_CAMERA:
      singleCameraMode.classList.add('singleCam-active');
      singleTabContent.classList.remove('d-none');
      stopStreaming(STOP_STREAMING_URL);
      carSelection.selectedIndex = 0;
      cameraSelection.selectedIndex = 0;
      break;
    case event.target.innerText === MULTIPLE_CAMERA:
      multipleCameraMode.classList.add('multipleCam-active');
      multipleTabContent.classList.remove('d-none');
      stopStreaming(STOP_STREAMING_URL);
      multiModeButtonGroup.forEach(ele => ele.classList.remove('btn-active'));
      defaultCycleMode.classList.add('btn-active');
      postJSON(MULTIMODE_URL);
      break;
    case event.target.innerText === EVENTS_CAMERA:
      eventCameraMode.classList.add('eventCam-active');
      eventsTabContent.classList.remove('d-none');
      stopStreaming(STOP_STREAMING_URL);
      break;
    default:
      break;
  }
};

/**
 * @function postJSON
 * @description Sends a POST request with JSON data to the backend server.
 * @param {Object} data - The data to be sent in the POST request body.
 * @returns {Promise<void>} - Redirects to '/trainStatus' on success.
 */
const postJSON = async (url, ddrName = null) => {
  const data = ddrName ? { "variableName": ddrName } : {};
  try {
    const response = await fetch(`/${url}`, {
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
};

/**
 * @function getCameraSelectionValues
 * @description Processes the Car selection data to show in car selection.
 */
const getCameraSelectionValues = async (event) => {
  const carSelected = event.target.value;
  const cameraGroupsData = await fetchAPIcall();
  cameraSelection.innerHTML = '';
  cameraSelection.innerHTML = '<option value="" disabled selected>Select an option</option>';
  if (carSelected && cameraGroupsData[carSelected]) {
    cameraGroupsData[carSelected].forEach((ddrcameraName,index) => {
      const option = document.createElement('option');
      option.value = ddrcameraName;
      //option.textContent = `Cam-${index + 1}`;
      const parts = String(ddrcameraName).split('_');
      option.textContent = parts[1] || null;
      cameraSelection.appendChild(option);
    });
  }
};

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
  statusAlert.classList.remove('d-none');

  // Hide the alert after 2000 milliseconds
 setTimeout(() => {
    statusAlert.classList.add('d-none');
  }, 2000);
} 

/**
 * @function cameraSelectionHandler
 * @description Handles the POST request for camera selection. Processes the incoming data to play the stream.
 */
const cameraSelectionHandler = (event) => {
  const camDDRName = event.target.value;
  postJSON(SINGLEMODE_URL, camDDRName);
};

const playSelectionHandler = async (event) => {
  if (event.target.tagName === 'BUTTON') {
    multiModeButtonGroup.forEach(ele => ele.classList.remove('btn-active'));
    event.target.classList.add('btn-active');
    try {
      const response = await fetch(`/${MULTIMODE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"mode": event.target.innerText })
      });
      const result = await response.json();
      showMessageAlert(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Attach event listeners to various DOM elements for user interactions
parentCCTVTab.addEventListener('click', switchCCTVTab);
carSelection.addEventListener('change', getCameraSelectionValues);
cameraSelection.addEventListener('change', cameraSelectionHandler);
multiModeGroup.addEventListener('click', playSelectionHandler);

// WebSocket Message Handler for Live Car Name Updates
// This function processes incoming WebSocket messages and updates the live car name on the webpage.
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.liveCarName) {
    livefeedCamera.innerText = data.liveCarName;
  }
};

// Function to close the WebSocket connection
const wsCloseConnection = () => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.close();
  } 
}

// Function to handle beforeunload
const handleBeforeUnload = () => {
  cleanUp(); // Ensure other listeners are cleaned up too
  wsCloseConnection(); //Closing websocker conneciton
};

/**
 * @function cleanUp
 * @description Removes all event listeners to prevent memory leaks when the page is closed or refreshed.
 */
const cleanUp = () => {
  parentCCTVTab.removeEventListener('click', switchCCTVTab);
  carSelection.removeEventListener('change', getCameraSelectionValues);
  cameraSelection.removeEventListener('change', cameraSelectionHandler);
  multiModeGroup.removeEventListener('click', playSelectionHandler);
  window.removeEventListener('beforeunload', handleBeforeUnload); 
};


// Remove beforeunload listener
window.addEventListener('beforeunload', handleBeforeUnload);





