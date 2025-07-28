const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false }
    ]
  },
  {
    question: "Who wrote Hamlet?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Leo Tolstoy", correct: false },
      { text: "Mark Twain", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;
let score = 0;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  nextBtn.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const question = questions[currentIndex];
  questionElement.innerText = question.question;

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer.correct, button));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(correct, selectedButton) {
  const buttons = answerButtons.children;
  for (let btn of buttons) {
    btn.disabled = true;
    if (btn.innerText === selectedButton.innerText) {
      btn.classList.add(correct ? "correct" : "wrong");
    } else if (questions[currentIndex].answers.find(a => a.text === btn.innerText && a.correct)) {
      btn.classList.add("correct");
    }
  }
  if (correct) score++;
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerText = "Play Again";
  nextBtn.style.display = "block";
  nextBtn.addEventListener("click", startQuiz);
}

startQuiz();
