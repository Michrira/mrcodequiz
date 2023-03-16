var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
var timeLeftEl = document.querySelector('#timeLeft');
var timeLeft = 120;
timeLeftEl.innerHTML = timeLeft;

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = {};

var questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Hypertext Makeup Language",
        choice2: "Hypertext Markup Language",
        choice3: "Hypermedia Markup Language",
        choice4: "Hyperspace Markup Language",
        answer: 2
    },
    {
        question: "What does CSS stand for?",
        choice1: "Computer System Software",
        choice2: "Creative Style Sheet",
        choice3: "Cascading Style Sheets",
        choice4: "Content Sharing Service",
        answer: 3
    },
    {
        question: "Which of the following is not a programming language?",
        choice1: "Python",
        choice2: "HTML",
        choice3: "Ruby",
        choice4: "Photoshop",
        answer: 4
    },
    {
        question: "Which of the following is not an HTML tag?",
        choice1: "<p>",
        choice2: "<img>",
        choice3: "<head>",
        choice4: "<link>",
        answer: 4
    },
    {
        question: "What is the correct syntax for creating an ordered list in HTML?",
        choice1: "<ol><li>item 1</li></ol>",
        choice2: "<li><ol>Item 1</ol></li>",
        choice3: "<ol><item>Item 1</item></ol>",
        choice4: "<ul><li>Item 1</li></ul>",
        answer: 1
    }
];

function startTimer() {
    var timer = setInterval(function(){
        timeLeft = timeLeft-1;
        timeLeftEl.innerHTML = timeLeft;
    }, 1000);
}

startTimer();

var SCORE_POINTS = 100;
var MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};

getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        var number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset['number'];
    var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

      // Add this conditional to add the "incorrect" class to the parent element of the selected choice
    if (classToApply === 'correct'){
        incrementScore(SCORE_POINTS);
    }
    
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestions();
    }, 1000);
    });
});

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame();