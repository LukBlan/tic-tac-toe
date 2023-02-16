const startGameFactory = (function() {
  function getStartGameScreen() {
    const container = elementsFactory.createElement("div", "start-game-screen", null);
    const startGameButton = elementsFactory.createElement("button", "start-game-button", "Start Game")
    container.append(startGameButton)
    return container;
  }
  return {getStartGameScreen};
})()