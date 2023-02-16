const playerSelectionDisplay = (function() {
  const player1Box = playerSelectionFactory.newPlayerBox("blue-border", "Player 1");
  const player2Box = playerSelectionFactory.newOpponentBox("red-border", "Player 2");
  const player1Image = player1Box.querySelector("img");
  const player2Image = player2Box.querySelector("img");
  const player1CharacterName = player1Box.querySelector(".character-name");
  const player2CharacterName = player2Box.querySelector(".character-name");
  const player2Type = player2Box.querySelector(".player-type");
  const leftArrow = player2Box.querySelector(".left-arrow");
  const rightArrow = player2Box.querySelector(".right-arrow");
  const player2Options = ["Player 2", "Easy IA", "Hell IA"];
  let player1CharacterSelected = false;
  let endSelection = false;

  leftArrow.addEventListener("click", getNewPlayer2Type);
  rightArrow.addEventListener("click", getNewPlayer2Type);

  function getNewPlayer2Type(event) {
    const currenType = player2Type.innerText;
    const currenTypePosition = player2Options.indexOf(currenType);
    const newTypePosition = rotation(event.target, currenTypePosition);
    const newType = player2Options[newTypePosition];
    renderNewType(newType)
  }

  function rotation(arrow, value) {
    let rotationFunction;
    if (arrow === leftArrow) {
      rotationFunction = (() => (((value - 1) % 3) + 3) % 3)();
      console.log()
    } else {
      rotationFunction = (() => (value + 1) % 3)();
    }
    return rotationFunction;
  }

  function renderNewType(newType) {
    player2Type.innerText = newType;
  }

  pubSub.subscribe("characterPreview", displayCharacterPreview);
  pubSub.subscribe("characterSelected", selectCharacter);
  pubSub.subscribe("removeCharacterPreview", removePreview);
  pubSub.subscribe("hide-arrows", hideArrows);

  function hideArrows() {
    leftArrow.classList.add("hide-element");
    rightArrow.classList.add("hide-element");
  }

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