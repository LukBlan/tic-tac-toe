const startGameFactory = (function() {
  function getStartGameScreen() {
    const container = elementsFactory.createElement("div", "start-game-screen", null);
    const startGameButton = elementsFactory.createElement("button", "red-button", "Start")
    container.append(startGameButton)
    return container;
  }
  return {getStartGameScreen};
})()