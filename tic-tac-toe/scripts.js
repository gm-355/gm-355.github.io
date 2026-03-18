// board data
let rowA = ["-", "-", "-"];
let rowB = ["-", "-", "-"];
let rowC = ["-", "-", "-"];

// game state
let currentTurn = "x";
let remainingTurns = 9;
let gameOver = false;

// DOM element for current player
let currentPlayer;


// checks whether 3 spaces match
function spaceMatch(spaceA, spaceB, spaceC) {
    return ((spaceA == spaceB) && (spaceA == spaceC));
}


// checks the board arrays for a win
function checkGameboard(a, b, c) {

    let outcome = "d";

    // columns
    if (spaceMatch(a[0], b[0], c[0])) {
        if (a[0] != "-") outcome = a[0];
    }

    if (spaceMatch(a[1], b[1], c[1])) {
        if (a[1] != "-") outcome = a[1];
    }

    if (spaceMatch(a[2], b[2], c[2])) {
        if (a[2] != "-") outcome = a[2];
    }

    // rows
    if (spaceMatch(a[0], a[1], a[2])) {
        if (a[0] != "-") outcome = a[0];
    }

    if (spaceMatch(b[0], b[1], b[2])) {
        if (b[0] != "-") outcome = b[0];
    }

    if (spaceMatch(c[0], c[1], c[2])) {
        if (c[0] != "-") outcome = c[0];
    }

    // diagonals
    if (spaceMatch(a[0], b[1], c[2])) {
        if (a[0] != "-") outcome = a[0];
    }

    if (spaceMatch(c[0], b[1], a[2])) {
        if (c[0] != "-") outcome = c[0];
    }

    return outcome;
}

function clickSquare() {

    if ((this.innerHTML == "") && (gameOver == false)) {

        // show current player's mark
        this.innerHTML = currentTurn;
        this.classList.add("clicked");

        remainingTurns = remainingTurns - 1;

        // update arrays
        if (this.id == "a1") rowA[0] = currentTurn;
        if (this.id == "a2") rowA[1] = currentTurn;
        if (this.id == "a3") rowA[2] = currentTurn;

        if (this.id == "b1") rowB[0] = currentTurn;
        if (this.id == "b2") rowB[1] = currentTurn;
        if (this.id == "b3") rowB[2] = currentTurn;

        if (this.id == "c1") rowC[0] = currentTurn;
        if (this.id == "c2") rowC[1] = currentTurn;
        if (this.id == "c3") rowC[2] = currentTurn;

        console.log(rowA);
        console.log(rowB);
        console.log(rowC);

        // check board
        let winState = checkGameboard(rowA, rowB, rowC);
        let gameOutputMsg = document.querySelector("#gameResult");

        if (winState == "x") {
            gameOutputMsg.innerHTML = "X wins";
            gameOver = true;
        }
        else if (winState == "o") {
            gameOutputMsg.innerHTML = "O wins";
            gameOver = true;
        }
        else if ((winState == "d") && (remainingTurns == 0)) {
            gameOutputMsg.innerHTML = "Draw";
            gameOver = true;
        }

        if (gameOver == false) {
            if (currentTurn == "x") currentTurn = "o";
            else currentTurn = "x";

            currentPlayer.innerHTML = currentTurn;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {

    let allSpaces = document.querySelectorAll(".gameSpace");

    for (let eachSpace of allSpaces) {
        eachSpace.addEventListener("click", clickSquare);
    }

    // set current player display
    currentPlayer = document.querySelector("#currentPlayer span");
    currentPlayer.innerHTML = currentTurn;
});