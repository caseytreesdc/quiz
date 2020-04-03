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
    questionImage: "<img src='images/morton_and_caroline.jpg' width='100%'>",
    question: "To what state did Julius Sterling Morton and his wife Caroline Joy French move to where he even briefly served as Acting Governor?",
    explanation: "They were shocked by the lack of trees to help build and heat their home, as well as the lack of fruit and ornamental trees that provided entertainment and beauty. Photo Courtesy of NE State Historical Society",
    choice1: "South Dakota",
    choice2: "Nebraska", 
    choice3: "Iowa",
    choice4: "Kansas",
    answer: 2
    },
    {
    questionImage: "<img src='images/scarletoak.png' width='100%'>",
    question: "In what year did Morton propose a resolution where his entire state would set aside one day in which they would plant trees?",
    explanation: "Birdsey Northrop of Connecticut was responsible for globalizing the idea when he visited Japan in 1883 and delivered his Arbor Day and Village Improvement message. In that same year, the American Forestry Association made Northrop the Chairman of the committee to campaign for Arbor Day nationwide. He also brought his enthusiasm for Arbor Day to Australia, Canada, and Europe.", 
    choice1: "1872",
    choice2: "1912", 
    choice3: "1885",
    choice4: "1937",
    answer: 1, 
    },
    {
    questionImage: "<img src='images/water.png' width='100%'>",
    question: "Why was April 22 originally chosen as the official holiday for Arbor Day?",
    explanation: "Today, many countries observe such a holiday. Though usually observed in the spring, the date varies, depending on climate and suitable planting season.",
    choice1: "It’s easy to remember the number 22",
    choice2: "It was on a Saturday", 
    choice3: "It was J. Sterling Morton’s birthday",
    choice4: "State arborists suggested it",
    answer: 2
    },
    {
    questionImage: "<img src='images/sweetgum.png' width='100%'>",
    question: "By 1920, how many states and territorial possessions of the U.S. were celebrating Arbor Day?",
    explanation: "On the first Arbor Day, April 10, 1872, an estimated one million trees were planted",
    choice1: "25",
    choice2: "50", 
    choice3: "60",
    choice4: "45",
    answer: 4
    },
    {
    questionImage: "<img src='images/sweetgum.png' width='100%'>",
    question: "Which President recognized Arbor Day nationwide as part of his administration’s other environmentally friendly actions?",
    explanation: "These included establishing the EPA.",
    choice1: "Richard Nixon",
    choice2: "Dwight D. Eisenhower", 
    choice3: "Jimmy Carter",
    choice4: "Franklin D. Roosevelt",
    answer: 1
    },
]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

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

    questionImage.scrollIntoView();
    
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();


