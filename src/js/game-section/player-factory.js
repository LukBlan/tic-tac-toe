const playerFactory = (function() {
  const playerFunctions = {
    "Player": {
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

    "Easy-IA": {
      startTurn: function () {
        pubSub.emit("computerRandomMove", this)
      },

      makeMove: function (number) {
        this.choice = number;
        pubSub.emit("checkChoice", this);
      },

      finishTurn: function() {
        pubSub.emit("nextTurn", null)
      },
    }
  }

  function newPlayer(playerType, characterSrc, border, number, playerShadow) {
    const create = function (newPlayer, characterSrc, border, number, playerShadow) {
      const currentPlayer = Object.create(newPlayer);
      currentPlayer.characterSrc = characterSrc;
      currentPlayer.characterBorder = border;
      currentPlayer.choice = null;
      currentPlayer.playerNumber = number;
      currentPlayer.shadow = playerShadow;
      return currentPlayer;
    }

    const playerOption = playerType.replaceAll(" ", "-");
    const newPlayer =  playerFunctions[playerOption];
    return create(newPlayer, characterSrc, border, number, playerShadow);
  }

  return {newPlayer}
})()