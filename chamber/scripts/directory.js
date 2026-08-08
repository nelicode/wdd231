// ============================================
// DIRECTORY.JS - Member Directory
// ============================================

const url = "data/members.json";
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

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

// ===== FETCH MEMBERS =====
async function getMembers() {
    try {
        console.log("🔍 Cargando miembros...");
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const members = await response.json();
        console.log("✅ Miembros cargados:", members.length);
        displayMembers(members);
    } catch (error) {
        console.error("❌ Error:", error);
        membersContainer.innerHTML = `<p style="color:red; text-align:center; padding:20px;">
            ❌ Error: ${error.message}
        </p>`;
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="120">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p>${member.description}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;
        membersContainer.appendChild(card);
    });
}

// ===== VIEW BUTTONS =====
if (gridButton && listButton) {
    gridButton.addEventListener("click", () => {
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");
        gridButton.classList.add("active");
        listButton.classList.remove("active");
    });

    listButton.addEventListener("click", () => {
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");
        listButton.classList.add("active");
        gridButton.classList.remove("active");
    });
}

// ===== FOOTER =====
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// ===== EJECUTAR =====
getMembers();