import { store, updateProgress } from '../../core/store.js';
import { navigate } from '../../core/router.js';

export const StationCode = (stationId) => {
    // Nuevos códigos de 10 caracteres, aleatorios e impredecibles
    const stationCodes = {
        7: "TRX9",
        8: "V7KL",
        9: "J2F6",
        10: "M4C8",
        11: "Q9N2",
        12: "W3B7"
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
            <div class="card-glass" style="margin-top: 30px;">
                <div style="text-align: center; font-size: 50px; margin-bottom: 10px;">🔐</div>
                <h3 class="card-title" style="color: var(--color-primary);">INGRESA EL CÓDIGO</h3>
                <p style="text-align: center; font-size: 13px; margin-bottom: 20px; color: var(--color-text-muted);">
                    Solicita a tu capacitador el código de 4 caracteres para ganar tus 4 estrellas.
                </p>
                <form id="codeForm" class="form-container">
                    <input type="text" id="stationCodeInput" class="input-field" placeholder="4 CARACTERES" maxlength="10" required autocomplete="off" style="text-transform: uppercase; font-size: 18px; font-weight: bold; letter-spacing: 2px;">
                    <div id="codeFeedback" style="color: var(--color-danger); text-align: center; font-size: 12px; height: 15px; margin-top:-5px;"></div>
                    <button type="submit" class="btn-primary pulse-btn">VERIFICAR CÓDIGO</button>
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