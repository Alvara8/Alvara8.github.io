class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;
        this.wih = [];
        this.who = [];
    }

    setWeights(wih, who) {
        this.wih = wih;
        this.who = who;
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    query(inputsArray) {
        const inputs = this.transpose([inputsArray]);

        const hiddenInputs = this.dot(this.wih, inputs);

        const hiddenOutputs = hiddenInputs.map(row => row.map(this.sigmoid));

        const finalInputs = this.dot(this.who, hiddenOutputs);

        const finalOutputs = finalInputs.map(row => row.map(this.sigmoid));

        return finalOutputs;
    }

    dot(a, b) {
       const rowsA = a.length;
       const colsA = a[0].length;
       const colsB = b[0].length;

        const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));
        for (let i = 0; i < rowsA; i++) {
            for (let j = 0; j < colsB; j++) {
                for (let k = 0; k < colsA; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }
    transpose(matrix) {
        return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    }
}

const container = document.getElementById("container");
const boardSize = 28;
const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

for (let i = 0; i < 784; i++) {
    const pixel = document.createElement("div");
    pixel.className = "pixels";
    pixel.dataset.index = i;
    pixel.addEventListener("mousemove", (event) => {
        if (event.buttons === 1) {
            updatePixel(pixel);
        }
    });

    pixel.addEventListener("mousedown", () => updatePixel(pixel));
    container.appendChild(pixel);
}

function updatePixel(pixel) {
    const index = parseInt(pixel.dataset.index);
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    board[row][col] = Math.min(Math.round(board[row][col] + 0.5 * 255), 255);

    const brightness = board[row][col];
    pixel.style.backgroundColor = `rgb(${brightness}, ${brightness}, ${brightness})`;
}



function logBoard() {
    console.table(board);
}

const inputNodes = 784;
const hiddenNodes = 200;
const outputNodes = 10;

const nn = new NeuralNetwork(inputNodes, hiddenNodes, outputNodes);

fetch("weights.json")
    .then(response => response.json())
    .then(weights => {
        const wih = weights.wih;
        const who = weights.who;
        nn.setWeights(wih, who);
    });



function predict() {
    const inputs = board.flat().map(value => (value)); 
    const outputs = nn.query(inputs);
    const flattenedOutputs = outputs.map(output => output[0]);
    const predictedDigit = flattenedOutputs.indexOf(Math.max(...flattenedOutputs));

    var guess = document.getElementById("guessHeader");
    var blurDiv = document.getElementById("blurDiv");
    var guessDiv = document.getElementById("guessDiv");
    guessDiv.style.display = "flex";
    blurDiv.style.filter = "blur(5px)"

    if (predictedDigit == 8) {
        guess.textContent = `That looks like an ${predictedDigit} to a chill guy.`
    }
    else {
        guess.textContent = `That looks like a ${predictedDigit} to a chill guy.`
    }
    setTimeout(() => {
        location.reload();
    }, 2500);
}




