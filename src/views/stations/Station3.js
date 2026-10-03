/**
 * Módulo de Estación 3: Caída de Rocas (Trivia)
 */
import { TriviaEngine } from './TriviaEngine.js';

export const Station3 = () => {
    const data = {
        stationId: 3,
        title: "CAÍDA DE ROCAS",
        subtitle: "Resuelve la trivia Br@va",
        questions: [
            { 
                step: 1, 
                stepName: "IDENTIFICA", 
                stageTitle: "ETAPA 1: IDENTIFICA EL PELIGRO", 
                text: "¿Cuál de las siguientes imágenes muestra una zona con riesgo de caída de rocas?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Roca suelta en talud", 
                        img: "src/images/est3/31a.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'B', 
                        text: "Techo estable", 
                        img: "src/images/est3/31b.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Señalización", 
                        img: "src/images/est3/31c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Talud estable", 
                        img: "src/images/est3/31d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 2, 
                stepName: "EVALÚA", 
                stageTitle: "ETAPA 2: EVALÚA EL RIESGO", 
                text: "¿Qué acción inmediata debes tomar si observas caída constante de rocas pequeñas ('chispas')?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Acercarse", 
                        img: "src/images/est3/32a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Detener el trabajo y retirarse", 
                        img: "src/images/est3/32b.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Ignorarlo", 
                        img: "src/images/est3/32c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Tomar foto", 
                        img: "src/images/est3/32d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 3, 
                stepName: "DECIDE", 
                stageTitle: "ETAPA 3: DECIDE TU EPP", 
                text: "Al seleccionar el equipo de protección para zona de rocas, ¿qué es indispensable?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Lentes", 
                        img: "src/images/est3/33a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Casco en buen estado", 
                        img: "src/images/est3/33b.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Ropa reflectiva", 
                        img: "src/images/est3/33c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Guantes", 
                        img: "src/images/est3/33d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 4, 
                stepName: "ACTÚA", 
                stageTitle: "ETAPA 4: ACTÚA SEGURO", 
                text: "Después de un evento sísmico en la mina, ¿qué procedimiento es obligatorio?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Reanudar labor", 
                        img: "src/images/est3/34a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Esperar 5 min", 
                        img: "src/images/est3/34b.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Evaluación geotécnica previa", 
                        img: "src/images/est3/34c.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'D', 
                        text: "Buscar equipo", 
                        img: "src/images/est3/34d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            }
        ]
    };

    // Retornamos la instancia del motor de trivia alimentada con estos datos
    return TriviaEngine(data);
};