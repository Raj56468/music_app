const play = document.getElementById('play');
const progressBar = document.getElementById('progressBar');
const audio = new Audio('assets/song-1.mp3');
let Playlist = Array.from(document.querySelectorAll('.playlist'));

MakeAllPlay = () => {
    Playlist.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Playlist.forEach((element) => {
    element.addEventListener('click', (e) => {
        MakeAllPlay();
        let songId = e.target.id;
        audio.src = `assets/${songId}.mp3`;
        audio.play();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index = parseInt(songId);
        audio.src = `assets/${index}.mp3`;
        audio.currentTime = 0;
        audio.play();
    })
})

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
})

progressBar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});