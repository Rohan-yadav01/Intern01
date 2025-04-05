document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const turnDisplay = document.getElementById('turn');
    const resetBtn = document.getElementById('reset');
    const xScoreDisplay = document.getElementById('x-score');
    const oScoreDisplay = document.getElementById('o-score');
    const drawScoreDisplay = document.getElementById('draw-score');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scores = { x: 0, o: 0, draw: 0 };
    
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Initialize the game
    function initGame() {
        cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'winning-cell');
            cell.textContent = '';
        });
        
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        turnDisplay.textContent = "X's Turn";
        turnDisplay.style.color = '#e74c3c';
    }
    
    // Handle cell click
    function handleCellClick(e) {
        const clickedCell = e.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (gameState[cellIndex] !== '' || !gameActive) return;
        
        gameState[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        checkGameResult();
    }
    
    // Check for win or draw
    function checkGameResult() {
        let roundWon = false;
        
        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                highlightWinningCells(winningCombos[i]);
                break;
            }
        }
        
        if (roundWon) {
            updateScore(currentPlayer);
            turnDisplay.textContent = `${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }
        
        if (!gameState.includes('')) {
            updateScore('draw');
            turnDisplay.textContent = "It's a Draw!";
            turnDisplay.style.color = '#3a4a6d';
            gameActive = false;
            return;
        }
        
        switchPlayer();
    }
    
    // Switch players
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDisplay.textContent = `${currentPlayer}'s Turn`;
        turnDisplay.style.color = currentPlayer === 'X' ? '#e74c3c' : '#3498db';
    }
    
    // Highlight winning cells
    function highlightWinningCells(cells) {
        cells.forEach(index => {
            document.querySelector(`.cell[data-index="${index}"]`).classList.add('winning-cell');
        });
    }
    
    // Update scores
    function updateScore(winner) {
        if (winner === 'X') {
            scores.x++;
            xScoreDisplay.textContent = scores.x;
        } else if (winner === 'O') {
            scores.o++;
            oScoreDisplay.textContent = scores.o;
        } else {
            scores.draw++;
            drawScoreDisplay.textContent = scores.draw;
        }
    }
    
    // Event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    resetBtn.addEventListener('click', initGame);
    
    // Initialize the game
    initGame();
});