import { shuffle, navigateScene, restart } from './main.js';

let list = ["SURNAMING", "RELAUNDER", "BYPRODUCT", "PARROTERS", "ENFREEDOM", "XYLORIMBA", "EXCRETION", "RUBBOARDS", "CARPOOLER", "FLAUNTIER"];
let data = JSON.parse(window.localStorage.getItem("data" || []));
let attempt = data[0];
let word;
let attemptText = document.getElementById('attempt');
attemptText.innerText = "Attempts left:" + attempt;
let startButton = document.getElementById('start'),
    solveButton = document.getElementById('submit'),
    inputField = document.getElementById('form');

inputField.style.display = "none";

function gameStarted() {
    inputField.style.display = "none";
    solveButton.style.display = "none";
}

function assignLetter() {
    startButton.style.display = "none";
    inputField.style.display = "block";
    solveButton.style.display = "block";
    list = shuffle(list);
    word = list[0];
    let shuffledWord = shuffle(Array.from(word));
    for (let i=0; i<9; i++) {
        let id = "box" + i;
        document.getElementById(id).innerText = shuffledWord[i];
    }
}

function solve(){
    if (checkAnswer()) {
        showMessage("Congrats! You win!");
        navigateScene(attempt, true);
    } else {
        console.log("lose");
        showMessage("Oops. You are wrong. Try again?");
        assignLetter();
        attempt --;
        attemptText.innerText = "Attempts left:" + attempt;
        if (attempt < 0) {
            restart();
        }
    }
}

function checkAnswer() {
    let ans = document.getElementById("word").value;
    console.log(ans.toUpperCase());
    ans = ans.toUpperCase();
    gameStarted();
    return (ans.toString() === word.toString());
}

function showMessage(message) {
    let messageElement = document.getElementById("error-message");
    messageElement.innerHTML = message;
}

startButton.addEventListener("click", function() {
    assignLetter();
}, false);

solveButton.addEventListener("click", function() {
    solve();
}, false);

