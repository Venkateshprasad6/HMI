/**
* @file messageControlPanel.js
* @brief Manages message selection and playback for Emergency and Special messages.
* This module enables users to toggle between Emergency and Special message tabs, 
* select predefined messages, and send the selected message to a media player.
*
* Usage:
* Users can switch between message categories, select messages, and initiate playback.
* 
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

const EMERGENCY_MSG_NAME = 'Emergency Message';
const SPECIAL_MSG_NAME = 'Special Message';
const TXT_PLAY = 'play';
const TXT_STOP = 'stop';
const DATA_SET_MESSAGE_ID = 'data-messageId';

// DOM Selectors
const messageSelectorTabs = {
  emergencyMsgTab: '#emergencyMessageTab',
  specialMsgTab: '#specialMessageTab',
  switchTabs: '#messageTabs',
  arrayNodeListTabs: '#messageTabs div',
  emergencyMessageTabContent: '#emergencyMessageTabContent',
  specialMessageTabContent: '#specialMessageTabContent',
  listOfEmergencyMsg: '#listOfEmergencyMessages',
  listOfSpecialMsg: '#listOfSpecialMessage',
  arrayNodelistOfSpecialMsg: '#listOfSpecialMessage li',
  arrayNodelistOfEmergencyMsg: '#listOfEmergencyMessages li', 
  playMessageButton: '#playMessageButton',
  stopMessageButton: '#stopMessageButton',
  inputBoxspecialMessage: '#inputBoxspecialMessage',
};

const emergencyTabNode = document.querySelector(messageSelectorTabs.emergencyMsgTab);
const specialMessageTabNode = document.querySelector(messageSelectorTabs.specialMsgTab);
const switchMessageTabs = document.querySelectorAll(messageSelectorTabs.arrayNodeListTabs);
const emergencyMessageTabContent = document.querySelector(messageSelectorTabs.emergencyMessageTabContent);
const specialMessageTabContent = document.querySelector(messageSelectorTabs.specialMessageTabContent);
const listOfEmergencyMsg = document.querySelector(messageSelectorTabs.listOfEmergencyMsg);
const switchTabs = document.querySelector(messageSelectorTabs.switchTabs);
const listOfSpecialMsg = document.querySelector(messageSelectorTabs.listOfSpecialMsg);
const playMessageButton = document.querySelector(messageSelectorTabs.playMessageButton);
const stopMessageButton = document.querySelector(messageSelectorTabs.stopMessageButton);
const inputBoxspecialMessage = document.querySelector(messageSelectorTabs.inputBoxspecialMessage);
const arrayListOfSpecialMsg = document.querySelectorAll(messageSelectorTabs.arrayNodelistOfSpecialMsg);
const arrayListOfEmergencyMsg = document.querySelectorAll(messageSelectorTabs.arrayNodelistOfEmergencyMsg); 

let selectedMessageID; // Variable to store the ID of the selected message
let isPlaying = false; // State variable to track if a message is currently playing

/**
 * @function onTabSwitch
 * @description Toggles the active tab between Emergency and Special messages.
 * @param {HTMLElement} event - The tab element that was clicked.
 */
const onTabSwitch = (event) => {
  const tabEle = event.target;
  switchMessageTabs.forEach((tab) => tab.classList.remove('message-tab-active'));
  tabEle.classList.add('message-tab-active');
  switch (true) {
    case tabEle.innerText == EMERGENCY_MSG_NAME:
      emergencyMessageTabContent.classList.remove('d-none');
      specialMessageTabContent.classList.add('d-none');
      break;
    case tabEle.innerText == SPECIAL_MSG_NAME:
      specialMessageTabContent.classList.remove('d-none');
      emergencyMessageTabContent.classList.add('d-none');
      break;
    default:
      console.log('NO-Case selected');
  }
};

/**
 * @function onMessageSelect
 * @description Highlights the selected message and stores its ID for playback.
 * @param {HTMLElement} event - The clicked list item element representing a message.
 */
const onMessageSelect = (event) => {
  if(event.target.nodeName === 'LI') {
    playMessageButton.classList.remove('disabled');
    const targetNode = event.target;
    arrayListOfSpecialMsg.forEach((el) => el.classList.remove('selected'));
    arrayListOfEmergencyMsg.forEach((el) => el.classList.remove('selected'));
    targetNode.classList.add('selected');
    selectedMessageID = targetNode.dataset.messageid;
  }
};

/**
 * @function playMessage
 * @description Sends the selected message ID to the backend server to initiate playback.
 */
const playMessage = () => {
  const data = { predefined_MsgID: selectedMessageID, action: TXT_PLAY };
  if (data.predefined_MsgID !== undefined) {
    postJSON(data);
  }
};

/**
 * @function stopMessage
 * @description Sends the selected message ID to the backend server to stopMessage.
 */
const stopMessage = () => {
  const data = { predefined_MsgID: selectedMessageID, action: TXT_STOP };
  if (data.predefined_MsgID !== undefined) {
    postJSON(data);
  }
};


const displayMessage = (state, messageID) => {
  if (state === 'playing') {
    isPlaying = true;
    playMessageButton.classList.add('disabled');
    stopMessageButton.classList.remove('disabled');
    //Special message
    arrayListOfSpecialMsg.forEach((ele) => {
      ele.classList.add('msg-disabled');
      if (ele.dataset.messageid === messageID) {
        ele.classList.add('selected');
        ele.classList.remove('msg-disabled');
      } 
    });
    
    //Emergency message
    arrayListOfEmergencyMsg.forEach((ele) => {
      ele.classList.add('msg-disabled');
      if (ele.dataset.messageid === messageID) {
        ele.classList.add('selected');
        ele.classList.remove('msg-disabled');
      }
    });

  } else if (state === 'stopped') {
    isPlaying = false;
    playMessageButton.classList.add('disabled');
    stopMessageButton.classList.add('disabled');
    selectedMessageID = null;
    arrayListOfSpecialMsg.forEach((ele) => ele.classList.remove('msg-disabled', 'selected', 'msg-playing'));
    arrayListOfEmergencyMsg.forEach((ele) => ele.classList.remove('msg-disabled', 'selected', 'msg-playing'));
  }
}

/**
 * @function postJSON
 * @description Makes a POST request to send selected message data to the backend server.
 * @param {Object} data - The message data to be sent in the POST request.
 */
async function postJSON(data) {
  try {
    const response = await fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    displayMessage(result.state, result.messageID);
  } catch (error) {
    console.error('Error:', error);
  }
}


// Helper function to fetch the selected message ID
function fetchSelectedMessageID(arrayListOfSpecialMsg, arrayListOfEmergencyMsg) {
  const combinedList = [...arrayListOfSpecialMsg, ...arrayListOfEmergencyMsg];
  const selectedElement = combinedList.find(ele => ele.classList.contains('selected'));
  return selectedElement ? selectedElement.dataset.messageid : null;
}

// Window onload to fetch selectedMessage
const loadSelectedMessageID = () => {
  selectedMessageID = fetchSelectedMessageID(arrayListOfSpecialMsg, arrayListOfEmergencyMsg);
};

// Event listeners for tab switching, message selection, and playback
switchTabs.addEventListener('click', onTabSwitch);
listOfSpecialMsg.addEventListener('click', onMessageSelect);
listOfEmergencyMsg.addEventListener('click', onMessageSelect);
playMessageButton.addEventListener('click', playMessage);
stopMessageButton.addEventListener('click', stopMessage);


// Function to handle beforeunload
const handleBeforeUnload = () => {
  cleanUp(); // Ensure other listeners are cleaned up too
};

/**
 * @function cleanUp
 * @description Removes event listeners on unload to prevent memory leaks.
 */
function cleanUp() {
  switchTabs.removeEventListener('click', onTabSwitch);
  listOfSpecialMsg.removeEventListener('click', onMessageSelect);
  listOfEmergencyMsg.removeEventListener('click', onMessageSelect);
  playMessageButton.removeEventListener('click', playMessage);
  window.removeEventListener('load', loadSelectedMessageID);
  window.removeEventListener('beforeunload', handleBeforeUnload); 
}

// Attach the event listeners for window
window.addEventListener('load', loadSelectedMessageID);
window.addEventListener('beforeunload', handleBeforeUnload);