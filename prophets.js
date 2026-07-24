// ============================================
// 1. LA URL DEL JSON (AQUÍ VA LA URL)
// ============================================
const url = 'https://byui-cse.github.io/cse-www-program/data/latter-day-prophets.json';

// ============================================
// 2. SELECCIONAR EL CONTENEDOR DONDE IRÁN LAS TARJETAS
// ============================================
const cards = document.querySelector('#cards');

// ============================================
// 3. FUNCIÓN PARA OBTENER LOS DATOS (ASÍNCRONA)
// ============================================
async function getProphetData() {
    try {
        // 3.1: Obtener la respuesta de la URL
        const respuesta = await fetch(url);
        
        // 3.2: Convertir la respuesta a JSON
        const data = await respuesta.json();
        
        // 3.3: Verificar los datos en la consola
        console.table(data.prophets);
        console.log(data);
        
        // 3.4: Llamar a la función que muestra las tarjetas
        displayProphets(data.prophets);
        
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        cards.innerHTML = '<p>❌ Error al cargar los profetas.</p>';
    }
}

// ============================================
// 4. FUNCIÓN PARA MOSTRAR LOS PROFETAS EN TARJETAS
// ============================================
const displayProphets = (prophets) => {
    // Recorrer cada profeta
    prophets.forEach((prophet) => {
        // 4.1: Crear los elementos HTML
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        
        // 4.2: Llenar los elementos con los datos del profeta
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `📅 Nacimiento: ${prophet.birthdate}`;
        birthPlace.textContent = `📍 Lugar: ${prophet.birthplace}`;
        
        // 4.3: Configurar la imagen (LA URL VIENE DEL JSON)
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Retrato de ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        
        // 4.4: Agregar los elementos a la tarjeta
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);
        
        // 4.5: Agregar la tarjeta al contenedor
        cards.appendChild(card);
    });
};

// ============================================
// 5. EJECUTAR LA FUNCIÓN PRINCIPAL
// ============================================
getProphetData();