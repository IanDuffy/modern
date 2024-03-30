document.addEventListener('DOMContentLoaded', function() {
  const banner = document.getElementById('redirectBanner');
  const closeButton = document.getElementById('snackbarClose');

  // Function to parse query string
  function hasQueryString(query) {
    return new URLSearchParams(window.location.search).has(query);
  }

  // Check if the banner should be shown
  function checkBannerDisplay() {
    // Only show the banner if 'moore' query parameter is present
    // and the 'bannerDismissed' flag is not set in local storage
    if (hasQueryString('moore') && localStorage.getItem('bannerDismissed') !== 'true') {
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
});