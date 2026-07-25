// ============================================
// MOSTRAR FECHA DE ÚLTIMA MODIFICACIÓN
// ============================================
document.getElementById('lastModified').textContent = document.lastModified;

// ============================================
// MENÚ HAMBURGUESA
// ============================================
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#mainNav");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const expanded = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", !expanded);

    menuButton.textContent = navigation.classList.contains("open") ? "✕" : "☰";
});

// ============================================
// CLIMA - API OpenWeatherMap
// ============================================
const apiKey = "7baf71787275417242e2d9e9c475a58e";
const lat = -16.4090;
const lon = -71.5375;

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(currentURL);
        if (!response.ok) {
            throw new Error("Weather unavailable");
        }
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    const weather = document.querySelector("#current-weather");
    weather.innerHTML = `
        <p><strong>${Math.round(data.main.temp)}°C</strong></p>
        <p>${data.weather[0].description}</p>
    `;
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) {
            throw new Error("Forecast unavailable");
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

function displayForecast(data) {
    const forecast = document.querySelector("#forecast");
    forecast.innerHTML = "";

    const days = data.list.filter(item =>
        item.dt_txt.includes("12:00:00"));
    days.slice(0, 3).forEach(day => {
        const date = new Date(day.dt_txt);
        forecast.innerHTML += `
            <p>
                ${date.toLocaleDateString("en-US", { weekday: "short" })}:
                ${Math.round(day.main.temp)}°C
            </p>
        `;
    });
}

// ============================================
// SPOTLIGHTS - Empresas destacadas (solo 2)
// ============================================
const memberURL = "data/members.json";

async function getSpotlights() {
    try {
        const response = await fetch(memberURL);

        if (!response.ok) {
            throw new Error("Members unavailable");
        }
        const data = await response.json();
        displaySpotlights(data.members);

    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {

    const spotlightContainer = document.querySelector("#spotlight-container");

    spotlightContainer.innerHTML = "";

    // Filtrar oro (3) y plata (2)
    const qualified = members.filter(member =>
        member.membership === 3 ||
        member.membership === 2
    );

    qualified.sort(() => Math.random() - 0.5);
    const selected = qualified.slice(0, 2);

    selected.forEach(member => {


        const card = document.createElement("section");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}"
                 alt="${member.name} logo"
                 loading="lazy"
                 width="120"
                 height="120">

            <h2>${member.name}</h2>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p><strong>Membership:</strong> ${member.membership === 3 ? "Gold" : "Silver"
            }</p>

            <p><strong>Website:</strong>
                <a href="${member.website}"
                 target="_blank"
                 rel="noopener">
                 ${member.website}
                 </a>
            </p>
        `;


        spotlightContainer.appendChild(card);
    });
}

// ============================================
// EJECUTAR
// ============================================
getWeather();
getForecast();
getSpotlights();