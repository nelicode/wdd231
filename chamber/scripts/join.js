// ============================================
// JOIN.JS - Join Page
// ============================================

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// ===== MENU MOBILE =====
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        const expanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", !expanded);
        menuButton.textContent = navigation.classList.contains("open") ? "✕" : "☰";
    });
}

// ===== TIMESTAMP =====
document.querySelector("#timestamp").value = new Date().toLocaleString();

// ===== DIALOGS =====
const buttons = document.querySelectorAll("[data-dialog]");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const dialog = document.getElementById(button.dataset.dialog);
        if (dialog) dialog.showModal();
    });
});

const closeButtons = document.querySelectorAll(".closeDialog");
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const dialog = button.closest("dialog");
        if (dialog) dialog.close();
    });
});