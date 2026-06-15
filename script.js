document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    const particlesContainer = document.getElementById("particles");
    const clockElement = document.getElementById("live-clock");

    const playlist = [
        {
            title: "Night Dancer",
            artist: "Imase",
            src: "night-dancer.mp3",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ZfkDdMqggoblBRWpts1b4z5qKBxUXD9PMPEH6SY&s=0"
        },
        {
            title: "Mất Kết Nối",
            artist: "Dương Domic",
            src: "mat-ket-noi.mp3",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIsh35wMm9pJek6My76E7_bFgJB-kNHrjOUJYZF9w&s=0"
        },
        {
            title: "Come My Way",
            artist: "Sơn Tùng M-TP",
            src: "come-my-way.mp3",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTujTSODMYgr8KQYId0Xi8Rk9aj6a4_xzdaPjNSuG8&s=0"
        }
    ];

    let trackIndex = Math.floor(Math.random() * playlist.length);
    let isPlaying = false;
    const audio = new Audio();

    const trackTitle = document.getElementById("track-title");
    const trackArtist = document.getElementById("track-artist");
    const trackDisk = document.getElementById("track-disk");
    const playBtn = document.getElementById("play-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const progressBar = document.getElementById("progress-bar");
    const progressContainer = document.querySelector(".progress-container");
    const currentTimeEl = document.getElementById("current-time");
    const totalDurationEl = document.getElementById("total-duration");

    function loadTrack(track) {
        trackTitle.innerText = track.title;
        trackArtist.innerText = track.artist;
        trackDisk.style.backgroundImage = `url('${track.cover}')`;
        audio.src = track.src;
    }

    loadTrack(playlist[trackIndex]);

    function togglePlay() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }

    function playTrack() {
        isPlaying = true;
        audio.play().catch(e => console.log(e));
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        trackDisk.style.animationPlayState = 'running';
    }

    function pauseTrack() {
        isPlaying = false;
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        trackDisk.style.animationPlayState = 'paused';
    }

    function updateProgress() {
        if (!audio.duration) return;
        const { duration, currentTime } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        const currentMins = Math.floor(currentTime / 60);
        let currentSecs = Math.floor(currentTime % 60);
        if (currentSecs < 10) currentSecs = `0${currentSecs}`;
        currentTimeEl.innerText = `${currentMins}:${currentSecs}`;

        const totalMins = Math.floor(duration / 60);
        let totalSecs = Math.floor(duration % 60);
        if (totalSecs < 10) totalSecs = `0${totalSecs}`;
        totalDurationEl.innerText = `${totalMins}:${totalSecs}`;
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        if (duration) {
            audio.currentTime = (clickX / width) * duration;
        }
    }

    playBtn.addEventListener("click", togglePlay);
    
    nextBtn.addEventListener("click", () => {
        trackIndex = (trackIndex + 1) % playlist.length;
        loadTrack(playlist[trackIndex]);
        playTrack();
    });

    prevBtn.addEventListener("click", () => {
        trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(playlist[trackIndex]);
        playTrack();
    });

    audio.addEventListener("timeupdate", updateProgress);
    
    audio.addEventListener("ended", () => {
        trackIndex = (trackIndex + 1) % playlist.length;
        loadTrack(playlist[trackIndex]);
        playTrack();
    });

    progressContainer.addEventListener("click", setProgress);

    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('vi-VN', { hour12: false });
        clockElement.innerText = timeString;
    }
    
    setInterval(updateClock, 1000);
    updateClock();

    welcomeScreen.addEventListener("click", () => {
        welcomeScreen.classList.add("zoom-away");
        setTimeout(() => {
            welcomeScreen.style.display = "none";
        }, 900);

        mainContent.style.opacity = "1";
        mainContent.style.transform = "scale(1)";

        audio.volume = 0.5;
        playTrack();
    });

    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.innerText = "❄";
        const size = Math.random() * 15 + 10;
        particle.style.fontSize = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `-30px`;
        const duration = Math.random() * 5 + 3;
        particle.style.animationDuration = `${duration}s`;
        particlesContainer.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    setInterval(createParticle, 150);
});