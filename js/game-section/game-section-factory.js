const gameSectionFactory = (function () {
  function getGameSection() {
    const gameBoard = elementsFactory.createElement("div", "game-board", null);
    createGameBoard(gameBoard)
    return gameBoard;
  }

  function createGameBoard(gameBoard) {
    const boardSize = gameState.ROW * gameState.COLUMN;
    for (let i = 0; i < boardSize; i++) {
      gameBoard.append(elementsFactory.createElement("div", null, null));
    }
    return boardSize;
  }

  function getMenu() {
    const menu = elementsFactory.createElement("div", "menu", null);
    const newGameButton = elementsFactory.createElement("button", "character-selection-button", "New Game");
    const resetButton = elementsFactory.createElement("button", null, "Reset");
    menu.append(newGameButton);
    menu.append(resetButton);
    return menu;
  }
  return {getGameSection, getMenu}
})()