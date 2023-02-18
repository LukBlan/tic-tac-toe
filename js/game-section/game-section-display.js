const gameSectionDisplay = (function gameSection() {
  const board = gameSectionFactory.getGameSection();
  const boardCells = Array.from(board.childNodes)
  const menu = gameSectionFactory.getMenu();
  let currentPlayerMoveAction;

  pubSub.subscribe("startGame", renderGameSection);
  pubSub.subscribe("playerMove", letPlayerMakeAMove)
  pubSub.subscribe("disablePlayerMove", disablePlayerMove)

  function letPlayerMakeAMove(currentPlayer) {
    currentPlayerMoveAction = currentPlayer;
    board.addEventListener("click", playerMakeMove);
  }

  function disablePlayerMove() {
    board.removeEventListener("click", playerMakeMove);
  }

  function playerMakeMove(event) {
    if (event.target.nodeName === "DIV") {
      currentPlayerMoveAction.makeMove(boardCells.indexOf(event.target))
    }
  }

  function renderGameSection() {
    document.body.append(board);
    document.body.append(menu);
  }

  return {board}
})()