// Responsible for Display on screen DOM elements related with Music
(function musicElementDisplay() {
  const toggleMusicButton = musicElementFactory.getMusicButton();
  const musicImgPath = toggleMusicButton.querySelector("path");

  toggleMusicButton.addEventListener("click", toggleMusic)

  pubSub.subscribe("displayMusicButton", displayMusicButtonOnScreen);

  function toggleMusic() {
    pubSub.emit("toggleMusic", musicImgPath);
  }

  function displayMusicButtonOnScreen() {
    document.body.append(toggleMusicButton);
  }
})()