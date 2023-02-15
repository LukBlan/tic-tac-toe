(function characterSelectionDisplay() {
  const characterSelectionScreen = elementsFactory.getCharacterSelectionScreen();
  const charactersBar = characterSelectionScreen.querySelector(".character-bar");
  const fightButton = characterSelectionScreen.querySelector("button");
  const getReadyAudio = new Audio('./sounds/get-ready.mp3');
  const characterSelectionMusic = new Audio('./sounds/character-selection.mp3');

  pubSub.subscribe("goToCharacterSelection", renderCharacterSelectionScreen);
  pubSub.subscribe("lock-character-selection", removeCharacterSelectionEvent);

  fightButton.addEventListener("click", startGame);
  charactersBar.addEventListener("mouseover", displayCharacterOnPlayer);
  charactersBar.addEventListener("click", selectCharacter);
  charactersBar.addEventListener("mouseout", removeCharacterPreview);

  function removeCharacterSelectionEvent() {
    charactersBar.removeEventListener("mouseover", displayCharacterOnPlayer);
    charactersBar.removeEventListener("click", selectCharacter);
  }

  function removeCharacterPreview(event) {
    const element = event.target;
    if (element.nodeName === "IMG") {
      pubSub.emit("removeCharacterPreview", null)
    }
  }

  function selectCharacter(event) {
    const element = event.target;
    if (element.nodeName === "IMG") {
      element.classList.add("selected-character")
      pubSub.emit("characterSelected", element.src)
    }
  }

  function displayCharacterOnPlayer(event) {
    const element = event.target;
    if (element.nodeName === "IMG") {
      pubSub.emit("characterPreview", element.src)
    }
  }

  function renderCharacterSelectionScreen() {
    characterSelectionMusic.currentTime = 0;
    characterSelectionMusic.volume = 1;
    characterSelectionMusic.loop = true;
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