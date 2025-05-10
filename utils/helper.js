/**
 * @file helper.js
 * @brief Helper functions for handling DDR (Data Distribution Service) variable subscriptions across multiple pages.
 *
 * This module provides utility functions to support the main application by facilitating the subscription 
 * and retrieval of DDR variable data. It specifically offers functions to interact with the DDR service 
 * to fetch and structure data needed by different components of the application.
 *
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted, or assigned
 * without the prior written authorization of CENTUM T&S.
 */
const GStreamerVideo = require('../gStreamer/gstVideoPlayer');
const { getDDRVariableList } = require('../services/mainDDRConfig');


exports.fetchRTSPstreamingURL = async (arrDDRList) => {
  const rtspStringURL = await getDDRVariableList(arrDDRList);
  return rtspStringURL.map(item => item.value);
}


exports.getSubscribList = async (pVariableReq) => {
 const result = await getDDRVariableList(pVariableReq); 
const objData = Object.fromEntries(result.map((item) => [item.name, item.value]));
  return objData;
};
