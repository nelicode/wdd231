// ============================================
// scripts/discover.js - Discover page logic
// ============================================

import { places } from '../data/discover.mjs';

// ===== 1. MENU MOBILE =====
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

// ===== 2. FOOTER DATES =====
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ===== 3. VISITOR MESSAGE (localStorage) =====
const visitMessage = document.getElementById("visitMessage");
const currentVisit = Date.now();
const lastVisit = Number(localStorage.getItem("lastVisit"));

if (!lastVisit) {
    // Primera visita
    visitMessage.textContent = "👋 Welcome! Let us know if you have any questions.";
} else {
    const daysBetweenVisits = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysBetweenVisits < 1) {
        // Menos de 1 día
        visitMessage.textContent = "👋 Back so soon! Awesome!";
    } else if (daysBetweenVisits === 1) {
        // 1 día
        visitMessage.textContent = "📅 You last visited 1 day ago.";
    } else {
        // Más de 1 día
        visitMessage.textContent = `📅 You last visited ${daysBetweenVisits} days ago.`;
    }
}
localStorage.setItem("lastVisit", String(currentVisit));

// ===== 4. GENERATE DISCOVER CARDS =====
const container = document.getElementById("discoverCards");

if (!container) {
    console.error("❌ No se encontró el elemento #discoverCards");
} else {
    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.className = "discover-card";
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
            <h2>${place.id}. ${place.name}</h2>
            <figure>
                <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more">Learn More</button>
        `;

        const button = card.querySelector(".learn-more");
        button.addEventListener("click", () => {
            alert(`${place.name}\n\n📍 ${place.address}\n\n${place.description}`);
        });

        container.appendChild(card);
    });

    console.log(`✅ ${places.length} cards generated successfully.`);
}