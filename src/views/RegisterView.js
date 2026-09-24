import { loginUser } from '../core/store.js';
import { sendToGoogleForms } from '../services/api.js';
import { navigate } from '../core/router.js';

export const RegisterView = () => {
    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container register-view';

        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>
            
            <div class="campaign-logo">
                <img src="src/images/LogoBravos.png" alt="Los Brav@s de la Seguridad">
            </div>
            
            <div class="card-glass">
                <h3 class="card-title">¡EL PODER EN CADA HISTORIA!</h3>
                <form id="registrationForm" class="form-container">
                    <input type="text" id="dni" class="input-field" placeholder="DNI/CE" required autocomplete="off">
                    <input type="text" id="company" class="input-field" placeholder="EMPRESA: NEWREST/SECHE/..." required autocomplete="off">
                    <input type="text" id="lugar" class="input-field" placeholder="LUGAR: SALVEANI/CORTADERA/..." required autocomplete="off">
                    <button type="submit" class="btn-primary">REGISTRARSE</button>
                </form>
            </div>
        `;
        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const form = document.getElementById('registrationForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const dni = document.getElementById("dni").value.trim();
            const company = document.getElementById("company").value.trim();
            const lugar = document.getElementById("lugar").value.trim();

            if (dni && company && lugar) {
                // 1. Lógica de guardado local
                const isNewUser = loginUser(dni, company, lugar);

                // 2. Si es nuevo, mandamos a Google Forms
                if (isNewUser) {
                    sendToGoogleForms(dni, company, lugar);
                }

                // 3. Transición a la siguiente vista
                navigate('/bravometro');
            }
        });
    };

    const destroy = () => {
        // El router se encarga de vaciar el DOM, lo que elimina el listener automáticamente
    };

    return { render, afterRender, destroy };
};