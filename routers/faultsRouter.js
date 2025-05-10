/**
* @file faultRoute.js
* @brief Router for handling fault page.
* 
* This module defines the routes related to fault and renders the fault page.
*
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted, or assigned
* without the prior written authorization of CENTUM T&S.
*/

const express = require('express'); // Import the Express library
const router = express.Router(); // Create a new router instance

const {
  DCP1_FAULT_V1,
  DCP2_FAULT_V1,

  DCP1_LOST_V2,
  DCP2_LOST_V2,

  PAD1_FAULT_V1,
  PAD1_FAULT_V2,
  PAD1_FAULT_V3,

  PAD2_FAULT_V1,
  PAD2_FAULT_V2,
  PAD2_FAULT_V3,

  PAD3_FAULT_V1,
  PAD3_FAULT_V2,
  PAD3_FAULT_V3,

  PAD4_FAULT_V1,
  PAD4_FAULT_V2,
  PAD4_FAULT_V3,

  PAD5_FAULT_V1,
  PAD5_FAULT_V3,

  PAD1_LOST_V1,
  PAD1_LOST_V2,
  PAD1_LOST_V3,

  PAD2_LOST_V1,
  PAD2_LOST_V2,
  PAD2_LOST_V3,

  PAD3_LOST_V1,
  PAD3_LOST_V2,
  PAD3_LOST_V3,

  PAD4_LOST_V1,
  PAD4_LOST_V2,
  PAD4_LOST_V3,

  PAD5_LOST_V1,
  PAD5_LOST_V3,

  FDI_FAULT_1,
  FDI_FAULT_2,
  FDI_LOST_1,
  FDI_LOST_2,

  PID1_FAULT_V1,
  PID1_FAULT_V2,
  PID1_FAULT_V3,

  PID2_FAULT_V1,
  PID2_FAULT_V2,
  PID2_FAULT_V3,

  PID3_FAULT_V1,
  PID3_FAULT_V2,
  PID3_FAULT_V3,

  PID4_FAULT_V1,
  PID4_FAULT_V2,
  PID4_FAULT_V3,

  PID5_FAULT_V1,
  PID5_FAULT_V2,
  PID5_FAULT_V3,

  PID6_FAULT_V1,
  PID6_FAULT_V2,
  PID6_FAULT_V3,

  PID1_LOST_V1,
  PID1_LOST_V2,
  PID1_LOST_V3,

  PID2_LOST_V1,
  PID2_LOST_V2,
  PID2_LOST_V3,

  PID3_LOST_V1,
  PID3_LOST_V2,
  PID3_LOST_V3,

  PID4_LOST_V1,
  PID4_LOST_V2,
  PID4_LOST_V3,

  PID5_LOST_V1,
  PID5_LOST_V2,
  PID5_LOST_V3,

  PID6_LOST_V1,
  PID6_LOST_V2,
  PID6_LOST_V3,

  DRM1_FAULT_V1,
  DRM1_FAULT_V2,
  DRM1_FAULT_V3,

  DRM2_FAULT_V1,
  DRM2_FAULT_V2,
  DRM2_FAULT_V3,

  DRM3_FAULT_V1,
  DRM3_FAULT_V2,
  DRM3_FAULT_V3,

  DRM4_FAULT_V1,
  DRM4_FAULT_V2,
  DRM4_FAULT_V3,

  DRM5_FAULT_V1,
  DRM5_FAULT_V2,
  DRM5_FAULT_V3,

  DRM6_FAULT_V1,
  DRM6_FAULT_V2,
  DRM6_FAULT_V3,

  DRM7_FAULT_V1,
  DRM7_FAULT_V2,
  DRM7_FAULT_V3,

  DRM8_FAULT_V1,
  DRM8_FAULT_V2,
  DRM8_FAULT_V3,

  DRM1_LOST_V1,
  DRM1_LOST_V2,
  DRM1_LOST_V3,

  DRM2_LOST_V1,
  DRM2_LOST_V2,
  DRM2_LOST_V3,

  DRM3_LOST_V1,
  DRM3_LOST_V2,
  DRM3_LOST_V3,

  DRM4_LOST_V1,
  DRM4_LOST_V2,
  DRM4_LOST_V3,

  DRM5_LOST_V1,
  DRM5_LOST_V2,
  DRM5_LOST_V3,

  DRM6_LOST_V1,
  DRM6_LOST_V2,
  DRM6_LOST_V3,

  DRM7_LOST_V1,
  DRM7_LOST_V2,
  DRM7_LOST_V3,

  DRM8_LOST_V1,
  DRM8_LOST_V2,
  DRM8_LOST_V3,

  NVR_FAULT_1,
  NVR_FAULT_2,
  NVR_LOSS_1,
  NVR_LOSS_2,

  ICAM1_FAULT_V1,
  ICAM1_FAULT_V2,
  ICAM1_FAULT_V3,

  ICAM2_FAULT_V1,
  ICAM2_FAULT_V2,
  ICAM2_FAULT_V3,

  ICAM3_FAULT_V1,
  ICAM3_FAULT_V2,
  ICAM3_FAULT_V3,

  ICAM4_FAULT_V1,
  ICAM4_FAULT_V2,
  ICAM4_FAULT_V3,

  ICAM1_LOST_V1,
  ICAM1_LOST_V2,
  ICAM1_LOST_V3,

  ICAM2_LOST_V1,
  ICAM2_LOST_V2,
  ICAM2_LOST_V3,

  ICAM3_LOST_V1,
  ICAM3_LOST_V2,
  ICAM3_LOST_V3,

  ICAM4_LOST_V1,
  ICAM4_LOST_V2,
  ICAM4_LOST_V3,

  ICAM_EXT1_FAULT_V1,
  ICAM_EXT1_FAULT_V2,
  ICAM_EXT1_FAULT_V3,

  ICAM_EXT2_FAULT_V1,
  ICAM_EXT2_FAULT_V2,
  ICAM_EXT2_FAULT_V3,

  ICAM_EXT1_LOST_V1,
  ICAM_EXT1_LOST_V2,
  ICAM_EXT1_LOST_V3,

  ICAM_EXT2_LOST_V1,
  ICAM_EXT2_LOST_V2,
  ICAM_EXT2_LOST_V3,

  ICAM_CAB1_FAULT_V1,
  ICAM_CAB2_FAULT_V1,
  ICAM_CAB1_LOST_V1,
  ICAM_CAB2_LOST_V1,

  ICAM_PANTO1_FAULT_V1,
  ICAM_PANTO2_FAULT_V1,
  ICAM_PANTO1_LOST_V1,
  ICAM_PANTO2_LOST_V1,

  ICAM_FRONT1_FAULT_V1,
  ICAM_FRONT2_FAULT_V1,
  ICAM_FRONT1_LOST_V1,
  ICAM_FRONT2_LOST_V1,

  ICAM_OHE1_FAULT_V1,
  ICAM_OHE2_FAULT_V1,

  ICAM_OHE1_LOST_V1,
  ICAM_OHE2_LOST_V1,

  IEDD1_FAULT_V1,
  IEDD2_FAULT_V1,
  IEDD1_FAULT_V2,
  IEDD2_FAULT_V2,
  IEDD1_FAULT_V3,
  IEDD2_FAULT_V3,

  IEDD1_LOST_V1,
  IEDD2_LOST_V1,
  IEDD1_LOST_V2,
  IEDD2_LOST_V2,
  IEDD1_LOST_V3,
  IEDD2_LOST_V3,

  INTSPKLN1_FAULT_V1,
  INTSPKLN2_FAULT_V1,
  INTSPKLN3_FAULT_V1,
  INTSPKLN4_FAULT_V1,

  INTSPKLN1_FAULT_V2,
  INTSPKLN2_FAULT_V2,
  INTSPKLN3_FAULT_V2,
  INTSPKLN4_FAULT_V2,

  INTSPKLN1_FAULT_V3,
  INTSPKLN2_FAULT_V3,
  INTSPKLN3_FAULT_V3,
  INTSPKLN4_FAULT_V3,

  EXTSPKLN1_FAULT_V1,
  EXTSPKLN2_FAULT_V1,
  EXTSPKLN3_FAULT_V1,
  EXTSPKLN4_FAULT_V1,

  EXTSPKLN1_FAULT_V2,
  EXTSPKLN2_FAULT_V2,
  EXTSPKLN3_FAULT_V2,
  EXTSPKLN4_FAULT_V2,

  EXTSPKLN1_FAULT_V3,
  EXTSPKLN2_FAULT_V3,
  EXTSPKLN3_FAULT_V3,
  EXTSPKLN4_FAULT_V3

} = require('../constant/faultDDRVariables');

const DCP_CombinedArray = [
  { fault: DCP1_FAULT_V1, lost: DCP1_LOST_V2, required: true },
  { required: false },
  { fault: DCP2_FAULT_V1, lost: DCP2_LOST_V2, required: true }
];

const PAD1_CombinedArray = [
  { fault: PAD1_FAULT_V1, lost: PAD1_LOST_V1 },
  { fault: PAD1_FAULT_V2, lost: PAD1_LOST_V2 },
  { fault: PAD1_FAULT_V3, lost: PAD1_LOST_V3 }
];

const PAD2_CombinedArray = [
  { fault: PAD2_FAULT_V1, lost: PAD2_LOST_V1 },
  { fault: PAD2_FAULT_V2, lost: PAD2_LOST_V2 },
  { fault: PAD2_FAULT_V3, lost: PAD2_LOST_V3 }
];

const PAD3_CombinedArray = [
  { fault: PAD3_FAULT_V1, lost: PAD3_LOST_V1 },
  { fault: PAD3_FAULT_V2, lost: PAD3_LOST_V2 },
  { fault: PAD3_FAULT_V3, lost: PAD3_LOST_V3 }
];

const PAD4_CombinedArray = [
  { fault: PAD4_FAULT_V1, lost: PAD4_LOST_V1 },
  { fault: PAD4_FAULT_V2, lost: PAD4_LOST_V2 },
  { fault: PAD4_FAULT_V3, lost: PAD4_LOST_V3 }
];

const PAD5_CombinedArray = [
  { fault: PAD5_FAULT_V1, lost: PAD5_LOST_V1, required: true },
  { required: false },
  { fault: PAD5_FAULT_V3, lost: PAD5_LOST_V3, required: true }
];

const FDI_CombinedArray = [
  { fault: FDI_FAULT_1, lost: FDI_LOST_1, required: true },
  { required: false },
  { fault: FDI_FAULT_2, lost: FDI_LOST_2, required: true }
];

const PID1_CombinedArray = [
  { fault: PID1_FAULT_V1, lost: PID1_LOST_V1 },
  { fault: PID1_FAULT_V2, lost: PID1_LOST_V2 },
  { fault: PID1_FAULT_V3, lost: PID1_LOST_V3 },
];

const PID2_CombinedArray = [
  { fault: PID2_FAULT_V1, lost: PID2_LOST_V1 },
  { fault: PID2_FAULT_V2, lost: PID2_LOST_V2 },
  { fault: PID2_FAULT_V3, lost: PID2_LOST_V3 },
];

const PID3_CombinedArray = [
  { fault: PID3_FAULT_V1, lost: PID3_LOST_V1 },
  { fault: PID3_FAULT_V2, lost: PID3_LOST_V2 },
  { fault: PID3_FAULT_V3, lost: PID3_LOST_V3 },
]

const PID4_CombinedArray = [
  { fault: PID4_FAULT_V1, lost: PID4_LOST_V1 },
  { fault: PID4_FAULT_V2, lost: PID4_LOST_V2 },
  { fault: PID4_FAULT_V3, lost: PID4_LOST_V3 },
];

const PID5_CombinedArray = [
  { fault: PID5_FAULT_V1, lost: PID5_LOST_V1 },
  { fault: PID5_FAULT_V2, lost: PID5_LOST_V2 },
  { fault: PID5_FAULT_V3, lost: PID5_LOST_V3 },
]

const PID6_CombinedArray = [
  { fault: PID6_FAULT_V1, lost: PID6_LOST_V1 },
  { fault: PID6_FAULT_V2, lost: PID6_LOST_V2 },
  { fault: PID6_FAULT_V3, lost: PID6_LOST_V3 },
];

const DRM1_CombinedArray = [
  { fault: DRM1_FAULT_V1, lost: DRM1_LOST_V1 },
  { fault: DRM1_FAULT_V2, lost: DRM1_LOST_V2 },
  { fault: DRM1_FAULT_V3, lost: DRM1_LOST_V3 },
];

const DRM2_CombinedArray = [
  { fault: DRM2_FAULT_V1, lost: DRM2_LOST_V1 },
  { fault: DRM2_FAULT_V2, lost: DRM2_LOST_V2 },
  { fault: DRM2_FAULT_V3, lost: DRM2_LOST_V3 },
];

const DRM3_CombinedArray = [
  { fault: DRM3_FAULT_V1, lost: DRM3_LOST_V1 },
  { fault: DRM3_FAULT_V2, lost: DRM3_LOST_V2 },
  { fault: DRM3_FAULT_V3, lost: DRM3_LOST_V3 },
];

const DRM4_CombinedArray = [
  { fault: DRM4_FAULT_V1, lost: DRM4_LOST_V1 },
  { fault: DRM4_FAULT_V2, lost: DRM4_LOST_V2 },
  { fault: DRM4_FAULT_V3, lost: DRM4_LOST_V3 },
];

const DRM5_CombinedArray = [
  { fault: DRM5_FAULT_V1, lost: DRM5_LOST_V1 },
  { fault: DRM5_FAULT_V2, lost: DRM5_LOST_V2 },
  { fault: DRM5_FAULT_V3, lost: DRM5_LOST_V3 },
];

const DRM6_CombinedArray = [
  { fault: DRM6_FAULT_V1, lost: DRM6_LOST_V1 },
  { fault: DRM6_FAULT_V2, lost: DRM6_LOST_V2 },
  { fault: DRM6_FAULT_V3, lost: DRM6_LOST_V3 },
];

const DRM7_CombinedArray = [
  { fault: DRM7_FAULT_V1, lost: DRM7_LOST_V1 },
  { fault: DRM7_FAULT_V2, lost: DRM7_LOST_V2 },
  { fault: DRM7_FAULT_V3, lost: DRM7_LOST_V3 },
];

const DRM8_CombinedArray = [
  { fault: DRM8_FAULT_V1, lost: DRM8_LOST_V1 },
  { fault: DRM8_FAULT_V2, lost: DRM8_LOST_V2 },
  { fault: DRM8_FAULT_V3, lost: DRM8_LOST_V3 },
];

const NVR_CombinedArray = [
  { fault: NVR_FAULT_1, lost: NVR_LOSS_1, required: true },
  { required: false },
  { fault: NVR_FAULT_2, lost: NVR_LOSS_2, required: true }
];

const INT_CAM1_CombinedArray = [
  { fault: ICAM1_FAULT_V1, lost: ICAM1_LOST_V1 },
  { fault: ICAM1_FAULT_V2, lost: ICAM1_LOST_V2 },
  { fault: ICAM1_FAULT_V3, lost: ICAM1_LOST_V3 },
];

const INT_CAM2_CombinedArray = [
  { fault: ICAM2_FAULT_V1, lost: ICAM2_LOST_V1 },
  { fault: ICAM2_FAULT_V2, lost: ICAM2_LOST_V2 },
  { fault: ICAM2_FAULT_V3, lost: ICAM2_LOST_V3 },
];

const INT_CAM3_CombinedArray = [
  { fault: ICAM3_FAULT_V1, lost: ICAM3_LOST_V1 },
  { fault: ICAM3_FAULT_V2, lost: ICAM3_LOST_V2 },
  { fault: ICAM3_FAULT_V3, lost: ICAM3_LOST_V3 },
];

const INT_CAM4_CombinedArray = [
  { fault: ICAM4_FAULT_V1, lost: ICAM4_LOST_V1 },
  { fault: ICAM4_FAULT_V2, lost: ICAM4_LOST_V2 },
  { fault: ICAM4_FAULT_V3, lost: ICAM4_LOST_V3 },
];

const EXT_CAM1_CombinedArray = [
  { fault: ICAM_EXT1_FAULT_V1, lost: ICAM_EXT1_LOST_V1 },
  { fault: ICAM_EXT1_FAULT_V2, lost: ICAM_EXT1_LOST_V2 },
  { fault: ICAM_EXT1_FAULT_V3, lost: ICAM_EXT1_LOST_V3 },
];

const EXT_CAM2_CombinedArray = [
  { fault: ICAM_EXT2_FAULT_V1, lost: ICAM_EXT2_LOST_V1 },
  { fault: ICAM_EXT2_FAULT_V2, lost: ICAM_EXT2_LOST_V2 },
  { fault: ICAM_EXT2_FAULT_V3, lost: ICAM_EXT2_LOST_V3 },
];

const CAB_CAM_CombinedArray = [
  { fault: ICAM_CAB1_FAULT_V1, lost: ICAM_CAB1_LOST_V1, required: true },
  { required: false },
  { fault: ICAM_CAB2_FAULT_V1, lost: ICAM_CAB2_LOST_V1, required: true }
];

const PANTO1_CAM_CombinedArray = [
  { required: false },
  { fault: ICAM_PANTO1_FAULT_V1, lost: ICAM_PANTO1_LOST_V1, required: true },
  { required: false }
];

const PANTO2_CAM_CombinedArray = [
  { required: false },
  { fault: ICAM_PANTO2_FAULT_V1, lost: ICAM_PANTO2_LOST_V1, required: true },
  { required: false },
];

const FRONT_CAM_CombinedArray = [
  { fault: ICAM_FRONT1_FAULT_V1, lost: ICAM_FRONT1_LOST_V1, required: true },
  { required: false },
  { fault: ICAM_FRONT2_FAULT_V1, lost: ICAM_FRONT2_LOST_V1, required: true }
];

const OHE_CombinedArray = [
  { fault: ICAM_OHE1_FAULT_V1, lost: ICAM_OHE1_LOST_V1, required: true },
  { required: false },
  { fault: ICAM_OHE2_FAULT_V1, lost: ICAM_OHE2_LOST_V1, required: true }
];

const IEDD1_CombinedArray = [
  { fault: IEDD1_FAULT_V1, lost: IEDD1_LOST_V1 },
  { fault: IEDD1_FAULT_V2, lost: IEDD1_LOST_V2 },
  { fault: IEDD1_FAULT_V3, lost: IEDD2_LOST_V2 },
];

const IEDD2_CombinedArray = [
  { fault: IEDD2_FAULT_V1, lost: IEDD2_LOST_V1 },
  { fault: IEDD2_FAULT_V2, lost: IEDD1_LOST_V3 },
  { fault: IEDD2_FAULT_V3, lost: IEDD2_LOST_V3 },
];

const INTSPK_LN1_CombinedArray = [
  { fault: INTSPKLN1_FAULT_V1 },
  { fault: INTSPKLN1_FAULT_V2 },
  { fault: INTSPKLN1_FAULT_V3 },
];

const INTSPK_LN2_CombinedArray = [
  { fault: INTSPKLN2_FAULT_V1 },
  { fault: INTSPKLN2_FAULT_V2 },
  { fault: INTSPKLN2_FAULT_V3 },
];

const INTSPK_LN3_CombinedArray = [
  { fault: INTSPKLN3_FAULT_V1 },
  { fault: INTSPKLN3_FAULT_V2 },
  { fault: INTSPKLN3_FAULT_V3 },
];

const INTSPK_LN4_CombinedArray = [
  { fault: INTSPKLN4_FAULT_V1 },
  { fault: INTSPKLN4_FAULT_V2 },
  { fault: INTSPKLN4_FAULT_V3 },
];

const EXTSPK_LN1_CombinedArray = [
  { fault: EXTSPKLN1_FAULT_V1 },
  { fault: EXTSPKLN1_FAULT_V2 },
  { fault: EXTSPKLN1_FAULT_V3 },
];

const EXTSPK_LN2_CombinedArray = [
  { fault: EXTSPKLN2_FAULT_V1 },
  { fault: EXTSPKLN2_FAULT_V2 },
  { fault: EXTSPKLN2_FAULT_V3 },
];

const EXTSPK_LN3_CombinedArray = [
  { fault: EXTSPKLN3_FAULT_V1 },
  { fault: EXTSPKLN3_FAULT_V2 },
  { fault: EXTSPKLN3_FAULT_V3 },
];

const EXTSPK_LN4_CombinedArray = [
  { fault: EXTSPKLN4_FAULT_V1 },
  { fault: EXTSPKLN4_FAULT_V2 },
  { fault: EXTSPKLN4_FAULT_V3 },
];

/**
 * @route GET /faults
 * @description Serve the Faults page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */

router.get('/', async (req, res) => {
  res.render('pages/faultsPage', { // Render the faults page
    title: 'faults', // Title for the page
    script: 'faultWSHandler', // Script to be included in the page
    activeSettings: 'active', // Set the active state for the navigation

    DCP_Data: DCP_CombinedArray,

    PAD1_Data: PAD1_CombinedArray,
    PAD2_Data: PAD2_CombinedArray,
    PAD3_Data: PAD3_CombinedArray,
    PAD4_Data: PAD4_CombinedArray,
    PAD5_Data: PAD5_CombinedArray,

    FDI_Data: FDI_CombinedArray,

    PID1_Data: PID1_CombinedArray,
    PID2_Data: PID2_CombinedArray,
    PID3_Data: PID3_CombinedArray,
    PID4_Data: PID4_CombinedArray,
    PID5_Data: PID5_CombinedArray,
    PID6_Data: PID6_CombinedArray,

    DRM1_Data: DRM1_CombinedArray,
    DRM2_Data: DRM2_CombinedArray,
    DRM3_Data: DRM3_CombinedArray,
    DRM4_Data: DRM4_CombinedArray,
    DRM5_Data: DRM5_CombinedArray,
    DRM6_Data: DRM6_CombinedArray,
    DRM7_Data: DRM7_CombinedArray,
    DRM8_Data: DRM8_CombinedArray,

    NVR_Data: NVR_CombinedArray,

    INT_CAM1_Data: INT_CAM1_CombinedArray,
    INT_CAM2_Data: INT_CAM2_CombinedArray,
    INT_CAM3_Data: INT_CAM3_CombinedArray,
    INT_CAM4_Data: INT_CAM4_CombinedArray,

    EXT_CAM1_Data: EXT_CAM1_CombinedArray,
    EXT_CAM2_Data: EXT_CAM2_CombinedArray,

    CAB_CAM_Data: CAB_CAM_CombinedArray,

    PANTO1_CAM_Data: PANTO1_CAM_CombinedArray,
    PANTO2_CAM_Data: PANTO2_CAM_CombinedArray,

    FRONT_CAM_Data: FRONT_CAM_CombinedArray,

    OHE_Data: OHE_CombinedArray,

    IEDD1_Data: IEDD1_CombinedArray,
    IEDD2_Data: IEDD2_CombinedArray,

    INTSPK_LN1_Data: INTSPK_LN1_CombinedArray,
    INTSPK_LN2_Data: INTSPK_LN2_CombinedArray,
    INTSPK_LN3_Data: INTSPK_LN3_CombinedArray,
    INTSPK_LN4_Data: INTSPK_LN4_CombinedArray,

    EXTSPK_LN1_Data: EXTSPK_LN1_CombinedArray,
    EXTSPK_LN2_Data: EXTSPK_LN2_CombinedArray,
    EXTSPK_LN3_Data: EXTSPK_LN3_CombinedArray,
    EXTSPK_LN4_Data: EXTSPK_LN4_CombinedArray,
  });
});

// Export the router for use in other parts of the application
module.exports = router;
