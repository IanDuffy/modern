const banner = document.getElementById('redirectBanner');
const closeButton = document.getElementById('snackbarClose');

// Function to check if the 'source' query parameter has the value 'moore'
function isSourceMoore() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('source') === 'moore';
}

// Check if the banner should be shown
function checkBannerDisplay() {
  // Only show the banner if 'source=moore' is the query parameter
  // and the 'bannerDismissed' flag is not set in local storage
  if (isSourceMoore() && localStorage.getItem('bannerDismissed') !== 'true') {
    banner.style.display = 'block'; // Show banner
  } else {
    banner.style.display = 'none'; // Otherwise, ensure it's not shown
  }
}

// Close button event listener
closeButton.addEventListener('click', function() {
  banner.style.display = 'none'; // Hide banner
  localStorage.setItem('bannerDismissed', 'true'); // Remember dismissal in local storage
});

// Initial check to display banner
checkBannerDisplay();