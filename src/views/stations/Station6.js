/**
 * Módulo de Estación 6: Seguridad Vial (Laberinto de Pulso y Trivia de Señales)
 * Objetivo: Conducir un vehículo táctil sin salir de la vía. Si choca, responde una trivia con imágenes.
 */
import { updateProgress } from '../../core/store.js';
import { navigate } from '../../core/router.js';

// ==========================================================================
// PARÁMETROS CONFIGURABLES
// ==========================================================================
const CONFIG = {
    INVINCIBILITY_MS: 1500, // Tiempo de invulnerabilidad después de un choque (ms)
    STARS_THRESHOLDS: {
        FOUR_STARS: 1,   // 0 a 1 error/choque = 4 estrellas
        THREE_STARS: 3,  // 2 a 3 errores = 3 estrellas
        TWO_STARS: 5     // 4 a 5 errores = 2 estrellas
                         // 6+ errores = 1 estrella
    }
};

// ==========================================================================
// BANCO DE TRIVIAS VISUALES (Basado en infografía est6.jpg)
// ==========================================================================
const TRIVIA_DATA = [
    {
        id: 1,
        img: "src/images/est6/s-pare.jpg", // Asegúrate de tener estas imágenes recortadas
        question: "¿Qué tipo de señal es y qué obligación indica?",
        options: [
            { text: "Informativa - Parada de descanso", isCorrect: false },
            { text: "Reguladora - Obligación de detenerse completamente", isCorrect: true },
            { text: "Preventiva - Posible peligro adelante", isCorrect: false }
        ]
    },
    {
        id: 2,
        img: "src/images/est6/s-rocas.jpg",
        question: "¿A qué categoría pertenece esta señal amarilla?",
        options: [
            { text: "Preventiva - Advierte peligro de caída de rocas", isCorrect: true },
            { text: "Reguladora - Prohíbe el paso de rocas", isCorrect: false },
            { text: "Informativa - Zona de cantera", isCorrect: false }
        ]
    },
    {
        id: 3,
        img: "src/images/est6/s-retroceso.jpg",
        question: "¿Qué información brinda esta señal azul con un camión?",
        options: [
            { text: "Zona de lavado de equipos pesados", isCorrect: false },
            { text: "Obligación de estacionar en retroceso (Equipos Pesados)", isCorrect: true },
            { text: "Prohibido estacionar en esta área", isCorrect: false }
        ]
    },
    {
        id: 4,
        img: "src/images/est6/s-cinturon.jpg",
        question: "¿Qué nos indica esta señal roja y azul?",
        options: [
            { text: "Recomendación de usar cinturón", isCorrect: false },
            { text: "Reguladora - Uso obligatorio del cinturón de seguridad", isCorrect: true },
            { text: "Precaución: Asientos defectuosos", isCorrect: false }
        ]
    },
    {
        id: 5,
        img: "src/images/est6/s-distancia.jpg",
        question: "¿Cuál es la distancia mínima segura que indica esta señal para equipo pesado?",
        options: [
            { text: "20 metros", isCorrect: false },
            { text: "50 metros", isCorrect: true },
            { text: "100 metros", isCorrect: false }
        ]
    }
];

export const Station6 = () => {
    let mistakes = 0;
    let collisions = 0;
    let isDragging = false;
    let isInvincible = false;
    let currentQuestion = null;
    let initialX, initialY;

    // Obtener una pregunta aleatoria
    const getRandomQuestion = () => {
        return TRIVIA_DATA[Math.floor(Math.random() * TRIVIA_DATA.length)];
    };

    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container station-engine-view slide-in-right';
        container.id = 'station6Container';

        // Estilos en línea para elementos dinámicos
        const style = document.createElement('style');
        style.innerHTML = `
            .track-bg { background: repeating-linear-gradient(45deg, #1A0500, #1A0500 10px, #330A00 10px, #330A00 20px); border-radius: var(--border-radius-md); overflow: hidden; position: relative; border: 2px solid var(--color-danger); }
            .safe-road { background-color: #3B4252; position: absolute; border: 1px dashed rgba(255, 255, 255, 0.2); }
            .road-start { background-color: var(--color-success); display: flex; align-items: center; justify-content: center; font-weight: 900; color: #000; font-size: 10px; }
            .road-finish { background-color: var(--color-cyan-glow); display: flex; align-items: center; justify-content: center; font-weight: 900; color: #000; font-size: 10px; }
            .vehicle { width: 36px; height: 36px; background: var(--color-primary); border: 2px solid #FFF; border-radius: 50%; position: absolute; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); touch-action: none; cursor: grab; z-index: 10; }
            .blinking { animation: blinkAnim 0.3s infinite alternate; box-shadow: 0 0 15px var(--color-success); border-color: var(--color-success); }
            @keyframes blinkAnim { from { opacity: 1; } to { opacity: 0.3; } }
        `;
        fragment.appendChild(style);

        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>

            <div class="trivia-header pop-in" style="margin-bottom: 5px;">
                <h2 class="title-trivia">SEGURIDAD VIAL</h2>
                <p class="subtitle-trivia">Guía el vehículo sin salir de la vía. ¡Cuidado con chocar!</p>
            </div>

            <!-- Contenedor del Laberinto -->
            <div class="track-bg" id="trackContainer" style="flex: 1; width: 100%; margin-bottom: 10px;">
                
                <!-- Circuito de Carretera (Safe Zones) -->
                <!-- Tramos del laberinto dibujados con porcentajes para responsividad -->
                <div class="safe-road road-start" style="bottom: 5%; left: 5%; width: 25%; height: 20%;">INICIO</div>
                <div class="safe-road" style="bottom: 5%; left: 5%; width: 25%; height: 50%;"></div>
                <div class="safe-road" style="bottom: 35%; left: 5%; width: 90%; height: 20%;"></div>
                <div class="safe-road" style="top: 15%; right: 5%; width: 25%; height: 40%;"></div>
                <div class="safe-road" style="top: 15%; left: 15%; width: 85%; height: 20%;"></div>
                <div class="safe-road road-finish" id="finishLine" style="top: 15%; left: 5%; width: 25%; height: 20%;">META</div>

                <!-- Vehículo (Draggable) -->
                <div id="playerVehicle" class="vehicle" style="bottom: 8%; left: 8%;">🚜</div>
            </div>

            <!-- Modal de Trivia de Penalización -->
            <div id="penaltyModal" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 13, 82, 0.95); z-index: 100; display: none; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; backdrop-filter: blur(8px);">
                <div style="font-size: 35px; margin-bottom: 5px;">💥</div>
                <h3 style="color: var(--color-danger); font-weight: 900; font-size: 20px; margin-bottom: 10px; text-transform: uppercase;">¡Te saliste de la vía!</h3>
                <p style="color: #FFF; font-size: 13px; margin-bottom: 15px;">Responde la trivia vial para continuar:</p>
                
                <div class="active-step-card" style="background: rgba(0, 20, 80, 0.8);">
                    <!-- Imagen de la Señal de Tránsito -->
                    <img id="triviaImg" src="" alt="Señal de Tránsito" style="width: 100px; height: 100px; object-fit: contain; margin-bottom: 10px; border-radius: 8px; border: 2px solid var(--color-cyan-glow); background: #FFF;">
                    <p id="triviaQuestion" style="font-size: 14px; font-weight: bold; color: var(--color-primary);"></p>
                </div>

                <div id="triviaOptions" style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                    <!-- Opciones inyectadas por JS -->
                </div>
            </div>

            <!-- Pantalla Final (Oculta hasta ganar) -->
            <div id="victoryScreen" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 25, 90, 0.95); z-index: 100; display: none; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center;">
                <div style="font-size: 60px; margin-bottom: 10px;">🏆</div>
                <h3 style="color: var(--color-primary); font-weight: 900; font-size: 24px; margin-bottom: 10px;">¡RECORRIDO SEGURO!</h3>
                <p id="statsText" style="color: #FFF; font-size: 14px; margin-bottom: 25px;"></p>
                <button id="btnFinish" class="btn-primary pulse-btn btn-gold-glow" style="width: 100%;">FINALIZAR ESTACIÓN</button>
            </div>
        `;

        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const vehicle = document.getElementById('playerVehicle');
        const trackContainer = document.getElementById('trackContainer');
        const penaltyModal = document.getElementById('penaltyModal');
        const victoryScreen = document.getElementById('victoryScreen');
        const triviaImg = document.getElementById('triviaImg');
        const triviaQuestion = document.getElementById('triviaQuestion');
        const triviaOptions = document.getElementById('triviaOptions');
        
        // --- 1. LÓGICA DE LA TRIVIA DE PENALIZACIÓN ---
        const triggerPenalty = () => {
            isDragging = false;
            collisions++;
            currentQuestion = getRandomQuestion();
            
            // Llenar datos de la pregunta
            triviaImg.src = currentQuestion.img;
            triviaQuestion.innerText = currentQuestion.question;
            triviaOptions.innerHTML = currentQuestion.options.map((opt, index) => `
                <button class="btn-secondary option-btn" data-correct="${opt.isCorrect}" style="text-align: left; padding: 10px;">
                    ${opt.text}
                </button>
            `).join('');

            penaltyModal.style.display = 'flex';

            // Escuchar clics en las opciones
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const isCorrect = e.target.getAttribute('data-correct') === 'true';
                    
                    if (isCorrect) {
                        e.target.style.background = 'var(--color-success)';
                        e.target.style.color = '#000';
                    } else {
                        e.target.style.background = 'var(--color-danger)';
                        mistakes++; // Suma un error a la calificación final
                    }

                    // Esperar 1 segundo y cerrar el modal para reanudar
                    setTimeout(() => {
                        penaltyModal.style.display = 'none';
                        grantInvincibility();
                    }, 1000);
                });
            });
        };

        // --- 2. SISTEMA DE INVENCIBILIDAD (Para no chocar en bucle al salir del modal) ---
        const grantInvincibility = () => {
            isInvincible = true;
            vehicle.classList.add('blinking');
            
            setTimeout(() => {
                isInvincible = false;
                vehicle.classList.remove('blinking');
            }, CONFIG.INVINCIBILITY_MS);
        };

        // --- 3. LÓGICA DE CONTROL DEL VEHÍCULO Y COLISIONES ---
        vehicle.addEventListener('pointerdown', (e) => {
            if (penaltyModal.style.display === 'flex' || victoryScreen.style.display === 'flex') return;
            
            isDragging = true;
            const rect = vehicle.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
            
            vehicle.setPointerCapture(e.pointerId);
        });

        vehicle.addEventListener('pointermove', (e) => {
            if (!isDragging) return;

            // Mover el vehículo
            const containerRect = trackContainer.getBoundingClientRect();
            let newLeft = e.clientX - initialX - containerRect.left;
            let newTop = e.clientY - initialY - containerRect.top;

            vehicle.style.left = `${newLeft}px`;
            vehicle.style.top = `${newTop}px`;

            // SI ES INVENCIBLE, NO CALCULAMOS COLISIÓN
            if (isInvincible) return;

            // MAGIA DE COLISIÓN: Ocultamos el carro temporalmente, miramos qué hay debajo del dedo
            vehicle.style.display = 'none';
            const elementUnderFinger = document.elementFromPoint(e.clientX, e.clientY);
            vehicle.style.display = 'flex'; // Lo volvemos a mostrar instantáneamente

            if (elementUnderFinger) {
                // Si tocamos la META
                if (elementUnderFinger.classList.contains('road-finish') || elementUnderFinger.closest('.road-finish')) {
                    isDragging = false;
                    showVictory();
                    return;
                }

                // Si no tocamos la vía segura (salimos de la pista)
                if (!elementUnderFinger.classList.contains('safe-road') && !elementUnderFinger.closest('.safe-road')) {
                    triggerPenalty();
                }
            }
        });

        vehicle.addEventListener('pointerup', (e) => {
            isDragging = false;
            vehicle.releasePointerCapture(e.pointerId);
        });

        // --- 4. FIN DEL JUEGO Y CÁLCULO DE ESTRELLAS ---
        const showVictory = () => {
            const totalErrors = collisions + mistakes;
            document.getElementById('statsText').innerHTML = `Choques: <b>${collisions}</b> <br> Errores en trivia: <b>${mistakes}</b>`;
            victoryScreen.style.display = 'flex';
        };

        document.getElementById('btnFinish').addEventListener('click', () => {
            const totalErrors = collisions + mistakes;
            let stars = 1;

            if (totalErrors <= CONFIG.STARS_THRESHOLDS.FOUR_STARS) stars = 4;
            else if (totalErrors <= CONFIG.STARS_THRESHOLDS.THREE_STARS) stars = 3;
            else if (totalErrors <= CONFIG.STARS_THRESHOLDS.TWO_STARS) stars = 2;

            updateProgress(6, stars);
            navigate('/estrellas');
        });
    };

    return { render, afterRender };
};