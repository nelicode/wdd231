// ============================================
// 1. LA URL DEL JSON
// ============================================
const url = 'data/members.json';

// ============================================
// 2. SELECCIONAR EL CONTENEDOR
// ============================================
const cards = document.querySelector('#cards');

// ============================================
// 3. FUNCIÓN PARA OBTENER LOS DATOS
// ============================================
async function getMembers() {
    try {
        console.log('🔍 Cargando miembros...');

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log(`✅ ${data.members.length} miembros cargados`);
        console.table(data.members);

        displayMembers(data.members);

    } catch (error) {
        console.error('❌ Error:', error);
        cards.innerHTML = `
            <p style="color:red; text-align:center; padding:20px;">
                ❌ Error al cargar los miembros: ${error.message}
            </p>
        `;
    }
}

// ============================================
// 4. FUNCIÓN PARA MOSTRAR LAS TARJETAS
// ============================================
const displayMembers = (members) => {
    // Limpiar el contenedor
    cards.innerHTML = '';

    members.forEach((member) => {
        // ============================================
        // 1. CREAR LA TARJETA PRINCIPAL
        // ============================================
        const card = document.createElement('section');

        // ============================================
        // 2. TÍTULO (Business Name) - CENTRADO ARRIBA
        // ============================================
        const name = document.createElement('h2');
        name.textContent = member.name;

        // ============================================
        // 3. CONTENEDOR: Imagen + Información (lado a lado)
        // ============================================
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'card-content';

        // ============================================
        // 4. IMAGEN (Izquierda)
        // ============================================
        const image = document.createElement('img');
        image.setAttribute('src', member.image);
        image.setAttribute('alt', `Logo de ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.className = 'card-image';

        // ============================================
        // 5. INFORMACIÓN (Derecha)
        // ============================================
        const infoWrapper = document.createElement('div');
        infoWrapper.className = 'card-info';

        // 5.1 Tag Line (eslogan de la empresa)
        const tagLine = document.createElement('p');
        tagLine.textContent = member.tagline || 'Business Tag Line';
        tagLine.className = 'tagline';

        // 5.2 Email
        const email = document.createElement('p');
        email.innerHTML = `📧 ${member.email || 'info@empresa.com'}`;

        // 5.3 Teléfono
        const phone = document.createElement('p');
        phone.innerHTML = `📞 ${member.phone}`;

        // 5.4 URL (sitio web)
        const website = document.createElement('p');
        const cleanUrl = member.website.replace('https://', '').replace('http://', '');
        website.innerHTML = `<a href="${member.website}" target="_blank">🌐 ${cleanUrl}</a>`;

        // 5.5 Nivel de membresía (estrellas)
        const membership = document.createElement('p');
        const stars = '⭐'.repeat(member.membership);
        membership.textContent = `Nivel: ${stars}`;

        // ============================================
        // 6. ARMAR LA TARJETA
        // ============================================
        // Agregar todo a infoWrapper
        infoWrapper.appendChild(tagLine);
        infoWrapper.appendChild(email);
        infoWrapper.appendChild(phone);
        infoWrapper.appendChild(website);
        infoWrapper.appendChild(membership);

        // Agregar imagen e info al contentWrapper
        contentWrapper.appendChild(image);
        contentWrapper.appendChild(infoWrapper);

        // Agregar título y contentWrapper a la tarjeta
        card.appendChild(name);
        card.appendChild(contentWrapper);

        // Agregar la tarjeta al contenedor principal
        cards.appendChild(card);
    });
};
const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');

if (menuButton && mainNav) {
    menuButton.addEventListener('click', () => {
        mainNav.classList.toggle('open');

        // Cambiar el texto del botón entre ☰ y ✕
        if (mainNav.classList.contains('open')) {
            menuButton.textContent = '✕';
        } else {
            menuButton.textContent = '☰';
        }
    });

    // Cerrar el menú al hacer clic en un enlace
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuButton.textContent = '☰';
        });
    });
}

// ============================================
// 5. EJECUTAR
// ============================================
getMembers();