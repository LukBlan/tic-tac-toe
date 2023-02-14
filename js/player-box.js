const playerBox = (function() {
  const player1Box = elementsFactory.newPlayerBox("player1");
  const player2Box = elementsFactory.newPlayerBox("player2");

  function getPlayersBox() {
    return {player1: player1Box, player2: player2Box}
  }

  return {getPlayersBox}
})()