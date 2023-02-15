const elementsFactory = (function() {

  function getCharacterSelectionScreen() {
    const container = createElement("div", "character-selection-screen", null);
    const characterSelectionBox = getCharacterSelectionBox()
    const charactersBar = getCharactersBar();
    container.append(characterSelectionBox);
    container.append(charactersBar);
    return container;
  }

  function getCharactersBar() {
    const container = createElement("div", "character-bar", null);
    const charactersNames = ["alex", "roger", "alisa", "mokujin", "d-jin", "nina", "a-king",
      "asuka", "ganryu", "king", "marshall", "xiaoyu", "jin", "kazuya", "kuma", "miharu",
      "panda", "jinpachi", "jaycee", "paul"]
    charactersNames.forEach(name => {
      const image = createElement("img", null, null);
      image.src = `./img/characters-icons/${name}.png`
      container.append(image);
    })
    return container;
  }

  function getCharacterSelectionBox() {
    const container = createElement("div", "character-selection-box", null);
    const getReadyText = createElement("h1", "character-selection-title", "Get Ready For The Next Battle");
    const playersBox = createPlayerSection();
    const readyButton = createElement("button", "fight-button", "Fight!");
    container.append(getReadyText);
    container.append(playersBox);
    container.append(readyButton);
    return container;
  }

  function createPlayerSection() {
    const container = createElement("div", "player-choice-section", null)
    const playersBox = playerBox.getPlayersBox();
    const vsElement = createElement("p", "character-selection-vs", "VS");
    container.append(playersBox.player1);
    container.append(vsElement);
    container.append(playersBox.player2);
    return container;
  }

  function createInputNameSection() {
    const container = createElement("div", "player-name-section", null);
    const inputName = document.createElement("input");
    const label = createElement("label", "player-name-label", "Name");
    inputName.maxLength = 16;
    container.append(inputName);
    container.append(label);
    return container;
  }

  function newPlayerBox() {
    const container = createElement("div", "player-section", null);
    const playerType = createElement("h2", "player-type", "Player");
    const playerIcon = createElement("img", "player-icon", null);
    const inputSection = createInputNameSection();
    playerIcon.src = "./img/question-mark.svg"
    container.append(playerType);
    container.append(playerIcon);
    container.append(inputSection);
    return container;
  }

  function newOpponentBox() {
    const container = newPlayerBox();
    const leftArrow = createElement("img", "left-arrow", null)
    const rightArrow = createElement("img", "right-arrow", null)
    leftArrow.classList.add("hide-element")
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

  return {getCharacterSelectionScreen, newPlayerBox, newOpponentBox, getStartGameScreen, getGameSection, getMenu}
})()