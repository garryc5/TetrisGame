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
        ymin : 0,
        ymax : 1,
        name: 'square'
    },
    2:
    {
        x:[1,1,0,0],
        y:[4,5,5,6],
        ymin : 0,
        ymax : 3,
        name: 'fw-z'
    },
    3:
    {
        x:[1,1,0,0],
        y:[5,4,4,3],
        ymin : 3,
        ymax : 0,
        name: 'bw-z'
    },
    4:
    {
        x:[2,2,1,0],
        y:[5,4,4,4],
        ymin : 1,
        ymax : 0,
        name: 'fw-l'
    },
    5:
    {
        x:[2,2,1,0],
        y:[3,4,4,4],
        ymin : 0,
        ymax : 3,
        name: 'bc-l'
    },
    6:
    {
        x:[1,1,1,0],
        y:[3,4,5,4],
        ymin : 0,
        ymax : 2,
        name: 't'
    },

}
/*----- app's state (variables) -----*/ 
let level,score, boardArry,currentDroppingObj, leftRightBuffer, dropBuffer, rng,collision;
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
    dropBuffer = false;
    collision = false;
    leftRightBuffer=0;
    setObject();
    displayBoard();
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
if(e.code=="KeyA"){currentDroppingObj['y'][currentDroppingObj.ymin]>0 ? leftRightBuffer=-1 : leftRightBuffer=0}
if(e.code=="KeyD"){currentDroppingObj['y'][currentDroppingObj.ymax]<9 ? leftRightBuffer=1 : leftRightBuffer=0}
}
function setObject()
{
    rng = ((Math.floor(Math.random() * 100))%6)+1;
    currentDroppingObj = Objects[rng];
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
function checkCollision(obj)
{
    obj['x'] = obj['x'].map(x =>x+1)
    for(let x=0; x<4;x++)
    {
        if(obj['x'][x]>23||boardArry[obj['x'][x]][obj['y'][x]]==1)
        {
            obj['x'] = obj['x'].map(x =>x-1);
            clearOjc(obj);
            placeObj(obj, 1);
            render();
            setObject();
            return true;
        }
        
    }
}
function dropper(obj)
{
//add checker to setOnes and add a colide detector    
    clearOjc(obj);  
    collision=false;
    dropBuffer ? collision=checkCollision(obj):'';
    obj['y']=obj['y'].map(y =>y+leftRightBuffer);
    leftRightBuffer=0;
    if(collision){return}
    placeObj(obj,2);
    render();
    dropBuffer=!dropBuffer;
}
// functions that still need work

function checkLines()
{
    
}
function play()
{
    dropper(currentDroppingObj);
    render();
}
