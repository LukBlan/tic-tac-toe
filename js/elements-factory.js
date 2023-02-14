const elementsFactory = (function() {

  function createNewGameScreen() {
    const container = createElement("div", "new-game-screen", null)
    const playersBox = playerBox.getPlayersBox();
    container.append(playersBox.player1)
    container.append(playersBox.player2)
    return container;
  }

  function newPlayerBox(className) {
    const container = createElement("div", className, null);
    const playerType = createElement("h2", "player-type", "Player");
    container.append(playerType);
    return container;
  }

  function createElement(elementName, elementClass, elementText) {
    const newElement = document.createElement(elementName);
    if (elementClass !== null) {
      newElement.classList.add(elementClass);
    }
    if (elementClass !== null) {
      newElement.innerText = elementText;
    }
    return newElement;
  }

  return {createNewGameScreen, newPlayerBox}
})()