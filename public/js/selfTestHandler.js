/**
* @file SelfTestHandler.js
* 
* (C) Copyright Centum T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, 
* or assigned without the prior written authorization of CENTUM T&S.
*/

// DOM Selectors
const selectorTabs = {
    selfCheckTestList: '#selfCheckTest',  
    arrayNodelistOfSelfCheckTest: '#selfCheckTest li', 
    startCheckTestBtn: '#startCheckTestBtn',
    stopCheckTestButton: '#stopCheckTestBtn',
}
  
  // Selecting DOM elements
  const selfCheckTestList = document.querySelector(selectorTabs.selfCheckTestList);
  const arrayNodelistOfSelfCheckTest = document.querySelectorAll(
    selectorTabs.arrayNodelistOfSelfCheckTest
  );
  const startCheckTestBtn = document.querySelector(selectorTabs.startCheckTestBtn);
  const stopCheckTestButton = document.querySelector(selectorTabs.stopCheckTestButton);


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
async function postJSON(trigerType) {
  const data = {'checkTestDDRname' : selectedCheckTestDDRName, 'type': trigerType.target.innerText };
  console.log(data);
  try {
    const response = await fetch('/selftest', {
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
}

  /**
 * @function onMessageSelect
 * @description Handles the selection of a skip station from the list.
 * @param {HTMLElement} targetNode - The clicked list item (skip station).
 */
const onSelectedTest = (targetNode) => {
  // Remove selection from all skip stations
  arrayNodelistOfSelfCheckTest.forEach((el) => el.classList.remove('selected'));
  // Add selection to the clicked station
  if(targetNode.dataset.test) { 
    targetNode.classList.add('selected');
    
    // Enable the skip button
    stopCheckTestButton.removeAttribute('disabled');
    
    // Store the selected message ID from the data attribute
    selectedCheckTestDDRName = targetNode.dataset.test;
  }
}

const selectedSelfTestName = (event) => { 
  const targetNode = event.target.closest('li'); // Get the closest list item
  if (targetNode) onSelectedTest(targetNode);
}
  
  // Event listener for selecting self stations
  selfCheckTestList.addEventListener('click', selectedSelfTestName);
  startCheckTestBtn.addEventListener('click', postJSON);
  stopCheckTestButton.addEventListener('click', postJSON);



  // Function to handle beforeunload
  const handleBeforeUnload = () => {
    cleanUp(); // Ensure other listeners are cleaned up too
  };
  
  /**
   * @function cleanUp
   * @description Cleans up event listeners when the page is unloaded.
   */
  const cleanUp = () => {
    window.removeEventListener('beforeunload', handleBeforeUnload); // Remove beforeunload listener
  };
  
  // Add the beforeunload listener
  window.addEventListener('beforeunload', handleBeforeUnload);
  