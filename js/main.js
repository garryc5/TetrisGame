/*notes to self 
* board 10x20 but add 4 buffer on the hight */

/*----- constants -----*/ 
const Colors =
{
    0 : 'rgb(75,79,79)',
    1 : 'rgb(245,245,245)',
    2 : 'rgb(245,245,245)'
};
/*----- app's state (variables) -----*/ 
let level,score, boardArry, dropX, leftRight, leftRightBuffer;
var timer;
/*----- cached element references -----*/ 

/*----- event listeners -----*/ 
document.addEventListener('keypress',handleKeys);
/*----- functions -----*/
function intal()
{
    level = 1;
    boardArry= new Array(24);
    for(let x=0;x<24;x++)
    {
    boardArry[x]= new Array(10);
    boardArry[x].fill(0,0,10);
    }
    score = 0;
    leftRight = 4;
    dropX = 1;
    leftRightBuffer=0;
    startGame();
    timer();
    render();
}

function render()
{
    for(let x=4;x<boardArry.length;x++)
    {
        for(let y=0;y<boardArry[x].length;y++)
        {
            grab(`${x}${y}`).style.backgroundColor = Colors[boardArry[x][y]];
        }
    }
}

function startGame()
{
    grab('start-game').style.display='none';
    grab('tetris').style.display='grid';
    let child;
    for(let x=4;x<boardArry.length;x++)
    {
        for(let y=0;y<boardArry[x].length;y++)
        {
            child =document.createElement(`div`);
            child.setAttribute('id', `${x}${y}`);
            child.setAttribute('class', `grid-square`);
            grab('tetris').appendChild(child);
        }
    }
}


function grab(name)
{
    return document.getElementById(name);
}
function play()
{
if(dropX>22){return}
else{
boardArry[dropX][leftRight]=0;
dropX++;
leftRight+=leftRightBuffer;
leftRightBuffer =0;
boardArry[dropX][leftRight]=1;
render();
}
}
function timer()
{
 timer = setInterval(play,525-(level*25));
}
function handleKeys(e)
{
    console.log(e.code);
if(e.code=="KeyA"){leftRight>0 ? leftRightBuffer=-1 : leftRightBuffer=0}
if(e.code=="KeyD"){leftRight<9 ? leftRightBuffer=1 : leftRightBuffer=0}
}