const questions = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            {text: "Shark" , correct: false},
            {text: "Blue whale" , correct: true},
            {text: "Elephent" , correct: false},
            {text: "Horse" , correct: false},
        ]
    },
    {
        question: "which country has most popularity?",
        answers: [
            {text: "Pakistan" , correct: false},
            {text: "Chaina" , correct: false},
            {text: "India" , correct: true},
            {text: "Afghnistan" , correct: false},
        ]
    },
    {
        question: "Which language is better for making adriod app?",
        answers: [
            {text: "Swift" , correct: true},
            {text: "java" , correct: false},
            {text: "php" , correct: false},
            {text: "c++" , correct: false},
        ]
    },
    {
        question: "Which one is the best person in the world?",
        answers: [
            {text: "Instain" , correct: false},
            {text: "hetler" , correct: false},
            {text: "mohammad(PBUH)" , correct: true},
            {text: "franklin" , correct: false},
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currnetQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currnetQuestion.question;

    currnetQuestion.answers.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);

    });
}

function resetState() {
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disable = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "play again!";
    nextBtn.style.display = "block";
}

function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else {
        showScore();
    }
}

nextBtn.addEventListener("click" , ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    }
    else{
        startQuiz();
    }

});

startQuiz();