const opponentOptionDisplay = (function() {
  const player2Box = playerSelectionDisplay.getPlayersBox().player2
  const player2Type = player2Box.querySelector(".player-type");
  const leftArrow = player2Box.querySelector(".left-arrow");
  const rightArrow = player2Box.querySelector(".right-arrow");
  const player2Options = ["Player", "Easy IA"];
  let currentDifficulty = "Player"

  pubSub.subscribe("hide-arrows", hideArrows);
  pubSub.subscribe("show-arrows", showArrows);
  pubSub.subscribe("goToCharacterSelection", resetCurrentDifficulty)

  leftArrow.addEventListener("click", getNewPlayer2Type);
  rightArrow.addEventListener("click", getNewPlayer2Type);

  function resetCurrentDifficulty() {
    currentDifficulty = "Player";
    renderNewType()
  }

  function getCurrentDifficulty() {
    return currentDifficulty;
  }

  function getNewPlayer2Type(event) {
    const currenTypePosition = player2Options.indexOf(currentDifficulty);
    const newTypePosition = rotation(event.target, currenTypePosition);
    currentDifficulty = player2Options[newTypePosition];
    renderNewType()
  }

  function rotation(arrow, value) {
    let rotationFunction;
    if (arrow === leftArrow) {
      rotationFunction = (() => (((value - 1) % 2) + 2) % 2)();
    } else {
      rotationFunction = (() => (value + 1) % 2)();
    }
    return rotationFunction;
  }

  function renderNewType() {
    player2Type.innerText = currentDifficulty;
  }

  function hideArrows() {
    leftArrow.classList.add("hide-element");
    rightArrow.classList.add("hide-element");
  }

  function showArrows() {
    leftArrow.classList.remove("hide-element");
    rightArrow.classList.remove("hide-element");
  }

  return {getCurrentDifficulty}
})()