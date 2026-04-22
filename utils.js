// Funciones de utilidad - Trivia Transformaciones Lineales

// ── FUNCIONES DE NAVEGACIÓN ──
function showStart() {
    document.querySelector('.start-screen').classList.add('active');
    document.querySelector('.rules-screen').classList.remove('active');
    document.querySelector('.game-screen').classList.remove('active');
    document.querySelector('.results-screen').classList.remove('active');
}

function showRules() {
    document.querySelector('.start-screen').classList.remove('active');
    document.querySelector('.rules-screen').classList.add('active');
    document.querySelector('.game-screen').classList.remove('active');
    document.querySelector('.results-screen').classList.remove('active');
}

// ── FUNCIONES DE ARRAY ──
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ── FUNCIONES DE TIEMPO ──
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ── FUNCIONES DE TRACKER/PROGRESO ──
function buildProgressTracker() {
    const tracker = document.getElementById('progressTracker');
    tracker.innerHTML = '';
    for (let i = 0; i < gameQuestions.length; i++) {
        const item = document.createElement('div');
        item.className = 'progress-item';
        item.textContent = i + 1;
        item.id = `progress-${i}`;
        if (i === currentQuestion) {
            item.classList.add('active');
        }
        tracker.appendChild(item);
    }
}

function updateProgressTracker() {
    // Actualizar todos los items de progreso
    for (let i = 0; i < gameQuestions.length; i++) {
        const item = document.getElementById(`progress-${i}`);
        item.classList.remove('active', 'correct', 'incorrect');
        
        if (questionStates[i] === 'correct') {
            item.classList.add('correct');
            item.textContent = '✔️';
        } else if (questionStates[i] === 'incorrect') {
            item.classList.add('incorrect');
            item.textContent = '✗';
        } else if (i === currentQuestion) {
            item.classList.add('active');
            item.textContent = i + 1;
        } else {
            item.textContent = i + 1;
        }
    }
}

// ── FUNCIONES DE VALIDACIÓN ──
function isGameReady() {
    return gameQuestions && gameQuestions.length > 0;
}

function hasAnswered() {
    return answered;
}

function isLastQuestion() {
    return currentQuestion >= gameQuestions.length - 1;
}
