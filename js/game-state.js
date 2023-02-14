(function gameState() {
  const players = {
    player1: {},
    player2: {},
  };
  const gameBoard = [];
  const ROW = 3;
  const COLUMN = 3;

  pubSub.subscribe("startGame", createGame)

  function createGame() {
    createGameBoard();
  }

  function createGameBoard() {
    for (let i = 0; i < ROW; i++) {
      gameBoard.push([]);
      for (let j = 0; j < COLUMN; j++) {
        gameBoard[i].push("")
      }
    }
  }
})()