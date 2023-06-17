function createTOCItem(heading, index) {
  const item = document.createElement("a");
  item.innerHTML = heading.innerHTML;
  item.classList.add("tocitem");
  item.href = `#toc-${index}`;
  return item;
}

function updateActiveTOCItem(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll(".active").forEach(activeElement => {
        activeElement.classList.remove("active");
      });
      document.querySelector(`a[href="#${id}"]`).classList.add("active");
    }
  });
}

const observer = new IntersectionObserver(updateActiveTOCItem, {
  rootMargin: '0px 0px -75% 0px'
});

const contentElement = document.getElementById("content");
const tocElement = document.getElementById("toc");

contentElement.querySelectorAll("h2").forEach((heading, i) => {
  const id = `toc-${i}`;
  heading.id = id;
  observer.observe(heading);

  const tocItem = createTOCItem(heading, i);
  tocElement.appendChild(tocItem);
});