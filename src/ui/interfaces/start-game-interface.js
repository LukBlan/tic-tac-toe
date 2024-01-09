import {startGameScreen} from "../components/start-game-screen/start-game-screen.js";
import {startGameButton} from "../components/start-game-button/start-game-button.js";

class StartGameInterface {
  constructor() {
    this.starGameScreen = startGameScreen();
    this.startGameButton = startGameButton();
  }

  init(gameSection) {
    this.starGameScreen.append(this.startGameButton)
    gameSection.append(this.starGameScreen);
  }
}

export { StartGameInterface }