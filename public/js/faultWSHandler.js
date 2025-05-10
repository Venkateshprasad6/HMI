const DATA_FAULT_SELECTOR = "data-ddrfaultid"; //Don't change stringName
const DATA_LOST_SELECTOR = "data-ddrlostid"; //Don't change stringName

const DCP1_FAULT_V1 = 'UMCi_IDCP1Flt';
const DCP2_FAULT_V1 = 'UMCi_IDCP2Flt';

const DCP1_LOST_V2 = 'UMCi_IDCP1LostCom';
const DCP2_LOST_V2 = 'UMCi_IDCP2LostCom';

const PAD1_FAULT_V1 = 'UMCi_IPEI1Flt_V1';
const PAD1_FAULT_V2 = 'UMCi_IPEI1Flt_V2';
const PAD1_FAULT_V3 = 'UMCi_IPEI1Flt_V3';

const PAD2_FAULT_V1 = 'UMCi_IPEI2Flt_V1';
const PAD2_FAULT_V2 = 'UMCi_IPEI2Flt_V2';
const PAD2_FAULT_V3 = 'UMCi_IPEI2Flt_V3';

const PAD3_FAULT_V1 = 'UMCi_IPEI3Flt_V1';
const PAD3_FAULT_V2 = 'UMCi_IPEI3Flt_V2';
const PAD3_FAULT_V3 = 'UMCi_IPEI3Flt_V3';

const PAD4_FAULT_V1 = 'UMCi_IPEI4Flt_V1';
const PAD4_FAULT_V2 = 'UMCi_IPEI4Flt_V2';
const PAD4_FAULT_V3 = 'UMCi_IPEI4Flt_V3';

const PAD5_FAULT_V1 = 'UMCi_IPEI5Flt_V1';
const PAD5_FAULT_V3 = 'UMCi_IPEI5Flt_V3';

const PAD1_LOST_V1 = 'UMCi_IPEI1LostCom_V1';
const PAD1_LOST_V2 = 'UMCi_IPEI1LostCom_V2';
const PAD1_LOST_V3 = 'UMCi_IPEI1LostCom_V3';

const PAD2_LOST_V1 = 'UMCi_IPEI2LostCom_V1';
const PAD2_LOST_V2 = 'UMCi_IPEI2LostCom_V2';
const PAD2_LOST_V3 = 'UMCi_IPEI2LostCom_V3';

const PAD3_LOST_V1 = 'UMCi_IPEI3LostCom_V1';
const PAD3_LOST_V2 = 'UMCi_IPEI3LostCom_V2';
const PAD3_LOST_V3 = 'UMCi_IPEI3LostCom_V3';

const PAD4_LOST_V1 = 'UMCi_IPEI4LostCom_V1';
const PAD4_LOST_V2 = 'UMCi_IPEI4LostCom_V2';
const PAD4_LOST_V3 = 'UMCi_IPEI4LostCom_V3';

const PAD5_LOST_V1 = 'UMCi_IPEI5LostCom_V1';
const PAD5_LOST_V3 = 'UMCi_IPEI5LostCom_V3';

const FDI_FAULT_1 = 'UMCi_IEDDFlt_1';
const FDI_FAULT_2 = 'UMCi_IEDDFlt_2';

const FDI_LOST_1 = 'UMCi_IEDDLostCom_1';
const FDI_LOST_2 = 'UMCi_IEDDLostCom_2';

const PID1_FAULT_V1 = 'UMCi_ILCD1Flt_V1';
const PID1_FAULT_V2 = 'UMCi_ILCD1Flt_V2';
const PID1_FAULT_V3 = 'UMCi_ILCD1Flt_V3';

const PID2_FAULT_V1 = 'UMCi_ILCD2Flt_V1';
const PID2_FAULT_V2 = 'UMCi_ILCD2Flt_V2';
const PID2_FAULT_V3 = 'UMCi_ILCD2Flt_V3';

const PID3_FAULT_V1 = 'UMCi_ILCD3Flt_V1';
const PID3_FAULT_V2 = 'UMCi_ILCD3Flt_V2';
const PID3_FAULT_V3 = 'UMCi_ILCD3Flt_V3';

const PID4_FAULT_V1 = 'UMCi_ILCD4Flt_V1';
const PID4_FAULT_V2 = 'UMCi_ILCD4Flt_V2';
const PID4_FAULT_V3 = 'UMCi_ILCD4Flt_V3';

const PID5_FAULT_V1 = 'UMCi_ILCD5Flt_V1';
const PID5_FAULT_V2 = 'UMCi_ILCD5Flt_V2';
const PID5_FAULT_V3 = 'UMCi_ILCD5Flt_V3';

const PID6_FAULT_V1 = 'UMCi_ILCD6Flt_V1';
const PID6_FAULT_V2 = 'UMCi_ILCD6Flt_V2';
const PID6_FAULT_V3 = 'UMCi_ILCD6Flt_V3';

const PID1_LOST_V1 = 'UMCi_ILCD1LostCom_V1';
const PID2_LOST_V1 = 'UMCi_ILCD2LostCom_V1';
const PID3_LOST_V1 = 'UMCi_ILCD3LostCom_V1';
const PID4_LOST_V1 = 'UMCi_ILCD4LostCom_V1';
const PID5_LOST_V1 = 'UMCi_ILCD5LostCom_V1';
const PID6_LOST_V1 = 'UMCi_ILCD6LostCom_V1';

const PID1_LOST_V2 = 'UMCi_ILCD1LostCom_V2';
const PID2_LOST_V2 = 'UMCi_ILCD2LostCom_V2';
const PID3_LOST_V2 = 'UMCi_ILCD3LostCom_V2';
const PID4_LOST_V2 = 'UMCi_ILCD4LostCom_V2';
const PID5_LOST_V2 = 'UMCi_ILCD5LostCom_V2';
const PID6_LOST_V2 = 'UMCi_ILCD6LostCom_V2';

const PID1_LOST_V3 = 'UMCi_ILCD1LostCom_V3';
const PID2_LOST_V3 = 'UMCi_ILCD2LostCom_V3';
const PID3_LOST_V3 = 'UMCi_ILCD3LostCom_V3';
const PID4_LOST_V3 = 'UMCi_ILCD4LostCom_V3';
const PID5_LOST_V3 = 'UMCi_ILCD5LostCom_V3';
const PID6_LOST_V3 = 'UMCi_ILCD6LostCom_V3';

// DRM Faults
const DRM1_FAULT_V1 = 'UMCi_IDRM1Flt_V1';
const DRM1_FAULT_V2 = 'UMCi_IDRM1Flt_V2';
const DRM1_FAULT_V3 = 'UMCi_IDRM1Flt_V3';

const DRM2_FAULT_V1 = 'UMCi_IDRM2Flt_V1';
const DRM2_FAULT_V2 = 'UMCi_IDRM2Flt_V2';
const DRM2_FAULT_V3 = 'UMCi_IDRM2Flt_V3';

const DRM3_FAULT_V1 = 'UMCi_IDRM3Flt_V1';
const DRM3_FAULT_V2 = 'UMCi_IDRM3Flt_V2';
const DRM3_FAULT_V3 = 'UMCi_IDRM3Flt_V3';

const DRM4_FAULT_V1 = 'UMCi_IDRM4Flt_V1';
const DRM4_FAULT_V2 = 'UMCi_IDRM4Flt_V2';
const DRM4_FAULT_V3 = 'UMCi_IDRM4Flt_V3';

const DRM5_FAULT_V1 = 'UMCi_IDRM5Flt_V1';
const DRM5_FAULT_V2 = 'UMCi_IDRM5Flt_V2';
const DRM5_FAULT_V3 = 'UMCi_IDRM5Flt_V3';

const DRM6_FAULT_V1 = 'UMCi_IDRM6Flt_V1';
const DRM6_FAULT_V2 = 'UMCi_IDRM6Flt_V2';
const DRM6_FAULT_V3 = 'UMCi_IDRM6Flt_V3';

const DRM7_FAULT_V1 = 'UMCi_IDRM7Flt_V1';
const DRM7_FAULT_V2 = 'UMCi_IDRM7Flt_V2';
const DRM7_FAULT_V3 = 'UMCi_IDRM7Flt_V3';

const DRM8_FAULT_V1 = 'UMCi_IDRM8Flt_V1';
const DRM8_FAULT_V2 = 'UMCi_IDRM8Flt_V2';
const DRM8_FAULT_V3 = 'UMCi_IDRM8Flt_V3';

// DRM Lost Communication
const DRM1_LOST_V1 = 'UMCi_IDRM1LostCom_V1';
const DRM1_LOST_V2 = 'UMCi_IDRM1LostCom_V2';
const DRM1_LOST_V3 = 'UMCi_IDRM1LostCom_V3';

const DRM2_LOST_V1 = 'UMCi_IDRM2LostCom_V1';
const DRM2_LOST_V2 = 'UMCi_IDRM2LostCom_V2';
const DRM2_LOST_V3 = 'UMCi_IDRM2LostCom_V3';

const DRM3_LOST_V1 = 'UMCi_IDRM3LostCom_V1';
const DRM3_LOST_V2 = 'UMCi_IDRM3LostCom_V2';
const DRM3_LOST_V3 = 'UMCi_IDRM3LostCom_V3';

const DRM4_LOST_V1 = 'UMCi_IDRM4LostCom_V1';
const DRM4_LOST_V2 = 'UMCi_IDRM4LostCom_V2';
const DRM4_LOST_V3 = 'UMCi_IDRM4LostCom_V3';

const DRM5_LOST_V1 = 'UMCi_IDRM5LostCom_V1';
const DRM5_LOST_V2 = 'UMCi_IDRM5LostCom_V2';
const DRM5_LOST_V3 = 'UMCi_IDRM5LostCom_V3';

const DRM6_LOST_V1 = 'UMCi_IDRM6LostCom_V1';
const DRM6_LOST_V2 = 'UMCi_IDRM6LostCom_V2';
const DRM6_LOST_V3 = 'UMCi_IDRM6LostCom_V3';

const DRM7_LOST_V1 = 'UMCi_IDRM7LostCom_V1';
const DRM7_LOST_V2 = 'UMCi_IDRM7LostCom_V2';
const DRM7_LOST_V3 = 'UMCi_IDRM7LostCom_V3';

const DRM8_LOST_V1 = 'UMCi_IDRM8LostCom_V1';
const DRM8_LOST_V2 = 'UMCi_IDRM8LostCom_V2';
const DRM8_LOST_V3 = 'UMCi_IDRM8LostCom_V3';

// NVR Fault DDR Variables
const NVR_FAULT_1 = 'UMCi_INVR1Flt';
const NVR_FAULT_2 = 'UMCi_INVR2Flt';

// NVR Lost Communication DDR Variables
const NVR_LOSS_1 = 'UMCi_INVR1LostCom';
const NVR_LOSS_2 = 'UMCi_INVR2LostCom';

// ICAM1 Faults
const ICAM1_FAULT_V1 = 'UMCi_ICam1Flt_V1';
const ICAM1_FAULT_V2 = 'UMCi_ICam1Flt_V2';
const ICAM1_FAULT_V3 = 'UMCi_ICam1Flt_V3';

// ICAM2 Faults
const ICAM2_FAULT_V1 = 'UMCi_ICam2Flt_V1';
const ICAM2_FAULT_V2 = 'UMCi_ICam2Flt_V2';
const ICAM2_FAULT_V3 = 'UMCi_ICam2Flt_V3';

// ICAM3 Faults
const ICAM3_FAULT_V1 = 'UMCi_ICam3Flt_V1';
const ICAM3_FAULT_V2 = 'UMCi_ICam3Flt_V2';
const ICAM3_FAULT_V3 = 'UMCi_ICam3Flt_V3';

// ICAM4 Faults
const ICAM4_FAULT_V1 = 'UMCi_ICam4Flt_V1';
const ICAM4_FAULT_V2 = 'UMCi_ICam4Flt_V2';
const ICAM4_FAULT_V3 = 'UMCi_ICam4Flt_V3';

// ICAM1 Lost Communication
const ICAM1_LOST_V1 = 'UMCi_ICam1LostCom_V1';
const ICAM1_LOST_V2 = 'UMCi_ICam1LostCom_V2';
const ICAM1_LOST_V3 = 'UMCi_ICam1LostCom_V3';

// ICAM2 Lost Communication
const ICAM2_LOST_V1 = 'UMCi_ICam2LostCom_V1';
const ICAM2_LOST_V2 = 'UMCi_ICam2LostCom_V2';
const ICAM2_LOST_V3 = 'UMCi_ICam2LostCom_V3';

// ICAM3 Lost Communication
const ICAM3_LOST_V1 = 'UMCi_ICam3LostCom_V1';
const ICAM3_LOST_V2 = 'UMCi_ICam3LostCom_V2';
const ICAM3_LOST_V3 = 'UMCi_ICam3LostCom_V3';

// ICAM4 Lost Communication
const ICAM4_LOST_V1 = 'UMCi_ICam4LostCom_V1';
const ICAM4_LOST_V2 = 'UMCi_ICam4LostCom_V2';
const ICAM4_LOST_V3 = 'UMCi_ICam4LostCom_V3';

// ICAM_EXT1 Faults
const ICAM_EXT1_FAULT_V1 = 'UMCi_ICamExt1Flt_V1';
const ICAM_EXT1_FAULT_V2 = 'UMCi_ICamExt1Flt_V2';
const ICAM_EXT1_FAULT_V3 = 'UMCi_ICamExt1Flt_V3';

// ICAM_EXT2 Faults
const ICAM_EXT2_FAULT_V1 = 'UMCi_ICamExt2Flt_V1';
const ICAM_EXT2_FAULT_V2 = 'UMCi_ICamExt2Flt_V2';
const ICAM_EXT2_FAULT_V3 = 'UMCi_ICamExt2Flt_V3';

// ICAM_EXT1 Lost Communication
const ICAM_EXT1_LOST_V1 = 'UMCi_ICamExt1LostCom_V1';
const ICAM_EXT1_LOST_V2 = 'UMCi_ICamExt1LostCom_V2';
const ICAM_EXT1_LOST_V3 = 'UMCi_ICamExt1LostCom_V3';

// ICAM_EXT2 Lost Communication
const ICAM_EXT2_LOST_V1 = 'UMCi_ICamExt2LostCom_V1';
const ICAM_EXT2_LOST_V2 = 'UMCi_ICamExt2LostCom_V2';
const ICAM_EXT2_LOST_V3 = 'UMCi_ICamExt2LostCom_V3';

// Cabin Cam Fault
const ICAM_CAB1_FAULT_V1 = 'UMCi_ICamCabFlt_1';
const ICAM_CAB2_FAULT_V1 = 'UMCi_ICamCabFlt_2';

// Cabin Cam Lots Comm
const ICAM_CAB1_LOST_V1 = 'UMCi_ICamCabLostCom_1';
const ICAM_CAB2_LOST_V1 = 'UMCi_ICamCabLostCom_2';

// Panto Cam Fault For 1st Vehicle
const ICAM_PANTO1_FAULT_V1 = 'UMCi_ICamPant1Flt';
const ICAM_PANTO2_FAULT_V1 = 'UMCi_ICamPant2Flt';

// Panto Cam Lots Comm For 1st Vehicle
const ICAM_PANTO1_LOST_V1 = 'UMCi_ICamPant1LostCom';
const ICAM_PANTO2_LOST_V1 = 'UMCi_ICamPant2LostCom';

// Front Cam (Track Cam) Fault For 1st Vehicle
const ICAM_FRONT1_FAULT_V1 = 'UMCi_ICamFr1Flt_1';
const ICAM_FRONT2_FAULT_V1 = 'UMCi_ICamFr1Flt_2';

// Front Cam (Track Cam) Lost Comm For 1st Vehicle
const ICAM_FRONT1_LOST_V1 = 'UMCi_ICamFr1LostCom_1';
const ICAM_FRONT2_LOST_V1 = 'UMCi_ICamFr1LostCom_2';

// OHE Cam Fault For 1st Vehicle
const ICAM_OHE1_FAULT_V1 = 'UMCi_ICamFr2Flt_1';
const ICAM_OHE2_FAULT_V1 = 'UMCi_ICamFr2Flt_2';

// OHE Cam Lots Comm For 1st Vehicle
const ICAM_OHE1_LOST_V1 = 'UMCi_ICamFr2LostCom_1';
const ICAM_OHE2_LOST_V1 = 'UMCi_ICamFr2LostCom_2';

// IEDD Fault For 1st Vehicle
const IEDD1_FAULT_V1 = 'UMCi_IIDD1Flt_V1';
const IEDD2_FAULT_V1 = 'UMCi_IIDD2Flt_V1';

// IEDD Fault For 2nd Vehicle
const IEDD1_FAULT_V2 = 'UMCi_IIDD1Flt_V2';
const IEDD2_FAULT_V2 = 'UMCi_IIDD2Flt_V2';

// IEDD Fault For 3rd Vehicle
const IEDD1_FAULT_V3 = 'UMCi_IIDD1Flt_V3';
const IEDD2_FAULT_V3 = 'UMCi_IIDD2Flt_V3';

// IEDD Lost Com For 1st Vehicle
const IEDD1_LOST_V1 = 'UMCi_IIDD1LostCom_V1';
const IEDD2_LOST_V1 = 'UMCi_IIDD2LostCom_V1';

// IEDD Lost Com For 2nd Vehicle
const IEDD1_LOST_V2 = 'UMCi_IIDD1LostCom_V2';
const IEDD2_LOST_V2 = 'UMCi_IIDD2LostCom_V2';

// IEDD Lost Com For 3rd Vehicle
const IEDD1_LOST_V3 = 'UMCi_IIDD1LostCom_V3';
const IEDD2_LOST_V3 = 'UMCi_IIDD2LostCom_V3';

// Internal Speaker Line Fault For 1st Vehicle
const INTSPKLN1_FAULT_V1 = 'UMCi_IPEI1IntSpkLineFlt_V1';
const INTSPKLN2_FAULT_V1 = 'UMCi_IPEI2IntSpkLineFlt_V1';
const INTSPKLN3_FAULT_V1 = 'UMCi_IPEI3IntSpkLineFlt_V1';
const INTSPKLN4_FAULT_V1 = 'UMCi_IPEI4IntSpkLineFlt_V1';

// Internal Speaker Line Fault For 2nd Vehicle
const INTSPKLN1_FAULT_V2 = 'UMCi_IPEI1IntSpkLineFlt_V2';
const INTSPKLN2_FAULT_V2 = 'UMCi_IPEI2IntSpkLineFlt_V2';
const INTSPKLN3_FAULT_V2 = 'UMCi_IPEI3IntSpkLineFlt_V2';
const INTSPKLN4_FAULT_V2 = 'UMCi_IPEI4IntSpkLineFlt_V2';

// Internal Speaker Line Fault For 3rd Vehicle
const INTSPKLN1_FAULT_V3 = 'UMCi_IPEI1IntSpkLineFlt_V3';
const INTSPKLN2_FAULT_V3 = 'UMCi_IPEI2IntSpkLineFlt_V3';
const INTSPKLN3_FAULT_V3 = 'UMCi_IPEI3IntSpkLineFlt_V3';
const INTSPKLN4_FAULT_V3 = 'UMCi_IPEI4IntSpkLineFlt_V3';  

// External Speaker Line Fault For 1st Vehicle
const EXTSPKLN1_FAULT_V1 = 'UMCi_IPEI1ExtSpkLineFlt_V1';
const EXTSPKLN2_FAULT_V1 = 'UMCi_IPEI2ExtSpkLineFlt_V1';
const EXTSPKLN3_FAULT_V1 = 'UMCi_IPEI3ExtSpkLineFlt_V1';
const EXTSPKLN4_FAULT_V1 = 'UMCi_IPEI4ExtSpkLineFlt_V1';

// External Speaker Line Fault For 2nd Vehicle
const EXTSPKLN1_FAULT_V2 = 'UMCi_IPEI1ExtSpkLineFlt_V2';
const EXTSPKLN2_FAULT_V2 = 'UMCi_IPEI2ExtSpkLineFlt_V2';
const EXTSPKLN3_FAULT_V2 = 'UMCi_IPEI3ExtSpkLineFlt_V2';
const EXTSPKLN4_FAULT_V2 = 'UMCi_IPEI4ExtSpkLineFlt_V2';

// External Speaker Line Fault For 3rd Vehicle
const EXTSPKLN1_FAULT_V3 = 'UMCi_IPEI1ExtSpkLineFlt_V3';
const EXTSPKLN2_FAULT_V3 = 'UMCi_IPEI2ExtSpkLineFlt_V3';
const EXTSPKLN3_FAULT_V3 = 'UMCi_IPEI3ExtSpkLineFlt_V3';
const EXTSPKLN4_FAULT_V3 = 'UMCi_IPEI4ExtSpkLineFlt_V3'; 

const faultVariablesList = [
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
];

// Function to return color based on the status
const faultStatus = function (status) {
    switch (status) {
        case 'OK':
            return 'limegreen'; // Color for OK status
        case 'KO':
            return 'red'; // Color for NG status
        case 'NA':
            return 'lightgrey'; // Color for NA status
        default:
            return 'lightgrey'; // Default color
    }
};

const getDDRVariable = async (variableName) => {
    return new Promise((resolve, reject) => {
        webDDR.getVariableValue(variableName, (variableValue) => {
            resolve(variableValue);
        });
    });
};

const getVariableValue = async (variableName) => {
    return (await getDDRVariable(variableName)).value;
};

const getDDRValuePlaceholders = (ddrName) => {
    return document.querySelectorAll(
        `[${DATA_FAULT_SELECTOR}="${ddrName}"], [${DATA_LOST_SELECTOR}="${ddrName}"]`
    );
};

const getUpdateSubscribeValues = async (subDDRVariable) => {
    const { name, value } = subDDRVariable;
    const placeholders = getDDRValuePlaceholders(name);

    if (placeholders.length <= 0) return;

    // Fetch the current value for comparison
    const currentDDRvalue = '';

    for (const elt of placeholders) {
        const faultValue = elt.dataset.ddrfaultid;
        const lostValue = elt.dataset.ddrlostid;

        // Fetch the values for faultValue and lostValue
        const faultValueData = await getVariableValue(faultValue);
        const lostValueData = await getVariableValue(lostValue);

        // Determine the status based on faultValueData and lostValueData
        // let status = (faultValueData === false && (lostValueData ?? false) === false) ? "OK" : "KO";
        let status = (faultValueData === false && lostValueData === false) ? "OK" : "NG";
        
        // Update the element's inner text with the fetched values and status
        if (elt.innerText !== currentDDRvalue) {
            elt.innerText = currentDDRvalue; 
        }

        // Append the status to the inner text
        elt.innerText = status;

        elt.style.backgroundColor = faultStatus(status);
    }
};

webDDR.initwebSocket(async () => {
    // console.log("*** Client-Side WebSocket started ***");
        faultVariablesList.forEach(ddrName => 
        webDDR.subscribeVariablesValue([ddrName], getUpdateSubscribeValues)
    );
});
