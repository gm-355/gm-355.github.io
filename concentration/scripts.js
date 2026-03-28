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

