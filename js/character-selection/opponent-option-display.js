const opponentOptionDisplay = (function() {
  const player2Box = playerSelectionDisplay.getPlayersBox().player2
  const player2Type = player2Box.querySelector(".player-type");
  const leftArrow = player2Box.querySelector(".left-arrow");
  const rightArrow = player2Box.querySelector(".right-arrow");
  const player2Options = ["Player", "Easy IA", "Hell IA"];

  pubSub.subscribe("hide-arrows", hideArrows);

  leftArrow.addEventListener("click", getNewPlayer2Type);
  rightArrow.addEventListener("click", getNewPlayer2Type);

  function getCurrentDifficulty() {
    return player2Type.innerText;
  }

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
    } else {
      rotationFunction = (() => (value + 1) % 3)();
    }
    return rotationFunction;
  }

  function renderNewType(newType) {
    player2Type.innerText = newType;
  }

  function hideArrows() {
    leftArrow.classList.add("hide-element");
    rightArrow.classList.add("hide-element");
  }

  return {getCurrentDifficulty}
})()