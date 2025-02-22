        function startQuiz(quiz) {
            currentQuiz = quiz;
            currentQuestionIndex = 0;
            correctAnswers = 0;
            shuffleQuestionsFlag = false;
            selectedOptions.length = 0; // Clear selected options

            showQuestion();
        }

        function showQuestion() {
            const currentQuestion = getCurrentQuestion();

            document.getElementById('currentQuestion').innerHTML = `${currentQuestionIndex + 1}. ${
                currentQuestion.question
            }`;

            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';

            currentQuestion.options.forEach((option, index) => {
                const button2 = document.createElement('button2');
                button2.textContent = option;
                button2.onclick = () => highlightSelectedOption(button2);
                optionsContainer.appendChild(button2);
            });

            resetTimer();
            startTimer();
        }

        function getCurrentQuestion() {
            const questions = quizzes[currentQuiz];

            if (shuffleQuestionsFlag) {
                // Shuffle questions if enabled
                shuffleArray(questions);
            }

            return questions[currentQuestionIndex];
        }

        function highlightSelectedOption(selectedButton) {
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.querySelectorAll('button2').forEach(button2 => {
                button2.classList.remove('highlighted');
            });

            selectedButton.classList.add('highlighted');
        }

        function checkAnswer() {
            const selectedButton = document.querySelector('.highlighted');

            if (selectedButton) {
                const selectedOption = selectedButton.textContent;
                const currentQuestion = getCurrentQuestion();

                const isCorrect = selectedOption === currentQuestion.correctAnswer;

                selectedOptions.push({
                    questionIndex: currentQuestionIndex,
                    option: selectedOption,
                    correct: isCorrect,
                });

                if (isCorrect) {
                    selectedButton.classList.add('correct');
                    correctAnswers++;
                } else {
                    selectedButton.classList.add('incorrect');
                }

                displayOptions();
                currentQuestionIndex++;

                if (currentQuestionIndex < quizzes[currentQuiz].length) {
                    showQuestion();
                } else {
                    endQuiz();
                }
            }
        }

        function displayOptions() {
            const currentQuestion = getCurrentQuestion();
            const optionsDisplay = document.getElementById('optionsDisplay');

            const optionsHTML = currentQuestion.options.map(option => {
                return `<button2>${option}</butto2n>`;
            }).join('');

            optionsDisplay.innerHTML = optionsHTML;
        }

        function endQuiz() {
            stopTimer();
            displayResult();
            displayQuestionList();
        }

        function displayResult() {
            const resultDiv = document.getElementById('result');
            const feedbackDiv = document.getElementById('feedback');
            const optionsDisplay = document.getElementById('optionsDisplay');

            let percentage = (correctAnswers / quizzes[currentQuiz].length) * 100;

            resultDiv.textContent = `You got ${correctAnswers} out of ${quizzes[currentQuiz].length} correct! (${percentage}%)`;

            if (percentage === 100) {
                feedbackDiv.textContent = '😍🎉 Perfect score! Well done!';
            } else if (percentage >= 70) {
                feedbackDiv.textContent = '👏👍 Great job! You have a good understanding.';
            } else {
                feedbackDiv.textContent = '😕🔄️ Keep practicing! You can improve.';
            }
        }

        function displayQuestionList() {
            const questionList = document.getElementById('questionList');
            questionList.innerHTML = '<h4>Questions List:</h4>';

            quizzes[currentQuiz].forEach((question, index) => {
                const questionItem = document.createElement('div');
                questionItem.classList.add('question-item');

                const questionNumber = document.createElement('span');
                questionNumber.classList.add('question-number');
                questionNumber.textContent = `Q${index + 1}:`;

                const selectedOption = getSelectedOption(index);
                let selectedOptionClass;

                if (selectedOption.correct) {
                    selectedOptionClass = 'correct-answer';
                } else {
                    selectedOptionClass = 'incorrect-answer';
                }

                const selectedOptionElement = document.createElement('span');
                selectedOptionElement.classList.add('selected-option', selectedOptionClass);
                selectedOptionElement.textContent = `Selected: ${selectedOption.option}`;

                const correctAnswerElement = document.createElement('span');
                correctAnswerElement.classList.add('correct-answer');
                correctAnswerElement.textContent = `Correct Answer: ${question.correctAnswer}`;

                questionItem.appendChild(questionNumber);
                questionItem.appendChild(selectedOptionElement);
                questionItem.appendChild(correctAnswerElement);

                questionList.appendChild(questionItem);
            });
        }

        function getSelectedOption(questionIndex) {
            const selectedOption = selectedOptions.find(option => option.questionIndex === questionIndex) || {
                option: 'Not answered',
                correct: false,
            };

            return selectedOption;
        }

        function startTimer() {
            let timeLeft = 20; // Set the timer duration in seconds

            timer = setInterval(() => {
                document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
                document.getElementById('timer').style.color = calculateTimerColor(timeLeft);

                if (timeLeft === 0) {
                    stopTimer();
                    endQuiz();
                }

                timeLeft--;
            }, 1000);
        }

        function calculateTimerColor(timeLeft) {
            const hue = (timeLeft / 20) * 120; // Gradually change from green (120) to red (0)
            return `hsl(${hue}, 100%, 50%)`;
        }

        function resetTimer() {
            document.getElementById('timer').textContent = '';
            clearInterval(timer);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        function resetQuiz() {
            stopTimer();

            const resultDiv = document.getElementById('result');
            const feedbackDiv = document.getElementById('feedback');
            const optionsDisplay = document.getElementById('optionsDisplay');
            const optionsContainer = document.getElementById('optionsContainer');
            const questionList = document.getElementById('questionList');

            resultDiv.textContent = '';
            feedbackDiv.textContent = '';
            optionsDisplay.innerHTML = '';
            optionsContainer.innerHTML = '';
            questionList.innerHTML = '';
            showOptions();
            startQuiz(currentQuiz); // Restart the quiz
        }

        function shuffleOptions() {
            shuffleArray(getCurrentQuestion().options);
            showQuestion();
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function hideOptions() {
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.style.display = 'none';
        }

        function showOptions() {
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.style.display = 'flex';
        }
	
        function toggleRevealQuestions() {
            const questionList = document.getElementById('questionList');
        
        // Toggle the visibility class
        questionList.classList.toggle('reveal-questions');

        // If the questions are now visible, update the content
        if (questionList.classList.contains('reveal-questions')) {
            questionList.innerHTML = '<h3>Full Question List:</h3>';
            quizzes[currentQuiz].forEach((question, index) => {
                const questionItem = document.createElement('div');
                questionItem.classList.add('question-item');

                const fullQuestion = document.createElement('p');
                fullQuestion.textContent = `${index + 1}. ${question.question}`;

                const selectedOption = getSelectedOption(index);
                let selectedOptionClass;

                if (selectedOption.correct) {
                    selectedOptionClass = 'correct-answer';
                } else {
                    selectedOptionClass = 'incorrect-answer';
                }

                const selectedOptionElement = document.createElement('p');
                selectedOptionElement.classList.add(selectedOptionClass);
                selectedOptionElement.textContent = `Selected: ${selectedOption.option}`;

                questionItem.appendChild(fullQuestion);
                questionItem.appendChild(selectedOptionElement);

                questionList.appendChild(questionItem);
            });
        } else {
            // If the questions are hidden, clear the content
            questionList.innerHTML = '';
        }
    }
