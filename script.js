function enterSite() {
    const welcome = document.getElementById('welcome-screen');
    const main = document.getElementById('main-content');
    const body = document.body;
    const music = document.getElementById('bg-music');

    welcome.classList.add('slide-up');
    setTimeout(() => {
        main.classList.remove('opacity-0', 'scale-95');
        body.classList.remove('locked');
    }, 300);

    music.volume = 0.4;
    music.play().catch(e => console.log("Interaction required to play music"));
}

const snowSymbols = ['❄', '❅', '❆', '•']; 
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = snowSymbols[Math.floor(Math.random() * snowSymbols.length)];
    snowflake.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 15 + 8 + 'px'; 
    snowflake.style.fontSize = size;
    const fallDuration = Math.random() * 7 + 8 + 's'; 
    const swayDuration = Math.random() * 4 + 3 + 's';
    snowflake.style.animationDuration = `${fallDuration}, ${swayDuration}`;
    snowflake.style.opacity = Math.random() * 0.7 + 0.3;
    document.body.appendChild(snowflake);
    setTimeout(() => { snowflake.remove(); }, 15000);
}
setInterval(createSnowflake, 300);

const nameElement = document.getElementById('name-typewriter');
const nameText = "Karos";
let nameIndex = 0;
let nameDeleting = false;

function typeNameEffect() {
    if (nameDeleting) {
        nameElement.textContent = nameText.substring(0, nameIndex - 1);
        nameIndex--;
    } else {
        nameElement.textContent = nameText.substring(0, nameIndex + 1);
        nameIndex++;
    }

    if (!nameDeleting && nameIndex === nameText.length) {
        nameDeleting = true;
        setTimeout(typeNameEffect, 2000); 
    } else if (nameDeleting && nameIndex === 0) {
        nameDeleting = false;
        setTimeout(typeNameEffect, 500); 
    } else {
        setTimeout(typeNameEffect, nameDeleting ? 100 : 200); 
    }
}
typeNameEffect();

const titleText = "@im karos";
let titleIndex = 0;
let titleDeleting = false;

function typeTitleEffect() {
    const currentTitle = titleText.substring(0, titleIndex);
    document.title = currentTitle || "@"; 

    if (titleDeleting) {
        titleIndex--;
    } else {
        titleIndex++;
    }

    if (!titleDeleting && titleIndex > titleText.length) {
        titleDeleting = true;
        setTimeout(typeTitleEffect, 2000); 
    } else if (titleDeleting && titleIndex === 0) {
        titleDeleting = false;
        setTimeout(typeTitleEffect, 500);
    } else {
        setTimeout(typeTitleEffect, titleDeleting ? 150 : 300);
    }
}
typeTitleEffect();

function updateVietnamTime() {
    const clockElement = document.getElementById('vn-clock');
    const now = new Date();
    const options = { 
        timeZone: 'Asia/Ho_Chi_Minh', 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    clockElement.textContent = timeString;
}
setInterval(updateVietnamTime, 1000);
updateVietnamTime();