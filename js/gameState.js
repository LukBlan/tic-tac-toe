(function gameState() {
  const participants = [];
  const gameBoard = [];
  const ROW = 3;
  const COLUMN = 3;

  function createGameBoard() {
    for (let i = 0; i < ROW; i++) {
      gameBoard.push([]);
      for (let j = 0; j < COLUMN; j++) {
        gameBoard[i].push("x")
      }
    }
  }


})()