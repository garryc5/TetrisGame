/*notes to self 
* board 10x20 but add 4 buffer on the hight */

/*----- constants -----*/ 
const Colors =
{
    0 : 'rgb(75,79,79)',
    1 : 'rgb(245,245,245)',
    2 : 'rgb(145,245,145)'
};
const Objects=
{
    1:
    {
        x:[1,1,0,0],
        y:[4,5,4,5],
        ymin : 1,
        ymax : 2,
        name: 'square'
    },
}
/*----- app's state (variables) -----*/ 
let level,score, boardArry,currentDroppingObj, leftRightBuffer, dropBuffer;
var timer;
/*----- cached element references -----*/ 

/*----- event listeners -----*/ 
document.addEventListener('keypress',controller);
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
    leftRightBuffer=0;
    currentDroppingObj =setObject(1);
    displayBoard();
    render();
    timer();
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

function displayBoard()
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

function timer()
{
 timer = setInterval(play,525-(level*25));
}
function controller(e)
{
    console.log(e.code);
if(e.code=="KeyA"){currentDroppingObj['y'][currentDroppingObj.ymin]>0 ? leftRightBuffer=-1 : leftRightBuffer=0}
if(e.code=="KeyD"){currentDroppingObj['y'][currentDroppingObj.ymin]<9 ? leftRightBuffer=1 : leftRightBuffer=0}
}



// functions that still need work
function dropper(obj)
{
//add checker to setOnes and add a colide detector
for(let x=0;x<4;x++)
{
    obj['y']=obj['y'].map(y =>y+leftRightBuffer);
}
if(dropBuffer)
{
    for(let x=0;x<4;x++)
    {
        boardArry[obj['x'][x]][obj['y'][x]]=0;
    }    
    obj['x'] = obj['x'].map(x =>x+1);
    for(let x=0;x<4;x++)
    {
        boardArry[obj['x'][x]][obj['y'][x]]=1;
    }
}
    dropBuffer=!dropBuffer;
}
function setObject(x)
{
    //add rng to pick obj remove x
    return Objects[x];
}
function play()
{
    dropper(currentDroppingObj);
    render();
}