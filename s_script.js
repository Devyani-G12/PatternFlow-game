let userSeq = [];
let gameSeq = [];

let btns = ["red", "green", "blue", "yellow"];
let started = false;
let level = 0;

let h5 = document.querySelector("#status");


document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Game flash
function btnFlash(btn) {
    console.log(btn);
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 500);
}

// User flash
function userflash(btn) {
    console.log(btn);
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 350);
}

// Level logic
function levelUp() {
    
    userSeq = [];
    level++;
    h5.innerText = `Level ${level}`;
     
    console.log(level);
    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIndex];

    let ranbtn = document.querySelector("." + randomColor);
    gameSeq.push(randomColor);

    setTimeout(() => btnFlash(ranbtn), 200);
}

// Check answer
function checkAnswer(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        h5.innerHTML = `Game Over, Your score was <b>${level}</b><br>Press any key to Restart...`;

        document.body.style.backgroundColor = "#ffd6d6";
        setTimeout(() => document.body.style.backgroundColor = "", 300);

        reset();
    }
}

// Button press
function btnpres() {
    if (!started) return;

    let tbtn = this;
    userflash(tbtn);

    let usercolor = tbtn.id;
    userSeq.push(usercolor);

    checkAnswer(userSeq.length - 1);
}

// Attach listeners
let allbtns = document.querySelectorAll(".btn-tile");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpres);
}

// Reset
function reset() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}

/* ✨ Sparkle cursor effect */
document.addEventListener("mousemove", (e) => {
    const spark = document.createElement("div");
    spark.className = "sparkle";
    spark.style.left = e.clientX + "px";
    spark.style.top = e.clientY + "px";

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 600);
});
