// WHEN I click the start button

// THEN a timer starts and I am presented with a question
 //   -hide the start scree
    // start timer
    // present question


// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

var startButton = document.getElementById('start-button');
var startScreen = document.getElementById('start-screen-container')
var timerEl = document.getElementById('timer')
var questionContainer = document.getElementById('question-container')

var timer = 99;

var allQuestions = [
    {
        question: 'What is not a falsy value?',
        possibleAnswers: [
            'undefined', 'null', 'false', 'true'
        ],
        answerIndex:  3
    },
    {
        question: 'The contents of an array are enclosed within:',
        possibleAnswers: [
            'parentheses', 'curly brackets', 'quotes', 'square brackets'
        ],
        answerIndex:  3
    },
    {
        question: 'String values must be enclosed within:',
        possibleAnswers: [
            'quotes', 'curly brackets', 'square brackets', 'parentheses'
        ],
        answerIndex:  0
    },
    {
        question: 'The conditions of if/else statements are enclosed within:',
        possibleAnswers: [
            'quotes', 'curly brackets', 'square brackets', 'parentheses'
        ],
        answerIndex:  1
    },
    {
        question: 'A very useful tool for debugging and identifying element content is:',
        possibleAnswers: [
            'inspect console', 'google', 'console log', 'all of these'
        ],
        answerIndex:  3
    }
];


var questionIndex = 0;
var score = 0

function showQuestion(questionIndex) {
var currentQuestion = allQuestions[questionIndex]
var question = currentQuestion.question
var answersArray = currentQuestion.possibleAnswers


    var questionDiv = document.createElement('div')
    questionDiv.setAttribute('id', 'question')
    questionDiv.innerHTML = question
    
    var answerButtonContainer = document.createElement('div')
    answerButtonContainer.setAttribute('id', 'answer-buttons')

    for(var i = 0; i < answersArray.length; i++) {
        var answerButton = document.createElement('button')
        answerButton.classList.add('btn')
        answerButton.innerHTML = answersArray[i]
        answerButton.addEventListener('click', function(event){
            if(i === currentQuestion.answerIndex) {
                score++
                questionIndex++
                showQuestion(questionIndex)
                alert("correct");
            } else {
            //wrong so do stuff here for wrong
                showQuestion(questionIndex)
                alert("incorrect");
        }
        answerButtonContainer.appendChild(answerButton)
    


/*     <div id="question">Question</div>
    <div id="answer-buttons" class="btn-grid">
        <button class="btn">Answer 1</button>
        <button class="btn">Answer 2</button>
        <button class="btn">Answer 3</button>
        <button class="btn">Answer 4</button>
    </div>
    <div class="controls">
        <button id="start-btn" class="start-btn btn">Start</button>
    </div> */

    questionContainer.appendChild(questionDiv)
    questionContainer.appendChild(answerButtonContainer)

})



startButton.addEventListener('click', function(event) {
    startScreen.style.display = 'none'
    timerEl.classList.toggle('hide')
    questionContainer.classList.toggle('hide')
    showQuestion(questionIndex)
    
    const runTimer = setInterval(function(){
        if(timer === 0 ) {
            clearInterval(runTimer)
            //run some end game scenario or function
        }
        timerEl.innerHTML = timer;
        timer--
    }, 1000)
});
}
;

