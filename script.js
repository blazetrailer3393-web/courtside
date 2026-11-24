
// DARK AND LIGHT MODE
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    themeBtn.textContent =
        document.body.classList.contains("light") ? "🌙" : "☀️";
});


// BASKETBALL QUIZ
const questions = [
    {
        question: "Which player is famous for three-point shooting?",
        answers: ["LeBron James", "Stephen Curry", "Shaquille O'Neal", "Kawhi Leonard"],
        correct: 1
    },
    {
        question: "How many players from one team are on the court?",
        answers: ["4", "6", "5", "7"],
        correct: 2
    },
    {
        question: "How many points is a shot from behind the three-point line worth?",
        answers: ["1", "2", "3", "4"],
        correct: 2
    },
    {
        question: "Which NBA team plays in Los Angeles?",
        answers: ["Lakers", "Celtics", "Bulls", "Heat"],
        correct: 0
    },
    {
        question: "How long is a standard NBA game?",
        answers: ["40 minutes", "48 minutes", "60 minutes", "90 minutes"],
        correct: 1
    }
];

let currentQuestion = 0;
let quizScore = 0;
let answered = false;

function displayQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;
    document.getElementById("quizResult").textContent = "";
    document.getElementById("nextQuestion").hidden = true;

    const answerBox = document.getElementById("answers");
    answerBox.innerHTML = "";

    answered = false;

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.addEventListener("click", () => {
            checkAnswer(button, index === q.correct);
        });

        answerBox.appendChild(button);
    });
}

function checkAnswer(button, correct) {
    if (answered) return;

    answered = true;

    const result = document.getElementById("quizResult");
    const buttons = document.querySelectorAll("#answers button");

    buttons.forEach(b => b.disabled = true);

    if (correct) {
        quizScore++;
        result.textContent = "🔥 CORRECT! Great job!";
        button.style.background = "#237c42";
    } else {
        result.textContent = "❌ Not quite! Keep learning.";
        button.style.background = "#a83232";
    }

    document.getElementById("quizScore").textContent = quizScore;
    document.getElementById("nextQuestion").hidden = false;
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        document.getElementById("question").textContent =
            "QUIZ COMPLETED! Your final score is " + quizScore + "/5.";

        document.getElementById("answers").innerHTML = "";

        document.getElementById("quizResult").textContent =
            quizScore === 5 ? "🏆 PERFECT SCORE!" : "Keep practicing!";

        document.getElementById("nextQuestion").hidden = true;

        const restart = document.createElement("button");
        restart.className = "main-btn";
        restart.textContent = "PLAY AGAIN";
        restart.onclick = restartQuiz;

        document.getElementById("answers").appendChild(restart);

        return;
    }

    displayQuestion();
}

function restartQuiz() {
    currentQuestion = 0;
    quizScore = 0;

    document.getElementById("quizScore").textContent = 0;

    displayQuestion();
}

displayQuestion();


// GUESS THE PLAYER GAME
const players = [
    {
        clue: "I am known as the King. I have played for the Lakers. Who am I?",
        answer: "lebron james"
    },
    {
        clue: "I am famous for my incredible three-point shooting. Who am I?",
        answer: "stephen curry"
    },
    {
        clue: "I am a very tall French basketball player who plays for the Spurs. Who am I?",
        answer: "victor wembanyama"
    },
    {
        clue: "I am known as the Greek Freak and play for the Bucks. Who am I?",
        answer: "giannis antetokounmpo"
    }
];

let playerIndex = 0;

function guessPlayer() {
    const guess = document.getElementById("playerGuess")
        .value.trim().toLowerCase();

    const result = document.getElementById("guessResult");

    if (!guess) {
        result.textContent = "Enter a player name first!";
        return;
    }

    if (guess === players[playerIndex].answer) {
        result.textContent = "🏆 CORRECT! You know your basketball!";
    } else {
        result.textContent = "Not quite! Try again.";
    }
}

function newPlayer() {
    playerIndex = (playerIndex + 1) % players.length;

    document.getElementById("playerClue").textContent =
        players[playerIndex].clue;

    document.getElementById("playerGuess").value = "";
    document.getElementById("guessResult").textContent = "";
}


// FREE THROW CHALLENGE
let shotsMade = 0;
let shotsTaken = 0;

function takeShot() {
    if (shotsTaken >= 10) {
        document.getElementById("shotMessage").textContent =
            "Game over! Reset to play again.";
        return;
    }

    shotsTaken++;

    const made = Math.random() < 0.6;

    if (made) {
        shotsMade++;

        document.getElementById("shotMessage").textContent =
            "🔥 SWISH! You made the shot!";
    } else {
        document.getElementById("shotMessage").textContent =
            "MISS! Take another shot!";
    }

    document.getElementById("shootScore").textContent =
        shotsMade;

    if (shotsTaken === 10) {
        document.getElementById("shotMessage").textContent =
            "🏀 FINAL SCORE: " + shotsMade + " out of 10!";
    }
}

function resetGame() {
    shotsMade = 0;
    shotsTaken = 0;

    document.getElementById("shootScore").textContent = "0";
    document.getElementById("shotMessage").textContent =
        "Ready? Let's play!";
}
