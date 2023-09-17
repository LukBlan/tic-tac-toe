// Responsible for Stopping, Muting and Playing Music
(function musicController() {
  let muteAudio = false;
  let currentMusic = null;

  pubSub.subscribe("toggleMusic", toggleMusic);
  pubSub.subscribe("playMusic", playMusic);

  function toggleMusic() {
    muteAudio = !muteAudio;
    currentMusic.muted = muteAudio;
  }

  function playMusic(musicTrack) {
    const music = musicRepo.getMusic(musicTrack);
    if (currentMusic != null) {
      currentMusic.pause();
    }
    music.muted = muteAudio;
    music.currentTime = 0;
    music.volume = 1;
    music.loop = true;
    currentMusic = music
    music.play();
  }

})()