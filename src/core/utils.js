import { db } from '../services/api.js';
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
                openDevModal();
            }
        }
    });
};

const openDevModal = () => {
    if (document.getElementById('devModal')) return;

    const devSettings = JSON.parse(localStorage.getItem('dev_settings')) || {
        syncEnabled: true,
        localDbEnabled: true,
        allowNewCompanies: true
    };

    const modal = document.createElement('div');
    modal.id = 'devModal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 8, 40, 0.95); z-index: 99999;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        padding: 20px; font-family: var(--font-main); color: #FFF; backdrop-filter: blur(10px);
    `;

    modal.innerHTML = `
        <div style="background: var(--color-bg-card-solid); border: 2px solid var(--color-primary); border-radius: 20px; padding: 25px; width: 100%; max-width: 400px; box-shadow: 0 0 30px rgba(255,184,28,0.4);">
            <h3 style="color: var(--color-primary); text-align: center; margin-bottom: 15px; font-size: 18px;">🛠️ MODO DESARROLLADOR</h3>
            
            <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px; margin-bottom: 20px;">
                <label style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
                    <span>Sincronización (Firebase/Forms):</span>
                    <input type="checkbox" id="devSync" ${devSettings.syncEnabled ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--color-primary);">
                </label>

                <label style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
                    <span>Guardado Local (LocalStorage):</span>
                    <input type="checkbox" id="devLocal" ${devSettings.localDbEnabled ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--color-primary);">
                </label>

                <label style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
                    <span>Permitir Nuevas Empresas (OTROS):</span>
                    <input type="checkbox" id="devNewComp" ${devSettings.allowNewCompanies ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--color-primary);">
                </label>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;">
                <button id="devMaxStars" class="btn-primary" style="padding: 10px; font-size: 13px; background: linear-gradient(180deg, #00E676 0%, #00A859 100%); color: #000;">⭐ PONER 4 ESTRELLAS A TODO (TEST)</button>
                <button id="devClearLocal" class="btn-secondary" style="padding: 10px; font-size: 13px; border-color: var(--color-danger); color: var(--color-danger);">🗑️ BORRAR DATOS LOCALES</button>
                <button id="devClearFirebase" class="btn-secondary" style="padding: 10px; font-size: 13px; background: rgba(255,0,0,0.3); border-color: var(--color-danger); color: #FFF;">🔥 PURGAR DATOS DE FIREBASE</button>
                <button id="devFactoryReset" class="btn-secondary" style="padding: 10px; font-size: 13px; background: rgba(255,42,85,0.2); border-color: var(--color-danger);">⚠️ RESET TOTAL DE FÁBRICA</button>
                <button id="devClose" class="btn-primary" style="padding: 10px; font-size: 13px; margin-top: 5px;">CERRAR Y GUARDAR</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const saveSettings = () => {
        const settings = {
            syncEnabled: document.getElementById('devSync').checked,
            localDbEnabled: document.getElementById('devLocal').checked,
            allowNewCompanies: document.getElementById('devNewComp').checked
        };
        localStorage.setItem('dev_settings', JSON.stringify(settings));
    };

    modal.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', saveSettings);
    });

    document.getElementById('devMaxStars').addEventListener('click', () => {
        const dni = localStorage.getItem('current_dni') || prompt("Ingresa el DNI del usuario activo:");
        if (!dni) return;
        const dbLocal = JSON.parse(localStorage.getItem('bravos_seguridad_db')) || {};
        if (!dbLocal[dni]) {
            dbLocal[dni] = { empresa: "ANGLOAMERICAN", lugar: "TÓTEM", puntaje: 52, completado: true };
        } else {
            dbLocal[dni].puntaje = 52;
            dbLocal[dni].completado = true;
        }
        for (let i = 1; i <= 13; i++) dbLocal[dni][`estacion${i}`] = 4;
        localStorage.setItem('bravos_seguridad_db', JSON.stringify(dbLocal));
        alert("✅ ¡Progreso actualizado al máximo (52 pts)! Recarga la página.");
        window.location.reload();
    });

    document.getElementById('devClearLocal').addEventListener('click', () => {
        if (confirm("¿Borrar almacenamiento local?")) {
            localStorage.removeItem('bravos_seguridad_db');
            localStorage.removeItem('current_dni');
            window.location.reload();
        }
    });

    document.getElementById('devClearFirebase').addEventListener('click', async () => {
        if (confirm("⚠️ PELIGRO: ¿Estás seguro de borrar TODOS los registros de Firebase Firestore?")) {
            try {
                const querySnapshot = await getDocs(collection(db, "registros"));
                const deletePromises = querySnapshot.docs.map((document) => 
                    deleteDoc(doc(db, "registros", document.id))
                );
                await Promise.all(deletePromises);
                alert("🔥 Todos los datos de Firebase han sido eliminados con éxito.");
            } catch (error) {
                console.error("Error al borrar Firebase:", error);
            }
        }
    });

    document.getElementById('devFactoryReset').addEventListener('click', () => {
        if (confirm("⚠️ ADVERTENCIA: ¿Restablecer toda la app a cero?")) {
            localStorage.clear();
            window.location.reload();
        }
    });

    document.getElementById('devClose').addEventListener('click', () => {
        modal.remove();
    });
};

export const initPullToRefresh = () => {
    let startY = 0;
    let currentY = 0;
    let isPulling = false;
    const threshold = 120;

    const ptrIndicator = document.createElement('div');
    ptrIndicator.className = 'ptr-indicator';
    ptrIndicator.innerHTML = `<div class="ptr-icon">🔄</div>`;
    document.body.appendChild(ptrIndicator);

    window.addEventListener('touchstart', (e) => {
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
            setTimeout(() => { window.location.reload(); }, 300);
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