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
