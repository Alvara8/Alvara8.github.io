var snakeArray = []; // Array of snake segments
var maybe = false;
var currentDirection;
var snakeSegment = {}; // Each array segment used to target and change div color.

snakeSegment.front = true;
snakeSegment.x = 10;
snakeSegment.y = 10;
snakeArray.push(snakeSegment);

var startSegment = false;

var previousX = 0;
var previousY = 0;

let board = [];

for (let i = 0; i < 20; i++) {
    board[i] = [];
    for (let j = 0; j < 20; j++) {
        var container = document.getElementById("container");
        var tempDiv = document.createElement("div");
        tempDiv.classList.add("sty");

        var pixel = {}; // Each pixel of the board.
        pixel.apple = false;
        pixel.tail = false;
        pixel.elem = tempDiv;

        board[i][j] = pixel;
        container.appendChild(tempDiv);
    }
}

var startGame = false;
var score = 0;
var direction = {x: 0, y: 0}; // Object used to set snake direction

generateApple();

var id = setInterval(repeat, 75);

var queueMoves = [];

function repeat() {
    if (startGame) {
        setDirection(queueMoves.pop());
        collision(snakeArray[0].x, snakeArray[0].y);
        var tempPos = {};
        tempPos.x = snakeArray[0].x;
        tempPos.y = snakeArray[0].y;
        apple(tempPos);

        generateApple();

        if (startSegment == false) {
            addSegment();
            addSegment();
            startSegment = true;
        }

        for (let i = 0; i < snakeArray.length; i++) {                             
            board[snakeArray[i].y][snakeArray[i].x].elem.style.backgroundColor = "#142943";
            board[snakeArray[i].y][snakeArray[i].x].tail = false;
            if (snakeArray[i].front == true) {
                previousX = snakeArray[i].x;
                previousY = snakeArray[i].y;
                snakeArray[i].x += direction.x;
                snakeArray[i].y += direction.y;
            } else {
                var temp1 = snakeArray[i].x;
                var temp2 = snakeArray[i].y;
                snakeArray[i].x = previousX;
                snakeArray[i].y = previousY;
                previousX = temp1;
                previousY = temp2;
                board[snakeArray[i].y][snakeArray[i].x].tail = true;
            }
            board[snakeArray[i].y][snakeArray[i].x].elem.style.backgroundColor = "#F4F3F2";
        }
    }
    var ScoreBoard = document.getElementById("ScoreBoard");
    ScoreBoard.innerText = "Score: " + score;

}

function addSegment() {
    var snakeSegment3 = {};
    snakeSegment3.front = false;
    snakeSegment3.x = snakeArray[snakeArray.length - 1].x;
    snakeSegment3.y = snakeArray[snakeArray.length - 1].y;

    snakeArray.push(snakeSegment3);
}

function apple(position) {
    if (board[position.y][position.x].apple == true) {
        board[position.y][position.x].elem.style.backgroundColor = "#142943";
        board[position.y][position.x].apple = false;
        score+=3;
        if (score > 100) {
            if (confirm("You Win!\nWould you like to play again?")) {
                location.reload();
            }
            clearInterval(id);
        }

        addSegment();
        addSegment();
        addSegment();

        generateApple();
        return true;
    }
    return false;
}

function generateApple() {
    var generated = false;

    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if (board[i][j].apple == true) {
                board[i][j].elem.style.backgroundColor = "red";

                generated = true;
            }
        }
    }

    while (generated == false) {
        let number1 = Math.floor(Math.random() * 20);
        let number2 = Math.floor(Math.random() * 20);

        if (board[number1][number2].tail == false) {
            board[number1][number2].apple = true;
            board[number1][number2].elem.style.backgroundColor = "red";
            generated = true; 
        }
    }
}

function collision(x, y) { // Checks for collisions
    var temp = false;

    var tempX = x + direction.x; // Use + instead of += to avoid modifying the original x
    var tempY = y + direction.y; // Use + instead of += to avoid modifying the original y

    if (tempX > 19 || tempY > 19 || tempX < 0 || tempY < 0) {
        temp = true;
    }

    for (let i = 1; i < snakeArray.length; i++) {
        if (snakeArray[0].x == snakeArray[i].x && snakeArray[0].y == snakeArray[i].y) {
            temp = true;
        }
    }
    if (temp) {
        if (confirm("Game is over :/\nWould you like to play again?")) {
            location.reload();
        }
        clearInterval(id);
        return true;
    }

    return false;
}

function setDirection(input) {
    if (input == "up" && currentDirection != "down") {
        currentDirection = "up";
        direction.y = -1;
        direction.x = 0;
    } else if (input == "down" && currentDirection != "up") {
        currentDirection = "down";
        direction.y = 1;
        direction.x = 0;
    } else if (input == "left" && currentDirection != "right") {
        currentDirection = "left";
        direction.y = 0;
        direction.x = -1;
    } else if (input == "right" && currentDirection != "left") {
        currentDirection = "right";
        direction.y = 0;
        direction.x = 1;
    }
}

// Define the event handler function
function handleKeyDown(event) {
    startGame = true;

    if (event.key == "ArrowUp" || event.key == "w") {
        if (currentDirection != "down") {
            queueMoves.push("up");
        }
    } else if (event.key == "ArrowDown" || event.key == "s") {
        if (currentDirection != "up") {
            queueMoves.push("down");
        }
    } else if (event.key == "ArrowRight" || event.key == "d") {
        if (currentDirection != "left") {
            queueMoves.push("right");
        }
    } else if (event.key == "ArrowLeft" || event.key == "a") {
        if (currentDirection != "right") {
            queueMoves.push("left");
        }
    }
}

document.addEventListener('keydown', handleKeyDown);
