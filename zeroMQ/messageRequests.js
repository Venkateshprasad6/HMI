/**
* @file messageRequests.js
* @brief Fetching data from ZeroMQ using request and reply pattern.
*
* This module establishes a ZeroMQ request socket to send messages to a specified service
* and receive responses. It handles connection management, message encoding/decoding,
* and error handling, including timeouts for responses.
*
* (C) Copyright CENTUM T&S 2023. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

const zmq = require('zeromq');
const {
  getVariableValue,
} = require('../services/mainDDRConfig');
const { LEAD_MESSAGE_GATE_IP } = require('../constant/globalDDRVariables');

/**
 * Waits for a response from the server with a specified timeout.
 * @param {Object} sock - The ZeroMQ socket to receive messages on.
 * @param {number} timeout - The timeout period in milliseconds.
 * @returns {Promise<Buffer>} - A promise that resolves with the received message buffer.
 * @throws {Error} - Throws an error if the timeout occurs or receiving fails.
 */
const receiveWithTimeout = async (sock, timeout) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Timeout waiting for response from server'));
    }, timeout);

    sock
      .receive()
      .then((msg) => {
        clearTimeout(timer);
        resolve(msg);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(new Error(`Failed to receive message: ${err.message || err}`));
      });
  });
};

/**
 * Sends a request to the specified message gateway and processes the response.
 * @param {Object} root - The protobuf root object for message types.
 * @param {string} pReq - The request message type.
 * @param {string} pRes - The response message type.
 * @param {Object} payloadObj - The payload to send in the request.
 * @param {string} messageID - The unique identifier for the message.
 * @returns {Promise<Object|string>} - A promise that resolves with the decoded response data or an error message.
 */
async function runClientRequest(root, pReq, pRes, payloadObj, messageID) {
  const sock = new zmq.Request();
  try {
    // Fetching the service IP address from global variables
    let LMTserviceIP = await getVariableValue(LEAD_MESSAGE_GATE_IP);
    sock.connect(`tcp://${LMTserviceIP}:${process.env.MSG_GATEWAY_PORT}`); // Connecting to the message gateway
    //console.log(`Connection ON - tcp://${LMTserviceIP}:${process.env.MSG_GATEWAY_PORT}`);

  // Obtain a message type
    const getMessageRequest = root.lookupType(
      `CMRL.console.MessageGatewayMessages.${pReq}`
    );
    const getMessageResponse = root.lookupType(
      `CMRL.console.MessageGatewayMessages.${pRes}`
    );

    // Verify and create the message payload
    const payload = payloadObj;
    const errMsg = getMessageRequest.verify(payload);
    if (errMsg) throw new Error(errMsg);

    // Create and encode the message
    const messageData = getMessageRequest.create(payload);
    const messageDataBuffer = getMessageRequest.encode(messageData).finish();
    //console.log('Message to send:', messageID + '\0' + JSON.stringify(messageData));

    // Sending request to the message gateway
    await sock.send(Buffer.concat([Buffer.from(messageID + '\0'), messageDataBuffer]));

    // Waiting for a response from the server with timeout
    const [msg] = await receiveWithTimeout(sock, 3000);
    //console.log('\n------Received from server ------ \n', msg);

    if (!msg || msg.length === 0) {
      throw new Error('Received empty response from server');
    }

    // Process the received message
    const receivedMessageID = msg.slice(0, msg.indexOf('\0'));
    //console.log('Message ID:', receivedMessageID.toString('utf8'));

    const messageDataResponse = msg.slice(msg.indexOf('\0') + 1);
    const responseData = getMessageResponse.decode(messageDataResponse);
    const responseDataJson = JSON.parse(JSON.stringify(responseData));
    return responseDataJson; // Returning the decoded response data
  } catch (error) {
    return error.message; // Returning the error message for handling by the calling function
  } finally {
    sock.close(); // Close the socket to prevent resource leaks
  }
}

module.exports = runClientRequest; // Exporting the request function for use in other modules