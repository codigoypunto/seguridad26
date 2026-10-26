/**
 * src/views/RegisterView.js
 * Módulo de la Pantalla de Registro con Modo Tester (Opción 3 - Validación al Submit)
 */
import { loginUser, store } from '../core/store.js';
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
                <!-- Añadimos 'novalidate' para controlar nosotros la validación en JS -->
                <form id="registrationForm" class="form-container" novalidate>
                    
                    <!-- El DNI sigue siendo estrictamente requerido -->
                    <input type="text" id="dni" class="input-field" placeholder="DNI / CE" required autocomplete="off">
                    
                    <!-- Quitamos el 'required' HTML para poder omitirlo en Modo Tester -->
                    <select id="companySelect" class="input-field" style="text-align-last: center;">
                        <option value="" disabled selected>SELECCIONA TU EMPRESA</option>
                        ${empresas.map(emp => `<option value="${emp}">${emp}</option>`).join('')}
                        ${devSettings.allowNewCompanies ? `<option value="OTRA_EMPRESA_CUSTOM">➕ OTROS (AGREGAR NUEVA)</option>` : ''}
                    </select>

                    <input type="text" id="otherCompany" class="input-field hidden" placeholder="ESCRIBE EL NOMBRE DE TU EMPRESA" autocomplete="off" style="text-transform: uppercase;">
                    
                    <!-- Quitamos el 'required' HTML -->
                    <input type="text" id="lugar" class="input-field" placeholder="LUGAR: SALVEANI / CORTADERA / ..." autocomplete="off" style="text-transform: uppercase;">
                    
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
        const lugarInput = document.getElementById("lugar");
        const dniInput = document.getElementById("dni");

        // Lógica visual básica para desplegar el campo "Otros"
        companySelect.addEventListener('change', (e) => {
            if (e.target.value === 'OTRA_EMPRESA_CUSTOM') {
                otherCompanyInput.classList.remove('hidden');
                otherCompanyInput.focus();
            } else {
                otherCompanyInput.classList.add('hidden');
                otherCompanyInput.value = '';
            }
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const dni = dniInput.value.trim();
            
            // Validación manual del DNI (ya que usamos novalidate)
            if (!dni) {
                alert("Por favor, ingresa tu DNI o CE.");
                dniInput.focus();
                return;
            }

            // =================================================================
            // 🛑 NUEVO MODO TESTER SILENCIOSO (Opción 3)
            // Si es 999, ignoramos todo lo demás, guardamos local y saltamos
            // =================================================================
            if (dni === '999') {
                console.log("🛠️ Modo Tester Activado: Guardado Local. Sin envío a la nube.");
                const company = "TESTER_QA";
                const lugar = "MODO_PRUEBA";
                
                localStorage.setItem('current_dni', dni);
                loginUser(dni, company, lugar); // Crea perfil local
                navigate('/bravometro'); // Salta a la app sin llamar a Firebase/Forms
                return; // Finaliza la ejecución aquí
            }

            // =================================================================
            // ✅ FLUJO NORMAL Y VALIDACIÓN MANUAL DE USUARIO
            // =================================================================
            let company = companySelect.value;
            
            if (!company) {
                alert("Por favor, selecciona tu empresa.");
                companySelect.focus();
                return;
            }

            if (company === 'OTRA_EMPRESA_CUSTOM') {
                company = otherCompanyInput.value.trim().toUpperCase();
                if (!company) {
                    alert("Escribe el nombre de tu empresa.");
                    otherCompanyInput.focus();
                    return;
                }
                registerNewCompanyDynamic(company);
            }

            const lugar = lugarInput.value.trim().toUpperCase();
            if (!lugar) {
                alert("Por favor, ingresa el lugar de trabajo.");
                lugarInput.focus();
                return;
            }

            // Si llegamos hasta aquí, el usuario es normal y llenó todo bien
            localStorage.setItem('current_dni', dni);
            const devSettings = JSON.parse(localStorage.getItem('dev_settings')) || { localDbEnabled: true };
            let isNewUser = true;
            
            // Guardado Local
            if (devSettings.localDbEnabled) {
                isNewUser = loginUser(dni, company, lugar);
            } else {
                store.currentUserDni = dni;
            }

            // Envío a la nube (Google Forms + Firebase) solo si es primera vez
            if (isNewUser) {
                sendToGoogleForms(dni, company, lugar);
                await sendToFirebase(dni, company, lugar);
            }

            navigate('/bravometro');
        });
    };

    const destroy = () => {};

    return { render, afterRender, destroy };
};