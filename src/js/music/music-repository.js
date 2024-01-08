const musicRepo = (function() {
  const musics = {}
  
  function addMusic(musicName) {
    musics[musicName] = new Audio(`./sounds/${musicName}.mp3`);
  }
  
  function getMusic(musicName) {
    return musics[musicName];
  }
  
  function init() {
    addMusic("get-ready");
    addMusic("character-selection");
    addMusic("battle-music");
  }

  init();

  return {getMusic}

})()