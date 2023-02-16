const playerSelectionFactory = (function() {
  function newPlayerBox(iconBorderClass, playerName) {
    const container = elementsFactory.createElement("div", "player-section", null);
    const playerType = elementsFactory.createElement("h2", "player-type", playerName);
    const playerIcon = elementsFactory.createElement("img", iconBorderClass, null);
    const characterName = elementsFactory.createElement("p", "character-name", null);
    playerIcon.classList.add("player-icon")
    playerIcon.src = "./img/question-mark.svg"
    container.append(characterName);
    container.append(playerIcon);
    container.append(playerType);
    return container;
  }

  function newOpponentBox(iconBorderClass, playerName) {
    const container = newPlayerBox(iconBorderClass, playerName);
    const leftArrow = elementsFactory.createElement("img", "left-arrow", null)
    const rightArrow = elementsFactory.createElement("img", "right-arrow", null)
    leftArrow.src = "./img/arrow-left-bold.svg"
    rightArrow.src = "./img/arrow-right-bold.svg"
    container.append(leftArrow)
    container.append(rightArrow)
    return container;
  }

  return {newPlayerBox, newOpponentBox}
})()