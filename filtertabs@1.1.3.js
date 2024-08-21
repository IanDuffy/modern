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


function navigateRegion(e) {
  // Check if the clicked element is a filter button
  if (!e.target.hasAttribute('data-region')) return;
  const selectedRegion = e.target.dataset.region;

  // Remove 'active' class from all filter button parent divs
  const buttonContainers = e.currentTarget.querySelectorAll('[data-region]');
  buttonContainers.forEach(buttonContainer => {
      buttonContainer.parentElement.classList.remove('is--active');
  });

  // Add 'active' class to clicked filter button parent div
  e.target.parentElement.classList.add('is--active');

  // Select all cards in the current container
  const cards = e.currentTarget.querySelectorAll('.filter-card');

  cards.forEach(card => {
      const regionElement = card.querySelector('.region');
      if (!regionElement) return;
      const cardRegion = regionElement.textContent.toLowerCase().trim();

      // Compare card region with selected region
      if (selectedRegion === 'all' || cardRegion === selectedRegion) {
          showParent(card);
      } else {
          hideParent(card);
      }
  });
}

function showParent(element) {
  element.style.display = 'block';
}

function hideParent(element) {
  element.style.display = 'none';
}

// Apply event listener to every instance of .filter-container
document.querySelectorAll('.filter-container').forEach(container => {
  container.addEventListener('click', navigateRegion);
});

// Apply event listener to the #filterRegion button
document.querySelector('#filterRegion').addEventListener('click', function() {
  // Select the filter wrap
  const filterWrap = document.querySelector('.filter-flex-wrap');

  // Toggle the 'is--visible' class
  filterWrap.classList.toggle('is--visible');
});
