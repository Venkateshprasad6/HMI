/**
* @file connectionZMQ.js
* @brief Creating connection between zeromq and client.
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

global.socket;
exports.initializeZMQConnection = async (LEAD_SERVICE_IP, PORT_NUM) => {
  // Socket to talk server
  global.socket = new zmq.Request();
  try {
    // Connect to the server (VM)
    let LEAD_IP = await getVariableValue(LEAD_SERVICE_IP);
    socket.connect(`tcp://${LEAD_IP}:${PORT_NUM}`);
    //console.log(`Connection ON - tcp://${LEAD_IP}:${PORT_NUM}`);
    //socket.connect('tcp://192.168.131.154:21005');
    return socket;
  } catch (err) {
    console.log('zeromq connection failed', err);
    throw err;
  }
}

exports.disconnectZMQconnection = () => {
  //global.socket ? global.socket.close() : console.log('No active ZeroMQ connection to disconnect');
  if (socket) {
    socket.close(); // Close socket
    console.log('Disconnected ZeroMQ Server');
  } else {
    console.log('No active ZeroMQ connection to disconnect.');
  }
}
