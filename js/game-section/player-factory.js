const playerFactory = (function() {
  const playerFunctions = {
    "Player": function (characterSrc, border, number, playerShadow) {
       return {
         characterSrc: characterSrc,
         characterBorder: border,
         choice: null,
         playerNumber: number,
         shadow: playerShadow,
         startTurn: function () {
           pubSub.emit("playerMove", this)
         },
         makeMove: function (number) {
           this.choice = number;
           pubSub.emit("checkChoice", this);
           },
         finishTurn: function() {
           pubSub.emit("disablePlayerMove", null)
           pubSub.emit("nextTurn", null)
         }
       }
    },
  }

  function newPlayer(playerType, characterSrc, border, number, playerShadow) {
    return playerFunctions[playerType](characterSrc, border, number, playerShadow);
  }

  return {newPlayer}
})()