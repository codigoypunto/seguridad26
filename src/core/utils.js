/**
 * Listener secreto para desarrollo: 5 toques al logo limpian la base de datos local
 */
export const initSecretReset = () => {
    let tapCount = 0;
    let tapTimer = null;

    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('logo-anglo')) {
            tapCount++;

            clearTimeout(tapTimer);
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 2000); // Resetea la cuenta tras 2 segundos de inactividad

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