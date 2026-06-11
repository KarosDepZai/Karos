document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const particlesContainer = document.getElementById("particles");

    welcomeScreen.addEventListener("click", () => {
        welcomeScreen.style.opacity = "0";
        setTimeout(() => {
            welcomeScreen.style.display = "none";
        }, 800);

        mainContent.style.opacity = "1";
        mainContent.style.transform = "scale(1)";

        bgMusic.volume = 0.4; 
        bgMusic.play().catch(error => {
            console.log("Auto-play prevented", error);
        });
    });

    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `-10px`;
        
        const duration = Math.random() * 3 + 2;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    setInterval(createParticle, 200);
});