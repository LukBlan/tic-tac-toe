const gameSection = (function gameSection() {
  const board = elementsFactory.getGameSection();
  const menu = elementsFactory.getMenu();

  pubSub.subscribe("startGame", renderGameSection);

  function renderGameSection() {
    document.body.append(board);
    document.body.append(menu);
  }

  return {board}
})()