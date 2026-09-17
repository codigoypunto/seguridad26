/**
 * Arquitectura Limpia: Enrutador Vanilla JS
 */

const routes = {};
let currentView = null;

// Registrar una nueva ruta y su componente/vista correspondiente
export const addRoute = (path, viewBuilder) => {
    routes[path] = viewBuilder;
};

// Función principal para navegar
export const navigate = async (path) => {
    const root = document.getElementById('root');
    
    if (routes[path]) {
        // 1. Limpieza de memoria (Desmontar vista anterior)
        if (currentView && typeof currentView.destroy === 'function') {
            currentView.destroy();
        }
        
        // 2. Limpiar DOM
        root.innerHTML = '';
        
        // 3. Inicializar nueva vista
        currentView = routes[path]();
        
        // 4. Renderizar usando DocumentFragment (Mejor Rendimiento)
        const fragment = await currentView.render();
        root.appendChild(fragment);
        
        // 5. Ejecutar lógica post-renderizado (Event Listeners)
        if (typeof currentView.afterRender === 'function') {
            currentView.afterRender();
        }
    } else {
        console.error(`Error de Router: La ruta ${path} no existe.`);
    }
};