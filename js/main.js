/*notes to self 
* board 10x20 but add 4 buffer on the hight */

/*----- constants -----*/ 

/*----- app's state (variables) -----*/ 
let level,score, boardArry;
/*----- cached element references -----*/ 

/*----- event listeners -----*/ 

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
    displayBoard();
    render();
}

function render()
{
console.log('getting there');
}

function displayBoard()
{
    let child;
    for(let x=0;x<boardArry.length;x++)
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
intal();