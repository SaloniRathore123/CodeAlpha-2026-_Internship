const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playlistList = document.getElementById('playlist-list');

// Song Data (Replace src with your actual audio URLs)
const songs = [
    { title: 'Agar Tum Sath Ho', artist: 'Arijit Singh', src: 'songs/agar_tum_sath_ho.mpeg' },
    { title: 'Agar Tu Hota', artist: 'Arijit Singh', src: 'songs/agar_tu_hota.mpeg' },
    { title: 'Bekhayali', artist: 'Arijit Singh', src: 'songs/bekhayali.mpeg' },
    { title: 'Bhula Dena', artist: 'Arijit Singh', src: 'songs/bhula_dena.mpeg' },
    { title: 'Haan Ke Haan', artist: 'Arijit Singh and Tulsi Kumar', src: 'songs/haan_ke_haan.mpeg'}
];

let songIndex = 0;
let isPlaying = false;

// Initialize
loadSong(songs[songIndex]);
renderPlaylist();

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
}

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

// Controls
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
    renderPlaylist();
});

nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
    renderPlaylist();
});

// Progress Bar & Time
audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display time
    const formatTime = (time) => Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    if (duration) durationEl.innerText = formatTime(duration);
    currentTimeEl.innerText = formatTime(currentTime);
});

// Click on progress bar
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Volume
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Autoplay next song
audio.addEventListener('ended', () => nextBtn.click());

// Playlist Rendering
function renderPlaylist() {
    playlistList.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = `${song.title} - ${song.artist}`;
        if (index === songIndex) li.classList.add('active');
        li.onclick = () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
            renderPlaylist();
        };
        playlistList.appendChild(li);
    });
}