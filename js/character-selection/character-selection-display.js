(function characterSelectionDisplay() {
  const characterSelectionBox = characterSelectionFactory.getPlayersChoiceSection();
  const charactersBar = characterSelectionFactory.getCharactersBar()
  const fightButton = charactersBar.querySelector("button");
  let player1CharacterSelected = null;
  let player2CharacterSelected = "";

  pubSub.subscribe("goToCharacterSelection", renderCharacterSelectionScreen);

  charactersBar.addEventListener("mouseover", displayCharacterOnPlayer);
  charactersBar.addEventListener("mouseout", removeCharacterPreview);
  charactersBar.addEventListener("click", clickCharacter);
  fightButton.addEventListener("click", startGame);


  function clickCharacter(event) {
    const element = event.target;
    const imgSrc = event.target.src;
    if (element.nodeName === "IMG") {
      if (imgSrc === player1CharacterSelected || imgSrc === player2CharacterSelected) {
        undoCharacterSelected(event);
      } else {
        selectCharacter(event);
      }
    }
  }

  function selectCharacter(event) {
    const element = event.target;
    const imgSrc = event.target.src;
    if (player1CharacterSelected === null && imgSrc !== player2CharacterSelected) {
      addColoredBorderToName(element, "blue-border");
      player1CharacterSelected = imgSrc
      pubSub.emit("characterSelected", imgSrc);
    } else if (player2CharacterSelected === "" && player1CharacterSelected !== imgSrc) {
      addColoredBorderToName(element, "red-border");
      player2CharacterSelected = imgSrc;
      pubSub.emit("characterSelected", imgSrc);
    }
  }

  function addColoredBorderToName(element, borderName) {
    element.classList.add("selected-character")
    element.classList.add(borderName);
  }

  function undoCharacterSelected(event) {
    const element = event.target;
    const imgSrc = event.target.src;
    if (imgSrc === player1CharacterSelected) {
      player1CharacterSelected = null;
      pubSub.emit("resetPlayerChoice", imgSrc);
      removeBorders(element);
    } else if (imgSrc === player2CharacterSelected) {
      pubSub.emit("resetPlayerChoice", imgSrc);
      player2CharacterSelected = "";
      removeBorders(element);
    }
  }

  function removeBorders(element) {
    element.classList.remove("selected-character");
    element.classList.remove("blue-border");
    element.classList.remove("red-border");
  }

  function removeCharacterPreview(event) {
    const element = event.target;
    if (element.nodeName === "IMG") {
      pubSub.emit("removeCharacterPreview", null)
    }
  }

  function displayCharacterOnPlayer(event) {
    const element = event.target;
    const imgSrc = event.target.src;
    if (element.nodeName === "IMG" && (player2CharacterSelected === "" || player1CharacterSelected === null)) {
      if (imgSrc !== player1CharacterSelected || imgSrc !== player2CharacterSelected ) {
        if (imgSrc === player1CharacterSelected || imgSrc === player2CharacterSelected) {
          pubSub.emit("characterPreview", "question-mark.svg")
        } else {
          pubSub.emit("characterPreview", imgSrc)
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
    if (player1CharacterSelected !== null && player2CharacterSelected !== "") {
      pubSub.emit("playGetReadyAudio", null);
      pubSub.emit("hide-arrows", null);
      document.body.removeChild(charactersBar);
      characterSelectionBox.classList.add("huge-padding");
      setTimeout(() => {
        document.body.removeChild(characterSelectionBox);
        pubSub.emit("playBattleMusic", null);
        pubSub.emit("createPlayers", null);
        characterSelectionBox.classList.remove("huge-padding");
      }, 3000);
    }
  }
}())