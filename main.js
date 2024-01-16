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

  // TODO: Check for win (horizontal, vertical, diag up-right, diag down-right)
};

// TODO: Cell clicks
// TODO: Game Reset
// TODO: Game Status - Message update

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
