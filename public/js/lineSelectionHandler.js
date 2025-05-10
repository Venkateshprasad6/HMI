/**
 * @file lineSelectionHandler.js
 * @brief Manage Train Station Selection and Submission.
 * This module provides functionality to select a train, set start and stop stations,
 * and send the selected station data to the backend server for processing.
 *
 * Usage:
 * Users select train stations via the interface, and the data is posted to the server.
 */

// DOM Selector: holds all selectors for various UI elements related to train and station selection
const selectorTabs = {
  trainID: '#trainID',
  lineID: 'lineID',
  startStation: '#startStation',
  currentStation: '#currentStation',
  destinationStation: '#destinationStation',
  startAndStopMission: '#startAndStopMission',
  tabParentNode: '#panel-2',
  virtualKeyboadContainer: '#virtualKeyboard',
  keyBoardLetters: '#virtualKeyboard .keyboard-btn',
  selectLineID: '#lineID',
  selectBoxStartStation: '#startStation',
  selectBoxCurrentStation: '#currentStation',
  selectBoxDestinationStation: '#destinationStation',
  statusAlert: '#statusAlert'
};

// Keyboard constants: key names used for special handling within the virtual keyboard
const BACKSPACE_KEY = 'BACKSPACE';
const SPACE_KEY = 'SPACE';
const CLEAR_KEY = 'CLEAR';

//Button name 
const START_MISSION_TEXT = 'Start Mission';
const SET_CURRENT_STATION_TEXT = 'Set Current Station';
const STOP_MISSION = 'Stop Mission';

const selectBoxIDs = ['startStation', 'currentStation', 'destinationStation'];
const HMI_CONSOLE_TRAIN_NUMBER = 'HMI_CTrainID';
const HMI_CONSOLE_LINEID = 'HMI_CLineId';
const HMI_CONSOLE_MISSION_INITIALIZED = 'HMI_CMissionInitialized';
const HMI_CONSOLE_FIRST_STATION = 'HMI_CFirstStation';
const HMI_CONSOLE_CURRENT_STATION = 'HMI_CCurrentStation';
const HMI_CONSOLE_FINAL_DESTINATION = 'HMI_CFinalDestination';

const setToDefaultState = {
  [HMI_CONSOLE_TRAIN_NUMBER]: '',
  [HMI_CONSOLE_LINEID]: '',
  [HMI_CONSOLE_FIRST_STATION]: 0,
  [HMI_CONSOLE_CURRENT_STATION]: 0,
  [HMI_CONSOLE_FINAL_DESTINATION]: 0,
  [HMI_CONSOLE_MISSION_INITIALIZED]: false,
};

// DOM Elements: Select elements based on provided selectors
const trainID = document.querySelector(selectorTabs.trainID);
const maxLength = trainID.getAttribute('maxlength');
const startStation = document.querySelector(selectorTabs.startStation);
const currentStation = document.querySelector(selectorTabs.currentStation);
const destinationStation = document.querySelector(
  selectorTabs.destinationStation
);
const startAndStopMission = document.querySelector(selectorTabs.startAndStopMission);
const tabParentNode = document.querySelector(selectorTabs.tabParentNode);
const virtualKeyboadContainer = document.querySelector(
  selectorTabs.virtualKeyboadContainer
);
const keyBoardLetters = document.querySelectorAll(selectorTabs.keyBoardLetters);

const selectLineID = document.querySelector(selectorTabs.selectLineID);

// Creating dynamic options for station dropdowns
const selectBoxStartStation = document.querySelector(
  selectorTabs.selectBoxStartStation
);
const selectBoxCurrentStation = document.querySelector(
  selectorTabs.selectBoxCurrentStation
);
const selectBoxDestinationStation = document.querySelector(
  selectorTabs.selectBoxDestinationStation
);

//Status Alert - success or Failer
const statusAlert = document.querySelector(selectorTabs.statusAlert);
const transportSelectorElements = [trainID, selectLineID, selectBoxStartStation, selectBoxCurrentStation, selectBoxDestinationStation]

// Shows or hides the virtual keyboard based on the target element
const showKeyboard = (event) => {
  event.target.name === 'trainID'
    ? virtualKeyboadContainer.classList.remove('d-none')
    : virtualKeyboadContainer.classList.add('d-none');
};

// Hides the virtual keyboard if a click occurs outside the keyboard container
const hideKeyboard = (event) => {
  if (
    !virtualKeyboadContainer.contains(event.target) &&
    event.target !== trainID
  ) {
    virtualKeyboadContainer.classList.add('d-none');
  }
};

// Handles key presses on the virtual keyboard
const onVirtualKeyPress = (event) => {
  if (event.target.type === 'button') {
    const trainID = document.getElementById('trainID');
    let currentValue = trainID.value.toUpperCase();
    const keypress = event.target.value.toUpperCase();

    switch (true) {
      case currentValue.length < maxLength &&
        keypress !== BACKSPACE_KEY &&
        keypress !== SPACE_KEY &&
        keypress !== CLEAR_KEY:
        trainID.value = currentValue + keypress;
        break;

      case keypress === BACKSPACE_KEY:
        trainID.value = currentValue.slice(0, -1);
        break;

      case keypress === SPACE_KEY:
        if (currentValue.length < maxLength) {
          trainID.value = currentValue + ' ';
        }
        break;

      case keypress === CLEAR_KEY:
        trainID.value = '';
        break;

      default:
        break;
    }
  }
};

// Adds station names dynamically to the dropdowns based on a list of station names
const addStationNameToSelectBoxes = (stationListArray) => {
  selectBoxIDs.forEach((selectBox) => {
    const selectDropDownBox = document.getElementById(selectBox);
    // Clear existing options
    selectDropDownBox.innerHTML = '';
    //re-adding Select an option placeholder
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.innerText = 'Select an option';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    selectDropDownBox.appendChild(placeholderOption);

    stationListArray.forEach((item) => {
      const optionElement = document.createElement('option');
      optionElement.value = item.stationId;
      optionElement.innerText = item.name;
      selectDropDownBox.appendChild(optionElement);
    });
  });
};

/** 
 * @param {Object} result - The result object containing the message to display.
 * @param {string} [result.success] - The success message to display, if available.
 * @param {string} [result.error] - The error message to display, if available.
*/
let alertTimeout;
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
    const response = await fetch('/lineselection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    switch (true) {
      case !!result.stationList:
        addStationNameToSelectBoxes(result.stationList);
        break;
      case !!result:
        showMessageAlert(result);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const checkNullValues = (data) => {
  return Object.values(data).some(value => value == '');
}

// Handles changes in line selection and sends updated data to the server
const onChangeLineSelction = (event) => {
  const data = { lineID: event.target.value };
  const isAnyValueNull = checkNullValues(data);
  if (!isAnyValueNull) {
    postJSON(data);
  }
};

// Updates available stations in select boxes based on selected start station
const updateStationSelection = () => {
  const startValue = selectBoxStartStation.value;
  const options = Array.from(selectBoxStartStation.options).map(
    (option) => option.value
  );

  //disablePreviousOptions(selectBoxCurrentStation, startValue, options);
  disablePreviousOptions(selectBoxDestinationStation, startValue, options);
};

// Disables options in select elements based on the selected value
const disablePreviousOptions = (selectElement, selectedValue, options) => {
  const index = options.indexOf(selectedValue);

  // Disable all options before the selected start station
  Array.from(selectElement.options).forEach((option, i) => {
    option.disabled = i < index && option.value !== '';
  });
};

// Updates available stations in SelectBoxCurrentStation based on start and destination
const updateCurrentStationOptions = () => {
  const startValue = selectBoxStartStation.value;
  const destinationValue = selectBoxDestinationStation.value;

  const options = Array.from(selectBoxStartStation.options).map(
    (option) => option.value
  );

  // Ensure SelectBoxCurrentStation only shows options between start and destination
  filterBetweenOptions(selectBoxCurrentStation, startValue, destinationValue, options);
};

// Filters options to show only the in-between stations
const filterBetweenOptions = (selectElement, startValue, destinationValue, options) => {
  const startIndex = options.indexOf(startValue);
  const destinationIndex = options.indexOf(destinationValue);

  Array.from(selectElement.options).forEach((option, i) => {
    option.disabled = !(i >= startIndex && i <= destinationIndex);
  });

  // Reset current selection if the previous value becomes invalid
  if (selectElement.value && selectElement.options[selectElement.selectedIndex].disabled) {
    selectElement.value = "";
  }
};

/**
 * @function setMissionState
 * @description Collects train and station data from the DOM inputs
 * and triggers a POST request to save the selection.
 */


const setMissionState = () => {
  const data = {
    [HMI_CONSOLE_TRAIN_NUMBER]: trainID.value,
    [HMI_CONSOLE_LINEID]: selectLineID.value,
    [HMI_CONSOLE_FIRST_STATION]: +startStation.value,
    //[HMI_CONSOLE_CURRENT_STATION]: +currentStation.value,
    [HMI_CONSOLE_FINAL_DESTINATION]: +destinationStation.value,
    [HMI_CONSOLE_MISSION_INITIALIZED]: true,
  };

  // Check if any value in the data object is null or undefined
  const isAnyValueNull = startAndStopMission.innerText.trim() == STOP_MISSION ?  false : checkNullValues(data);
   
  if (!isAnyValueNull) {
    transportSelectorElements.forEach(element => element.disabled = true);
    selectBoxCurrentStation.disabled = false;
    switch (true) {
      case startAndStopMission.innerText.trim() === START_MISSION_TEXT:
        transportSelectorElements.forEach(element => element.disabled = true);
        selectBoxCurrentStation.disabled = false;
        startAndStopMission.innerText = SET_CURRENT_STATION_TEXT;
        postJSON(data);
        break;
      case startAndStopMission.innerText.trim() == SET_CURRENT_STATION_TEXT:
        transportSelectorElements.forEach(element => element.disabled = true);
        postJSON({
          [HMI_CONSOLE_CURRENT_STATION]: +currentStation.value
        });
        startAndStopMission.innerText = STOP_MISSION;
        setTimeout(() => statusAlert.classList.add('d-none'), 2000)
        break;
      case startAndStopMission.innerText.trim() == STOP_MISSION:
        postJSON(setToDefaultState);
        transportSelectorElements.forEach(element => element.disabled = false);
        selectBoxCurrentStation.disabled = true;
        startAndStopMission.innerText = START_MISSION_TEXT;
        setTimeout(()=> {
          location.reload();
        },1000)
        break;
    }
    //postJSON(data);
  } else {
    statusAlert.innerText = "Please select all the required values.";
    statusAlert.classList.add('alert-error');
    statusAlert.classList.remove('alert-success');
  }
};


// Attach event listeners to various DOM elements for user interactions
trainID.addEventListener('click', showKeyboard);
tabParentNode.addEventListener('click', hideKeyboard);
virtualKeyboadContainer.addEventListener('click', onVirtualKeyPress);
startAndStopMission.addEventListener('click', setMissionState);
selectLineID.addEventListener('change', onChangeLineSelction);
startStation.addEventListener('change', updateStationSelection);
destinationStation.addEventListener('change', updateCurrentStationOptions);


// Function to handle beforeunload
const handleBeforeUnload = () => {
  cleanUp(); // Ensure other listeners are cleaned up too
};

/**
 * @function cleanUp
 * @description Removes all event listeners to prevent memory leaks when the page is closed or refreshed.
 */
const cleanUp = () => {
  trainID.removeEventListener('click', showKeyboard);
  tabParentNode.removeEventListener('click', hideKeyboard);
  virtualKeyboadContainer.removeEventListener('click', onVirtualKeyPress);
  startAndStopMission.removeEventListener('click', setMissionState);
  selectLineID.removeEventListener('change', onChangeLineSelction);
  startStation.removeEventListener('change', updateStationSelection);
  window.removeEventListener('beforeunload', handleBeforeUnload); 
};

// Add the beforeunload listener
window.removeEventListener('beforeunload', handleBeforeUnload);
