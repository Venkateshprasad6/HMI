/**
* @file globalDDRVariables.js
* @brief Creating Web-DDR Varibales for CMRL.
* This module exports constants representing Dynamic Data Recorder (DDR) variables
* used in the Human-Machine Interface (HMI) and control systems of a train.
*
* Usage:
* These constants are used throughout the train's software system for monitoring, controlling,
* and interacting with HMI.
* 
* (C) Copyright CENTUM T&S 2024. All rights reserved.
* This computer program may not be used, copied, distributed, translated, transmitted or assigned
* without the prior written authorization of CENTUM T&S.
*/

// DDR variables for HMI
//exports.DDR_MT_TrainNumber = 'CMRL.SIRI.TrainID';
//exports.DDR_MT_TrainNumber = 'TCMS_TRAIN_NUMBER';
exports.LMT_OP_TRAIN_NUMBER = 'LMT.Output.TrainID';
exports.LEAD_LMT_SERVICE_IP = 'PIS.LeadLMTServiceIP';

//ID'S
exports.LMT_MISSION_ID = 'LMT.Output.MissionID';
exports.LMT_LINE_ID = 'LMT.Output.LineID';
exports.LMT_NEXT_STATIONS_ID = 'LMT.Output.NextStationIDs';
exports.LMT_NEXT_SKIP_STATION_ID = 'LMT.Output.NextSkipStationID';
exports.LMT_CURRENT_STATION_ID = 'LMT.Output.CurrentStationID';
exports.LMT_PREV_STATION_ID = 'LMT.Output.PrevStationID';

// NAMES
exports.LMT_LINE_NAME = 'LMT.Output.LineName';
exports.LMT_MISSION_NAME = 'LMT.Output.MissionName';
exports.LMT_NEXT_STATION_NAME = 'LMT.Output.NextStationName';
exports.LMT_NEXT_SKIP_STATION_NAME = 'LMT.Output.NextSkipStationName';
exports.LMT_CURRENT_STATION_NAME = 'LMT.Output.CurrentStationName';
exports.LMT_PREV_STATION_NAME = 'LMT.Output.PrevStationName';
exports.LMT_CURRENT_STATION_SHORTNAME = 'LMT.Output.CurrentStationShortName';
exports.LMT_MISSION_ODOMETER = 'LMT.Output.MissionOdometer';

exports.LMT_GPS_SATELLITES_COUNT = 'LMT.Input.GPS.SatellitesCount';

exports.LMT_DOOR_OPENED_VARIABLE = 'LMT.Input.Door.Opened';
exports.LMT_DOOR_LOCKED_VARIABLE = 'LMT.Input.Door.Locked';


//PA 
exports.PAS_INTERNAL_SPEAKERS_VOLUME = 'PAS.AmbientDisabledControlVariable';
exports.PAS_CABIN_SPEAKERS_VOLUME = 'PAS.CabinSpeakerVolume';
exports.PAS_EXTERNAL_SPEAKERS_VOLUME = 'PAS.ExteriorSpeakerVolume';
exports.PAS_INTERNAL_AMBIENT_SPEAKERS_VOLUME = 'PAS.IsAmbientDisabled';

//MessageGateway IP
exports.LEAD_MESSAGE_GATE_IP = 'CMRL.LeadMessageGatewayIP';
exports.PIS_INPUT_MESSAGE_PLAYER_EVENTS = 'PIS.Input.MessagePlayerEvent';

//global LMT 
exports.LMT_LOCALTIME = 'LMT.LocalTime';

// LMT Output Names
exports.LMT_OP_LINE_NAME = 'LMT.Output.LineName';
exports.LMT_OP_MISSION_NAME = 'LMT.Output.MissionName';
exports.LMT_OP_NEXT_STATION_NAME = 'LMT.Output.NextStationName';
exports.LMT_OP_ORIGIN_STATION_NAME = 'LMT.Output.OriginStationName';
exports.LMT_OP_CURRENT_STATION_NAME = 'LMT.Output.CurrentStationName';
exports.LMT_OP_DESTINATION_STATION_NAME = 'LMT.Output.DestinationStationName';
exports.LMT_OP_CURRENT_STATION_SHORTNAME = 'LMT.Output.CurrentStationShortName';
exports.LMT_OP_NEXT_SKIP_STATION_NAME = 'LMT.Output.NextSkipStationName';
exports.LMT_CURRENT_STATION_SHORT_NAME = 'LMT.Output.CurrentStationShortName';
exports.LMT_NEXT_STATION_SHORT_NAME = 'LMT.Output.NextStationShortName';

// LMT Output ID'S
exports.LMT_OP_LINE_ID = 'LMT.Output.LineID';  

//login
exports.LOGIN_SECURITY_PIN = "HMI.LoginSecurityPin";

// HMI - default variables
exports.HMI_CONSOLE_LINEID = 'HMI_CLineId';
exports.HMI_CONSOLE_TRAIN_NUMBER = 'HMI_CTrainID';
exports.UMC_CONSOLE_RAKEID = 'UMC_CRakeID';
exports.HMI_CONSOLE_MISSION_INITIALIZED = 'HMI_CMissionInitialized';
exports.HMI_CONSOLE_FIRST_STATION = 'HMI_CFirstStation';
exports.HMI_CONSOLE_CURRENT_STATION = 'HMI_CCurrentStation';
exports.HMI_CONSOLE_FINAL_DESTINATION = 'HMI_CFinalDestination';

//Operation Mode
exports.HMI_CMD_OPERATION_MODE = 'HMI_COpMode';

//StationDoorIndication 
exports.HMI_CMD_DOOR_OPEN_SIDE_LEFT = 'HMI_CDoorOpenSideLeft';
exports.HMI_CMD_DOOR_OPEN_SIDE_BOTH = 'HMI_CDoorOpenSideBoth';
exports.HMI_CMD_DOOR_OPEN_SIDE_RIGHT = 'HMI_CDoorOpenSideRight';

//StationAnnouncement
exports.HMI_CMD_STATION_TRIGGER_CODE_ID = 'HMI_CStationTriggerCodeID';

//PAD
exports.HMI_CMD_PEI_ALLRESET = 'UMC_CAllPEIRst';

//CTC
exports.DDR_IDENTIFICATION_VEHICLE_ID = 'Identification.VehicleId';
exports.PAS_INTERCOME_REQUEST_V1_D53 = 'PAS.IntercomRequest.V1.D53';
exports.PAS_INTERCOME_REQUEST_V3_D54 = 'PAS.IntercomRequest.V3.D54';
exports.PAS_INTERCOME_V1_STATUS = 'PAS.INTERCOM.V1.D53';
exports.PAS_INTERCOME_V3_STATUS = 'PAS.INTERCOM.V3.D54';
exports.PAS_INTERCOME_REQUEST = 'PAS.IntercomRequest';
exports.PAS_INTERCOME_REQUEST_ANSWERED = 'PAS.IntercomRequestAnswered';
exports.PAS_INTERCOM_ANSWERED = 'PAS.IntercomAnswered';
exports.PAS_CAB_TO_CAB_ACTIVE = 'PAS.CabToCabActive';

//PA - Announcement
exports.PAS_ANNOUNCEMENT_ACTIVE = 'PAS.AnnouncementActive';
exports.PAS_ANNOUNCEMENT_REQUEST_V1 = 'PAS.PaOperatorRequest.V1';
exports.PAS_ANNOUNCEMENT_REQUEST_V3 = 'PAS.PaOperatorRequest.V3';

//SelfTest
exports.HMI_CMD_LCDTest = 'HMI_CLCDTest';
exports.HMI_CMD_LEDTest = 'HMI_CLEDTest';
exports.HMI_CMD_AudioTest = 'HMI_CAudioTest';

//Camera - CCTV
exports.CAM_DM1_SCAMI1_S3 = 'DM1_SCAMI1_S3';
exports.CAM_DM1_SCAMI2_S3 = 'DM1_SCAMI2_S3';
exports.CAM_DM1_SCAMI3_S3 = 'DM1_SCAMI3_S3';
exports.CAM_DM1_SCAMI4_S3 = 'DM1_SCAMI4_S3';
exports.CAM_T1_SCAMI1_S3 = 'T1_SCAMI1_S3';
exports.CAM_T1_SCAMI2_S3 = 'T1_SCAMI2_S3';
exports.CAM_T1_SCAMI3_S3 = 'T1_SCAMI3_S3';
exports.CAM_T1_SCAMI4_S3 = 'T1_SCAMI4_S3';
exports.CAM_M1_SCAMI1_S3 = 'M1_SCAMI1_S3';
exports.CAM_M1_SCAMI2_S3 = 'M1_SCAMI2_S3';
exports.CAM_M1_SCAMI3_S3 = 'M1_SCAMI3_S3';
exports.CAM_M1_SCAMI4_S3 = 'M1_SCAMI4_S3';
exports.CAM_M2_SCAMI1_S3 = 'M2_SCAMI1_S3';
exports.CAM_M2_SCAMI2_S3 = 'M2_SCAMI2_S3';
exports.CAM_M2_SCAMI3_S3 = 'M2_SCAMI3_S3';
exports.CAM_M2_SCAMI4_S3 = 'M2_SCAMI4_S3';
exports.CAM_T2_SCAMI1_S3 = 'T2_SCAMI1_S3';
exports.CAM_T2_SCAMI2_S3 = 'T2_SCAMI2_S3';
exports.CAM_T2_SCAMI3_S3 = 'T2_SCAMI3_S3';
exports.CAM_T2_SCAMI4_S3 = 'T2_SCAMI4_S3';
exports.CAM_DM2_SCAMI1_S3 = 'DM2_SCAMI1_S3';
exports.CAM_DM2_SCAMI2_S3 = 'DM2_SCAMI2_S3';
exports.CAM_DM2_SCAMI3_S3 = 'DM2_SCAMI3_S3';
exports.CAM_DM2_SCAMI4_S3 = 'DM2_SCAMI4_S3';
exports.CAM_DM1_CCAM1_S3 = 'DM1_CCAM1_S3';
exports.CAM_DM2_CCAM1_S3 = 'DM2_CCAM1_S3';
exports.CAM_DM1_RCAM1_S3 = 'DM1_RCAM1_S3';
exports.CAM_DM1_RCAM2_S3 = 'DM1_RCAM2_S3';
exports.CAM_M1_RCAM1_S3 = 'M1_RCAM1_S3';
exports.CAM_M1_RCAM2_S3 = 'M1_RCAM2_S3';
exports.CAM_M2_RCAM1_S3 = 'M2_RCAM1_S3';
exports.CAM_M2_RCAM2_S3 = 'M2_RCAM2_S3';
exports.CAM_DM2_RCAM1_S3 = 'DM2_RCAM1_S3';
exports.CAM_DM2_RCAM2_S3 = 'DM2_RCAM2_S3';
exports.CAM_DM1_FCAM1_S3 = 'DM1_FCAM1_S3';
exports.CAM_DM1_FCAM2_S3 = 'DM1_FCAM2_S3';
exports.CAM_DM2_FCAM1_S3 = 'DM2_FCAM1_S3';
exports.CAM_DM2_FCAM2_S3 = 'DM2_FCAM2_S3';
exports.CAM_T1_PCAM1_S3 = 'T1_PCAM1_S3';
exports.CAM_T2_PCAM1_S3 = 'T2_PCAM1_S3';
