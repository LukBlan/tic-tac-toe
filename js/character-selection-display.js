(function characterSelectionDisplay() {
  const characterSelectionScreen = elementsFactory.getCharacterSelectionScreen();
  const charactersBar = characterSelectionScreen.querySelector(".character-bar");
  const fightButton = characterSelectionScreen.querySelector("button");
  const getReadyAudio = new Audio('./sounds/get-ready.mp3');
  const characterSelectionMusic = new Audio('./sounds/character-selection.mp3');

  pubSub.subscribe("goToCharacterSelection", renderCharacterSelectionScreen);

  fightButton.addEventListener("click", startGame);

  function renderCharacterSelectionScreen() {
    characterSelectionMusic.currentTime = 0;
    characterSelectionMusic.volume = 1;
    characterSelectionMusic.play();
    document.body.append(characterSelectionScreen);
  }

  function startGame() {
    characterSelectionMusic.pause();
    getReadyAudio.volume = 1;
    getReadyAudio.play();
    document.body.removeChild(characterSelectionScreen);
    pubSub.emit("startGame", null);
  }
}())