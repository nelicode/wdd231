// ============================================
// 1. LA URL DEL JSON
// ============================================
const url = 'data/members.json';

// ============================================
// 2. SELECCIONAR EL CONTENEDOR
// ============================================
const cards = document.querySelector('#cards');

// ============================================
// 3. VARIABLE PARA GUARDAR LOS DATOS
// ============================================
let currentMembers = [];

// ============================================
// 4. FUNCIÓN PARA OBTENER LOS DATOS
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

        currentMembers = data.members;
        displayGrid(currentMembers);

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
// 5. FUNCIÓN PARA MOSTRAR EN GRID (TARJETAS CON IMÁGENES)
// ============================================
const displayGrid = (members) => {
    cards.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('section');

        card.innerHTML = `
            <h2>${member.name}</h2>
            <div class="card-content">
                <img src="${member.image}" alt="${member.name}" class="card-image" loading="lazy">
                <div class="card-info">
                    <p class="tagline">${member.tagline || 'Business Tag Line'}</p>
                    <p>📧 ${member.email || 'info@empresa.com'}</p>
                    <p>📞 ${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">🌐 ${member.website}</a></p>
                    <p>Nivel: ${'⭐'.repeat(member.membership)}</p>
                </div>
            </div>
        `;

        cards.appendChild(card);
    });
};

// ============================================
// ============================================
// 6. FUNCIÓN PARA MOSTRAR EN LIST (TABLA - 4 COLUMNAS)
// ============================================
const displayList = (members) => {
    console.log('📋 Mostrando lista...', members.length, 'miembros');
    cards.innerHTML = '';

    // Crear tabla
    const table = document.createElement('table');
    table.className = 'list-table';

    // Crear encabezado de la tabla (4 columnas)
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Website</th>
            <th>Address</th>
            <th>Phone</th>
            <th>URL</th>
        </tr>
    `;
    table.appendChild(thead);

    // Crear cuerpo de la tabla
    const tbody = document.createElement('tbody');

    members.forEach((member, index) => {
        const row = document.createElement('tr');

        // Alternar clases para zebra striping (par/impar)
        if (index % 2 === 0) {
            row.className = 'even';
        } else {
            row.className = 'odd';
        }

        // Columna 1: Website (nombre de la empresa)
        const cellWebsite = document.createElement('td');
        cellWebsite.textContent = member.name;

        // Columna 2: Address (dirección completa)
        const cellAddress = document.createElement('td');
        cellAddress.textContent = member.address;

        // Columna 3: Phone (número de teléfono)
        const cellPhone = document.createElement('td');
        cellPhone.textContent = member.phone;

        // Columna 4: URL (enlace al sitio web)
        const cellUrl = document.createElement('td');
        cellUrl.innerHTML = `<a href="${member.website}" target="_blank">${member.website}</a>`;

        row.appendChild(cellWebsite);
        row.appendChild(cellAddress);
        row.appendChild(cellPhone);
        row.appendChild(cellUrl);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    cards.appendChild(table);
};

// ============================================
// 7. EVENTOS PARA LOS BOTONES GRID / LIST
// ============================================
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => {
        console.log('🔄 Cambiando a Grid');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        displayGrid(currentMembers);
    });

    listViewBtn.addEventListener('click', () => {
        console.log('🔄 Cambiando a List');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        displayList(currentMembers);
    });
} else {
    console.error('❌ No se encontraron los botones Grid/List');
}

// ============================================
// 8. MENÚ HAMBURGUESA
// ============================================
const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');

if (menuButton && mainNav) {
    menuButton.addEventListener('click', () => {
        mainNav.classList.toggle('open');

        if (mainNav.classList.contains('open')) {
            menuButton.textContent = '✕';
        } else {
            menuButton.textContent = '☰';
        }
    });

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuButton.textContent = '☰';
        });
    });
}

// ============================================
// MOSTRAR FECHA DE ÚLTIMA MODIFICACIÓN
// ============================================
document.getElementById('lastModified').textContent = document.lastModified;

// ============================================
// 9. EJECUTAR
// ============================================
getMembers();