// Responsible for create DOM Elements Related to Character Selection Screen
const characterSelectionFactory = (function() {
  function getPlayersChoiceSection() {
    const container = elementsFactory.createElement("div", "player-choice-section", null)
    const playersBox = playerSelectionDisplay.getPlayersBox();
    const vsElement = elementsFactory.createElement("p", "character-selection-vs", "VS");
    container.append(playersBox.player1);
    container.append(vsElement);
    container.append(playersBox.player2);
    return container;
  }

  function getCharactersBar() {
    const container = elementsFactory.createElement("div", "character-bar-section", null);
    const readyButton = elementsFactory.createElement("button", "red-button", "Fight!");
    const characterBar = elementsFactory.createElement("div", "character-bar", null);
    const charactersNames = ["alex", "roger", "alisa", "mokujin", "d-jin", "nina", "a-king",
      "asuka", "ganryu", "king", "marshall", "xiaoyu", "jin", "kazuya", "kuma", "miharu",
      "panda", "jinpachi", "jaycee", "paul"]
    charactersNames.forEach(name => {
      const image = elementsFactory.createElement("img", null, null);
      image.src = `./img/characters-icons/${name}.png`
      characterBar.append(image);
    })
    container.append(characterBar);
    container.append(readyButton);
    return container;
  }

  return {getPlayersChoiceSection, getCharactersBar}
})()