const elementsFactory = (function() {

  function getCharactersBar() {
    const container = createElement("div", "character-bar-section", null);
    const readyButton = createElement("button", "fight-button", "Fight!");
    const characterBar = createElement("div", "character-bar", null);
    const charactersNames = ["alex", "roger", "alisa", "mokujin", "d-jin", "nina", "a-king",
      "asuka", "ganryu", "king", "marshall", "xiaoyu", "jin", "kazuya", "kuma", "miharu",
      "panda", "jinpachi", "jaycee", "paul"]
    charactersNames.forEach(name => {
      const image = createElement("img", null, null);
      image.src = `./img/characters-icons/${name}.png`
      characterBar.append(image);
    })
    container.append(characterBar);
    container.append(readyButton);
    return container;
  }

  function getPlayersChoiceSection() {
    const container = createElement("div", "player-choice-section", null)
    const playersBox = playerBox.getPlayersBox();
    const vsElement = createElement("p", "character-selection-vs", "VS");
    container.append(playersBox.player1);
    container.append(vsElement);
    container.append(playersBox.player2);
    return container;
  }

  function newPlayerBox(iconBorderClass, playerName) {
    const container = createElement("div", "player-section", null);
    const playerType = createElement("h2", "player-type", playerName);
    const playerIcon = createElement("img", iconBorderClass, null);
    const characterName = createElement("p", "character-name", null);
    playerIcon.classList.add("player-icon")
    playerIcon.src = "./img/question-mark.svg"
    container.append(characterName);
    container.append(playerIcon);
    container.append(playerType);
    return container;
  }

  function newOpponentBox(iconBorderClass, playerName) {
    const container = newPlayerBox(iconBorderClass, playerName);
    const leftArrow = createElement("img", "left-arrow", null)
    const rightArrow = createElement("img", "right-arrow", null)
    leftArrow.src = "./img/arrow-left-bold.svg"
    rightArrow.src = "./img/arrow-right-bold.svg"
    container.append(leftArrow)
    container.append(rightArrow)
    return container;
  }

  function createElement(elementName, elementClass, elementText) {
    const newElement = document.createElement(elementName);
    if (elementClass !== null) {
      newElement.classList.add(elementClass);
    }
    if (elementText !== null) {
      newElement.innerText = elementText;
    }
    return newElement;
  }

  function getStartGameScreen() {
    const container = createElement("div", "start-game-screen", null);
    const startGameButton = createElement("button", "start-game-button", "Start Game")
    container.append(startGameButton)
    return container;
  }

  function getGameSection() {
    const gameBoard = createElement("div", "game-board", null);
    createGameBoard(gameBoard)
    return gameBoard;
  }

  function createGameBoard(gameBoard) {
    const boardSize = gameState.ROW * gameState.COLUMN;
    for (let i = 0; i < boardSize; i++) {
      gameBoard.append(createElement("div", null, null));
    }
    return boardSize;
  }

  function getMenu() {
    const menu = createElement("div", "menu", null);
    const newGameButton = createElement("button", "character-selection-button", "New Game");
    const resetButton = createElement("button", null, "Reset");
    menu.append(newGameButton);
    menu.append(resetButton);
    return menu;
  }

  return {getCharactersBar, getPlayersChoiceSection, newPlayerBox, newOpponentBox, getStartGameScreen, getGameSection, getMenu}
})()