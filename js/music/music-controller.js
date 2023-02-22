// Responsible for Stopping, Muting and Playing Music
(function musicController() {
  let muteAudio = false;
  const getReady = new Audio('./sounds/get-ready.mp3');
  const characterSelection = new Audio('./sounds/character-selection.mp3');
  const battleMusic = new Audio('./sounds/battle-music.mp3');
  let currentMusic = null;

  pubSub.subscribe("playCharacterSelectionMusic", playCharacterSelection)
  pubSub.subscribe("playGetReadyAudio", playGetReady)
  pubSub.subscribe("toggleMusic", toggleMusic);
  pubSub.subscribe("playBattleMusic", playBattleMusic);

  function toggleMusic() {
    muteAudio = !muteAudio;
    currentMusic.muted = muteAudio;
  }

  function playBattleMusic() {
    playMusic(battleMusic)
  }

  function playCharacterSelection() {
    playMusic(characterSelection);
  }

  function playMusic(musicTrack) {
    musicTrack.muted = muteAudio;
    musicTrack.currentTime = 0;
    musicTrack.volume = 1;
    musicTrack.loop = true;
    currentMusic = musicTrack
    musicTrack.play();
  }


  function playGetReady() {
    characterSelection.pause();
    getReady.muted = muteAudio;
    getReady.currentTime = 0;
    getReady.volume = 1;
    currentMusic = getReady
    getReady.play();
  }
})()