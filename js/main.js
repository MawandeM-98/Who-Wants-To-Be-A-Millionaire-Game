// ============================================================
// MAIN - UI RENDERER
// ============================================================

const app = document.getElementById('app');
const game = new MillionaireGame();
game.onUpdate = render;

// ----- RENDER FUNCTIONS -----

function render() {
    app.innerHTML = `
        <div class="stage-bg">
            <div class="container">
                ${renderHeader()}
                ${renderContent()}
            </div>
        </div>
    `;
    bindEvents();
}

function renderHeader() {
    return `
        <header class="header">
            <p class="subtitle">The Quiz Show</p>
            <h1 class="title">Who Wants to Be a Millionaire</h1>
        </header>
    `;
}

function renderContent() {
    switch (game.phase) {
        case 'intro':
            return renderIntro();
        case 'playing':
            return renderGame();
        case 'won':
        case 'lost':
        case 'walked':
            return renderResult();
        default:
            return '';
    }
}

function renderIntro() {
    return `
        <section class="intro-box">
            <h2>Take the hot seat</h2>
            <p>15 questions. Two lifelines. One million dollars. What's your name?</p>
            <input id="playerNameInput" type="text" placeholder="Enter your name" value="${game.playerName}" />
            <button id="startBtn" class="start-btn" disabled>Start the game</button>
        </section>
    `;
}

function renderGame() {
    const q = game.currentQuestion;
    if (!q) return '<p>Loading...</p>';

    return `
        <div class="game-grid">
            <div>
                ${renderGameBar()}
                ${renderLifelines()}
                ${renderQuestion(q)}
                ${renderAudience()}
                ${renderAnswers(q)}
            </div>
            <aside>
                ${renderPrizeLadder()}
            </aside>
        </div>
    `;
}

function renderGameBar() {
    return `
        <div class="game-bar">
            <span class="player-name">${game.playerName}</span>
            <span class="question-info">
                Question ${game.step + 1} of 15 · playing for <strong>${formatCurrency(game.currentPrize)}</strong>
            </span>
        </div>
    `;
}

function renderLifelines() {
    const canUse = game.selected === null && game.phase === 'playing';
    return `
        <div class="lifelines">
            <button class="lifeline-btn" id="fiftyBtn" ${game.usedFifty || !canUse ? 'disabled' : ''}>
                50 : 50 ${game.usedFifty ? '✓' : ''}
            </button>
            <button class="lifeline-btn" id="audienceBtn" ${game.usedAudience || !canUse ? 'disabled' : ''}>
                Ask the Audience ${game.usedAudience ? '✓' : ''}
            </button>
            ${game.step > 0 ? `
                <button class="lifeline-btn walk" id="walkBtn" ${!canUse ? 'disabled' : ''}>
                    Walk away
                </button>
            ` : ''}
        </div>
    `;
}

function renderQuestion(q) {
    return `
        <div class="question-box">${q.q}</div>
    `;
}

function renderAudience() {
    if (!game.votes) return '';
    return `
        <div class="audience-box">
            ${game.votes.map((v, i) => `
                <div class="audience-item">
                    <div class="audience-bar-wrap">
                        <div class="audience-bar" style="height: ${v}%"></div>
                    </div>
                    <span class="audience-label">${LETTERS[i]} · ${v}%</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderAnswers(q) {
    return `
        <div class="answer-grid">
            ${q.options.map((opt, i) => {
                const isHidden = game.hidden.includes(i);
                const isSelected = game.selected === i;
                const isAnswer = i === q.answer;
                let className = 'hex-plate';
                if (isHidden) className += ' hidden';
                if (game.revealed && isAnswer) className += ' correct';
                if (game.revealed && isSelected && !isAnswer) className += ' wrong';
                if (isSelected && !game.revealed) className += ' selected';
                if (game.selected !== null || game.phase !== 'playing') className += ' pointer-events-none';

                return `
                    <button class="${className}" data-index="${i}" ${isHidden || game.selected !== null ? 'disabled' : ''}>
                        <span class="letter">${LETTERS[i]}:</span>
                        <span>${opt}</span>
                    </button>
                `;
            }).join('')}
        </div>
    `;
}

function renderPrizeLadder() {
    return `
        <div class="prize-ladder">
            <ol>
                ${PRIZE_LADDER.map((amount, i) => {
                    const active = i === game.step;
                    const won = i < game.step;
                    const safe = SAFE_HAVENS.includes(amount);
                    let className = 'prize-item';
                    if (active) className += ' active';
                    if (won) className += ' won';
                    if (safe && !active) className += ' safe';
                    if (!active && !won) className += ' future';
                    return `
                        <li class="${className}">
                            <span class="num">${i + 1}</span>
                            <span>${formatCurrency(amount)}</span>
                        </li>
                    `;
                }).join('')}
            </ol>
        </div>
    `;
}

function renderResult() {
    let title = '';
    let subtitle = '';

    if (game.phase === 'won') {
        title = `${game.playerName}, you are a millionaire!`;
        subtitle = 'You are taking home';
    } else if (game.phase === 'walked') {
        title = `${game.playerName} walked away`;
        subtitle = 'You are taking home';
    } else {
        title = `Game over, ${game.playerName}`;
        subtitle = 'You are taking home';
    }

    return `
        <section class="result-box">
            <h2>${title}</h2>
            <p>${subtitle}</p>
            <p class="amount">${formatCurrency(game.finalAmount)}</p>
            <button class="play-again" id="playAgainBtn">Play again</button>
        </section>
    `;
}

// ----- EVENT BINDING -----

function bindEvents() {
    // Intro
    const nameInput = document.getElementById('playerNameInput');
    const startBtn = document.getElementById('startBtn');

    if (nameInput) {
        nameInput.addEventListener('input', () => {
            const val = nameInput.value.trim();
            if (startBtn) startBtn.disabled = !val;
            game.playerName = nameInput.value;
        });
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && nameInput.value.trim()) {
                if (game.startGame(nameInput.value)) render();
            }
        });
        if (nameInput.value.trim()) {
            if (startBtn) startBtn.disabled = false;
        }
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const input = document.getElementById('playerNameInput');
            if (input && input.value.trim()) {
                if (game.startGame(input.value)) render();
            }
        });
    }

    // Answer buttons
    document.querySelectorAll('.hex-plate:not(.hidden)').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            if (!isNaN(index)) {
                game.selectAnswer(index);
            }
        });
    });

    // Lifelines
    const fiftyBtn = document.getElementById('fiftyBtn');
    if (fiftyBtn) fiftyBtn.addEventListener('click', () => { game.useFifty(); });

    const audienceBtn = document.getElementById('audienceBtn');
    if (audienceBtn) audienceBtn.addEventListener('click', () => { game.useAudience(); });

    const walkBtn = document.getElementById('walkBtn');
    if (walkBtn) walkBtn.addEventListener('click', () => { game.walkAway(); });

    // Play again
    const playAgainBtn = document.getElementById('playAgainBtn');
    if (playAgainBtn) playAgainBtn.addEventListener('click', () => { game.reset(); });
}

// ----- INITIAL RENDER -----
render();