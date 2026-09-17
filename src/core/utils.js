/**
 * Utilitarios Globales: Botón Secreto y Gesto Pull-To-Refresh
 */

export const initSecretReset = () => {
    let tapCount = 0;
    let tapTimer = null;

    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('logo-anglo')) {
            tapCount++;

            clearTimeout(tapTimer);
            tapTimer = setTimeout(() => { tapCount = 0; }, 2000);

            if (tapCount >= 5) {
                tapCount = 0;
                clearTimeout(tapTimer);
                const confirmReset = confirm("⚠️ MODO DESARROLLADOR: ¿Deseas borrar todo el progreso local y reiniciar la app?");
                if (confirmReset) {
                    localStorage.clear();
                    alert("Almacenamiento local borrado con éxito.");
                    window.location.reload();
                }
            }
        }
    });
};

/**
 * Gesto nativo Pull-to-Refresh en móviles
 */
export const initPullToRefresh = () => {
    let startY = 0;
    let currentY = 0;
    let isPulling = false;
    const threshold = 120; // Píxeles necesarios para recargar

    // Crear elemento indicador visual
    const ptrIndicator = document.createElement('div');
    ptrIndicator.className = 'ptr-indicator';
    ptrIndicator.innerHTML = `
        <div class="ptr-icon">🔄</div>
    `;
    document.body.appendChild(ptrIndicator);

    window.addEventListener('touchstart', (e) => {
        // Solo permitir si estamos en el borde superior
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isPulling) return;
        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;

        if (deltaY > 0 && startY < 100) {
            const pullDistance = Math.min(deltaY * 0.4, 80);
            ptrIndicator.style.transform = `translate3d(-50%, ${pullDistance}px, 0) rotate(${pullDistance * 4}deg)`;
            ptrIndicator.style.opacity = `${pullDistance / 80}`;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        if (!isPulling) return;
        const deltaY = currentY - startY;

        if (deltaY > threshold && startY < 100) {
            ptrIndicator.style.transform = `translate3d(-50%, 60px, 0) rotate(360deg)`;
            ptrIndicator.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } else {
            ptrIndicator.style.transform = `translate3d(-50%, -60px, 0)`;
            ptrIndicator.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            ptrIndicator.style.opacity = '0';
        }

        isPulling = false;
        startY = 0;
        currentY = 0;
    });
};