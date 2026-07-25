// ============================================
// 1. LA URL DEL JSON
// ============================================
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// ============================================
// 2. SELECCIONAR EL CONTENEDOR
// ============================================
const cards = document.querySelector('#cards');

// ============================================
// 3. FUNCIÓN PARA OBTENER LOS DATOS
// ============================================
async function getProphetData() {
    try {
        console.log('🔍 1. Iniciando petición...');

        const respuesta = await fetch(url);
        console.log('✅ 2. Respuesta recibida:', respuesta.status);

        const data = await respuesta.json();
        console.log('✅ 3. Datos convertidos:', data.prophets.length, 'profetas');

        console.table(data.prophets);
        displayProphets(data.prophets);

    } catch (error) {
        console.error('❌ ERROR:', error);
        cards.innerHTML = `
            <p style="color:red; text-align:center; padding:20px;">
                ❌ Error al cargar los profetas: ${error.message}
            </p>
        `;
    }
}

// ============================================
// 4. FUNCIÓN PARA MOSTRAR LAS TARJETAS
// ============================================
const displayProphets = (prophets) => {
    console.log('🃏 4. Creando tarjetas para', prophets.length, 'profetas...');

    prophets.forEach((prophet, index) => {
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        const deathDate = document.createElement('p');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `📅 Nacimiento: ${prophet.birthdate}`;
        birthPlace.textContent = `📍 Lugar: ${prophet.birthplace}`;

        if (prophet.death) {
            deathDate.textContent = `🕊️ Fallecimiento: ${prophet.death}`;
        } else {
            deathDate.textContent = `🕊️ Fallecimiento: Actualmente vivo`;
        }

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Retrato de ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(deathDate);
        card.appendChild(portrait);
        cards.appendChild(card);

        console.log(`  ✅ Tarjeta ${index + 1}: ${prophet.name} ${prophet.lastname}`);
    });

    console.log('✅ 5. ¡Todas las tarjetas creadas!');
};

// ============================================
// 5. EJECUTAR
// ============================================
getProphetData();