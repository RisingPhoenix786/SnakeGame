const  foodMusic=new Audio("../Music/food.mp3");
const gameOver=new Audio("../Music/gameover.mp3");
const move=new Audio("../Music/move.mp3");
const music=new Audio("../Music/music.mp3");



let direction={x:0 , y:0};
let lastPaintTime;
let speed=2;
let snakeArray= [{x:5,y:5},{x:4,y:5}];
let score=0;
let level=1;

localStorage.setItem('highScore',JSON.stringify(0));



let board=document.getElementById('board');
let highScoreBox=document.getElementById('highScoreBox');
let scoreBox2=document.getElementById('scoreBox2');
let levelBox=document.getElementById('levelBox')

highScoreBox.innerText=`Highscore- ${localStorage.getItem('highscore')}`
levelBox.innerHTML=`Level- ${level}`

let a = 2;
let b = 16;
let foodPos = {x: Math.round(a + (b-a)* Math.random()), 
            y: Math.round(a + (b-a)* Math.random())}



//functions
function loop(currTime){

    window.requestAnimationFrame(loop);
   if(lastPaintTime && (currTime-lastPaintTime)/1000<1/speed){
    return;
   }
   
   lastPaintTime=currTime;

   gameEngine();
   
}

function gameEngine(){

    board.innerHTML="";
    
    

    if(isAlive){

        scoreBox2.innerText=`Current Score- ${score}`;
        levelBox.innerText=`Level- ${level}`;
        if(score!=0 && score%5==0){
            speed=2+(score/5);
            level=1+(score/5);
        }
    }

    if(isCollided()){
        isAlive=false;
        gameOver.play();
        music.pause();
        let lastHighscore= localStorage.getItem('highscore');
        if(score>lastHighscore){
            localStorage.setItem('highscore',JSON.stringify(score));
            highScoreBox.innerText=`Highscore- ${score}`;
        }
        score=0;
        level=1;
        speed=2;
        let userInp=confirm("Game Over");
     
        
        if(userInp){
        
        snakeArray= [{x:5,y:5},{x:4,y:5}];
        direction.x=0;
        direction.y=0;
        }
    };

       //Render Food
    let food=document.createElement('div');
    food.classList.add("food");
    food.style.gridColumnStart=foodPos.x;
    food.style.gridRowStart=foodPos.y;
    board.appendChild(food);

    // let arr=[3, 4, 5];
    // arr.unshift(1);
    // arr=[1,3,4,5]

    if(snakeArray[0].x==foodPos.x && snakeArray[0].y==foodPos.y){
        foodMusic.play();
        
        let newHead={
            x: snakeArray[0].x + direction.x,
            y: snakeArray[0].y+ direction.y
        };

        snakeArray.unshift(newHead);
        // arr size inc

        score++;
        
         foodPos = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
         food.style.gridColumnStart=foodPos.x;
         food.style.gridRowStart=foodPos.y;
         board.appendChild(food);
    }
     
    if(isAlive==true){
    // for(let i=snakeArray.length-2;i>=0;i--){
    //     snakeArray[i+1].x=snakeArray[i].x;
    //     snakeArray[i+1].y=snakeArray[i].y;
    //     // snakeArray[i+1]={...snakeArray[i]};
    // }

    for(let i=snakeArray.length-1;i>0;i--){
        snakeArray[i].x=snakeArray[i-1].x;
        snakeArray[i].y=snakeArray[i-1].y;
    }

    
    
    snakeArray[0].x+=direction.x;
    snakeArray[0].y+=direction.y; 
  
}





    // Creating snake parts
    snakeArray.forEach((ele,idx)=>{
        let snakePart=document.createElement('div');
        
        if(idx===0){
            snakePart.classList.add("head");
        }
        else{
            snakePart.classList.add("snakeBody");
        }
        snakePart.style.gridColumnStart=ele.x;
        snakePart.style.gridRowStart=ele.y;
        board.appendChild(snakePart);
    })

 
    

}


function isCollided(){
    //check if snake touches the walls
    if(snakeArray[0].x>18 || snakeArray[0].y>18 ||
         snakeArray[0].x<=0 || snakeArray[0].y<=0){
           return true;
         }
     
         //check if snake touches itself
         for (let i = 1; i < snakeArray.length; i++) {
            if(snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y){
                return true;
            }
        }
    return false;  

}





// Initiating Game Loop
window.requestAnimationFrame(loop);


//checking is game on
let isAlive;



window.addEventListener('keydown',(e)=>{
  
    let key=e.key;
    isAlive=true;
    music.play();
    if(key==='ArrowUp'){
        direction.y=-1;
        direction.x=0;
      
    }
    else if(key==='ArrowDown'){
        direction.y=1;
        direction.x=0;
    }
    else if(key==='ArrowLeft'){
        direction.x=-1;
        direction.y=0;
    }
    else if(key==='ArrowRight'){
        direction.x=1;
        direction.y=0;
    }
    else{
        console.log('Wrong key pressed');
    }
})



