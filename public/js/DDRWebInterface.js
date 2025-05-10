/**
 * @file DDRWebInterface.js
 *
 * Description:
 * ------------
 * This script manages various functionalities related to DDR variables,
 * including their configuration, value updates, and interactions with the web interface.
 *
 * (C) Copyright CENTUM T&S 2024. All rights reserved.
 * This computer program may not be used, copied, distributed, translated, transmitted, or assigned
 * without the prior written authorization of CENTUM T&S.
 *
 */

/**
 * Constants and Variables
 * -----------------------
 * Defines constants for DDR variable names
 */

const DATA_LOCALFIELD_SELECTOR = 'data-ddrvarid'; //Don't change stringName
const DATA_SET_LINESELECTOR = 'data-missionSelect'; //Don't change stringName
const LOGIN_SECURITY_PIN = 'LMT.LocalDate';
const LEAD_LMT_SERVICE_IP = 'PIS.LeadLMTServiceIP';
const LMT_OP_TRAIN_NUMBER = 'LMT.Output.TrainID';
const LMT_LOCALTIME = 'LMT.LocalTime';
const UMC_CONSOLE_RAKEID = 'UMC_CRakeID';
const HMI_LINEID = 'HMI_CLineId';
const LMT_OP_LINE_ID = 'LMT.Output.LineID';
const LMT_OP_MISSION_NAME = 'LMT.Output.MissionName';
const LMT_OP_MISSION_ID = 'LMT.Output.MissionID';
const LMT_OP_CURRENT_STATION_NAME = 'LMT.Output.CurrentStationName';
const LMT_OP_NEXT_STATION_NAME = 'LMT.Output.NextStationName';
const LMT_OP_NEXT_SKIP_STATION_NAME = 'LMT.Output.NextSkipStationName';
const LMT_CURRENT_STATION_SHORT_NAME = 'LMT.Output.CurrentStationShortName';
const LMT_NEXT_STATION_SHORT_NAME = 'LMT.Output.NextStationShortName';

//Message Control Panel
const PIS_INPUT_MESSAGE_PLAYER_EVENTS = 'PIS.Input.MessagePlayerEvent';

//CTC
const DDR_IDENTIFICATION_VEHICLE_ID = 'Identification.VehicleId';
const PAS_INTERCOME_REQUEST_V1_D53 = 'PAS.IntercomRequest.V1.D53';
const PAS_INTERCOME_REQUEST_V3_D54 = 'PAS.IntercomRequest.V3.D54';
const PAS_INTERCOME_V1_STATUS = 'PAS.INTERCOM.V1.D53';
const PAS_INTERCOME_V3_STATUS = 'PAS.INTERCOM.V3.D54';
const PAS_INTERCOME_REQUEST = 'PAS.IntercomRequest';
const PAS_INTERCOME_REQUEST_ANSWERED = 'PAS.IntercomRequestAnswered';
const PAS_INTERCOM_ANSWERED = 'PAS.IntercomAnswered';

// HMI - default variables
const HMI_TRAIN_NUMBER = 'HMI_CTrainID';
const HMI_MISSION_INITIALIZED = 'HMI_CMissionInitialized';
const HMI_FIRST_STATION = 'HMI_CFirstStation';
const HMI_CURRENT_STATION = 'HMI_CCurrentStation';
const HMI_FINAL_DESTINATION = 'HMI_CFinalDestination';

//Operation Mode
const HMI_CMD_OPERATION_MODE = 'HMI_COpMode';
const TXT_AUTO = 'automatic';
const TXT_MANUL = 'manual';

// PEI/PAD Fault For 1st Vehicle
const MCP1_FAULT_V1 = 'UMCi_IDCP1Flt';
const MCP2_FAULT_V1 = 'UMCi_IDCP2Flt';

// PAS – Passenger Announcement Systems
const PAS_ANNOUNCEMENT_REQUEST_V1 = 'PAS.PaOperatorRequest.V1';
const PAS_ANNOUNCEMENT_REQUEST_V3 = 'PAS.PaOperatorRequest.V3';
const PAS_ANNOUNCEMENT_V1 = 'PAS.ANNOUNCEMENT.V1.D53';
const PAS_ANNOUNCEMENT_V3 = 'PAS.ANNOUNCEMENT.V3.D54';

//StationDoorIndication 
const HMI_CMD_DOOR_OPEN_SIDE_LEFT = 'HMI_CDoorOpenSideLeft';
const HMI_CMD_DOOR_OPEN_SIDE_RIGHT = 'HMI_CDoorOpenSideRight';

//StationAnnouncement
const HMI_CMD_STATION_TRIGGER_CODE_ID = 'HMI_CStationTriggerCodeID';

/**
 * DDR Variables
 * Constants used to fetch the subscribed DDR values.
 */
const variablesList = [
  LMT_OP_TRAIN_NUMBER,
  LMT_OP_MISSION_NAME,
  LMT_OP_MISSION_ID,
  LMT_OP_CURRENT_STATION_NAME,
  LMT_OP_NEXT_STATION_NAME,
  LMT_OP_NEXT_SKIP_STATION_NAME,
  LMT_CURRENT_STATION_SHORT_NAME,
  LMT_NEXT_STATION_SHORT_NAME,
];

//LINE ROUTE TAB
const lineSelectionVariableList = [
  HMI_TRAIN_NUMBER,
  HMI_LINEID,
  HMI_FIRST_STATION,
  LMT_OP_CURRENT_STATION_NAME,
  HMI_FINAL_DESTINATION,
];

//CTC Call
const ctcListVariable = [
  DDR_IDENTIFICATION_VEHICLE_ID,
  PAS_INTERCOME_REQUEST_V1_D53,
  PAS_INTERCOME_REQUEST_V3_D54,
  PAS_INTERCOME_V1_STATUS,
  PAS_INTERCOME_V3_STATUS,
  PAS_INTERCOME_REQUEST,
  PAS_INTERCOME_REQUEST_ANSWERED,
  PAS_INTERCOM_ANSWERED
];

const PAnnouncementList = [
  PAS_ANNOUNCEMENT_REQUEST_V1,
  PAS_ANNOUNCEMENT_REQUEST_V3,
]

const stationDoorIndicationArray = [
  HMI_CMD_DOOR_OPEN_SIDE_LEFT,
  HMI_CMD_DOOR_OPEN_SIDE_RIGHT,
  HMI_CMD_STATION_TRIGGER_CODE_ID
]


//Pad configuration
const DATA_STATUS_SELECTOR = 'data-ddrStatusID';
const PAS_Cab1_CabinActive = 'PAS.Cab1.CabinActive';
const PAS_Cab3_CabinActive = 'PAS.Cab3.CabinActive';


const TXT_IDLE = 'IDLE';
const TXT_REQUESTED = 'REQUESTED';
const TXT_CANCELED = 'CANCELED';
const TXT_INPROGRESS = 'INPROGRESS';
const TXT_PENDING = 'PENDING';

const stateClassMap = {
  [TXT_IDLE]: 'PAD-idle',
  [TXT_CANCELED]: 'PAD-idle',
  [TXT_PENDING]: 'PAD-idle',
  [TXT_REQUESTED]: 'PAD-requested',
  [TXT_INPROGRESS]: 'PAD-active'
};

//DMC-1
const PAS_PIC_V1_D387_STATUS = 'PAS.PIC.V1.D387.State';
const PAS_PIC_V1_D388_STATUS = 'PAS.PIC.V1.D388.State';
const PAS_PIC_V1_D389_STATUS = 'PAS.PIC.V1.D389.State';
const PAS_PIC_V1_D390_STATUS = 'PAS.PIC.V1.D390.State';
const PAS_PIC_V1_D391_STATUS = 'PAS.PIC.V1.D391.State';

//TC-1
const PAS_PIC_V2_D395_STATUS = 'PAS.PIC.V2.D395.State';
const PAS_PIC_V2_D396_STATUS = 'PAS.PIC.V2.D396.State';
const PAS_PIC_V2_D397_STATUS = 'PAS.PIC.V2.D397.State';
const PAS_PIC_V2_D398_STATUS = 'PAS.PIC.V2.D398.State';

//DMC-2
const PAS_PIC_V3_D403_STATUS = 'PAS.PIC.V3.D403.State';
const PAS_PIC_V3_D404_STATUS = 'PAS.PIC.V3.D404.State';
const PAS_PIC_V3_D405_STATUS = 'PAS.PIC.V3.D405.State';
const PAS_PIC_V3_D406_STATUS = 'PAS.PIC.V3.D406.State';
const PAS_PIC_V3_D407_STATUS = 'PAS.PIC.V3.D407.State';

//PEI - call
const HMI_CPEI1Slctd_V1 = 'HMI_CPEI1Slctd_V1';
const HMI_CPEI2Slctd_V1 = 'HMI_CPEI2Slctd_V1';
const HMI_CPEI3Slctd_V1 = 'HMI_CPEI3Slctd_V1';
const HMI_CPEI4Slctd_V1 = 'HMI_CPEI4Slctd_V1';
const HMI_CPEI5Slctd_V1 = 'HMI_CPEI5Slctd_V1';


const HMI_CPEI1Slctd_V2 = 'HMI_CPEI1Slctd_V2';
const HMI_CPEI2Slctd_V2 = 'HMI_CPEI2Slctd_V2';
const HMI_CPEI3Slctd_V2 = 'HMI_CPEI3Slctd_V2';
const HMI_CPEI4Slctd_V2 = 'HMI_CPEI4Slctd_V2';

const HMI_CPEI1Slctd_V3 = 'HMI_CPEI1Slctd_V3';
const HMI_CPEI2Slctd_V3 = 'HMI_CPEI2Slctd_V3';
const HMI_CPEI3Slctd_V3 = 'HMI_CPEI3Slctd_V3';
const HMI_CPEI4Slctd_V3 = 'HMI_CPEI4Slctd_V3';
const HMI_CPEI5Slctd_V3 = 'HMI_CPEI5Slctd_V3';

//STATUS OF PAD
//DMC-1
const PADState = [
  PAS_PIC_V1_D387_STATUS,
  PAS_PIC_V1_D388_STATUS,
  PAS_PIC_V1_D389_STATUS,
  PAS_PIC_V1_D390_STATUS,
  PAS_PIC_V1_D391_STATUS,
  //TC-1
  PAS_PIC_V2_D395_STATUS,
  PAS_PIC_V2_D396_STATUS,
  PAS_PIC_V2_D397_STATUS,
  PAS_PIC_V2_D398_STATUS,
  //DMC-2
  PAS_PIC_V3_D403_STATUS,
  PAS_PIC_V3_D404_STATUS,
  PAS_PIC_V3_D405_STATUS,
  PAS_PIC_V3_D406_STATUS,
  PAS_PIC_V3_D407_STATUS,
]

const arrayOfPEICalls = [
  HMI_CPEI1Slctd_V1,
  HMI_CPEI2Slctd_V1,
  HMI_CPEI3Slctd_V1,
  HMI_CPEI4Slctd_V1,
  HMI_CPEI5Slctd_V1,


  HMI_CPEI1Slctd_V2,
  HMI_CPEI2Slctd_V2,
  HMI_CPEI3Slctd_V2,
  HMI_CPEI4Slctd_V2,

  HMI_CPEI1Slctd_V3,
  HMI_CPEI2Slctd_V3,
  HMI_CPEI3Slctd_V3,
  HMI_CPEI4Slctd_V3,
  HMI_CPEI5Slctd_V3,
]

/**
 * DDR Configuration
 * ------------------
 * Defines functions to interact with DDR variables:
 * - `getDDRVariable(variableName)`: Fetches the DDR variable value.
 * - `getVariableValue(variableName)`: Returns the value of the specified DDR variable.
 * - `getDDRValuePlaceholders(dataSelector, ddrName)`: Retrieves all DOM elements with a specific DDR data attribute.
 */

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

const getDDRValuePlaceholders = (dataSelector, ddrName) => {
  return document.querySelectorAll(`[${dataSelector}="${ddrName}"]`);
};

const getElementByDataSelector = (dataSelector, ddrName) => {
  return document.querySelector(`[${dataSelector}="${ddrName}"]`);
};

const getElementByID = (eleID) => {
  return document.getElementById(eleID);
}

/**
 * DDR Value Updates
 * ------------------
 * `getUpdatedSubscribeValues(subVariable)`: Fetches and updates the subscribed DDR value in the DOM.
 */
const getUpdateSubscribeValues = async (subDDRVariable) => {
  const { name, value } = subDDRVariable;
  const placeholders = getDDRValuePlaceholders(DATA_LOCALFIELD_SELECTOR, name);
  //console.log("Train Status", placeholders);
  if (placeholders.length <= 0) return;
  let currentDDRvalue = value != null ? String(value).split(';')[0].trim() : '';
  //console.log("currentDDRvalue", currentDDRvalue);
  placeholders.forEach((elt) => {
    if (elt.innerText === currentDDRvalue) return;
    elt.innerText = currentDDRvalue;
  });
};

/**
 * Handles the state change for lost or fault PAD (Passenger Access Door) status.
 * It retrieves the placeholder element based on the provided DDR name and updates 
 * the UI to indicate the lost state if applicable.
 */
const getUpdateLostOrFaultState = async (gDDrVariable) => {
  const { name, value } = gDDrVariable;
  const placeholders = getElementByDataSelector(DATA_LOCALFIELD_SELECTOR, name);
  //if (!placeholders) throw new Error('Placeholder not found in the DOM');
  if (placeholders) {
    const PAD_LOST_DDRName = placeholders.dataset.ddrlostid;
    const PAD_LOST_DDRValue = await getVariableValue(PAD_LOST_DDRName);
    if (value === true || PAD_LOST_DDRValue === true) {
      placeholders.classList.remove('PAD-idle');
      placeholders.classList.add('PAD-lost-red');
    }
  }
};

/**
 * Determines whether the manual button should be active or disabled based on 
 * the received variable value. Updates button classes accordingly.
 */
const isManualButtonActive = async (pVarDDRname) => {
  const { name, value } = pVarDDRname;
  //console.log("Manualu -----", pVarDDRname);
  const placeholders = getDDRValuePlaceholders(DATA_LOCALFIELD_SELECTOR, name);
  //console.log("placeholders", placeholders);
  if (placeholders.length <= 0) return;
  placeholders.forEach((elt) => {
    elt.classList.remove('autoMode-active', 'manualMode-active');
    const isAutoEle = elt.getAttribute('name');
    value === true ? elt.classList.remove('disabled') : elt.classList.add('disabled');
    if (TXT_AUTO === isAutoEle && !value) {
      elt.classList.add('autoMode-active');
      elt.classList.remove('disabled');
    }
    if (TXT_MANUL === isAutoEle && value) {
      elt.classList.add('manualMode-active');
      elt.classList.remove('disabled');
    }
  });
};

/**
 * Handles identification of vehicle ID and updates intercom call states accordingly.
 * Fetches relevant variables to determine whether a call is pending, active, or ended.
 */
const getIdentificationVehicleID = async (vehicleID) => {
  try {
    const placeholders = document.querySelector('#CTCIntercome');
    const callStateElement = document.querySelector('#callState');
    const intercomRequestKey =
      vehicleID.value == 1
        ? PAS_INTERCOME_REQUEST_V1_D53
        : PAS_INTERCOME_REQUEST_V3_D54;

    const [vehicleRequestState, intercomRequestState, intercomAnsweredState, intercomStatusV1, intercomStatusV3] = await Promise.all([
      getVariableValue(intercomRequestKey),
      getVariableValue(PAS_INTERCOME_REQUEST),
      getVariableValue(PAS_INTERCOME_REQUEST_ANSWERED),
      getVariableValue(PAS_INTERCOME_V1_STATUS),
      getVariableValue(PAS_INTERCOME_V3_STATUS),
    ]);

    //console.log(`Vehicle Request State: ${vehicleRequestState}`);
    //console.log(`Intercom Request State: ${intercomRequestState}`);
    //console.log(`Intercom Answered State: ${intercomAnsweredState}`);

    // Handle call states
    if (intercomRequestState && !intercomAnsweredState) {
      // Call pending
      placeholders.classList.add('ctc-pending');
      placeholders.classList.remove('ctc-active');
      placeholders.dataset.status = 'call-pending';
      callStateElement.innerText = 'PENDING';
    } else if (intercomRequestState && intercomAnsweredState) {
      // Call active
      placeholders.classList.remove('ctc-pending');
      placeholders.classList.add('ctc-active');
      placeholders.dataset.status = 'call-active';
      callStateElement.innerText = 'ACTIVE';
    } else if (!intercomRequestState && !intercomAnsweredState && !vehicleRequestState) {
      // Call ended
      placeholders.classList.remove('ctc-pending', 'ctc-active');
      placeholders.dataset.status = 'call-request';
      callStateElement.innerText = '';
    }
  } catch (error) {
    console.error('Error handling intercom state:', error);
  }
};

/**
 * Updates the station page based on door status changes.
 * Toggles button states (active/inactive) based on the received DDR variable value.
 */
const getAnnouncementVehicleID = async (pDDRVariable) => {
  const { name, value } = pDDRVariable;
  const placeholder = getElementByID('PAnnouncement');
  const vehicleIDIs = await getVariableValue(DDR_IDENTIFICATION_VEHICLE_ID);
  const PAS_Announcement_Request_Vehicle =
    vehicleIDIs == 1
      ? PAS_ANNOUNCEMENT_REQUEST_V1
      : PAS_ANNOUNCEMENT_REQUEST_V3;

  PAS_Announcement_Request_Vehicle == name && value ?
    placeholder.classList.add("pa-active") :
    placeholder.classList.remove("pa-active")
  placeholder.dataset.status = value ? "pa-active" : "pa-request";
}



/**
 * Handles updates to PAD (Passenger Access Door) status and modifies the UI accordingly.
 * Updates class names based on different PAD statuses such as IDLE, REQUESTED, and IN PROGRESS.
 */
const getUpdateStationPage = async (pDDRVariable) => {
  const { name, value } = pDDRVariable;

  const placeholders = getDDRValuePlaceholders(DATA_LOCALFIELD_SELECTOR, name);
  if (placeholders.length === 0) return; // Early exit if no placeholders

  placeholders.forEach((elt) => {
    const isActive = typeof value === "boolean"
      ? value
      : typeof value === "number" && elt.dataset.tringercode == value;

    elt.classList.toggle('btn-active', isActive);
    elt.classList.toggle('btn-not-active', !isActive);
  });
}

const getUpdatePADStatus = async (pDDRVariable) => {
  const { name, value } = pDDRVariable;
  const PEIcallIconElement = getElementByID('PEIcall');
  const placeholders = getDDRValuePlaceholders(DATA_STATUS_SELECTOR, name);

  const vehicleID = await getVariableValue(DDR_IDENTIFICATION_VEHICLE_ID);
  const cabinDDRname = vehicleID == 1 ? PAS_Cab1_CabinActive : PAS_Cab3_CabinActive;

  //active cabin
  const isCabinActive = await getVariableValue(cabinDDRname);

  if (isCabinActive) {

    //reusable updateclass
    const updateClasses = (element, addClass, removeClasses) => {
      element.classList.remove(...removeClasses);
      element.classList.add(addClass);
    };

    if (TXT_REQUESTED == value) {
      PEIcallIconElement.classList.remove('PAD-active', 'PAD-requested');
      PEIcallIconElement.classList.add('PAD-requested');
    } else if (TXT_INPROGRESS == value) {
      PEIcallIconElement.classList.remove('PAD-idle', 'PAD-requested');
      PEIcallIconElement.classList.add('PAD-active');
    }

    if (placeholders.length <= 0) return;

    placeholders.forEach(element => {

      if (TXT_IDLE === value || TXT_CANCELED === value || TXT_PENDING === value) {
        updateClasses(element, 'PAD-idle', ['PAD-active', 'PAD-requested']);
        updateClasses(PEIcallIconElement, 'pacall', ['PAD-idle', 'PAD-active', 'PAD-requested']);
      }

      switch (value) {
        case TXT_REQUESTED:
          updateClasses(element, 'PAD-requested', ['PAD-active', 'PAD-idle']);
          updateClasses(PEIcallIconElement, 'PAD-requested', ['PAD-active', 'PAD-idle']);
          break;
        case TXT_INPROGRESS:
          updateClasses(element, 'PAD-active', ['PAD-requested', 'PAD-idle']);
          updateClasses(PEIcallIconElement, 'PAD-active', ['PAD-requested', 'PAD-idle']);
          break;
      }
    });
  }
}


/**
 * WebSocket Initialization
 * -------------------------
 * Initializes the WebSocket connection and subscribes to DDR variables:
 * - `webDDR.initwebSocket()`: Starts the WebSocket connection and subscribes to DDR variables.
 */

webDDR.initwebSocket(async () => {
  console.log("*** Client-Side WebSocket started ***");
  // Subscribing to variable updates for the LMT list of variables in `variablesList`  
  variablesList.forEach((ddrName) => webDDR.subscribeVariablesValue([ddrName], getUpdateSubscribeValues));

  // Subscribing to `HMI_CMD_OPERATION_MODE` to determine if the manual button should be active  
  webDDR.subscribeVariablesValue([HMI_CMD_OPERATION_MODE], isManualButtonActive);

  // Subscribing to variables in `ctcListVariable` to get the identification of vehicle ID  
  ctcListVariable.forEach(ddrName => webDDR.subscribeVariablesValue([ddrName], getIdentificationVehicleID));

  // Subscribing to PAD state variables to update PAD status  
  PADState.forEach((ddrName) => webDDR.subscribeVariablesValue([ddrName], getUpdatePADStatus));

  // Subscribing to PAS announcement requests (V1 and V3) to get the announcement vehicle ID  
  webDDR.subscribeVariablesValue([PAS_ANNOUNCEMENT_REQUEST_V1], getAnnouncementVehicleID);
  webDDR.subscribeVariablesValue([PAS_ANNOUNCEMENT_REQUEST_V3], getAnnouncementVehicleID);

  // Subscribing to station door indication variables to update the station page accordingly  
  stationDoorIndicationArray.forEach((ddrName) => webDDR.subscribeVariablesValue([ddrName], getUpdateStationPage));

});

