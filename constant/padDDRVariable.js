//PAD - resetAll
const HMI_CMD_PEI_ALLRESET = 'UMC_CAllPEIRst';
const PAS_EmergencyCallAccepted = 'PAS.EmergencyCallAccepted';

//falult PEI
const ddrFaultVariables = {
    UMCI_IDCP1FLT: 'UMCi_IDCP1Flt',
    UMCI_IPEI1FLT_V1: 'UMCi_IPEI1Flt_V1',
    UMCI_IPEI2FLT_V1: 'UMCi_IPEI2Flt_V1',
    UMCI_IPEI3FLT_V1: 'UMCi_IPEI3Flt_V1',
}

//PEI-lost
const ddrLostVariables = {
    UMCI_IDCP1LOSTCOM: 'UMCi_IDCP1LostCom',
    UMCI_IPEI1LOSTCOM_V1: 'UMCi_IPEI1LostCom_V1',
    UMCI_IPEI2LOSTCOM_V1: 'UMCi_IPEI2LostCom_V1',
    UMCI_IPEI3LOSTCOM_V1: 'UMCi_IPEI3LostCom_V1',
}

//status
const ddrStatusVariable = {
    PAS_PIC_V1_D387_STATUS: 'PAS.PIC.V1.D387.State',
    PAS_PIC_V1_D388_STATUS: 'PAS.PIC.V1.D388.State',
    PAS_PIC_V1_D389_STATUS: 'PAS.PIC.V1.D389.State',
    PAS_PIC_V1_D390_STATUS: 'PAS.PIC.V1.D390.State',
    PAS_PIC_V1_D391_STATUS: 'PAS.PIC.V1.D391.State',

    PAS_PIC_V2_D395_STATUS: 'PAS.PIC.V2.D395.State',
    PAS_PIC_V2_D396_STATUS: 'PAS.PIC.V2.D396.State',
    PAS_PIC_V2_D397_STATUS: 'PAS.PIC.V2.D397.State',
    PAS_PIC_V2_D398_STATUS: 'PAS.PIC.V2.D398.State',

    PAS_PIC_V3_D403_STATUS: 'PAS.PIC.V3.D403.State',
    PAS_PIC_V3_D404_STATUS: 'PAS.PIC.V3.D404.State',
    PAS_PIC_V3_D405_STATUS: 'PAS.PIC.V3.D405.State',
    PAS_PIC_V3_D406_STATUS: 'PAS.PIC.V3.D406.State',
    PAS_PIC_V3_D407_STATUS: 'PAS.PIC.V3.D407.State',
}

const ddrPEICallVariables = {
    HMI_CPEI1Slctd_V1:'HMI_CPEI1Slctd_V1',
    HMI_CPEI2Slctd_V1:'HMI_CPEI2Slctd_V1',
    HMI_CPEI3Slctd_V1:'HMI_CPEI3Slctd_V1',
    HMI_CPEI4Slctd_V1:'HMI_CPEI4Slctd_V1',
    HMI_CPEI5Slctd_V1:'HMI_CPEI5Slctd_V1',


    HMI_CPEI1Slctd_V2:'HMI_CPEI1Slctd_V2',
    HMI_CPEI2Slctd_V2:'HMI_CPEI2Slctd_V2',
    HMI_CPEI3Slctd_V2:'HMI_CPEI3Slctd_V2',
    HMI_CPEI4Slctd_V2:'HMI_CPEI4Slctd_V2',

    HMI_CPEI1Slctd_V3:'HMI_CPEI1Slctd_V3',
    HMI_CPEI2Slctd_V3:'HMI_CPEI2Slctd_V3',
    HMI_CPEI3Slctd_V3:'HMI_CPEI3Slctd_V3',
    HMI_CPEI4Slctd_V3:'HMI_CPEI4Slctd_V3',
    HMI_CPEI5Slctd_V3:'HMI_CPEI5Slctd_V3',
    
}

// padDDRVariable.js
module.exports = { HMI_CMD_PEI_ALLRESET, PAS_EmergencyCallAccepted, ddrFaultVariables, ddrLostVariables, ddrStatusVariable, ddrPEICallVariables };



		