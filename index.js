let header = document.getElementsByClassName("header-class");
let input = document.getElementById("color-code");
let message = document.getElementById("message");
let hiddenBoxes = document.getElementsByClassName("hidden");
let shownBoxes = document.getElementsByClassName("show");
let allBoxes = document.getElementsByClassName("color-box");

let [newColorButton, easyButton, hardButton] =
    document.getElementsByClassName("item");

let isClickedEasy = true;
let isClickedHard = false;
let isEasy = true;

let a = Math.floor(Math.random() * 255) + 1;
let b = Math.floor(Math.random() * 255) + 1;
let c = Math.floor(Math.random() * 255) + 1;
input.innerHTML = `rgb(${a}, ${b}, ${c})`;
// header[0].style.backgroundColor = `rgb(${a}, ${b}, ${c})`;

let easyColorSet = [];
let hardColorSet = [];

let boxNumber = Math.floor(Math.random() * 3);
shownBoxes[boxNumber].style.backgroundColor = `rgb(${a},${b},${c})`;
for (let i = 0; i < 3; i++) {
    let c1 = a,
        c2 = b,
        c3 = c;
    if (i != boxNumber) {
        c1 = Math.floor(Math.random() * 255) + 1;
        c2 = Math.floor(Math.random() * 255) + 1;
        c3 = Math.floor(Math.random() * 255) + 1;
        while (easyColorSet.includes({ c1, c2, c3 }, 0)) {
            c1 = Math.floor(Math.random() * 255) + 1;
            c2 = Math.floor(Math.random() * 255) + 1;
            c3 = Math.floor(Math.random() * 255) + 1;
        }
    }
    easyColorSet.push(`rgb(${c1},${c2},${c3})`);
    shownBoxes[i].style.backgroundColor = `rgb(${c1},${c2},${c3})`;
}

function easyClick() {
    console.log(`isClickedEasy: ${isClickedEasy}`);

    for (let i = 0; i < 6; i++) {
        allBoxes[i].style.borderRadius = "8px";
    }

    isEasy = true;
    for (let i = 0; i < 3; i++) {
        hiddenBoxes[i].style.display = "none";
    }
    if (isClickedEasy == false) {
        alottColor(3);
    }
    for (let i = 0; i < 3; i++) {
        shownBoxes[i].style.backgroundColor = easyColorSet[i];
        console.log(shownBoxes[i].style.backgroundColor);
    }
    isClickedEasy = true;
}

function hardClick() {
    console.log(`isClickedHard: ${isClickedHard}`);

    isEasy = false;
    for (let i = 0; i < 3; i++) {
        hiddenBoxes[i].style.display = "block";
    }
    if (isClickedHard == false) {
        alottColor(6);
    }
    for (let i = 0; i < 6; i++) {
        allBoxes[i].style.backgroundColor = hardColorSet[i];
    }
    isClickedHard = true;
}

function alottColor(val) {
    console.log(`isEasy: ${isEasy}`);
    let box,
        colorSet = [];
    if (val == 3) {
        box = shownBoxes;
        colorSet = easyColorSet;
    } else {
        box = allBoxes;
        colorSet = hardColorSet;
    }

    let boxNumber = Math.floor(Math.random() * val);
    box[boxNumber].style.backgroundColor = `rgb(${a},${b},${c})`;

    for (let i = 0; i < val; i++) {
        let c1 = a,
            c2 = b,
            c3 = c;
        if (i != boxNumber) {
            c1 = Math.floor(Math.random() * 255) + 1;
            c2 = Math.floor(Math.random() * 255) + 1;
            c3 = Math.floor(Math.random() * 255) + 1;
            while (easyColorSet.includes({ c1, c2, c3 }, 0)) {
                c1 = Math.floor(Math.random() * 255) + 1;
                c2 = Math.floor(Math.random() * 255) + 1;
                c3 = Math.floor(Math.random() * 255) + 1;
            }
        }
        colorSet.push(`rgb(${c1},${c2},${c3})`);
        box[i].style.backgroundColor = `rgb(${c1},${c2},${c3})`;
    }
}

function setColors() {
    header[0].style.backgroundColor = `rgb(${184},${134},${11})`;
    message.innerHTML = "";
    newColorButton.innerHTML = "NEW COLORS";
    isClickedEasy = false;
    isClickedHard = false;
    easyColorSet = [];
    hardColorSet = [];
    a = Math.floor(Math.random() * 255) + 1;
    b = Math.floor(Math.random() * 255) + 1;
    c = Math.floor(Math.random() * 255) + 1;
    input.innerHTML = `rgb(${a}, ${b}, ${c})`;
    x = `rgb(${a}, ${b}, ${c})`;

    for (let i = 0; i < 6; i++) {
        allBoxes[i].style.opacity = 1;
        allBoxes[i].style.borderRadius = "8px";
    }
    for (let i = 0; i < 6; i++) {
        allBoxes[i].style.transition = "all 2s ease-in-out";
        allBoxes[i].style.transform = "none";
    }
    // header[0].style.backgroundColor = `rgb(${a}, ${b}, ${c})`;

    if (isEasy) {
        isClickedEasy = true;
        console.log(`easyColorSet: ${easyColorSet}`);
        alottColor(3);
    } else {
        isClickedHard = true;
        alottColor(6);
        console.log(`hardColorSet: ${hardColorSet}`);
    }
}

newColorButton.addEventListener("click", setColors);
easyButton.addEventListener("click", easyClick);
hardButton.addEventListener("click", hardClick);

var x = `rgb(${a}, ${b}, ${c})`;

for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener("click", () => {
        let y = allBoxes[i].style.backgroundColor;
        console.log(x);
        console.log(y);
        if (x != y) {
            tryAgain(allBoxes[i]);
        } else {
            gameOver(allBoxes);
            allBoxes[i].style.borderRadius = "100%";
        }
    });
}

function tryAgain(box) {
    message.innerHTML = "Try again";
    box.style.opacity = 0;
    box.style.borderRadius = "100%";
    box.style.transform = "rotate(180deg)";
}

function gameOver(box) {
    message.innerHTML = "Correct";
    newColorButton.innerHTML = "PLAY AGAIN";
    header[0].style.backgroundColor = `rgb(${a},${b},${c})`;
    for (let i = 0; i < box.length; i++) {
        box[i].style.transition = "none";
        box[i].style.opacity = 1;
        box[i].style.backgroundColor = `rgb(${a},${b},${c})`;
        box[i].style.borderRadius = "8px";
    }
}
