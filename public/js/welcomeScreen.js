/**
* @file networkConfiguration.js
* @brief Implementation of the login page redirection after a delay.
*
* This module handles the automatic redirection to the login page 
* three seconds after the window loads. It can be useful for splash screens
* or initial loading animations.
*
* (C) Copyright Centum T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

window.onload = function () {
  setTimeout(function () {
    // Redirects to the login page after a 3-second delay
    window.location.href = '/login';
  }, 3000);
};
