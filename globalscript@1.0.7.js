var menuOpenButton = document.querySelector('#menuOpen');
var menuCloseButton = document.querySelector('#menuClose');
var scrim = document.querySelector('.navbar_scrim');
var menuWrapper = document.querySelector('.navbar_menu-wrapper');
var navbar = document.querySelector('.navbar');
var pageWrapper = document.querySelector('.page-wrapper');
var footer = document.querySelector('.footer');
var windowHeight = window.innerHeight;

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
  
let faqItems = document.querySelectorAll('.faq-rich-text h3');
faqItems.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('is--expanded');
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