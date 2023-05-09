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

function toggleShow(target, type) {
  document.querySelectorAll(`[data-type="${type}"]`).forEach((element) => {
    if (element === target) {
      element.classList.toggle('show');
    } else {
      element.classList.remove('show');
    }
  });
}

function addClickEventListener(trigger, type) {
  document.querySelectorAll(`[data-trigger="${trigger}"]`).forEach((element) => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleShow(event.currentTarget, type);
    });
  });
}

function hideElementsBySelector(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    el.style.display = 'none';
  });
}

addClickEventListener('location', 'location');
addClickEventListener('doctor', 'doctor');

document.querySelectorAll('[data-type="location"]').forEach((element) => {
  element.addEventListener('click', function () {
    let locationID = this.dataset.id;
    hideElementsBySelector('[data-type="doctor"]');
    hideElementsBySelector('[data-docdiv]');

    let opis = locationID.split(' ');

    opis.forEach((o) => {
      let curr = o.split(':');
      let x = curr[0];
      document.querySelector(`[data-id="${x}"]`).style.display = '';
      document.querySelector(`[data-docdiv="${x}"]`).style.display = 'block';
    });
  });
});

document.querySelectorAll('[data-type="doctor"]').forEach((element) => {
  element.addEventListener('click', function () {
    let doctorID = this.dataset.id;
    hideElementsBySelector('[data-type="location"]');
    hideElementsBySelector('[data-locdiv]');

    document.querySelectorAll('[data-type="location"]').forEach((locElement) => {
      let x = locElement.dataset.id;
      if (x.includes(doctorID)) {
        locElement.style.display = '';
        document.querySelector(`[data-locdiv="${x}"]`).style.display = 'block';
      }
    });
    // Add this line to display the iframe for the selected doctor
    displayIframe(parseInt(doctorID));
  });
});


document.querySelectorAll('[data-click]').forEach((element) => {
  element.addEventListener('click', function (event) {
    let target = event.currentTarget.dataset.click;

    if (target === 'doctor') {
      if (locationID) {
        document.querySelector('[data-tab="selDoctor"]').style.display = 'block';
      } else {
        document.querySelector('[data-tab="allDoctor"]').style.display = 'block';
        document.querySelector('[data-triggerdoc="all"]').click();
      }
    } else {
      document.querySelector('[data-tab="allLocation"]').style.display = 'block';
      document.querySelector('[data-triggerloc="all"]').click();
    }
    document.querySelector('[data-tab="default"]').style.display = 'none';
  });
});

function displayIframe(officeID) {
  const frameData = frame.find(item => item.officeID === officeID);

  if (frameData) {
    const decodedIframe = atob(frameData.iframe);
    document.getElementById("frame-container").innerHTML = decodedIframe;
  } else {
    console.error(`No iframe found for officeID: ${officeID}`);
  }
}
