// assigning variables
function qS(selector) {
  return document.querySelector(selector);
}
const heart = qS('.heart');
const img = qS('.img');
const progressElement = qS('.progress');
const progressContainerElement = qS('.progress-container');
const btnProgress = qS('.btn-progress');
const playBtn = qS('#play');
const previous = qS('#previous');
const next = qS('#next');
const songName = qS('.song-name');
const audio = qS('audio');
const volumeIcon = qS('.volume-icon');
const songDuration = qS('.song-duration');
const songCurrentTime = qS('.current-time');
const container = qS('.container');
const range = qS('#volume-range');
const burger = qS('.burger');
const songsMenu = qS('.songs-menu');
const title = qS('.title');
const header = qS('header');
let audioCurrentVolume = audio.volume;

/* Data base*/

const songs = [
  'Pesetas',
  'Away',
  'Time',
  'Rebeus in Oran',
  'Thank God',
  'Understood',
  'Remedy',
];

//index

let index = 0;

/* Functionality */

/*  Song class*/

class Song {
  // upload
  static uploadSong(song) {
    audio.src = `/songs/${song}.mp3`;
    img.src = `/img/${song}.jpg`;
    songName.innerText = `Riles-${song}`;
  }
  // Play
  static playSong() {
    audio.play();
    img.classList.add('rotate');
    playBtn.innerHTML = `<i class="fas fa-pause-circle"></i>`;
  }

  // Pause
  static pauseSong() {
    audio.pause();
    img.classList.remove('rotate');
    playBtn.innerHTML = `<i class="fas fa-play-circle"></i>`;
  }

  // Next song
  static nextSong() {
    if (index >= songs.length - 1) {
      index = -1;
    }
    index++;
    Song.uploadSong(songs[index]);
    Song.playSong();
  }

  // Previous Song
  static previousSong() {
    if (index <= 0) {
      index = songs.length;
    }
    index--;
    Song.uploadSong(songs[index]);
    Song.playSong();
  }

  // Update Progress
  static updateProgress(e) {
    let { currentTime, duration } = e.target;
    if (isNaN(duration)) {
      duration = 0;
    }
    const progressContainer = progressContainerElement.clientWidth;
    const progress = (currentTime * progressContainer) / duration;
    progressElement.style.width = `${progress}px`;
    btnProgress.style.left = `${progress}px`;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    songDuration.innerText = `${minutes}:${seconds}`;
    songCurrentTime.innerText = `${Math.floor(currentTime / 60)}:${Math.floor(
      currentTime % 60
    )}`;
  }

  // Set progress
  static setProgress(e) {
    const target = e.offsetX;
    const progressContainer = progressContainerElement.clientWidth;
    const duration = audio.duration;
    const current = (target * duration) / progressContainer;
    audio.currentTime = current;
  }

  // volume
  static volumeSong(volumePercent) {
    audio.volume = volumePercent / 100;

    if (volumePercent == 0) {
      volumeIcon.innerHTML = `<i class="fas fa-volume-mute "></i>`;
    } else if (volumePercent <= 40) {
      volumeIcon.innerHTML = `<i class="fas fa-volume-down "></i>`;
    } else {
      volumeIcon.innerHTML = `<i class="fas fa-volume-up "></i>`;
    }
  }

  // Favorite song
  static favoriteSong() {
    if (heart.style.color == 'darkorchid') {
      heart.style.color = '#af8b94';
    } else {
      heart.style.color = 'darkorchid';
    }
  }
  //open SongsMenu
  static songsMenuOpen() {
    burger.classList.add('burger-clicked');
    songsMenu.classList.add('visible');
    container.classList.add('container-float');
    songsMenu.appendChild(burger);
  }

  //close SongsMenu
  static songsMenuClosed() {
    burger.classList.remove('burger-clicked');
    songsMenu.classList.remove('visible');
    container.classList.remove('container-float');
    header.insertBefore(burger, title);
  }
}

/*
/* Events */

// Play & Pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    Song.playSong();
  } else {
    Song.pauseSong();
  }
});

// Next & previous

next.addEventListener('click', Song.nextSong);
previous.addEventListener('click', Song.previousSong);

// update & set Progress
audio.addEventListener('timeupdate', Song.updateProgress);
progressContainerElement.addEventListener('click', Song.setProgress);

// volume

range.addEventListener('change', (e) => {
  const volumePercent = e.target.value;
  Song.volumeSong(volumePercent);
});

// Song Ended
audio.addEventListener('ended', Song.nextSong);

// favorite

heart.addEventListener('click', Song.favoriteSong);

// muted
volumeIcon.addEventListener('click', (e) => {
  if (audio.volume === 0) {
    volumeIcon.innerHTML = `<i class="fas fa-volume-up "></i>`;
    audio.volume = 0.5;
    range.value = 50;
  } else {
    volumeIcon.innerHTML = `<i class="fas fa-volume-mute "></i>`;
    audio.volume = 0;
    range.value = 0;
  }
});

// Burger & SongsMenu events

burger.addEventListener('click', (e) => {
  if (burger.classList.contains('burger-clicked')) {
    Song.songsMenuClosed();
  } else {
    Song.songsMenuOpen();
  }
});

// closing SongsMenu by clicking outside

document.addEventListener('click', (e) => {
  const ifClickInsideMenu = songsMenu.contains(e.target);
  const ifClickInsideBurger = burger.contains(e.target);

  if (!ifClickInsideMenu && !ifClickInsideBurger) {
    Song.songsMenuClosed();
  }
});

// playing songs by clicking in the song menu

const songsList = document.querySelectorAll('.songs-menu li');
for (let i = 0; i < songsList.length; i++) {
  songsList[i].addEventListener('click', (e) => {
    Song.uploadSong(songs[i]);
    Song.playSong();
  });
}

/**/

/* keyboard functionality*/
/**/

document.addEventListener('keydown', (e) => {
  // Play & Pause
  if (e.keyCode === 13 || e.keyCode === 32) {
    if (audio.paused) {
      Song.playSong();
    } else {
      Song.pauseSong();
    }
  }
  // song progress

  //  Plus

  if (e.keyCode === 39) {
    current = audio.currentTime;
    current += 5;
    if (current >= audio.duration) {
      Song.nextSong();
    } else {
      audio.volume = 0;
      audio.currentTime = current;
    }
  }

  // Back
  if (e.keyCode === 37) {
    current = audio.currentTime;
    current -= 5;
    if (current >= 0) {
      audio.volume = 0;
      audio.currentTime = current;
    } else {
      audio.currentTime = 0;
    }
  }

  // Volume Up and Down
  if (e.keyCode == 38) {
    range.value = Number(range.value) + 10;

    Song.volumeSong(Number(range.value));
  } else if (e.keyCode == 40) {
    range.value = Number(range.value) - 10;
    Song.volumeSong(Number(range.value));
  }
});

document.addEventListener('keyup', (e) => {
  if (e.keyCode == 39 || e.keyCode == 37) {
    audio.volume = audioCurrentVolume;
  }
});
