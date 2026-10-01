/**
 * Motor Reutilizable de Trivias con Soporte de Paso Activo Único y Reflexión
 */
import { updateProgress } from '../../core/store.js';
import { navigate } from '../../core/router.js';

export const TriviaEngine = (data) => {
    let currentIndex = 0;
    let selectedOption = null;
    let isVerified = false;
    let score = 0;

    const render = async () => {
        const currentQ = data.questions[currentIndex];
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container station-engine-view slide-in-right';
        container.id = 'triviaContainer';

        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>

            <div class="trivia-header pop-in">
                <h2 class="title-trivia">${data.title}</h2>
                <p class="subtitle-trivia">${data.subtitle}</p>
            </div>

            <!-- Paso Único Activo (Nuevo Diseño según referencia) -->
            <div class="active-step-card pop-in">
                <div class="step-number-badge">${currentQ.step}</div>
                <div class="step-name-text">${currentQ.stepName}</div>
            </div>

            <!-- Pregunta -->
            <div class="question-container">
                <h3 class="stage-title">${currentQ.stageTitle}</h3>
                <p class="question-text">${currentQ.text}</p>
            </div>

            <!-- Cuadrícula de Opciones -->
            <div class="options-grid">
                ${currentQ.options.map(opt => `
                    <div class="option-card" data-id="${opt.id}">
                        <div class="opt-image" style="background-image: url('${opt.img}');">
                            <span class="opt-letter" id="letter-${opt.id}">${opt.id}</span>
                        </div>
                        <div class="opt-text">${opt.text}</div>
                    </div>
                `).join('')}
            </div>

            <!-- Contenedor dinámico de Reflexión (Se llena al verificar) -->
            <div id="reflectionContainer" style="width: 100%;"></div>

            <!-- Botón de Acción Principal -->
            <button id="actionBtn" class="btn-disabled" disabled>
                VERIFICAR
            </button>
        `;

        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const currentQ = data.questions[currentIndex];
        const optionCards = document.querySelectorAll('.option-card');
        const actionBtn = document.getElementById('actionBtn');
        const reflectionContainer = document.getElementById('reflectionContainer');

        // Selección de Opción
        optionCards.forEach(card => {
            card.addEventListener('click', () => {
                if (isVerified) return; // Bloqueado tras verificar

                const id = card.getAttribute('data-id');
                selectedOption = currentQ.options.find(o => o.id === id);

                optionCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                actionBtn.className = 'btn-primary pulse-btn';
                actionBtn.disabled = false;
                actionBtn.innerText = 'VERIFICAR';
            });
        });

        // Evento Botón de Acción (VERIFICAR -> CONTINUAR)
        actionBtn.addEventListener('click', () => {
            if (!selectedOption) return;

            if (!isVerified) {
                // FASE 1: VERIFICAR RESPUESTA
                isVerified = true;

                if (selectedOption.isCorrect) {
                    score++;
                }

                // Resaltar respuesta correcta/incorrecta e íconos
                optionCards.forEach(card => {
                    const id = card.getAttribute('data-id');
                    const opt = currentQ.options.find(o => o.id === id);
                    const letterSpan = document.getElementById(`letter-${id}`);

                    if (opt.isCorrect) {
                        card.classList.add('correct');
                        letterSpan.className = 'opt-letter correct-icon';
                        letterSpan.innerText = '✓';
                    } else if (id === selectedOption.id && !opt.isCorrect) {
                        card.classList.add('incorrect');
                        letterSpan.className = 'opt-letter incorrect-icon';
                        letterSpan.innerText = '✕';
                    }
                });

                // Mostrar llamada de reflexión
                if (currentQ.reflection) {
                    reflectionContainer.innerHTML = `
                        <div class="reflection-box pop-in">
                            <div class="reflection-title">💡 REFLEXIÓN BR@VA</div>
                            <p class="reflection-text">${currentQ.reflection}</p>
                        </div>
                    `;
                }

                // Transformar botón a CONTINUAR
                actionBtn.innerText = 'CONTINUAR';
                actionBtn.className = 'btn-primary pulse-btn btn-gold-glow';

            } else {
                // FASE 2: CONTINUAR A SIGUIENTE PREGUNTA O PUNTUACIÓN
                currentIndex++;
                selectedOption = null;
                isVerified = false;

                if (currentIndex < data.questions.length) {
                    // Re-renderizar siguiente pregunta de la trivia
                    const triviaContainer = document.getElementById('triviaContainer');
                    if (triviaContainer) {
                        render().then(newFrag => {
                            triviaContainer.parentNode.replaceChild(newFrag, triviaContainer);
                            afterRender();
                        });
                    }
                } else {
                    // Finalizar Estación y guardar progreso
                    const stationId = data.stationId || 1;
                    updateProgress(stationId, score);
                    navigate('/estrellas');
                }
            }
        });
    };

    return { render, afterRender };
};