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
const container = document.querySelector('.container');
const range = document.querySelector('#volume-range');
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
let index = 0;
/* Functionality */

class Song {
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
    let { currentTime, duration } = e.target;
    if (isNaN(duration)) {
      console.log(9);
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
  static volumeSong(e) {
    if (e.type == 'change') {
      const volumePercent = e.target.value;
      console.log(e);
      if (volumePercent == 0) {
        volumeIcon.innerHTML = `<i class="fas fa-volume-mute "></i>`;
      } else if (volumePercent <= 40) {
        volumeIcon.innerHTML = `<i class="fas fa-volume-down "></i>`;
      } else {
        volumeIcon.innerHTML = `<i class="fas fa-volume-up "></i>`;
      }

      audio.volume = volumePercent / 100;
    }
  }

  // Favorite song
  static favoriteSong() {
    heart.style.color == '#ff4f84'
      ? (heart.style.color = '#fef1f5')
      : (heart.style.color = '#ff4f84');
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

// keyboard functionality
let audioCurrentVolume = audio.volume;
container.addEventListener('keydown', (e) => {
  // Play & Pause
  if (e.keyCode === 13 || e.keyCode === 32) {
    if (audio.paused) {
      audio.play;
    } else {
      audio.pause;
    }
  }
  // song progress plus
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
  // song progress back

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

  // Volume Up
  if (e.keyCode === 38) {
    Song.volumeSong(e);
  }
});
container.addEventListener('keyup', (e) => {
  if (e.keyCode == 37 || e.keyCode == 39) {
    audio.volume = audioCurrentVolume;
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

// muted
volumeIcon.addEventListener('click', (e) => {
  if (audio.volume === 0) {
    volumeIcon.innerHTML = `<i class="fas fa-volume-up "></i>`;
    audio.volume = 1;
  } else {
    volumeIcon.innerHTML = `<i class="fas fa-volume-mute "></i>`;
    audio.volume = 0;
  }

  console.log('volume muted');
});

/// my i need
//  else {
//   if (e.keyCode === 38) {
//     if (audio.volume >= 0.9) {
//       audio.volume = 0.9;
//     } else {
//       audio.volume += 0.1;

//       range.valueAsNumber += 10;
//       if (audio.volume === 0) {
//         volumeIcon.innerHTML = `<i class="fas fa-volume-mute "></i>`;
//       } else if (audio.volume <= 0.4) {
//         volumeIcon.innerHTML = `<i class="fas fa-volume-down "></i>`;
//       } else {
//         volumeIcon.innerHTML = `<i class="fas fa-volume-up "></i>`;
//       }
//     }
//   }
// }
