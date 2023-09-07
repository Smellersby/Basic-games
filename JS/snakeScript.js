var root = document.querySelector(':root');
document.body.addEventListener("keydown",keyCheck)
let startButton = document.getElementById("startButton")
startButton.addEventListener("click", createField)
let inputKey
let lastKey="arrowup"
let fieldExists=false
let widthInput=11
let heightInput=11
let snakeY=5
let snakeX=5
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
    inputKey=String(event.key).toLowerCase()
    if(inputKey=="w"||inputKey=="a"||inputKey=="d"||inputKey=="s"||inputKey=="arrowup"||inputKey=="arrowdown"||inputKey=="arrowleft"||inputKey=="arrowright"){
        lastKey=inputKey 
    }
}
function createField() {
   
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
        case 'arrowup':
            snakeY--
          break;
          case 'w':
            snakeY--
          break;
        case "arrowdown":
            snakeY++
            break;
            case "s":
            snakeY++
            break;
        case 'arrowleft':
            snakeX--
            break;
            case 'a':
            snakeX--
            break;
            
        case 'arrowright':
            snakeX++
          break;
          case 'd':
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

            randomColor=String(Math.floor(Math.random() * 350));
            console.log('hsl( ',randomColor,', 100%, 50%)')
            root.style.setProperty('--food', 'hsl( ',randomColor,', 100%, 50%)');
        }else{
            field[snakeY][snakeX].visual.className+=" snake"
            field[snakeY][snakeX].ticksLeft=foodEaten
        }
        
    }else{
        console.log("death",lastKey)
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