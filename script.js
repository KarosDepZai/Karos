document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const loadingState = document.getElementById("loading-state");
    const readyState = document.getElementById("ready-state");
    const welcomeBox = document.getElementById("welcome-box");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const particlesContainer = document.getElementById("particles");
    const clockElement = document.getElementById("live-clock-text");
    
    let isReady = false;

    function updateClock() {
        clockElement.innerText = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    }
    
    setInterval(updateClock, 1000);
    updateClock();

    setTimeout(() => {
        loadingState.style.display = "none";
        readyState.style.display = "block";
        welcomeBox.classList.add("ready-hover");
        welcomeScreen.style.cursor = "pointer";
        isReady = true;
    }, 2000);

    welcomeScreen.addEventListener("click", () => {
        if (!isReady) return;
        welcomeScreen.style.opacity = "0";
        setTimeout(() => {
            welcomeScreen.style.display = "none";
        }, 800);
        mainContent.style.opacity = "1";
        mainContent.style.transform = "scale(1)";
        bgMusic.volume = 0.5; 
        bgMusic.play().catch(e => console.log(e));
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

    const DISCORD_ID = "1379451220602654782"; 

    async function fetchLanyard() {
        try {
            const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
            const { data } = await res.json();
            
            if(!data) return;

            const user = data.discord_user;
            document.getElementById("discord-name").innerText = user.global_name || user.username;
            document.getElementById("discord-username").innerText = user.username;
            document.getElementById("discord-avatar").src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
            
            if(user.banner) {
                document.getElementById("discord-banner").style.backgroundImage = `url('https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=512')`;
            }

            const statusDot = document.getElementById("discord-status");
            statusDot.className = "d-status status-" + data.discord_status;

            const activityBox = document.getElementById("discord-activity");
            
            if (data.spotify) {
                activityBox.style.display = "flex";
                document.getElementById("act-title").innerText = "ĐANG NGHE SPOTIFY";
                document.getElementById("act-title").style.color = "#1db954";
                document.getElementById("act-icon").src = data.spotify.album_art_url;
                document.getElementById("act-name").innerText = data.spotify.song;
                document.getElementById("act-details").innerText = "Bởi " + data.spotify.artist;
                document.getElementById("act-state").innerText = "Album: " + data.spotify.album;
            } else if (data.activities.length > 0) {
                const game = data.activities.find(a => a.type === 0);
                if(game) {
                    activityBox.style.display = "flex";
                    document.getElementById("act-title").innerText = "ĐANG CHƠI";
                    document.getElementById("act-title").style.color = "#b5bac1";
                    document.getElementById("act-icon").src = "https://cdn-icons-png.flaticon.com/512/686/686589.png"; 
                    document.getElementById("act-name").innerText = game.name;
                    document.getElementById("act-details").innerText = game.details || "";
                    document.getElementById("act-state").innerText = game.state || "";
                } else {
                    activityBox.style.display = "none";
                }
            } else {
                activityBox.style.display = "none";
            }
        } catch (err) {}
    }

    fetchLanyard();
    setInterval(fetchLanyard, 3000);
});