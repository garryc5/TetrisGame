
function addQuestions(q){
var questions = document.getElementById('lastQuestion');
questions.appendChild(document.createElement("Div")).innerHTML=
    '<label>Question:'+
    `<input type="text" name="question${q}" placeholder="Required" required></label>`+
    '<label>Answers:'+
    `<input type="text" name="a${q}0" placeholder="Required" required></label>`+
    `<input type="text" name="a${q}1" placeholder="Required" required></label>`+
    `<input type="text" name="a${q}2" placeholder="Optional" ></label>`+
    `<input type="text" name="a${q}3" id="lastQuestion" placeholder="Optional" ></label>`
;}
