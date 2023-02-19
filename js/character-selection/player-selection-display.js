const playerSelectionDisplay = (function() {
  const player1Box = playerSelectionFactory.newPlayerBox("blue-border");
  const player2Box = playerSelectionFactory.newOpponentBox("red-border");
  const player1Image = player1Box.querySelector("img");
  const player2Image = player2Box.querySelector("img");
  const player1CharacterName = player1Box.querySelector(".character-name");
  const player2CharacterName = player2Box.querySelector(".character-name");
  let player1CharacterSelected = false;
  let player2CharacterSelected = false;

  pubSub.subscribe("characterPreview", displayCharacterPreview);
  pubSub.subscribe("characterSelected", selectCharacter);
  pubSub.subscribe("removeCharacterPreview", removePreview);
  pubSub.subscribe("resetPlayerChoice", resetPlayer);
  pubSub.subscribe("createPlayers", createPlayers);

  function createPlayers() {
    const player1 = playerFactory.newPlayer("Player", player1Image.src, "blue-border", 1);
    const player2 = playerFactory.newPlayer(
      opponentOptionDisplay.getCurrentDifficulty(),
      player2Image.src,
      "red-border",
      2
    )
    pubSub.emit("startGame", {player1, player2});
  }

  function resetPlayer(imgSrc) {
    if (imgSrc === player1Image.src) {
      player1CharacterSelected = false;
    } else {
      player2CharacterSelected = false;
    }
    removePreview();
  }

  function getCharacterName(imgSrc) {
    const regularExpression = /([\w-]+).png/
    const name = imgSrc.match(regularExpression)[1];
    return name.replaceAll("-", " ");
  }

  function removePreview() {
    if (!player1CharacterSelected) {
      renderCharacterName(player1CharacterName, "");
      renderCharacterImage(player1Image, "./img/question-mark.svg");
    }
    if (!player2CharacterSelected){
      renderCharacterName(player2CharacterName, "");
      renderCharacterImage(player2Image, "./img/question-mark.svg");
    }
  }

  function selectCharacter(imgSrc) {
    const characterName = getCharacterName(imgSrc);
    if (!player1CharacterSelected) {
      renderCharacterName(player1CharacterName, characterName);
      renderCharacterImage(player1Image, imgSrc);
      player1CharacterSelected = true;
    } else if (!player2CharacterSelected) {
      renderCharacterName(player2CharacterName, characterName);
      renderCharacterImage(player2Image, imgSrc);
      player2CharacterSelected = true;
    }
  }

  function displayCharacterPreview(imgSrc) {
    if (imgSrc.includes("question")) {
      if (player1CharacterSelected) {
        renderCharacterImage(player2Image, "./img/question-mark.svg");
      } else {
        renderCharacterImage(player1Image, "./img/question-mark.svg");
      }
    } else {
      const characterName = getCharacterName(imgSrc);
      if (!player1CharacterSelected) {
        renderCharacterName(player1CharacterName, characterName);
        renderCharacterImage(player1Image, imgSrc);
      } else {
        renderCharacterName(player2CharacterName, characterName);
        renderCharacterImage(player2Image, imgSrc);
      }
    }
  }

  function getPlayersBox() {
    return {player1: player1Box, player2: player2Box}
  }

  function renderCharacterName(element, newName) {
    element.innerText = newName;
  }

  function renderCharacterImage(element, imgSrc) {
    element.src = imgSrc;
  }

  return {getPlayersBox}
})()