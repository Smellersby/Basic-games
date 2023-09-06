document.body.addEventListener("keydown",keyCheck)
let startButton = document.getElementById("startButton")
startButton.addEventListener("click", createField)
let lastKey="ArrowUp"
let fieldExists=false
let widthInput
let heightInput
let snakeY=9
let snakeX=9
let foodEaten=3
let timerInterval
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
        timerInterval = setInterval(gameLoop, 500);
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
                field[y][x] = new cell(y, x);
                
        console.log("?")
            }
        }
        console.log("2?")
    }
}

function gameLoop(){
    if(foodExists==false){
        randomX=Math.floor(Math.random() * widthInput);
        randomY=Math.floor(Math.random() * heightInput);
        field[randomY][randomX].visual.className+=" food"
        console.log(field[randomY][randomX].visual.className,field[randomY][randomX].visual)
        foodExists=true
        console.log("food",randomX,randomY)
    }

    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            field[y][x].ticksLeft--
            if(field[y][x].ticksLeft<1&&field[y][x].visual.className!="cell food"){
                field[y][x].visual.className="cell"
            }
        }
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
            foodEaten++
            foodExists=false
            field[snakeY][snakeX].visual.className="cell snake"
        }
        field[snakeY][snakeX].visual.className+=" snake"
        field[snakeY][snakeX].ticksLeft=foodEaten
    }else{
        console.log("death")
        clearInterval(timerInterval)
    }
    
    console.log(field[randomY][randomX].visual.className,field[randomY][randomX].visual)

}