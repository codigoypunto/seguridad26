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
                    { id: 'A', text: "Roca suelta en talud", img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: true }, 
                    { id: 'B', text: "Techo estable", img: "https://images.pexels.com/photos/10365313/pexels-photo-10365313.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false }, 
                    { id: 'C', text: "Señalización", img: "https://images.pexels.com/photos/12386445/pexels-photo-12386445.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false }, 
                    { id: 'D', text: "Talud estable", img: "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false } 
                ] 
            },
            { 
                step: 2, 
                stepName: "EVALÚA", 
                stageTitle: "ETAPA 2: EVALÚA EL RIESGO", 
                text: "¿Qué acción inmediata debes tomar si observas caída constante de rocas pequeñas ('chispas')?", 
                options: [ 
                    { id: 'A', text: "Acercarse", img: "https://images.pexels.com/photos/12188448/pexels-photo-12188448.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false }, 
                    { id: 'B', text: "Detener el trabajo y retirarse", img: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: true }, 
                    { id: 'C', text: "Ignorarlo", img: "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false }, 
                    { id: 'D', text: "Tomar foto", img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false } 
                ] 
            },
            { 
                step: 3, 
                stepName: "DECIDE", 
                stageTitle: "ETAPA 3: DECIDE TU EPP", 
                text: "Al seleccionar el equipo de protección para zona de rocas, ¿qué es indispensable?", 
                options: [ 
                    { id: 'A', text: "Lentes", img: "https://images.pexels.com/photos/12386445/pexels-photo-12386445.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false }, 
                    { id: 'B', text: "Casco en buen estado", img: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: true }, 
                    { id: 'C', text: "Ropa reflectiva", img: "https://images.pexels.com/photos/10365313/pexels-photo-10365313.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false }, 
                    { id: 'D', text: "Guantes", img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false } 
                ] 
            },
            { 
                step: 4, 
                stepName: "ACTÚA", 
                stageTitle: "ETAPA 4: ACTÚA SEGURO", 
                text: "Después de un evento sísmico en la mina, ¿qué procedimiento es obligatorio?", 
                options: [ 
                    { id: 'A', text: "Reanudar labor", img: "https://images.pexels.com/photos/2260783/pexels-photo-2260783.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false }, 
                    { id: 'B', text: "Esperar 5 min", img: "https://images.pexels.com/photos/12188448/pexels-photo-12188448.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false }, 
                    { id: 'C', text: "Evaluación geotécnica previa", img: "https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: true }, 
                    { id: 'D', text: "Buscar equipo", img: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=300", isCorrect: false } 
                ] 
            }
        ]
    };

    // Retornamos la instancia del motor de trivia alimentada con estos datos
    return TriviaEngine(data);
};