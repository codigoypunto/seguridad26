import { store } from '../core/store.js';
import { Station1 } from './stations/Station1.js';
import { Station3 } from './stations/Station3.js';
import { StationCode } from './stations/StationCode.js';

export const EstacionView = () => {
    let currentStationModule = null;

    const render = async () => {
        const stationId = store.currentStation || 1;

        // Routing Interno Modular
        switch (stationId) {
            case 1: currentStationModule = Station1(); break;
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
                // Fallback temporal para Grupo C
                currentStationModule = {
                    render: async () => {
                        const frag = document.createDocumentFragment();
                        const div = document.createElement('div');
                        div.className = 'view-container';
                        div.innerHTML = `<h2 style="color:var(--color-primary); margin-top:50px;">ESTACIÓN ${stationId} EN CONSTRUCCIÓN</h2><button class="btn-primary" onclick="window.history.back()">VOLVER</button>`;
                        frag.appendChild(div);
                        return frag;
                    },
                    afterRender: () => {}
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