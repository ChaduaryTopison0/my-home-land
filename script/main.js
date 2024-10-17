const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.getElementById('question');

const submitBtn = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

const sNameElement = document.getElementById('sname');
const sGradeElement = document.getElementById('sgrade');
const startQuizElement = document.getElementById('startQuiz');
let currentQuestion = 0 ;
let askedQuestion = [] ;


let showWelcome = (title, description, value) => {
    document.querySelector('.info-box-title').innerHTML = title ;
    document.querySelector('.info-box-description').innerHTML = description ;    
    document.querySelector('.info-box-value').innerHTML = value ;        

}
let getRandomQuestionNumber = () => {
    totalQuestions = 4 ;
    let rqn = Math.floor((Math.random() * totalQuestions) + 1);
    askedQuestion.push(rqn);
    currentQuestion++ ;
    document.querySelector('.info-box-description').innerHTML = currentQuestion + ' out of ' + 10 ;  
    return ('0000'+rqn).slice(-4);  
}

let SubmitAndNext = () => {
    loadQuestion(getRandomQuestionNumber());  
}
let StartQuiz = () =>{
    if(sNameElement.value.trim() !== "")
    {
        if(sGradeElement.value.trim() !== ""){
            showWelcome('Welcome ' + sNameElement.value.trim() , '', '');
            document.querySelector('#userForm').classList.add('hide');
            loadQuestion(getRandomQuestionNumber());
            document.querySelector('.quiz').classList.remove("hide");

        }else{
            alert('Please select your grade')
        }
    }else{
        alert('Please input your name')
    }
    return false;

}

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion(qid) {
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
    answerChoicesElement.innerHTML = '';
    currentQuestion.possibleOptions.forEach(choice => {
        const li = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = choice;
        li.appendChild(radio);
        li.appendChild(document.createTextNode(choice));
        answerChoicesElement.appendChild(li);
        //console.log(answerChoicesElement) ;
    });
}

function checkAnswer() {
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
}

function showResult() {
    quizContainer.style.display = 'none';
    resultElement.classList.remove('hidden');
    scoreElement.textContent = score;
}

submitBtn.addEventListener('click', checkAnswer);