// ============================================
// INDEX.JS - Home page
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

// ===== WEATHER API =====
const apiKey = "7baf71787275417242e2d9e9c475a58e";
const lat = -16.4090;
const lon = -71.5375;

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(currentURL);
        if (!response.ok) throw new Error("Weather unavailable");
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    const weather = document.querySelector("#current-weather");
    if (weather) {
        weather.innerHTML = `
            <p><strong>${Math.round(data.main.temp)}°C</strong></p>
            <p>${data.weather[0].description}</p>
        `;
    }
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) throw new Error("Forecast unavailable");
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

function displayForecast(data) {
    const forecast = document.querySelector("#forecast");
    if (!forecast) return;
    forecast.innerHTML = "";
    const days = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    days.slice(0, 3).forEach(day => {
        const date = new Date(day.dt_txt);
        forecast.innerHTML += `
            <p>${date.toLocaleDateString("en-US", { weekday: "short" })}: ${Math.round(day.main.temp)}°C</p>
        `;
    });
}

// ===== SPOTLIGHTS =====
const memberURL = "data/members.json";

async function getSpotlights() {
    try {
        const response = await fetch(memberURL);
        if (!response.ok) throw new Error("Members unavailable");
        const data = await response.json();
        displaySpotlights(data);
    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {
    const container = document.querySelector("#spotlight-container");
    if (!container) return;
    container.innerHTML = "";
    const qualified = members.filter(member => member.membership === 2 || member.membership === 3);
    qualified.sort(() => Math.random() - 0.5);
    const selected = qualified.slice(0, 3);
    selected.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy" width="120" height="120">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><strong>Membership:</strong> ${member.membership === 3 ? "Gold" : "Silver"}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        `;
        container.appendChild(card);
    });
}

getWeather();
getForecast();
getSpotlights();