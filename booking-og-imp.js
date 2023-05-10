let activeTab, locationId, doctorId;
let frames = [
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

// Button click events
$('[data-trigger="location"]').on('click', toggleLocationShow);
$('[data-trigger="doctor"]').on('click', toggleDoctorShow);

$('[data-click]').on('click', handleDataClick);

// Location related events
$('[data-type="location"]').on('click', handleLocationClick);
$('[data-location]').on('click', handleDataLocation);

// Doctor related events
$('[data-type="doctor"]').on('click', handleDoctorClick);
$('[data-doctor]').on('click', handleDataDoctor);

function toggleLocationShow() {
  $('[data-type="location"]').toggleClass('show');
}

function toggleDoctorShow() {
  $('[data-type="doctor"]').toggleClass('show');
  $('.doctor--hours').toggleClass('hide')
}

function handleDataClick(event) {
  let target = $(event.currentTarget).data('click');
  if (target === 'doctor') {
    handleDoctorClickProcess();
  } else {
    handleLocationClickProcess();
  }
  $('[data-tab="default"]').hide();
}

function handleDoctorClickProcess() {
  if (locationId) {
    $('[data-tab="selDoctor"]').show();
  } else {
    $('[data-tab="allDoctor"]').show();
    $('[data-triggerdoc="all"]').click();
  }
}

function handleLocationClickProcess() {
  $('[data-tab="allLocation"]').show();
  $('[data-triggerloc="all"]').click();
}

function handleLocationClick() {
  activeTab = getVisibleTabData('tab');
  locationId = $(this).data('id');
  handleLocationSelection();
  displayOfficeHour();
}

function handleDoctorClick() {
  activeTab = getVisibleTabData('tab');
  doctorId = $(this).data('id');
  handleDoctorSelection();
}

function handleDataLocation() {
  activeTab = getVisibleTabData('tab');
  locationId = $(this).data('location');
  filterDoctorsByLocation();
  displayOfficeHour();
}

function handleDataDoctor() {
  activeTab = getVisibleTabData('tab');
  doctorId = $(this).data('doctor');
  filterLocationsByDoctor();
}

// Common utility functions
function getVisibleTabData(tabData) {
  return $('[data-tab]:visible').data(tabData);
}

function getIframe() {
  $('[data-tab]').hide()
  $('[data-tab="iframe"]').show()
  $('.booking--loader').show()
  officeHour()
  let office = locationId.split(' ')
  for (o of office){
    let oSplit = o.split(':')
    if(oSplit[0]==doctorID){
      officeID=oSplit[1]
      for(f of frames){
        if(f.officeID===parseInt(officeID)){
          frameID = f.iframe
          url = `https://drchrono.com/scheduling/offices/${frameID}`
          $('[data-content="iframe"] iframe').attr('src',url)
        }
      }
    }
  }
}

function displayOfficeHour() {
  $('[office-hour]').hide();
  $(`[office-hour="${locationId}"]`).show();
}

function filterLocationsByDoctor(doctorID) {
  $('[data-type="location"]').each(function() {
    let locationId = $(this).data('id');
    if (locationId.includes(doctorID)) {
      $(this).css('display', '');
      $(`[data-locdiv="${locationId}"]`).show();
    } else {
      $(this).hide();
      $(`[data-locdiv="${locationId}"]`).hide();
    }
  });
}

function filterDoctorsByLocation(locationId) {
  $('[data-type="doctor"]').each(function() {
    let doctorId = $(this).data('id');
    let locationIds = locationId.split(' ');
    for(let locId of locationIds){
      let curr = locId.split(':');
      if(curr[0] == doctorId) {
        $(this).css('display', '');
        $(`[data-docdiv="${doctorId}"]`).show();
      } else {
        $(this).hide();
        $(`[data-docdiv="${doctorId}"]`).hide();
      }
    }
  });
}

function handleLocationSelection(locationId) {
  activeTab = $('[data-tab]:visible').data('tab');
  $('[data-type="doctor"]').hide();
  $('[data-docdiv]').hide();
  filterDoctorsByLocation(locationId);
  if(activeTab !== 'selDoctor' && activeTab !== 'iframe') {
    $('[data-tab="selDoctor"]').show();
    $(`[data-tab="${activeTab}"]`).hide();
  }
}

function handleDoctorSelection(doctorID) {
  activeTab = $('[data-tab]:visible').data('tab');
  $('[data-type="location"]').hide();
  $('[data-locdiv]').hide();
  filterLocationsByDoctor(doctorID);
  if(activeTab !== 'selLocation' && activeTab !== 'iframe') {
    $('[data-tab="selLocation"]').show();
    $(`[data-tab="${activeTab}"]`).hide();
  }
}

