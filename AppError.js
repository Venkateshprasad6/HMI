/**
* @file AppError.js
* @brief Custom error handling class for the application.
*
* This module defines the `AppError` class, which extends the built-in `Error` class to provide 
* structured error handling for the application. It includes properties for the status code and 
* message, allowing for consistent error responses throughout the application.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

class AppError extends Error {
  /**
   * Constructs an instance of AppError.
   * 
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {string} message - A descriptive error message.
   */
  constructor(statusCode, message) {
    super(message); // Call the parent constructor with the message
    console.log(`statusCode ${statusCode}, message ${message}`); // Log the error details
    this.statusCode = statusCode; // Set the status code
    this.message = message; // Set the error message
  }
}

module.exports = AppError; // Export the AppError class for use in other modules
