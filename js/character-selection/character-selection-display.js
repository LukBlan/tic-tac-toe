(function characterSelectionDisplay() {
  const characterSelectionBox = characterSelectionFactory.getPlayersChoiceSection();
  const charactersBar = characterSelectionFactory.getCharactersBar()
  const fightButton = charactersBar.querySelector("button");

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
    pubSub.emit("playCharacterSelectionMusic", null);
    document.body.append(characterSelectionBox);
    document.body.append(charactersBar);
  }

  function startGame() {
    pubSub.emit("playGetReadyAudio", null);
    pubSub.emit("hide-arrows", null);
    document.body.removeChild(charactersBar);
    characterSelectionBox.classList.add("huge-padding");
    setTimeout(() => {
      document.body.removeChild(characterSelectionBox);
      pubSub.emit("startGame", null);
      characterSelectionBox.classList.remove("huge-padding");
    }, 3000);
  }
}())