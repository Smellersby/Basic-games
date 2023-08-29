let startButton = document.getElementById("startButton")
startButton.addEventListener("click", createField)
let fieldContainer = document.getElementById("fieldContainer")
let theDude = document.getElementById("theDude")
theDude.addEventListener("click", clickCheck)
//document.theDude.onclick=clickCheck()
let flagsPlanted = document.getElementById("flagsPlanted")
let flagsLeft = document.getElementById("flagsLeft")
let easy = document.getElementById("easy")
easy.addEventListener("click", makeEasy)
let medium = document.getElementById("medium")
medium.addEventListener("click", makeMedium)
let hard = document.getElementById("hard")
hard.addEventListener("click", makeHard)
let minutesField = document.getElementById("minutesField")
let secondsField = document.getElementById("secondsField")
let firstTurn = true
let mineInput
let widthInput
let heightInput
let found
let fieldExists
let lockPlayer = false
let busy = false
let timerInterval
let seconds = 0
let minutes = 0
const field = [];

function clickCheck(event) {
    //event.preventDefault();
    if (event.button == 0) {
    }
    if (event.button == 1) {
    }
    if (event.button == 2) {
    }
}

class cell { //cells are now objects
    constructor(y, x) {
        this.condition = "closed";// automatically opened
        this.mine = false;//true or false
        this.adjacentMineCount = 0;
        this.id = String(y) + " " + String(x)
        this.visual = document.getElementById(String(y) + " " + String(x))
    }
}

function createField() {

    widthInput = parseInt(document.getElementById("widthInputField").value)
    heightInput = parseInt(document.getElementById("heightInputField").value)
    mineInput = parseInt(document.getElementById("mineInputField").value)
    if (!widthInput || !heightInput || !mineInput) {
        alert("Please enter all values")
    } else if (widthInput > 50 || heightInput > 50 || widthInput < 2 || heightInput < 2) {
        alert("Field size is incorrect")
    } else if (mineInput < 1) {
        alert("There should be more than 0 mines")
    } else if (mineInput >= widthInput * heightInput) {
        alert("Too much mines for the field")
    } else {
        if (fieldExists == true) {
            while (fieldContainer.hasChildNodes()) {
                fieldContainer.removeChild(fieldContainer.firstChild);
            }
            for (let y = 0; y < field.length; y++) {
                for (let x = 0; x < field[y].length; x++) {
                    field[y][x].id = null
                    field[y][x].condition = null
                    field[y][x].adjacentMineCount = null
                    field[y][x].mine = null
                }
            }
        }
        seconds = 0
        minutes = 0
        secondsField.innerHTML = "0" + seconds
        minutesField.innerHTML = minutes
        flagsPlanted.innerHTML = 0
        flagsLeft.innerHTML = mineInput
        firstTurn = true
        fieldExists = true
        lockPlayer = false
        theDude.innerHTML = "😐"
        startButton.innerHTML = "Start new game"
        for (let y = 0; y < heightInput; y++) {
            //creating new array for every new row to imitate 2d
            const row = [];
            field[y] = row
            const visualRow = document.createElement("div");
            visualRow.className = "row";
            fieldContainer.appendChild(visualRow);
            for (let x = 0; x < widthInput; x++) {
                const visualCell = document.createElement("div");
                visualCell.className = "cell";
                //visualCell.innerHTML=y+","+x; //to see coordinates
                visualCell.id = String(y) + " " + String(x);
                visualRow.appendChild(visualCell); // creates x cells in rows
                visualCell.addEventListener("mousedown", surprise)
                visualCell.addEventListener("mouseout", fixSurprise)
                visualCell.addEventListener("click", openCell)
                visualCell.addEventListener("contextmenu", plantFlag)
                field[y][x] = new cell(y, x);
            }
        }
    }
}

function plantBomb() {
    for (let t = 0; t < mineInput; t++) {
        let randomY = Math.floor(Math.random() * heightInput)
        let randomX = Math.floor(Math.random() * widthInput)
        if (field[randomY][randomX].mine == false && String(firstY) + String(firstX) != String(randomY) + String(randomX)) {
            field[randomY][randomX].mine = true
            field[randomY][randomX].visual.className += " bomb"
        } else {
            t--
        }
    }
}

function countBomb() {
    for (let yy = 0; yy < heightInput; yy++) {
        for (let xx = 0; xx < widthInput; xx++) {

            for (let i = yy - 1; i < yy + 2; i++) {
                for (let p = xx - 1; p < xx + 2; p++) {
                    //console.log("checking",i,p,"for",yy,xx,field[yy][xx].visual)
                    if (i > -1 && i < heightInput && p > -1 && p < widthInput) {
                        if (field[i][p].mine == true) {
                            field[yy][xx].adjacentMineCount++
                            //console.log("mine at",i,p,field[i][p].visual,"minecount for",yy,xx," is",field[yy][xx].adjacentMineCount,field[yy][xx].visual)
                        }
                    }
                    switch (field[yy][xx].adjacentMineCount) {
                        case 0:
                            field[yy][xx].visual.style.color = "#cecece"
                            break;
                        case 1:
                            field[yy][xx].visual.style.color = "#0000ff"
                            break;
                        case 2:
                            field[yy][xx].visual.style.color = "rgb(0, 187, 12)"
                            break;
                        case 3:
                            field[yy][xx].visual.style.color = "rgb(219, 15, 15)"
                            break;
                        case 4:
                            field[yy][xx].visual.style.color = "rgb(234, 175, 0)"
                            break;
                        case 5:
                            field[yy][xx].visual.style.color = "rgb(166, 4, 19)"
                            break;
                        case 6:
                            field[yy][xx].visual.style.color = "rgb(133, 170, 0)"
                            break;
                        case 7:
                            field[yy][xx].visual.style.color = "rgb(124, 20, 211)"
                            break;
                        case 8:
                            field[yy][xx].visual.style.color = "rgb(215, 15, 165)"
                            break;
                    }
                }
            }

        }
    }
}

function openCell() {
    if (lockPlayer == false) {
        setTimeout(() => {
            if (busy == false) {
                if (firstTurn == true) {
                    let idPartitionning = this.id.split(" ")
                    firstY = idPartitionning[0]
                    firstX = idPartitionning[1]
                    plantBomb()
                    countBomb()
                    firstTurn = false
                    timerInterval = setInterval(timerFunction, 1000);
                }
                if (this.className == "cell pressed" || this.className == "cell bomb pressed") {
                    this.style.backgroundColor = "#ececec"
                    theDude.innerHTML = "😐"
                    if (this.className == "cell pressed") {
                        this.className = "cell open"
                    } if (this.className == "cell bomb pressed") {
                        this.className = "cell bomb open"
                    }
                    let idPartitionning = this.id.split(" ")
                    y = parseInt(idPartitionning[0])
                    x = parseInt(idPartitionning[1])
                    this.innerHTML = field[y][x].adjacentMineCount
                    if (field[y][x].adjacentMineCount == 0 && field[y][x].condition != "automatically opened") {
                        field[y][x].condition = "automatically opened"
                        for (let i = y - 1; i < y + 2; i++) {
                            if (i > -1 && i < heightInput) {
                                for (let p = x - 1; p < x + 2; p++) {
                                    if (p > -1 && p < widthInput) {
                                        if (field[i][p].visual.className == "cell") {
                                            field[i][p].visual.innerHTML = field[i][p].adjacentMineCount
                                            field[i][p].visual.className += " open"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (this.className == "cell bomb open") {
                    clearInterval(timerInterval)
                    this.style.backgroundColor = "rgb(251, 145, 33)"
                    field[y][x].visual.innerHTML = "💥"
                    theDude.innerHTML = "🤕"
                    lockPlayer = true
                    startButton.innerHTML = "Restart"
                    openField()
                }

                zeroOpener()
                victoryCheck()
            }
        }, 10);
    }
}

function plantFlag(event) {
    event.preventDefault();
    if (lockPlayer == false && firstTurn == false) {
        busy = true
        setTimeout(() => { busy = false }, 50);
        if (this.className == "cell pressed" || this.className == "cell bomb pressed") {
            if (theDude.innerHTML == "😮") {
                this.style.backgroundColor = "rgb(51, 122, 185)"
                theDude.innerHTML = "😐"
            }
            if (this.className == "cell pressed") {
                this.className = "cell flagged"
            }
            if (this.className == "cell bomb pressed") {
                this.className = "cell bomb flagged"
            }
            this.innerHTML = "🚩"
            flagsPlanted.innerHTML++
        } else if (this.className == "cell flagged") {
            this.className = "cell"
            this.innerHTML = ""
            flagsPlanted.innerHTML--
        } else if (this.className == "cell bomb flagged") {
            this.className = "cell bomb"
            this.innerHTML = ""
            flagsPlanted.innerHTML--
        }
    }
}

function zeroOpener() {
    do {
        found = false
        for (let y = 0; y < heightInput; y++) {
            for (let x = 0; x < widthInput; x++) {
                if (field[y][x].adjacentMineCount == 0 && field[y][x] != "automatically opened" && field[y][x].visual.className == "cell open") {
                    field[y][x].condition = "automatically opened"
                    for (let i = y - 1; i < y + 2; i++) {
                        if (i > -1 && i < heightInput) {
                            for (let p = x - 1; p < x + 2; p++) {
                                if (p > -1 && p < widthInput) {
                                    if (field[i][p].visual.className == "cell") {
                                        field[i][p].visual.innerHTML = field[i][p].adjacentMineCount
                                        field[i][p].visual.className += " open"
                                        found = true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } while (found);
}

function surprise(event) {
    if (lockPlayer == false) {
        if (this.className == "cell" || this.className == "cell bomb") {
            if (event.button == 0) {
                theDude.innerHTML = "😮"
            }
            this.className += " pressed"//rgb(25, 74, 117)
        }
    }
}

function fixSurprise() {
    if (lockPlayer == false) {
        if (theDude.innerHTML == "😮") {
            if (this.className == "cell pressed") {
                this.className = "cell"
            } else if (this.className == "cell bomb pressed") {
                this.className = "cell bomb"
            }
            theDude.innerHTML = "😐"
        }
    }
}

function victoryCheck() {
    for (let i = 0; i < heightInput; i++) {
        for (let p = 0; p < widthInput; p++) {
            if (field[i][p].mine == false && field[i][p].visual.className == "cell open") {
            } else if (field[i][p].mine == true && field[i][p].visual.className != "cell bomb open") {
            } else {
                return false
            }
        }
    }
    clearInterval(timerInterval)
    theDude.innerHTML = "🥳"
    startButton.innerHTML = "Restart"
    lockPlayer = true
    openField()
}

function openField() {
    for (let i = 0; i < heightInput; i++) {
        for (let p = 0; p < widthInput; p++) {
            if (field[i][p].visual.className == "cell" || field[i][p].visual.className == "cell flagged") {
                field[i][p].visual.style.backgroundColor = "rgb(112, 118, 153)"
            } else if (field[i][p].visual.className == "cell bomb") {
                field[i][p].visual.className = "cell bomb open"
                field[i][p].visual.innerHTML = "💣"
            }
        }
    }
}

function makeEasy() {
    document.getElementById("widthInputField").value = 9
    document.getElementById("heightInputField").value = 9
    document.getElementById("mineInputField").value = 7
}
function makeMedium() {
    document.getElementById("widthInputField").value = 13
    document.getElementById("heightInputField").value = 13
    document.getElementById("mineInputField").value = 25
}
function makeHard() {
    document.getElementById("widthInputField").value = 20
    document.getElementById("heightInputField").value = 20
    document.getElementById("mineInputField").value = 70
}

function timerFunction() {
    seconds++
    if (seconds == 60) {
        seconds = 0
        minutes++
        minutesField.innerHTML = minutes
    }
    if (seconds > 9) {
        secondsField.innerHTML = seconds
    } else {
        secondsField.innerHTML = "0" + seconds
    }
}