import { store, updateProgress } from '../../core/store.js';
import { navigate } from '../../core/router.js';

export const TriviaEngine = (triviaData) => {
    let state = {
        questionIndex: 0,
        selectedOptionId: null,
        hasVerified: false,
        score: 0
    };

    const generateHTML = () => {
        const currentQ = triviaData.questions[state.questionIndex];
        
        let progressHTML = `<div class="progress-bar">`;
        triviaData.questions.forEach((q, idx) => {
            const isActive = idx === state.questionIndex;
            const isPast = idx < state.questionIndex;
            progressHTML += `
                <div class="progress-step ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}">
                    <div class="step-circle">${q.step}</div>
                    <div class="step-label">${q.stepName}</div>
                </div>
                ${idx < triviaData.questions.length - 1 ? '<div class="progress-line"></div>' : ''}
            `;
        });
        progressHTML += `</div>`;

        let optionsHTML = currentQ.options.map(opt => {
            let cardClasses = 'option-card';
            let iconHTML = `<div class="opt-letter">${opt.id}</div>`;

            if (state.hasVerified) {
                if (opt.isCorrect) {
                    cardClasses += ' correct';
                    iconHTML = `<div class="opt-letter correct-icon">✓</div>`;
                } else if (state.selectedOptionId === opt.id) {
                    cardClasses += ' incorrect';
                    iconHTML = `<div class="opt-letter incorrect-icon">✗</div>`;
                }
            } else if (state.selectedOptionId === opt.id) {
                cardClasses += ' selected';
            }

            return `
                <div class="${cardClasses}" data-id="${opt.id}">
                    <div class="opt-image" style="background-image: url('${opt.img}')">${iconHTML}</div>
                    <div class="opt-text">${opt.text}</div>
                </div>
            `;
        }).join('');

        let btnText = state.hasVerified ? "CONTINUAR" : "VERIFICAR";
        let btnClass = state.selectedOptionId ? "btn-primary pulse-once" : "btn-disabled";

        return `
            <div class="brand-header">
                <img src="src/images/logoAngloamerica_bn.svg" alt="Anglo American" class="logo-anglo">
            </div>
            <div class="trivia-header pop-in">
                <h2 class="title-trivia">${triviaData.title}</h2>
                <p class="subtitle-trivia">${triviaData.subtitle}</p>
            </div>
            ${progressHTML}
            <div class="question-container slide-in-bottom">
                <h3 class="stage-title text-primary">${currentQ.stageTitle}</h3>
                <p class="question-text">${currentQ.text}</p>
            </div>
            <div class="options-grid fade-in">${optionsHTML}</div>
            <button id="actionBtn" class="${btnClass}" ${!state.selectedOptionId && !state.hasVerified ? 'disabled' : ''}>${btnText}</button>
        `;
    };

    const render = async () => {
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.className = 'view-container station-engine-view slide-in-right';
        container.id = 'stationContainer';
        container.innerHTML = generateHTML();
        fragment.appendChild(container);
        return fragment;
    };

    const afterRender = () => {
        const container = document.getElementById('stationContainer');
        if (!container) return;

        container.addEventListener('click', (e) => {
            const card = e.target.closest('.option-card');
            if (card && !state.hasVerified) {
                state.selectedOptionId = card.getAttribute('data-id');
                container.innerHTML = generateHTML(); 
            }

            const btn = e.target.closest('#actionBtn');
            if (btn && !btn.disabled) {
                if (!state.hasVerified) {
                    const currentQ = triviaData.questions[state.questionIndex];
                    const selected = currentQ.options.find(o => o.id === state.selectedOptionId);
                    if (selected.isCorrect) state.score++;
                    state.hasVerified = true;
                    container.innerHTML = generateHTML();
                } else {
                    if (state.questionIndex < triviaData.questions.length - 1) {
                        state.questionIndex++;
                        state.selectedOptionId = null;
                        state.hasVerified = false;
                        container.innerHTML = generateHTML();
                    } else {
                        updateProgress(store.currentStation, state.score);
                        navigate('/estrellas'); 
                    }
                }
            }
        });
    };

    return { render, afterRender };
};