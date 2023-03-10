(function boardDisplay() {
  const gameBoard = gameSectionDisplay.board;
  const boardCells = Array.from(gameBoard.children);
  let currentBorder = null;
  let currentShadow = null;
  let player1Image = null;
  let player2Image = null;

  pubSub.subscribe("newBoardState", renderBoard);
  pubSub.subscribe("startGame", generateNewGame);
  pubSub.subscribe("changeBoardColor", changeBoardColor)
  pubSub.subscribe("resetGame", resetBoardCells);

  function resetBoardCells() {
    boardCells.forEach(cell => cell.innerHTML = "")
  }

  function changeBoardColor(player) {
    gameBoard.classList.remove(currentBorder);
    gameBoard.classList.remove(currentShadow);
    currentBorder = player.characterBorder;
    currentShadow = player.shadow;
    gameBoard.classList.add(currentBorder);
    gameBoard.classList.add(currentShadow);
  }

  function generateNewGame(players) {
    boardCells.forEach(cell => cell.innerHTML = "")
    player1Image = generateImage(players.player1)
    player2Image = generateImage(players.player2)
  }

  function generateImage(playerObject) {
    const playerImgElement = elementsFactory.createElement("img", null, null);
    playerImgElement.src = playerObject.characterSrc;
    playerImgElement.classList.add(playerObject.characterBorder)
    return playerImgElement
  }

  function renderBoard(newBoard) {
    const renderValues = newBoard.flat()
    boardCells.forEach(div => {
      const position = boardCells.indexOf(div)
      if (renderValues[position] === 1) {
        boardCells[position].innerHTML = ""
        boardCells[position].append(player1Image.cloneNode());
      } else if (renderValues[position] === 2) {
        boardCells[position].innerHTML = ""
        boardCells[position].append(player2Image.cloneNode());
      }
    })
  }
})()