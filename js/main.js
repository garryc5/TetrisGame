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
    0:
    {
        x:[0,1,2,3],
        y:[4,4,4,4],
        name: 'line'
    },
    1:
    {
        x:[1,1,0,0],
        y:[4,5,4,5],
        name: 'square'
    },
    2:
    {
        x:[1,1,0,0],
        y:[4,5,5,6],
        name: 'fw-z'
    },
    3:
    {
        x:[1,1,0,0],
        y:[5,4,4,3],
        name: 'bw-z'
    },
    4:
    {
        x:[2,2,1,0],
        y:[5,4,4,4],
        name: 'fw-l'
    },
    5:
    {
        x:[2,2,1,0],
        y:[3,4,4,4],
        name: 'bc-l'
    },
    6:
    {
        x:[1,1,1,0],
        y:[3,4,5,4],
        name: 't'
    },

}
/*----- app's state (variables) -----*/ 
let lines,score,boardArry, leftRightBuffer, dropBuffer, rng,collision;
var timer;
let currentDroppingObj= {};
/*----- cached element references -----*/ 

/*----- event listeners -----*/ 
document.addEventListener('keypress',controller);
/*----- functions -----*/
function intal()
{
    lines = 1;
    boardArry= new Array(24);
    for(let x=0;x<24;x++)
    {
    boardArry[x]= new Array(10);
    boardArry[x].fill(0,0,10);
    }
    score = 0;
    dropBuffer = false;
    collision = false;
    leftRightBuffer=0;
    setObject();
    displayBoard();
    setTimer();
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
function setTimer()
{
 timer = setInterval(play,(125-(lines*2.5)));
}
function controller(e)
{
if(e.code=="KeyA"){leftRightBuffer=-1}
if(e.code=="KeyD"){leftRightBuffer=1}
}
function setObject()
{
    rng = ((Math.floor(Math.random() * 100))%7);
    Object.assign(currentDroppingObj,Objects[rng]);
}
function clearOjc(obj)
{
    for(let x=0;x<4;x++)
    {
        boardArry[obj['x'][x]][obj['y'][x]]=0;
    }  
}
function placeObj(obj, y)
{
    for(let x=0;x<4;x++)
    {
        boardArry[obj['x'][x]][obj['y'][x]]=y;
    }
}
function checkDropCollision(obj)
{
    obj['x'] = obj['x'].map(x =>x+1)
    for(let x=0; x<4;x++)
    {
        if(obj['x'][x]>23||boardArry[obj['x'][x]][obj['y'][x]]==1)
        {
            obj['x'] = obj['x'].map(x =>x-1);
            placeObj(obj, 1);
            setObject();
            return true;
        }
        
    }
}
function checkHorizontalCollision(obj)
{
    obj['y']=obj['y'].map(y =>y+leftRightBuffer);
    for(let x=0; x<4;x++)
    {
        if(obj['y'][x]>9|| obj['y'][x]<0||
        boardArry[obj['x'][x]][obj['y'][x]]==1)
        {
            obj['y'] = obj['y'].map(y =>y-leftRightBuffer);
        }
    }
    leftRightBuffer=0;
}

function dropper(obj)
{ 
    clearOjc(obj);  
    collision=false;
    if(dropBuffer)collision=checkDropCollision(obj);
    checkHorizontalCollision(obj);
    if(collision){return}
    placeObj(obj,2);
    render();
    dropBuffer=!dropBuffer;
}


// functions that still need work

function play()
{
    dropper(currentDroppingObj);
    render();
}
