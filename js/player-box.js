const playerBox = (function() {
  const player1Box = elementsFactory.newPlayerBox();
  const player2Box = elementsFactory.newPlayerBox();

  function getPlayersBox() {
    return {player1: player1Box, player2: player2Box}
  }

  return {getPlayersBox}
})()