document.addEventListener("DOMContentLoaded", function() {
  var menuOpenButton = document.querySelector('#menuOpen');
  var menuCloseButton = document.querySelector('#menuClose');
  var scrim = document.querySelector('.navbar_scrim');
  var menuWrapper = document.querySelector('.navbar_menu-wrapper');
  var navbar = document.querySelector('.navbar');
  var pageWrapper = document.querySelector('.page-wrapper');
  var footer = document.querySelector('.footer');
  var windowHeight = window.innerHeight;

  var animateElements = document.querySelectorAll('.animate');
  var hideFabElement = document.getElementById('hideFab');
  var fixedFab = document.querySelector('.fixed-fab');

  // Set initial opacity to 0
  animateElements.forEach(element => {
    element.style.opacity = '0';
  });

  if ('IntersectionObserver' in window) {
    var observerOptions = {
      root: null,
      threshold: 0.35
    };
  
    function observerCallback(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Set opacity to 1 when element enters viewport
          entry.target.style.opacity = '1';
        }
      });
    }
  
    var observer = new IntersectionObserver(observerCallback, observerOptions);
    animateElements.forEach(element => observer.observe(element));
  } else {
    // Browser does not support Intersection Observer API, fallback to opacity: 1
    animateElements.forEach(element => {
      element.style.opacity = '1';
    });
  }

  // Event listener for the menu button
  menuOpenButton.addEventListener('click', function() {
    // Make the menu wrapper visible
    menuWrapper.style.display = 'block';
   // Delay the addition of the class
    setTimeout(function() {
        menuWrapper.classList.add('is--open');
    }, 50); // Delay in milliseconds
    
    // Disable scrolling on the body
    document.body.classList.add('no-scroll');
  });

  // Event listener for the scrim and close button
  [scrim, menuCloseButton].forEach(el => {
    el.addEventListener('click', function() {
        // Remove the class
        menuWrapper.classList.remove('is--open');

        // Delay the hiding of the menu wrapper
        setTimeout(function() {
            menuWrapper.style.display = 'none';
        }, 300); // Delay in milliseconds, should be as long as or longer than the transition duration

        // Enable scrolling on the body
        document.body.classList.remove('no-scroll');
    });
  });

  window.addEventListener('scroll', throttle(function() {
    // Calculate these values on each scroll event
    var pageWrapperTop = pageWrapper.getBoundingClientRect().top;
    var footerTop = footer.getBoundingClientRect().top;
    
    if (pageWrapperTop <= 0) {
        navbar.classList.add('is--collapsed');
    } else {
        navbar.classList.remove('is--collapsed');
    }
    
    if (footerTop <= windowHeight * 0.75) {
        navbar.classList.add('is--hidden');
    } else {
        navbar.classList.remove('is--hidden');
    }
  }, 200));

  // Only add the scroll listener if #hideFab is present
  if (hideFabElement) {
    window.addEventListener('scroll', function() {
      // Calculate the position of #hideFab halfway up the screen
      var halfScreenPosition = window.pageYOffset + window.innerHeight / 2;
      var hideFabElementPosition = hideFabElement.getBoundingClientRect().top + window.pageYOffset;

      if (halfScreenPosition >= hideFabElementPosition) {
        fixedFab.classList.add('is--visible');
      } else {
        fixedFab.classList.remove('is--visible');
      }
    });
  }

  let faqItems = document.querySelectorAll('.faq-rich-text h3');
  faqItems.forEach((item) => {
    item.addEventListener('click', () => {
      // First, close all items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('is--expanded');
        }
      });
      // Then, open or toggle the clicked item
      item.classList.toggle('is--expanded');
    });
  });
});

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
