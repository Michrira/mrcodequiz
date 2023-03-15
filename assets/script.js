// Define quiz questions and answers
var questions = [
    {
    question: "What is JavaScript?",
    choices: ["A type of coffee", "A programming language", "A musical instrument", "A type of beer"],
    answer: "A programming language"
    },
    {
    question: "What is a variable?",
    choices: ["A way to store data", "A type of animal", "A type of fruit", "A type of car"],
    answer: "A way to store data"
    },
    {
    question: "What is a function?",
    choices: ["A type of food", "A block of code that performs a specific task", "A type of animal", "A type of tree"],
    answer: "A block of code that performs a specific task"
    },
    {
    question: "What is an array?",
    choices: ["A type of bird", "A type of fish", "A way to store multiple values in a single variable", "A type of flower"],
    answer: "A way to store multiple values in a single variable"
    },
    {
    question: "What is a loop?",
    choices: ["A type of rope", "A type of car", "A way to repeat code", "A type of dance"],
    answer: "A way to repeat code"
    }
];

  // Define global variables
var startButton = document.getElementById("start-button");
var quizScreen = document.getElementById("quiz");

// Set the duration of the timer in seconds
const duration = 60;

// Get the countdown element from the DOM
const countdown = document.getElementById("countdown");

// Update the countdown every second
const timer = setInterval(() => {
  // Calculate the remaining time in seconds
const timeLeft = duration - Math.floor((Date.now() - startTime) / 1000);

  // Update the countdown element with the remaining time
countdown.innerHTML = `Time left: ${timeLeft} seconds`;

  // Check if the timer has expired
if (timeLeft <= 0) {
    clearInterval(timer);
    countdown.innerHTML = "Time's up!";
}
}, 1000);

// Get the start time of the timer
const startTime = Date.now();
