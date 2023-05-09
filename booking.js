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

//displayChange();

document.addEventListener('DOMContentLoaded', function () {

function toggleClass(element, className) {
  element.classList.toggle(className);
}

document.querySelectorAll('[data-trigger="location"]').forEach(function (element) {
  element.addEventListener('click', function () {
    document.querySelectorAll('[data-type="location"]').forEach(function (location) {
      toggleClass(location, 'show');
    });
  });
});

document.querySelectorAll('[data-trigger="doctor"]').forEach(function (element) {
  element.addEventListener('click', function () {
    document.querySelectorAll('[data-type="doctor"]').forEach(function (doctor) {
      toggleClass(doctor, 'show');
    });
    document.querySelectorAll('.doctor--hours').forEach(function (hours) {
      toggleClass(hours, 'hide');
    });
  });
});

document.querySelectorAll('[data-type="doctor"]').forEach(function (element) {
  element.addEventListener('click', function () {
    const activeTab = document.querySelector('[data-tab]:not([hidden])').dataset.tab;
    const doctorID = this.dataset.id;
    document.querySelectorAll('[data-click="doctor"]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[office-hour]').forEach(el => el.style.display = 'none');

    if (locationID) {
      if (document.querySelectorAll('[data-tab]:not([hidden]) [data-type="doctor"]:not([hidden])').length !== 1) {
        getIframe();
      }
    }

    const siblings = Array.from(this.parentElement.children).filter(sibling => sibling !== this);
    if (document.querySelectorAll('.show[data-type="doctor"]').length > 1) {
      console.log('open');
      siblings.forEach(sibling => toggleClass(sibling, 'show'));
    } else {
      console.log('closed');
      siblings.forEach(sibling => toggleClass(sibling, 'show'));
    }

    document.querySelectorAll('[data-type="location"]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[data-locdiv]').forEach(el => el.style.display = 'none');

    document.querySelectorAll('[data-type="location"]').forEach(function (location) {
      let x = location.dataset.id;
      if (x.includes(doctorID)) {
        location.style.display = '';
        document.querySelector(`[data-locdiv="${x}"]`).style.display = 'block';
      }
    });

    if (activeTab !== 'selLocation' && activeTab !== 'iframe') {
      document.querySelector('[data-tab="selLocation"]').style.display = 'block';
      document.querySelector(`[data-tab="${activeTab}"]`).style.display = 'none';
    }

    if (this.classList.contains('curloc')) {
      document.querySelectorAll('[data-type="map"]').forEach(el => toggleClass(el, 'hide'));
      this.querySelector('[data-type="map"]').classList.remove('hide');
    }
  });
});

document.querySelectorAll('[data-type="location"]').forEach(function (element) {
  element.addEventListener('click', function () {
    const activeTab = document.querySelector('[data-tab]:not([hidden])').dataset.tab;
    const locationID = this.dataset.id;
    const id = this.dataset.id;
    document.querySelectorAll('[data-type="doctor"]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[data-docdiv]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[data-click="location"]').forEach(el => el.style.display = 'none');
    officeHour();

    if (doctorID) {
      if (document.querySelectorAll('[data-tab]:not([hidden]) [data-type="location"]:not([hidden])').length !== 1) {
        getIframe();
      }
    }

    if (activeTab !== 'selDoctor' && activeTab !== 'iframe') {
      document.querySelector('[data-tab="selDoctor"]').style.display = 'block';
      document.querySelector(`[data-tab="${activeTab}"]`).style.display = 'none';
    }

    document.querySelectorAll('[data-type="doctor"]').forEach(function (doctor) {
      let x = doctor.dataset.id;
      let opis = locationID.split(' ');
      for (o of opis) {
        let curr = o.split(':');
        if (curr[0] == x) {
          doctor.style.display = '';
          document.querySelector(`[data-docdiv="${x}"]`).style.display = 'block';
        }
      }
    });

    if (this.classList.contains('curloc')) {
      document.querySelectorAll('[data-type="map"]').forEach(el => toggleClass(el, 'hide'));
      document.querySelector(`[data-id="${id}"]`).querySelector('[data-type="map"]').classList.remove('hide');
      document.querySelector(`[data-id="${id}"]`).classList.remove('curloc');
    }

    const locationSiblings = Array.from(this.parentElement.children).filter(sibling => sibling !== this);
    if (document.querySelectorAll('.show[data-type="location"]').length > 1) {
      console.log('open');
      console.log(id);
      locationSiblings.forEach(sibling => toggleClass(sibling, 'show'));
      document.querySelectorAll('.dropdown--toggle__location').forEach(el => el.style.display = 'none');
    } else {
      console.log('closed');
      document.querySelector(`[data-id="${id}"]`).querySelector('[data-type="map"]').classList.toggle('hide');
      locationSiblings.forEach(sibling => toggleClass(sibling, 'show'));
      document.querySelectorAll('[data-type="map"]').forEach(el => toggleClass(el, 'hide'));
    }
  });
});

document.querySelectorAll('[data-type="location"]').forEach(function (element) {
  element.addEventListener('click', function () {
    document.querySelectorAll('.dropdown--toggle__location').forEach(el => el.style.display = 'none');
    document.querySelector('.collection-list-wrapper-location').style.position = 'static';
    document.querySelectorAll('[data-type="map"]').forEach(el => toggleClass(el, 'hide'));
  });
});

document.querySelectorAll('[data-type="doctor"]').forEach(function (element) {
  element.addEventListener('click', function () {
    document.querySelectorAll('.dropdown--toggle__doctor').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.doctor--hours').forEach(el => toggleClass(el, 'hide'));
  });
});

document.querySelectorAll('[data-click]').forEach(function (element) {
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

document.querySelectorAll('[data-location]').forEach(function (element) {
  element.addEventListener('click', function () {
    const activeTab = document.querySelector('[data-tab]:not([hidden])').dataset.tab;
    const locationID = this.dataset.location;
    document.querySelectorAll('[data-type="doctor"]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[data-docdiv]').forEach(el => el.style.display = 'none');
    dataLocation(locationID, activeTab);
    officeHour();
  });
});

function dataLocation(locationID, activeTab) {
  document.querySelectorAll('[data-tab="selDoctor"] [data-doctor]').forEach(function (doctor) {
    let target = doctor.dataset.doctor;
    if (locationID.includes(target)) {
      document.querySelector(`[data-docdiv="${target}"]`).style.display = 'block';
      document.querySelector(`[data-id="${target}"]`).style.display = '';
    }
  });

  if (document.querySelectorAll('.show[data-type="location"]').length > 1) {
    document.querySelector(`[data-tab="${activeTab}"]`).querySelector(`[data-id="${locationID}"]`).click();
  } else {
    document.querySelector(`[data-id="${locationID}"]`).classList.toggle('show');
    document.querySelector(`[data-id="${locationID}"]`).classList.toggle('curloc');
    document.querySelector(`[data-id="${locationID}"] [data-type="map"]`).classList.remove('hide');
    document.querySelectorAll('.dropdown--toggle__location').forEach(el => el.style.display = 'none');
    document.querySelector(`[data-tab="${activeTab}"]`).style.display = 'none';
    document.querySelector('[data-tab="selDoctor"]').style.display = 'block';
  }

  if (activeTab === 'selLocation') {
    getIframe();
  }
}
// data-location end //

// data-doctor start //
document.querySelectorAll('[data-doctor]').forEach(function (element) {
  element.addEventListener('click', function () {
    const activeTab = document.querySelector('[data-tab]:not([hidden])').dataset.tab;
    const doctorID = this.dataset.doctor;
    document.querySelectorAll('[data-type="location"]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[data-locdiv]').forEach(el => el.style.display = 'none');
    dataDoctor(doctorID, activeTab);
  });
});

function dataDoctor(doctorID, activeTab) {
  document.querySelectorAll('[data-tab="selLocation"] [data-location]').forEach(function (location) {
    let target = location.dataset.location;
    if (target.includes(doctorID)) {
      document.querySelector(`[data-locdiv="${target}"]`).style.display = 'block';
      document.querySelector(`[data-id="${target}"]`).style.display = '';
    }
  });

  if (document.querySelectorAll('.show[data-type="doctor"]').length > 1) {
    document.querySelector(`[data-tab="${activeTab}"]`).querySelector(`[data-id="${doctorID}"]`).click();
  } else {
    document.querySelector(`[data-id="${doctorID}"]`).classList.toggle('show');
    document.querySelector(`[data-id="${doctorID}"]`).classList.toggle('curdoc');
    document.querySelectorAll('.dropdown--toggle__doctor').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.doctor--hours').forEach(el => el.style.display = 'none');
    document.querySelector(`[data-tab="${activeTab}"]`).style.display = 'none';
    document.querySelector('[data-tab="selLocation"]').style.display = 'block';
  }

  if (locationID) {
    getIframe();
  }
}

function officeHour() {
  document.querySelectorAll('[office-hour]').forEach(el => el.style.display = 'none');
  document.querySelector(`[office-hour="${locationID}"]`).style.display = 'block';
}
// data-doctor end //

// getIframe() start //
function getIframe() {
  document.querySelectorAll('[data-tab]').forEach(el => el.style.display = 'none');
  document.querySelector('[data-tab="iframe"]').style.display = 'block';
  document.querySelector('.booking--loader').style.display = 'block';
  officeHour();
  let office = locationID.split(' ');
  for (let o of office) {
    let oSplit = o.split(':');
    if (oSplit[0] === doctorID) {
      let officeID = oSplit[1];
      for (let f of frame) {
        if (f.officeID === parseInt(officeID)) {
          let frameID = f.iframe;
          let url = `https://drchrono.com/scheduling/offices/${frameID}`;
          document.querySelector('[data-content="iframe"] iframe').src = url;
        }
      }
    }
  }
}
// getIframe() end //

// data-btn close start //
let referrer, referrerUrl, previousPath;
function findPrevPath() {
  referrer = document.referrer;
  if (referrer !== '') {
    referrerUrl = new URL(referrer);
    previousPath = referrerUrl.pathname;
  }
}

document.querySelectorAll('[data-btn="close"]').forEach(function (element) {
  element.addEventListener('click', function () {
    findPrevPath();
    locationID = '';
    doctorID = '';
    if (typeof history.back === 'undefined' || referrer === '') {
      window.location.href = 'https://mfa-podiatry.webflow.io/';
    } else {
      if (document.referrer) {
        window.location.href = document.referer;
} else {
history.back();
}
}
});
});
// data-btn close end //

// data-btn prev start //
document.querySelectorAll('[data-btn="prev"]').forEach(function (element) {
  element.addEventListener('click', function () {
    const activeTab = document.querySelector('[data-tab]:not([hidden])').dataset.tab;
    let prev;
    if (locationID && !doctorID) {
      if (activeTab === 'selDoctor') {
        prev = 'default';
      }
    } else if (!locationID && doctorID) {
      if (activeTab === 'selLocation') {
        prev = 'default';
      }
    } else {
      if (activeTab === 'iframe') {
        prev = 'selDoctor';
      } else if (activeTab === 'selDoctor') {
        prev = 'selLocation';
      } else {
        prev = 'default';
      }
    }

    document.querySelectorAll('[data-tab]').forEach(el => el.style.display = 'none');
    document.querySelector(`[data-tab="${prev}"]`).style.display = 'block';
  });
});

// data-btn prev end //

// iframe load event listener
const iframe = document.querySelector('[data-content="iframe"] iframe');
iframe.addEventListener('load', function () {
document.querySelector('.booking--loader').style.display = 'none';
});

});
