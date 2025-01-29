
const gameBoxes = [[],[],[]];
let turnIndicator=document.querySelector("#turnIndicator")
let resultScreen=document.querySelector("#results")
let turn=1//whos turning
let turnCount=0//to check when game ends
let horizontalVictory=0
let verticalVictory=0
let diagonalVictory=0
let lastSign=0
let acualLine
let previousWidth
let lockPlayer=0



function changeCondition(){
    if(lockPlayer==0){
        if(turn==1&&!this.innerHTML){
        this.innerHTML="X"
        this.style.color="#ff0000"
        turnIndicator.innerHTML="O turns"
        turn=0
        turnCount++
        }else if(!this.innerHTML){
        this.innerHTML="O"
        this.style.color="#0000ff"
        turn=1
        turnIndicator.innerHTML="X turns"
        turnCount++
        }else{
            alert("This box is already filled")
        }
        fieldUpdate()
        victoryCheck()
        if(turnCount==9){
            clearField(true)
            resultScreen.style.color="#000000"
            resultScreen.innerHTML="Tie !"
            turnCount=0
        }
    }

}
//console.log(gameBoxes[0][1])
function fieldUpdate(){
    for(let p=0;p<3;p++){
        for(let i=0;i<3;i++){
            gameBoxes[p][i]=(document.querySelectorAll(".box")[i+p*3])
            gameBoxes[p][i].addEventListener("click", changeCondition);
        }
    }
}
function victoryCheck(){
    //checking all of them simultaniously
    if(gameBoxes[0][0].innerHTML==gameBoxes[1][1].innerHTML&&gameBoxes[0][0].innerHTML==gameBoxes[2][2].innerHTML&&gameBoxes[1][1].innerHTML!=0){
        victoryAlert("diagonal1",0)
    }else if(gameBoxes[1][1].innerHTML==gameBoxes[2][0].innerHTML&&gameBoxes[1][1].innerHTML==gameBoxes[0][2].innerHTML&&gameBoxes[1][1].innerHTML!=0){
        victoryAlert("diagonal2",2)
    }else{
        //or checking one by one
        for(let p=0;p<3;p++){
            for(let i=0;i<3;i++){
                if (lastSign==gameBoxes[p][i].innerHTML&&lastSign){
                    horizontalVictory+=1
                }else{
                    horizontalVictory=0
                }
                lastSign=gameBoxes[p][i].innerHTML
            }
            lastSign=0
            if(horizontalVictory!=2){
            horizontalVictory=0
            }else{
            victoryAlert("horizontal",p)
            }
            
        }
    }
    for(let i=0;i<3;i++){
        for(let p=0;p<3;p++){
            if (lastSign==gameBoxes[p][i].innerHTML&&lastSign){
                vericalVictory+=1
            }else{
                vericalVictory=0
            }
            lastSign=gameBoxes[p][i].innerHTML
        }
        lastSign=0
        if(vericalVictory!=2){
        vericalVictory=0
        }else{
            victoryAlert("vertical",i)
        }
        
    }

    
}
function clearField(tie){
    lockPlayer=1
    if(tie!=true){
        previousWidth=line.style.width
        if(previousWidth=="300px"||previousWidth=="400px"){
        line.style.width="0px"
        }else{
        line.style.height="0px"   
        }
    }
    //disgusting amount of timers
    setTimeout(() => {
        if(tie!=true){
            line.style.transitionDuration="0.5s"//extending
            if(previousWidth=="15px"){
                line.style.height="300px"
                
            }else{
            line.style.width="300px"  
            if(previousWidth=="400px"){
                    line.style.width="400px"
            }
            }
        }

        for(let p=0;p<3;p++){
            for(let i=0;i<3;i++){
                gameBoxes[p][i].style.transitionDuration="0.5s"
            }
        }
    }, 20);
    setTimeout(() => {
        for(let p=0;p<3;p++){
            for(let i=0;i<3;i++){
                gameBoxes[p][i].style.color="#ffffff"
            }
        }
        if(tie!=true){
        line.style.color="#ffffff"
        line.style.backgroundColor="#a52a2a00"
        }
        
        resultScreen.style.color="#ffffff"
    }, 1500); 
    setTimeout(() => { 
        for(let p=0;p<3;p++){
            for(let i=0;i<3;i++){
                gameBoxes[p][i].innerHTML=null
                gameBoxes[p][i].style.transitionDuration="0s"
            }
        }
        lockPlayer=0
    }, 2500);
}
function victoryAlert(axis,coordinate){
    if(turn==1){
        resultScreen.style.color="#0000ff"
        resultScreen.innerHTML="O wins !"
    }else{
        resultScreen.style.color="#ff0000"
        resultScreen.innerHTML="X wins !"
    }
    const line = document.createElement("div")
    line.id="line";
    line.style.transitionDuration="0s"
    if(axis=="vertical"){
    line.style.width="15px"
    line.style.height="300px" 
    line.style.left="43px" 
    line.style.top="10px" 
    gameBoxes[0][coordinate].appendChild(line)
    }else if(axis=="horizontal"){
    line.style.width="300px"
    line.style.height="15px" 
    gameBoxes[coordinate][0].appendChild(line)
    }else if(axis=="diagonal1"){
    line.style.transformOrigin="top left"
    line.style.left="20px" 
    line.style.top="10px" 
    line.style.width="400px"
    line.style.height="15px"
    line.style.rotate="45deg"
    gameBoxes[0][0].appendChild(line)  
    }else{
    line.style.transformOrigin="top left"
    line.style.left="80px" 
    line.style.top="35px" 
    line.style.width="400px"
    line.style.height="15px" 
    line.style.rotate="-225deg" 
    gameBoxes[0][2].appendChild(line) 
    }
    turnCount=0
    clearField()
}
fieldUpdate()
