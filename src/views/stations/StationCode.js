import { store, updateProgress } from '../../core/store.js';
import { navigate } from '../../core/router.js';

export const StationCode = (stationId) => {
    const stationCodes = {
        7: "TEST",
        8: "TEST",
        9: "TEST",
        10: "TEST",
        11: "TEST",
        12: "TEST"
    };

    const secretCode = stationCodes[stationId];

    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container station-engine-view slide-in-right';
        
        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>
            <div class="trivia-header pop-in">
                <h2 class="title-trivia">ESTACIÓN ${stationId}</h2>
                <p class="subtitle-trivia">Validación de Capacitación</p>
            </div>
            <div class="card-glass" style="margin-top: 15px;">
                <div style="text-align: center; font-size: 40px; margin-bottom: 5px;">🔐</div>
                <h3 class="card-title" style="color: var(--color-primary); margin-bottom: 8px;">INGRESA EL CÓDIGO</h3>
                <p style="text-align: center; font-size: 12px; margin-bottom: 15px; color: var(--color-text-muted);">
                    Solicita a tu capacitador el código secreto para ganar tus 4 estrellas.
                </p>
                <form id="codeForm" class="form-container">
                    <input type="text" id="stationCodeInput" class="input-field" placeholder="PALABRA DE SEGURIDAD" maxlength="10" required autocomplete="off" style="text-transform: uppercase; font-size: 16px; font-weight: bold; letter-spacing: 2px;">
                    <div id="codeFeedback" style="color: var(--color-danger); text-align: center; font-size: 11px; height: 15px; margin-top:-2px;"></div>
                    <button type="submit" class="btn-primary pulse-btn">VERIFICAR</button>
                    <button type="button" id="btnBackToStations" class="btn-secondary">VOLVER A ESTACIONES</button>
                </form>
            </div>
        `;
        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const form = document.getElementById('codeForm');
        const input = document.getElementById('stationCodeInput');
        const feedback = document.getElementById('codeFeedback');
        const btnBack = document.getElementById('btnBackToStations');

        // Evento botón volver
        btnBack.addEventListener('click', () => {
            navigate('/estaciones');
        });

        // Evento formulario
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const codeEntered = input.value.trim().toUpperCase();
            
            if (codeEntered === secretCode) {
                updateProgress(stationId, 4);
                navigate('/estrellas');
            } else {
                feedback.innerText = "Código incorrecto, inténtalo de nuevo.";
                input.classList.add('shake');
                setTimeout(() => input.classList.remove('shake'), 500);
            }
        });
    };

    return { render, afterRender };
};