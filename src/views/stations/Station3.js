/**
 * Módulo de Estación 3: Caída de Rocas (Trivia)
 */
import { TriviaEngine } from './TriviaEngine.js';

export const Station3 = () => {
    const data = {
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
                        img: "src/images/31a.jpeg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'B', 
                        text: "Techo estable", 
                        img: "src/images/31b.jpeg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Señalización", 
                        img: "src/images/31c.jpeg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Talud estable", 
                        img: "src/images/31d.jpeg", 
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
                        img: "src/images/32a.jpeg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Detener el trabajo y retirarse", 
                        img: "src/images/32b.jpeg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Ignorarlo", 
                        img: "src/images/32c.jpeg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Tomar foto", 
                        img: "src/images/32d.jpeg", 
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
                        img: "src/images/33a.jpeg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Casco en buen estado", 
                        img: "src/images/33b.jpeg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Ropa reflectiva", 
                        img: "src/images/33c.jpeg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Guantes", 
                        img: "src/images/33d.jpeg", 
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
                        img: "src/images/34a.jpeg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Esperar 5 min", 
                        img: "src/images/34b.jpeg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Evaluación geotécnica previa", 
                        img: "src/images/34c.jpeg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'D', 
                        text: "Buscar equipo", 
                        img: "src/images/34d.jpeg", 
                        isCorrect: false 
                    } 
                ] 
            }
        ]
    };

    // Retornamos la instancia del motor de trivia alimentada con estos datos
    return TriviaEngine(data);
};