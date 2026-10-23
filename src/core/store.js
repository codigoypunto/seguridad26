/**
 * Arquitectura Limpia: Gestor de Estado Global (Pub/Sub con Proxy + LocalStorage)
 */

// Helpers para LocalStorage
const DB_KEY = 'bravos_seguridad_db';
const loadLocalDB = () => JSON.parse(localStorage.getItem(DB_KEY)) || {};
const saveLocalDB = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));

// El estado en memoria solo mantiene al usuario ACTIVO en esta sesión
const initialState = {
    currentUserDni: null,
    userData: null
};

const listeners = new Map();

export const subscribe = (key, callback) => {
    if (!listeners.has(key)) listeners.set(key, []);
    listeners.get(key).push(callback);
    return () => {
        const keyListeners = listeners.get(key);
        const index = keyListeners.indexOf(callback);
        if (index > -1) keyListeners.splice(index, 1);
    };
};

export const store = new Proxy(initialState, {
    set(target, key, value) {
        target[key] = value;
        if (listeners.has(key)) {
            listeners.get(key).forEach(callback => callback(value));
        }
        return true;
    }
});

// Lógica Core: Registro / Login
export const loginUser = (dni, empresa, lugar) => {
    const db = loadLocalDB();
    let isNewUser = false;

    // Si el usuario no existe, creamos su perfil base
    if (!db[dni]) {
        isNewUser = true;
        db[dni] = {
            empresa: empresa,
            lugar: lugar,
            estacion1: 0, estacion2: 0, estacion3: 0, estacion4: 0,
            estacion5: 0, estacion6: 0, estacion7: 0, estacion8: 0,
            estacion9: 0, estacion10: 0, estacion11: 0, estacion12: 0, 
            estacion13: 0,
            puntaje: 0,
            completado: false
        };
        saveLocalDB(db);
    }

    const user = db[dni];
    for (let i = 1; i <= 13; i++) {
        const key = `estacion${i}`;
        const score = Number(user[key]);
        user[key] = Number.isFinite(score) ? score : 0;
    }
    saveLocalDB(db);

    // Actualizamos el estado reactivo con el usuario actual
    store.currentUserDni = dni;
    store.userData = user;

    return isNewUser; // Retornamos si es nuevo para saber si enviar a Google Forms
};

// Función para actualizar el progreso (se usará a partir de la Fase 4)
export const updateProgress = (estacion, estrellas) => {
    if (!store.currentUserDni) return;
    
    const db = loadLocalDB();
    const user = db[store.currentUserDni];
    
    user[`estacion${estacion}`] = estrellas;
    
    // Recalcular puntaje total
    let totalPuntaje = 0;
    let completadas = 0;
    for (let i = 1; i <= 13; i++) {
        const score = Number(user[`estacion${i}`] ?? 0);
        const stationScore = Number.isFinite(score) ? score : 0;
        totalPuntaje += stationScore;
        if (stationScore > 0) completadas++;
    }
    
    user.puntaje = totalPuntaje;
    user.completado = completadas === 13;

    // Guardar y notificar
    saveLocalDB(db);
    store.userData = user; // Dispara la reactividad
};