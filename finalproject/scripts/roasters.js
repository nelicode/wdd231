import { fetchData } from './modules/dataLoader.js';
import { renderRoasters } from './modules/roasterRenderer.js';

let allRoasters = [];

async function loadRoasters() {
    try {
        allRoasters = await fetchData('./data/roasters.json');
        renderRoasters(allRoasters, 'all-roasters-grid');
    } catch {
        document.getElementById('all-roasters-grid').innerHTML = '<p style="color:#D84315;">⚠️ Error loading roasters.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger
    const btn = document.getElementById('hamburger-btn');
    const nav = document.querySelector('nav ul');
    if (btn && nav) {
        btn.addEventListener('click', () => nav.classList.toggle('open'));
    }

    loadRoasters();

    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            let filtered = allRoasters;
            if (filter === 'high-rated') filtered = allRoasters.filter(r => r.rating >= 4.6);
            else if (filter === 'cold-brew') filtered = allRoasters.filter(r => r.specialty.toLowerCase().includes('cold'));
            renderRoasters(filtered, 'all-roasters-grid');
        });
    });
});