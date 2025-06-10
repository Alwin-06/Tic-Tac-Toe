document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('reset');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    const playerXScore = document.getElementById('playerX');
    const playerOScore = document.getElementById('playerO');
    
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let scores = { X: 0, O: 0 };
    
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    
    init();
    
    function init() {
        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        resetBtn.addEventListener('click', handleReset);
        updateActivePlayer();
    }
    
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) return;
 
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        clickedCell.textContent = currentPlayer;

        checkResult();
    }
    
    function checkResult() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                
                cells[a].classList.add('winning-cell');
                cells[b].classList.add('winning-cell');
                cells[c].classList.add('winning-cell');
                break;
            }
        }

        if (roundWon) {
            gameActive = false;
            scores[currentPlayer]++;
            updateScores();
            showMessage(`Player ${currentPlayer} Wins!`);
            createConfetti();
            return;
        }
        
        if (!gameState.includes('')) {
            gameActive = false;
            showMessage("Game Ended in a Draw!");
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateActivePlayer();
    }
    
    function updateActivePlayer() {
        if (currentPlayer === 'X') {
            playerXScore.classList.add('active');
            playerOScore.classList.remove('active');
        } else {
            playerOScore.classList.add('active');
            playerXScore.classList.remove('active');
        }
    }
    
    function updateScores() {
        scoreX.textContent = scores.X;
        scoreO.textContent = scores.O;
    }
    
    function showMessage(msg) {
        message.textContent = msg;
        message.style.display = 'block';
    }
    
    function hideMessage() {
        message.style.display = 'none';
    }
    
    function handleReset() {

        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });

        hideMessage();

        document.querySelectorAll('.confetti').forEach(el => el.remove());
    }
    
    function createConfetti() {
        const colors = ['#ff2d75', '#00f7ff', '#ff8a00', '#ffcc00', '#00ff88'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
        }
    }
});