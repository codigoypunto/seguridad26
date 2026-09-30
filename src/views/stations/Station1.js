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
                reflection: "El material acumulado cerca del borde aumenta la carga sobre las paredes de la excavación y puede provocar derrumbes.",
                stageTitle: "PREGUNTA 1: EXCAVACIONES", 
                text: "Observas una excavación profunda con personal trabajando en su interior. ¿Qué condición representa el mayor riesgo de atrapamiento?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Material excavado acumulado al borde de la zanja", 
                        img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: true,
                    }, 
                    { 
                        id: 'B', 
                        text: "Área delimitada con cinta de seguridad", 
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
                        text: "Escalera de acceso instalada", 
                        img: "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }
                ]
            },
            { 
                step: 2, 
                stepName: "ALTURA",
                reflection: "Una caída puede ocurrir en segundos. La protección contra caídas debe mantenerse conectada en todo momento.",
                stageTitle: "PREGUNTA 2: TRABAJOS EN ALTURA", 
                text: "En un trabajo a más de 1.8 metros de altura. ¿Cuál constituye una condición crítica de riesgo?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Andamio inspeccionado y señalizado", 
                        img: "https://images.pexels.com/photos/12188448/pexels-photo-12188448.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Trabajador sin estar conectado a un punto de anclaje", 
                        img: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Línea de vida certificada", 
                        img: "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Plataforma con rodapiés", 
                        img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 3, 
                stepName: "PUNTO CIEGO",
                reflection: "Los puntos ciegos son una de las principales causas de atropellos y colisiones en operaciones mineras.",
                stageTitle: "PREGUNTA 3: EQUIPO PESADO", 
                text: "¿Un camión de acarreo se encuentra maniobrando, un trabajador cruza frente al equipo. ¿Qué condición representa el mayor riesgo?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Uso de radio de comunicación", 
                        img: "https://images.pexels.com/photos/12386445/pexels-photo-12386445.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Ingreso al punto ciego del operador", 
                        img: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Mantener distancia segura", 
                        img: "https://images.pexels.com/photos/10365313/pexels-photo-10365313.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Establecer contacto visual con el operador", 
                        img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 4, 
                stepName: "HERRAMIENTA",
                reflection: "Las herramientas hechizas carecen de diseño, certificación y controles que garanticen su uso seguro.",
                stageTitle: "PREGUNTA 4: HERRAMIENTAS MANUALES", 
                text: "Durante una inspección detectas varias herramientas en uso. ¿Cuál de ellas representa una condición insegura de alto riesgo?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Herramienta hechiza o modificada sin autorización", 
                        img: "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'B', 
                        text: "Herramienta con inspección vigente", 
                        img: "https://images.pexels.com/photos/12188448/pexels-photo-12188448.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Herramienta con guarda instalada", 
                        img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Herramienta con mango ergonómico", 
                        img: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=300", 
                        isCorrect: false 
                    } 
                ] 
            }
        ]
    };
    return TriviaEngine(data);
};