let current = window.location.toString();

let scenes = JSON.parse(window.localStorage.getItem("scenes" || []));

function navigateScene(att, addIndex) {
    let data = JSON.parse(window.localStorage.getItem("data" || []));
    let index = data[1];
    if (addIndex) {
        index ++;
        data = [att, index];
        console.log(data);
        if (index === 3) {
            console.log("last scene");
            window.location = current.substring(0, current.lastIndexOf('/')) + "/final.html";
            return;
        } else {
            window.localStorage.setItem("data", JSON.stringify(data));
        }
    }
    window.location = current.substring(0, current.lastIndexOf('/')) + scenes[index];
}

function shuffle(contents) {
    for (let i = 0; i < contents.length; i++) {
        let swapIndex = Math.trunc(Math.random() * contents.length);
        let temp = contents[swapIndex];
        contents[swapIndex] = contents[i];
        contents[i] = temp;
    }
    return contents;
}

function restart() {
    setTimeout(() => {
        window.location = current.substring(0, current.lastIndexOf('/')) + "/index.html";
    }, 2000);
}

export { navigateScene, shuffle, restart};

