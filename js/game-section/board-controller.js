const boardController = (function gameState() {
  const playersList = [];
  const gameBoard = [];
  const ROW = 3;
  const COLUMN = 3;
  let currentTurn = 0;

  pubSub.subscribe("startGame", createGame)
  pubSub.subscribe("nextTurn", nextTurn)
  pubSub.subscribe("checkChoice", checkPlayerChoice)

  function createGame(players) {
    playersList.push(players.player1);
    playersList.push(players.player2);
    createGameBoard();
    nextTurn()
  }

  function checkPlayerChoice(player) {
    if (gameBoard.flat()[player.choice] === null) {
      const column = player.choice % 3;
      const row = Math.floor(player.choice / 3)
      gameBoard[row][column] = player.playerNumber;
      pubSub.emit("newBoardState", gameBoard)
      player.finishTurn();
    } else {
      player.startTurn();
    }
  }

  function nextTurn() {
    if (!gameOver()) {
      playersList[currentTurn % 2].startTurn();
      currentTurn++;
    }
  }

  function gameOver() {
    return gameBoard.flat().filter(cell => cell === null).length === 0
  }

  function createGameBoard() {
    for (let i = 0; i < ROW; i++) {
      gameBoard.push([]);
      for (let j = 0; j < COLUMN; j++) {
        gameBoard[i].push(null)
      }
    }
  }

  return {ROW, COLUMN}
})()