const boardController = (function gameState() {
  const playersList = [];
  const gameBoard = [];
  const ROW = 3;
  const COLUMN = 3;
  let currentTurn = 0;
  let finalMessage = "";

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
    if (gameBoard.flat()[player.choice] === 0) {
      const column = player.choice % 3;
      const row = Math.floor(player.choice / 3)
      gameBoard[row][column] = player.playerNumber;
      pubSub.emit("newBoardState", gameBoard)
      player.finishTurn();
    } else {
      player.startTurn();
    }
  }

  function checkWinner() {
    let position = 0;
    const columns = [[], [], []];
    const rows = [[], [], []];
    const diagonals = [[], []];
    gameBoard.flat().forEach(cell => {
      columns[Math.floor(position / 3)].push(cell);
      rows[(position % 3)].push(cell);
      if (position % 4 === 0) {
        diagonals[0].push(cell);
      }
      if (position === 2 || position === 4 || position === 6)
        diagonals[1].push(cell);
      position++;
    })
    return winnerBy(columns) || winnerBy(rows) || winnerBy(diagonals);
  }

  function winnerBy(array) {
    const player1Winner =  array.some(innerArray => innerArray.every(element => element === 1));
    const player2Winner = array.some(innerArray => innerArray.every(element => element === 2));
    if (player1Winner) {
      finalMessage = "You Win";
    }
    if (player2Winner) {
      finalMessage = "You Lose";
    }
    return player1Winner || player2Winner;
  }

  function nextTurn() {
    if (!checkWinner()) {
      const currentPlayerTurn = playersList[currentTurn % 2];
      pubSub.emit("changeBoardColor", currentPlayerTurn);
      currentPlayerTurn.startTurn();
      currentTurn++;
    } else {
      alert(finalMessage)
    }
  }

  function createGameBoard() {
    for (let i = 0; i < ROW; i++) {
      gameBoard.push([]);
      for (let j = 0; j < COLUMN; j++) {
        gameBoard[i].push(0)
      }
    }
  }

  return {ROW, COLUMN}
})()