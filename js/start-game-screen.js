(function startGameScreen() {
  const startGameScreen = elementsFactory.getStartGameScreen();
  const startGameButton = startGameScreen.querySelector("button");

  startGameButton.addEventListener("click", goToCharacterSelectionScreen);

  function goToCharacterSelectionScreen() {
    removeEvent();
    document.body.removeChild(startGameScreen);
    pubSub.emit("goToCharacterSelection", null);
  }

  function displayStartGameButton() {
    document.body.append(startGameScreen);
  }

  function removeEvent() {
    startGameScreen.removeEventListener("click", goToCharacterSelectionScreen);
  }

  displayStartGameButton();
})()