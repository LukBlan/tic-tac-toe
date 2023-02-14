(function boardDisplay() {
  const gameBoardElement = document.querySelector(".gameBoard");
  const boardCells = Array.from(gameBoardElement.children);

  pubSub.subscribe("newBoardState", renderBoard);

  function renderBoard(newBoard) {
    const renderValues = newBoard.flat()
    boardCells.forEach(div => {
      const position = boardCells.indexOf(div)
      boardCells[position].innerText = renderValues[position];
    })
  }
})()