const boardController = (function() {
  let players = {}
  let playersList = [];
  let gameBoard = [];
  const ROW = 3;
  const COLUMN = 3;
  let currentTurn = -1;
  let finalMessage = "";

  pubSub.subscribe("startGame", createGame)
  pubSub.subscribe("nextTurn", nextTurn)
  pubSub.subscribe("checkChoice", checkPlayerChoice)
  pubSub.subscribe("resetGame", resetGame)

  function resetGame() {
    createGame(players);
  }

  function createGame(newPlayers) {
    players = newPlayers;
    currentTurn = -1;
    playersList = []
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
    if (checkWinner() || !moreCells()) {
      pubSub.emit("gameOver", finalMessage);
    } else {
      currentTurn++;
      const currentPlayerTurn = playersList[currentTurn % 2];
      pubSub.emit("changeBoardColor", currentPlayerTurn);
      currentPlayerTurn.startTurn();

    }
  }

  function moreCells() {
    let moreCells =  gameBoard.flat().filter(element => element === 0).length > 0;
    if(!moreCells) {
      finalMessage = "Tie";
    }
    return moreCells;
  }

  function createGameBoard() {
    gameBoard = [];
    for (let i = 0; i < ROW; i++) {
      gameBoard.push([]);
      for (let j = 0; j < COLUMN; j++) {
        gameBoard[i].push(0)
      }
    }
  }

  return {ROW, COLUMN}
})()