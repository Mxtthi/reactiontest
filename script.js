let game;
window.onload = function () {
    game = new Game();
    document.addEventListener("click", game.clicked)
}

class Game {
    constructor() {

        this.isRunning = false;
        this.waitingForClick = false;
        this.startTime;
        this.endTime;
        this.timeout;
        this.result;

    }

    clicked() {
        if (!game.isRunning && !game.waitingForClick) {
            game.startTest();
        } else if (game.isRunning && !game.waitingForClick) {
            game.clickedTooEarly();
        } else if (game.isRunning && game.waitingForClick) {
            game.finishedTest();
        }
    }

    startTest() {
        game.timeout = game.getRandomInt(1000, 5000);
        document.body.style.backgroundColor = "rgb(163, 15, 15)";
        document.getElementById("message").innerHTML = "Wait for green";
        game.isRunning = true;
        window.setTimeout(function () {
            document.body.style.backgroundColor = "rgb(46, 201, 64)";
            game.startTime = performance.now();
            console.log(performance.now() - Date.now())
            game.waitingForClick = true;
        }, game.timeout);
    }

    clickedTooEarly() {
        document.getElementById("message").innerHTML = "Too early";
        document.body.style.backgroundColor = "rgb(255, 247, 25)";
        game.isRunning = false;
    }

    finishedTest() {
        game.endTime = performance.now();
        game.result = game.endTime - game.startTime;
        document.body.style.backgroundColor = "rgb(80, 162, 235)";
        document.getElementById("message").innerHTML = game.result + "ms";
        game.isRunning = false;
        game.waitingForClick = false;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}