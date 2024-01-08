import {StartGameInterface} from "./ui/interfaces/start-game-interface.js";
import "./styles.css"

// Ui
const gameSection = document.body
const startGameInterface = new StartGameInterface();
startGameInterface.init(gameSection)