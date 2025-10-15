let rows=document.querySelectorAll(".rows");
let round=document.createElement("img");
let cross=document.createElement("img");
round.src="o-solid-full.svg"
cross.src="x-solid-full.svg"
round.alt=1;
cross.alt=5;
let currentSymbol=round;
let resetButton=document.querySelector(".resetButtonConatainer button");
resetButton.addEventListener("click", ()=>reset());
for(let i=0;i<rows.length;i++){
    for(let j=0;j<rows[0].children.length;j++){
        rows[i].children[j].addEventListener("click",()=>insert(i,j));
    }
}
function reset(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(rows[i].children[j].childElementCount>0){
                rows[i].children[j].children[0].remove();
            }
        }
    }
}
function declareWinner(value){
    setTimeout(()=>{
        if(value==3){
            alert("Hurray! Winner is O");
            reset();
        }
        else if(value==15){
            alert("Hurray! Winner is X");
            reset();
        }
        else if(value==-1){
            alert("OOPS! Match is Draw");
            reset();
        }
    }, 500);
}
function checkWinner(){
    //For row matching
    for(let i=0;i<3;i++){
        let value=0;
        for(let j=0;j<3;j++){
            if(rows[i].children[j].childElementCount>0){
                value+=parseInt(rows[i].children[j].children[0].alt);
            }
        }
        declareWinner(value);
    }
    //For column matching
    for(let j=0;j<3;j++){
        let value=0;
        for(let i=0;i<3;i++){
            if(rows[i].children[j].childElementCount>0){
                value+=parseInt(rows[i].children[j].children[0].alt);
            }
        }
        declareWinner(value);
    }
    //For Main Diagonal Matching
    let value=0;
    for(let i=0;i<3;i++){
        if(rows[i].children[i].childElementCount>0){
            value+=parseInt(rows[i].children[i].children[0].alt);
        }
    }
    declareWinner(value)
    //For Secondary Diagonal matching
    value=0;
    for(let i=0;i<3;i++){
        if(rows[i].children[3-i-1].childElementCount>0){
            value+=parseInt(rows[i].children[3-i-1].children[0].alt);
        }
    }
    declareWinner(value);
    //For Draw Condition
    let checkFilled=true;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(rows[i].children[j].childElementCount==0){
                checkFilled=false;
            }
        }
    }
    if(checkFilled==true && value!=3 && value!=15){
        declareWinner(-1);
    }
}
function insert(i, j){
    if(rows[i].children[j].childElementCount==0){
        rows[i].children[j].appendChild(currentSymbol.cloneNode());
    }
    if(currentSymbol==round){
        currentSymbol=cross;
    }
    else{
        currentSymbol=round;
    }
    checkWinner();
}
 