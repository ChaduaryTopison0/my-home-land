var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

let currentQuestion = 0 ;
currentQuestion = typeof(qs['qn']) === 'undefined' ? 0 : (qs['qn'] - 1)
let askedQuestion = [] ;

let validateQuestion = () =>{

    q = document.querySelector('#qtext').value.trim() ;
    a1 = document.querySelector('#atext0').value.trim() ;
    a2 = document.querySelector('#atext1').value.trim() ;
    a3 = document.querySelector('#atext2').value.trim() ;
    a4 = document.querySelector('#atext3').value.trim() ;
    co = '' ;
    try{
        co = document.querySelector('input[name="correctAnswer"]:checked').value
    }catch{

    }
    
    if(q !== "" && a1 !== "" && a2 !== "" && a3 !== "" && a4 !== "" && co !== "")
    {
        // save question in json database
        questions[qid].text = q ;
        questions[qid].possibleOptions[0] = a1 ;
        questions[qid].possibleOptions[1] = a2 ;
        questions[qid].possibleOptions[2] = a3 ;
        questions[qid].possibleOptions[3] = a4 ;
        questions[qid].correctOpton = co ;

        localStorage.setItem('qdb', JSON.stringify(questions)) ;
        return true;

    }else{
        document.querySelector('#emessage').innerHTML = 'Please input all values and mark the correct answer option';
        return false;
    }
    

}

let getQuestionNumber = () => {
    totalQuestions = 100;
    return ('0000' + currentQuestion).slice(-4);  
}

let SaveAndNext = () => {
    if(validateQuestion())
        loadQuestion(getQuestionNumber());  
}


let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    currentQuestion++ ;    
    qid = getQuestionNumber() ;
    document.querySelector('.question-container').innerHTML = '' ;
    if(typeof(questions[qid]) === 'undefined'){
        questions[qid] = {
            text: '',
            possibleOptions: ['','','',''],
            correctOpton: 0
        }
    }

    template = `<h2 id="question">Question: ${currentQuestion}?</h2>
        <img id="questionImage" src="../questions/${qid}.jpg" />
        <fieldset>
            <legend>Questoin:</legend>
            <input type="text" id="qtext" name="qtext" value="${questions[qid].text}"><br><br>
        </fieldset>   
  
        <fieldset>
        <legend>Possible Answers:</legend>
            <ul id="answer-choices">
                <li><input type="text" id="atext0" name="atext1" value="${questions[qid].possibleOptions[0]}"><input id="coption1" type="radio" value="1" name="correctAnswer"></li>
                <li><input type="text" id="atext1" name="atext1" value="${questions[qid].possibleOptions[1]}"><input id="coption2" type="radio" value="2" name="correctAnswer"></li>
                <li><input type="text" id="atext2" name="atext1" value="${questions[qid].possibleOptions[2]}"><input id="coption3" type="radio" value="3" name="correctAnswer"></li>
                <li><input type="text" id="atext3" name="atext1" value="${questions[qid].possibleOptions[3]}"><input id="coption4" type="radio" value="4" name="correctAnswer"></li>
            </ul>    
        </fieldset> ` ;
    document.querySelector('.question-container').innerHTML = template ;
    try{
        document.getElementById('coption' + questions[qid].correctOpton).checked = true;

    }catch(eee){

    }
    

}

if(localStorage.getItem('qdb') != null){
    questions = JSON.parse(localStorage.getItem('qdb'))
}

loadQuestion();


//submitBtn.addEventListener('click', checkAnswer);