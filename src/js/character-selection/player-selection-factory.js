const playerSelectionFactory = (function() {
  function newPlayerBox(iconBorderClass) {
    const container = elementsFactory.createElement("div", "player-section", null);
    const playerType = elementsFactory.createElement("h2", "player-type", "Player");
    const playerIcon = elementsFactory.createElement("img", iconBorderClass, null);
    const characterName = elementsFactory.createElement("p", "character-name", null);
    playerIcon.classList.add("player-icon")
    playerIcon.src = "./img/question-mark.svg"
    container.append(characterName);
    container.append(playerIcon);
    container.append(playerType);
    return container;
  }

  function newOpponentBox(iconBorderClass) {
    const container = newPlayerBox(iconBorderClass);
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