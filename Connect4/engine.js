
const cols = 6;
const rows = 7;
var id;

var endSpace;
var testObject = { color: "pink" };
let board = [];
var tempP = 0;
var players = [];

var selectedColors = false;


// Loop to initialize 2D array elements.
for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
        board[i][j] = testObject;
    }
}


//Make colors changeable, alert the declared winner.

const container = document.getElementById("container");
var tempI = 10;
for (let i = 0; i <= 5; i++) {
    container.innerHTML += `<div class="slots"> <button id="btn${tempI}" class="btn" onclick="placeToken(this.id)"> </button></div></div>`;
    tempI += 100;
}



for (let i = 0; i < 36; i++) {
    container.innerHTML += `<div class="slots"> <div class="tokens"> </div></div>`
}

const selectElement = document.getElementById("tokenPiece"); // Gets select element.

let testX = 10;

function tokenAnimation(tokenObject) {
    if (testX < ArrayToPx(endSpace)) {
        testX += 100;
        tokenObject.elem.style.top = testX + 'px';
    }
    else {
        clearInterval(id);
        activateButtons();
        checkTie();

        var Winner = tokenObject.color.charAt(0).toUpperCase() + tokenObject.color.slice(1); //Convert first character to uppercase.
        if (Winner == '#522D80') {
            Winner = "Purple";
        }
        if (Winner == '#F56600') {
            Winner = "Orange";
        }
        if (checkForWin(pxToArray(tokenObject.xCord), pxToArray(tokenObject.yCord), tokenObject)) {
            alert(Winner + " Wins!")
            if (confirm("playAgain?")) {
                location.reload();
            }
            else {
                window.close();
            }

        }

    }
}

const player1 = document.getElementById("player1"); // Gets select element.

const player2 = document.getElementById("player2"); // Gets select element.

function colorChoice() { // Function used in select event listener to change button color variables.


    players[0] = player1.value; // Sets value of select element to selected color. 
    players[1] = player2.value; // Sets value of select element to selected color. 
    selectedColors = true;
}

player1.addEventListener("change", colorChoice); // Event listener added to the select element to listen for changes.
player2.addEventListener("change", colorChoice); // Event listener added to the select element to listen for changes.



function placeToken(Spot) {


    if (selectedColors) {
        if (checkIfFree(pxToArray(parseInt(Spot.substring(3))))) {

            player1.removeEventListener("change", colorChoice);
            player2.removeEventListener("change", colorChoice);
            var tokenObject = {};
            const newToken = document.createElement('div');
            newToken.classList.add("tokenPiece");
            tokenObject.xCord = parseInt(Spot.substring(3)); //Get substring of button ID "btn10".
            tokenObject.yCord = 10;
            tokenObject.elem = newToken;
            tokenObject.elem.style.left = tokenObject.xCord + "px";
            tokenObject.color = players[tempP];
            tokenObject.elem.style.backgroundColor = players[tempP];
            container.appendChild(tokenObject.elem);
            disableButtons();
            endSpace = dropToken(tokenObject, pxToArray(tokenObject.xCord));

            id = setInterval(function () { tokenAnimation(tokenObject) }, 60);
            testX = 10;

            if (tempP == 0) { //
                tempP = 1;//
            }
            else {
                tempP = 0;//
            }
        }
        else {
            alert("That spot is full!");
        }
    }

    else {
        alert("Can't have the same colors!")

    }
}

function dropToken(tokenObject, c) {
    // places the character p in column c. The token will be placed in the lowest
    // available row in column c.
    var row = 6;

    if (checkIfFree(c)) {
        for (row = 6; row >= 0; row--) {
            // Check if the current row in column c is free (empty)
            if (board[row][c] == testObject) {
                // Place the token 'p' in the empty cell
                board[row][c] = tokenObject;
                // Exit the loop since the token has been placed
                break;
            }
        }
        tokenObject.yCord = (ArrayToPx(row));
        return row;
    }
    else {
        alert("This Column is full!")
    }
}


function checkForWin(x, y, tokenObject) {
    var lastpos = {};
    lastpos.x = x;
    lastpos.y = y;

    if (checkHorizWin(lastpos, tokenObject.color)) {
        return true;
    }
    if (checkDiagWin(lastpos, tokenObject.color)) {
        return true;
    }

    if (checkVertWin(lastpos, tokenObject.color)) {
        return true;
    }
    return false;
}

function checkHorizWin(lastpos, color) {

    let score = -1;
    for (let i = lastpos.x; i < 6; i++) {
        if (board[lastpos.y][i].color == color) {
            score++;
        } else {

            break;
        }
    }


    for (let i = lastpos.x; i >= 0; i--) {
        if (board[lastpos.y][i].color == color) {
            score++;
        } else {
            break;
        }
    }
    return score >= 4;
}

function pxToArray(px) {
    if (px == 10) {
        return 0;
    }
    else if (px == 110) {
        return 1;
    }
    else if (px == 210) {
        return 2;
    }
    else if (px == 310) {
        return 3;
    } else if (px == 410) {
        return 4;
    } else if (px == 510) {
        return 5;
    }
    else if (px == 610) {
        return 6;
    }
}

function ArrayToPx(px) {
    if (px == 0) {
        return 10;
    }
    else if (px == 1) {
        return 110;
    }
    else if (px == 2) {
        return 210;
    }
    else if (px == 3) {
        return 310;
    } else if (px == 4) {
        return 410;
    } else if (px == 5) {
        return 510;
    }
    else if (px == 6) {
        return 610;
    }
}

function checkIfFree(column) {
    // returns true if the column can accept another token; false otherwise.
    return board[0][column] == testObject;
}

function disableButtons() {


    for (let i = 10; i <= 510; i += 100) {
        var buttonTemp = document.getElementById("btn" + i);
        buttonTemp.disabled = true;
    }

}

function activateButtons() {
    for (let i = 10; i <= 510; i += 100) {
        var buttonTemp = document.getElementById("btn" + i);
        buttonTemp.disabled = false;
    }
}



function checkTie() {
    for (let i = 0; i < 7; i++) {
        if (checkIfFree(i)) {
            return false;
        }
    }
    alert("Its a Tie!")
    return true;
}

function checkVertWin(lastpos, color) {
    let score = -1;

    for (let i = lastpos.y; i < 7; i++) {
        if (board[i][lastpos.x].color == color) {
            score++;
        } else {
            break;
        }
    }

    for (let i = lastpos.y; i >= 0; i--) {
        if (board[i][lastpos.x].color == color) {
            score++;
        } else {
            break;
        }
    }
    return score >= 4;
}

function checkDiagWin(lastpos, color) {

    let score = -1;

    let j = 0;

    j = lastpos.x;

    for (let i = lastpos.y; i >= 0; i--) {// Checks top right
        if (board[i][j].color != color) {
            break;
        }
        score++;
        j++;

        if (j > 5) {
            break;
        }
    }
    j = lastpos.x;

    for (let i = lastpos.y; i < 7; i++) {// Checks bottom left;
        if (board[i][j].color != color) {
            break;
        }
        score++;
        j--;

        if (j < 0) {
            break;
        }
    }
    if (score >= 4) {
        return true;
    }

    else {
        score = -1;
    }

    j = lastpos.x;

    for (let i = lastpos.y; i >= 0; i--) {// Checks top Left
        if (board[i][j].color != color) {
            break;
        }
        score++;
        j--;
        if (j < 0) {
            break;
        }
    }

    j = lastpos.x;
    for (let i = lastpos.y; i < 7; i++) {// Checks bottom Right;
        if (board[i][j].color != color) {
            break;
        }
        score++;
        j++;

        if (j > 5) {
            break;
        }
    }

    if (score >= 4) {
        return true;
    }

    return false;
}










