const banner = document.getElementById('redirectBanner');
const closeButton = document.getElementById('snackbarClose');

// Function to check if 'source=moore' is in the query
function isSourceMoore() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('source') === 'moore';
}

// Check if the banner should be shown and send an event to GA4
function checkBannerDisplay() {
  if (isSourceMoore() && localStorage.getItem('bannerDismissed') !== 'true') {
    banner.style.display = 'block'; // Show banner

    // Send event to GA4
    const referrer = document.referrer; // Get the referrer URL
    gtag('event', 'redirected_from_mfa', {
      'event_category': 'Redirect',
      'event_label': 'Source Moore',
      'referrer_url': referrer, // Include the referrer URL in the event
      'non_interaction': true // Set to true to not affect bounce rate
    });
  } else {
    banner.style.display = 'none';
  }
}

// Close button event listener
closeButton.addEventListener('click', function() {
  banner.style.display = 'none';
  localStorage.setItem('bannerDismissed', 'true');
});

checkBannerDisplay();