/**
 * Módulo de Estaciones 7-13: Descifra la Frase (Minijuego Hipercasual)
 * Objetivo: Completar las palabras faltantes en la frase secreta.
 * Mecánica: 
 * - El jugador inicia con 4 estrellas.
 * - Pierde 1 estrella por cada intento fallido al verificar (mínimo 1 estrella).
 * - "Juice Game": Inputs vibran al fallar, cambian de color, panel de reflexión final animado.
 */
import { store, updateProgress } from '../../core/store.js';
import { navigate } from '../../core/router.js';

export const StationPhrase = (stationId) => {
    // 1. Base de datos de frases para las estaciones 7 a la 13
    const PHRASES_DATA = {
        7: {
            title: "CONTROLES DE INGENIERÍA Y AUTONOMÍA",
            template: "LA () CONTROLA EL (), TU () PROTEGE LA ().",
            answers: ["INGENIERÍA", "RIESGO", "AUTONOMÍA", "VIDA"],
            reflection: "LA INGENIERÍA CONTROLA EL RIESGO, TU AUTONOMÍA PROTEGE LA VIDA."
        },
        8: {
            title: "GESTIÓN DE RIESGOS Y CONTROLES CRÍTICOS",
            template: "() EL (), APLICA LOS () () Y PROTEGE TU ().",
            answers: ["IDENTIFICA", "RIESGO", "CONTROLES", "CRÍTICOS", "VIDA"],
            reflection: "IDENTIFICA EL RIESGO, APLICA LOS CONTROLES CRÍTICOS Y PROTEGE TU VIDA."
        },
        9: {
            title: "MEDIDAS DE SEGURIDAD EN TRABAJOS EN ALTURA",
            template: "EN LAS (), CADA () CUENTA Y CADA () IMPORTA.",
            answers: ["ALTURAS", "CONTROL", "VIDA"],
            reflection: "EN LAS ALTURAS, CADA CONTROL CUENTA Y CADA VIDA IMPORTA."
        },
        10: {
            title: "EXPOSICIÓN A EQUIPOS EN MOVIMIENTO",
            template: "LAS () NO DISTINGUEN EL (), TÚ SÍ PUEDES ().",
            answers: ["MÁQUINAS", "PELIGRO", "PREVENIRLO"],
            reflection: "LAS MÁQUINAS NO DISTINGUEN EL PELIGRO, TÚ SÍ PUEDES PREVENIRLO."
        },
        11: {
            title: "IZAJE SEGURO",
            template: "BAJO UNA () (), TU () ESTÁ EN (). ¡MANTÉN TU ()!",
            answers: ["CARGA", "SUSPENDIDA", "VIDA", "PELIGRO", "DISTANCIA"],
            reflection: "BAJO UNA CARGA SUSPENDIDA, TU VIDA ESTÁ EN PELIGRO. ¡MANTÉN TU DISTANCIA!"
        },
        12: {
            title: "USO CORRECTO DE HERRAMIENTAS",
            template: "LA () () EN () SEGURAS PREVIENE () Y PROTEGE ().",
            answers: ["HERRAMIENTA", "CORRECTA", "MANOS", "ACCIDENTES", "VIDAS"],
            reflection: "LA HERRAMIENTA CORRECTA EN MANOS SEGURAS PREVIENE ACCIDENTES Y PROTEGE VIDAS."
        },
        13: {
            title: "IPERC",
            template: "IDENTIFICA EL (), EVALÚA EL () Y APLICA LOS () PARA PROTEGER TU ().",
            answers: ["PELIGRO", "RIESGO", "CONTROLES", "VIDA"],
            reflection: "IDENTIFICA EL PELIGRO, EVALÚA EL RIESGO Y APLICA LOS CONTROLES PARA PROTEGER TU VIDA."
        }
    };

    const stationData = PHRASES_DATA[stationId];
    let currentStars = 4; // Iniciamos con máximo de estrellas

    // Generar el HTML de la frase reemplazando los "()" por campos <input> dinámicos
    const generatePhraseHTML = () => {
        const parts = stationData.template.split('()');
        let html = '';
        
        parts.forEach((part, index) => {
            html += `<span class="phrase-text">${part}</span>`;
            // Si no es la última parte, insertamos un input
            if (index < stationData.answers.length) {
                // Hacemos el ancho del input dinámico según el tamaño de la respuesta esperada
                const widthCh = stationData.answers[index].length + 1;
                html += `<input type="text" class="word-input" data-index="${index}" maxlength="${widthCh + 2}" style="width: ${widthCh}ch;" autocomplete="off" autocorrect="off" spellcheck="false" />`;
            }
        });
        
        return html;
    };

    // Helper: Normalizar texto (Quitar tildes y convertir a mayúsculas para comparar sin errores)
    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();
    };

    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container station-engine-view slide-in-right';
        
        // CSS inyectado para el Juice Game de esta vista
        const style = document.createElement('style');
        style.innerHTML = `
            .game-container { padding: 20px; text-align: center; }
            .stars-tracker { display: flex; justify-content: center; gap: 8px; margin-bottom: 20px; }
            .star-tracker-icon { width: 30px; height: 30px; color: var(--color-primary); filter: drop-shadow(0 0 8px rgba(255,184,28,0.8)); transition: all 0.4s ease; }
            .star-tracker-icon.lost { color: rgba(255, 255, 255, 0.1); filter: none; transform: scale(0.5); }
            
            .phrase-board {
                background: var(--color-bg-card);
                border: 2px solid var(--color-cyan-subtle);
                border-radius: var(--border-radius-md);
                padding: 20px;
                line-height: 2.2;
                font-size: 16px;
                font-weight: 800;
                color: var(--color-text-light);
                box-shadow: 0 10px 30px rgba(0, 10, 60, 0.6);
                text-align: center;
                margin-bottom: 20px;
            }
            .phrase-text { vertical-align: middle; }
            
            /* Inputs estilo hipercasual */
            .word-input {
                background: rgba(0, 0, 0, 0.4);
                border: none;
                border-bottom: 3px solid var(--color-cyan-glow);
                color: var(--color-primary);
                font-weight: 900;
                font-size: 16px;
                text-align: center;
                text-transform: uppercase;
                margin: 0 5px;
                padding: 2px 5px;
                border-radius: 4px 4px 0 0;
                outline: none;
                transition: all 0.2s ease;
                vertical-align: middle;
                box-shadow: inset 0 -10px 10px -10px rgba(0,210,255,0.4);
            }
            .word-input:focus {
                background: rgba(0, 210, 255, 0.1);
                border-bottom: 3px solid var(--color-primary);
                transform: scale(1.05);
            }
            .word-input.error {
                border-bottom: 3px solid var(--color-danger);
                color: var(--color-danger);
                background: rgba(255, 42, 85, 0.1);
            }
            .word-input.success {
                border-bottom: 3px solid var(--color-success);
                color: var(--color-success);
                pointer-events: none;
            }

            /* Pantalla de Reflexión (Oculta al inicio) */
            .reflection-overlay {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0, 13, 82, 0.95);
                z-index: 100;
                display: none;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 25px;
                text-align: center;
                backdrop-filter: blur(10px);
            }
            .reflection-box-game {
                background: var(--color-bg-card-solid);
                border: 2px solid var(--color-primary);
                border-radius: var(--border-radius-lg);
                padding: 30px 20px;
                box-shadow: 0 0 30px rgba(255, 184, 28, 0.3);
            }
        `;
        fragment.appendChild(style);
        
        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>
            
            <div class="trivia-header pop-in">
                <h2 class="title-trivia" style="font-size: 20px;">ESTACIÓN ${stationId}</h2>
                <p class="subtitle-trivia" style="color: var(--color-cyan-glow);">${stationData.title}</p>
            </div>

            <div class="game-container pop-in" style="animation-delay: 0.1s;">
                <!-- Tracker de Estrellas -->
                <div class="stars-tracker" id="starsTracker">
                    ${[1,2,3,4].map(i => `
                        <svg id="star-${i}" viewBox="0 0 24 24" class="star-tracker-icon">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                        </svg>
                    `).join('')}
                </div>

                <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 15px;">
                    ¡Descifra la frase oculta! Escribe las palabras faltantes. Pierdes 1 estrella por cada intento incorrecto.
                </p>

                <!-- Pizarra de la Frase -->
                <div class="phrase-board">
                    ${generatePhraseHTML()}
                </div>

                <button id="btnVerify" class="btn-primary pulse-btn" style="width: 100%; margin-bottom: 10px;">VERIFICAR</button>
                <button type="button" id="btnBackToStations" class="btn-secondary">VOLVER</button>
            </div>

            <!-- Pantalla de Reflexión (Éxito) -->
            <div id="reflectionOverlay" class="reflection-overlay">
                <div style="font-size: 60px; margin-bottom: 15px; animation: bounceInTop 0.8s;">💡</div>
                <div class="reflection-box-game elastic-pop" style="animation-delay: 0.3s;">
                    <h3 style="color: var(--color-cyan-glow); font-size: 18px; margin-bottom: 15px; font-weight: 900;">¡FRASE DESCUBIERTA!</h3>
                    <p style="color: #FFF; font-size: 18px; font-weight: 700; line-height: 1.5; font-style: italic;">
                        "${stationData.reflection}"
                    </p>
                </div>
                <button id="btnContinue" class="btn-primary pulse-btn" style="width: 100%; margin-top: 30px; animation: slideInBottom 0.5s forwards 0.8s; opacity: 0;">
                    CONTINUAR
                </button>
            </div>
        `;
        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const btnVerify = document.getElementById('btnVerify');
        const btnBack = document.getElementById('btnBackToStations');
        const btnContinue = document.getElementById('btnContinue');
        const reflectionOverlay = document.getElementById('reflectionOverlay');
        const inputs = document.querySelectorAll('.word-input');

        // Formateo visual mientras escribe (todo a mayúsculas)
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
                e.target.classList.remove('error'); // Quitar color rojo al reescribir
            });
        });

        // Botón Volver
        btnBack.addEventListener('click', () => {
            navigate('/estaciones');
        });

        // Botón Verificar
        btnVerify.addEventListener('click', () => {
            let allCorrect = true;

            inputs.forEach(input => {
                const idx = parseInt(input.getAttribute('data-index'));
                const userAnswer = normalizeText(input.value);
                const correctAnswer = normalizeText(stationData.answers[idx]);

                if (userAnswer === correctAnswer) {
                    input.classList.remove('error');
                    input.classList.add('success');
                } else {
                    allCorrect = false;
                    input.classList.add('error');
                    // Juice: Efecto shake solo en los equivocados
                    input.classList.remove('shake');
                    void input.offsetWidth; // Trigger reflow para reiniciar animación
                    input.classList.add('shake');
                }
            });

            if (allCorrect) {
                // JUICE: Mostrar pantalla de reflexión con retraso para asimilar el éxito
                setTimeout(() => {
                    reflectionOverlay.style.display = 'flex';
                }, 400);
            } else {
                // Falló el intento, penalizar 1 estrella si es posible (Mínimo 1)
                if (currentStars > 1) {
                    const starToLose = document.getElementById(`star-${currentStars}`);
                    if(starToLose) {
                        starToLose.classList.add('lost');
                        currentStars--;
                    }
                }
            }
        });

        // Botón Continuar (Guardar progreso y navegar a estrellas)
        btnContinue.addEventListener('click', () => {
            updateProgress(stationId, currentStars);
            navigate('/estrellas');
        });
    };

    return { render, afterRender };
};