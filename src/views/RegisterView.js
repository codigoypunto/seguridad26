import { loginUser } from '../core/store.js';
import { sendToGoogleForms, sendToFirebase, getEmpresasBase, registerNewCompanyDynamic } from '../services/api.js';
import { navigate } from '../core/router.js';

export const RegisterView = () => {
    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container register-view';

        const empresas = getEmpresasBase();
        const devSettings = JSON.parse(localStorage.getItem('dev_settings')) || { allowNewCompanies: true };

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
                    <input type="text" id="dni" class="input-field" placeholder="DNI / CE" required autocomplete="off">
                    
                    <select id="companySelect" class="input-field" required style="text-align-last: center;">
                        <option value="" disabled selected>SELECCIONA TU EMPRESA</option>
                        ${empresas.map(emp => `<option value="${emp}">${emp}</option>`).join('')}
                        ${devSettings.allowNewCompanies ? `<option value="OTRA_EMPRESA_CUSTOM">➕ OTROS (AGREGAR NUEVA)</option>` : ''}
                    </select>

                    <input type="text" id="otherCompany" class="input-field hidden" placeholder="ESCRIBE EL NOMBRE DE TU EMPRESA" autocomplete="off" style="text-transform: uppercase;">
                    
                    <input type="text" id="lugar" class="input-field" placeholder="LUGAR: SALVEANI / CORTADERA / ..." required autocomplete="off" style="text-transform: uppercase;">
                    
                    <button type="submit" class="btn-primary">REGISTRARSE</button>
                </form>
            </div>
        `;
        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const form = document.getElementById('registrationForm');
        const companySelect = document.getElementById('companySelect');
        const otherCompanyInput = document.getElementById('otherCompany');

        companySelect.addEventListener('change', (e) => {
            if (e.target.value === 'OTRA_EMPRESA_CUSTOM') {
                otherCompanyInput.classList.remove('hidden');
                otherCompanyInput.required = true;
                otherCompanyInput.focus();
            } else {
                otherCompanyInput.classList.add('hidden');
                otherCompanyInput.required = false;
                otherCompanyInput.value = '';
            }
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const dni = document.getElementById("dni").value.trim();
            let company = companySelect.value;
            if (company === 'OTRA_EMPRESA_CUSTOM') {
                company = otherCompanyInput.value.trim().toUpperCase();
                if (company) {
                    registerNewCompanyDynamic(company);
                }
            }
            const lugar = document.getElementById("lugar").value.trim().toUpperCase();

            if (dni && company && lugar) {
                localStorage.setItem('current_dni', dni);
                const devSettings = JSON.parse(localStorage.getItem('dev_settings')) || { localDbEnabled: true };
                let isNewUser = true;
                
                if (devSettings.localDbEnabled) {
                    isNewUser = loginUser(dni, company, lugar);
                } else {
                    store.currentUserDni = dni;
                }

                if (isNewUser) {
                    sendToGoogleForms(dni, company, lugar);
                    await sendToFirebase(dni, company, lugar);
                }

                navigate('/bravometro');
            }
        });
    };

    const destroy = () => {};

    return { render, afterRender, destroy };
};