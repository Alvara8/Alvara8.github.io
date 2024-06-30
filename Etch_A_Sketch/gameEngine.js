
const mainContainer = document.querySelector("#container");


for (let i = 0; i < 4225; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("pixels")
    newDiv.id = `div${i}`;
    mainContainer.appendChild(newDiv);
}


for (let i = 0; i < 4225; i++) {
    const Listener = document.getElementById(`div${i}`);
    Listener.addEventListener("mouseover", function () { Listener.style.backgroundColor = "red"; });

}

function red() {
    for (let i = 0; i < 4225; i++) {
        const Listener = document.getElementById(`div${i}`);
        Listener.addEventListener("mouseover", function () { Listener.style.backgroundColor = "red"; });

    }
}

function blue() {
    for (let i = 0; i < 4225; i++) {
        const Listener = document.getElementById(`div${i}`);
        Listener.addEventListener("mouseover", function () { Listener.style.backgroundColor = "blue"; });

    }
}


function green() {
    for (let i = 0; i < 4225; i++) {
        const Listener = document.getElementById(`div${i}`);
        Listener.addEventListener("mouseover", function () { Listener.style.backgroundColor = "green"; });

    }
}

function eraseBoard() {
    for (let i = 0; i < 4225; i++) {

        const Listener = document.getElementById(`div${i}`);
        Listener.addEventListener("mouseover", function () { Listener.style.backgroundColor = "#D1BB9E"; });
    }
}

function restartGame() {
    location.reload();
}


