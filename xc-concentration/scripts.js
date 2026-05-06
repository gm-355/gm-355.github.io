// get page elements
const gameBoard = document.querySelector("#gameBoard");
const turnCountText = document.querySelector("#turnCount");

const startPanel = document.querySelector("#startPanel");
const startButton = document.querySelector("#startButton");

const winPanel = document.querySelector("#winPanel");
const winMessage = document.querySelector("#winMessage");
const playAgainButton = document.querySelector("#playAgainButton");

const pairSelect = document.querySelector("#pairSelect");
const playerSelect = document.querySelector("#playerSelect");
const playerOneNameInput = document.querySelector("#playerOneName");
const playerTwoNameInput = document.querySelector("#playerTwoName");

const currentPlayerLine = document.querySelector("#currentPlayerLine");
const currentPlayerText = document.querySelector("#currentPlayer");

const playerOneDisplay = document.querySelector("#playerOneDisplay");
const playerTwoDisplay = document.querySelector("#playerTwoDisplay");
const playerOneScoreText = document.querySelector("#playerOneScore");
const playerTwoScoreText = document.querySelector("#playerTwoScore");
const playerTwoLine = document.querySelector("#playerTwoLine");

const savedScoresText = document.querySelector("#savedScoresText");
const clearScoresButton = document.querySelector("#clearScoresButton");

// variables to control the game
let firstCard = null;
let secondCard = null;
let boardLocked = false;

let turnCount = 0;
let matchedPairs = 0;
let totalPairs = 8;

let numberOfPlayers = 1;
let currentPlayer = 1;

let playerOneName = "Player 1";
let playerTwoName = "Player 2";

let playerOneScore = 0;
let playerTwoScore = 0;

// saved total wins from cookies
let savedWins = {};

// load cookie data when page opens
loadSavedData();
showSavedScores();

// buttons
startButton.addEventListener("click", startGame);

playAgainButton.addEventListener("click", function() {
    winPanel.classList.remove("show");
    startPanel.classList.add("show");
});

clearScoresButton.addEventListener("click", function() {
    savedWins = {};
    setCookie("concentrationWins", JSON.stringify(savedWins), 30);
    setCookie("concentrationNames", "", 30);

    playerOneNameInput.value = "Player 1";
    playerTwoNameInput.value = "Player 2";

    showSavedScores();
});

// start a new game using the selected options
function startGame() {
    totalPairs = Number(pairSelect.value);
    numberOfPlayers = Number(playerSelect.value);

    playerOneName = playerOneNameInput.value.trim();
    playerTwoName = playerTwoNameInput.value.trim();

    if (playerOneName === "") {
        playerOneName = "Player 1";
    }

    if (playerTwoName === "") {
        playerTwoName = "Player 2";
    }

    setCookie("concentrationNames", JSON.stringify([playerOneName, playerTwoName]), 30);

    firstCard = null;
    secondCard = null;
    boardLocked = false;

    turnCount = 0;
    matchedPairs = 0;
    currentPlayer = 1;

    playerOneScore = 0;
    playerTwoScore = 0;

    turnCountText.textContent = turnCount;

    playerOneDisplay.textContent = playerOneName;
    playerTwoDisplay.textContent = playerTwoName;

    playerOneScoreText.textContent = playerOneScore;
    playerTwoScoreText.textContent = playerTwoScore;

    currentPlayerText.textContent = playerOneName;

    if (numberOfPlayers === 1) {
        currentPlayerLine.style.display = "none";
        playerTwoLine.style.display = "none";
    } else {
        currentPlayerLine.style.display = "block";
        playerTwoLine.style.display = "block";
    }

    startPanel.classList.remove("show");
    winPanel.classList.remove("show");

    createCards();
}

// creates cards based on the selected number of pairs
function createCards() {
    gameBoard.innerHTML = "";

    let cardList = [];

    for (let i = 1; i <= totalPairs; i++) {
        cardList.push("pair" + i);
        cardList.push("pair" + i);
    }

    shuffleArray(cardList);

    cardList.forEach(function(pairClass) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add(pairClass);

        card.innerHTML = `
            <div class="cardContent">
                <div class="cardTop"></div>
                <div class="cardBottom"></div>
            </div>
        `;

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// randomizes the order of the cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));

        let temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
}

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

    this.classList.add("flipped");

    if (firstCard === null) {
        firstCard = this;
        return;
    }

    secondCard = this;
    boardLocked = true;

    turnCount++;
    turnCountText.textContent = turnCount;

    setTimeout(checkMatch, 800);
}

// checks if the two flipped cards match
function checkMatch() {
    if (getPairClass(firstCard) === getPairClass(secondCard)) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;
        addMatchScore();

        resetTurn();

        if (matchedPairs === totalPairs) {
            endGame();
        }
    } else {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        if (numberOfPlayers === 2) {
            switchPlayer();
        }

        resetTurn();
    }
}

// adds one match to the current player
function addMatchScore() {
    if (numberOfPlayers === 1) {
        return;
    }

    if (currentPlayer === 1) {
        playerOneScore++;
        playerOneScoreText.textContent = playerOneScore;
    } else {
        playerTwoScore++;
        playerTwoScoreText.textContent = playerTwoScore;
    }
}

// switches player after a wrong guess
function switchPlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
        currentPlayerText.textContent = playerTwoName;
    } else {
        currentPlayer = 1;
        currentPlayerText.textContent = playerOneName;
    }
}

// ends the game and shows the final message
function endGame() {
    let winnerName = "";

    if (numberOfPlayers === 1) {
        winnerName = playerOneName;
        winMessage.textContent = playerOneName + " won in " + turnCount + " turns!";
    } else if (playerOneScore > playerTwoScore) {
        winnerName = playerOneName;
        winMessage.textContent = playerOneName + " wins!";
    } else if (playerTwoScore > playerOneScore) {
        winnerName = playerTwoName;
        winMessage.textContent = playerTwoName + " wins!";
    } else {
        winMessage.textContent = "It is a tie!";
    }

    if (winnerName !== "") {
        saveWin(winnerName);
    }

    showSavedScores();
    winPanel.classList.add("show");
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

// save one total win for the winning player
function saveWin(name) {
    if (savedWins[name] === undefined) {
        savedWins[name] = 0;
    }

    savedWins[name]++;
    setCookie("concentrationWins", JSON.stringify(savedWins), 30);
}

// load saved names and wins from cookies
function loadSavedData() {
    let namesCookie = getCookie("concentrationNames");
    let winsCookie = getCookie("concentrationWins");

    if (namesCookie !== "") {
        let savedNames = JSON.parse(namesCookie);

        if (savedNames[0]) {
            playerOneNameInput.value = savedNames[0];
        }

        if (savedNames[1]) {
            playerTwoNameInput.value = savedNames[1];
        }
    }

    if (winsCookie !== "") {
        savedWins = JSON.parse(winsCookie);
    }
}

// display saved wins in the start modal
function showSavedScores() {
    let names = Object.keys(savedWins);

    if (names.length === 0) {
        savedScoresText.textContent = "No saved wins yet.";
        return;
    }

    let scoreText = "";

    names.forEach(function(name) {
        scoreText += name + ": " + savedWins[name] + " wins ";
    });

    savedScoresText.textContent = scoreText;
}

// cookie helper functions
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    let cookieName = name + "=";
    let cookieArray = document.cookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();

        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
        }
    }

    return "";
}