// Reemplaza tu archivo actual src/views/EstrellasView.js con este:
import { store } from '../core/store.js';
import { navigate } from '../core/router.js';

export const EstrellasView = () => {
    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container estrellas-view fade-in';
        container.id = 'estrellasContainer';

        const stationId = store.currentStation || 1;
        const score = store.userData ? store.userData[`estacion${stationId}`] : 0;

        let feedbackText = "¡BUEN INTENTO!";
        if (score === 4) feedbackText = "¡PERFECTO! ERES UN BR@VO";
        else if (score === 3) feedbackText = "¡MUY BIEN HECHO!";
        else if (score > 0) feedbackText = "¡VAS POR BUEN CAMINO!";

        const getBigStarSVG = (index) => `
            <div class="star-wrapper" id="star-${index}">
                <svg viewBox="0 0 24 24" class="star-svg empty">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
                <div class="particles" id="particles-${index}"></div>
            </div>
        `;

        container.innerHTML = `
            <div class="glow-background"></div>
            <!-- Contenedor para las partículas flotantes -->
            <div id="floatingParticles" class="floating-particles-layer"></div>
            
            <div class="brand-header" style="position: relative; z-index: 10;">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>

            <div class="estrellas-content">
                <h2 class="title-feedback slide-in-bottom">${feedbackText}</h2>
                <p class="subtitle-feedback slide-in-bottom">Estación ${stationId} Completada</p>
                
                <div class="big-stars-container">
                    ${[1, 2, 3, 4].map(i => getBigStarSVG(i)).join('')}
                </div>

                <div class="score-summary bounce-in-top hidden" id="scoreSummary">
                    +${score} PUNTOS
                </div>
            </div>
            
            <button id="btnVolver" class="btn-primary pulse-btn hidden" style="margin-top: auto; width: 100%; z-index: 10;">
                VOLVER AL BRAVÓMETRO
            </button>
        `;
        
        container.dataset.score = score;
        fragment.appendChild(container);
        return fragment;
    };

    const generateFloatingParticles = () => {
        const layer = document.getElementById('floatingParticles');
        if (!layer) return;
        // Crear 30 partículas aleatorias
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            const size = Math.random() * 6 + 2; // entre 2px y 8px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 3 + 2}s`; // 2s a 5s
            particle.style.animationDelay = `${Math.random() * 2}s`;
            layer.appendChild(particle);
        }
    };

    const afterRender = () => {
        const container = document.getElementById('estrellasContainer');
        if (!container) return;

        generateFloatingParticles();

        const score = parseInt(container.dataset.score);
        const btnVolver = document.getElementById('btnVolver');
        const scoreSummary = document.getElementById('scoreSummary');

        let delay = 500;
        for (let i = 1; i <= 4; i++) {
            setTimeout(() => {
                const starWrapper = document.getElementById(`star-${i}`);
                const starSvg = starWrapper.querySelector('.star-svg');
                
                if (i <= score) {
                    starSvg.classList.remove('empty');
                    starSvg.classList.add('filled', 'elastic-pop');
                    document.getElementById(`particles-${i}`).classList.add('explode');
                } else {
                    starSvg.classList.add('elastic-pop-empty');
                }
            }, delay);
            delay += 500;
        }

        setTimeout(() => {
            scoreSummary.classList.remove('hidden');
            scoreSummary.classList.add('pop-in');
            btnVolver.classList.remove('hidden');
            btnVolver.classList.add('slide-in-bottom');
        }, delay + 200);

        btnVolver.addEventListener('click', () => {
            navigate('/bravometro');
        });
    };

    const destroy = () => {};

    return { render, afterRender, destroy };
};