/**
 * @file getLMTClientRequest.js
 * @brief Fetching data from ZeroMq by using request and reply.
 *
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted or assigned
 * without the prior written authorization of CENTUM T&S.
 */

const { LEAD_LMT_SERVICE_IP } = require('../constant/globalDDRVariables');
const {initializeZMQConnection} = require('./connectionZMQ');

async function runClientRequest(
  root,
  pReq,
  pRes,
  payloadObj,
  messageId
) {
  //console.log(`Root: ${root} \n Request: ${pReq} \n Response: ${pRes} \n Payload: ${payloadObj} \n MessageID: ${messageId}`);

   // Connecting to the ZMQserver
  const sock = await initializeZMQConnection(LEAD_LMT_SERVICE_IP, process.env.LMT_PORT);
  //console.log(sock);
  
  
  // Obtain a message type
  var getMessageRequest = root.lookupType(`PIS.LCD.LMT.LMTControl.${pReq}`);
  var getMessageResponse = root.lookupType(`PIS.LCD.LMT.LMTControl.${pRes}`);

  // Fill GetLineListMessage message payload
  var payload = payloadObj; // Need to send Object

  // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
  //console.log('payload', payload);
  var errMsg = getMessageRequest.verify(payload);
  if (errMsg) throw Error(errMsg);

  // Create a new message
  var messageData = getMessageRequest.create(payload);
  var messageId = messageId;

  // Encode a message data to Buffer (node)
  var messageDataBuffer = getMessageRequest.encode(messageData).finish();
  //console.log('Message to send: ' + messageId + '\0' + JSON.stringify(messageData));

  await sock.send(
    Buffer.concat([Buffer.from(messageId + '\0'), messageDataBuffer])
  );

  // Timeout implementation
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout: No response from server')), 2000)
  );

  try {
    const responsePromise = sock.receive();

    // Use Promise.race to wait for either the response or the timeout
    const [msg] = await Promise.race([responsePromise, timeoutPromise]);

    //console.log('\n------Received from server ------ ', msg);

    messageId = msg.slice(0, msg.indexOf('\0'));
    //console.log('messageId: ', messageId.toString('utf8'));

    var messageData = msg.slice(msg.indexOf('\0') + 1);
    var data = getMessageResponse.decode(messageData);
    const dataJson = JSON.parse(JSON.stringify(data));
    return dataJson;
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
}

module.exports = runClientRequest;
