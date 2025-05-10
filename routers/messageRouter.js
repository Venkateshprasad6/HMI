/**
* @file predefinedMsg.Route.js
* @brief Router call for the predefined message page.
*
* This module defines the routes for handling predefined messages,
* including fetching the list of predefined messages and sending
* selected messages to an LCD display.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express');
const router = express.Router();
const runClientRequest = require('../zeroMQ/messageRequests');
const { getVariableValue } = require('../services/mainDDRConfig');
const {PIS_INPUT_MESSAGE_PLAYER_EVENTS} = require('../constant/globalDDRVariables');

// constant declarations
const TXT_PLAY = 'play';
const TXT_STOP = 'stop';

/**
 * Fetch the list of predefined messages.
 * 
 * @returns {Promise<Object>} The list of predefined messages.
 */
async function fetchMessageList() {
  try {
    const GetPredefinedMessageList = await runClientRequest(
      messageProtoBuff,
      'GetPredefinedMessageList_Request',
      'GetPredefinedMessageList_Response',
      { languageCode: 'eng' },
      'getPredefinedMessageList'
    );
    return GetPredefinedMessageList;
  } catch (error) {
    console.error('Error fetching message list:', error);
  }
}

/**
 * Send a predefined message to the LCD display.
 * 
 * @param {string} msgID - The ID of the message to send.
 */
async function sendMessageToLCD(msgID) {
  try {
    await runClientRequest(
      messageProtoBuff,
      'SendPredefinedMessage_Request',
      'SendPredefinedMessage_Response',
      { messageId: msgID },
      'sendPredefinedMessage'
    );
  } catch (error) {
    console.error('Error sending message to LCD:', error);
  }
}


/**
 * Stop a predefined message to the LCD display.
 * 
 * @param {string} msgID - The ID of the message to stop.
 */
async function stopMessageToLCD(msgID) {
  try {
    await runClientRequest(
      messageProtoBuff,
      'StopPredefinedMessage_Request',
      'StopPredefinedMessage_Response',
      { messageId: msgID },
      'stopPredefinedMessage'
    );
  } catch (error) {
    console.error('Error sending message to LCD:', error);
  }
}

/**
 * Filters messages into emergency and special categories based on messageId.
 
 * @param {Array} messageList - The list of messages to filter.
 * @returns {Object} - An object containing two arrays: emergencyMessages and specialMessages.
 */
function filterMessages(messageList) {
  const emergencyMessages = messageList.filter(msg => {
    const msgId = parseInt(msg.messageId);
    return msgId >= 0 && msgId <= 64;
  });

  const specialMessages = messageList.filter(msg => {
    const msgId = parseInt(msg.messageId);
    return msgId >= 65 && msgId <= 255;
  });

  return {
    emergencyMessages,
    specialMessages
  };
}


const fetchPlayingMessage = async () => {
  const messagePlayerEventID = await getVariableValue(PIS_INPUT_MESSAGE_PLAYER_EVENTS);
  const currentMessageState = String(messagePlayerEventID).includes(';');
  if(currentMessageState) return String(messagePlayerEventID).split(';')[0];
}

// Route to render the predefined message page
router.get('/', async (req, res) => {
  let responseDataJson = await fetchMessageList();
  let messageListConnected = typeof responseDataJson === 'object';

  // Initialize variables to default values
  let emergencyMessages = [];
  let specialMessages = [];

  if (messageListConnected) {
    const { messageList } = responseDataJson;
    if (messageList && Array.isArray(messageList)) {
      // Filter messages into emergency and special
      const filteredMessages = filterMessages(messageList);
      emergencyMessages = filteredMessages.emergencyMessages || [];
      specialMessages = filteredMessages.specialMessages || [];
    }
  }

  const playingMessageEventID = await fetchPlayingMessage();
  res.render('pages/messagePage', {
    title: 'Message Router',
    script: 'messageControlPanel',
    clientWSScript: 'DDRWebInterface',
    activePredefinedmsg: 'active',
    messageListConnected,
    emergencyMessageList: emergencyMessages,
    specialMessageList: specialMessages,
    playingMessageEventID: playingMessageEventID,
  });
});

// Route to handle sending a predefined message
router.post('/', async (req, res) => {
  try {
    const { predefined_MsgID, action } = req.body;
    const messageInputPlayerValues = await getVariableValue(PIS_INPUT_MESSAGE_PLAYER_EVENTS);
    const isMessagePlaying = String(messageInputPlayerValues).includes(';');

    if(action === TXT_PLAY && !isMessagePlaying) {
        await sendMessageToLCD(predefined_MsgID);
        return res.status(200).json({ success: 'Message Playing', state: 'playing', messageID: predefined_MsgID });
      }

    if(action === TXT_STOP && isMessagePlaying ) {
        await stopMessageToLCD(predefined_MsgID);
        return res.status(200).json({ success: 'Message Stopped', state: 'stopped', messageID: predefined_MsgID });
      }
 
    console.log("Not Playing - request or state");
    res.status(400).json({ error: 'Invalid request or state' });

  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).json({ error: `Message Failed: ${error.message}` });
  }
});


// Export the router for use in the main application
module.exports = router;
