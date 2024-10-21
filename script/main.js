const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.getElementById('question');

const submitBtn = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

const sNameElement = document.getElementById('sname');
const sGradeElement = document.getElementById('sgrade');
const sIdElement = document.getElementById('sid');
const startQuizElement = document.getElementById('startQuiz');


if(localStorage.getItem('qdb') != null){
    questions = JSON.parse(localStorage.getItem('qdb'))
}
let currentQuestion = 0 ;
let askedQuestion = [] ;
let currentQuestionAnswer = -1 ;
let scoreObtained = 0 ;
let TestQ2Pass = 0 ;
currentQuestion = TestQ2Pass ;

let showWelcome = (title, description, value) => {
    document.querySelector('.info-box-title').innerHTML = title ;
    document.querySelector('.info-box-description').innerHTML = description ;    
    document.querySelector('.info-box-value').innerHTML = value ;        

}
let getRandomQuestionNumber = () => {

    if(currentQuestion == 9){
        submitBtn.innerText  = 'Sumbit & Finish' ;
    }else if(currentQuestion == 10){
        showWelcome('Quiz Completed!', 'Thank you <span style="color:red">' + sNameElement.value.trim() +'</span>, for participating.', '');
        document.querySelector('.info-box-complete').classList.remove('hide');
        document.querySelector('#marksObtained').innerHTML = scoreObtained;
        document.querySelector('#userForm').classList.remove('hide');
        document.querySelector('.quiz').classList.add("hide");
        sNameElement.value = '' ;
        document.getElementById('sgrade').selectedIndex = 0 ;
        sIdElement.value = '' ;
        return;  
    }

    totalQuestions = Object.keys(questions).length ;
    let rqn = Math.floor((Math.random() * totalQuestions) + 1);
    askedQuestion.push(rqn);
    currentQuestion++ ;
    document.querySelector('.info-box-description').innerHTML = currentQuestion + ' out of ' + 10 ;
    return ('0000'+rqn).slice(-4);  
}

let SubmitAndNext = () => {
    co = '' ;
    try{
        coElement = document.querySelector('input[name="answer"]:checked') ;
        co = coElement.value ;
        coIndex = coElement.getAttribute('data-index') ;
        (currentQuestionAnswer === coIndex ) ? scoreObtained++ : scoreObtained ;        
        //console.log(co + '  ** ' + currentQuestionAnswer)
    }catch{

    } 
    co !== "" ? loadQuestion(getRandomQuestionNumber()) : document.querySelector('#emessage').innerHTML = 'Please select your answer to proceed';
}
let StartQuiz = () =>{
    
    if(sNameElement.value.trim() !== "")
    {
        if(sGradeElement.value.trim() !== ""){
            currentQuestion = TestQ2Pass ;
            scoreObtained = 0 ;
            showWelcome('Welcome: <span style="color:red">' + sNameElement.value.trim() , '</span>', '');
            document.querySelector('#userForm').classList.add('hide');
            document.querySelector('.quiz').classList.remove("hide");
            document.querySelector('.info-box-complete').classList.add('hide');
            loadQuestion(getRandomQuestionNumber());
            

        }else{
            alert('Please select your grade')
        }
    }else{
        alert('Please input your name')
    }
    return false;

}

function loadQuestion(qid) {
    document.querySelector('#emessage').innerHTML = ''
    const currentQuestion = questions[qid];
    document.querySelector('.question-container').innerHTML = '' ;
    template = `<h2 id="question">Question: ${currentQuestion.text}?</h2>
            <img id="questionImage" src="questions/${qid}.jpg" />
                <ul id="answer-choices">

                </ul>` ;
    document.querySelector('.question-container').innerHTML = template ;
    
/*
*/
    const answerChoicesElement = document.getElementById('answer-choices');
    currentQuestionAnswer = currentQuestion.correctOpton ;
    answerChoicesElement.innerHTML = '';
    currentQuestion.possibleOptions.forEach((choice, ind) => {
        const li = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = choice;
        radio.dataset.index = ind + 1;
        li.appendChild(radio);
        li.appendChild(document.createTextNode(choice));
        answerChoicesElement.appendChild(li);
        //console.log(answerChoicesElement) ;
    });
}

function checkAnswer() {
/*
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === questions[currentQuestionIndex].correctAnswer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
        */
}

function showResult() {
    quizContainer.style.display = 'none';
    resultElement.classList.remove('hidden');
    scoreElement.textContent = score;
}