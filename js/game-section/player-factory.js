const playerFactory = (function() {
  const playerFunctions = {
    "Player": function (characterName, border, number) {
       return {
        characterSrc: `./img/${characterName}.png`,
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

  function newPlayer(playerType, characterName, border, number) {
    return playerFunctions[playerType](characterName, border, number);
  }

  return {newPlayer}
})()