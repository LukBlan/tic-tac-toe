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
  pubSub.subscribe("computerRandomMove", generateRandomMove);

  function generateRandomMove(computerIa) {
    const remainingCells = boardCells.filter(cell => cell.innerHTML === "");
    const choice = remainingCells[Math.floor(Math.random() * remainingCells.length)]
    const choicePosition = boardCells.indexOf(choice);
    computerIa.makeMove(choicePosition);
  }

  newGameButton.addEventListener("click", generateNewGame);
  resetGameButton.addEventListener("click", resetGame)

  function removeResultBox() {
    document.body.removeChild(resultScreen);
    resultScreen.classList.add("hide-element");
  }

  function resetGame() {
    pubSub.emit("resetGame", null);
  }

  function generateNewGame() {
    removeResultBox();
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
    } else {
      document.body.append(board);
    }
  }

  return {board, renderGameSection}
})()