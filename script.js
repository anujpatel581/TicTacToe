const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.querySelector('.reset-btn');
const gameMessage = document.querySelector('.game-message');
const xBtn = document.getElementById('x-btn');
const oBtn = document.getElementById('o-btn');

let currentPlayer = '';
let gameStarted = false;

const winningCombinations = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
];

const checkWinner = (player) => {
    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].classList.contains(player));
    });
};

const handleClick = (e) => {
    const cell = e.target;

    if (cell.classList.contains('x') || cell.classList.contains('o')) return;  // Cell already clicked
    if (!gameStarted) return; // Game has not started

    // Set the symbol in the cell
    cell.textContent = currentPlayer.toUpperCase();  // Update the cell content with X or O
    cell.classList.add(currentPlayer);  // Add the corresponding class for styling

    if (checkWinner(currentPlayer)) {
        gameMessage.textContent = `${currentPlayer.toUpperCase()} wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));  // Disable further clicks
        return;
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';  // Switch turn
};

const resetGame = () => {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';  // Clear text content of each cell
        cell.addEventListener('click', handleClick);
    });
    currentPlayer = '';
    gameMessage.textContent = '';
    gameStarted = false;
};

const startGame = (symbol) => {
    currentPlayer = symbol;
    gameStarted = true;
    gameMessage.textContent = `Player ${symbol.toUpperCase()}'s turn`;
};

// Event listeners for choosing X or O
xBtn.addEventListener('click', () => startGame('x'));
oBtn.addEventListener('click', () => startGame('o'));

// Reset the game when the reset button is clicked
resetButton.addEventListener('click', resetGame);

// Add click event to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
