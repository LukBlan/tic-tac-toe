const gameSectionDisplay = (function gameSection() {
  const board = gameSectionFactory.getGameSection();
  const boardCells = Array.from(board.childNodes)
  const resultScreen = gameSectionFactory.getMenu();
  const resultText = resultScreen.querySelector(".result-text");
  const newGameButton = resultScreen.querySelector(".new-game-button");
  const resetGameButton = resultScreen.querySelector(".reset-button");
  let currentPlayerMoveAction;

  pubSub.subscribe("startGame", renderGameSection);
  pubSub.subscribe("playerMove", letPlayerMakeAMove)
  pubSub.subscribe("disablePlayerMove", disablePlayerMove)
  pubSub.subscribe("gameOver", showGameOverScreen);
  pubSub.subscribe("resetGame", removeResultBox);

  newGameButton.addEventListener("click", generateNewGame);
  resetGameButton.addEventListener("click", resetGame)

  function removeResultBox() {
    document.body.removeChild(resultScreen);
  }

  function resetGame() {
    pubSub.emit("resetGame", null);
  }

  function generateNewGame() {
    renderGameSection();
    pubSub.emit("goToCharacterSelection", null);
  }

  function showGameOverScreen(finalResult) {
    resultText.innerText = finalResult;
    document.body.append(resultScreen);
    setTimeout(() => {
      resultScreen.classList.remove("hide-element");
    }, 1)

  }

  function letPlayerMakeAMove(currentPlayer) {
    currentPlayerMoveAction = currentPlayer;
    board.addEventListener("click", playerMakeMove);
  }

  function disablePlayerMove() {
    board.removeEventListener("click", playerMakeMove);
  }

  function playerMakeMove(event) {
    if (event.target.nodeName === "DIV") {
      currentPlayerMoveAction.makeMove(boardCells.indexOf(event.target))
    }
  }

  function renderGameSection() {
    if (document.body.contains(board)) {
      document.body.removeChild(board);
      document.body.removeChild(resultScreen);
    } else {
      document.body.append(board);
    }
  }

  return {board, renderGameSection}
})()