/**
 * Módulo de Estación 2: Fatiga y Somnolencia (Simulador con Sprites)
 */
import { updateProgress } from '../../core/store.js';
import { navigate } from '../../core/router.js';

// ==========================================================================
// PARÁMETROS CONFIGURABLES
// ==========================================================================
const CONFIG = {
    TOTAL_TIME_SEC: 30.0,       // Tiempo de juego en segundos
    INITIAL_ENERGY: 100.0,      // Energía inicial (100%)
    DECAY_RATE_PER_SEC: 35.0,   // Pérdida automática de alerta por segundo
    TAP_BOOST: 6.0,             // Alerta sumada por cada tap/click en la imagen
    TICK_INTERVAL_MS: 50,       // Intervalo de actualización de física (ms)
};

export const Station2 = () => {
    let energy = CONFIG.INITIAL_ENERGY;
    let timeRemaining = CONFIG.TOTAL_TIME_SEC;
    let gameState = 'IDLE'; // 'IDLE' | 'PLAYING' | 'FINISHED'
    let gameLoopTimer = null;
    let clockTimer = null;

    // Mapeo de Sprites en la subcarpeta src/images/est2/
    const getSpriteForEnergy = (pct) => {
        if (pct >= 90) return 'src/images/est2/ssf01.jpg';
        if (pct >= 80) return 'src/images/est2/ssf02.jpg';
        if (pct >= 70) return 'src/images/est2/ssf03.jpg';
        if (pct >= 60) return 'src/images/est2/ssf04.jpg';
        if (pct >= 50) return 'src/images/est2/ssf05.jpg';
        if (pct >= 40) return 'src/images/est2/ssf06.jpg';
        if (pct >= 30) return 'src/images/est2/ssf07.jpg';
        if (pct >= 10) return 'src/images/est2/ssf08.jpg';
        return 'src/images/est2/ssf09.jpg';
    };

    const getStatusInfo = (pct) => {
        if (pct <= 0) {
            return { text: '¡TE QUEDASTE DORMIDO! ¡TAPEA PARA DESPERTARLO!', color: 'var(--color-danger)' };
        }
        if (pct < 30) {
            return { text: '¡EL CONDUCTOR SE DUERME!', color: 'var(--color-danger)' };
        }
        if (pct < 60) {
            return { text: '¡COMBATIENDO LA SOMNOLENCIA!', color: 'var(--color-primary)' };
        }
        if (pct < 85) {
            return { text: '¡MANTÉN LA ATENCIÓN!', color: 'var(--color-cyan-glow)' };
        }
        return { text: '¡ALERTA MÁXIMA!', color: 'var(--color-success)' };
    };

    const calculateStars = (finalEnergy) => {
        if (finalEnergy >= 76) return 4;
        if (finalEnergy >= 51) return 3;
        if (finalEnergy >= 26) return 2;
        if (finalEnergy > 0) return 1;
        return 0;
    };

    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container station-engine-view slide-in-right';
        container.id = 'station2Container';

        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>

            <div class="trivia-header pop-in">
                <h2 class="title-trivia">ESTACIÓN 2</h2>
                <p class="subtitle-trivia">Fatiga y Somnolencia</p>
            </div>

            <div class="card-glass" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; align-items: center; text-align: center; margin-bottom: 10px; padding: 15px;">
                
                <!-- Encabezado con Temporizador -->
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; background: rgba(0, 25, 90, 0.6); padding: 8px 14px; border-radius: var(--border-radius-md); border: 1.5px solid var(--color-cyan-glow);">
                    <span style="font-weight: 800; font-size: 13px; color: var(--color-cyan-glow); letter-spacing: 0.5px;">NIVEL DE ALERTA</span>
                    <span id="timerDisplay" style="font-weight: 900; font-size: 18px; color: var(--color-primary);">⏱️ ${timeRemaining}s </span>
                </div>

                <!-- Marco de Cámara del Conductor -->
                <div id="driverFrame" style="position: relative; width: 100%; max-width: 320px; aspect-ratio: 4/3; border-radius: 12px; overflow: hidden; border: 2px solid var(--color-cyan-glow); box-shadow: 0 0 20px rgba(0, 210, 255, 0.4); cursor: pointer; user-select: none; touch-action: manipulation; margin: 10px 0;">
                    
                    <img id="driverSprite" src="src/images/est2/ssf01.jpg" alt="Conductor" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    
                    <!-- Simulación de interfaz REC de cámara -->
                    <div style="position: absolute; top: 10px; left: 12px; font-size: 11px; font-weight: 900; color: #FF2A55; text-shadow: 0 0 4px #000; pointer-events: none; display: flex; align-items: center; gap: 4px;">
                        <span style="width: 8px; height: 8px; background: #FF2A55; border-radius: 50%; display: inline-block; animation: pulseGlow 1s infinite;"></span> REC
                    </div>
                    <div style="position: absolute; top: 10px; right: 12px; font-size: 11px; font-weight: 700; color: #FFF; text-shadow: 0 0 4px #000; pointer-events: none;">
                        00:53:43 🔋
                    </div>
                    
                    <!-- Esquinas de visor -->
                    <div style="position: absolute; bottom: 8px; left: 8px; width: 14px; height: 14px; border-left: 2px solid #FFF; border-bottom: 2px solid #FFF; pointer-events: none;"></div>
                    <div style="position: absolute; bottom: 8px; right: 8px; width: 14px; height: 14px; border-right: 2px solid #FFF; border-bottom: 2px solid #FFF; pointer-events: none;"></div>
                </div>

                <!-- Estado del Conductor -->
                <div id="statusMessage" style="font-size: 14px; font-weight: 900; color: var(--color-text-light); min-height: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
                    TOCA LA IMAGEN PARA MANTENER DESPIERTO AL CONDUCTOR
                </div>

                <!-- Barra de Alerta -->
                <div style="width: 100%; margin: 8px 0;">
                    <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; margin-bottom: 4px;">
                        <span>SOMNOLIENTO</span>
                        <span id="energyPercentage" style="color: var(--color-primary); font-size: 13px;">100%</span>
                        <span>DESPIERTO</span>
                    </div>
                    <div style="width: 100%; height: 20px; background: rgba(0, 15, 65, 0.9); border-radius: 12px; border: 1.5px solid var(--color-cyan-subtle); overflow: hidden; position: relative;">
                        <div id="energyFill" style="width: 100%; height: 100%; background: linear-gradient(90deg, #FF2A55 0%, #FFB81C 50%, #00E676 100%); transition: width 0.08s linear; border-radius: 10px;"></div>
                    </div>
                </div>

                <!-- Botón Principal -->
                <button id="actionBtn" class="btn-primary pulse-btn" style="width: 100%; padding: 16px; font-size: 17px; font-weight: 900; letter-spacing: 1px; touch-action: manipulation;">
                    ¡INICIAR RETO!
                </button>
            </div>
        `;

        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const actionBtn = document.getElementById('actionBtn');
        const driverFrame = document.getElementById('driverFrame');
        const driverSprite = document.getElementById('driverSprite');
        const timerDisplay = document.getElementById('timerDisplay');
        const energyFill = document.getElementById('energyFill');
        const energyPercentage = document.getElementById('energyPercentage');
        const statusMessage = document.getElementById('statusMessage');

        const updateUI = () => {
            const roundedEnergy = Math.max(0, Math.min(100, Math.round(energy)));
            
            energyFill.style.width = `${roundedEnergy}%`;
            energyPercentage.innerText = `${roundedEnergy}%`;

            const newSprite = getSpriteForEnergy(roundedEnergy);
            if (driverSprite.getAttribute('src') !== newSprite) {
                driverSprite.setAttribute('src', newSprite);
            }

            if (gameState === 'PLAYING') {
                const info = getStatusInfo(roundedEnergy);
                statusMessage.innerText = info.text;
                statusMessage.style.color = info.color;
            }
        };

        const finishGame = () => {
            gameState = 'FINISHED';
            clearInterval(gameLoopTimer);
            clearInterval(clockTimer);

            const finalEnergy = Math.max(0, energy);
            timerDisplay.innerText = '⏱️ 0.0s';
            updateUI();

            // if (finalEnergy <= 0) {
            //     statusMessage.innerText = 'TE QUEDASTE DORMIDO';
            //     statusMessage.style.color = 'var(--color-danger)';
            // } else {
            //     statusMessage.innerText = '¡RETO COMPLETADO!';
            //     statusMessage.style.color = 'var(--color-success)';
            // }

            // Exclusivamente el botón pasa a habilitar la transición a estrellas
            actionBtn.disabled = false;
            actionBtn.className = 'btn-primary pulse-btn btn-gold-glow';
            actionBtn.innerText = 'CONTINUAR';
            actionBtn.style.background = 'linear-gradient(180deg, #FFD000 0%, #E59400 100%)';
            actionBtn.style.color = '#000C38';
        };

        const startGame = () => {
            gameState = 'PLAYING';
            
            actionBtn.innerText = '¡TOCA EN EL CONDUCTOR!';
            actionBtn.style.background = 'linear-gradient(180deg, #00D2FF 0%, #0072FF 100%)';
            actionBtn.style.color = '#FFFFFF';
            actionBtn.disabled = true;

            const startTime = Date.now();
            const durationMs = CONFIG.TOTAL_TIME_SEC * 1000;

            clockTimer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                timeRemaining = Math.max(0, (durationMs - elapsed) / 1000);
                timerDisplay.innerText = `⏱️ ${timeRemaining.toFixed(1)}s`;

                if (timeRemaining <= 0) {
                    finishGame();
                }
            }, 100);

            const decayPerTick = (CONFIG.DECAY_RATE_PER_SEC * CONFIG.TICK_INTERVAL_MS) / 1000;
            
            gameLoopTimer = setInterval(() => {
                if (gameState !== 'PLAYING') return;

                if (energy > 0) {
                    energy = Math.max(0, energy - decayPerTick);
                    updateUI();
                }
            }, CONFIG.TICK_INTERVAL_MS);
        };

        // Evento exclusivo para el Botón Principal (Iniciar -> Continuar)
        actionBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (gameState === 'IDLE') {
                startGame();
            } else if (gameState === 'FINISHED') {
                const finalEnergy = Math.max(0, energy);
                const stars = calculateStars(finalEnergy);
                updateProgress(2, stars);
                navigate('/estrellas');
            }
        });

        // Evento en la Imagen del Conductor para mantenerlo o despertarlo
        driverFrame.addEventListener('pointerdown', (e) => {
            e.preventDefault();

            if (gameState !== 'PLAYING') return;

            // Incrementa energía incluso si está en 0%
            energy = Math.min(100, energy + CONFIG.TAP_BOOST);
            updateUI();
        });
    };

    return { render, afterRender };
};