const playerFactory = (function() {
  const playerFunctions = {
    "Player": {
      create: function (characterSrc, border, number, playerShadow) {
        const currentPlayer = Object.create(this);
        currentPlayer.characterSrc = characterSrc;
        currentPlayer.characterBorder = border;
        currentPlayer.choice = null;
        currentPlayer.playerNumber = number;
        currentPlayer.shadow = playerShadow;
        return currentPlayer;
      },

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
      },
    },
  }

  function newPlayer(playerType, characterSrc, border, number, playerShadow) {
    return playerFunctions[playerType].create(characterSrc, border, number, playerShadow);
  }

  return {newPlayer}
})()