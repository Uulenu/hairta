let noClickCount = 0;
document.getElementById("yesBtn").disabled = true;
document.getElementById("noBtn").disabled = true;

document.addEventListener("DOMContentLoaded", function () {
    const introMusic = document.getElementById("introMusic");
    const keynoteVideo = document.getElementById("keynoteVideo");

    // Start music on click or keydown
    function startMusic() {
        introMusic.play().catch(error => console.log("Autoplay blocked:", error));
        document.removeEventListener("click", startMusic);
        document.removeEventListener("keydown", startMusic);
    }

    document.addEventListener("click", startMusic);
    document.addEventListener("keydown", startMusic);

    // Wait for 6.5 seconds and transition to the video
    setTimeout(() => {
        document.getElementById("slideContainer").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("slideContainer").style.display = "none";
            introMusic.pause();
            introMusic.currentTime = 0;
            keynoteVideo.style.display = "block";
            keynoteVideo.play();
            keynoteVideo.addEventListener("ended", function () {
                keynoteVideo.style.display = "none";
                document.getElementById("mainContainer").style.display = "flex";
                document.getElementById("noBtn").disabled = false;
            });
        }, 10);
    }, 6500);
});

// Handle "No" button click
function noClicked() {
    noClickCount++;
    hardShakeScreen();
    document.getElementById("noBtn").disabled = true;
    setTimeout(() => document.getElementById("noBtn").disabled = false, 1000);

    const messages = [
        "Нээрээ юу?! 😳", "Бодоод үзээрэй! 😡", "NO гээд хэрэггүй шүү! 🤨",
        "Чи буруу товч дарсан байх аа? 😁", "Дахиад бод! 🧐", "За за, сүүлийн боломж шүү! 🥺",
        "Сүүлийн боломж гэж хэлээд байхад 😩", "Чи үнэхээр 'NO' гээд байгаамуу? 😭",
        "Зүрхийг минь шархлуулж байна даа ЧИ 💔🥹", "Одооноос 'NO' гэж байхгүй болсон ! 😈"
    ];

    document.getElementById("question").innerText = messages[Math.min(noClickCount - 1, messages.length - 1)];

    if (noClickCount === 9) {
        document.getElementById("yesBtn").disabled = false;
    }

    if (noClickCount === 10) {
        document.getElementById("noBtn").remove();
        const yesBtn = document.getElementById("yesBtn");
        yesBtn.style.position = "static";
        yesBtn.style.margin = "20px auto";
    }

    document.getElementById("sadViolin").play();
    changeFooterBackground();
    changeFooterColor();
    showFunnyFaces();
}

// Handle "Yes" button click
function yesClicked() {
    if (noClickCount < 9) return;

    document.getElementById("loveMoment").play();
    const container = document.querySelector(".container");
    container.innerHTML = `<h1 id='loveLetter'></h1>`;

    let letterText = "Хайрт минь, Хайртай шүү! ❤️💖";
    let i = 0;

    function typeLetter() {
        if (i < letterText.length) {
            document.getElementById("loveLetter").innerHTML += letterText.charAt(i);
            i++;
            setTimeout(typeLetter, 100);
        } else {
            startRomanticEffects();
        }
    }
    typeLetter();
}

function fireworksEffect() {
    for (let i = 0; i < 30; i++) {
        let firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.left = Math.random() * 100 + "vw";
        firework.style.top = Math.random() * 100 + "vh";
        document.body.appendChild(firework);
        setTimeout(() => firework.remove(), 1500);
    }
}

function changeBackgroundRomantic() {
    document.body.style.transition = "background 1s ease-in-out";
    document.body.style.background = "linear-gradient(135deg, #ff758c, #ff7eb3, #fad0c4)";
}

function confettiExplosion() {
    const confettiContainer = document.getElementById("confettiContainer");
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

// Shake effect
function hardShakeScreen() {
    let intensity = 15;
    let count = 0;
    let maxShakes = 9;
    let interval = setInterval(() => {
        let x = (Math.random() * intensity * 2 - intensity) + "px";
        let y = (Math.random() * intensity * 2 - intensity) + "px";
        document.body.style.transform = `translate(${x}, ${y})`;
        count++;
        if (count > maxShakes) {
            clearInterval(interval);
            document.body.style.transform = "translate(0, 0)";
        }
    }, 30);
}

function showFunnyFaces() {
    const faces = ["😡", "🤨", "🤯", "😔", "😱", "🥲", "😭", "💔", "🙁", "🥵", "🙂‍↔️", "🙄", "☃️", "😬", "🤔", "😵"];
    for (let i = 0; i < 7; i++) {
        const face = document.createElement("div");
        face.innerHTML = faces[Math.floor(Math.random() * faces.length)];
        face.classList.add("funny-face");
        face.style.left = Math.random() * 80 + "vw";
        face.style.top = Math.random() * 80 + "vh";
        document.body.appendChild(face);
        setTimeout(() => face.remove(), 1000);
    }
}

function changeFooterBackground() {
    document.querySelector(".footer").style.background = getRandomColor();
}

function changeFooterColor() {
    document.querySelector(".author").style.color = getRandomColor();
}

// Mouse cursor trail effect
document.addEventListener("mousemove", (e) => {
    const trail = document.createElement("div");
    trail.classList.add("cursor-trail");
    trail.innerHTML = "❤️";
    trail.style.position = "absolute";
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    trail.style.fontSize = `${Math.random() * 15 + 15}px`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 1000);
});

function createFlower() {
    const emojis = ["🌹", "😘", "🍇", "🍫", "❤️‍🔥"];
    emojis.forEach((emoji) => {
        const flower = document.createElement("div");
        flower.innerHTML = emoji;
        flower.classList.add("flower");
        flower.style.left = Math.random() * 100 + "vw";
        flower.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.getElementById("flowerContainer").appendChild(flower);
        setTimeout(() => flower.remove(), 5000);
    });
}
setInterval(createFlower, 300);

function heartExplosion() {
    for (let i = 0; i < 30; i++) {
        let heart = document.createElement("div");
        heart.classList.add("heart-explosion");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = Math.random() * 100 + "vh";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }
}

function romanticOverlay() {
    let overlay = document.createElement("div");
    overlay.classList.add("romantic-overlay");
    document.body.appendChild(overlay);
}

function iLoveYouAnimation() {
    let loveText = document.createElement("div");
    loveText.classList.add("love-animation");
    loveText.innerText = "I ❤️ YOU!";
    loveText.style.filter = "blur(0px)"; // Apply blur effect to the text
    document.body.appendChild(loveText);
    setTimeout(() => loveText.remove(), 6000);
}

function showRestartButton() {
    let restartBtn = document.createElement("button");
    restartBtn.innerText = "❤ Дахин эхлүүлэх";
    restartBtn.classList.add("restart-button");
    restartBtn.onclick = () => location.reload();
    restartBtn.style.display = "none";  // Hide it initially
    document.body.appendChild(restartBtn);

    // Show it after 9 seconds
    setTimeout(() => {
        restartBtn.style.display = "block";
        restartBtn.style.filter = "blur(5px)"; // Apply blur effect to the button
    }, 9000);
}

function startRomanticEffects() {
    setTimeout(() => heartExplosion(), 1500);
    setTimeout(() => romanticOverlay(), 3000);
    setTimeout(() => iLoveYouAnimation(), 4000);
    setTimeout(() => showRestartButton(), 9000);  // Show restart button after 9 seconds
}