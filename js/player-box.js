const playerBox = (function() {
  const player1Box = elementsFactory.newPlayerBox();
  const player2Box = elementsFactory.newOpponentBox();
  const player1Image = player1Box.querySelector("img");
  const player2Image = player2Box.querySelector("img");
  let player1CharacterSelected = false;
  let endSelection = false;

  pubSub.subscribe("characterPreview", displayCharacterPreview);
  pubSub.subscribe("characterSelected", selectCharacter);
  pubSub.subscribe("removeCharacterPreview", removePreview);

  function removePreview() {
    if(!endSelection) {
      if (player1CharacterSelected) {
        player2Image.src = "./img/question-mark.svg";
      } else {
        player1Image.src = "./img/question-mark.svg";
      }
    }
  }

  function selectCharacter(imgSrc) {
    if (player1CharacterSelected) {
      player2Image.src = imgSrc;
      endSelection = true
      pubSub.emit("lock-character-selection", null);
    } else {
      player1Image.src = imgSrc;
      player1CharacterSelected = true;
    }
  }

  function displayCharacterPreview(imgSrc) {
    if (player1CharacterSelected) {
      player2Image.src = imgSrc;
    } else {
      player1Image.src = imgSrc;
    }
  }

  function getPlayersBox() {
    return {player1: player1Box, player2: player2Box}
  }

  return {getPlayersBox}
})()