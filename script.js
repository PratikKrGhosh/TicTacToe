let turnbox = document.querySelector(".turnbox");
let box = document.querySelectorAll(".box");
let winImg = document.querySelector(".winbox");
let rematchBtn = document.querySelector("#rematchBtn");
let turnAudio = new Audio("./sound/turn.wav");
let winAudio = new Audio("./sound/win.wav");
let resetAudio = new Audio("./sound/reset.wav");
let bgm = new Audio("./sound/bgm.wav");
let turn = "X";
let count = 0;
let hasWon = false;

// Function to update the Turn Box
const updateTurnbox = () =>{
    turnbox.innerText = `Turn of ${turn}`;
}

updateTurnbox(); // Uddating the turn box

// Function to Change The Turn
const changeTurn = () =>{
    if (turn === "X") {
        turn = "O";
        updateTurnbox();
        turnAudio.play();
        count++;
    }
    else {
        turn = "X";
        updateTurnbox();
        turnAudio.play();
        count++;
    }
}

// Function to clear all Boxes
const clearAllBoxes = () =>{
    Array.from(box).forEach(e =>{
        e.querySelector(".boxtext").innerText = '';
    })
}

// Function to check the win
const checkWin = () =>{
    // List of All Possible Win Combinations
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    win.forEach(e => {
        if (box[e[0]].children[0].innerText === box[e[1]].children[0].innerText && box[e[2]].children[0].innerText === box[e[0]].children[0].innerText && box[e[0]].children[0].innerText !== '')
        {
            hasWon = true;
            turnbox.innerText = `${turn} Won!`;
            winImg.style.visibility = "visible";
            winAudio.play();
            return 0;
        }
    })
}

// Function to check Draw Match
const hasDraw = () =>{
    console.log(count)
    if (count >= 8){
        hasWon = true;
        turnbox.innerText = `Match Draw!`;
        winImg.style.visibility = "visible";
        winAudio.play();
    }
}

// Game Logic Function
const gameLogic = () =>{
    Array.from(box).forEach(e =>{
        let boxText = e.querySelector(".boxtext");
        e.addEventListener('click', ()=>{
            if (boxText.innerText === "")
            {
                boxText.innerText = turn;
                checkWin();
                hasDraw();
                if (hasWon === false) { changeTurn(); }
            }
        })
    })
}

gameLogic();
rematchBtn.addEventListener('click', ()=>{
    turn = "X";
    count = 0;
    hasWon = false;
    updateTurnbox();
    resetAudio.play();
    winImg.style.visibility = "hidden";
    clearAllBoxes();
})