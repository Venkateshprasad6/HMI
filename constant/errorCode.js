/**
* @file errorCode.js
* @brief HTTP - Status Codes.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

// HTTP STATUS CODE
exports.SUCCESS_OK = 200;

// CLIENT ERROR CODE
exports.BAD_REQUEST = 400;
exports.UNAUTHORIZED_ERR = 401;
exports.FORBIDDEN = 403;
exports.PAGE_NO_TFOUND = 404;
exports.METHOD_NOT_ALLOWED = 405;
exports.REQUEST_TIMEOUT = 408;

// SERVER ERROR CODE
exports.INTERNAL_SERVER_ERR = 500;
exports.BAD_GATEWAY = 502;
exports.SERVICE_UNAVAILABLE = 503;
exports.SERVER_REQUEST_TIMEOUT = 504;
