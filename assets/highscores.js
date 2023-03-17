// Get element with "highScoresList" id
var highScoresList = document.querySelector('#highScoresList')

// Get the high scores from local storage
var highScores = JSON.parse(localStorage.getItem('highScores')) || []

// Set inner HTML of highScoresList element to the list of high scores
highScoresList.innerHTML = 

// Map over each high score object in the highScores array
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')
// Join the array of HTML strings into a single thread