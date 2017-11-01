$(document).ready(function() {
    let canvas = $("#shapes-game")[0];
    canvas.width = canvas.scrollHeight;
    canvas.height = canvas.scrollWidth;
    let ctx = canvas.getContext('2d');
    let timerSpan = $("#time-remaining");
    let scoreSpan = $("#score-val");
    let intervalId;
    let shapeWidth = 100;
    let shapeHeight = 100;
    let count = 30;
    let score = 0;
    let currentKey;
    let array1 = [38, 39, 40, 37];
    let array2 = [87, 68, 83, 65];
    let rand;
    let gameOn = false;
    let printMessage = () => {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Press Space Bar to start a new game", canvas.scrollWidth / 2 - 270, canvas.scrollHeight / 2);
    }
    printMessage();
    $(document).on("keyup", function(e) {
        e.preventDefault();
        if (e.which == 32 && gameOn == false) {
            newGame();
        }
        if (gameOn && (array1.indexOf(e.which) !== -1 || array2.indexOf(e.which) !== -1)) {
            action(e.which);
        }
    });
    let action = (e) => {
        score += e === array1[rand] || e === array2[rand] ? 1 : -1;
        scoreSpan.html(score);
        rand = Math.floor(Math.random() * 4);
        makeARandomShape(rand);
    }
    let newGame = () => {
        reset();
        intervalId = setInterval(function() {
            if (count > 0) {
                count--;
                timerSpan.html(count);
            } else {
                gameOver();
            }
        }, 1000);
        rand = Math.floor(Math.random() * 4);
        makeARandomShape(rand);
    }
    let reset = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameOn = true;
        count = 30;
        score = 0;
        scoreSpan.html(score);
        timerSpan.html(count);
    }
    let gameOver = () => {
        gameOn = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        printMessage();
        timerSpan.html("GAME OVER!");
        clearInterval(intervalId);
    }

    let makeARandomShape = (random) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (random === 0) {
            makeARandomTriangle("white");
        } else if (random === 1) {
            makeARandomRectangle("white");
        } else if (random === 2) {
            makeARandomRectangle("red");
        } else {
            makeARandomTriangle("red");
        }
    }

    let makeARandomRectangle = (color) => {
        let upperLeftX = randomCoordinate(canvas.width, shapeWidth);
        let upperLeftY = randomCoordinate(canvas.height, shapeHeight);
        ctx.fillStyle = color;
        ctx.fillRect(upperLeftX, upperLeftY, shapeWidth, shapeHeight);
    }
    let makeARandomTriangle = (color) => {
        let upperLeftX = randomCoordinate(canvas.width, shapeWidth);
        let upperLeftY = randomCoordinate(canvas.height, shapeHeight);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(upperLeftX, upperLeftY);
        ctx.lineTo(upperLeftX + shapeWidth, upperLeftY + shapeHeight);
        ctx.lineTo(upperLeftX, upperLeftY + shapeHeight);
        ctx.fill();
        ctx.closePath();
    }

    let randomCoordinate = (canvasW, shapeW) => {
        return Math.floor(Math.random() * (canvasW - shapeW - 1));
    }

})
