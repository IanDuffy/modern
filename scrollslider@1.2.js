/*!
 * © 2023-2024 Era Creative, LLC. All rights reserved.
 *
 * This JavaScript file is proprietary and confidential. Unauthorized copying
 * of this file, via any medium, is strictly prohibited without the express
 * permission of Era Creative, LLC.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are not permitted unless authorized by Era Creative, LLC.
 */

function initSlider(slider, prevButton, nextButton) {
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
    const scrollDistance = (currentX - state.startX) * 1;
    slider.scrollLeft = state.initialScrollLeft - scrollDistance;
  }

  function handleSliderScroll() {
    const { scrollLeft, clientWidth, scrollWidth } = slider;
    prevButton.classList.toggle("is-disabled", scrollLeft === 0);
    nextButton.classList.toggle("is-disabled", scrollLeft >= scrollWidth - clientWidth);
  }

  function slide(direction) {
    const { scrollLeft, clientWidth } = slider;
    const cardWidth = clientWidth / 3; // Assuming there are 3 cards per screen
    const scrollAmount = cardWidth * 2; // Scroll by two card widths
    const newScrollLeft = direction === "prev" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
    slider.scroll({
      left: newScrollLeft,
      behavior: "smooth",
    });
  }

  slider.addEventListener("mousedown", handleMouseDown);
  slider.addEventListener("mouseleave", handleMouseLeave);
  slider.addEventListener("mouseup", handleMouseUp);
  slider.addEventListener("mousemove", handleMouseMove);
  prevButton.addEventListener("click", () => slide("prev"));
  nextButton.addEventListener("click", () => slide("next"));
  slider.addEventListener("scroll", handleSliderScroll);

  // Set initial button opacity
  handleSliderScroll();
}

function initSliders() {
  // Get all sliders and their corresponding previous and next buttons
  const sliders = document.querySelectorAll("[data-slider]");
  const prevButtons = document.querySelectorAll("[data-prev]");
  const nextButtons = document.querySelectorAll("[data-next]");

  // Initialize sliders
  sliders.forEach((slider, index) => {
    const prevButton = prevButtons[index];
    const nextButton = nextButtons[index];

    if (slider && prevButton && nextButton) {
      initSlider(slider, prevButton, nextButton);
    }
  });
}

// Apply slider functionality only on screen sizes of 992px or larger
const minWidth = window.matchMedia("(min-width: 992px)");

if (minWidth.matches) {
  initSliders();
}

// Re-initialize sliders when the screen width changes
minWidth.addEventListener("change", (e) => {
  if (e.matches) {
    initSliders();
  }
});