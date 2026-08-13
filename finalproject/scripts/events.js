const eventsData = [
    { id: 1, title: 'Pour-Over Workshop', date: '2026-08-20', time: '10:00 AM', location: 'Bean & Brew House', description: 'Learn manual pour-over.' },
    { id: 2, title: 'Espresso Tasting', date: '2026-08-22', time: '3:00 PM', location: 'Roast & Relax', description: 'Sample single-origin espressos.' },
    { id: 3, title: 'Latte Art Class', date: '2026-08-25', time: '11:00 AM', location: 'Cafe Aurora', description: 'Master latte art basics.' },
    { id: 4, title: 'Home Roasting 101', date: '2026-08-27', time: '2:00 PM', location: 'Roastery X', description: 'Roast beans at home.' },
    { id: 5, title: 'Cold Brew Festival', date: '2026-08-30', time: '12:00 PM', location: 'Frosty Mugs', description: 'Cold brew tasting competition.' }
];

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger
    const btn = document.getElementById('hamburger-btn');
    const nav = document.querySelector('nav ul');
    if (btn && nav) {
        btn.addEventListener('click', () => nav.classList.toggle('open'));
    }

    const container = document.getElementById('events-list');
    if (container) {
        container.innerHTML = eventsData.map(event => `
      <div class="card">
        <div class="card-content">
          <h3>${event.title}</h3>
          <p><strong>📅 Date:</strong> ${event.date}</p>
          <p><strong>⏰ Time:</strong> ${event.time}</p>
          <p><strong>📍 Location:</strong> ${event.location}</p>
          <p>${event.description}</p>
        </div>
      </div>
    `).join('');
    }
});