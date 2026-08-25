// ============================================================
// GAME LOGIC
// ============================================================

class MillionaireGame {
    constructor() {
        this.phase = 'intro'; // intro | playing | won | lost | walked
        this.playerName = '';
        this.questions = [];
        this.step = 0;
        this.selected = null;
        this.revealed = false;
        this.hidden = [];
        this.votes = null;
        this.usedFifty = false;
        this.usedAudience = false;
        this.isLocked = false;
        this.onUpdate = null;
    }

    get currentQuestion() {
        return this.questions[this.step] || null;
    }

    get currentPrize() {
        return PRIZE_LADDER[this.step] || 0;
    }

    get finalAmount() {
        if (this.phase === 'won') return 1000000;
        if (this.phase === 'walked') {
            return this.step > 0 ? PRIZE_LADDER[this.step - 1] : 0;
        }
        if (this.phase === 'lost') {
            return getSafeAmount(this.step);
        }
        return 0;
    }

    startGame(name) {
        const trimmed = name.trim();
        if (!trimmed) return false;
        this.playerName = trimmed;
        this.questions = buildRun();
        this.step = 0;
        this.phase = 'playing';
        this.selected = null;
        this.revealed = false;
        this.hidden = [];
        this.votes = null;
        this.usedFifty = false;
        this.usedAudience = false;
        this.isLocked = false;
        return true;
    }

    selectAnswer(index) {
        if (this.isLocked) return;
        if (this.selected !== null) return;
        if (!this.currentQuestion) return;
        if (this.phase !== 'playing') return;

        this.selected = index;
        this.isLocked = true;

        setTimeout(() => {
            this.revealed = true;
            this.isLocked = false;

            setTimeout(() => {
                if (index === this.currentQuestion.answer) {
                    if (this.step === PRIZE_LADDER.length - 1) {
                        this.phase = 'won';
                    } else {
                        this.step++;
                        this.selected = null;
                        this.revealed = false;
                        this.hidden = [];
                        this.votes = null;
                        this.isLocked = false;
                    }
                } else {
                    this.phase = 'lost';
                }
                if (this.onUpdate) this.onUpdate();
            }, 600);
        }, 800);

        if (this.onUpdate) this.onUpdate();
    }

    useFifty() {
        if (this.usedFifty) return;
        if (!this.currentQuestion) return;
        if (this.selected !== null) return;
        if (this.phase !== 'playing') return;

        const wrong = [0, 1, 2, 3].filter(i => i !== this.currentQuestion.answer);
        const shuffled = wrong.sort(() => Math.random() - 0.5);
        const toHide = shuffled.slice(0, 2);
        this.hidden = toHide;
        this.usedFifty = true;
        if (this.onUpdate) this.onUpdate();
    }

    useAudience() {
        if (this.usedAudience) return;
        if (!this.currentQuestion) return;
        if (this.selected !== null) return;
        if (this.phase !== 'playing') return;

        this.votes = generateAudienceVotes(this.currentQuestion, this.hidden);
        this.usedAudience = true;
        if (this.onUpdate) this.onUpdate();
    }

    walkAway() {
        if (this.step === 0) return;
        if (this.selected !== null) return;
        if (this.phase !== 'playing') return;

        this.phase = 'walked';
        if (this.onUpdate) this.onUpdate();
    }

    reset() {
        this.phase = 'intro';
        this.playerName = '';
        this.questions = [];
        this.step = 0;
        this.selected = null;
        this.revealed = false;
        this.hidden = [];
        this.votes = null;
        this.usedFifty = false;
        this.usedAudience = false;
        this.isLocked = false;
        if (this.onUpdate) this.onUpdate();
    }
}