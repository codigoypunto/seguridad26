/**
 * Módulo de Estación 1: Percepción de Riesgo (Trivia)
 */
import { TriviaEngine } from './TriviaEngine.js';

export const Station1 = () => {
    const data = {
        title: "PERCEPCIÓN DE RIESGO", 
        subtitle: "Identifica la condición subestándar",
        questions: [
            { 
                step: 1, 
                stepName: "EXCAVACIÓN", 
                stageTitle: "PREGUNTA 1: ZANJAS Y TALUDES", 
                text: "¿Qué condición en esta excavación representa un riesgo inminente de atrapamiento?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Zanja profunda sin entibar ni banquetas", 
                        img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'B', 
                        text: "Zona delimitada", 
                        img: "https://images.pexels.com/photos/10365313/pexels-photo-10365313.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Vigía presente", 
                        img: "https://images.pexels.com/photos/12386445/pexels-photo-12386445.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Material alejado", 
                        img: "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 2, 
                stepName: "ALTURA", 
                stageTitle: "PREGUNTA 2: TRABAJOS EN ALTURA", 
                text: "Estás inspeccionando un trabajo a 3 metros de altura. ¿Qué acción es una falta crítica?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Uso de andamios", 
                        img: "https://images.pexels.com/photos/12188448/pexels-photo-12188448.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Trabajador sin engancharse", 
                        img: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Línea de vida tensa", 
                        img: "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Rodapiés instalados", 
                        img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 3, 
                stepName: "P. CIEGO", 
                stageTitle: "PREGUNTA 3: EQUIPO PESADO", 
                text: "¿Cuál es el principal riesgo al interactuar con equipo pesado en movimiento?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Uso de radio", 
                        img: "https://images.pexels.com/photos/12386445/pexels-photo-12386445.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Caminar por el punto ciego", 
                        img: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Distancia segura", 
                        img: "https://images.pexels.com/photos/10365313/pexels-photo-10365313.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Contacto visual", 
                        img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 4, 
                stepName: "HERRAMIENTA", 
                stageTitle: "PREGUNTA 4: HERRAMIENTAS", 
                text: "Al inspeccionar herramientas manuales, ¿qué detectas como riesgo inaceptable?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Herramientas hechizas", 
                        img: "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'B', 
                        text: "Cinta del mes", 
                        img: "https://images.pexels.com/photos/12188448/pexels-photo-12188448.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Guardas instaladas", 
                        img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Mangos ergonómicos", 
                        img: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    } 
                ] 
            }
        ]
    };
    return TriviaEngine(data);
};