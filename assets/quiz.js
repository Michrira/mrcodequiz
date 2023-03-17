// Selecting elements from the HTML document
var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
var timeLeftEl = document.querySelector('#timeLeft');
// Setting initial values
var timeLeft = 120;
timeLeftEl.innerHTML = timeLeft;

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = {};

// Array of questions and answers
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

// Function to start the timer and count down from 120 seconds
function startTimer() {
    var timer = setInterval(function(){
        timeLeft = timeLeft-1;
        timeLeftEl.innerHTML = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            localStorage.setItem('mostRecentScore', score);
            return window.location.assign('./end.html');
        }
    }, 1000);
}

// Call the startTimer and begin countdown
startTimer();

// Setting up the game
var SCORE_POINTS = 100;
var MAX_QUESTIONS = 5;

// Starting the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};

// Function to get a new question
getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./end.html');
    }

    // Increment the question counter
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // Put a random question from the availableQuestions array
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // Update the choices text with the current question
    choices.forEach(choice => {
        var number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1); // Remove the current question to avoid repeats

    acceptingAnswers = true; // Set acceptingAnswers to true 
}

// Add event listener for when a choice is clicked
choices.forEach(choice => {
    choice.addEventListener('click', e => {
    if (!acceptingAnswers) return; // If not accepting answers, return

    // Set acceptingAnswers to false to prevent multiple choices from being selected
    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset['number'];
    var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

      // Add this conditional to add the "incorrect" class to the parent element of the selected choice
    if (classToApply === 'correct'){
        incrementScore(SCORE_POINTS);
    } else {
        timeLeft -=10; //subtract 10 seconds from the time left
        timeLeftEl.innerHTML = timeLeft;
    }
    
    selectedChoice.parentElement.classList.add(classToApply); //add appropriate class choice's parent element


    //remove the class and get a new question
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestions();
    }, 1000);
    });
});

// Function to increment the score by the given number
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

// Starts the game
startGame();