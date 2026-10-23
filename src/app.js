/**
 * Punto de entrada principal (src/app.js)
 */

import { addRoute, navigate } from './core/router.js';
import { RegisterView } from './views/RegisterView.js';
import { BravometroView } from './views/BravometroView.js';
import { EstacionesView } from './views/EstacionesView.js';
import { EstacionView } from './views/EstacionView.js';
import { EstrellasView } from './views/EstrellasView.js';
import { CongratulationView } from './views/CongratulationView.js';
import { PremioView } from './views/PremioView.js'; 
import { initSecretReset, initPullToRefresh } from './core/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    initSecretReset();
    initPullToRefresh();

    addRoute('/registro', RegisterView);
    addRoute('/bravometro', BravometroView);
    addRoute('/estaciones', EstacionesView);
    addRoute('/juego', EstacionView);
    addRoute('/estrellas', EstrellasView);
    addRoute('/felicidades', CongratulationView);
    addRoute('/premio', PremioView); 
    
    navigate('/registro');
});