function showSection(index) {
    sections.forEach((section, i) => {
        section.style.display = i === index ? 'block' : 'none';
    });

   
    totalQuestionsInCurrentSection = document.querySelectorAll(`#section-${index + 1} .question`).length;
    answeredQuestions = 0;
    document.getElementById('next-btn').disabled = true; 
}

showSection(currentSectionIndex);
function handleAnswerClick(event) {
    const selectedAnswer = event.target.getAttribute('data-answer');
    const correctAnswer = event.target.closest('.question').getAttribute('data-correct');
    const sectionIndex = parseInt(event.target.closest('.section').id.split('-')[1], 10) - 1;

  
    const question = event.target.closest('.question');
    question.querySelectorAll('.answer-btn').forEach(btn => btn.classList.remove('selected'));


    event.target.classList.add('selected');

    if (selectedAnswer === correctAnswer) {
        totalScore++;
        sectionScores[sectionIndex]++;
        event.target.classList.add('correct'); 
    } else {
        event.target.classList.add('incorrect'); 
    }

   
    answeredQuestions++;

   
    if (answeredQuestions === totalQuestionsInCurrentSection) {
        document.getElementById('next-btn').disabled = false; 
    }
}


document.querySelectorAll('.answer-btn').forEach(button => {
    button.addEventListener('click', handleAnswerClick);
});
let currentSectionIndex = 0;
let totalScore = 0;
let sectionScores = Array(sections.length).fill(0); 
let answeredQuestions = 0;
let totalQuestionsInCurrentSection = 0;


answeredQuestions++;
