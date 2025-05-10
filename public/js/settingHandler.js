// Constants
let MIN_LEVEL = 20; // Minimum level for brightness
let MAX_LEVEL = 100; // Maximum level for brightness

// URL for post call
const internalURL = 'settings/internal';
const cabinURL = 'settings/cabin';
const externalURL = 'settings/external';
const avcURL = 'settings/avc';
const combinedVolURL = 'settings/combinedVol';

// DOM Selectors elements - ID
const selectors = {
  internalVolMinus: '#internal-Vol-MINUS',
  internalVolPlus: '#internal-Vol-PLUS',
  cabinVolMinus: '#cabin-Vol-MINUS',
  cabinVolPlus: '#cabin-Vol-PLUS',
  externalVolMinus: '#external-Vol-MINUS',
  externalVolPlus: '#external-Vol-PLUS',
  combinedVolMinus: '#combined-Vol-MINUS',
  combinedVolPlus: '#combined-Vol-PLUS',
};

// DOM Selectors NodeList elements - ID
const setNodeBtnSelector = {
  setBrightnessBtn: '#setBrightnessBtn',
  setInternalSpeakerBtn: '#setInternalSpeakerBtn',
  setCabinSpeakerBtn: '#setCabinSpeakerBtn',
  setExternalSpeakerBtn: '#setExternalSpeakerBtn',
  listInternalVolRange: '#internal-range',
  listCabinVolRange: '#cabin-range',
  listExternalVolRange: '#external-range',
  setCombinedSpeakerBtn: '#setCombinedSpeakerBtn',
};

// DOM Selectors NodeList elements - ID
const selectorNodeList = {
  internalVolRange: '#internal-range option',
  cabinVolRange: '#cabin-range option',
  externalVolRange: '#external-range option',
  combinedVolRange: '#combined-range option',
};

// Input Value elements - ID
const inputSelector = {
  inputInternalSpeaker: '#inputInternalSpeaker',
  inputCabinSpeaker: '#inputCabinSpeaker',
  inputExternalSpeaker: '#inputExternalSpeaker',
  inputCombinedSpeaker: '#inputCombinedSpeaker'
};

// DOM Selectors NodeList elements 
const internalVolMinus = document.querySelector(selectors.internalVolMinus);
const internalVolPlus = document.querySelector(selectors.internalVolPlus);
const cabinVolMinus = document.querySelector(selectors.cabinVolMinus);
const cabinVolPlus = document.querySelector(selectors.cabinVolPlus);
const externalVolMinus = document.querySelector(selectors.externalVolMinus);
const externalVolPlus = document.querySelector(selectors.externalVolPlus);
const combinedVolMinus = document.querySelector(selectors.combinedVolMinus);
const combinedVolPlus = document.querySelector(selectors.combinedVolPlus);

// Updating input values 
const inputInternalSpeaker = document.querySelector(
  inputSelector.inputInternalSpeaker
);
const inputCabinSpeaker = document.querySelector(
  inputSelector.inputCabinSpeaker
);
const inputExternalSpeaker = document.querySelector(
  inputSelector.inputExternalSpeaker
);
const inputCombinedSpeaker = document.querySelector(
  inputSelector.inputCombinedSpeaker
);

const avcButton = document.querySelector('#avc-button');
const statusAlert = document.querySelector('#statusAlert');

// DOM Selectors for SET BUTTONS elements 

const setInternalSpeakerBtn = document.querySelector(
  setNodeBtnSelector.setInternalSpeakerBtn
);
const setCabinSpeakerBtn = document.querySelector(
  setNodeBtnSelector.setCabinSpeakerBtn
);
const setExternalSpeakerBtn = document.querySelector(
  setNodeBtnSelector.setExternalSpeakerBtn
);
const setCombinedSpeakerBtn = document.querySelector(
  setNodeBtnSelector.setCombinedSpeakerBtn
);

// All Selectors for dataset values

const internalVolRanges = document.querySelectorAll(
  selectorNodeList.internalVolRange
);
const cabinVolRanges = document.querySelectorAll(
  selectorNodeList.cabinVolRange
);
const externalVolRanges = document.querySelectorAll(
  selectorNodeList.externalVolRange
);
const combinedVolRanges = document.querySelectorAll(
  selectorNodeList.combinedVolRange
)

// calling function when page loads
window.onload = function () {
  getFromlocalStore();
};

// fetching local Store data
const getFromlocalStore = async () => {
  const response = await fetch('../data/localDatabase.json');
  const data = await response.json();
  internalSpeakerLevel = +data.internalSpeaker;
  cabinSpeakerLevel = +data.cabinSpeaker;
  externalSpeakerLevel = +data.externalSpeaker;
  combinedSpeakerLevel = +data.internalSpeaker || +data.externalSpeaker;
  inputInternalSpeaker.value = internalSpeakerLevel;
  inputCabinSpeaker.value = cabinSpeakerLevel;
  inputExternalSpeaker.value = externalSpeakerLevel;
  inputCombinedSpeaker.value = combinedSpeakerLevel;

  // Rendering option range color for internalVolRanges
  internalVolRanges.forEach((opt) => {
    const optValue = +opt.value;
    increaseSelectedOptionColor(opt, optValue, internalSpeakerLevel);
  });

  // Rendering option range color for cabinVolRanges
  cabinVolRanges.forEach((opt) => {
    const optValue = +opt.value;
    increaseCabinSelectedOptionColor(opt, optValue, cabinSpeakerLevel);
  });

  // Rendering option range color for externalVolRanges
  externalVolRanges.forEach((opt) => {
    const optValue = +opt.value;
    increaseSelectedOptionColor(opt, optValue, externalSpeakerLevel);
  });

  // Rendering option range color for combinedVolRanges
  combinedVolRanges.forEach((opt) => {
    const optValue = +opt.value;
    increaseSelectedOptionColor(opt, optValue, combinedSpeakerLevel);
  });

  // Disable AVC auto control by default
  isAutoControl(false);
};

// Decreasing option range color for brighntess
const increaseBrighntnessOptionColor = (optNode, level, setLevel) => {
  if (setLevel >= level ) {
    optNode.classList.add('increase');
  }
};

// Decreasing option range color for brighntess
const decreaseBrighntnessOptionColor = (optNode, level, setLevel) => {
  if (setLevel < level) {
    optNode.classList.remove('increase');
  }
};

// Increasing option range color
const increaseSelectedOptionColor = (optNode, level, setLevel) => {
  if (setLevel >= level) {
    switch (true) {
      case level <= 70:
        optNode.classList.add('bg-grey');
        break;
      case level === 75:
        optNode.classList.add('bg-green');
        break;
      case level > 75:
        optNode.classList.add('bg-red');
        break;
    }
  }
};

// Decreasing option range color
const decreaseSelectedOptionColor = (optNode, level, setLevel) => {
  if (setLevel < level) {
    switch (true) {
      case level <= 70:
        optNode.classList.remove('bg-grey');
        break;
      case level === 75:
        optNode.classList.remove('bg-green');
        break;
      case level > 75:
        optNode.classList.remove('bg-red');
        break;
    }
  }
};

// Increasing option range color for cabin speaker
const increaseCabinSelectedOptionColor = (optNode, level, setLevel) => {
  if (setLevel >= level) {
    switch (true) {
      case level <= 2:
        optNode.classList.add('bg-grey');
        break;
      case level === 3:
        optNode.classList.add('bg-green');
        break;
      case level > 3:
        optNode.classList.add('bg-red');
        break;
    }
  }
};

// Decreasing option range color
const decreaseCabinSelectedOptionColor = (optNode, level, setLevel) => {
  if (setLevel < level) {
    switch (true) {
      case level <= 2:
        optNode.classList.remove('bg-grey');
        break;
      case level === 3:
        optNode.classList.remove('bg-green');
        break;
      case level > 3:
        optNode.classList.remove('bg-red');
        break;
    }
  }
};

// Disabling plusicon for Brighntness - MAX value
const plusIconBrighntnessDisable = (plusIcon, minusIcon, value) => {
  +value === 100
    ? plusIcon.classList.add('disabled')
    : minusIcon.classList.remove('disabled');
};

// Disabling plusicon for Brighntness - MIN value
const minusBrighntnessIconDisable = (plusIcon, minusIcon, value) => {
  +value === 20
    ? minusIcon.classList.add('disabled')
    : plusIcon.classList.remove('disabled');
};

// Disabling plusicon - MAX value
const plusIconDisable = (plusIcon, minusIcon, value) => {
  +value === 85
    ? plusIcon.classList.add('disabled')
    : minusIcon.classList.remove('disabled');
};

// Disabling plusicon - MIN value
const minusIconDisable = (plusIcon, minusIcon, value) => {
  +value === 65
    ? minusIcon.classList.add('disabled')
    : plusIcon.classList.remove('disabled');
};

// Disabling plusicon for cabin speker - MAX value
const plusIconCabinDisable = (plusIcon, minusIcon, value) => {
  +value === 5
    ? plusIcon.classList.add('disabled')
    : minusIcon.classList.remove('disabled');
};

// Disabling plusicon for cabin speker - MIN value
const minusIconCabinDisable = (plusIcon, minusIcon, value) => {
  +value === 1
    ? minusIcon.classList.add('disabled')
    : plusIcon.classList.remove('disabled');
};

// Auto control toggle
const isAutoControl = (isAudo) => {
  for (let [key, value] of Object.entries(selectors)) {
    const ele = document.querySelector(value);
    isAudo ? ele.classList.add('disabled') : ele.classList.remove('disabled');
  }

  // Disabling all the buttons
  for (let [key, value] of Object.entries(setNodeBtnSelector)) {
    if (['setCabinSpeakerBtn', 'listCabinVolRange'].some(excludeKey => key.includes(excludeKey))) continue;
    const ele = document.querySelector(value);
    isAudo ? ele.classList.add('disabled') : ele.classList.remove('disabled');
    isAudo ? ele.disabled = true : ele.disabled = false;
  }
};


// Internal Plus button click Event
const increaseInternalVol = () => {
  const isDisabled = internalVolPlus.classList.contains('disabled');
  if (!isDisabled) {
    if (internalSpeakerLevel < 85) internalSpeakerLevel += 5;
    plusIconDisable(internalVolPlus, internalVolMinus, internalSpeakerLevel);
    internalVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      increaseSelectedOptionColor(opt, optValue, internalSpeakerLevel);
    });
    inputInternalSpeaker.value = internalSpeakerLevel;
  }
}

// Internal Minus button click Event
const decreaseInternalVol = () => {
  const isDisabled = internalVolMinus.classList.contains('disabled');
  if (!isDisabled) {
    if (internalSpeakerLevel <= 85 && internalSpeakerLevel > 65)
      internalSpeakerLevel -= 5;
    minusIconDisable(internalVolPlus, internalVolMinus, internalSpeakerLevel);
    internalVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      decreaseSelectedOptionColor(opt, optValue, internalSpeakerLevel);
    });
    inputInternalSpeaker.value = internalSpeakerLevel;
  }
}

// Cabin Plus button click Event
const increaseCabinVol = () => {
  const isDisabled = cabinVolPlus.classList.contains('disabled');
  if (!isDisabled) {
    if (cabinSpeakerLevel < 5) cabinSpeakerLevel += 1;
    plusIconCabinDisable(cabinVolPlus, cabinVolMinus, cabinSpeakerLevel);
    cabinVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      increaseCabinSelectedOptionColor(opt, optValue, cabinSpeakerLevel);
    });
    inputCabinSpeaker.value = cabinSpeakerLevel;
  }
}

// Cabin MINUS button click Event
const decreaseCabinVol = () => {
  const isDisabled = cabinVolMinus.classList.contains('disabled');
  if (!isDisabled) {
    if (cabinSpeakerLevel <= 5 && cabinSpeakerLevel > 1)
      cabinSpeakerLevel -= 1;
    minusIconCabinDisable(cabinVolPlus, cabinVolMinus, cabinSpeakerLevel);
    cabinVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      decreaseCabinSelectedOptionColor(opt, optValue, cabinSpeakerLevel);
    });
    inputCabinSpeaker.value = cabinSpeakerLevel;
  }
}

// externalVolMinus Plus button click
const increaseExternalVol = () => {
  const isDisabled = externalVolPlus.classList.contains('disabled');
  if (!isDisabled) {
    if (externalSpeakerLevel < 85) externalSpeakerLevel += 5;
    plusIconDisable(externalVolPlus, externalVolMinus, externalSpeakerLevel);
    externalVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      increaseSelectedOptionColor(opt, optValue, externalSpeakerLevel);
    });
    inputExternalSpeaker.value = externalSpeakerLevel;
  }
}

// externalVolMinus MINUS button click
const decreaseExternalVol = () => {
  const isDisabled = externalVolMinus.classList.contains('disabled');
  if (!isDisabled) {
    if (externalSpeakerLevel <= 85 && externalSpeakerLevel > 65)
      externalSpeakerLevel -= 5;
    minusIconDisable(externalVolPlus, externalVolMinus, externalSpeakerLevel);
    externalVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      decreaseSelectedOptionColor(opt, optValue, externalSpeakerLevel);
    });
    inputExternalSpeaker.value = externalSpeakerLevel;
  }
}

// Internal + External Plus button click Event
const increaseCombinedVol = () => {
  const isDisabled = combinedVolPlus.classList.contains('disabled');
  if (!isDisabled) {
    if (combinedSpeakerLevel < 85) combinedSpeakerLevel += 5;
    plusIconDisable(combinedVolPlus, combinedVolMinus, combinedSpeakerLevel);
    combinedVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      increaseSelectedOptionColor(opt, optValue, combinedSpeakerLevel);
    });
    inputCombinedSpeaker.value = combinedSpeakerLevel;

    if (internalSpeakerLevel < 85) internalSpeakerLevel += 5;
    plusIconDisable(internalVolPlus, internalVolMinus, combinedSpeakerLevel);
    internalVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      increaseSelectedOptionColor(opt, optValue, combinedSpeakerLevel);
    });
    inputInternalSpeaker.value = combinedSpeakerLevel;

    if (externalSpeakerLevel < 85) externalSpeakerLevel += 5;
    plusIconDisable(externalVolPlus, externalVolMinus, combinedSpeakerLevel);
    externalVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      increaseSelectedOptionColor(opt, optValue, combinedSpeakerLevel);
    });
    inputExternalSpeaker.value = combinedSpeakerLevel;
  }
}

// Internal + External Minus button click Event
const decreaseCombinedVol = () => {
  const isDisabled = combinedVolMinus.classList.contains('disabled');
  if (!isDisabled) {
    if (combinedSpeakerLevel <= 85 && combinedSpeakerLevel > 65)
      combinedSpeakerLevel -= 5;
    minusIconDisable(combinedVolPlus, combinedVolMinus, combinedSpeakerLevel);
    combinedVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      decreaseSelectedOptionColor(opt, optValue, combinedSpeakerLevel);
    });
    inputCombinedSpeaker.value = combinedSpeakerLevel;

    if (internalSpeakerLevel <= 85 && internalSpeakerLevel > 65)
      internalSpeakerLevel -= 5;
    minusIconDisable(internalVolPlus, internalVolMinus, combinedSpeakerLevel);
    internalVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      decreaseSelectedOptionColor(opt, optValue, combinedSpeakerLevel);
    });
    inputInternalSpeaker.value = combinedSpeakerLevel;

    if (externalSpeakerLevel <= 85 && externalSpeakerLevel > 65)
      externalSpeakerLevel -= 5;
    minusIconDisable(externalVolPlus, externalVolMinus, combinedSpeakerLevel);
    externalVolRanges.forEach((opt) => {
      const optValue = +opt.value;
      decreaseSelectedOptionColor(opt, optValue, combinedSpeakerLevel);
    });
    inputExternalSpeaker.value = combinedSpeakerLevel;
  }
}

// AVC button click
const avcToggle = () => {
  const isDisabled = avcButton.classList.toggle('isAuto');
  const updateTest = isDisabled ? 'ON' : 'OFF';
  avcButton.textContent = updateTest;

  const data = { avcEnabled: isDisabled };
  // console.log(data);
  fetchPost(avcURL, data);

  isAutoControl(isDisabled);
}

// POST Call implementation:
const fetchPost = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
        statusAlert.classList.remove('d-none'); 
    
        if (Object.keys(result).includes("success")) { 
            statusAlert.textContent = result.success;
            statusAlert.classList.remove('alert-error'); 
            statusAlert.classList.add('alert-success'); 
        } else {
            statusAlert.textContent = result.error;
            statusAlert.classList.add('alert-error');
            statusAlert.classList.remove('alert-success'); 
        }
    
        setTimeout(() => {
            statusAlert.classList.add('d-none');
        }, 2000);
    }
    
  } catch (err) {
    console.error('Fetch API', err);
  }
};

// PostCall INTERNAL SPEAKER
const postCallInternalSpeaker = (e) => {
  e.preventDefault();
  const data = { internalSpeaker: internalSpeakerLevel };
  fetchPost(internalURL, data);
}

// PostCall CABIN SPEAKER
const postCallCabinSpeaker = (e) => {
  e.preventDefault();
  const data = { cabinSpeaker: cabinSpeakerLevel };
  fetchPost(cabinURL, data);
}

// PostCall EXTERNAL SPEAKER
const postCallExternalSpeaker = (e) => {
  e.preventDefault();
  const data = { externalSpeaker: externalSpeakerLevel };
  fetchPost(externalURL, data);
}

// PostCall COMBINED SPEAKER

const postCallCombinedSpeaker = (e) => {
  e.preventDefault();
  const data = {
    combinedSpeaker: combinedSpeakerLevel,
    internalSpeaker: combinedSpeakerLevel,
    externalSpeaker: combinedSpeakerLevel,
  };
  fetchPost(combinedVolURL, data);
};

// On-click Events triggers 
internalVolPlus.addEventListener('click', increaseInternalVol);
internalVolMinus.addEventListener('click', decreaseInternalVol);
cabinVolPlus.addEventListener('click', increaseCabinVol);
cabinVolMinus.addEventListener('click', decreaseCabinVol);
externalVolPlus.addEventListener('click', increaseExternalVol);
externalVolMinus.addEventListener('click', decreaseExternalVol);
combinedVolPlus.addEventListener('click', increaseCombinedVol);
combinedVolMinus.addEventListener('click', decreaseCombinedVol);
avcButton.addEventListener('click', avcToggle);

// on-Click Post call trigger
setInternalSpeakerBtn.addEventListener('click', postCallInternalSpeaker);
setCabinSpeakerBtn.addEventListener('click', postCallCabinSpeaker);
setExternalSpeakerBtn.addEventListener('click', postCallExternalSpeaker);
setCombinedSpeakerBtn.addEventListener('click', postCallCombinedSpeaker);

// Function to clean up event listeners
function cleanUp() {
  // On-click Events triggers 
    internalVolPlus.removeEventListener('click', increaseInternalVol);
    internalVolMinus.removeEventListener('click', decreaseInternalVol);
    cabinVolPlus.removeEventListener('click', increaseCabinVol);
    cabinVolMinus.removeEventListener('click', decreaseCabinVol);
    externalVolPlus.removeEventListener('click', increaseExternalVol);
    externalVolMinus.removeEventListener('click', decreaseExternalVol);
    avcButton.removeEventListener('click', avcToggle);
    // on-Click Post call trigger
    setInternalSpeakerBtn.removeEventListener('click', postCallInternalSpeaker);
    setCabinSpeakerBtn.removeEventListener('click', postCallCabinSpeaker);
    setExternalSpeakerBtn.removeEventListener('click', postCallExternalSpeaker);
    setCombinedSpeakerBtn.removeEventListener('click', postCallCombinedSpeaker);
}

// Call clean up when the page or component is unloaded
window.addEventListener('beforeunload', cleanUp);