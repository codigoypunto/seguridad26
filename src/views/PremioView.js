/**
 * src/views/PremioView.js
 * Módulo de la Pantalla de Premio (Generador de Wallpaper con Canvas)
 */

import { store } from '../core/store.js';
import { navigate } from '../core/router.js';

export const PremioView = () => {
    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container premio-view slide-in-bottom';

        // Estructura de la vista: Header, Contenedor de Previsualización y Botón de Descarga
        container.innerHTML = `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>

            <div class="trivia-header pop-in" style="margin-top: 10px;">
                <h2 class="title-trivia" style="color: var(--color-primary);">TU INSIGNIA OFICIAL</h2>
                <p class="subtitle-trivia" style="font-size: 13px;">Has demostrado ser un Maestro de la Seguridad.</p>
            </div>

            <div class="wallpaper-container bounce-in-top">
                <!-- Estado de Carga -->
                <div id="loadingState" class="loading-overlay">
                    <div class="spinner"></div>
                    <span>FORJANDO PREMIO...</span>
                </div>
                
                <!-- Imagen donde se inyectará el resultado del Canvas -->
                <img id="wallpaperPreview" class="wallpaper-preview" alt="Tu Wallpaper de Seguridad">
            </div>

            <!-- Botón de Descarga (Etiqueta <a> para forzar la descarga nativa) -->
            <a id="btnDownload" class="btn-primary pulse-btn btn-gold-glow" style="width: 100%; display: none; text-decoration: none; text-align: center; box-sizing: border-box; padding: 16px;">
                DESCARGAR WALLPAPER
            </a>

            <button id="btnVolver" class="btn-secondary" style="margin-top: 15px; width: 100%; display: none;">
                VOLVER AL INICIO
            </button>

            <!-- Canvas oculto usado exclusivamente para el renderizado en alta calidad -->
            <canvas id="hiddenCanvas" style="display: none;"></canvas>
        `;

        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        // Recuperar el alias del store (fallback por si entra directo)
        const userAlias = store.userAlias ? store.userAlias.toUpperCase() : "BRAV@";
        
        const canvas = document.getElementById('hiddenCanvas');
        const ctx = canvas.getContext('2d');
        const previewImg = document.getElementById('wallpaperPreview');
        const loadingState = document.getElementById('loadingState');
        const btnDownload = document.getElementById('btnDownload');
        const btnVolver = document.getElementById('btnVolver');

        // 1. Cargar la imagen base
        const baseImage = new Image();
        baseImage.src = 'src/images/youWin.jpg'; 
        // Importante si la imagen viene de otro dominio, aquí asumimos local
        baseImage.crossOrigin = "Anonymous"; 

        baseImage.onload = () => {
            // 2. Ajustar el canvas al tamaño EXACTO de la imagen original para mantener calidad
            canvas.width = baseImage.width;
            canvas.height = baseImage.height;

            // 3. Dibujar la imagen de fondo en el canvas
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

            // 4. Configurar la tipografía y estilo del texto
            // Usamos un tamaño relativo al ancho de la imagen para que sea responsivo a la resolución
            const fontSize = Math.floor(canvas.width * 0.08); 
            ctx.font = `900 ${fontSize}px 'Arial', sans-serif`; 
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Coordenadas donde se dibujará el texto (Aproximación basada en la placa metálica de youWin.jpg)
            // NOTA: Si el texto queda muy arriba o muy abajo, ajusta el multiplicador "0.55"
            const xPos = canvas.width / 2;
            const yPos = canvas.height * 0.54; 

            // Efecto de texto grabado en metal (Sombra clara abajo, texto oscuro)
            ctx.fillStyle = "#1A1A1A"; // Color casi negro para contrastar con la placa gris
            ctx.shadowColor = "rgba(255, 255, 255, 0.7)"; // Brillo inferior
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 3;

            // 5. Renderizar el texto en el canvas
            ctx.fillText(userAlias, xPos, yPos);

            // Restablecer sombras por seguridad
            ctx.shadowColor = "transparent";

            // 6. Exportar el Canvas a Base64 (Calidad 90% para no hacerlo tan pesado)
            const dataURL = canvas.toDataURL("image/jpeg", 0.9);

            // 7. Actualizar el DOM
            previewImg.src = dataURL;
            
            // Cuando la previsualización termine de cargar visualmente en el DOM
            previewImg.onload = () => {
                loadingState.style.display = 'none';
                previewImg.classList.add('loaded'); // Activa la transición CSS
                
                // Configurar el botón de descarga nativa
                btnDownload.href = dataURL;
                // Formatear el nombre del archivo eliminando espacios
                const safeAlias = userAlias.replace(/\s+/g, '_');
                btnDownload.download = `Bravo_${safeAlias}.jpg`;
                btnDownload.style.display = 'block';
                btnVolver.style.display = 'block';
            };
        };

        baseImage.onerror = () => {
            console.error("Error al cargar la imagen youWin.jpg. Verifica la ruta.");
            loadingState.innerHTML = "<span style='color: var(--color-danger);'>Error al cargar imagen base.</span>";
        };

        // Evento para el botón volver por si quieren reiniciar o ir al menú
        btnVolver.addEventListener('click', () => {
            navigate('/bravometro');
        });
    };

    const destroy = () => {};

    return { render, afterRender, destroy };
};