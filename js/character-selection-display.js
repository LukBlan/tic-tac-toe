(function characterSelectionDisplay() {
  const characterSelectionBox = elementsFactory.getPlayersChoiceSection();
  const charactersBar = elementsFactory.getCharactersBar()
  const fightButton = charactersBar.querySelector("button");
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
    charactersBar.removeEventListener("mouseout", removeCharacterPreview);
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
    document.body.append(characterSelectionBox);
    document.body.append(charactersBar);
  }

  function startGame() {
    characterSelectionMusic.pause();
    getReadyAudio.volume = 1;
    getReadyAudio.play();
    fightButton.classList.add("hide-element");
    charactersBar.classList.add("hide-element");
    setTimeout(() => {
      document.body.removeChild(charactersBar);
      document.body.removeChild(characterSelectionBox);
      pubSub.emit("startGame", null);
    }, 3000);
  }
}())