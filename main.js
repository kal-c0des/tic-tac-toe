// Constants
const ROWS = 3;
const COLS = 3;
let board = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(null));
let isGameActive = false;

// Selectors
const template = document.getElementById("game-cell");
const gameBoard = document.getElementById("game-board");
const gameStatus = document.getElementById("game-status");
const btn = document.getElementById("game-btn");

// Create Game
const createGame = (player1, player2) => {
  let currentPlayer = player1;

  const togglePlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkForTie = () => {
    if (board.every((row) => row.every((cell) => cell))) {
      updateGameStatus("The game ends in a draw.");
      isGameActive = false;
    }
  };

  const checkForWin = (row, col) => {
    // Check for horizontal
    if (
      board[row][0] === currentPlayer &&
      board[row][1] === currentPlayer &&
      board[row][2] === currentPlayer
    ) {
      updateGameStatus(`${currentPlayer.getName()} wins horizontally!`);
      isGameActive = false;
      return;
    }

    // Check for vertical
    if (
      board[0][col] === currentPlayer &&
      board[1][col] === currentPlayer &&
      board[2][col] === currentPlayer
    ) {
      updateGameStatus(`${currentPlayer.getName()} wins vertically!`);
      isGameActive = false;
      return;
    }

    // Check for diagonal - up to the right
    if (
      board[2][0] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[0][2] === currentPlayer
    ) {
      updateGameStatus(`${currentPlayer.getName()} wins diagonally!`);
      isGameActive = false;
      return;
    }

    // Check for diagonal - down to the right
    if (
      board[0][0] === currentPlayer &&
      board[1][1] == currentPlayer &&
      board[2][2] === currentPlayer
    ) {
      updateGameStatus(`${currentPlayer.getName()} wins diagonally!`);
      isGameActive = false;
      return;
    }
  };

  const handleCellClick = (row, col) => {
    const cell = board[row][col];
    if (cell !== null || !isGameActive) return;

    board[row][col] = currentPlayer;
    const box = document.getElementById(`cell-${row}-${col}`);
    box.innerText = currentPlayer.getSymbol();
    checkForWin(row, col);
    checkForTie();
    togglePlayer();
    updateGameStatus(`${currentPlayer.getName()}'s turn`);
  };

  // Reset Game
  const resetGame = (game) => {
    board = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(null));
    currentPlayer = player1;
    isGameActive = true;
    updateGameStatus(`${currentPlayer.getName()}'s turn`);

    gameBoard.innerText = "";
    createBoard(game);
  };

  // Update Game Status
  const updateGameStatus = (message) => {
    if (!isGameActive) return;
    gameStatus.innerText = message;
  };

  return { handleCellClick, resetGame };
};

// Create Board Function
const createBoard = (game) => {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const cell = template.content.cloneNode(true).querySelector("div");
      cell.id = `cell-${i}-${j}`;
      cell.addEventListener("click", () => {
        game.handleCellClick(i, j);
      });
      gameBoard.appendChild(cell);
    }
  }
};

const createPlayer = (playerName, playerSymbol) => {
  const name = playerName;
  const symbol = playerSymbol;

  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol };
};

(function () {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");

  const game = createGame(player1, player2);
  createBoard(game);
  isGameActive = true;

  btn.addEventListener("click", () => {
    game.resetGame(game);
  });
})();
