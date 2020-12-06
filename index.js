import {navigateScene, shuffle} from "./main.js";

document.getElementById("start").addEventListener("click", function (){
    navigateScene(5, false);
}, false);

let scenes = ["/sudoku.html", "/blackjack.html", "/word.html"];
let data = [5,0]

function initial() {
    scenes = shuffle(scenes);
    window.localStorage.setItem("scenes", JSON.stringify(scenes));
    window.localStorage.setItem("data", JSON.stringify(data));
}
initial();