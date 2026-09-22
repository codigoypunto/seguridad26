/**
 * Módulo de Estación 2: Fatiga y Somnolencia (Minijuego Clicker/Tapping)
 */
import { store, updateProgress } from '../../core/store.js';
import { navigate } from '../../core/router.js';

export const Station2 = () => {
    let timer = null;
    let energy = 0;
    let isGameActive = false;
    let isFinished = false;

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
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; background: rgba(0, 25, 90, 0.6); padding: 8px 12px; border-radius: var(--border-radius-md); border: 1.5px solid var(--color-cyan-glow);">
                    <span style="font-weight: 800; font-size: 13px; color: var(--color-cyan-glow);">NIVEL DE ALERTA</span>
                    <span id="timerDisplay" style="font-weight: 900; font-size: 18px; color: var(--color-primary);">⏱️ 10.0s</span>
                </div>

                <!-- Avatar / Estado del Operador -->
                <div id="operatorAvatar" style="font-size: 65px; margin: 10px 0; transition: transform 0.08s ease; filter: drop-shadow(0 0 15px rgba(0, 210, 255, 0.4)); user-select: none;">
                    😴
                </div>

                <div id="statusMessage" style="font-size: 14px; font-weight: bold; color: var(--color-text-muted); min-height: 20px;">
                    ¡Presiona "INICIAR" y tapea rápidamente!
                </div>

                <!-- Barra de Energía / Alerta -->
                <div style="width: 100%; margin: 10px 0;">
                    <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; margin-bottom: 4px;">
                        <span>SOMNOLIENTO</span>
                        <span id="energyPercentage" style="color: var(--color-cyan-glow);">0%</span>
                        <span>DESPIERTO</span>
                    </div>
                    <div style="width: 100%; height: 22px; background: rgba(0, 15, 65, 0.9); border-radius: 12px; border: 1.5px solid var(--color-cyan-subtle); overflow: hidden; position: relative;">
                        <div id="energyFill" style="width: 0%; height: 100%; background: linear-gradient(90deg, #FF2A55 0%, #FFB81C 50%, #00E676 100%); transition: width 0.1s ease; border-radius: 10px;"></div>
                    </div>
                </div>

                <!-- Zona de Tap / Botón Principal -->
                <button id="tapBtn" class="btn-primary pulse-btn" style="width: 100%; padding: 18px; font-size: 18px; font-weight: 900; letter-spacing: 1px;">
                    ¡INICIAR RETO!
                </button>
                
                <button id="btnBackToStations" class="btn-secondary" style="margin-top: 8px;">
                    VOLVER A ESTACIONES
                </button>
            </div>
        `;

        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const tapBtn = document.getElementById('tapBtn');
        const timerDisplay = document.getElementById('timerDisplay');
        const energyFill = document.getElementById('energyFill');
        const energyPercentage = document.getElementById('energyPercentage');
        const operatorAvatar = document.getElementById('operatorAvatar');
        const statusMessage = document.getElementById('statusMessage');
        const btnBack = document.getElementById('btnBackToStations');

        // Evento salir
        btnBack.addEventListener('click', () => {
            if (timer) clearInterval(timer);
            navigate('/estaciones');
        });

        // Actualización de estado y expresiones del operador
        const updateVisuals = () => {
            energyFill.style.width = `${energy}%`;
            energyPercentage.innerText = `${Math.round(energy)}%`;

            if (energy < 26) {
                operatorAvatar.innerText = "😴";
                statusMessage.innerText = "¡El operador se dormirá!";
                statusMessage.style.color = "var(--color-danger)";
            } else if (energy < 51) {
                operatorAvatar.innerText = "🥱";
                statusMessage.innerText = "¡Combatiendo la somnolencia!";
                statusMessage.style.color = "var(--color-primary)";
            } else if (energy < 76) {
                operatorAvatar.innerText = "😐";
                statusMessage.innerText = "¡Nivel de atención subiendo!";
                statusMessage.style.color = "var(--color-cyan-glow)";
            } else {
                operatorAvatar.innerText = "😳⚡";
                statusMessage.innerText = "¡ALERTA MÁXIMA ALCANZADA!";
                statusMessage.style.color = "var(--color-success)";
            }
        };

        // Finalizar minijuego y procesar puntuación
        const finishGame = () => {
            isGameActive = false;
            isFinished = true;
            clearInterval(timer);

            tapBtn.disabled = true;
            tapBtn.className = "btn-disabled";
            tapBtn.innerText = "¡TIEMPO AGOTADO!";

            // Cálculo de estrellas
            let stars = 1;
            if (energy >= 76) stars = 4;
            else if (energy >= 51) stars = 3;
            else if (energy >= 26) stars = 2;

            updateProgress(2, stars);

            setTimeout(() => {
                navigate('/estrellas');
            }, 1000);
        };

        // Iniciar el temporizador de 10 segundos
        const startGame = () => {
            isGameActive = true;
            tapBtn.innerText = "¡TAPEA AQUÍ RÁPIDO! ⚡";
            tapBtn.style.background = "linear-gradient(180deg, #00D2FF 0%, #0072FF 100%)";
            tapBtn.style.color = "#FFFFFF";

            const startTime = Date.now();
            const totalDuration = 10000;

            timer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, (totalDuration - elapsed) / 1000);
                timerDisplay.innerText = `⏱️ ${remaining.toFixed(1)}s`;

                if (remaining <= 0) {
                    finishGame();
                }
            }, 100);
        };

        // Evento Tapping
        tapBtn.addEventListener('click', () => {
            if (isFinished) return;

            if (!isGameActive) {
                startGame();
            } else {
                // Incremento de energía por toque (3% por tap aprox. 34 toques para 100%)
                energy = Math.min(100, energy + 3.0);

                // Game Juice: Rebote ligero al presionar
                operatorAvatar.style.transform = `scale(1.25) rotate(${Math.random() * 20 - 10}deg)`;
                setTimeout(() => {
                    operatorAvatar.style.transform = "scale(1) rotate(0deg)";
                }, 60);

                updateVisuals();

                if (energy >= 100) {
                    finishGame();
                }
            }
        });
    };

    return { render, afterRender };
};