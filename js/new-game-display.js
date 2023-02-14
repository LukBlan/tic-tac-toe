(function newGameDisplay() {
  const newGameScreen = elementsFactory.createNewGameScreen()
  pubSub.subscribe("newGame", renderNewGameScreen);

  function renderNewGameScreen() {
    document.body.append(newGameScreen);
  }

  pubSub.emit("newGame", renderNewGameScreen);
}())