import { isFavorite, toggleFavorite } from './storage.js';
import { openModal } from './modal.js';

export function renderRoasters(roasters, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = roasters.map(roaster => {
        const fav = isFavorite(roaster.id) ? 'active' : '';
        return `
      <div class="card" data-id="${roaster.id}">
        <img src="${roaster.image}" alt="${roaster.name}" loading="lazy">
        <button class="fav-btn ${fav}" data-id="${roaster.id}" aria-label="Toggle favorite">
          ${isFavorite(roaster.id) ? '❤️' : '🤍'}
        </button>
        <div class="card-content">
          <h3>${roaster.name}</h3>
          <p class="address">📍 ${roaster.address}</p>
          <p class="rating">⭐ ${roaster.rating} / 5.0</p>
          <p><strong>Specialty:</strong> ${roaster.specialty}</p>
          <button class="btn btn-details" style="padding:0.3rem 1rem; font-size:0.9rem; margin-top:0.5rem;">View Details</button>
        </div>
      </div>
    `;
    }).join('');

    container.querySelectorAll('.card').forEach(card => {
        const id = parseInt(card.dataset.id);
        const roaster = roasters.find(r => r.id === id);

        const favBtn = card.querySelector('.fav-btn');
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newFavs = toggleFavorite(id);
            favBtn.textContent = newFavs.includes(id) ? '❤️' : '🤍';
            favBtn.classList.toggle('active');
        });

        const detailsBtn = card.querySelector('.btn-details');
        detailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showDetails(roaster);
        });
        card.addEventListener('click', () => showDetails(roaster));
    });
}

function showDetails(roaster) {
    const content = `
    <h2>${roaster.name}</h2>
    <img src="${roaster.image}" alt="${roaster.name}" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px;">
    <p><strong>Address:</strong> ${roaster.address}</p>
    <p><strong>Rating:</strong> ⭐ ${roaster.rating} / 5.0</p>
    <p><strong>Specialty:</strong> ${roaster.specialty}</p>
    <p><strong>About:</strong> ${roaster.description}</p>
  `;
    openModal(content);
}