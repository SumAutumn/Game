import {navigateScene, restart} from "./main.js";

let data = JSON.parse(window.localStorage.getItem("data" || []));
let attempt = data[0];

let currentGrid = document.forms["x9"];

const GRID_9x9 = { size: 81, width: 9, blockWidth: 3, blockHeight: 3 };
let grid = GRID_9x9;
let result = [  7, 8, 9, 1, 2, 3, 4, 5, 6,
                1, 2, 3, 4, 5, 6, 7, 8, 9,
                4, 5, 6, 7, 8, 9, 1, 2, 3,
                2, 1, 4, 3, 6, 5, 8, 9, 7,
                3, 6, 5, 8, 9, 7, 2, 1, 4,
                8, 9, 7, 2, 1, 4, 3, 6, 5,
                5, 3, 1, 6, 4, 2, 9, 7, 8,
                9, 7, 8, 5, 3, 1, 6, 4, 2,
                6, 4, 2, 9, 7, 8, 5, 3, 1
            ];

let attemptText = document.getElementById('attempt');
attemptText.innerText = "Attempts left:" + attempt;

// Messages
const INVALID_PUZZLE = "This puzzle does not have a valid solution!";
const SUCCESS_MSG = "Congrats! You solved it!";

let guessIndexArray = [];

function solve() {
    for (let i = 0; i < grid.size; i++) {
        guessIndexArray[i] = parseInt(currentGrid[i].value);
        if (guessIndexArray[i] !== result[i])
            return false;
    }
    return true;
}

function showMessage(message) {
    let messageElement = document.getElementById("error-message");
    messageElement.innerHTML = message;
}

function main() {
    const solved = solve();
    if (!solved) {
        showMessage(INVALID_PUZZLE);
        attempt --;
        attemptText.innerText = "Attempts left:" + attempt;
        if (attempt < 0) {
            restart();
        }
    }
    else {
        showMessage(SUCCESS_MSG);
        navigateScene(attempt, true);
    }
}

function clearGrid() {
    currentGrid.reset();
    showMessage("");
}

document.getElementById("solve").addEventListener("click", function (){
    main();
}, false);

document.getElementById("clear").addEventListener("click", function (){
    clearGrid();
}, false);