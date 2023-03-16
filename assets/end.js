// Select the necessary elements from the DOM
var username = document.querySelector('#username')
var saveScoreBtn = document.querySelector('#saveScoreBtn')
var finalScore = document.querySelector('#finalScore')
var mostRecentScore = JSON.parse(localStorage.getItem('mostRecentScore'))

var highScores = JSON.parse(localStorage.getItem('highScores')) || []

var MAX_HIGH_SCORES = 5

// Set the final score to the most recent score
finalScore.innerText = mostRecentScore

// Disable the "save score" button until a name is entered
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

// Define the saveHighScore function
function saveHighScore(e) {
    e.preventDefault()

    // Create a new score object with the name and score
    var score = {
        score: mostRecentScore,
        name: username.value
    }

    // Add the new score to the highScores array and sort it in descending order
    highScores.push(score)
    highScores.sort((a,b) => b.score - a.score)

    // Keep only the top MAX_HIGH_SCORES scores
    highScores.splice(MAX_HIGH_SCORES)

    // Store the updated highScores array in local storage and redirect to the home page
    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}
