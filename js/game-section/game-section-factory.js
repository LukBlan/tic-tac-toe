const gameSectionFactory = (function () {
  function getGameSection() {
    const gameBoard = elementsFactory.createElement("div", "game-board", null);
    createGameBoard(gameBoard)
    return gameBoard;
  }

  function createGameBoard(gameBoard) {
    const boardSize = boardController.ROW * boardController.COLUMN;
    for (let i = 0; i < boardSize; i++) {
      gameBoard.append(elementsFactory.createElement("div", null, null));
    }
    return boardSize;
  }

  function getMenu() {
    const container = elementsFactory.createElement("div", "result-screen", null);
    const resultText = elementsFactory.createElement("p", "result-text", null);
    const menu = elementsFactory.createElement("div", "menu", null);
    const newGameButton = elementsFactory.createElement("button", "new-game-button", "New Game");
    const resetButton = elementsFactory.createElement("button", null, "Reset");
    menu.append(newGameButton);
    menu.append(resetButton);
    container.append(resultText);
    container.append(menu);
    container.classList.add("hide-element");
    return container;
  }
  return {getGameSection, getMenu}
})()