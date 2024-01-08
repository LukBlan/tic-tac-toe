import {startGameScreen} from "../components/start-game-screen/start-game-screen.js";

class StartGameInterface {
  constructor() {
    this.starGameScreen = startGameScreen();
    this.startGameButton;
  }

  init(gameSection) {
    gameSection.append(this.starGameScreen);
  }
}

export { StartGameInterface }