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
                        text: "Roca suelta en talud y piedras en la vía", 
                        img: "src/images/est3/31a.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'B', 
                        text: "Malla de sostenimiento correctamente instalada y tensionada", 
                        img: "src/images/est3/31b.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Señalización de un solo carril", 
                        img: "src/images/est3/31c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Todas las anteriores", 
                        img: "src/images/est3/31d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 2, 
                stepName: "EVALÚA", 
                stageTitle: "ETAPA 2: EVALÚA EL RIESGO", 
                text: "¿Qué acción inmediata debes tomar si observas caída constante de rocas pequeñas?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Acercarse para ver porque caen las rocas y luego informar al supervisor", 
                        img: "src/images/est3/32a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Detener el trabajo, retirarse, señalizar y comunicar", 
                        img: "src/images/est3/32b.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Solo retirarte del área", 
                        img: "src/images/est3/32c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Tomar foto y enviar al supervisor mientras mis compañeros continúan trabajando", 
                        img: "src/images/est3/32d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 3, 
                stepName: "DECIDE", 
                stageTitle: "ETAPA 3: DECIDE LOS CONTROLES EFECTIVOS", 
                text: "¿Qué control crítico evita tener accidentes en una zona de caída de rocas?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Colocar una señalización de advertencia de caída de rocas", 
                        img: "src/images/est3/33a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Casco en buen estado", 
                        img: "src/images/est3/33b.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Ropa reflectiva", 
                        img: "src/images/est3/33c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Colocar una señalización y barreras físicas para evitar que ingrese el personal", 
                        img: "src/images/est3/33d.jpg", 
                        isCorrect: true 
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
                        text: "Entrar a limpiar las rocas que cayeron sin comunicar a geotecnia", 
                        img: "src/images/est3/34a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Esperar 5 min y retornar a trabajar", 
                        img: "src/images/est3/34b.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Evaluación geotécnica previa y liberación por el personal competente antes de reiniciar los trabajos", 
                        img: "src/images/est3/34c.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'D', 
                        text: "Solo ver que no hayan caído rocas y entrar", 
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