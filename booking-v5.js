let locationID, doctorID, officeID, activeDiv, impLoc, impDoc;
let frame = [
  {
    officeID: 109036,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc_bkKz4dWi0PVlgnUzrH5mM='
  },
  {
    officeID: 290828,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc-r4YjWO7SLTs1N9v9dcJPQ='
  },
  {
    officeID: 343298,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc9Pua_d_mLh5N83vMYydBbs='
  },
  {
    officeID: 134496,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc1_goZCcbHnCsYL5Aiv8tJ8='
  },
  {
    officeID: 284928,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc1_goZCcbHnCsYL5Aiv8tJ8='
  },
  {
    officeID: 342362,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc_Qh2S5A8qG0XnijOFP1r8w='
  },
  {
    officeID: 209020,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc8wvrETJP6hITfSHxVg9RlA='
  },
  {
    officeID: 284930,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc7xdB5xDVqQl-Eg6w7UGC2g='
  },
  {
    officeID: 290911,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc5o_AlBYjBf3QZuUq1--q5c='
  },
  {
    officeID: 315385,
    iframe: 'dGhpcyBpcyAxNiBjaGFycyq95wQdPmiwyh-0ChCFcJ0='
  },
  {
    officeID: 333760,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc6i7eDLSDJZazo24k4sY4jo='
  },
  {
    officeID: 338600,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc1F4rd8SIpiQGkY_h2R5ISs='
  },
  {
    officeID: 316585,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc1d0-yHtqR9c4AaTTnZc_V0='
  },
  {
    officeID: 333649,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc0Znn7QZ77W7EOt07qr2_IM='
  },
  {
    officeID: 323626,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc2cGoC41w_qhv37I25geNXw='
  },
  {
    officeID: 343317,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc62OVnsCEsFSdbPGNH293p0='
  },
  {
    officeID: 328696,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc3l1dWrL5JEBfQm5v-edN3A='
  },
  {
    officeID: 333763,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc5oKzSAg1JoJ6rykX8oUUvc='
  },
  {
    officeID: 333764,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc69GppqSRlcoktYR7IY4yiA='
  },
  {
    officeID: 333769,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc1U86RemFuOl2GwV-vIcQvU='
  },
  {
    officeID: 343299,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc3lM45MfCH8bDpXDsjiz7HM='
  },
  {
    officeID: 344768,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc5w9DmVJM_Kjfwe59OyWWBo='
  },
  {
    officeID: 348027,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc1FEyXj0qzz_UbkRaXzXE9s='
  },
  {
    officeID: 348264,
    iframe: 'dGhpcyBpcyAxNiBjaGFycw-4MUAPzCJtBAobSA2_mmI='
  },
  {
    officeID: 333766,
    iframe: 'dGhpcyBpcyAxNiBjaGFycw3IY3wdR81OE9EfpTRN6XU='
  },
  {
    officeID: 338601,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc9_yCBQGCvRLN39orBfZo6o='
  },
  {
    officeID: 343004,
    iframe: 'dGhpcyBpcyAxNiBjaGFycwn9rsbUMVovI_pZQH-TWpM='
  },
  {
    officeID: 348028,
    iframe: 'dGhpcyBpcyAxNiBjaGFyc4hhG-uk1tjs2XM3Zuw0664='
  },
]

function toggleShow(element) {
  element.classList.toggle('show');
}

function queryAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function queryOne(selector) {
  return document.querySelector(selector);
}

function showElement(element) {
  element.style.display = '';
}

function hideElement(element) {
  element.style.display = 'none';
}

function isVisible(element) {
  return element.style.display !== 'none' && element.offsetParent !== null;
}

function dataLocation(locationID, activeTab) {
  queryAll('[data-tab="selDoctor"] [data-doctor]').forEach(function (el) {
    let doctor = el.getAttribute('data-doctor');
    if (locationID.includes(doctor)) {
      showElement(queryOne(`[data-docdiv="${doctor}"]`));
      showElement(queryOne(`[data-id="${doctor}"]`));
    }
  });
}

function dataDoctor(doctorID, activeTab) {
  queryAll('[data-tab="selLocation"] [data-location]').forEach(function (el) {
    let location = el.getAttribute('data-location');
    if (doctorID.includes(location)) {
      showElement(queryOne(`[data-locdiv="${location}"]`));
      showElement(queryOne(`[data-id="${location}"]`));
    }
  });
}

function showOfficeHour(locationID) {
  queryAll('[office-hour]').forEach(hideElement);
  queryAll(`[office-hour="${locationID}"]`).forEach(showElement);
}

function loadIframe() {
  let locationID = parseInt(document.getElementById("locationID").value);
  let doctorID = parseInt(document.getElementById("doctorID").value);

  // Find the corresponding officeID
  officeID = null;
  for (let i = 0; i < frame.length; i++) {
    if (frame[i].officeID === locationID * doctorID) {
      officeID = frame[i].officeID;
      break;
    }
  }

  if (officeID) {
    let activeIframe = frame.find(obj => obj.officeID === officeID);
    document.getElementById("activeDiv").innerHTML = atob(activeIframe.iframe);
  } else {
    document.getElementById("activeDiv").innerHTML = "No office found.";
  }
}

function attachDataTypeListeners() {
  queryAll('[data-type]').forEach(element => {
    element.addEventListener('click', () => {
      const dataType = element.getAttribute('data-type');
      queryAll(`[data-type="${dataType}"]`).forEach(toggleShow);
    });
  });
}

function attachDataLocationDoctorListeners() {
  queryAll('[data-location]').forEach(element => {
    element.addEventListener('click', () => {
      const locationID = element.getAttribute('data-location');
      const activeTab = queryAll('[data-tab]').find(isVisible).getAttribute('data-tab');
      dataLocation(locationID, activeTab);
      showOfficeHour(locationID);
    });
  });

  queryAll('[data-doctor]').forEach(element => {
    element.addEventListener('click', () => {
      const doctorID = element.getAttribute('data-doctor');
      const activeTab = queryAll('[data-tab]').find(isVisible).getAttribute('data-tab');
      dataDoctor(doctorID, activeTab);
    });
  });
}

function attachDataBtnListeners() {
  queryAll('[data-btn]').forEach(element => {
    element.addEventListener('click', () => {
      const dataBtn = element.getAttribute('data-btn');
      queryAll(`[data-btn="${dataBtn}"]`).forEach(toggleShow);
    });
  });
}

function loadIframe() {
  let locationID = parseInt(document.getElementById("locationID").value);
  let doctorID = parseInt(document.getElementById("doctorID").value);

  // Find the corresponding officeID
  officeID = null;
  for (let i = 0; i < frame.length; i++) {
    if (frame[i].officeID === locationID * doctorID) {
      officeID = frame[i].officeID;
      break;
    }
  }

  if (officeID) {
    let activeIframe = frame.find(obj => obj.officeID === officeID);
    document.getElementById("activeDiv").innerHTML = atob(activeIframe.iframe);
  } else {
    document.getElementById("activeDiv").innerHTML = "No office found.";
  }
}

function attachDataTriggerListeners() {
  queryAll('[data-trigger="location"]').forEach(element => {
    element.addEventListener('click', () => {
      queryAll('[data-type="location"]').forEach(toggleShow);
    });
  });

  queryAll('[data-trigger="doctor"]').forEach(element => {
    element.addEventListener('click', () => {
      queryAll('[data-type="doctor"]').forEach(toggleShow);
      queryAll(".doctor--hours").forEach(toggleShow);
    });
  });
}

function attachDataClickListeners() {
  queryAll('[data-type="doctor"]').forEach(element => {
    element.addEventListener('click', () => {
      let activeTab = queryAll('[data-tab]').find(isVisible).getAttribute('data-tab');
      let doctorID = element.getAttribute('data-id');
      queryAll('[data-click="doctor"]').forEach(hideElement);
      queryAll("[office-hour]").forEach(hideElement);

      if (locationID && queryAll('[data-tab]:visible [data-type="doctor"]:visible').length !== 1) {
        loadIframe();
      }

      if (queryAll('.show[data-type="doctor"]').length > 1) {
        queryAll(`[data-id="${doctorID}"]`).forEach(toggleShow);
      }

      queryAll('[data-type="location"]').forEach(hideElement);
      queryAll("[data-locdiv]").forEach(hideElement);

      queryAll('[data-type="location"]').forEach(el => {
        let id = el.getAttribute('data-id');
        if (id.includes(doctorID)) {
          showElement(el);
          showElement(queryOne(`[data-locdiv="${id}"]`));
        }
      });

      if (activeTab !== "selLocation" && activeTab !== "iframe") {
        queryAll('[data-tab="selLocation"]').forEach(showElement);
        queryAll(`[data-tab="${activeTab}"]`).forEach(hideElement);
      }
    });
  });
}


function main() {
  attachDataTriggerListeners();
  attachDataTypeListeners();
  attachDataClickListeners();
  attachDataLocationDoctorListeners();
  attachDataBtnListeners();
  attachIframeLoadListener();
}

main();
