function navigateRegion(e) {
    // Check if the clicked element is a filter button
    if (!e.target.hasAttribute('data-region')) return;
    const selectedRegion = e.target.dataset.region;

    // Remove 'active' class from all filter buttons
    const buttons = e.currentTarget.querySelectorAll('[data-region]');
    buttons.forEach(button => button.classList.remove('is--active'));

    // Add 'active' class to clicked filter button
    e.target.classList.add('is--active');

    // Only select cards within the same parent container as the clicked filter button
    const cards = e.currentTarget.querySelectorAll('.filter-card');

    cards.forEach(card => {
        const regionElement = card.querySelector('.region');
        if (!regionElement) return;
        const cardRegion = regionElement.innerHTML.toLowerCase().trim();
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