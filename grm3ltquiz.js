let currentQuestionIndex = 0;
let correctAnswers = 0;
let currentQuiz;
const selectedOptions = [];

const quizzes = {
    'easy-level': [
        {
            question: "Easy Question 1?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A"
        }
    ],
    'medium-level': [
        {
            question: "Medium Question 1?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option B"
        }
    ],
    'hard-level': [
        {
            question: "Hard Question 1?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option C"
        }
    ]
};

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.exercise-btn').forEach(button => {
        button.addEventListener('click', function() {
            startQuiz(this.getAttribute('data-level'));
        });
    });

    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
});

function startQuiz(quiz) {
    currentQuiz = quiz;
    currentQuestionIndex = 0;
    correctAnswers = 0;
    selectedOptions.length = 0;

    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizzes[currentQuiz][currentQuestionIndex];

    document.getElementById('currentQuestion').innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => highlightSelectedOption(button);
        optionsContainer.appendChild(button);
    });
}

function highlightSelectedOption(selectedButton) {
    document.querySelectorAll('.options button').forEach(button => {
        button.classList.remove('highlighted');
    });
    selectedButton.classList.add('highlighted');
}

function checkAnswer() {
    const selectedButton = document.querySelector('.highlighted');

    if (selectedButton) {
        const selectedOption = selectedButton.textContent;
        const currentQuestion = quizzes[currentQuiz][currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        if (isCorrect) {
            selectedButton.classList.add('correct');
            correctAnswers++;
        } else {
            selectedButton.classList.add('incorrect');
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < quizzes[currentQuiz].length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }
}

function endQuiz() {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `You got ${correctAnswers} out of ${quizzes[currentQuiz].length} correct!`;
}
