document.body.addEventListener("keydown",keyCheck)
let startButton = document.getElementById("startButton")
startButton.addEventListener("click", createField)
let lastKey="ArrowUp"
let fieldExists=false
let widthInput
let heightInput
let snakeY=9
let snakeX=9
let foodEaten=4
let timerInterval
let hungry=true
let foodExists=false
const field = [];

class cell {
    constructor(y, x) {
        //this.condition = "empty";
        this.id = String(y) + " " + String(x)
        this.ticksLeft=0
        this.visual = document.getElementById(String(y) + " " + String(x))
    }
}

function keyCheck(event){
    lastKey=String(event.key)
}
function createField() {

    widthInput = parseInt(document.getElementById("widthInputField").value)
    heightInput = parseInt(document.getElementById("heightInputField").value)
    if (!widthInput || !heightInput) {
        alert("Please enter all values")
    } else if (widthInput > 50 || heightInput > 50 || widthInput < 2 || heightInput < 2) {
        alert("Field size is incorrect")
    } else {
        if (fieldExists == true) {
            clearInterval(timerInterval)
            
            while (fieldContainer.hasChildNodes()) {
            fieldContainer.removeChild(fieldContainer.firstChild);
            }
            for (let y = 0; y < field.length; y++) {
                for (let x = 0; x < field[y].length; x++) {
                    field[y][x].id = null
                    field[y][x].condition = null
                }
            }
        }
        fieldExists=true
        timerInterval = setInterval(gameLoop, 250);
        for (let y = 0; y < heightInput; y++) {
            const row = [];
            field[y] = row
            const visualRow = document.createElement("div");
            visualRow.className = "row";
            fieldContainer.appendChild(visualRow);
            for (let x = 0; x < widthInput; x++) {
                const visualCell = document.createElement("div");
                visualCell.className = "cell";
                visualCell.id = String(y) + " " + String(x);
                visualRow.appendChild(visualCell);
                field[y][x] = new cell(y, x);
                
            }
        }
    }
}

function gameLoop(){
    hungry=true
    if(foodExists==false){
        do {
            randomX=Math.floor(Math.random() * widthInput);
            randomY=Math.floor(Math.random() * heightInput);
        } while (field[randomY][randomX].visual.className=="cell snake");
        field[randomY][randomX].visual.className+=" food"
        foodExists=true
    }

    

    switch (lastKey) {
        case 'ArrowUp':
            snakeY--
          break;
        case "ArrowDown":
            snakeY++
            break;
        case 'ArrowLeft':
            snakeX--
            break;
        case 'ArrowRight':
            snakeX++
          break;
      }
    if((snakeX<widthInput&&snakeX>-1)&&(snakeY<heightInput&&snakeY>-1)&&field[snakeY][snakeX].visual.className!="cell snake"){
        if(field[snakeY][snakeX].visual.className=="cell food"){
            hungry=false
            foodEaten++
            foodExists=false
            field[snakeY][snakeX].visual.className="cell snake"
            field[snakeY][snakeX].ticksLeft=foodEaten-1
        }else{
            field[snakeY][snakeX].visual.className+=" snake"
            field[snakeY][snakeX].ticksLeft=foodEaten
        }
        
    }else{
        console.log("death")
        clearInterval(timerInterval)
    }

    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if(hungry==true){
               field[y][x].ticksLeft-- 
            }
            if(field[y][x].ticksLeft<1&&field[y][x].visual.className!="cell food"){
                field[y][x].visual.className="cell"
            }
        }
    }
}