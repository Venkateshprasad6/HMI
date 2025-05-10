/**
* @file variable.js
* @brief Array Configuration.
* This module exports a constant object defining an array of option values used
* for specific range configurations.
*
* Usage:
* This range array is utilized in various calculations and control processes
* within the application, providing predefined option values.
* 
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

// Constant variable declarion
// Constant variable declarion
exports.brightnessRangeArray = { BrighntessOptionValues : [ [20, "20%"], [40, "40%"], [60, "60%"], [80,"80%"], [100,"100%"]] };
exports.volumeRangeArray = { VolumeOptionValues : [ [65, -10], [70, -5], [75, 0], [80,5], [85,10]] };
exports.cabinSpeakerRangeArray = { VolumeOptionValues : [ [1, -10], [2, -5], [3, 0], [4,5], [5,10]] };