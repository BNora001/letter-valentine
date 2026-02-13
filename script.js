//Elements

const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");


//Click Envelope

const slideSound = document.getElementById("slide-sound");
const bgMusic = document.getElementById("bg-music");
const clickSound = document.getElementById("envelope-sound");
const envelopeSound = document.getElementById("envelope-sound");
const cornerCat = document.getElementById("corner-cat");
const petalGif = document.getElementById("petal-gif");

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    if (bgMusic){
        bgMusic.volume = 0.5;
        bgMusic.play();
    }
   
    if (envelopeSound) envelopeSound.play();

    envelope.style.display = "none";
    letter.style.display = "flex";

    if (cornerCat) {
    cornerCat.style.display = "none";
    }

    if (petalGif) {
        petalGif.style.display = "none";
    }

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);

});

//Logic to make the no btn run

noBtn.addEventListener("mouseover", () => {
    const container = document.getElementById("letter-container");
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const minDistance = 150;
    const maxDistance = 200;

    const distance = Math.random() * (maxDistance - minDistance) + minDistance;
    const angle = Math.random() * Math.PI * 2;

    let moveX = Math.cos(angle) * distance;
    let moveY = Math.sin(angle) * distance;

    // Get current transform offset
    const style = window.getComputedStyle(noBtn);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const currentX = matrix.m41;
    const currentY = matrix.m42;

    // Predict new position
    let newLeft = btnRect.left + moveX;
    let newRight = btnRect.right + moveX;
    let newTop = btnRect.top + moveY;
    let newBottom = btnRect.bottom + moveY;

    // Keep inside container
    const padding = 10;
    if (newLeft < containerRect.left + padding) moveX += (containerRect.left + padding - newLeft);
    if (newRight > containerRect.right - padding) moveX -= (newRight - (containerRect.right - padding));
    if (newTop < containerRect.top + padding) moveY += (containerRect.top + padding - newTop);
    if (newBottom > containerRect.bottom - padding) moveY -= (newBottom - (containerRect.bottom - padding));

    // Avoid Yes button
    const safeDistance = 120; // pixels
    if (
        newRight > yesRect.left - safeDistance &&
        newLeft < yesRect.right + safeDistance &&
        newBottom > yesRect.top - safeDistance &&
        newTop < yesRect.bottom + safeDistance
    ) {
        // Move away horizontally or vertically
        moveX = moveX > 0 ? moveX + safeDistance : moveX - safeDistance;
        moveY = moveY > 0 ? moveY + safeDistance : moveY - safeDistance;
    }

    // Apply transform
    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${currentX + moveX}px, ${currentY + moveY}px)`;

    if (slideSound) {
        slideSound.currentTime = 0;
        slideSound.play();
    }
});


//YES is clicked

yesBtn.addEventListener("click", () => {
    if(clickSound)
    {
        clickSound.currentTime = 0;
        clickSound.play();
    }


    title.textContent = "Yay! Pusheen  ≽^•⩊•^≼ ";
    catImg.src ="pusheen.gif";

    // Move the text slightly upward
        title.style.position = "relative";
        title.style.top = "-40px"; // adjust value as needed
        title.style.opacity = 1;

    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";

    finalText.style.display = "block";

         if (petalGif) {
            petalGif.style.display = "block";
        }

});

