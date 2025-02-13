let noClickCount = 0;
document.getElementById('yesBtn').disabled = true;
document.getElementById('noBtn').disabled = true;

document.addEventListener('DOMContentLoaded', function () {
    const introMusic = document.getElementById('introMusic');
    const keynoteVideo = document.getElementById('keynoteVideo');

    // Start music on click or keydown
    function startMusic() {
        introMusic.play().catch(error => console.log('Autoplay blocked:', error));
        document.removeEventListener('click', startMusic);
        document.removeEventListener('keydown', startMusic);
    }

    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);

    // Wait for 6.5 seconds and transition to the video
    setTimeout(() => {
        document.getElementById('slideContainer').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('slideContainer').style.display = 'none';
            introMusic.pause();
            introMusic.currentTime = 0;
            keynoteVideo.style.display = 'block';
            keynoteVideo.play();
            keynoteVideo.addEventListener('ended', function () {
                keynoteVideo.style.display = 'none';
                document.getElementById('mainContainer').style.display = 'flex';
                document.getElementById('noBtn').disabled = false;
            });
        }, 10);
    }, 6500);
});

// Handle "No" button click
function noClicked() {
    noClickCount++;
    hardShakeScreen();
    document.getElementById('noBtn').disabled = true;
    setTimeout(() => document.getElementById('noBtn').disabled = false, 1000);

    const messages = [
        'Нээрээ юу?! 😳', 'Бодоод үзээрэй! 😡', 'NO гээд хэрэггүй шүү! 🤨',
        'Чи буруу товч дарсан байх аа? 😁', 'Дахиад бод! 🧐', 'За за, сүүлийн боломж шүү! 🥺',
        'Сүүлийн боломж гэж хэлээд байхад 😩', 'Чи үнэхээр "NO" гээд байгаамуу? 😭',
        'Зүрхийг минь шархлуулж байна даа ЧИ 💔🥹', 'Одооноос "NO" гэж байхгүй болсон ! 😈'
    ];

    document.getElementById('question').innerText = messages[Math.min(noClickCount - 1, messages.length - 1)];

    if (noClickCount === 9) {
        document.getElementById('yesBtn').disabled = false;
    }

    if (noClickCount === 10) {
        document.getElementById('noBtn').remove();
        const yesBtn = document.getElementById('yesBtn');
        yesBtn.style.position = 'static';
        yesBtn.style.margin = '20px auto';
    }

    document.getElementById('sadViolin').play();
    changeFooterBackground();
    changeFooterColor();
    showFunnyFaces();
}

// Handle "Yes" button click
function yesClicked() {
    if (noClickCount < 9) return;

    document.getElementById('sadViolin').pause();
    document.getElementById('sadViolin').currentTime = 0;

    document.getElementById('loveMoment').play();

    const container = document.querySelector('.container');
    container.innerHTML = `<h1 id='loveLetter'></h1>`;

    let letterText = 'Хайрт минь, Хайртай шүү! ❤️💖';
    let i = 0;

    function typeLetter() {
        if (i < letterText.length) {
            document.getElementById('loveLetter').innerHTML += letterText.charAt(i);
            i++;
            setTimeout(typeLetter, 100);
        } else {
            setTimeout(() => {
                runRomanticEffects(); // After typing, start animations
            }, 1000); // Small delay before animations start
        }
    }
    typeLetter();
}

// Shake effect
function hardShakeScreen() {
    let intensity = 10;
    let count = 0;
    let maxShakes = 9;
    let interval = setInterval(() => {
        let x = (Math.random() * intensity * 2 - intensity) + 'px';
        let y = (Math.random() * intensity * 2 - intensity) + 'px';
        document.body.style.transform = `translate(${x}, ${y})`;
        count++;
        if (count > maxShakes) {
            clearInterval(interval);
            document.body.style.transform = 'translate(0, 0)';
        }
    }, 30);
}

// Mouse cursor trail effect
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.innerHTML = '❤️';
    trail.style.position = 'absolute';
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    trail.style.fontSize = `${Math.random() * 15 + 15}px`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 1000);
});

// Romantic effects
function startRomanticEffects() {
    setTimeout(() => heartExplosion(), 1500);
    setTimeout(() => romanticOverlay(), 3000);
    setTimeout(() => iLoveYouAnimation(), 4000);
}

function heartExplosion() {
    for (let i = 0; i < 30; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart-explosion');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }
}

function romanticOverlay() {
    let overlay = document.createElement('div');
    overlay.classList.add('romantic-overlay');
    overlay.style.filter = 'blur(1px)'; // Adjust blur to make text visible
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 4500); // Remove overlay after 6 seconds
}

function iLoveYouAnimation() {
    let loveText = document.createElement('div');
    loveText.classList.add('love-animation');
    loveText.innerText = 'I ❤️ YOU!';
    document.body.appendChild(loveText);

    // Adjust size dynamically
    if (window.innerWidth < 600) {
        loveText.style.fontSize = '3rem';
        loveText.style.top = '30%';
    } else {
        loveText.style.fontSize = '5rem';
        loveText.style.top = '40%';
    }

    setTimeout(() => {
        loveText.innerText = 'My love, every heartbeat of mine whispers your name.';
        setTimeout(() => loveText.remove(), 6000);
    }, 6000);
}

// Flower creation
function createFlower() {
    const emojis = ['🌹', '😘', '🍇', '🍫', '❤️‍🔥'];
    emojis.forEach((emoji) => {
        const flower = document.createElement('div');
        flower.innerHTML = emoji;
        flower.classList.add('flower');
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.getElementById('flowerContainer').appendChild(flower);
        setTimeout(() => flower.remove(), 5000);
    });
}
setInterval(createFlower, 300);

// Sparkling effect
function sparklingEffect() {
    for (let i = 0; i < 20; i++) {
        let star = document.createElement('div');
        star.classList.add('sparkle');
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 2000);
    }
}
setInterval(sparklingEffect, 2000);

// Confetti effect
function triggerConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => confettiContainer.remove(), 5000);
}

function runRomanticEffects() {
    setTimeout(() => {
        heartExplosion();
        setTimeout(() => {
            romanticOverlay();
            setTimeout(() => {
                iLoveYouAnimation();
                setTimeout(() => {
                    triggerConfetti(); // Trigger confetti after the final message
                }, 9000); // Wait for the text animation to complete
            }, 4000); // Delay to let overlay effect be seen
        }, 4400); // Delay to let hearts explode first
    }, 1500); // Start heart explosion first
}