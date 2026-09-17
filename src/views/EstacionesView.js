import { store } from '../core/store.js';
import { navigate } from '../core/router.js';

export const EstacionesView = () => {
    // Definición de los 12 módulos de la campaña
    const stationsData = [
        { id: 1, name: "Percepción de Riesgo" },
        { id: 2, name: "Fatiga y Somnolencia" },
        { id: 3, name: "Caída de Rocas" },
        { id: 4, name: "Cuidado de Manos y Dedos" },
        { id: 5, name: "Aislamiento de Energía" },
        { id: 6, name: "Seguridad Vial" },
        { id: 7, name: "Tema por Definir 1" },
        { id: 8, name: "Tema por Definir 2" },
        { id: 9, name: "Tema por Definir 3" },
        { id: 10, name: "Tema por Definir 4" },
        { id: 11, name: "Tema por Definir 5" },
        { id: 12, name: "Tema por Definir 6" }
    ];

    // SVG de Estrella optimizado
    const getStarSVG = (isFilled) => `
        <svg viewBox="0 0 24 24" class="star-icon ${isFilled ? 'filled' : 'empty'}">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
        </svg>
    `;

    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container estaciones-view slide-in-bottom';

        const userData = store.userData || {};

        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>
            
            <header class="estaciones-header pop-in">
                <h2 class="title-estaciones">SELECCIONA UNA <span class="text-primary">ESTACIÓN</span></h2>
                <p class="subtitle-estaciones">Completa todas y aumenta tu poder.</p>
            </header>
            
            <div class="grid-estaciones" id="gridEstaciones">
                ${stationsData.map(station => {
                    const score = userData[`estacion${station.id}`] || 0;
                    const isVisited = score > 0;
                    
                    // Generar las 4 estrellas según el puntaje
                    let starsHTML = '';
                    for(let i = 1; i <= 4; i++) {
                        starsHTML += getStarSVG(i <= score);
                    }

                    return `
                        <button class="station-card ${isVisited ? 'visited' : ''}" data-id="${station.id}">
                            <div class="station-label">ESTACIÓN ${station.id}</div>
                            <div class="station-name">${station.name}</div>
                            <div class="stars-container">
                                ${starsHTML}
                            </div>
                        </button>
                    `;
                }).join('')}
            </div>
        `;
        
        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const grid = document.getElementById('gridEstaciones');
        
        // Delegación de eventos para mayor rendimiento (un solo listener para los 12 botones)
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.station-card');
            if (card) {
                const stationId = parseInt(card.getAttribute('data-id'));
                
                // Efecto de click "Game Juice"
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    // Guardamos la estación seleccionada en el estado y navegamos
                    store.currentStation = stationId;
                    navigate('/juego');
                }, 150);
            }
        });
    };

    const destroy = () => {};

    return { render, afterRender, destroy };
};