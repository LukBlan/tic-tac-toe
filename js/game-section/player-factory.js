const playerFactory = (function() {
  const playerFunctions = {
    "Player": function (characterSrc, border, number) {
       return {
        characterSrc: characterSrc,
        characterBorder: border,
        choice: null,
        playerNumber: number,
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

  function newPlayer(playerType, characterSrc, border, number) {
    return playerFunctions[playerType](characterSrc, border, number);
  }

  return {newPlayer}
})()