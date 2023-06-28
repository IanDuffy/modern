initData();
iniNavButtons();
iniStarterTab();
iniDoctorsTab();
iniLocationsTab();
iniDoctorCta();
iniLocationCta();
iniDoctorHours();
initializeIframe();
iniRadioButtons();
checkIncomingData()

function initData() {
    frame = [];
    iframes = document.querySelectorAll('.iframe-text');
    officeIds = document.querySelectorAll('.officeid-text');
    for (let i = 0; i < officeIds.length; i++) {
        const obj = {
            officeID: officeIds[i].innerHTML,
            iframe: iframes[i].innerHTML
        };
        frame.push(obj);
    }
}

function iniStarterTab() {
    doctorId = null;
    locationId = null;

    map = document.querySelector('#booking-map-sidebar');
    sidebarDoctor = document.querySelector('#booking-doctor-sidebar');
    sidebarLocation = document.querySelector('#booking-locations-sidebar');
    sidebarDoctorPlaceholder = document.querySelector('#sidebar-doctor-placeholder');
    sidebarLocationPlaceholder = document.querySelector('#sidebar-location-placeholder');

    sidebarDoctorPlaceholder.addEventListener('click', (e) => {
        if (doctorId === null && locationId === null) {
            doctorCards.forEach(card => showParent(card))
            locationCards.forEach(card => showParent(card))
            sidebarDoctorPlaceholder.classList.add('active')
            sidebarLocationPlaceholder.classList.remove('active')
            navigateTab(doctorsTab)
        }
    })

    sidebarLocationPlaceholder.addEventListener('click', (e) => {
        if (doctorId === null && locationId === null) {
            doctorCards.forEach(card => showParent(card))
            locationCards.forEach(card => showParent(card))
            sidebarLocationPlaceholder.classList.add('active')
            sidebarDoctorPlaceholder.classList.remove('active')
            navigateTab(locationsTab)
        }
    })

    starterText = document.querySelector('.booking-starter-p');
    selectDoctor = document.querySelector('#select-doctor');
    selectLocation = document.querySelector('#select-location');

    starterTab = document.querySelector('#starter-tab');
    doctorsTab = document.querySelector('#all-doctors-tab');
    locationsTab = document.querySelector('#all-locations-tab');
    iframeTab = document.querySelector('#iframe-tab')

    sidebarLocationTitle = document.querySelector('#sidebar-location-title')
    sidebarDoctorTitle = document.querySelector('#sidebar-doctor-title')

    doctorHours = document.querySelector('#doctor-working-hours')

    tabs = [starterTab, doctorsTab, locationsTab, iframeTab];

    selectDoctor.addEventListener("click", (e) => {
        sidebarLocationPlaceholder.classList.remove('active')
        sidebarDoctorPlaceholder.classList.add('active')
        navigateDoctorRegion('all')
        navigateTab(doctorsTab);
    });

    selectLocation.addEventListener("click", (e) => {
        sidebarLocationPlaceholder.classList.add('active')
        sidebarDoctorPlaceholder.classList.remove('active')
        navigateLocationRegion('all')
        navigateTab(locationsTab);
    });
}

function iniDoctorsTab() {
    doctorCards = document.querySelectorAll('[card-doctor]');

    doctorRegions = [];
    docRegions = document.querySelectorAll('[region-tab-doctors]')
    docRegions.forEach(region => {
        doctorRegions[region.attributes['region-tab-doctors'].value.toLowerCase()] = document.querySelector('[region-tab-doctors=' + region.attributes['region-tab-doctors'].value + ']');
        doctorRegions[region.attributes['region-tab-doctors'].value.toLowerCase()].addEventListener('click', (e) => {
            navigateDoctorRegion(region.attributes['region-tab-doctors'].value);
            singleClassChange(docRegions, region, 'active')
        })
    })

    doctorThumbnails = document.querySelectorAll('[doctor-thumbnail]');
}

function iniLocationsTab() {
    locationCards = document.querySelectorAll('[card-location]');

    locationRegions = [];
    locRegions = document.querySelectorAll('[region-tab-locations]');
    locRegions.forEach(region => {
        locationRegions[region.attributes['region-tab-locations'].value.toLowerCase()] = document.querySelector('[region-tab-locations=' + region.attributes['region-tab-locations'].value + ']');
        locationRegions[region.attributes['region-tab-locations'].value.toLowerCase()].addEventListener('click', (e) => {
            navigateLocationRegion(region.attributes['region-tab-locations'].value);
            singleClassChange(locRegions, region, 'active')
        })
    })

    locationThumbnails = document.querySelectorAll('[location-thumbnail]');
    locationDetails = document.querySelector('#location-details')
    locationMaps = document.querySelectorAll('[location-map]');
    map = document.querySelector('#booking-map-sidebar')
    locationAddress = document.querySelector('#location-address');
    locationZip = document.querySelector('#location-zip')
}

function iniDoctorCta() {
    doctorCtas = document.querySelectorAll('[doctor-cta]');
    doctorCtas.forEach(cta => {
        cta.addEventListener('click', (e) => {
            doctorId = cta.attributes['doctor-cta'].value;
            locationId === null ? navigateTab(locationsTab) : navigateTab(iframeTab)
            populateSidebar();
        })
    })
}

function iniLocationCta() {
    locationCtas = document.querySelectorAll('[location-cta]');
    locationCtas.forEach(cta => {
        cta.addEventListener('click', (e) => {
            locationId = cta.attributes['location-cta'].value

            doctorCards.forEach(card => {
                card.querySelectorAll('[doctor-hours-tab]').forEach(tab => {
                    if (tab.attributes['doctor-hours-id'].value.includes(locationId)) {
                        tab.parentElement.classList.add('active')
                    } else {
                        tab.parentElement.classList.remove('active')
                    }
                })

                card.querySelectorAll('[location-hours]').forEach(hours => {
                    if (hours.attributes['location-hours'].value.includes(locationId)) {
                        show(hours)
                    } else {
                        hide(hours)
                    }
                })
            })

            doctorId === null ? navigateTab(doctorsTab) : navigateTab(iframeTab)
            populateSidebar();
        })
    })
}

function iniDoctorHours() {
    resetDoctorHours()

    doctorCards.forEach(card => {
        card.querySelectorAll('[doctor-hours-tab]').forEach(tab => {
            tab.addEventListener('click', (e) => {
                card.querySelectorAll('[doctor-hours-card]').forEach(hours => {
                    if (hours.attributes['doctor-hours-card'].value === tab.innerHTML) {
                        show(hours)
                    } else {
                        hide(hours)
                    }
                })
                card.querySelectorAll('[doctor-hours-tab]').forEach(docTab => {
                    if (docTab.attributes['doctor-hours-tab'].value === tab.attributes['doctor-hours-tab'].value) {
                        docTab.parentElement.classList.add('active')
                    } else {
                        docTab.parentElement.classList.remove('active')
                    }
                })
            })
        })
    })
}

function iniNavButtons() {
    mainNav = document.querySelectorAll('.card-filter-wrap');

    closeButton = document.querySelector('#close-button');
    backButton = document.querySelector('#back-button');
    closeButton.addEventListener('click', (e) => location.href = '/');
    backButton.addEventListener('click', (e) => {
        switch (findActiveTab()) {
            case 'starter-tab':
                location.href = '/'
                resetDoctorHours()
                break;
            case 'all-doctors-tab':
                if (locationId) {
                    locationId = null
                    populateSidebar()
                    navigateLocationRegion('all')
                    sidebarLocationPlaceholder.classList.add('active')
                    sidebarDoctorPlaceholder.classList.remove('active')
                    navigateTab(locationsTab)
                } else {
                    navigateTab(starterTab)
                }
                resetDoctorHours()
                break;
            case 'all-locations-tab':
                if (doctorId) {
                    doctorId = null
                    navigateDoctorRegion('all')
                    populateSidebar()
                    sidebarLocationPlaceholder.classList.remove('active')
                    sidebarDoctorPlaceholder.classList.add('active')
                    navigateTab(doctorsTab)
                } else {
                    sidebarLocationPlaceholder.classList.remove('active')
                    sidebarDoctorPlaceholder.classList.remove('active')
                    navigateTab(starterTab)
                }
                resetDoctorHours()
                break;
            case 'iframe-tab':
                if (prev === 'ref') {
                    location.href = '/'
                    break;
                }

                if (prev === 'all-doctors-tab') {
                    doctorId = null
                    navigateTab(doctorsTab)
                    populateSidebar()
                    navigateDoctorRegion('all')
                }

                if (prev === 'all-locations-tab') {
                    locationId = null
                    navigateTab(locationsTab)
                    populateSidebar()
                    navigateLocationRegion('all')
                }
                break;
        }
    })
}

function populateSidebar() {

    radioLocation.forEach(button => button.querySelector('.booking-radio-button').classList.remove('checked'));
    radioDoctor.forEach(button => button.querySelector('.booking-radio-button').classList.remove('checked'));

    if (doctorId && locationId) {
        sidebarDoctorPlaceholder.querySelector('img').src = getThumbnailsSrc(doctorThumbnails, doctorId, 'doctor');
        sidebarDoctorPlaceholder.querySelector('.booking-item-title').innerHTML = document.querySelector('[doctor-name="' + doctorId + '"]').innerHTML;
        sidebarDoctorPlaceholder.querySelector('.booking-item-subtitle').innerHTML = document.querySelector('[location-name="' + locationId + '"]').innerHTML
        sidebarLocationTitle.innerHTML = 'Locations for ' + document.querySelector('[doctor-name="' + doctorId + '"]').innerHTML;
        sidebarLocationPlaceholder.querySelector('img').src = getThumbnailsSrc(locationThumbnails, locationId, 'location');
        sidebarLocationPlaceholder.querySelector('.booking-item-title').innerHTML = document.querySelector('[location-name="' + locationId + '"]').innerHTML
        sidebarDoctorTitle.innerHTML = 'Doctors at ' + document.querySelector('[location-name="' + locationId + '"]').innerHTML
        locationAddress.innerHTML = document.querySelector('[location-address="' + locationId + '"]').innerHTML;
        locationZip.innerHTML = document.querySelector('[location-zip="' + locationId + '"]').innerHTML
        show(locationDetails)
        show(map)
        map.querySelector('img').src = getMapSrc(locationId);
        show(sidebarDoctor)
        show(sidebarLocation)
        show(sidebarDoctorPlaceholder)
        show(sidebarLocationPlaceholder)

        document.querySelector('[radio-location="' + locationId + '"]').querySelector('.booking-radio-button').classList.add('checked')
        document.querySelector('[radio-doctor="' + doctorId + '"]').querySelector('.booking-radio-button').classList.add('checked')

        show(doctorHours)
        document.querySelectorAll('[location-hours]').forEach(element => {
            if (element.attributes['location-hours'].value === locationId && element.attributes['doctor-hours'].value === doctorId) {
                doctorHours.innerHTML = element.innerHTML
            }
        })

        return;
    }

    hide(doctorHours)
    hide(sidebarDoctor)
    hide(sidebarLocation)

    if (doctorId) {
        sidebarDoctorPlaceholder.querySelector('img').src = getThumbnailsSrc(doctorThumbnails, doctorId, 'doctor');
        sidebarDoctorPlaceholder.querySelector('.booking-item-title').innerHTML = document.querySelector('[doctor-name="' + doctorId + '"]').innerHTML;
        show(sidebarDoctorPlaceholder)
        hide(sidebarLocationPlaceholder)
        hide(locationDetails)
        hide(map)

        return;
    }

    if (locationId) {
        sidebarLocationPlaceholder.querySelector('img').src = getThumbnailsSrc(locationThumbnails, locationId, 'location');
        sidebarLocationPlaceholder.querySelector('.booking-item-title').innerHTML = document.querySelector('[location-name="' + locationId + '"]').innerHTML
        show(sidebarLocationPlaceholder)
        hide(sidebarDoctorPlaceholder)
        show(locationDetails)
        show(map)
        map.querySelector('img').src = getMapSrc(locationId);
        locationAddress.innerHTML = document.querySelector('[location-address="' + locationId + '"]').innerHTML;
        locationZip.innerHTML = document.querySelector('[location-zip="' + locationId + '"]').innerHTML


        return;
    }

    sidebarLocationPlaceholder.querySelector('img').src = 'https://uploads-ssl.webflow.com/640801637e0e2c44c99a32f0/646a284464dc0b5ec35aa7ab_museum.svg';
    sidebarLocationPlaceholder.querySelector('.booking-item-title').innerHTML = 'Select Location'
    sidebarDoctorPlaceholder.querySelector('img').src = 'https://uploads-ssl.webflow.com/640801637e0e2c44c99a32f0/646a28190847ecf19cb661ac_supervised_user_circle.svg';
    sidebarDoctorPlaceholder.querySelector('.booking-item-title').innerHTML = 'Select Doctor'
    sidebarDoctorPlaceholder.querySelector('.booking-item-subtitle').innerHTML  = 'Select Location'

    show(sidebarLocationPlaceholder)
    show(sidebarDoctorPlaceholder)
    hide(map)
    hide(doctorHours)
    hide(locationDetails)
}

function navigateTab(newTab) {
    starterSidebarTabs()

    prev = findActiveTab()

    tabs.forEach(tab => hide(tab));

    show(newTab);

    if (doctorId || locationId) {
        mainNav.forEach(nav => nav.style.display = 'none')
    } else {
        mainNav.forEach(nav => nav.style.display = 'flex')
    }

    if (newTab === iframeTab) {
        populateSidebar()
        getIframe()
    }

    if (locationId) {
        doctorCards.forEach(card => locationId.includes(card.attributes['card-doctor'].value) ? showParent(card) : hideParent(card));
    }

    if (doctorId) {
        locationCards.forEach(card => card.attributes['card-location'].value.includes(doctorId) ? showParent(card) : hideParent(card));
    }

    if (newTab.id !== 'starter-tab') {
        hide(starterText)
        show(backButton)
    } else {
        show(starterText)
        hide(backButton)
    }

    setTimeout(() => {
        document.querySelector('#topScroll').scrollIntoView({behavior: 'smooth'})
    }, '50');
}

function navigateDoctorRegion(newRegion) {
    if (newRegion === 'all') {
        doctorCards.forEach(card => showParent(card));
    } else {
        doctorCards.forEach(card => card.querySelector('.doctor-region').innerHTML === newRegion ? showParent(card) : hideParent(card));
    }

    if (locationId) {
        doctorCards.forEach(card => {
            if (!locationId.includes(card.attributes['card-doctor'].value)) hideParent(card)
        });
    }
}

function navigateLocationRegion(newRegion) {
    if (newRegion === 'all') {
        locationCards.forEach(card => showParent(card));
    } else {
        locationCards.forEach(card => card.querySelector('.location-region').innerHTML === newRegion ? showParent(card) : hideParent(card));
    }

    if (doctorId) {
        locationCards.forEach(card => {
            if (!card.attributes['card-location'].value.includes(doctorId)) hideParent(card)
        });
    }
}

function show(div) {
    div.style.display = 'block';
}

function hide(div) {
    div.style.display = 'none';
}

function findActiveTab() {
    tabs.forEach(tab => {
        if (tab.style.display !== 'none') {
            activeTab = tab.id;
        }
    })

    return activeTab;
}

function singleClassChange(divs, target, cssClass) {
    divs.forEach(div => div === target ? div.classList.add(cssClass) : div.classList.remove(cssClass))
}

function hideParent(div) {
    hide(div.parentNode)
}

function showParent(div) {
    show(div.parentNode)
}

function getThumbnailsSrc(thumbnails, value, type) {
    src = '';

    thumbnails.forEach(thumbnail => {
        if (thumbnail.attributes[type + '-thumbnail'].value === value) {
            src = thumbnail.src
        }
    })

    return src;
}

function getMapSrc(value) {
    src = '';

    locationMaps.forEach(map => {
        if (map.attributes['location-map'].value === value) {
            src = map.src
        }
    })

    return src;
}

function initializeIframe() {
    const iframe = document.querySelector('.booking-iframe iframe');

    iframe.addEventListener('load', function () {
        const bookingLoader = document.querySelector('.booking--loader');
        if (bookingLoader) {
            bookingLoader.style.display = 'none';
        }
    });
}

function getIframe() {
    sidebarRadioData()

    offices = locationId.split(' ')

    offices.forEach(office => {
        let docId = office.split(':')[0]
        let locId = office.split(':')[1]
        if (docId === doctorId) {
            frame.forEach(f => {
                if (f.officeID === locId) {
                    frameID = f.iframe
                    url = 'https://drchrono.com/scheduling/offices/' + frameID
                    document.querySelector('.booking-iframe iframe').src = url

                    document.querySelector('.booking-iframe iframe').reload(true);
                }
            })
        }
    })
}

function iniRadioButtons() {
    radioLocation = document.querySelectorAll('[radio-location]')
    radioDoctor = document.querySelectorAll('[radio-doctor]')

    radioLocation.forEach(button => {
        button.addEventListener('click', (e) => changeRadioButton(button, radioLocation, 'radio-location'))
    })
    radioDoctor.forEach(button => {
        button.addEventListener('click', (e) => changeRadioButton(button, radioDoctor, 'radio-doctor'))

    })
}

function changeRadioButton(button, buttons, attribute) {
    buttons.forEach(btn => btn.querySelector('.booking-radio-button').classList.remove('checked'))

    button.querySelector('.booking-radio-button').classList.add('checked')

    if (attribute === 'radio-location') locationId = button.attributes[attribute].value
    if (attribute === 'radio-doctor') doctorId = button.attributes[attribute].value

    populateSidebar()
    getIframe()
}

function sidebarRadioData() {
    radioLocation.forEach(radio => radio.attributes['radio-location'].value.includes(doctorId) ? radio.style.display = 'flex' : hide(radio));
    radioDoctor.forEach(radio => locationId.includes(radio.attributes['radio-doctor'].value) ? radio.style.display = 'flex' : hide(radio));
}

function checkIncomingData() {
    urlParams = new URLSearchParams(window.location.search);

    doctorId = urlParams.get('doctorId');
    locationId = urlParams.get('locationId');

    if (doctorId && locationId) {
        prev = 'ref'
        navigateTab(iframeTab)
        populateSidebar()
        getIframe()

        return
    }

    if (doctorId) {
        navigateTab(locationsTab)
        populateSidebar()

        return;
    }

    if (locationId) {
        navigateTab(doctorsTab)
        populateSidebar()

        doctorCards.forEach(card => {
            card.querySelectorAll('[doctor-hours-tab]').forEach(tab => {
                if (tab.attributes['doctor-hours-id'].value.includes(locationId)) {
                    tab.parentElement.classList.add('active')
                } else {
                    tab.parentElement.classList.remove('active')
                }
            })

            card.querySelectorAll('[location-hours]').forEach(hours => {
                if (hours.attributes['location-hours'].value.includes(locationId)) {
                    show(hours)
                } else {
                    hide(hours)
                }
            })
        })

        return;
    }
}

function starterSidebarTabs() {
    if (doctorId === null && locationId === null) {
        if (findActiveTab() === locationsTab.id) {
            sidebarLocationPlaceholder.classList.add('active')
            sidebarDoctorPlaceholder.classList.remove('active')
        }

        if (findActiveTab() === doctorsTab.id) {
            sidebarLocationPlaceholder.classList.remove('active')
            sidebarDoctorPlaceholder.classList.add('active')
        }
    }

    sidebarLocationPlaceholder.classList.remove('active')
    sidebarDoctorPlaceholder.classList.remove('active')
}

function resetDoctorHours() {
    hourTabs = document.querySelectorAll('.tab-flex-wrap');
    hourTabs.forEach(tab => tab.childNodes.forEach((tab, index) => {
        if (index > 0) {
            tab.classList.remove('active')
        } else {
            tab.classList.add('active')
        }
    }))

    doctorCards.forEach(card => {
        card.querySelectorAll('[doctor-hours-card]').forEach((hours,index) => {
            if (index === 0) {
                show(hours)
            } else {
                hide(hours)
            }
        })
    })
}