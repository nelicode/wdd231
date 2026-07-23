const hamburgerBtn = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');

if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', function() {
        mainNav.classList.toggle('open');
        this.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });

    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                mainNav.classList.remove('open');
                hamburgerBtn.textContent = '☰';
            }
        });
    });

    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) || 
            (href === 'index.html' && currentPath.endsWith('/week1/'))) {
            link.classList.add('active');
        }
    });
}