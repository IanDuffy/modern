// Select the parent container of the list by its ID
const container = document.getElementById('tocList');

// Get all div elements that are direct children of the container
const divs = container.querySelectorAll(':scope > div');

// Set to store unique letters
const uniqueLetters = new Set();

// Iterate over the divs to process headers and fill uniqueLetters
let currentLetter = '';

divs.forEach(div => {
  const item = div.textContent.trim();
  const firstChar = item.charAt(0).toUpperCase();

  if (firstChar !== currentLetter && firstChar.match(/[A-Z]/)) {
    uniqueLetters.add(firstChar);

    // Create a new div for the section link
    const linkDiv = document.createElement('div');
    linkDiv.className = 'section-link';
    linkDiv.id = `header-${firstChar}`; // Assign an ID based on the letter

    // Insert the new link div before the current item div
    container.insertBefore(linkDiv, div);

    // Create a new div for the letter header
    const headerDiv = document.createElement('div');
    headerDiv.className = 'letter-header';
    headerDiv.textContent = firstChar;

    // Insert the new header div after the link div
    container.insertBefore(headerDiv, div);

    currentLetter = firstChar;
  }
});

// Select the TOC container
const tocNav = document.getElementById('tocNav');

// For each unique letter, create a link in the TOC
uniqueLetters.forEach(letter => {
  // Create a new anchor element for the TOC link
  const tocLink = document.createElement('a');
  tocLink.className = 'letter-section';
  tocLink.href = `#header-${letter}`;
  tocLink.textContent = letter;

  // Append the TOC link to the tocNav container
  tocNav.appendChild(tocLink);
});
