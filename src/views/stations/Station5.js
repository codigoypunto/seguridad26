/**
 * Módulo de Estación 5: Aislamiento de Energía (Drag and Drop)
 * Corregido: Ajuste de coordenadas al arrastrar (Evasión de Containing Block por Backdrop Filter)
 */
import { updateProgress } from '../../core/store.js';
import { navigate } from '../../core/router.js';

const CONFIG = {
    STARS_THRESHOLDS: {
        FOUR_STARS: 0,   
        THREE_STARS: 2,  
        TWO_STARS: 4     
    }
};

const ENERGIES_DATA = [
    { id: 'e1', name: 'ELÉCTRICA', icon: '⚡', risk: 'Choque eléctrico o arco eléctrico', cons: 'Electrocución / quemadura' },
    { id: 'e2', name: 'NEUMÁTICA', icon: '💨', risk: 'Golpe por liberación de presión', cons: 'Golpe / lesión por presión' },
    { id: 'e3', name: 'HIDRÁULICA', icon: '💧', risk: 'Atrapamiento o inyección de fluido', cons: 'Inyección de fluido / lesión grave' },
    { id: 'e4', name: 'MECÁNICA', icon: '⚙️', risk: 'Atrapamiento con partes móviles', cons: 'Atrapamiento / amputación' },
    { id: 'e5', name: 'TÉRMICA', icon: '🔥', risk: 'Quemaduras por calor', cons: 'Quemadura severa' },
    { id: 'e6', name: 'GRAVITACIONAL', icon: '🏗️', risk: 'Golpe por caída de carga suspendida', cons: 'Aplastamiento / fractura' }
];

export const Station5 = () => {
    let mistakes = 0;
    let matches = 0;
    let draggedElement = null;
    let initialX, initialY;
    
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container station-engine-view slide-in-right';
        container.id = 'station5Container';

        const shuffledRisks = shuffleArray(ENERGIES_DATA);
        const shuffledEnergies = shuffleArray(ENERGIES_DATA);

        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>

            <div class="trivia-header pop-in" style="margin-bottom: 5px;">
                <h2 class="title-trivia">AISLAMIENTO DE ENERGÍA</h2>
                <p class="subtitle-trivia">Arrastra la energía al riesgo que genera para bloquearla (LOTO).</p>
            </div>

            <div class="card-glass" id="cardGlass" style="flex: 1; display: flex; flex-direction: column; gap: 10px; padding: 12px 15px; margin-bottom: 5px;">
                
                <div id="feedbackOverlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 13, 82, 0.95); z-index: 100; border-radius: var(--border-radius-lg); display: none; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; backdrop-filter: blur(5px);">
                    <div style="font-size: 40px; margin-bottom: 10px;">🔒</div>
                    <h3 style="color: var(--color-success); font-weight: 900; font-size: 18px; margin-bottom: 8px;">¡ENERGÍA BLOQUEADA!</h3>
                    <p id="feedbackCons" style="color: #FFF; font-size: 14px; line-height: 1.4; font-weight: bold; margin-bottom: 20px;"></p>
                    <button id="btnNextDrop" class="btn-primary" style="width: 100%; padding: 12px;">CONTINUAR</button>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex: 1; min-height: 0; overflow-y: auto;">
                    ${shuffledRisks.map(item => `
                        <div class="drop-zone" data-match="${item.id}" style="background: rgba(0, 20, 80, 0.6); border: 1.5px dashed rgba(0, 210, 255, 0.4); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px; text-align: center; transition: all 0.3s ease; position: relative;">
                            <span style="font-size: 11px; font-weight: 800; color: var(--color-cyan-glow); margin-bottom: 4px;">RIESGO LIBRE</span>
                            <span style="font-size: 12px; font-weight: bold; color: var(--color-text-light); line-height: 1.2;">${item.risk}</span>
                        </div>
                    `).join('')}
                </div>

                <div style="width: 100%; height: 2px; background: rgba(0, 210, 255, 0.2); margin: 5px 0;"></div>
                <div style="text-align: center; font-size: 11px; font-weight: 800; color: var(--color-primary);">👇 ARRASTRA ESTAS ENERGÍAS 👇</div>

                <div id="dragContainer" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; min-height: 90px; position: relative;">
                    ${shuffledEnergies.map(item => `
                        <div class="draggable-energy" data-id="${item.id}" data-cons="${item.cons}" style="background: linear-gradient(135deg, #001A80, #000D52); border: 2px solid var(--color-primary); border-radius: 8px; padding: 6px 12px; display: flex; align-items: center; gap: 6px; cursor: grab; touch-action: none; user-select: none; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                            <span style="font-size: 18px; pointer-events: none;">${item.icon}</span>
                            <span style="font-size: 12px; font-weight: 900; color: #FFF; pointer-events: none;">${item.name}</span>
                        </div>
                    `).join('')}
                </div>

            </div>

            <button id="actionBtn" class="btn-primary pulse-btn btn-gold-glow" style="width: 100%; display: none;">
                FINALIZAR BLOQUEO
            </button>
        `;

        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const draggables = document.querySelectorAll('.draggable-energy');
        const dropZones = document.querySelectorAll('.drop-zone');
        const feedbackOverlay = document.getElementById('feedbackOverlay');
        const feedbackCons = document.getElementById('feedbackCons');
        const btnNextDrop = document.getElementById('btnNextDrop');
        const actionBtn = document.getElementById('actionBtn');

        // Variables para manejar el espacio vacío (placeholder) y regresar al sitio
        let placeholder = null;
        let originalParent = null;

        const getCollidingDropZone = (dragRect) => {
            let closestZone = null;
            let minDistance = Infinity;
            
            const dragCenterX = dragRect.left + dragRect.width / 2;
            const dragCenterY = dragRect.top + dragRect.height / 2;

            dropZones.forEach(zone => {
                const zoneRect = zone.getBoundingClientRect();
                const zoneCenterX = zoneRect.left + zoneRect.width / 2;
                const zoneCenterY = zoneRect.top + zoneRect.height / 2;

                const distance = Math.hypot(dragCenterX - zoneCenterX, dragCenterY - zoneCenterY);
                
                if (distance < 60 && distance < minDistance) {
                    minDistance = distance;
                    closestZone = zone;
                }
            });

            return closestZone;
        };

        draggables.forEach(draggable => {
            draggable.addEventListener('pointerdown', (e) => {
                if (draggable.classList.contains('locked')) return;
                
                draggedElement = draggable;
                const rect = draggable.getBoundingClientRect();
                
                initialX = e.clientX - rect.left;
                initialY = e.clientY - rect.top;

                // 1. Guardar contenedor original y crear un espacio vacío del mismo tamaño
                originalParent = draggable.parentNode;
                placeholder = document.createElement('div');
                placeholder.style.width = `${rect.width}px`;
                placeholder.style.height = `${rect.height}px`;
                originalParent.insertBefore(placeholder, draggable);

                // 2. Mover el elemento al <body> para evadir el "Containing Block Bug" de las tarjetas glass
                document.body.appendChild(draggable);

                // 3. Posicionar respecto a la pantalla global
                draggable.style.position = 'fixed';
                draggable.style.zIndex = '9999';
                draggable.style.margin = '0';
                draggable.style.left = `${e.clientX - initialX}px`;
                draggable.style.top = `${e.clientY - initialY}px`;
                draggable.style.transform = 'scale(1.1)';
                draggable.style.transition = 'none'; 
                
                draggable.setPointerCapture(e.pointerId);
            });

            draggable.addEventListener('pointermove', (e) => {
                if (draggedElement !== draggable) return;
                draggable.style.left = `${e.clientX - initialX}px`;
                draggable.style.top = `${e.clientY - initialY}px`;
            });

            draggable.addEventListener('pointerup', (e) => {
                if (draggedElement !== draggable) return;
                draggedElement = null;
                draggable.releasePointerCapture(e.pointerId);
                draggable.style.transform = 'scale(1)';

                const dragRect = draggable.getBoundingClientRect();
                const targetZone = getCollidingDropZone(dragRect);

                if (targetZone) {
                    const matchId = targetZone.getAttribute('data-match');
                    const myId = draggable.getAttribute('data-id');

                    if (matchId === myId) {
                        // MATCH CORRECTO
                        matches++;
                        draggable.classList.add('locked');
                        
                        targetZone.style.background = 'rgba(0, 230, 118, 0.2)';
                        targetZone.style.borderColor = 'var(--color-success)';
                        targetZone.innerHTML = ''; 
                        
                        // Insertar en la zona de riesgo
                        draggable.style.position = 'relative';
                        draggable.style.left = '0';
                        draggable.style.top = '0';
                        draggable.style.zIndex = '1';
                        draggable.style.width = '100%';
                        draggable.style.justifyContent = 'center';
                        draggable.style.border = '2px solid var(--color-success)';
                        
                        targetZone.appendChild(draggable);
                        
                        // Eliminar el placeholder
                        if (placeholder) {
                            placeholder.remove();
                            placeholder = null;
                        }

                        const consText = draggable.getAttribute('data-cons');
                        feedbackCons.innerHTML = `Evitaste: <span style="color: var(--color-primary);">${consText}</span>`;
                        feedbackOverlay.style.display = 'flex';

                    } else {
                        // MATCH INCORRECTO
                        mistakes++;
                        targetZone.style.borderColor = 'var(--color-danger)';
                        targetZone.style.background = 'rgba(255, 42, 85, 0.2)';
                        setTimeout(() => {
                            targetZone.style.borderColor = 'rgba(0, 210, 255, 0.4)';
                            targetZone.style.background = 'rgba(0, 20, 80, 0.6)';
                        }, 500);
                        
                        resetDraggable(draggable);
                    }
                } else {
                    resetDraggable(draggable);
                }
            });
        });

        // Función para devolver al contenedor original
        const resetDraggable = (el) => {
            if (placeholder && originalParent) {
                originalParent.insertBefore(el, placeholder);
                placeholder.remove();
                placeholder = null;
            }
            el.style.transition = 'all 0.3s ease';
            el.style.position = 'relative';
            el.style.left = '0';
            el.style.top = '0';
            el.style.zIndex = '1';
        };

        btnNextDrop.addEventListener('click', () => {
            feedbackOverlay.style.display = 'none';
            if (matches === 6) {
                document.getElementById('dragContainer').innerHTML = `<div style="color: var(--color-success); font-weight: 900; font-size: 16px;">¡TODAS LAS ENERGÍAS BLOQUEADAS! 🔒</div>`;
                actionBtn.style.display = 'block';
            }
        });

        actionBtn.addEventListener('click', () => {
            let stars = 1;
            if (mistakes <= CONFIG.STARS_THRESHOLDS.FOUR_STARS) stars = 4;
            else if (mistakes <= CONFIG.STARS_THRESHOLDS.THREE_STARS) stars = 3;
            else if (mistakes <= CONFIG.STARS_THRESHOLDS.TWO_STARS) stars = 2;

            updateProgress(5, stars);
            navigate('/estrellas');
        });
    };

    return { render, afterRender };
};