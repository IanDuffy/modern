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

$('[data-trigger="location"]').on('click', function() {
  $('[data-type="location"]').toggleClass('show');
});

$('[data-trigger="doctor"]').on('click', function() {
  $('[data-type="doctor"]').toggleClass('show');
  $('.doctor--hours').toggleClass('hide')
});

// data-type doctor start //
$('[data-type="doctor"]').on('click', function() {
  activeTab = $('[data-tab]:visible').data('tab')
  doctorID = $(this).data('id')
  $('[data-click="doctor"]').hide()
  $('[office-hour]').hide()
  if(locationID){
    if($('[data-tab]:visible [data-type="doctor"]:visible').length !== 1){
      getIframe()
    }
  }
  
  if ( $('.show[data-type="doctor"]').length > 1 ) { // dropdown open 
    console.log('open')
    let id=$(this).data('id')
    $(`[data-id="${id}"]`).siblings().toggleClass('show')
  } else { // dropdown closed
    console.log('closed')
    $(`[data-id="${id}"]`).siblings().toggleClass('show')
  }

  $('[data-type="location"]').hide()
  $('[data-locdiv]').hide()

  $('[data-type="location"]').each(function(){
    //console.log($(this).data('id'))
    let x = $(this).data('id')
    if(x.includes(doctorID)){
      $(this).css('display','');
      $(`[data-locdiv="${x}"]`).show()
    }
  })

  if(activeTab!=='selLocation'&&activeTab!=='iframe'){
    $('[data-tab="selLocation"]').show()
    $(`[data-tab="${activeTab}"]`).hide()
  }

  if($(this).hasClass('curloc')){
    $('[data-type="map"]').toggleClass('hide')
    $(this).find('[data-type="map"]').removeClass('hide')
  }
})
// data-type doctor end//

// data-type location start //
$('[data-type="location"]').on('click', function() {
  //$('[data-type="location"]').css('display', '')
  activeTab = $('[data-tab]:visible').data('tab')
  locationID = $(this).data('id')
  let id=$(this).data('id')
  $('[data-type="doctor"]').hide()
  $('[data-docdiv]').hide()
  $('[data-click="location"]').hide()
  officeHour()
  if(doctorID){
    if($('[data-tab]:visible [data-type="location"]:visible').length !== 1){
      getIframe()
    }
  }
  
  //$(`[data-tab="${activeTab}"]`).addClass('curTab')*/

  if(activeTab!=='selDoctor'&&activeTab!=='iframe'){
    $('[data-tab="selDoctor"]').show()
    $(`[data-tab="${activeTab}"]`).hide()
  }

  $('[data-type="doctor"]').each(function(){
    //console.log($(this).data('id'))
    let x = $(this).data('id')
    let opis = locationID.split(' ')
    for(o of opis){
      let curr = o.split(':')
      if(curr[0] == x){
        $(this).css('display','')
        $(`[data-docdiv="${x}"]`).show()
      }
    }
  })

  if($(this).hasClass('curloc')){
    $('[data-type="map"]').toggleClass('hide')
    $(`[data-id="${id}"]`).find('[data-type="map"]').removeClass('hide')
    $(`[data-id="${id}"]`).removeClass('curloc')
  }

  if ( $('.show[data-type="location"]').length > 1 ) { // dropdown open 
    console.log('open')
    console.log(id)
    $(`[data-id="${id}"]`).siblings().toggleClass('show')
    $('.dropdown--toggle__location').hide()

  } else { // dropdown closed
    console.log('closed')
    $(`[data-id="${id}"]`).find('[data-type="map"]').toggleClass('hide')
    $(`[data-id="${id}"]`).siblings().toggleClass('show')
    $('[data-type="map"]').toggleClass('hide')
  }
})
// data-type location end //

// data-type location start //
$('[data-type="location"]').on('click', function() {
  $('.dropdown--toggle__location').hide()
  $('.collection-list-wrapper-location').css('position', 'static')
  $('[data-type="map"]').toggleClass('hide')
})
// data-type location end //

// data-type doctor start //
$('[data-type="doctor"]').on('click', function() {
  $('.dropdown--toggle__doctor').hide()
  $('.doctor--hours').toggleClass('hide')
})
// data-type doctor end //

// data-click start //
$('[data-click]').on('click', (event) => {
  let target = $(event.currentTarget).data('click');

  if(target === 'doctor'){
    if(locationID){
      $('[data-tab="selDoctor"]').show()
    }else{
      $('[data-tab="allDoctor"]').show()
      $('[data-triggerdoc="all"]').click()
    }
  }else{
    $('[data-tab="allLocation"]').show()
    $('[data-triggerloc="all"]').click()
  }
  $('[data-tab="default"]').hide()
});
// data-click end //

// data-location //
$('[data-location]').on('click', function(){
  activeTab = $('[data-tab]:visible').data('tab')
  //console.log(activeTab)
  locationID = $(this).data('location')
  $('[data-type="doctor"]').hide()
  $('[data-docdiv]').hide()
  dataLocation(locationID,activeTab)
  officeHour()
})

function dataLocation(locationID,activeTab){
  //console.log(locationID)
  $('[data-tab="selDoctor"] [data-doctor]').each(function(){
    let target = $(this).data('doctor')
    if(locationID.includes(target)){
      $(`[data-docdiv="${target}"]`).show()
      $(`[data-id="${target}"]`).css('display', '')
    }
  })


  if($('.show[data-type="location"]').length > 1){
    $(`[data-tab="${activeTab}"]`).find(`[data-id="${locationID}"]`).click()
  }else{
    $(`[data-id="${locationID}"]`).toggleClass('show')
    $(`[data-id="${locationID}"]`).toggleClass('curloc')
    $(`[data-id="${locationID}"] [data-type="map"]`).removeClass('hide')
    $('.dropdown--toggle__location').hide()
    $(`[data-tab="${activeTab}"]`).hide()
    $('[data-tab="selDoctor"]').show()
  }


  if(activeTab==='selLocation'){
    getIframe()
  }else{

  }
}
// data-location end //

// data-doctor start //
$('[data-doctor]').on('click', function(){
  activeTab = $('[data-tab]:visible').data('tab')
  //console.log(activeTab)
  doctorID = $(this).data('doctor')
  console.log($(this).data('doctor'))
  $('[data-type="location"]').hide()
  $('[data-locdiv]').hide()
  //$(`[data-id="${doctorID}"]`).toggleClass('show')
  dataDoctor(doctorID,activeTab)
})

function dataDoctor(doctorID,activeTab){
  //console.log('da')
  $('[data-tab="selLocation"] [data-location]').each(function(){
    let target = $(this).data('location')
    if(target.includes(doctorID)){
      $(`[data-locdiv="${target}"]`).show()
      $(`[data-id="${target}"]`).css('display', '')
    }
  })

  if($('.show[data-type="doctor"]').length > 1){
    $(`[data-tab="${activeTab}"]`).find(`[data-id="${doctorID}"]`).click()
  }else{
    $(`[data-id="${doctorID}"]`).toggleClass('show')
    $(`[data-id="${doctorID}"]`).toggleClass('curdoc')
    $('.dropdown--toggle__doctor').hide()
    $('.doctor--hours').hide()
    $(`[data-tab="${activeTab}"]`).hide()
    $('[data-tab="selLocation"]').show()
  }

  if(locationID){
    getIframe()
  }else{
  }
}

function officeHour(){
  $('[office-hour]').hide()
  $(`[office-hour="${locationID}"]`).show()
}
// data-doctor end //

// getIframe() start //
function getIframe(){
  $('[data-tab]').hide()
  $('[data-tab="iframe"]').show()
  $('.booking--loader').show()
  officeHour()
  // $('.doctor--hours').css('display', '')
  let office = locationID.split(' ')
  for (o of office){
    let oSplit = o.split(':')
    if(oSplit[0]==doctorID){
      //$('iframe').remove()
      //$('[data-content="iframe"]').remove()
      officeID=oSplit[1]
      //console.log("office is ",officeID)
      for(f of frame){
        if(f.officeID===parseInt(officeID)){
          frameID = f.iframe
          url = `https://drchrono.com/scheduling/offices/${frameID}`
          //console.log(url)
          //$('[data-content="iframe"]').append($iframe)
          $('[data-content="iframe"] iframe').attr('src',url)
        }
      }
    }
  }
}
// getIframe() end //

// data-btn close start //
let referrer, referrerUrl, previousPath;
function findPrevPath(){
  referrer = document.referrer;
  if(referrer!==''){
    referrerUrl = new URL(referrer);
    previousPath = referrerUrl.pathname;
    //console.log(`Previous page path: ${previousPath}`);
  }
}

$('[data-btn="close"]').on('click', function(){
  findPrevPath()
  locationID = '';
  doctorID = '';
  if (typeof history.back === 'undefined' || referrer ==='') {
    window.location.href = 'https://mfa-podiatry.webflow.io/';
  } else {
    if(document.referrer){
      window.location.href = document.referrer
    }else{
      history.back();
    }
  }

})
// data-btn close end //

// data-btn prev start //
$('[data-btn="prev"]').on('click', function(){
  activeTab = $('[data-tab]:visible').data('tab')
  if (typeof history.back !== 'undefined' && activeTab !== 'iframe') {
    history.back();
  } else {
    let prevTab = $('[data-tab].curTab').data('tab')


    if(activeTab==='allLocation' || activeTab==='allDoctor'){
      prevTab = 'default'
    }

    $(document).ready(function(){
      activeTab = $('[data-tab]:visible').data('tab')
      if(locationID && !doctorID){
        //prev = allDoctor
        if(activeTab === 'selDoctor'){
          prev = 'default'
        }
      }else if(!locationID && doctorID){
        if(activeTab === 'selLocation'){
          prev = 'default'
        }
      }else{
        if(activeTab==='iframe'){
          prev = 'selDoctor'
        }else if(activeTab==='selDoctor'){
          prev = 'selLocation'
        }else{
          prev = 'default'
        }

      }

      $(`[data-tab]`).hide()
      $(`[data-tab="${prev}"]`).show()
    })
  }
});
// data-btn prev end //

// get the iframe element
const iframe = document.querySelector('[data-content="iframe"] iframe');
// add a load event listener to the iframe
iframe.addEventListener('load', function() {
  // code to execute when the iframe is loaded
  $('.booking--loader').hide()
});

