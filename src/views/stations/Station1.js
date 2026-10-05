/**
 * Módulo de Estación 1: Percepción de Riesgo (Trivia con Reflexiones)
 */
import { TriviaEngine } from './TriviaEngine.js';

export const Station1 = () => {
    const data = {
        stationId: 1,
        title: "PERCEPCIÓN DE RIESGO", 
        subtitle: "Identifica la condición subestándar",
        questions: [
            { 
                step: 1,
                stepName: "EXCAVACIONES",
                reflection: "El material acumulado cerca del borde aumenta la carga sobre las paredes de la excavación y puede provocar derrumbes.",
                stageTitle: "PREGUNTA 1: EXCAVACIONES", 
                text: "Durante una inspección observas una excavación profunda con personal trabajando en su interior. ¿Qué condición representa el mayor riesgo de un derrumbe?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Vigía sin capacitación", 
                        img: "src/images/est1/11a.jpg", 
                        isCorrect: false,
                    }, 
                    { 
                        id: 'B', 
                        text: "Área delimitada con cinta de seguridad", 
                        img: "src/images/est1/11b.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'C', 
                        text: "Material excavado acumulado al borde de la zanja y excavación sin sostenimiento", 
                        img: "src/images/est1/11c.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'D', 
                        text: "Escalera de acceso instalada", 
                        img: "src/images/est1/11d.jpg", 
                        isCorrect: false 
                    }
                ]
            },
            { 
                step: 2, 
                stepName: "TRABAJOS EN ALTURA",
                reflection: "Una caída puede ocurrir en segundos. La protección contra caídas debe mantenerse conectada en todo momento.",
                stageTitle: "PREGUNTA 2: TRABAJOS EN ALTURA", 
                text: "Durante una inspección observas a un trabajador armando un andamio a más de 4 metros de altura. ¿Qué condición constituye un riesgo crítico de caída de altura?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Andamio inspeccionado y señalizado", 
                        img: "src/images/est1/12a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Trabajador con arnés, pero no está conectado a un punto de anclaje", 
                        img: "src/images/est1/12b.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Línea de vida certificada", 
                        img: "src/images/est1/12c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Plataforma sin rodapiés", 
                        img: "src/images/est1/12d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 3, 
                stepName: "EQUIPO PESADO",
                reflection: "Los puntos ciegos son una de las principales causas de atropellos y colisiones en operaciones mineras.",
                stageTitle: "PREGUNTA 3: EQUIPO PESADO", 
                text: "El operador de un camión de acarreo se encuentra realizando una maniobra en retroceso y en ese momento un trabajador cruza detrás del camión. ¿Qué condición representa el mayor riesgo?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Uso de radio de comunicación", 
                        img: "src/images/est1/13a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Ingreso al punto ciego del operador", 
                        img: "src/images/est1/13b.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Mantener distancia segura", 
                        img: "src/images/est1/13c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Establecer contacto visual con el operador", 
                        img: "src/images/est1/13d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            },
            { 
                step: 4, 
                stepName: "HERRAMIENTAS MANUALES",
                reflection: "Las herramientas hechizas carecen de diseño, certificación y controles que garanticen su uso seguro.",
                stageTitle: "PREGUNTA 4: HERRAMIENTAS MANUALES", 
                text: "Durante una inspección detectas varias herramientas en uso. ¿Cuál de ellas representa una condición insegura de alto riesgo?", 
                options: [ 
                    { 
                        id: 'A', 
                        text: "Herramienta con inspección vigente", 
                        img: "src/images/est1/14a.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'B', 
                        text: "Hechiza o modificada sin autorización", 
                        img: "src/images/est1/14b.jpg", 
                        isCorrect: true 
                    }, 
                    { 
                        id: 'C', 
                        text: "Herramienta con guarda instalada", 
                        img: "src/images/est1/14c.jpg", 
                        isCorrect: false 
                    }, 
                    { 
                        id: 'D', 
                        text: "Herramienta con mango ergonómico", 
                        img: "src/images/est1/14d.jpg", 
                        isCorrect: false 
                    } 
                ] 
            }
        ]
    };
    return TriviaEngine(data);
};