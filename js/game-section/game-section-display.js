const gameSectionDisplay = (function gameSection() {
  const board = gameSectionFactory.getGameSection();
  const menu = gameSectionFactory.getMenu();

  pubSub.subscribe("startGame", renderGameSection);

  function renderGameSection() {
    document.body.append(board);
    document.body.append(menu);
  }

  return {board}
})()