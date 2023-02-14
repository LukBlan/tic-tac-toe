const elementsFactory = (function() {

  function createNewGameScreen() {
    const container = createElement("div", "new-game-screen", null);
    const getReadyText = createElement("h1", "new-game-title", "Get Ready For The Next Battle");
    const playersBox = createPlayerSection();
    const readyButton = createElement("div", "ready-button", "Ready!");
    container.append(getReadyText);
    container.append(playersBox);
    container.append(readyButton);

    return container;
  }

  function createPlayerSection() {
    const container = createElement("div", "new-game-players", null)
    const playersBox = playerBox.getPlayersBox();
    const vsElement = createElement("p", null, "VS");
    container.append(playersBox.player1);
    container.append(vsElement);
    container.append(playersBox.player2);
    return container;
  }

  function newPlayerBox() {
    const container = createElement("div", "player", null);
    const playerType = createElement("h2", "player-type", "Player");
    const playerIcon = createElement("img", "player-icon", null);
    playerIcon.src = "./../img/account.svg"
    container.append(playerType);
    container.append(playerIcon);
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

  return {createNewGameScreen, newPlayerBox}
})()