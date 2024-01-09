import "./start-game-button.css"

function startGameButton() {
  const button = document.createElement("button")
  button.classList.add("red-button")
  button.innerText = "Start Game"
  return button;
}

export { startGameButton }