// URL proporcionada en la tarea con los campos específicos
const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,languages,population";

const container = document.getElementById('countries-container');

// Función principal asíncrona
async function getCountries() {
    try {
        const response = await fetch(API_URL);
        
        // Verificamos si la respuesta es correcta
        if (!response.ok) {
            throw new Error('Error al conectar con la API');
        }

        const countries = await response.json();
        renderCountries(countries);

    } catch (error) {
        console.error(error);
        container.innerHTML = `<div class="alert alert-danger" role="alert">Hubo un error al cargar los datos. Intenta más tarde.</div>`;
    }
}

// Función para renderizar las tarjetas en el DOM
function renderCountries(countries) {
    // Limpiamos el spinner de carga
    container.innerHTML = '';

    countries.forEach(country => {
        // --- Procesamiento de datos ---
        
        // 1. Capital: Viene en array, tomamos el primero o ponemos "N/A"
        const capital = country.capital ? country.capital[0] : 'No tiene';

        // 2. Monedas: Es un objeto dinámico (ej: {USD: {...}}). Usamos Object.values
        const currencies = country.currencies 
            ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
            : 'N/A';

        // 3. Idiomas: También es objeto dinámico.
        const languages = country.languages 
            ? Object.values(country.languages).join(', ') 
            : 'N/A';

        // 4. Población: Formato con comas para leer mejor (ej: 1,000,000)
        const population = country.population.toLocaleString('es-MX');

        // --- Creación del HTML (Bootstrap Card) ---
        const cardHTML = `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100">
                    <img src="${country.flags.svg}" class="card-img-top" alt="Bandera de ${country.name.common}">
                    <div class="card-body">
                        <h5 class="card-title text-center mb-3">${country.name.common}</h5>
                        <p class="card-text small">
                            <strong>Capital:</strong> ${capital}<br>
                            <strong>Población:</strong> ${population}<br>
                            <strong>Moneda:</strong> ${currencies}<br>
                            <strong>Idiomas:</strong> ${languages}
                        </p>
                    </div>
                    <div class="card-footer bg-white border-top-0 text-center">
                        <a href="https://www.google.com/maps/place/${country.name.common}" target="_blank" class="btn btn-outline-primary btn-sm w-100">Ver en Mapa</a>
                    </div>
                </div>
            </div>
        `;

        // Agregamos al contenedor (usamos insertAdjacentHTML por rendimiento)
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Ejecutamos la función al cargar el script
getCountries();