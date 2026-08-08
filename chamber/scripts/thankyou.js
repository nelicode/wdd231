// ============================================
// THANKYOU.JS - Thank You Page
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

// ===== URL PARAMETERS =====
const params = new URLSearchParams(window.location.search);
document.querySelector("#first").textContent = params.get("first") || "Not provided";
document.querySelector("#last").textContent = params.get("last") || "Not provided";
document.querySelector("#email").textContent = params.get("email") || "Not provided";
document.querySelector("#phone").textContent = params.get("phone") || "Not provided";
document.querySelector("#organization").textContent = params.get("organization") || "Not provided";
document.querySelector("#membership").textContent = params.get("membership") || "Not provided";
document.querySelector("#timestamp").textContent = params.get("timestamp") || "Not provided";