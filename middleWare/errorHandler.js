/**
 * @file errorHandler.js
 * @brief implementation of Error Handling
 *
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted or assigned
 * without the prior written authorization of CENTUM T&S.
 */

const AppError = require('../AppError');
const {
  PAGE_NO_TFOUND,
  INTERNAL_SERVER_ERR,
} = require('../constant/errorCode');

const errorHandler = (error, req, res, next) => {
  console.log('------- ErrorHandler -------:', error);

  if (error.name == 'ValidationError') {
    return res.status(PAGE_NO_TFOUND).send({
      type: 'ValidationError',
      details: error.details,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
    });
  }

  return res.status(INTERNAL_SERVER_ERR).send('Something went Wrong');
};

module.exports = errorHandler;
