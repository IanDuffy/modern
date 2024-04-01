// Function to organize the list and create letter headers
function organizeList() {
  // Clear previous headers and links if they exist
  document.querySelectorAll('.section-link, .letter-header').forEach(el => el.remove());

  // Assuming the container and tocNav are already defined outside this function
  const container = document.getElementById('tocList');
  const tocNav = document.getElementById('tocNav');

  // Clear existing TOC links
  tocNav.innerHTML = '';

  const divs = container.querySelectorAll(':scope > div');
  const uniqueLetters = new Set();
  let currentLetter = '';

  divs.forEach(div => {
    const insuranceNameElement = div.querySelector('.insurance-name');
    if (insuranceNameElement) {
      const item = insuranceNameElement.textContent.trim();
      const firstChar = item.charAt(0).toUpperCase();

      if (firstChar !== currentLetter && firstChar.match(/[A-Z]/)) {
        uniqueLetters.add(firstChar);

        const linkDiv = document.createElement('div');
        linkDiv.className = 'section-link';
        linkDiv.id = `header-${firstChar}`;
        container.insertBefore(linkDiv, div);

        const headerDiv = document.createElement('div');
        headerDiv.className = 'letter-header';
        headerDiv.textContent = firstChar;
        container.insertBefore(headerDiv, div);

        currentLetter = firstChar;
      }
    }
  });

  uniqueLetters.forEach(letter => {
    const tocLink = document.createElement('a');
    tocLink.className = 'letter-section';
    tocLink.href = `#header-${letter}`;
    tocLink.textContent = letter;
    tocNav.appendChild(tocLink);
  });
}

// Run the organization function initially to setup the list
organizeList();

// Attach event listeners to filter items
document.querySelectorAll('.filter-chip-wrapper').forEach(item => {
  item.addEventListener('click', () => {
    // Wait for the filtering action to complete before reorganizing. Adjust timeout as necessary.
    setTimeout(organizeList, 200);
  });
});
