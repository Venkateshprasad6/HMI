/**
* @file mainDDRConfig.js
* @brief Configuration module for managing WebDDR connections and variable access.
*
* This module initializes a WebDDR connection and provides functions to 
* interact with DDR variables, including getting individual variable values 
* and subscribing to multiple variables. It is designed to handle WebSocket 
* communications with a specified URI.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

const WebDDR = require('./WSWebDDR'); // Importing WebDDR class to manage WebSocket connections.
const DEFAUL_WEB_DDR_URI = 'wss://127.0.0.1:20002'; // Default WebSocket URI for DDR connection.

/**
 * Fetches the value of a specified DDR variable asynchronously.
 * @param {string} variableName - The name of the variable to retrieve.
 * @returns {Promise<any>} - A promise that resolves with the variable's value.
 */
const getDDRVariable = async (variableName) => {
  return new Promise((resolve, reject) => {
    webDDR.getVariableValue(variableName, (variableValue) => {
      resolve(variableValue);
    });
  });
};

/**
 * Retrieves the value of a specified DDR variable.
 * @param {string} variableName - The name of the variable to retrieve.
 * @returns {Promise<any>} - A promise that resolves with the value of the variable.
 */
const getVariableValue = async (variableName) => {
  return (await getDDRVariable(variableName)).value; // Accessing the value property from the resolved promise.
};

/**
 * Subscribes to multiple DDR variables and returns their values in an array.
 * @param {Array<string>} variableNameList - The list of variable names to subscribe to.
 * @returns {Promise<Array<{name: string, value: any}>>} - A promise that resolves with an array of variable objects.
 */
const getDDRVariableList = async (variableNameList) => {
  return new Promise((resolve, reject) => {
    const result = [];
    async function callBackResult(data) {
      result.push({ name: data.name, value: data.value }); // Collecting the variable data.
      if (result.length === variableNameList.length) {
        return resolve(result); // Resolving the promise when all variables are retrieved.
      }
    }
    webDDR.subscribeVariablesValue(variableNameList, callBackResult, true); // Subscribing to variable updates.
  });
};

const webDDR = new WebDDR(DEFAUL_WEB_DDR_URI); // Creating a new instance of WebDDR.
webDDR &&
  webDDR.initWebSocket(async () => { // Initializing the WebSocket connection.
    console.log('initWebSocket Started');
    webDDR.connectionState = true; // Updating connection state on successful initialization.
  });

module.exports = {
  webDDR,
  getDDRVariable,
  getVariableValue,
  getDDRVariableList,
}; // Exporting the configured webDDR instance and utility functions.
