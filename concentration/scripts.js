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

