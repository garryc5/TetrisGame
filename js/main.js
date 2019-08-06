/*----- constants -----*/ 
const Colors =
{
    0 : 'rgb(75,79,79)',
    1 : 'rgb(245,245,245)',
    2 : 'rgb(145,245,145)',
    3 : 'aqua'
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
let lines;
let score;
let boardArry;
let bufferArry;
let leftRightBuffer;
let dropBuffer;
let rng;
let collision;
let rotat;
var timer;
let currentDroppingObj= {};
let bufferObj = {};
/*----- event listeners -----*/ 
document.addEventListener('keypress',controller);
/*----- functions -----*/
function intal() {
    rotat = 0;
    lines = 0;
    boardArry= new Array(24);
    for(let x = 0; x < 24; x++)
    {
    boardArry[x] = new Array(10);
    boardArry[x].fill(0,0,10);
    }

    bufferArry = new Array(4);
    for(let x = 0; x < 4; x++)
    {
    bufferArry[x] = new Array(10);
    bufferArry[x].fill(0,0,10);
    }

    score = -40;
    dropBuffer = false;
    collision = false;
    leftRightBuffer = 0;
    setObject(currentDroppingObj);
    setObject(bufferObj);
    placeObj(bufferObj,2,bufferArry);
    displayBoard();
    setTimer();
    render();
}
function render() {
    for(let x = 4; x < boardArry.length; x++)
    {
        for(let y = 0; y < boardArry[x].length; y++)
        {
            grab(`${x}${y}`).style.backgroundColor = Colors[boardArry[x][y]];
        }

    }

    for(let x = 0; x < bufferArry.length; x++)
    {
        for(let y = 3; y < 7; y++)
        {
            grab(`buffer${x}${y}`).style.backgroundColor = Colors[bufferArry[x][y]];
        }

    }

    grab('score').textContent = `Score: ${score}`;
    grab('lines').textContent = `Lines: ${lines}`;
}
function displayBoard() {
    let child;
    grab('start-game').style.display = 'none';
    grab('tetris').style.display = 'grid';
    grab('score-board').style.display = 'flex';
    for(let x = 4; x < boardArry.length; x++)
    {
        for(let y = 0; y < boardArry[x].length; y++)
        {
            child = document.createElement(`div`);
            child.setAttribute('id', `${x}${y}`);
            child.setAttribute('class', `grid-square`);
            grab('tetris').appendChild(child);
        }

    }

    for(let x = 0; x < bufferArry.length; x++)
    {
        for(let y = 3; y < 7; y++)
        {
            child = document.createElement(`div`);
            child.setAttribute('id', `buffer${x}${y}`);
            child.setAttribute('class', `grid-square`);
            grab('next-obj').appendChild(child);
        }

    }

        grab('moblie-controlls').style.display = 'block';
        grab('next-obj').style.visibility = 'visible';
        grab('play-again').style.display = 'none';
}
function grab(name) {
    return document.getElementById(name);
}
function setTimer() {
 timer = setInterval(play,(200 - (lines * 10)));
}
function controller(e) {
if(e.code == "KeyA"){leftRightBuffer = -1}
if(e.code == "KeyD"){leftRightBuffer = 1}
if(e.code == 'KeyS'){dropBuffer = true}
if(e.code == 'KeyR'){rotation()}

}
function setObject(obj) {
    rng = ((Math.floor( Math.random() * 100)) % 7);
    Object.assign(obj, Objects[rng]);
    score += 40;
}
function clearOjc(obj, Arry) {
    for(let x = 0; x < 4; x++)
    {
        Arry[obj.x[x]][obj.y[x]] = 0;
    }  

}
function placeObj(obj, y, Arry) {
    for(let x = 0; x < 4; x++)
    {
        Arry[obj.x[x]][obj.y[x]] = y;
    }

}
function checkDropCollision(obj) {
    obj.x = obj.x.map(x => x + 1)
    for(let x = 0; x < 4; x++)
    {
        if(obj.x[x] > 23 || boardArry[obj.x[x]][obj.y[x]] == 1)
        {
            obj.x = obj.x.map(x => x - 1);
            placeObj(obj, 1 ,boardArry);
            rotat = 0;
            checkBoard(boardArry);
            Object.assign(currentDroppingObj, bufferObj);
            clearOjc(bufferObj, bufferArry);
            setObject(bufferObj);
            placeObj(bufferObj, 2, bufferArry);
            return true;
        }
        
    }

}
function checkHorizontalCollision(obj) {
    obj.y = obj.y.map( y => y + leftRightBuffer);
    for(let x = 0; x < 4; x++)
    {
        if(obj.y[x] > 9 || obj.y[x] < 0 ||
        boardArry[obj.x[x]][obj.y[x]] == 1)
        {
            obj.y = obj.y.map(y => y - leftRightBuffer);
        }

    }

    leftRightBuffer = 0;
}
function dropper(obj) { 
    clearOjc(obj, boardArry);  
    collision = false;
    if(dropBuffer) collision = checkDropCollision(obj);
    checkHorizontalCollision(obj);
    if(collision){return}
    placeObj(obj, 2, boardArry);
    render();
    dropBuffer = !dropBuffer;
    clearInterval(timer);
    setTimer();
}
function checkBoard(board) {
    for(let x = board.length - 1; x >= 0; --x)
    {
        if(board[x].every( y => y == 1))
        {
            board.splice(x, 1);
            board.unshift(new Array(10));
            board[0].fill(0, 0, 10);
            lines++;
            score += 100;
            x++;
        }

        if(x==3&&(board[x].find(x=>x==1)))
        {
            clearInterval(timer);
            gameOver();
        }

    }

}
function play() {
    dropper(currentDroppingObj);
    render();
}
function rotationObj(obj) {
    if(obj.name === 'square'){return}

    if (obj.name === 'bc-l' && rotat %4 == 1)
    {
        obj.x[0]--; obj.y[0]++;
        obj.x[2]++; obj.y[2]++;
        obj.x[3] += 2; obj.y[3] += 2;
    }

    if(obj.name === 'bc-l' && rotat %4 == 2)
    {
        obj.x[0]++; obj.y[0]++;
        obj.x[2]++; obj.y[2]--;
        obj.x[3] += 2; obj.y[3] -= 2;
    }   

     if(obj.name === 'bc-l' && rotat %4 == 3)
    {
        obj.x[0]++; obj.y[0]--;
        obj.x[2]--; obj.y[2]--;
        obj.x[3] -= 2; obj.y[3] -= 2;
    }

    if(obj.name === 'bc-l' && rotat %4 == 0)
    {
        obj.x[0]--; obj.y[0]--;
        obj.x[2]--; obj.y[2]++;
        obj.x[3] -= 2; obj.y[3] += 2;
    }

    if(obj.name === 'bw-z' && rotat %2 == 1)
    {
        obj.y[3] += 2;
        obj.x[2] += 2;
    }

    if(obj.name === 'bw-z' && rotat %2 == 0)
    {
        obj.y[3] -= 2;
        obj.x[2] -= 2;
    }

    if(obj.name === 'fw-z' && rotat %2 == 1)
    {
        obj.y[3] -= 2;
        obj.x[2] += 2;
    }

    if(obj.name === 'fw-z' && rotat %2 == 0)
    {
        obj.y[3] += 2;
        obj.x[2] -= 2;
    }

    if(obj.name === 'fw-l' && rotat %4 == 1)
    {
        obj.x[0]++; obj.y[0]--;
        obj.x[2]++; obj.y[2]++;
        obj.x[3] += 2; obj.y[3] += 2;
    }

    if(obj.name === 'fw-l' && rotat %4 == 2)
    {
        obj.x[0]--; obj.y[0]--;
        obj.x[2]++; obj.y[2]--;
        obj.x[3] += 2; obj.y[3] -= 2;
    }

    if(obj.name === 'fw-l' && rotat %4 == 3)
    {
        obj.x[0]--; obj.y[0]++;
        obj.x[2]--; obj.y[2]--;
        obj.x[3] -= 2; obj.y[3] -= 2;
    }

    if(obj.name === 'fw-l' && rotat %4 == 0)
    {
        obj.x[0]++; obj.y[0]++;
        obj.x[2]--; obj.y[2]++;
        obj.x[3] -= 2; obj.y[3] += 2;
    }

    if(obj.name === 'line' && rotat %2 == 1)
    {
        obj.x[3]--; obj.y[3]--;
        obj.x[1]++; obj.y[1]++;
        obj.x[0] += 2; obj.y[0] += 2;        
    }

    if(obj.name === 'line' && rotat %2 == 0)
    {
        obj.x[1]--; obj.y[1]--;
        obj.x[3]++; obj.y[3]++;
        obj.x[0] -= 2; obj.y[0] -= 2;        
    }

    if(obj.name === 't' && rotat %4 == 1)
    {
        obj.x[0]--; obj.y[0]++;
        obj.x[3]++; obj.y[3]++;  
        obj.x[2]++; obj.y[2]--;   
    }

    if(obj.name === 't' && rotat %4 == 2)
    {
        obj.x[3]++; obj.y[3]--;
        obj.x[0]++; obj.y[0]++;  
        obj.x[2]--; obj.y[2]--;  
    }

    if(obj.name === 't' && rotat %4 == 3)
    {
        obj.x[0]++; obj.y[0]--;
        obj.x[3]--; obj.y[3]--;  
        obj.x[2]--; obj.y[2]++;  
    }

    if(obj.name === 't' && rotat %4 == 0)
    {
        obj.x[0]--; obj.y[0]--;
        obj.x[3]--; obj.y[3]++;  
        obj.x[2]++; obj.y[2]++;  
    }

}
function rotationCheck(obj) {
    for(let x = 0; x < 4; x++)
    {
        if(obj.y[x] < 0 || obj.y[x] >9 || obj.x[x] > 23 ||
            boardArry[obj.x[x]][obj.y[x]] == 1 )
        {
                return true;
        }

    }

}
function rotation() {
    clearOjc(currentDroppingObj, boardArry);
    rotat++;
    rotationObj(currentDroppingObj);
    if(rotationCheck(currentDroppingObj))
    {
        for(let x = 0; x < 3; x++)
        {
            rotat++;
            rotationObj(currentDroppingObj);
        }

    }

}
function gameOver() {
    grab('tetris').style.display = 'none';
    grab('moblie-controlls').style.display = 'none';
    grab('next-obj').style.visibility = 'hidden';
    grab('play-again').style.display = 'block';
}
function reset() {
    let toRemove = document.querySelectorAll('.grid-square');
    toRemove.forEach(function(node){node.remove();});
    boardArry = undefined;
    bufferArry = undefined;
    intal();
}