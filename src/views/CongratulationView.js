import { store } from '../core/store.js';
import { navigate } from '../core/router.js';

export const CongratulationView = () => {
    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container congratulation-view slide-in-bottom';

        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>
            
            <!-- Confeti de CSS (reutilizamos las partículas) -->
            <div id="floatingParticles" class="floating-particles-layer"></div>

            <div class="card-glass congratulation-card">
                <div class="trophy-icon">🏆</div>
                <h1 class="title-bravometro" style="color: var(--color-primary); margin-bottom: 10px;">¡FELICIDADES!</h1>
                <p class="subtitle-bravometro" style="font-size: 16px;">Eres un verdadero Maestro de la Seguridad.</p>
                <p style="text-align: center; font-size: 13px; margin-bottom: 20px; color: var(--color-text-muted);">
                    Has conseguido los 48 puntos. Ingresa tu alias para generar tu insignia oficial.
                </p>
                
                <form id="aliasForm" class="form-container">
                    <input 
                        type="text" 
                        id="userAlias" 
                        class="input-field" 
                        placeholder="TU NOMBRE/ALIAS (MÁX 15)" 
                        maxlength="15" 
                        required 
                        autocomplete="off"
                        style="font-size: 18px; text-transform: uppercase;">
                    
                    <div style="text-align: right; font-size: 11px; color: var(--color-text-muted); margin-top: -10px;">
                        <span id="charCount">0</span>/15
                    </div>

                    <button type="submit" class="btn-primary pulse-btn" style="margin-top: 10px;">
                        OBTENER PREMIO
                    </button>
                </form>
            </div>
        `;
        fragment.appendChild(container);
        return fragment;
    };

    const generateGoldParticles = () => {
        const layer = document.getElementById('floatingParticles');
        if (!layer) return;
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.backgroundColor = '#FFD700'; // Dorado
            particle.style.boxShadow = '0 0 8px #FFD700';
            const size = Math.random() * 8 + 3; 
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 4 + 2}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            layer.appendChild(particle);
        }
    };

    const afterRender = () => {
        generateGoldParticles();

        const inputAlias = document.getElementById('userAlias');
        const charCount = document.getElementById('charCount');
        const form = document.getElementById('aliasForm');

        // Contador de caracteres en tiempo real
        inputAlias.addEventListener('input', (e) => {
            // Forzar mayúsculas
            e.target.value = e.target.value.toUpperCase();
            charCount.innerText = e.target.value.length;
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const alias = inputAlias.value.trim();
            if (alias.length > 0 && alias.length <= 15) {
                // Guardamos el alias en el estado temporal para usarlo en el canvas
                store.userAlias = alias;
                navigate('/premio');
            }
        });
    };

    const destroy = () => {};

    return { render, afterRender, destroy };
};