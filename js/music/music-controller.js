// Responsible for Stopping and Playing Music
(function musicController() {
  let muteAudio = false;
  const getReady = new Audio('./sounds/get-ready.mp3');
  const characterSelection = new Audio('./sounds/character-selection.mp3');
  let currentMusic = null;

  pubSub.subscribe("playCharacterSelectionMusic", playCharacterSelection)
  pubSub.subscribe("playGetReadyAudio", playGetReady)
  pubSub.subscribe("toggleMusic", toggleMusic);

  function toggleMusic() {
    muteAudio = !muteAudio;
    currentMusic.muted = muteAudio;
  }

  function playCharacterSelection() {
    characterSelection.currentTime = 0;
    characterSelection.volume = 1;
    characterSelection.loop = true;
    currentMusic = characterSelection
    characterSelection.play();
  }

  function playGetReady() {
    characterSelection.pause();
    getReady.currentTime = 0;
    getReady.volume = 1;
    currentMusic = getReady
    getReady.play();
  }
})()