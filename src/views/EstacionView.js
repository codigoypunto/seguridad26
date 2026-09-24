import { store } from '../core/store.js';
import { navigate } from '../core/router.js';
import { Station1 } from './stations/Station1.js';
import { Station2 } from './stations/Station2.js'; // Importación añadida
import { Station3 } from './stations/Station3.js';
import { StationCode } from './stations/StationCode.js';

export const EstacionView = () => {
    let currentStationModule = null;

    const render = async () => {
        const stationId = store.currentStation || 1;

        switch (stationId) {
            case 1: currentStationModule = Station1(); break;
            case 2: currentStationModule = Station2(); break; // Módulo activado
            case 3: currentStationModule = Station3(); break;
            case 7: 
            case 8: 
            case 9: 
            case 10: 
            case 11: 
            case 12: 
                currentStationModule = StationCode(stationId); 
                break;
            default:
                currentStationModule = {
                    render: async () => {
                        const frag = document.createDocumentFragment();
                        const div = document.createElement('div');
                        div.className = 'view-container station-engine-view slide-in-right';
                        div.innerHTML = `
                            <div class="brand-header">
                                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
                            </div>
                            <div class="card-glass" style="margin-top: auto; margin-bottom: auto; text-align: center; padding: 25px 20px;">
                                <div style="font-size: 50px; margin-bottom: 10px;">🚧</div>
                                <h2 style="color: var(--color-cyan-glow); font-size: 20px; font-weight: 900; margin-bottom: 10px;">
                                    ESTACIÓN EN CONSTRUCCIÓN
                                </h2>
                                <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 20px; line-height: 1.4;">
                                    Estamos preparando el minijuego interactivo para esta sección.
                                </p>
                                <button id="btnBackFromConstruction" class="btn-primary pulse-btn">
                                    VOLVER A ESTACIONES
                                </button>
                            </div>
                        `;
                        frag.appendChild(div);
                        return frag;
                    },
                    afterRender: () => {
                        const btnBack = document.getElementById('btnBackFromConstruction');
                        if (btnBack) {
                            btnBack.addEventListener('click', () => {
                                navigate('/estaciones');
                            });
                        }
                    }
                };
        }

        return await currentStationModule.render();
    };

    const afterRender = () => {
        if (currentStationModule && currentStationModule.afterRender) {
            currentStationModule.afterRender();
        }
    };

    const destroy = () => {
        currentStationModule = null;
    };

    return { render, afterRender, destroy };
};