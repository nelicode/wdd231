// ===== DYNAMIC DATES =====
// Current year
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('#current-year');
if (yearElement) {
    yearElement.textContent = currentYear;
}

// Last modified
const lastModifiedElement = document.querySelector('#last-modified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}