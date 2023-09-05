document.body.addEventListener("keydown",keyTest)
let startButton = document.getElementById("startButton")
startButton.addEventListener("click", createField)
let lastKey
let fieldExists=false
let widthInput
let heightInput
const field = [];
function keyTest(event){
    lastkey=event.key
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
        fieldExists=true
        
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
            }
        }
    }
}