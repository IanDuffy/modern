
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
	function initSlider(slider, prevButton, nextButton) {
  // Duplicate the first and last items
  const firstItem = slider.firstElementChild;
  const lastItem = slider.lastElementChild;
  const clonedFirst = firstItem.cloneNode(true);
  const clonedLast = lastItem.cloneNode(true);

  // Add the cloned items to the start and end of the carousel
  slider.insertBefore(clonedLast, firstItem);
  slider.appendChild(clonedFirst);
  
  const state = {
    isMouseDown: false,
    startX: 0,
    initialScrollLeft: 0,
  };

  function handleMouseDown(e) {
    state.isMouseDown = true;
    slider.classList.add("active");
    state.startX = e.pageX - slider.offsetLeft;
    state.initialScrollLeft = slider.scrollLeft;
  }

  function handleMouseLeave() {
    state.isMouseDown = false;
    slider.classList.remove("active");
  }

  function handleMouseUp() {
    state.isMouseDown = false;
    slider.classList.remove("active");
  }

   function handleMouseMove(e) {
      if (!state.isMouseDown) return;
      e.preventDefault();
      const currentX = e.pageX - slider.offsetLeft;
      const scrollSpeed = window.innerWidth >= 992 ? 2 : 1; // Change the scroll speed based on screen size
      const scrollDistance = (currentX - state.startX) * scrollSpeed;
      slider.scrollLeft = state.initialScrollLeft - scrollDistance;
    }
    
  // Replace the existing mousemove event listener with this
    slider.addEventListener("mousemove", throttle(handleMouseMove, 100));

function handleSliderScroll() {
  const { scrollLeft, clientWidth, scrollWidth } = slider;

  if (!state.isMouseDown && window.innerWidth >= 992) {
    if (scrollLeft < clientWidth) {
      // We're near the start of the carousel, so move the last item to the start
      const lastItem = slider.lastElementChild;
      const clonedLast = lastItem.cloneNode(true);
      slider.removeChild(lastItem);
      slider.insertBefore(clonedLast, slider.firstElementChild);
    } else if (scrollLeft > scrollWidth - clientWidth * 2) {
      // We're near the end of the carousel, so move the first item to the end
      const firstItem = slider.firstElementChild;
      const clonedFirst = firstItem.cloneNode(true);
      slider.removeChild(firstItem);
      slider.appendChild(clonedFirst);
    }
  }
}


function slide(direction) {
  const { scrollLeft, clientWidth, scrollWidth } = slider;
  let newScrollLeft = direction === "prev" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

  if (newScrollLeft < clientWidth) {
    // We're at the start of the carousel, so move the last item to the start
    const lastItem = slider.lastElementChild;
    const clonedLast = lastItem.cloneNode(true);
    slider.removeChild(lastItem);
    slider.insertBefore(clonedLast, slider.firstElementChild);
    newScrollLeft += clientWidth; // Adjust the scroll position
  } else if (newScrollLeft > scrollWidth - clientWidth * 2) {
    // We're at the end of the carousel, so move the first item to the end
    const firstItem = slider.firstElementChild;
    const clonedFirst = firstItem.cloneNode(true);
    slider.removeChild(firstItem);
    slider.appendChild(clonedFirst);
    newScrollLeft -= clientWidth; // Adjust the scroll position
  }

  slider.scroll({
    left: newScrollLeft,
    behavior: "smooth", // Change to "smooth" to make the scroll animated
  });
}

  slider.addEventListener("mousedown", handleMouseDown);
  slider.addEventListener("mouseleave", handleMouseLeave);
  slider.addEventListener("mouseup", handleMouseUp);
  slider.addEventListener("mousemove", handleMouseMove);
  prevButton.addEventListener("click", () => slide("prev"));
  nextButton.addEventListener("click", () => slide("next"));
	slider.addEventListener("scroll", throttle(handleSliderScroll, 100));


  handleSliderScroll();
}

function initSliders() {
  const sliders = document.querySelectorAll("[card-carousel]");
  const prevButtons = document.querySelectorAll("[card-prev]");
  const nextButtons = document.querySelectorAll("[card-next]");

  sliders.forEach((slider, index) => {
    const prevButton = prevButtons[index];
    const nextButton = nextButtons[index];
    if (slider && prevButton && nextButton) {
      initSlider(slider, prevButton, nextButton);
    }
  });
}

// Initialize the sliders immediately, regardless of screen size
initSliders();
