(function boardDisplay() {
  const gameBoard = gameSectionDisplay.board;
  const boardCells = Array.from(gameBoard.children);

  pubSub.subscribe("newBoardState", renderBoard);

  function renderBoard(newBoard) {
    const renderValues = newBoard.flat()
    boardCells.forEach(div => {
      const position = boardCells.indexOf(div)
      boardCells[position].innerText = renderValues[position];
    })
  }
})()