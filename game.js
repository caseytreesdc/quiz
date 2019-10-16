const question = document.getElementById("question");
const explanation = document.getElementById("explanation");
const choices = Array.from( document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const nextquestion = document.getElementById("nextquestion");
const choicecontainer = document.getElementsByClassName("choice-container");
//const answerExplanation = document.getElementById("answer-explanation");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
    question: "How many trees did our volunteers plant this spring?",
    explanation: "Our volunteers planted 3000 trees last spring",
    choice1: "100",
    choice2: "500", 
    choice3: "1000",
    choice4: "3000",
    answer: 4
    },
    {
    question: "How many people volunteered with Casey Trees this spring?",
    explanation: "600 volunteers came out and volunteered with us last spring", 
    choice1: "10",
    choice2: "50", 
    choice3: "100",
    choice4: "600",
    answer: 4, 
    },
    {
    question: "How much water do newly planted trees need to survive per week?",
    explanation: "Trees need 25 gallons of water per week to survive",
    choice1: "2 gallons",
    choice2: "2.5 gallons", 
    choice3: "25 gallons",
    choice4: "50 gallons",
    answer: 3
    },
]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
   if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign("https://connect.clickandpledge.com/w/Form/b7852b67-4119-4738-bb07-db98ef6eaee4");
      }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    //console.log(questionCounterText.innerText);

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    explanation.innerText = currentQuestion.explanation;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });


    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }

            console.log(choice.innerText, selectedAnswer, currentQuestion.answer, selectedChoice.parentElement, currentQuestion);
            console.dir(choices);


        selectedChoice.parentElement.classList.add(classToApply);
        explanation.classList.remove("correct-answer-hidden");
        explanation.classList.add("correct-answer-showing");

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
           explanation.classList.remove("correct-answer-showing");
            explanation.classList.add("correct-answer-hidden");
            getNewQuestion();
        }, 2000)

        
    });
});

/*nextquestion.addEventListener("click", e => {
    getNewQuestion();
    choicecontainer.classList.remove(classToApply);     
});*/


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();


