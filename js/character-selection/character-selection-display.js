(function characterSelectionDisplay() {
  const characterSelectionBox = characterSelectionFactory.getPlayersChoiceSection();
  const charactersBar = characterSelectionFactory.getCharactersBar()
  const fightButton = charactersBar.querySelector("button");
  let player1CharacterSelected = null;
  let player2CharacterSelected = "";

  pubSub.subscribe("goToCharacterSelection", renderCharacterSelectionScreen);
  pubSub.subscribe("lock-character-selection", removeCharacterSelectionEvent);

  charactersBar.addEventListener("mouseover", displayCharacterOnPlayer);
  charactersBar.addEventListener("mouseout", removeCharacterPreview);
  charactersBar.addEventListener("click", clickCharacter);
  fightButton.addEventListener("click", startGame);


  function clickCharacter(event) {
    const element = event.target;
    if (element.nodeName === "IMG") {
      if (element.src === player1CharacterSelected || element.src === player2CharacterSelected) {
        undoCharacterSelected(event);
      } else {
        selectCharacter(event);
      }
    }
  }

  function selectCharacter(event) {
    const element = event.target;
    if (player1CharacterSelected === null && element.src !== player2CharacterSelected) {
      element.classList.add("selected-character")
      element.classList.add("blue-border");
      player1CharacterSelected = element.src
      pubSub.emit("characterSelected", element.src);
    } else if (player2CharacterSelected === "" && player1CharacterSelected !== element.src) {
      element.classList.add("selected-character")
      element.classList.add("red-border");
      player2CharacterSelected = element.src
      pubSub.emit("characterSelected", element.src);
    }

  }

  function undoCharacterSelected(event) {
    const element = event.target;
    if (element.src === player1CharacterSelected) {
      player1CharacterSelected = null;
      pubSub.emit("resetPlayerChoice", element.src);
      removeBorders(element);
    } else if (element.src === player2CharacterSelected) {
      pubSub.emit("resetPlayerChoice", element.src);
      player2CharacterSelected = "";
      removeBorders(element);
    }
  }

  function removeBorders(element) {
    element.classList.remove("selected-character");
    element.classList.remove("blue-border");
    element.classList.remove("red-border");
  }

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

  function displayCharacterOnPlayer(event) {
    const element = event.target;
    if (element.nodeName === "IMG" && (player2CharacterSelected === "" || player1CharacterSelected === null)) {
      if (element.src !== player1CharacterSelected || element.src !== player2CharacterSelected ) {
        if (element.src === player1CharacterSelected || element.src === player2CharacterSelected) {
          pubSub.emit("characterPreview", "question-mark.svg")
        } else {
          pubSub.emit("characterPreview", element.src)
        }
      }
    }
  }

  function renderCharacterSelectionScreen() {
    pubSub.emit("playCharacterSelectionMusic", null);
    document.body.append(characterSelectionBox);
    document.body.append(charactersBar);
  }

  function startGame() {
    if (player1CharacterSelected !== null && player2CharacterSelected !== null) {
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
  }
}())