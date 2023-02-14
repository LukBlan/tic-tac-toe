(function startGameScreen() {
  const startGameButton = elementsFactory.getStartGameScreen()

  startGameButton.addEventListener("click", goToCharacterSelectionScreen)

  function goToCharacterSelectionScreen() {
    removeEvent();
    document.body.removeChild(startGameButton);
    pubSub.emit("goToCharacterSelection", null);
  }

  function displayStartGameButton() {
    document.body.append(startGameButton);
  }

  function removeEvent() {
    startGameButton.removeEventListener("click", goToCharacterSelectionScreen);
  }

  displayStartGameButton()
})()