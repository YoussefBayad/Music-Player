const heart = document.querySelector('.heart');
const img = document.querySelector('.img');
const progressElement = document.querySelector('.progress');
const progressContainerElement = document.querySelector('.progress-container');
const btnProgress = document.querySelector('.btn-progress');
const playBtn = document.querySelector('#play');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const songName = document.querySelector('.song-name');
const audio = document.querySelector('audio');
const volumeInput = document.querySelector('.volume');
const volumeIcon = document.querySelector('.volume-icon');
const songDuration = document.querySelector('.song-duration');
const songCurrentTime = document.querySelector('.current-time');

/* Data base*/
const songs = [
  'PESETAS',
  'Away',
  'Time',
  'Rebeus in Oran',
  'Thank God',
  'Understood',
];
let index = 0;
/* Functionality */

class Song {
  static uploadSong(song) {
    audio.src = `/songs/${song}.mp3`;
    img.src = `/img/${song}.jpg`;
    songName.innerText = `${song}`;
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

  // Song End
  static endSong() {
    Song.nextSong();
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
    const { currentTime, duration } = e.target;
    const progressContainer = progressContainerElement.clientWidth;
    const progress = (currentTime * progressContainer) / duration;
    progressElement.style.width = `${progress}px`;
    btnProgress.style.left = `${progress}px`;
    songDuration.innerText = `${Math.floor(duration / 60)}:${Math.floor(
      duration % 60
    )}`;
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
  static volumeSong(e) {
    const volumePercent = e.target.value;
    if (volumePercent == 0) {
      volumeIcon.innerHTML = `<i class="fas fa-volume-mute "></i>`;
    } else if (volumePercent <= 40) {
      volumeIcon.innerHTML = `<i class="fas fa-volume-down "></i>`;
    } else {
      volumeIcon.innerHTML = `<i class="fas fa-volume-up "></i>`;
    }

    audio.volume = volumePercent / 100;
  }
  static favoriteSong() {
    heart.style.color == 'black'
      ? (heart.style.color = '#fef1f5')
      : (heart.style.color = 'black');
  }
}

/* Events */

// Play & Pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    Song.playSong();
  } else {
    Song.pauseSong();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 13 || e.keyCode == 32) {
    if (audio.paused) {
      Song.playSong();
    } else {
      Song.pauseSong();
    }
  }
});

// Next & previous

next.addEventListener('click', Song.nextSong);
previous.addEventListener('click', Song.previousSong);

// update & set Progress
audio.addEventListener('timeupdate', Song.updateProgress);
progressContainerElement.addEventListener('click', Song.setProgress);

// volume
volumeInput.addEventListener('change', Song.volumeSong);

// Song Ended
audio.addEventListener('ended', Song.endSong);

// favorite

heart.addEventListener('click', Song.favoriteSong);
