const app = document.getElementById('app');
const game = new MillionaireGame();
game.onUpdate = render;

const mainMusic = document.getElementById('mainMusic');
const suspenseMusic = document.getElementById('suspenseMusic');
const answerMusic = document.getElementById('answerMusic');

// ----- AUDIO CONTROLS -----
function playMainMusic() {
    suspenseMusic.pause();
    suspenseMusic.currentTime = 0;
    answerMusic.pause();
    answerMusic.currentTime = 0;
    mainMusic.currentTime = 0;
    mainMusic.play().catch(() => {});
}

function playSuspenseMusic() {
    mainMusic.pause();
    mainMusic.currentTime = 0;
    answerMusic.pause();
    answerMusic.currentTime = 0;
    suspenseMusic.currentTime = 0;
    suspenseMusic.play().catch(() => {});
}

function playAnswerMusic() {
    mainMusic.pause();
    mainMusic.currentTime = 0;
    suspenseMusic.pause();
    suspenseMusic.currentTime = 0;
    answerMusic.currentTime = 0;
    answerMusic.play().catch(() => {});
}

function handleMusic() {
    if (game.phase === 'intro' || game.phase === 'disclaimer' || game.phase === 'won' || game.phase === 'lost' || game.phase === 'walked') {
        playMainMusic();
    } else if (game.phase === 'playing') {
        if (game.isAnswerPlaying) {
            playAnswerMusic();
        } else {
            playSuspenseMusic();
        }
    }
}

// ----- CONFETTI -----
function triggerConfetti() {
    if (typeof confetti === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1';
        script.onload = fireConfetti;
        document.head.appendChild(script);
    } else {
        fireConfetti();
    }
}

function fireConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount: Math.floor(particleCount), origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount: Math.floor(particleCount), origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount: Math.floor(particleCount / 2), origin: { x: 0.5, y: Math.random() - 0.2 } });
    }, 250);

    setTimeout(() => {
        clearInterval(interval);
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        confetti({ particleCount: 150, spread: 120, origin: { y: 0.5, x: 0.3 } });
        confetti({ particleCount: 150, spread: 120, origin: { y: 0.5, x: 0.7 } });
    }, 5000);
}

// ----- RENDER -----
function render() {
    app.innerHTML = `
        <div class="stage-bg">
            <div class="container">
                <header class="header">
                    <p class="subtitle">The Quiz Show</p>
                    <h1 class="title">Who Wants to Be a Millionaire</h1>
                </header>
                ${renderContent()}
            </div>
        </div>
    `;
    bindEvents();
    handleMusic();
}

function renderContent() {
    switch (game.phase) {
        case 'intro': return renderIntro();
        case 'disclaimer': return renderDisclaimer();
        case 'playing': return renderGame();
        case 'won': case 'lost': case 'walked': return renderResult();
        default: return '';
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

function renderDisclaimer() {
    return `
        <section class="disclaimer-box">
            <h2 class="disclaimer-title">⚠️ DISCLAIMER !!</h2>
            <div class="disclaimer-text">
                <p>This application is a mock version of the legally protected trademarked game show titled <strong>'Who Wants to Be a Millionaire'</strong>. It is a mock version created for personal and/or educational use and is in no way distributed on app store, play store or any other platform used to generate money using the application. It will not be commercially released, in order to avoid copyright infringement!</p>
                <p class="fun-line">Have fun. 🎮</p>
            </div>
            <button id="resumeGameBtn" class="resume-btn glow-pulse">▶ RESUME GAME</button>
        </section>
    `;
}
function renderGame() {
    const q = game.currentQuestion;
    if (!q) return '<p>Loading...</p>';

    return `
        <div class="game-grid">
            <div>
                <div class="game-bar">
                    <span class="player-name">${game.playerName}</span>
                    <span class="question-info">Question ${game.step + 1} of 15 · playing for <strong>${formatCurrency(game.currentPrize)}</strong></span>
                </div>
                <div class="lifelines">
                    <button class="lifeline-btn" id="fiftyBtn" ${game.usedFifty || game.selected !== null ? 'disabled' : ''}>
                        50 : 50 ${game.usedFifty ? '✓' : ''}
                    </button>
                    <button class="lifeline-btn" id="audienceBtn" ${game.usedAudience || game.selected !== null ? 'disabled' : ''}>
                        Ask the Audience ${game.usedAudience ? '✓' : ''}
                    </button>
                    ${game.step > 0 ? `<button class="lifeline-btn walk" id="walkBtn" ${game.selected !== null ? 'disabled' : ''}>Walk away</button>` : ''}
                </div>
                <div class="question-box">${q.q}</div>
                ${game.votes ? `
                    <div class="audience-box">
                        ${game.votes.map((v, i) => `
                            <div class="audience-item">
                                <div class="audience-bar-wrap"><div class="audience-bar" style="height: ${v}%"></div></div>
                                <span class="audience-label">${LETTERS[i]} · ${v}%</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                <div class="answer-grid">
                    ${q.options.map((opt, i) => {
                        const isHidden = game.hidden.includes(i);
                        const isSelected = game.selected === i;
                        const isAnswer = i === q.answer;
                        let cls = 'hex-plate';
                        if (isHidden) cls += ' hidden';
                        if (game.revealed && isAnswer) cls += ' correct';
                        if (game.revealed && isSelected && !isAnswer) cls += ' wrong';
                        if (isSelected && !game.revealed) cls += ' selected';
                        const disabled = isHidden || game.selected !== null;
                        return `<button class="${cls}" data-index="${i}" ${disabled ? 'disabled' : ''}>
                            <span class="letter">${LETTERS[i]}:</span> <span>${opt}</span>
                        </button>`;
                    }).join('')}
                </div>
            </div>
            <aside>
                <div class="prize-ladder">
                    <ol>
                        ${PRIZE_LADDER.map((amount, i) => {
                            const active = i === game.step;
                            const won = i < game.step;
                            const safe = SAFE_HAVENS.includes(amount);
                            let cls = 'prize-item';
                            if (active) cls += ' active';
                            if (won) cls += ' won';
                            if (safe && !active) cls += ' safe';
                            if (!active && !won) cls += ' future';
                            return `<li class="${cls}"><span class="num">${i + 1}</span> <span>${formatCurrency(amount)}</span></li>`;
                        }).join('')}
                    </ol>
                </div>
            </aside>
        </div>
    `;
}

function renderResult() {
    const isWin = game.phase === 'won';
    if (isWin) setTimeout(triggerConfetti, 300);

    const title = isWin ? `${game.playerName}, you are a millionaire! 🎉` :
                  game.phase === 'walked' ? `${game.playerName} walked away` :
                  `Game over, ${game.playerName}`;

    return `
        <section class="result-box">
            <h2>${title}</h2>
            <p>You are taking home</p>
            <p class="amount">${formatCurrency(game.finalAmount)}</p>
            <button class="play-again" id="playAgainBtn">Play again</button>
        </section>
    `;
}

// ----- EVENTS -----
function bindEvents() {
    const nameInput = document.getElementById('playerNameInput');
    const startBtn = document.getElementById('startBtn');

    if (nameInput) {
        nameInput.addEventListener('input', () => {
            if (startBtn) startBtn.disabled = !nameInput.value.trim();
            game.playerName = nameInput.value;
        });
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && nameInput.value.trim()) {
                if (game.startGame(nameInput.value)) render();
            }
        });
        if (nameInput.value.trim() && startBtn) startBtn.disabled = false;
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const input = document.getElementById('playerNameInput');
            if (input && input.value.trim()) {
                if (game.startGame(input.value)) render();
            }
        });
    }

    // Resume Game button (Disclaimer)
    const resumeBtn = document.getElementById('resumeGameBtn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            game.startQuiz();
        });
    }

    document.querySelectorAll('.hex-plate:not(.hidden)').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            if (!isNaN(idx)) game.selectAnswer(idx);
        });
    });

    document.getElementById('fiftyBtn')?.addEventListener('click', () => { game.useFifty(); });
    document.getElementById('audienceBtn')?.addEventListener('click', () => { game.useAudience(); });
    document.getElementById('walkBtn')?.addEventListener('click', () => { game.walkAway(); });
    document.getElementById('playAgainBtn')?.addEventListener('click', () => { game.reset(); render(); });
}

// ----- START -----
render();

// Auto-play music on first click
function startMusicOnFirstClick() {
    playMainMusic();
    const overlay = document.getElementById('startOverlay');
    if (overlay) overlay.remove();
    document.removeEventListener('click', startMusicOnFirstClick);
}

setTimeout(() => {
    mainMusic.play().then(() => {
        const overlay = document.getElementById('startOverlay');
        if (overlay) overlay.remove();
        document.removeEventListener('click', startMusicOnFirstClick);
    }).catch(() => {
        const overlay = document.createElement('div');
        overlay.id = 'startOverlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;cursor:pointer;background:transparent;';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', startMusicOnFirstClick);
        document.addEventListener('click', startMusicOnFirstClick);
    });
}, 300);