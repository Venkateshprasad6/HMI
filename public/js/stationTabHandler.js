// DOOR INDICATION DDR VARIABLES
const DDR_LEFT_DOOR_INDICATOR = "HMI_CDoorOpenSideLeft";
const DDR_BOTH_DOORS_INDICATOR = "HMI_CDoorOpenSideBoth";
const DDR_RIGHT_DOOR_INDICATOR = "HMI_CDoorOpenSideRight";

// STATION ANNOUNCEMENT DDR VARIABLE
const DDR_STATION_ANNOUNCEMENT = "HMI_CStationTriggerCodeID";

// VARIABLES FOR DOOR INDICATION
const LEFT_DOOR_INDICATOR = "LEFT";
const BOTH_DOOR_INDICATOR = "BOTH";
const RIGHT_DOOR_INDICATOR = "RIGHT";

// VARIABLES FOR TYPE IDENTIFICATION WHETHER DOOR-TYPE OR STATION-ANNOUNCEMENT BUTTONS IS CLICKED BASED ON THE SELECTION IT WILL DISPLAYS THE TYPE.
const TRAIN_DOOR_STATUS = "DoorIndication";
const ACTIVE_STATION_ANNOUNCEMENT = "Announcement";

// DOM SELECTORS

const selectorTabs = {
  doorIndicationButton: "#door",
  statusAnnouncementButton: "#announcement",
};
// DOM ELEMENTS FOR HANDLING USER INPUT ERRORS AND ACTIONS
const doorIndicationButton = document.querySelector(
  selectorTabs.doorIndicationButton
);
const statusAnnouncementButton = document.querySelector(
  selectorTabs.statusAnnouncementButton
);

const setActiveDoor = (event) => {
  event.preventDefault();

  if (event.target.tagName === "BUTTON") {
    if (event.target.classList.contains("btn-active")) {
      event.target.classList.remove("btn-active");
      event.target.classList.add("btn-not-active");

      sendDoorStatus(ddrName, false);
    } else {
      event.target.classList.remove("btn-not-active");
      event.target.classList.add("btn-active");

      const doorType = event.target.textContent.trim();

      switch (doorType) {
        case LEFT_DOOR_INDICATOR:
          ddrName = DDR_LEFT_DOOR_INDICATOR;
          break;
        case BOTH_DOOR_INDICATOR:
          ddrName = DDR_BOTH_DOORS_INDICATOR;
          break;
        case RIGHT_DOOR_INDICATOR:
          ddrName = DDR_RIGHT_DOOR_INDICATOR;
          break;
      }
      sendDoorStatus(ddrName, true);
    }
  }
};

// STATION ANNOUNCEMENT

const setButtonState = (button, active) => {
  button.classList.remove("btn-active", "btn-not-active");
  button.classList.add(active);
};

const announcementCondition = (nonActiveButtons, activeButton) => {
  nonActiveButtons.forEach((button) => {
    setButtonState(button, "btn-not-active");
    button.disabled = true;
  });

  setButtonState(activeButton, "btn-active");
  activeButton.disabled = false;
};

const stationAnnouncement = (event) => {
  event.preventDefault();
  if (event.target.tagName === "BUTTON") {
    event.target.classList.remove("btn-active");
    event.target.classList.add("btn-not-active");
    const clickedBtn = event.target;

    switch (clickedBtn.id) {
      case "departureBtn":
        announcementCondition([departureBtn, arrivalBtn, stopBtn], approachBtn);
        setActiveStationAnnouncement(DDR_STATION_ANNOUNCEMENT, 2);
        break;

      case "approachBtn":
        announcementCondition([departureBtn, approachBtn, stopBtn], arrivalBtn);
        setActiveStationAnnouncement(DDR_STATION_ANNOUNCEMENT, 3);
        break;

      case "arrivalBtn":
        announcementCondition([departureBtn, approachBtn, arrivalBtn], stopBtn);
        setActiveStationAnnouncement(DDR_STATION_ANNOUNCEMENT, 4);
        break;

      case "stopBtn":
        sendDoorStatus(DDR_LEFT_DOOR_INDICATOR, false);
        sendDoorStatus(DDR_BOTH_DOORS_INDICATOR, false);
        sendDoorStatus(DDR_RIGHT_DOOR_INDICATOR, false);
        announcementCondition([stopBtn, approachBtn, arrivalBtn], departureBtn);
        setActiveStationAnnouncement(DDR_STATION_ANNOUNCEMENT, 1);
        break;
    }
  }
};

// POST CALL IMPLEMENTATION FOR THE DOOR-INDICATION & STATION-ANNOUNCEMENT
const sendpostReq = async (ddrName, ddrValue, type) => {
  try {
    const response = await fetch("/station", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ddrName,
        ddrValue,
        type,
      }),
    });

    if (response.ok) {
      const data = await response.json();
    }
  } catch (error) {
    console.error("Error ", error);
  }
};

const sendDoorStatus = (ddrName, ddrValue) => {
  sendpostReq(ddrName, ddrValue, TRAIN_DOOR_STATUS);
};

const setActiveStationAnnouncement = (ddrName, ddrValue) => {
  sendpostReq(ddrName, ddrValue, ACTIVE_STATION_ANNOUNCEMENT);
};

// ADD-EVENT-LISTENERS
doorIndicationButton.addEventListener("click", setActiveDoor);
statusAnnouncementButton.addEventListener("click", stationAnnouncement);

// Function to handle beforeunload
const handleBeforeUnload = () => {
  cleanUp(); // Ensure other listeners are cleaned up too
};

/**
 * @function cleanUp
 * @description Removes all event listeners to prevent memory leaks when the page is closed or refreshed.
 */
const cleanUp = () => {
  doorIndicationButton.removeEventListener("click", setActiveDoor);
  statusAnnouncementButton.removeEventListener("click", stationAnnouncement);
  window.removeEventListener("beforeunload", handleBeforeUnload);
};

// Add the beforeunload listener
window.removeEventListener("beforeunload", handleBeforeUnload);
