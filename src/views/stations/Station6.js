/**
 * Módulo de Estación 6: Seguridad Vial (Laberinto "Scary Maze" - Nivel Extremo)
 * Objetivo: Conducir la camioneta por un circuito microscópico.
 * Nueva Mecánica de Movimiento: Trackpad Virtual. El jugador puede tocar en cualquier parte 
 * de la pantalla para deslizar y mover el vehículo remotamente para no tapar la vista.
 */
import { updateProgress } from '../../core/store.js';
import { navigate } from '../../core/router.js';

// ==========================================================================
// PARÁMETROS CONFIGURABLES
// ==========================================================================
const CONFIG = {
    INVINCIBILITY_MS: 1500, // Tiempo de invulnerabilidad después de un choque/checkpoint (ms)
    STARS_THRESHOLDS: {
        FOUR_STARS: 2,   // 0 a 2 errores = 4 estrellas
        THREE_STARS: 5,  // 3 a 5 errores = 3 estrellas
        TWO_STARS: 8     // 6 a 8 errores = 2 estrellas
                         // 9+ errores = 1 estrella
    }
};

// ==========================================================================
// BANCO DE TRIVIAS VISUALES (12 Preguntas)
// ==========================================================================
const TRIVIA_DATA = [
    {
        id: 1, 
        img: "src/images/est6/i61.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Zona de Empaques", isCorrect: false },
            { text: "Estacionamiento para vehiculos livianos", isCorrect: true },
            { text: "Estacionamiento para vehiculos pesados", isCorrect: false }
        ]
    },
    {
        id: 2, 
        img: "src/images/est6/i62.jpg", 
        question: "¿Qué información brinda esta señal azul?",
        options: [
            { text: "Estacionar en retroceso, vehiculos pesados", isCorrect: true },
            { text: "Estacionar en retroceso, vehiculos livianos", isCorrect: false },
            { text: "No estacionar en retroceso", isCorrect: false }
        ]
    },
    {
        id: 3, 
        img: "src/images/est6/i63.jpg", 
        question: "¿Qué información brinda esta señal azul?",
        options: [
            { text: "Descanzo para conductores", isCorrect: false },
            { text: "Zona de trabajo", isCorrect: false },
            { text: "Zona de equipo Pesado", isCorrect: true }
        ]
    },
     {
        id: 4, 
        img: "src/images/est6/i64.jpg", 
        question: "¿Qué información brinda esta señal azul?",
        options: [
            { text: "Desvio por obras", isCorrect: false },
            { text: "Mirar a la derecha", isCorrect: false },
            { text: "Sentido obligatorio de circulacion", isCorrect: true }
        ]
    },
    {
        id: 5, 
        img: "src/images/est6/i65.jpg", 
        question: "¿Qué información brinda esta señal azul?",
        options: [
            { text: "Sentido de dirección obligatoria", isCorrect: true },
            { text: "Doble vía", isCorrect: false },
            { text: "Curva peligrosa", isCorrect: false }
        ]
    },
    {
        id: 6, 
        img: "src/images/est6/i66.jpg", 
        question: "¿Qué tipo de señal es?",
        options: [
            { text: "Señal de prevención", isCorrect: false },
            { text: "Señal de regulación", isCorrect: false },
            { text: "Señal de información", isCorrect: true }
        ]
    },
    {
        id: 7, 
        img: "src/images/est6/i67.jpg", 
        question: "¿Qué tipo de señal es?",
        options: [
            { text: "Señal de prevención", isCorrect: false },
            { text: "Señal de regulación", isCorrect: false },
            { text: "Señal de información", isCorrect: true }
        ]
    },
    {
        id: 8, 
        img: "src/images/est6/i68.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Mantener grupo de 4 personas", isCorrect: false },
            { text: "Punto de encuentro", isCorrect: true },
            { text: "Zona de fiestas", isCorrect: false }
        ]
    },
    {
        id: 9, 
        img: "src/images/est6/o61.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Zona restringida, solo personal autorizado", isCorrect: true },
            { text: "Prohibido esta de pie", isCorrect: false },
            { text: "Peligro, no pasar", isCorrect: false }
        ]
    },
    {
        id: 10, 
        img: "src/images/est6/o62.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Cuidado al subir y bajar", isCorrect: false },
            { text: "Acensores", isCorrect: false },
            { text: "Doble sentido de circulación", isCorrect: true }
        ]
    },
    {
        id: 11, 
        img: "src/images/est6/o63.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Paso de peatones", isCorrect: false },
            { text: "Cruce de bicicletas", isCorrect: false },
            { text: "Resalto, reductor de velocidad", isCorrect: true }
        ]
    },
    {
        id: 12, 
        img: "src/images/est6/o64.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Intersección en T", isCorrect: true },
            { text: "Área de transporte", isCorrect: false },
            { text: "Zona de trasbordo", isCorrect: false }
        ]
    },
    {
        id: 13, 
        img: "src/images/est6/o65.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Zona de descanso", isCorrect: false },
            { text: "Estrechamiento de vía", isCorrect: true },
            { text: "Punto de interés", isCorrect: false }
        ]
    },
    {
        id: 14, 
        img: "src/images/est6/o66.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Zona de descanso", isCorrect: false },
            { text: "Área de servicio", isCorrect: false },
            { text: "Incorporación de vía", isCorrect: true }
        ]
    },
    {
        id: 15, 
        img: "src/images/est6/o67.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Recuerda mantenerte lejos de la zona indicada", isCorrect: false },
        ]
    },
    {
        id: 16, 
        img: "src/images/est6/p61.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Estacionamiento", isCorrect: false },
            { text: "Prioridad equipo Pesado", isCorrect: true },
            { text: "Zona de Carga", isCorrect: false }
        ]
    },
   {
        id: 17, 
        img: "src/images/est6/p62.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Mantener Distancia segura, minimo 50 metros", isCorrect: true },
            { text: "Área libre de estacionamiento", isCorrect: false },
            { text: "Mantener Distancia segura, maximo 50 metros", isCorrect: false }
        ]
    },
    {
        id: 18, 
        img: "src/images/est6/p63.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "No usar celulares", isCorrect: false },
            { text: "Comunicacion por radio", isCorrect: true },
            { text: "Zona WiFi", isCorrect: false }
        ]
    },
    {
        id: 19, 
        img: "src/images/est6/p64.jpg", 
        question: "¿Qué tipo de señal es?",
        options: [
            { text: "Señal informativa", isCorrect: false },
            { text: "Señal reguladora", isCorrect: false },
            { text: "Señal preventiva", isCorrect: true }
        ]
    },
    {
        id: 20, 
        img: "src/images/est6/p65.jpg", 
        question: "¿Qué indica esta señal?",
        options: [
            { text: "Peligro, caida de rocas", isCorrect: true },
            { text: "Zona de desmonte", isCorrect: false },
            { text: "Acantilado", isCorrect: false }
        ]
    },
    
    
];

// Camioneta SVG 
const TRUCK_SVG = `<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1860.88 3040.16"><defs><style>.cls-1,.cls-2,.cls-4{fill:#212121;}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6,.cls-7{stroke:#000;}.cls-1,.cls-2,.cls-3,.cls-5,.cls-6,.cls-7{stroke-miterlimit:54;}.cls-1{stroke-width:55.62px;}.cls-2{stroke-width:57.57px;}.cls-3{fill:#e53935;stroke-width:53.44px;}.cls-4{stroke-linejoin:round;}.cls-4,.cls-5{stroke-width:45.81px;}.cls-5{fill:#1e1e1e;}.cls-6{fill:#ff1744;}.cls-6,.cls-7{stroke-width:30.54px;}.cls-7{fill:#ffac1a;}</style></defs><path class="cls-1" d="M911.25,516.82h0c37.94,0,68.7,35.85,68.7,80.07V997.21c0,44.22-30.76,80.07-68.7,80.07h0c-37.94,0-68.7-35.85-68.7-80.07V596.89C842.55,552.67,873.31,516.82,911.25,516.82Z" transform="translate(-813.77 -109.98)"/><path class="cls-1" d="M2577.17,516.82h0c37.94,0,68.69,35.85,68.69,80.07V997.21c0,44.22-30.75,80.07-68.69,80.07h0c-38,0-68.7-35.85-68.7-80.07V596.89C2508.47,552.67,2539.22,516.82,2577.17,516.82Z" transform="translate(-813.77 -109.98)"/><path class="cls-2" d="M911.25,2142.88h0c37.94,0,68.7,38.4,68.7,85.77v428.86c0,47.37-30.76,85.77-68.7,85.77h0c-37.94,0-68.7-38.4-68.7-85.77V2228.65C842.55,2181.28,873.31,2142.88,911.25,2142.88Z" transform="translate(-813.77 -109.98)"/><path class="cls-2" d="M2577.17,2142.88h0c37.94,0,68.69,38.4,68.69,85.77v428.86c0,47.37-30.75,85.77-68.69,85.77h0c-38,0-68.7-38.4-68.7-85.77V2228.65C2508.47,2181.28,2539.22,2142.88,2577.17,2142.88Z" transform="translate(-813.77 -109.98)"/><path class="cls-3" d="M1220.39,136.7H2268c132.79,0,240.44,85.09,240.44,190.06V2933.35c0,105-107.65,190.06-240.44,190.06H1220.39c-132.79,0-240.44-85.09-240.44-190.06V326.76C980,221.79,1087.6,136.7,1220.39,136.7Z" transform="translate(-813.77 -109.98)"/><path class="cls-4" d="M1151.69,761.19c377.84-81.45,807.2-81.45,1185,0l-103,217.22c-360.66-54.31-618.28-54.31-978.94,0Z" transform="translate(-813.77 -109.98)"/><path class="cls-4" d="M1254.74,1575.75c360.66,54.3,618.28,54.3,978.94,0l-34.35,81.46c-326.31,40.72-583.93,40.72-910.24,0Z" transform="translate(-813.77 -109.98)"/><path class="cls-5" d="M1220.39,1793H2268c37.94,0,68.69,24.31,68.69,54.3V2879c0,30-30.75,54.31-68.69,54.31H1220.39c-37.94,0-68.7-24.32-68.7-54.31V1847.27C1151.69,1817.28,1182.45,1793,1220.39,1793Z" transform="translate(-813.77 -109.98)"/><path class="cls-6" d="M1065.82,3014.8h171.74c9.49,0,17.18,6.08,17.18,13.58v27.15c0,7.5-7.69,13.58-17.18,13.58H1065.82c-9.49,0-17.17-6.08-17.17-13.58v-27.15C1048.65,3020.88,1056.33,3014.8,1065.82,3014.8Z" transform="translate(-813.77 -109.98)"/><path class="cls-6" d="M2250.85,3014.8H2422.6c9.48,0,17.17,6.08,17.17,13.58v27.15c0,7.5-7.69,13.58-17.17,13.58H2250.85c-9.48,0-17.17-6.08-17.17-13.58v-27.15C2233.68,3020.88,2241.37,3014.8,2250.85,3014.8Z" transform="translate(-813.77 -109.98)"/><path class="cls-7" d="M1065.82,207.94h171.74c9.49,0,17.18,6.07,17.18,13.57v27.15c0,7.5-7.69,13.58-17.18,13.58H1065.82c-9.49,0-17.17-6.08-17.17-13.58V221.51C1048.65,214,1056.33,207.94,1065.82,207.94Z" transform="translate(-813.77 -109.98)"/><path class="cls-7" d="M2250.85,207.94H2422.6c9.48,0,17.17,6.07,17.17,13.57v27.15c0,7.5-7.69,13.58-17.17,13.58H2250.85c-9.48,0-17.17-6.08-17.17-13.58V221.51C2233.68,214,2241.37,207.94,2250.85,207.94Z" transform="translate(-813.77 -109.98)"/></svg>`;

export const Station6 = () => {
    // Controladores de estado
    let mistakes = 0;
    let collisions = 0;
    
    // Variables para el Trackpad Virtual
    let isDragging = false;
    let initialFingerX = 0; // Dónde tocó el dedo inicialmente
    let initialFingerY = 0;
    let initialVehicleX = 0; // Dónde estaba el vehículo antes de moverlo
    let initialVehicleY = 0;

    let isInvincible = false;
    
    // Variables de estado del laberinto
    let clearedCheckpoints = [];
    let lastSafeLeft = null;
    let lastSafeTop = null;
    let currentModalType = null; 

    // Extrae una pregunta al azar
    const getRandomQuestion = () => TRIVIA_DATA[Math.floor(Math.random() * TRIVIA_DATA.length)];

    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container station-engine-view slide-in-right';
        container.id = 'station6Container';

        const style = document.createElement('style');
        style.innerHTML = `
            /* El contenedor track-bg ahora tiene touch-action: none para que el usuario 
               pueda deslizar el dedo en cualquier parte sin hacer scroll en la pantalla. */
            .track-bg { 
                background: radial-gradient(circle, #060057 0%, #140931 100%); 
                border-radius: var(--border-radius-md); 
                overflow: hidden; 
                position: relative; 
                border: 2px solid var(--color-cyan-glow); 
                touch-action: none; 
                cursor: grab;
            }
            .track-bg:active { cursor: grabbing; }
            
            .safe-road { 
                background-color: #3B4252;
                position: absolute; 
                border-radius: 4px; 
                box-shadow: inset 0 0 12px rgba(0,0,0,0.9);
            }

            .safe-road-h { 
                position: absolute; 
                // box-shadow: inset 0 0 12px #3B4252;
                outline: 8px solid #3B4252;
                background-color: #c0c0c0;
                height: 4%;
            }

            .safe-road-v {
                position: absolute; 
                // box-shadow: inset 0 0 12px #3B4252;
                outline: 8px solid #3B4252;
                background-color: #c0c0c0;
                width: 7%;
            }

            .road-start { 
                background-color: var(--color-cyan-glow);
                display: flex; align-items: center; justify-content: center; 
                font-weight: 900; color: #000; font-size: 9px; z-index: 1;
            }

            .road-finish { 
                background-color: var(--color-success);
                display: flex; align-items: center; justify-content: center; 
                font-weight: 900; color: #000; font-size: 9px; z-index: 1;
            }
            
            .checkpoint { 
                background: rgba(0, 0, 0, 0); 
                display: flex; align-items: center; justify-content: center; z-index: 2;
            }

            .checkpoint span { 
                font-size: 8px; font-weight: 900; color: #FFF; 
                text-shadow: 0 0 3px #000; text-transform: uppercase; 
            }

            .vehicle { 
                width: 13px; height: 13px; 
                position: absolute; 
                display: flex; align-items: center; justify-content: center; 
                z-index: 10; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8)); 
                /* Ya no necesita cursor ni touch-action porque los eventos van al contenedor padre */
                pointer-events: none; 
            }

            .blinking { 
                animation: blinkAnim 0.3s infinite alternate; 
                filter: drop-shadow(0 0 8px var(--color-success)); 
            }
            
            @keyframes blinkAnim { from { opacity: 1; } to { opacity: 0.2; } }
            
            .shake-severe { 
                animation: shakeSevereAnim 0.4s cubic-bezier(.36,.07,.19,.97) both; 
                border-color: #FF0000 !important; box-shadow: 0 0 30px #FF0000; 
            }

            @keyframes shakeSevereAnim { 
                0%, 100% { transform: translate3d(0, 0, 0); } 
                10%, 30%, 50%, 70%, 90% { transform: translate3d(-8px, 5px, 0); } 
                20%, 40%, 60%, 80% { transform: translate3d(8px, -5px, 0); } 
            }
        `;
        fragment.appendChild(style);

        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>

            <div class="trivia-header pop-in" style="margin-bottom: 5px;">
                <h2 class="title-trivia">SEGURIDAD VIAL</h2>
                <p class="subtitle-trivia">Desliza el dedo en cualquier lado para manejar.</p>
            </div>

            <!-- LABERINTO SINUOSO PERSONALIZADO -->
            <!-- Ahora el ID trackContainer recibe los toques para funcionar como trackpad -->
            <div class="track-bg" id="trackContainer" style="flex: 1; width: 100%; margin-bottom: 10px; position: relative;">

                <!-- START -->
                <div class="safe-road road-start" style="top: 87%; left: 4%; width: 13%; height: 8%;">START</div>

                <!-- RUTA PERSONALIZADA -->
                <div id="r1" class="safe-road-h" style="top: 89%; left: 10%; width: 50%;"></div>
                <div id="r2" class="safe-road-v" style="top: 80%; left: 55%; height: 13%;"></div>
                <div id="r3" class="safe-road-h" style="top: 80%; left: 55%; width: 30%;"></div>
                <div id="r4" class="safe-road-v" style="top: 53%; left: 80%; height: 31%;"></div>
                <div id="r5" class="safe-road-h" style="top: 53%; left: 60%; width: 27%;"></div>
                <div id="r6" class="safe-road-v" style="top: 53%; left: 60%; height: 21%;"></div>
                <div id="r7" class="safe-road-h" style="top: 70%; left: 40%; width: 27%;"></div>
                <div id="r8" class="safe-road-v" style="top: 53%; left: 40%; height: 21%;"></div>
                <div id="r9" class="safe-road-h" style="top: 53%; left: 25%; width: 22%;"></div>
                <div id="r10" class="safe-road-v" style="top: 53%; left: 25%; height: 31%;"></div>
                <div id="r11" class="safe-road-h" style="top: 80%; left: 10%; width: 22%;"></div>
                <div id="r12" class="safe-road-v" style="top: 43%; left: 10%; height:41%;"></div>
                <div id="r13" class="safe-road-h" style="top: 43%; left: 10%; width: 42%;"></div>
                <div id="r14" class="safe-road-v" style="top: 34%; left: 45%; height:13%;"></div>
                <div id="r15" class="safe-road-h" style="top: 34%; left: 10%; width: 42%;"></div>
                <div id="r16" class="safe-road-v" style="top: 20%; left: 10%; height:18%;"></div>
                <div id="r17" class="safe-road-h" style="top: 20%; left: 10%; width: 55%;"></div>
                <div id="r18" class="safe-road-v" style="top: 20%; left: 60%; height:25%;"></div>
                <div id="r19" class="safe-road-h" style="top: 43%; left: 60%; width: 32%;"></div>
                <div id="r20" class="safe-road-v" style="top: 6%; left: 85%; height: 41%;"></div>
                <div id="r21" class="safe-road-h" style="top: 6%; left: 25%; width: 67%;"></div>
                
                <!-- CHECKPOINTS -->
                <div class="safe-road checkpoint" data-id="cp1" style="top: 65%; left: 78%; width: 11%; height: 7%;"><span><img src="src/images/est6/r61.jpg" alt="PARE" style="width: 100%; height: 100%; object-fit: contain;"></span></div>
                <div class="safe-road checkpoint" data-id="cp2" style="top: 63%; left: 23%; width: 11%; height: 7%;"><span><img src="src/images/est6/r61.jpg" alt="PARE" style="width: 100%; height: 100%; object-fit: contain;"></span></div>
                <div class="safe-road checkpoint" data-id="cp3" style="top: 18.5%; left: 30%; width: 11%; height: 7%;"><span><img src="src/images/est6/r61.jpg" alt="PARE" style="width: 100%; height: 100%; object-fit: contain;"></span></div>
                <div class="safe-road checkpoint" data-id="cp4" style="top: 41.5%; left: 72%; width: 11%; height: 7%;"><span><img src="src/images/est6/r61.jpg" alt="PARE" style="width: 100%; height: 100%; object-fit: contain;"></span></div>
                
                <!-- META -->
                <div class="safe-road road-finish" style="top: 2%; left: 10%; width: 20%; height: 10%;">META</div>

                <!-- VEHÍCULO -->
                <div id="playerVehicle" class="vehicle" style="top: 90%; left: 8%;">
                    ${TRUCK_SVG}
                </div>
            </div>

            <!-- MODALES OMITIDOS PARA BREVEDAD EN COMENTARIO, IDÉNTICOS A VERSIÓN ANTERIOR -->
            <div id="triviaModal" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 13, 82, 0.95); z-index: 100; display: none; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; backdrop-filter: blur(8px);">
                <div id="modalIcon" style="font-size: 35px; margin-bottom: 5px;"></div>
                <h3 id="modalTitle" style="font-weight: 900; font-size: 20px; margin-bottom: 10px; text-transform: uppercase;"></h3>
                <p style="color: #FFF; font-size: 13px; margin-bottom: 15px;">Responde para continuar:</p>
                
                <div class="active-step-card" style="background: rgba(0, 20, 80, 0.8);">
                    <img id="triviaImg" src="" alt="Señal" style="width: 100px; height: 100px; object-fit: contain; margin-bottom: 10px; border-radius: 8px; border: 2px solid var(--color-cyan-glow); background: #FFF;">
                    <p id="triviaQuestion" style="font-size: 14px; font-weight: bold; color: var(--color-primary);"></p>
                </div>
                <div id="triviaOptions" style="display: flex; flex-direction: column; gap: 8px; width: 100%;"></div>
            </div>

            <!-- PANTALLA DE VICTORIA -->
            <div id="victoryScreen" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 25, 90, 0.95); z-index: 100; display: none; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center;">
                <div style="font-size: 60px; margin-bottom: 10px;">🏆</div>
                <h3 style="color: var(--color-primary); font-weight: 900; font-size: 24px; margin-bottom: 10px;">¡CIRCUITO COMPLETADO!</h3>
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
        const triviaModal = document.getElementById('triviaModal');
        const victoryScreen = document.getElementById('victoryScreen');
        
        const modalIcon = document.getElementById('modalIcon');
        const modalTitle = document.getElementById('modalTitle');
        const triviaImg = document.getElementById('triviaImg');
        const triviaQuestion = document.getElementById('triviaQuestion');
        const triviaOptions = document.getElementById('triviaOptions');
        
        // Función Central para activar Trivia (Choques o Checkpoints)
        const triggerTrivia = (type, checkpointId = null) => {
            isDragging = false;
            currentModalType = type;
            const currentQuestion = getRandomQuestion();
            
            if (type === 'collision') {
                collisions++;
                modalIcon.innerText = "💥";
                modalTitle.innerText = "¡TE SALISTE DE LA VÍA!";
                modalTitle.style.color = "var(--color-danger)";
                
                trackContainer.classList.add('shake-severe');
                setTimeout(() => trackContainer.classList.remove('shake-severe'), 400);
            } else if (type === 'checkpoint') {
                modalIcon.innerText = "📍";
                modalTitle.innerText = "¡PUNTO DE CONTROL!";
                modalTitle.style.color = "var(--color-cyan-glow)";
                
                lastSafeLeft = vehicle.style.left;
                lastSafeTop = vehicle.style.top;
                if (checkpointId) clearedCheckpoints.push(checkpointId);
            }
            
            triviaImg.src = currentQuestion.img;
            triviaQuestion.innerText = currentQuestion.question;
            triviaOptions.innerHTML = currentQuestion.options.map(opt => `
                <button class="btn-secondary option-btn" data-correct="${opt.isCorrect}" style="text-align: left; padding: 10px;">
                    ${opt.text}
                </button>
            `).join('');

            triviaModal.style.display = 'flex';

            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const isCorrect = e.target.getAttribute('data-correct') === 'true';
                    
                    if (isCorrect) {
                        e.target.style.background = 'var(--color-success)';
                        e.target.style.color = '#000';
                    } else {
                        e.target.style.background = 'var(--color-danger)';
                        mistakes++; 
                    }

                    setTimeout(() => {
                        triviaModal.style.display = 'none';
                        
                        // Retornar al checkpoint si se chocó
                        if (currentModalType === 'collision' && lastSafeLeft !== null) {
                            vehicle.style.left = lastSafeLeft;
                            vehicle.style.top = lastSafeTop;
                        }
                        
                        grantInvincibility();
                    }, 1000);
                });
            });
        };

        const grantInvincibility = () => {
            isInvincible = true;
            vehicle.classList.add('blinking');
            setTimeout(() => {
                isInvincible = false;
                vehicle.classList.remove('blinking');
            }, CONFIG.INVINCIBILITY_MS);
        };

        // ==========================================================================
        // NUEVA MECÁNICA: TRACKPAD VIRTUAL
        // Eventos aplicados al "trackContainer" (toda la pantalla negra) en lugar del vehículo
        // ==========================================================================
        
        trackContainer.addEventListener('pointerdown', (e) => {
            if (triviaModal.style.display === 'flex' || victoryScreen.style.display === 'flex') return;
            
            const vehicleRect = vehicle.getBoundingClientRect();
            const containerRect = trackContainer.getBoundingClientRect();
            
            // Si es la primera vez que inicia, guardamos la posición en variables globales seguras
            if (!lastSafeLeft) {
                lastSafeLeft = `${vehicleRect.left - containerRect.left}px`;
                lastSafeTop = `${vehicleRect.top - containerRect.top}px`;
            }

            isDragging = true;
            
            // Guardamos las coordenadas del toque inicial en la pantalla
            initialFingerX = e.clientX;
            initialFingerY = e.clientY;
            
            // Guardamos dónde está el vehículo en píxeles antes de empezar a moverlo
            initialVehicleX = vehicleRect.left - containerRect.left;
            initialVehicleY = vehicleRect.top - containerRect.top;
            
            trackContainer.setPointerCapture(e.pointerId);
        });

        trackContainer.addEventListener('pointermove', (e) => {
            if (!isDragging) return;

            // 1. Calculamos cuánto se deslizó el dedo en cualquier punto de la pantalla
            const deltaX = e.clientX - initialFingerX;
            const deltaY = e.clientY - initialFingerY;

            // 2. Sumamos ese movimiento a la posición original del vehículo
            let newLeft = initialVehicleX + deltaX;
            let newTop = initialVehicleY + deltaY;

            vehicle.style.left = `${newLeft}px`;
            vehicle.style.top = `${newTop}px`;

            if (isInvincible) return;

            // ==========================================================================
            // NUEVO SISTEMA DE COLISIÓN (Escanea el centro del vehículo, no el dedo)
            // ==========================================================================
            const containerRect = trackContainer.getBoundingClientRect();
            // Obtenemos las coordenadas exactas del centro del vehículo en la pantalla
            const vehicleCenterX = containerRect.left + newLeft + (vehicle.offsetWidth / 2);
            const vehicleCenterY = containerRect.top + newTop + (vehicle.offsetHeight / 2);

            vehicle.style.display = 'none'; // Ocultar para poder escanear el fondo
            const elementUnderVehicle = document.elementFromPoint(vehicleCenterX, vehicleCenterY);
            vehicle.style.display = 'flex'; // Volver a mostrar

            if (elementUnderVehicle) {
                // Llegada a la meta
                if (elementUnderVehicle.classList.contains('road-finish') || elementUnderVehicle.closest('.road-finish')) {
                    isDragging = false;
                    showVictory();
                    return;
                }

                // Checkpoint
                const isCheckpoint = elementUnderVehicle.classList.contains('checkpoint') || elementUnderVehicle.closest('.checkpoint');
                if (isCheckpoint) {
                    const cpElement = elementUnderVehicle.closest('.checkpoint') || elementUnderVehicle;
                    const cpId = cpElement.getAttribute('data-id');
                    
                    if (!clearedCheckpoints.includes(cpId)) {
                        triggerTrivia('checkpoint', cpId);
                        return;
                    }
                }

                // Validar la carretera segura
                const isSafeRoad = elementUnderVehicle.classList.contains('safe-road') || elementUnderVehicle.closest('.safe-road') || elementUnderVehicle.classList.contains('safe-road-v') || elementUnderVehicle.closest('.safe-road-v') || elementUnderVehicle.classList.contains('safe-road-h') || elementUnderVehicle.closest('.safe-road-h');
                
                // Si el centro del vehículo toca algo que no es vía segura ni checkpoint, choca.
                if (!isSafeRoad && !isCheckpoint) {
                    triggerTrivia('collision');
                }
            }
        });

        trackContainer.addEventListener('pointerup', (e) => {
            isDragging = false;
            trackContainer.releasePointerCapture(e.pointerId);
        });

        // ==========================================================================
        // FIN DEL JUEGO Y CÁLCULO DE ESTRELLAS
        // ==========================================================================
        const showVictory = () => {
            document.getElementById('statsText').innerHTML = `Salidas de vía: <b>${collisions}</b> <br> Errores en trivia: <b>${mistakes}</b>`;
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