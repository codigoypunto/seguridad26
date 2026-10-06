/**
 * Módulo de Estación 4: Cuidado de Manos y Pies (Trivia)
 * Nota: Esta estación no utiliza el sistema de reflexión post-respuesta.
 */
import { TriviaEngine } from './TriviaEngine.js';

export const Station4 = () => {
    const data = {
        stationId: 4,
        title: "CUIDADO DE MANOS Y PIES",
        subtitle: "¿Cuánto cuidas tus manos y pies?",
        questions: [
            { 
                step: 1, 
                stepName: "INSPECCIÓN PREVIA", 
                stageTitle: "PREGUNTA 1: HERRAMIENTAS", 
                text: "¿Qué debes hacer antes de utilizar una herramienta?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Usarla confiando que está en buen estado", 
                        img: "src/images/est4/41a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Revisar que esté en buen estado", 
                        img: "src/images/est4/41b.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Pedirle permiso a tu compañero", 
                        img: "src/images/est4/41c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Hacerle limpieza antes de usarla", 
                        img: "src/images/est4/41d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 2, 
                stepName: "ESTADO DEL EPP", 
                stageTitle: "PREGUNTA 2: REPORTE DE EPP", 
                text: "¿Qué haces si tu guante está deteriorado?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Uso sólo el que está en buen estado", 
                        img: "src/images/est4/42a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Lo escondo y sigo trabajando", 
                        img: "src/images/est4/42b.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Lo reporto y reemplazo según el procedimiento", 
                        img: "src/images/est4/42c.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'D', 
                        text: "No uso guantes de seguridad", 
                        img: "src/images/est4/42d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 3, 
                stepName: "LÍNEA DE FUEGO", 
                stageTitle: "PREGUNTA 3: ATRAPAMIENTO", 
                text: "¿Dónde ubicas tu mano cuando existe riesgo de atrapamiento?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "En la zona de peligro", 
                        img: "src/images/est4/43a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Fuera de la línea de fuego", 
                        img: "src/images/est4/43b.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Las manos deben estar suspendidas", 
                        img: "src/images/est4/43c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Me retiro", 
                        img: "src/images/est4/43d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 4, 
                stepName: "PROTECCIÓN DE PIES", 
                stageTitle: "PREGUNTA 4: CALZADO ADECUADO", 
                text: "¿Por qué utilizamos botas de seguridad?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Porque combina con mi uniforme", 
                        img: "src/images/est4/44a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Para proteger mis pies de riesgos de la tarea", 
                        img: "src/images/est4/44b.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Porque pesan bastante", 
                        img: "src/images/est4/44c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Por que todos lo hacen", 
                        img: "src/images/est4/44d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            }
        ]
    };

    // Retornamos la instancia del motor de trivia alimentada con estos datos
    return TriviaEngine(data);
};