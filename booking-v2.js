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

document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector("#main-container");

  mainContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (target.matches("[data-trigger]")) {
      handleDataTriggerClick(target);
    } else if (target.matches('[data-type="doctor"]')) {
      handleDataTypeDoctorClick(target);
    } else if (target.matches('[data-type="location"]')) {
      handleDataTypeLocationClick(target);
    } else if (target.matches("[data-click]")) {
      handleDataClick(target);
    } else if (target.matches("[data-location]")) {
      handleDataLocation(target);
    } else if (target.matches("[data-doctor]")) {
      handleDataDoctor(target);
    } else if (target.matches('[data-btn="close"]')) {
      handleDataBtnClose(target);
    } else if (target.matches('[data-btn="prev"]')) {
      handleDataBtnPrev(target);
    }
  });

  const iframeElem = document.querySelector('[data-content="iframe"] iframe');
  iframeElem.addEventListener("load", handleIframeLoad);
});

function handleDataTriggerClick(target) {
  // ...
}

function handleDataTypeDoctorClick(target) {
  // ...
}

function handleDataTypeLocationClick(target) {
  // ...
}

function handleDataClick(target) {
  // ...
}

function handleDataLocation(target) {
  // ...
}

function handleDataDoctor(target) {
  // ...
}

function handleDataBtnClose(target) {
  // ...
}

function handleDataBtnPrev(target) {
  // ...
}

function handleIframeLoad() {
  // ...
}

function toggleClass(selector, className) {
  const elems = document.querySelectorAll(selector);
  elems.forEach(function (elem) {
    elem.classList.toggle(className);
  });
}

function hideElements(selector) {
  const elems = document.querySelectorAll(selector);
  elems.forEach(function (elem) {
    elem.style.display = "none";
  });
}

function showElements(selector) {
  const elems = document.querySelectorAll(selector);
  elems.forEach(function (elem) {
    elem.style.display = "";
  });
}

function hideElementsByClass(className) {
  const elems = document.getElementsByClassName(className);
  for (let i = 0; i < elems.length; i++) {
    elems[i].style.display = "none";
  }
}

function showElementsByClass(className) {
  const elems = document.getElementsByClassName(className);
  for (let i = 0; i < elems.length; i++) {
    elems[i].style.display = "";
  }
}

function hideElement(elem) {
  elem.style.display = "none";
}

function showElement(elem) {
  elem.style.display = "";
}

