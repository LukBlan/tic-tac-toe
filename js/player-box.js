const playerBox = (function() {
  const player1Box = elementsFactory.newPlayerBox("blue-border", "Player 1");
  const player2Box = elementsFactory.newOpponentBox("red-border", "Player 2");
  const player1Image = player1Box.querySelector("img");
  const player2Image = player2Box.querySelector("img");
  const player1CharacterName = player1Box.querySelector(".character-name");
  const player2CharacterName = player2Box.querySelector(".character-name");
  let player1CharacterSelected = false;
  let endSelection = false;

  pubSub.subscribe("characterPreview", displayCharacterPreview);
  pubSub.subscribe("characterSelected", selectCharacter);
  pubSub.subscribe("removeCharacterPreview", removePreview);

  function getCharacterName(imgSrc) {
    const regularExpression = /([\w-]+).png/
    const name = imgSrc.match(regularExpression)[1];
    return name.replaceAll("-", " ");
  }

  function removePreview() {
    if (player1CharacterSelected) {
      player2CharacterName.innerText = "";
      player2Image.src = "./img/question-mark.svg";
    } else {
      player1CharacterName.innerText = "";
      player1Image.src = "./img/question-mark.svg";
    }
  }

  function selectCharacter(imgSrc) {
    const characterName = getCharacterName(imgSrc);
    if (player1CharacterSelected) {
      player2CharacterName.innerText = characterName;
      player2Image.src = imgSrc;
      endSelection = true
      pubSub.emit("lock-character-selection", null);
    } else {
      player1CharacterName.innerText = characterName;
      player1Image.src = imgSrc;
      player1CharacterSelected = true;
    }
  }

  function displayCharacterPreview(imgSrc) {
    const characterName = getCharacterName(imgSrc);
    if (player1CharacterSelected) {
      player2CharacterName.innerText = characterName;
      player2Image.src = imgSrc;

    } else {
      player1Image.src = imgSrc;
      player1CharacterName.innerText = characterName;
    }
  }

  function getPlayersBox() {
    return {player1: player1Box, player2: player2Box}
  }

  return {getPlayersBox}
})()