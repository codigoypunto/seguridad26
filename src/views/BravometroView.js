/**
 * Vista 2: Pantalla de Termómetro / Bravómetro
 */
import { store } from '../core/store.js';
import { navigate } from '../core/router.js';

export const BravometroView = () => {
    // Configuración de niveles según el diseño oficial
    const levelData = [
        {
            maxScore: 15,
            name: "APRENDIZ",
            color: "var(--color-danger)",
            description: "Estás iniciando tu camino como un Brav@ de la seguridad.",
            skills: [
                { title: "Observador en formación", text: "Empiezas a identificar riesgos." },
                { title: "Comunicador en crecimiento", text: "Aún te queda practicar." },
                { title: "Protector en desarrollo", text: "Cuida de ti y de tu equipo." },
                { title: "Toma decisiones básicas", text: "Vas por buen camino." }
            ]
        },
        {
            maxScore: 31,
            name: "EXPERTO",
            color: "var(--color-primary)",
            description: "Br@vo, tienes experiencia y aplicas la seguridad cada día.",
            skills: [
                { title: "Observador Atento", text: "Detectas riesgos y previenes." },
                { title: "Comunicador efectivo", text: "Reportas y alertas a tiempo." },
                { title: "Protector del Equipo", text: "Promueves el cuidado." },
                { title: "Toma decisiones", text: "Actúas con criterio." }
            ]
        },
        {
            maxScore: 48,
            name: "MAESTRO",
            color: "var(--color-success)",
            description: "Eres Br@vo de la Seguridad, líder y referente.",
            skills: [
                { title: "Observador Estratégico", text: "Anticipas y eliminas riesgos." },
                { title: "Comunicador Líder", text: "Inspiras y generas Compromiso." },
                { title: "Protector Vidas", text: "Velas por la seguridad de todos." },
                { title: "Toma decisiones críticas", text: "Siempre eliges lo más seguro." }
            ]
        }
    ];

    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container bravometro-view slide-in-bottom';

        // Obtener datos del store de forma segura
        const puntaje = store.userData ? store.userData.puntaje : 0;
        const dni = store.currentUserDni || "Invitado";
        
        // Determinar Nivel actual
        let currentLevel = levelData[0];
        if (puntaje > 15 && puntaje <= 31) currentLevel = levelData[1];
        if (puntaje > 31) currentLevel = levelData[2];

        // Calcular Porcentaje (Máx 48 puntos)
        const targetPercentage = Math.min(Math.round((puntaje / 48) * 100), 100);

        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>
            
            <div class="bravometro-header bounce-in-top">
                <h1 class="title-bravometro">BRAVÓMETRO</h1>
                <p class="subtitle-bravometro">¿Qué tan Brav@ eres en seguridad?</p>
            </div>
            
            <main class="bravometro-layout">
                <!-- Termómetro (CSS Puro) -->
                <div class="thermo-container pop-in">
                    <div class="thermo-track">
                        <!-- Máscara que desciende para revelar el degradado -->
                        <div class="thermo-mask" id="thermoMask"></div>
                    </div>
                </div>

                <!-- Tarjeta de Información y Niveles -->
                <div class="info-panel slide-in-right">
                    <div class="percentage-display" style="color: ${currentLevel.color}">
                        <span id="percText">0</span>%
                    </div>
                    
                    <div class="level-card" style="border-color: ${currentLevel.color}; box-shadow: 0 4px 15px ${currentLevel.color}40">
                        <div class="level-badge" style="background-color: ${currentLevel.color}">
                            ${currentLevel.name}
                        </div>
                        <p class="level-desc">${currentLevel.description}</p>
                        
                        <ul class="skills-list">
                            ${currentLevel.skills.map(skill => `
                                <li>
                                    <div class="skill-icon" style="color: ${currentLevel.color}">✓</div>
                                    <div class="skill-text">
                                        <strong>${skill.title}</strong>
                                        <span>${skill.text}</span>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </main>
            
            <footer class="bravometro-footer slide-in-bottom-delayed">
                <div class="user-stats">
                    <div class="user-info">
                        <span class="user-dot"></span>
                        <span class="user-dni">Usuario: ${dni.substring(0, 6)}...</span>
                    </div>
                    <div class="user-score" style="color: var(--color-primary)">
                        ${puntaje} pts
                    </div>
                </div>
                <button id="btnContinue" class="btn-primary pulse-btn">CONTINUAR</button>
            </footer>
        `;
        
        fragment.appendChild(container);
        
        // Guardamos los valores calculados en dataset para el afterRender
        container.dataset.targetPercentage = targetPercentage;
        container.dataset.puntaje = puntaje;
        
        return fragment;
    };

    const afterRender = () => {
        const view = document.querySelector('.bravometro-view');
        if (!view) return;

        const targetPercentage = parseInt(view.dataset.targetPercentage);
        const puntaje = parseInt(view.dataset.puntaje);
        const thermoMask = document.getElementById('thermoMask');
        const percText = document.getElementById('percText');
        const btnContinue = document.getElementById('btnContinue');

        // Si el usuario completó los 48 puntos, transformamos el botón en "RECLAMAR PREMIO"
        if (puntaje >= 48) {
            btnContinue.innerText = "RECLAMAR PREMIO";
            btnContinue.classList.add('btn-gold-glow');
        }

        // Animación fluida de llenado del termómetro y contador numérico (Game Juice)
        setTimeout(() => {
            thermoMask.style.height = `${100 - targetPercentage}%`;

            let startTime = performance.now();
            const duration = 1500; // 1.5 segundos

            const animateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Efecto ease-out quad
                const easeOut = progress * (2 - progress); 
                const currentVal = Math.floor(easeOut * targetPercentage);
                
                percText.innerText = currentVal;

                if (progress < 1) {
                    requestAnimationFrame(animateCount);
                } else {
                    percText.innerText = targetPercentage;
                    percText.classList.add('pulse-once');
                }
            };
            requestAnimationFrame(animateCount);
            
        }, 300);

        // Lógica de navegación del botón
        btnContinue.addEventListener('click', () => {
            if (puntaje >= 48) {
                navigate('/felicidades');
            } else {
                navigate('/estaciones');
            }
        });
    };

    const destroy = () => {};

    return { render, afterRender, destroy };
};