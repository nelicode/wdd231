import { fetchData } from './modules/dataLoader.js';
import { renderRoasters } from './modules/roasterRenderer.js';
import { fetchWeather } from './modules/weather.js';

async function loadHome() {
    try {
        const data = await fetchData('./data/roasters.json');
        const top3 = data.sort((a, b) => b.rating - a.rating).slice(0, 3);
        renderRoasters(top3, 'favorites-grid');
    } catch {
        document.getElementById('favorites-grid').innerHTML = '<p style="color:#D84315;">⚠️ Error loading roasters.</p>';
    }

    const weather = await fetchWeather();
    const weatherDiv = document.getElementById('weather-widget');
    if (weatherDiv && weather) {
        const temp = weather.temperature;
        const code = weather.weathercode;
        let icon = '☀️', suggestion = 'Perfect for iced coffee!';
        if (code >= 51 && code <= 67) { icon = '🌧️'; suggestion = 'Grab a hot latte!'; }
        else if (code >= 71 && code <= 77) { icon = '❄️'; suggestion = 'Warm up with a mocha!'; }
        else if (temp > 25) { icon = '☀️'; suggestion = 'Refresh with cold brew!'; }
        else if (temp < 15) { icon = '☕'; suggestion = 'Perfect for pour-over.'; }
        weatherDiv.innerHTML = `<div class="weather-widget"><span class="icon">${icon}</span><div class="info">${temp}°C - ${suggestion}</div></div>`;
    } else if (weatherDiv) {
        weatherDiv.innerHTML = '<p>🌤️ Weather unavailable.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger
    const btn = document.getElementById('hamburger-btn');
    const nav = document.querySelector('nav ul');
    if (btn && nav) {
        btn.addEventListener('click', () => nav.classList.toggle('open'));
    }

    loadHome();
});