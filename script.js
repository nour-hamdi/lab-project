document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;
    let totalScore = 0;
    let sectionScores = Array(sections.length).fill(0); // Initialize an array to track scores for each section
    let answeredQuestions = 0;
    let totalQuestionsInCurrentSection = 0;
    let questionFeedback = []; // Array to store feedback for each question

    function showSection(index) {
        sections.forEach((section, i) => {
            section.style.display = i === index ? 'block' : 'none';
        });

        // Initialize question count for the current section
        totalQuestionsInCurrentSection = document.querySelectorAll(`#section-${index + 1} .question`).length;
        answeredQuestions = 0;
        document.getElementById('next-btn').disabled = true; // Disable the Next button initially
    }

    function handleAnswerClick(event) {
        const selectedAnswer = event.target.getAttribute('data-answer');
        const correctAnswer = event.target.closest('.question').getAttribute('data-correct');
        const sectionIndex = parseInt(event.target.closest('.section').id.split('-')[1], 10) - 1;
        const questionElement = event.target.closest('.question');

        // Store feedback for the question
        if (!questionFeedback[sectionIndex]) {
            questionFeedback[sectionIndex] = [];
        }

        // Remove selected class from all buttons in the question
        questionElement.querySelectorAll('.answer-btn').forEach(btn => btn.classList.remove('selected', 'correct', 'incorrect'));

        // Add selected class to the clicked button
        event.target.classList.add('selected');

        if (selectedAnswer === correctAnswer) {
            totalScore++;
            sectionScores[sectionIndex]++;
            event.target.classList.add('correct'); // Add class for correct answers
            questionFeedback[sectionIndex].push({ question: questionElement.querySelector('p').textContent, answer: selectedAnswer, correct: true });
        } else {
            event.target.classList.add('incorrect'); // Add class for incorrect answers
            questionFeedback[sectionIndex].push({ question: questionElement.querySelector('p').textContent, answer: selectedAnswer, correct: false });
        }

        // Mark the question as answered
        answeredQuestions++;

        // Check if all questions in the current section have been answered
        if (answeredQuestions === totalQuestionsInCurrentSection) {
            document.getElementById('next-btn').disabled = false; // Enable the Next button
        }
    }

    function showResult() {
        document.getElementById('quiz').style.display = 'none';
        const resultSection = document.getElementById('result');
        const resultText = document.getElementById('result-text');
        let resultHTML = `You scored ${totalScore} out of ${sections.length * 2}!<br><br>`;

        sections.forEach((section, index) => {
            const sectionName = section.querySelector('h2').textContent;
            resultHTML += `<strong>${sectionName}:</strong> ${sectionScores[index]} out of ${section.querySelectorAll('.question').length}<br>`;

            // Add feedback for each question in the section
            if (questionFeedback[index]) {
                resultHTML += `<ul>`;
                questionFeedback[index].forEach(feedback => {
                    resultHTML += `<li><strong>Question:</strong> ${feedback.question}<br><strong>Your Answer:</strong> ${feedback.answer}<br><strong>Correct:</strong> ${feedback.correct ? 'Yes' : 'No'}</li>`;
                });
                resultHTML += `</ul><br>`;
            }
        });

        resultText.innerHTML = resultHTML;
        resultSection.style.display = 'block';
    }

    showSection(currentSectionIndex);

    // Add event listeners to answer buttons
    document.querySelectorAll('.answer-btn').forEach(button => {
        button.addEventListener('click', handleAnswerClick);
    });

    // Add event listener to the Next button
    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            showSection(currentSectionIndex);
        } else {
            showResult();
        }
    });
});
