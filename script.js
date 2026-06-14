const CUSTOM_BANNER_URL = "https://i.pinimg.com/originals/16/5e/a1/165ea1fd36de790d7fd64b5a1fd8e5bb.gif";
const DISCORD_ID = "1379451220602654782"; 

const BADGE_MAP = {
    1: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordstaff.svg",
    2: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordpartner.svg",
    4: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadevents.svg",
    8: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbughunter1.svg",
    64: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbravery.svg",
    128: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbrilliance.svg",
    256: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbalance.svg",
    512: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordearlysupporter.svg",
    16384: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbughunter2.svg",
    131072: "https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordearlybotdev.svg",
};

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
        
        welcomeScreen.classList.add("hidden");
        
        setTimeout(() => {
            welcomeScreen.style.display = "none";
        }, 1200);

        setTimeout(() => {
            mainContent.classList.add("visible");
        }, 300);

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
                const ext = user.banner.startsWith("a_") ? "gif" : "png";
                document.getElementById("discord-banner").style.backgroundImage = `url('https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=512')`;
            } else {
                document.getElementById("discord-banner").style.backgroundImage = `url('${CUSTOM_BANNER_URL}')`;
            }

            const flags = user.public_flags;
            let badgeHtml = "";
            if (flags) {
                for (const key in BADGE_MAP) {
                    if ((flags & parseInt(key)) === parseInt(key)) {
                        badgeHtml += `<img src="${BADGE_MAP[key]}" class="d-badge-icon" alt="badge">`;
                    }
                }
            }
            document.getElementById("discord-badges").innerHTML = badgeHtml;

            const statusDot = document.getElementById("discord-status");
            statusDot.className = "d-status status-" + data.discord_status;

            const customStatus = data.activities.find(a => a.type === 4);
            const customStatusDiv = document.getElementById("custom-status");
            
            if (customStatus) {
                let emojiHtml = "";
                if (customStatus.emoji) {
                    if (customStatus.emoji.id) {
                        const ext = customStatus.emoji.animated ? 'gif' : 'png';
                        emojiHtml = `<img src="https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${ext}">`;
                    } else if (customStatus.emoji.name) {
                        emojiHtml = `<span style="margin-right:8px; font-size:16px;">${customStatus.emoji.name}</span>`;
                    }
                }
                customStatusDiv.innerHTML = `${emojiHtml}<span>${customStatus.state || ""}</span>`;
                customStatusDiv.style.display = "flex";
            } else {
                customStatusDiv.style.display = "none";
            }

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