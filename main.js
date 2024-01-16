// Create Board Function
const createBoard = (game) => {
  for (let i = 0; i < ROWS; i++) {
    const cell = template.content.cloneNode(true).querySelector("div");
    cell.id = `cell-${i}`;
    cell.addEventListener("click", () => {
      game.handleCellClick(i, j);
    });
    gameBoard.appendChild(cell);
  }
};
