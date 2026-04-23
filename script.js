const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextCanvas');
const nextCtx = nextCanvas.getContext('2d');
const questionModal = document.getElementById('questionModal');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

// Colores de las piezas
const COLORS = [
    '#00d4ff', // Cyan - I
    '#ff006e', // Magenta - T
    '#ff9d00', // Orange - L
    '#00ff7f', // Green - S
    '#7c3aed', // Purple - Z
    '#ffd700', // Yellow - O
    '#ff4444'  // Red - J
];

// Piezas de Tetris
const PIECES = [
    // I
    [
        [1, 1, 1, 1]
    ],
    // T
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    // L
    [
        [1, 0],
        [1, 0],
        [1, 1]
    ],
    // S
    [
        [0, 1, 1],
        [1, 1, 0]
    ],
    // Z
    [
        [1, 1, 0],
        [0, 1, 1]
    ],
    // O
    [
        [1, 1],
        [1, 1]
    ],
    // J
    [
        [0, 1],
        [0, 1],
        [1, 1]
    ]
];

let gameBoard = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
let currentPiece = null;
let nextPiece = null;
let currentX = 0;
let currentY = 0;
let score = 0;
let lines = 0;
let level = 1;
let gameRunning = false;
let gamePaused = false;
let gameSpeed = 800;
let gameLoopId = null;
let questionsAnswered = 0;
let questionAnswered = false;
let waitingForQuestion = false;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const statusEl = document.getElementById('status');
const scoreEl = document.getElementById('score');
const linesEl = document.getElementById('lines');
const levelEl = document.getElementById('level');

// Botones táctiles
const rotateBtnTouch = document.getElementById('rotateBtnTouch');
const leftBtnTouch = document.getElementById('leftBtnTouch');
const downBtnTouch = document.getElementById('downBtnTouch');
const rightBtnTouch = document.getElementById('rightBtnTouch');

// Variables para touch
let touchStartX = 0;
let touchStartY = 0;

// Event listeners
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
document.addEventListener('keydown', handleKeyDown);

// Touch button listeners
rotateBtnTouch.addEventListener('click', () => handleTouchRotate());
leftBtnTouch.addEventListener('click', () => handleTouchMove(-1));
downBtnTouch.addEventListener('click', () => handleTouchMove(1));
rightBtnTouch.addEventListener('click', () => handleTouchMove(1));

// Swipe gestures
canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchend', handleTouchSwipe, false);

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchSwipe(e) {
    if (!gameRunning || gamePaused) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Si el movimiento es más horizontal que vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 30) {
            // Deslizar a la derecha
            if (canMovePiece(currentPiece, currentX + 1, currentY)) {
                currentX++;
            }
        } else if (diffX < -30) {
            // Deslizar a la izquierda
            if (canMovePiece(currentPiece, currentX - 1, currentY)) {
                currentX--;
            }
        }
    } else if (diffY > 30) {
        // Deslizar hacia abajo
        if (canMovePiece(currentPiece, currentX, currentY + 1)) {
            currentY++;
            score += 1;
            updateScoreBoard();
        }
    } else if (diffY < -30) {
        // Deslizar hacia arriba (rotación)
        const rotated = rotatePiece(currentPiece.shape);
        if (canMovePiece({ shape: rotated, color: currentPiece.color }, currentX, currentY)) {
            currentPiece.shape = rotated;
        }
    }

    draw();
}

function handleTouchRotate() {
    if (!gameRunning || gamePaused) return;
    const rotated = rotatePiece(currentPiece.shape);
    if (canMovePiece({ shape: rotated, color: currentPiece.color }, currentX, currentY)) {
        currentPiece.shape = rotated;
    }
    draw();
}

function handleTouchMove(direction) {
    if (!gameRunning || gamePaused) return;

    // direction: -1 = left, 1 = right (para los botones laterales)
    // pero para el botón down, se maneja diferente

    if (direction === -1) {
        // Left
        if (canMovePiece(currentPiece, currentX - 1, currentY)) {
            currentX--;
        }
    } else if (direction === 1) {
        // Right (cuando viene de rightBtnTouch)
        if (canMovePiece(currentPiece, currentX + 1, currentY)) {
            currentX++;
        }
    }

    draw();
}

// Reemplazar el event listener de abajo para el botón down
downBtnTouch.addEventListener('click', () => {
    if (!gameRunning || gamePaused) return;
    if (canMovePiece(currentPiece, currentX, currentY + 1)) {
        currentY++;
        score += 1;
        updateScoreBoard();
    }
    draw();
});

function getRandomPiece() {
    const index = Math.floor(Math.random() * PIECES.length);
    return {
        shape: PIECES[index],
        color: COLORS[index]
    };
}

function rotatePiece(piece) {
    const rotated = [];
    for (let i = 0; i < piece[0].length; i++) {
        const row = [];
        for (let j = piece.length - 1; j >= 0; j--) {
            row.push(piece[j][i]);
        }
        rotated.push(row);
    }
    return rotated;
}

function canMovePiece(piece, x, y) {
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
                const boardX = x + col;
                const boardY = y + row;

                if (boardX < 0 || boardX >= COLS || boardY >= ROWS) {
                    return false;
                }

                if (boardY >= 0 && gameBoard[boardY][boardX]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function placePiece(piece, x, y) {
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
                const boardY = y + row;
                const boardX = x + col;
                if (boardY >= 0) {
                    gameBoard[boardY][boardX] = piece.color;
                }
            }
        }
    }
}

function clearLines() {
    let clearedLines = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (gameBoard[row].every(cell => cell !== 0)) {
            gameBoard.splice(row, 1);
            gameBoard.unshift(Array(COLS).fill(0));
            clearedLines++;
        }
    }

    if (clearedLines > 0) {
        const points = [0, 100, 300, 500, 800];
        score += points[clearedLines] * level;
        lines += clearedLines;
        level = Math.floor(lines / 10) + 1;
        gameSpeed = Math.max(100, 800 - (level - 1) * 50);

        updateScoreBoard();

        // Mostrar pregunta después de limpiar líneas
        if (typeof allQuestions !== 'undefined' && allQuestions.length > 0) {
            waitingForQuestion = true;
            gamePaused = true;
            statusEl.textContent = 'Responde la pregunta para continuar';
            pauseBtn.textContent = 'Resume';
            showQuestion();
        }
    }
}

function updateScoreBoard() {
    scoreEl.textContent = score;
    linesEl.textContent = lines;
    levelEl.textContent = level;
}

function draw() {
    ctx.fillStyle = '#0f0f1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(100, 150, 255, 0.1)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= COLS; i++) {
        ctx.beginPath();
        ctx.moveTo(i * BLOCK_SIZE, 0);
        ctx.lineTo(i * BLOCK_SIZE, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= ROWS; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * BLOCK_SIZE);
        ctx.lineTo(canvas.width, i * BLOCK_SIZE);
        ctx.stroke();
    }

    // Bloques fijos
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (gameBoard[row][col]) {
                drawBlock(col, row, gameBoard[row][col]);
            }
        }
    }

    // Pieza actual
    if (currentPiece) {
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    drawBlock(currentX + col, currentY + row, currentPiece.color, true);
                }
            }
        }
    }
}

function drawBlock(col, row, color, isCurrent = false) {
    const x = col * BLOCK_SIZE;
    const y = row * BLOCK_SIZE;

    // Bloque principal
    ctx.fillStyle = color;
    ctx.fillRect(x + 2, y + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);

    // Borde claro
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 2, y + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);

    // Borde oscuro
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 3, y + 3, BLOCK_SIZE - 6, BLOCK_SIZE - 6);

    if (isCurrent) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(x + 2, y + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);
    }
}

function drawNext() {
    nextCtx.fillStyle = '#0f0f1e';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);

    nextCtx.strokeStyle = 'rgba(100, 150, 255, 0.1)';
    nextCtx.lineWidth = 0.5;

    if (nextPiece) {
        const shape = nextPiece.shape;
        const startX = (nextCanvas.width / 30 - shape[0].length) / 2;
        const startY = (nextCanvas.height / 30 - shape.length) / 2;

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const x = (startX + col) * 30;
                    const y = (startY + row) * 30;

                    nextCtx.fillStyle = nextPiece.color;
                    nextCtx.fillRect(x + 2, y + 2, 26, 26);
                    nextCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    nextCtx.lineWidth = 1;
                    nextCtx.strokeRect(x + 2, y + 2, 26, 26);
                }
            }
        }
    }
}

function spawnPiece() {
    if (!nextPiece) {
        nextPiece = getRandomPiece();
    }

    currentPiece = nextPiece;
    nextPiece = getRandomPiece();

    currentX = Math.floor((COLS - currentPiece.shape[0].length) / 2);
    currentY = 0;

    if (!canMovePiece(currentPiece, currentX, currentY)) {
        endGame();
        return false;
    }

    drawNext();
    return true;
}

function handleKeyDown(e) {
    if (!gameRunning || gamePaused) return;

    switch (e.key.toLowerCase()) {
        case 'arrowleft':
            e.preventDefault();
            if (canMovePiece(currentPiece, currentX - 1, currentY)) {
                currentX--;
            }
            break;
        case 'arrowright':
            e.preventDefault();
            if (canMovePiece(currentPiece, currentX + 1, currentY)) {
                currentX++;
            }
            break;
        case 'arrowdown':
            e.preventDefault();
            if (canMovePiece(currentPiece, currentX, currentY + 1)) {
                currentY++;
                score += 1;
                updateScoreBoard();
            }
            break;
        case 'arrowup':
            e.preventDefault();
            const rotated = rotatePiece(currentPiece.shape);
            if (canMovePiece({ shape: rotated, color: currentPiece.color }, currentX, currentY)) {
                currentPiece.shape = rotated;
            }
            break;
        case ' ':
            e.preventDefault();
            togglePause();
            break;
    }
    draw();
}

function update() {
    if (canMovePiece(currentPiece, currentX, currentY + 1)) {
        currentY++;
    } else {
        placePiece(currentPiece, currentX, currentY);
        clearLines();
        if (!spawnPiece()) {
            return;
        }
    }
}

function gameLoop() {
    if (!gamePaused) {
        update();
        draw();
    }
}

function startGame() {
    if (gameRunning) return;

    gameBoard = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    score = 0;
    lines = 0;
    level = 1;
    gameSpeed = 800;
    questionsAnswered = 0; // Resetear contador de preguntas
    updateScoreBoard();

    gameRunning = true;
    gamePaused = false;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    statusEl.textContent = 'Game Running';

    spawnPiece();
    draw();
    drawNext();

    gameLoopId = setInterval(gameLoop, gameSpeed);
}

function togglePause() {
    if (!gameRunning) return;

    gamePaused = !gamePaused;
    statusEl.textContent = gamePaused ? 'PAUSED' : 'Game Running';
    pauseBtn.textContent = gamePaused ? 'Resume' : 'Pause';
}

function endGame() {
    gameRunning = false;
    gamePaused = false;
    clearInterval(gameLoopId);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    statusEl.textContent = `Game Over! Final Score: ${score}`;
    draw();
}

// Funciones para el sistema de preguntas
function showQuestion() {
    if (typeof allQuestions === 'undefined' || allQuestions.length === 0) {
        return;
    }

    // Seleccionar una pregunta aleatoria
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    const question = allQuestions[randomIndex];

    const questionText = document.getElementById('questionText');
    const questionOptions = document.getElementById('questionOptions');
    const questionCounter = document.getElementById('questionCounter');
    const questionFeedback = document.getElementById('questionFeedback');
    const questionExplanation = document.getElementById('questionExplanation');
    const continueBtn = document.querySelector('.continue-btn');

    // Actualizar contador - mostrar preguntas respondidas en este juego
    questionCounter.textContent = `${questionsAnswered + 1}/${allQuestions.length}`;

    // Mostrar pregunta
    questionText.innerHTML = question.question;

    // Limpiar opciones previas
    questionOptions.innerHTML = '';

    // Agregar opciones
    question.options.forEach((option, index) => {
        const optionEl = document.createElement('button');
        optionEl.className = 'option';
        optionEl.innerHTML = option;
        optionEl.dataset.index = index;
        optionEl.addEventListener('click', () => handleAnswerSelect(index, question));
        questionOptions.appendChild(optionEl);
    });

    // Limpiar retroalimentación y explicación
    questionFeedback.classList.remove('show', 'correct', 'incorrect');
    questionFeedback.innerHTML = '';
    questionExplanation.classList.remove('show');
    questionExplanation.innerHTML = '';
    questionAnswered = false;

    // Ocultar botón continuar
    if (continueBtn) {
        continueBtn.classList.remove('show');
    }

    // Mostrar modal
    questionModal.classList.add('active');
}

function handleAnswerSelect(selectedIndex, question) {
    if (questionAnswered) return;

    questionAnswered = true;
    questionsAnswered++; // Incrementar contador de preguntas respondidas

    const options = document.querySelectorAll('.option');
    const questionFeedback = document.getElementById('questionFeedback');
    const questionExplanation = document.getElementById('questionExplanation');
    const continueBtn = document.querySelector('.continue-btn') || createContinueButton();

    // Marcar todas las opciones como deshabilitadas
    options.forEach(opt => opt.disabled = true);

    // Mostrar respuesta correcta
    const isCorrect = selectedIndex === question.correct;

    if (isCorrect) {
        // Respuesta correcta
        options[selectedIndex].classList.add('correct');
        questionFeedback.classList.add('show', 'correct');
        questionFeedback.textContent = '¡Correcto! ✓';
        score += 50 * level; // Bonus por respuesta correcta
    } else {
        // Respuesta incorrecta
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        questionFeedback.classList.add('show', 'incorrect');
        questionFeedback.textContent = '¡Incorrecto! ✗';
    }

    updateScoreBoard();

    // Mostrar explicación
    questionExplanation.classList.add('show');
    questionExplanation.innerHTML = `<strong>Explicación:</strong> ${question.explanation}`;

    // Mostrar botón continuar
    continueBtn.classList.add('show');
}

function createContinueButton() {
    const continueBtn = document.createElement('button');
    continueBtn.className = 'continue-btn';
    continueBtn.textContent = 'Continuar Juego';
    continueBtn.addEventListener('click', closeQuestion);

    const questionContent = document.querySelector('.question-content');
    questionContent.appendChild(continueBtn);

    return continueBtn;
}

function closeQuestion() {
    questionModal.classList.remove('active');
    waitingForQuestion = false;

    if (gameRunning) {
        gamePaused = false;
        pauseBtn.textContent = 'Pause';
        statusEl.textContent = 'Game Running';
    }
}

// Initial draw
draw();
drawNext();
