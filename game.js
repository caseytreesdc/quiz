const question = document.getElementById("question");
const questionImage = document.getElementById("questionImage");
const explanation = document.getElementById("explanation");
const choices = Array.from( document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const nextquestion = document.getElementById("nextquestion");
const choicecontainer = document.getElementsByClassName("choice-container");
const progressBarFull = document.getElementById("progressBarFull");

console.log(choices, choices[3].parentElement);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
    questionImage: "<img src='images/trees.png' width='100%'>",
    question: "How many trees were collectively planted in the District in 2018?",
    explanation: "For the city to achieve its 40 percent canopy goal by 2032, at least 10,648 trees must be planted each year for the next 14 years. In 2018, 15,529 trees were collectively planted throughout D.C. This vastly surpasses the target and is the highest planting number to date",
    choice1: "5,479",
    choice2: "10,648", 
    choice3: "13,456",
    choice4: "15,529",
    answer: 4
    },
    {
    questionImage: "<img src='images/volunteers.png' width='100%'>",
    question: "How many people volunteered with Casey Trees in the past year?",
    explanation: "We love our volunteers. Story about how great our volunteers are. Why you should become one. 1203 volunteers joined us to plant, inventory and care for D.C.'s urban forest.", 
    choice1: "202",
    choice2: "423", 
    choice3: "1545",
    choice4: "1203",
    answer: 4, 
    },
    {
    questionImage: "<img src='images/water.png' width='100%'>",
    question: "How much water do newly planted trees need to survive per week?",
    explanation: "The single most important factor for young tree survival is water. Continue watering through the first two to three years after planting. Young trees require 1.5 inches of rain or 25 gallons of water per week for the first three years to establish their roots.",
    choice1: "2 gallons",
    choice2: "2.5 gallons", 
    choice3: "25 gallons",
    choice4: "50 gallons",
    answer: 3
    },
    {
    questionImage: "<img src='images/sweetgum.png' width='100%'>",
    question: "How many pounds of carbon can a mature sweetgum remove from the atmosphere?",
    explanation: "The American sweetgum has star-shaped leaves and spikey fruit valued by urban wildlife. A mature sweetgum can remove 464 pounds of carbon from the atmosphere and intercept approx. 4,389 gallons of stormwater runoff in a year.",
    choice1: "568 pounds",
    choice2: "464 pounds", 
    choice3: "305 pounds",
    choice4: "68 pounds",
    answer: 2
    },
]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
   if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign("https://connect.clickandpledge.com/w/Form/8a8f1fb9-0cca-45e5-8df9-6b8f989c75df?trk=eoy19quiz");
      }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    explanation.innerText = currentQuestion.explanation;
    questionImage.innerHTML = currentQuestion.questionImage;

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
        const correctAnswer = currentQuestion.answer;

        console.log(choices, choices[correctAnswer-1].parentElement);
        console.log(correctAnswer);
        
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }

            if (classToApply === "incorrect") {
                choices[correctAnswer-1].parentElement.classList.add("correct");
            }

            console.log(questionImage.innerText);
          

        selectedChoice.parentElement.classList.add(classToApply);
        explanation.classList.remove("correct-answer-hidden");
        explanation.classList.add("correct-answer-showing");

        setTimeout( () => {
           //selectedChoice.parentElement.classList.remove(classToApply);
           //choices[correctAnswer-1].parentElement.classList.remove("correct");
           //explanation.classList.remove("correct-answer-showing");
           //explanation.classList.add("correct-answer-hidden");
            //getNewQuestion();
        }, 2000)

        
    });
});

nextquestion.addEventListener("click", e => {
    getNewQuestion();

    explanation.classList.remove("correct-answer-showing");
    explanation.classList.add("correct-answer-hidden");
        
    for (var i = 0; i < choices.length; i++) {
            choices[i].parentElement.classList.remove("correct", "incorrect");
        }
    
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();


