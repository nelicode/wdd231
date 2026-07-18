(function () {
    // ===== CAMBIO DE VISTA (GRID / LISTA) =====
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');
    const directoryGrid = document.getElementById('directoryGrid');

    function setView(view) {
        if (view === 'grid') {
            directoryGrid.classList.remove('list-view');
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
        } else {
            directoryGrid.classList.add('list-view');
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
        }
    }

    gridBtn.addEventListener('click', () => setView('grid'));
    listBtn.addEventListener('click', () => setView('list'));

    // ===== MENÚ MÓVIL =====
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // ===== PREVENIR COMPORTAMIENTO POR DEFECTO (DEMO) =====
    document.querySelectorAll('.card-link, .btn-primary, .btn-secondary, .main-nav a, .footer-social a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#' || link.getAttribute('href') === '') {
                e.preventDefault();
            }
        });
    });
})();