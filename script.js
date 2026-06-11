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

        bgMusic.volume = 0.5; 
        bgMusic.play().catch(error => {
            console.log(error);
        });
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