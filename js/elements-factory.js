const elementsFactory = (function() {

  function createNewGameScreen() {
    const container = createElement("div", "new-game-screen", null);
    const getReadyText = createElement("h1", "new-game-title", "Get Ready For The Next Battle");
    const playersBox = createPlayerSection();
    const readyButton = createElement("button", "ready-button", "Ready!");
    container.append(getReadyText);
    container.append(playersBox);
    container.append(readyButton);
    return container;
  }

  function createPlayerSection() {
    const container = createElement("div", "new-game-players", null)
    const playersBox = playerBox.getPlayersBox();
    const vsElement = createElement("p", "new-game-vs", "VS");
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
    playerIcon.src = "./img/account.svg"
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

  return {createNewGameScreen, newPlayerBox, newOpponentBox}
})()