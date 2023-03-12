// Variables for the quiz elements.
var beginEl = document.querySelector("#begin");
var questionSection = document.querySelector("#questionSection");
var questionEL = document.querySelector("#question");
var questionCount = 0
var rightOrWrongEl = document.querySelector("#rightOrWrong")

// Variables for the timer.
var timeEl = document.querySelector("p.time");
var secondsLeft = 60;

// Variables for the score.
var scoreEl = document.querySelector("#score");

// Variables when finish.
var finishEl = document.querySelector("#finish");
var initialsInput = document.querySelector("#initials");

// Variables for High scores
var highscoresEl = document.querySelector("#highscores");
var scoreListEl = document.querySelector("#score-list");
var scoreList = [];

// Variables for Buttons
var startBtn = document.querySelector("#startButton");
var ansBtn = document.querySelectorAll("button.ansBtn");
var ans1Btn = document.querySelector("#choice1");
var ans2Btn = document.querySelector("#choice2");
var ans3Btn = document.querySelector("#choice3");
var ans4Btn = document.querySelector("#choice4");
var submitScrBtn = document.querySelector("#submit-score");
var goBackBtn = document.querySelector("#goback");
var clearScrBtn = document.querySelector("#clearscores");
var viewScrBtn = document.querySelector("#view-scores");



var questions = [
    {
    // Question 1
    question: "Which of the following keywords is used to define a variable in Javascript?", 
    choice: ["a. var", "b. let", "c. Both A and B", "d. None of the above"],
    correctAnswer: "2"
    },

    {
    // Question 2
    question: "Which of the following is not javascript data types?", 
    choice: ["a. Null type", "b. Undefined type", "c. Number type", "d. All of the mentioned"],
    correctAnswer: "3"
    },

    {
    // Question 3
    question: "Upon encountering empty statements, what does the Javascript Interpreter do?", 
    choice: ["a. Throws an error.", "b. Ignores the statements.", "c. Gives a warning", "d. None of the above."],
    correctAnswer: "1"
    },

    {
    // Question 4
    question: "How can a datatype be declared to be a constant type?", 
    choice: ["a. const", "b. var", "c. let", "d. constant"],
    correctAnswer: "0"
    },
];

// Function for the timer.
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionSection.style.display = "none";
            finishEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

// Function to start the quiz.
function startQuiz() {
    beginEl.style.display = "none";
    questionSection.style.display = "block";
    questionCount = 0;

setTime();
setQuestion(questionCount);
}

// Set the questions
function setQuestion(id) {
    if (id < questions.length) {
        questionEL.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].choice[0];
        ans2Btn.textContent = questions[id].choice[1];
        ans3Btn.textContent = questions[id].choice[2];
        ans4Btn.textContent = questions[id].choice[3];
    }
}

// Function to check if answers are right or wrong. 

function checkAnswer(event) {
    event.preventDefault();
    rightOrWrongEl.style.display = "block";
    let p = document.createElement("p");
    rightOrWrongEl.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // Check if answer is correct or not.
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 5;
        p.textContent = "Wrong!";
    }

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // call setQuestion to bring in next question when any ansBtn is clicked
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finishEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // sort scores
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // Add to the local storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Get stored scores from localStorage
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // If scores were retrieved from localStorage, update the scorelist array to it
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// Function to clear the scores.
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// Event Listeners
startBtn.addEventListener("click", startQuiz);

// Check answers loop
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Add score
submitScrBtn.addEventListener("click", addScore);

// Go Back Button
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    beginEl.style.display = "block";
    secondsLeft = 60;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

// Clear the scores
clearScrBtn.addEventListener("click", clearScores);

// View/Hide High Scores Button
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});