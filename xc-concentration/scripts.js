// get all the cards and board elements
const gameBoard = document.querySelector("#gameBoard");
const cards = document.querySelectorAll(".card");
const turnCountText = document.querySelector("#turnCount");
const winPanel = document.querySelector("#winPanel");

// variables to control the game
let firstCard = null;
let secondCard = null;
let boardLocked = false;
let turnCount = 0;
let matchedPairs = 0;

shuffleCards();

// randomizes the order of the cards on the board
function shuffleCards() {
    let cardArray = Array.from(cards);

    for (let i = cardArray.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));

        let temp = cardArray[i];
        cardArray[i] = cardArray[randomIndex];
        cardArray[randomIndex] = temp;
    }

    cardArray.forEach(function(card) {
        gameBoard.appendChild(card);
    });
}

// add click event to each card
cards.forEach(function(card) {
    card.addEventListener("click", flipCard);
});

// flips one card
function flipCard() {

    if (boardLocked) {
        return;
    }

    if (this.classList.contains("flipped")) {
        return;
    }

    if (this.classList.contains("matched")) {
        return;
    }

    // flip selected card
    this.classList.add("flipped");

    // save 1st card
    if (firstCard === null) {
        firstCard = this;
        return;
    }

    // save 2nd card
    secondCard = this;
    boardLocked = true;

    // one turn means one pair checked
    turnCount++;
    turnCountText.textContent = turnCount;

    // wait before checking match
    setTimeout(checkMatch, 800);
}

// checks if the two flipped cards match
function checkMatch() {
    if (getPairClass(firstCard) === getPairClass(secondCard)) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;
        resetTurn();

        // show message 
        if (matchedPairs === 8) {
            winPanel.classList.add("show");
        }
    } else {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetTurn();
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    boardLocked = false;
}

function getPairClass(card) {
    for (let i = 0; i < card.classList.length; i++) {
        if (card.classList[i].startsWith("pair")) {
            return card.classList[i];
        }
    }
}