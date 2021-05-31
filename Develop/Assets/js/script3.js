
// WHEN all questions are answered or the timer reaches 0
// WHEN the game is over
// THEN I can save my initials and my score

var startButton = document.querySelector(".start-quiz");
var startScreen = document.getElementById('start-screen');
var quizContainer = document.querySelector(".quiz-container");
var question = document.getElementById("questionHere");
var possibleAnswers = document.getElementById('possibleAnswers');
var Alert = document.getElementById('alert');
var hideResults=true;
var finalScore = document.querySelector(".final-score");
var resultsContainer = document.getElementById('results-page');
var submitButton = document.querySelector('.submit-score');
var restartButton = document.querySelector('.restart');
var clearHighscoreButton = document.querySelector('.clear-highscores');
var listedHighscoreScores = document.querySelector(".highscoresListedScores");
var listedHighscoreInitials = document.querySelector(".highscoresListedInitials");

var currentQuestion = 0;
var totalCorrectAnswers = 0;
var questionIndex = 0;
// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

//timer
var timerEl = document.getElementById('timer')
var timer = 99;
var timeInterval;

var allQuestions = [
    {
        question: "What is not a falsy value?",
        possibleAnswers: [
            "undefined", 
            "null", 
            "false", 
            "true"
        ],
        answerIndex:  "true"
    },
    {
        question: "The contents of an array are enclosed within:",
        possibleAnswers: [
            "parentheses", 
            "curly brackets", 
            "quotes", 
            "square brackets"
        ],
        answerIndex:  "square brackets"
    },
    {
        question: "String values must be enclosed within:",
        possibleAnswers: [
            "quotes",
            "curly brackets", 
            "square brackets",
            "parentheses"
        ],
        answerIndex:  "quotes"
    },
    {
        question: "The conditions of if/else statements are enclosed within:",
        possibleAnswers: [
            "quotes", 
            "curly brackets", 
            "square brackets", 
            "parentheses"
        ],
        answerIndex:  "curly brackets"
    },
]

hideResultsPage();
hideHighscorePage();

startButton.addEventListener("click", startQuiz);

possibleAnswers.addEventListener("click", function (event) {
    Alert.innerHTML = ""

    var userChoice = event.target.textContent
    var answerDisplayEl = document.createElement("h2");
    if (userChoice == allQuestions[currentQuestion].answerIndex) {
        answerDisplayEl.textContent = "Correct :)";
        totalCorrectAnswers++;
    } else {
        answerDisplayEl.textContent = "Wrong :(";
        count = count - 10;
    }
   
    Alert.append(answerDisplayEl);
    currentQuestion++;

    if (currentQuestion < 4) {
        renderQuestion();
    }
});

function renderQuestion() {

    question.innerHTML = ""
    possibleAnswers.innerHTML = ""

    question.append(allQuestions[currentQuestion].question)
    var optionOne = document.createElement("button");
    optionOne.textContent = allQuestions[currentQuestion].possibleAnswers[0];
    possibleAnswers.append(optionOne);
    var optionTwo = document.createElement("button");
    optionTwo.textContent = allQuestions[currentQuestion].possibleAnswers[1];
    possibleAnswers.append(optionTwo);
    var optionThree = document.createElement("button");
    optionThree.textContent = allQuestions[currentQuestion].possibleAnswers[2];
    possibleAnswers.append(optionThree);
    var optionFour = document.createElement("button");
    optionFour.textContent = allQuestions[currentQuestion].possibleAnswers[3];
    possibleAnswers.append(optionFour);

};

function startQuiz() {

    var interval = setInterval(function () {
        timerEl.innerHTML = count;
        count--;

        if (count < 0 || currentQuestion > 3) {
            clearInterval(interval);
            endQuiz();
        }

    }, 1000);

    currentQuestion = 0;
    totalCorrectAnswers = 0;
    count = 99
    document.querySelector(".final-score").innerHTML = "";
    renderQuestion();
};

function endQuiz() {

    hideResults = false;

    question.innerHTML = ""
    possibleAnswers.innerHTML = ""
    Alert.innerHTML = ""

    finalScore.append(totalCorrectAnswers);

    hideResultsPage();
};

function renderHighscores() {

    var scoreInitials = localStorage.getItem("initials");
    var storedFinalScore = localStorage.getItem("final-score");

    listedHighscoreInitials.textContent = scoreInitials;
    listedHighscoreScores.textContent = storedFinalScore;

};

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var scoreInitials = document.querySelector("#initials").value;
    var storedFinalScore = totalCorrectAnswers;


    localStorage.setItem("initials", scoreInitials);
    localStorage.setItem("final-score", storedFinalScore);

    hideResults = true;
    hideResultsPage();
    renderHighscores();
})

clearHighscoreButton.addEventListener("click", function () {
    localStorage.clear();
    listedHighscoreInitials.textContent = "";
    listedHighscoreScores.textContent = "";
});

restartButton.addEventListener("click", startQuiz)

function hideStartPage() {
    var startDiv = document.getElementById("start-screen");
    if (startDiv.style.display === "none") {
        startDiv.style.display = "block";
    } else {
        startDiv.style.display = "none";
    }
}

function hideResultsPage() {
    var resultsDiv = document.getElementById("results-page");

    if (hideResults == true) {
    resultsDiv.style.display = "none"
    } else {
        resultsDiv.style.display = "block"
    }
}

function hideHighscorePage() {
    var highscoreDiv = document.getElementById("highscore-page");
    if (highscoreDiv.style.display === "none") {
        highscoreDiv.style.display = "block";
    } else {
        highscoreDiv.style.display = "none";
    }
}

