const quizData = [
  {
      question: "Apa saja jenis pertidaksamaan? ",
      options: ["Linear, Himpunan, Logaritma & Turunan", 
                "Grafik, Limit, Kuadrat & Rasional",
                "Pecahan, Linear, Kuadrat & Irasional", 
                "Irasional, Linear, Turunan & Logaritma"],
      correct: 2
  },
  {
      question: "Apa simbol pertidaksamaan?",
      options: [">", 
                "≤", 
                "=", 
                "≠"],
      correct: 1
  },
  {
      question: "Apa himpunan dari -9x + 18 < 0?",
      options: ["HP = {x| x > 2, x ϵ R }", 
                "HP = {x| x ≥ 2, x ϵ R }", 
                "HP = {x| x > -2, x ϵ R }", 
                "HP = {x| x ≥ -2, x ϵ R }"],
      correct: 2
  },
  {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correct: 3
  },
  {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Silver", "Oxygen", "Iron"],
      correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 300;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const progressBar = document.querySelector('.progress-bar');
const quizContainer = document.getElementById('quiz');

function loadQuestion() {
  const question = quizData[currentQuestion];
  questionEl.textContent = question.question;
  optionsEl.innerHTML = '';
  question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option');
      button.addEventListener('click', () => selectOption(button, index));
      optionsEl.appendChild(button);
  });
  nextBtn.style.display = 'none';
  timeLeft = 300;
  if (timer) clearInterval(timer);
  startTimer();
  updateProgress();
}

function selectOption(selectedButton, optionIndex) {
  const buttons = optionsEl.getElementsByClassName('option');
  Array.from(buttons).forEach(button => button.classList.remove('selected'));
  selectedButton.classList.add('selected');
  nextBtn.style.display = 'block';
}

function startTimer() {
  timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Time: ${timeLeft}s`;
      if (timeLeft === 0) {
          clearInterval(timer);
          checkAnswer();
      }
  }, 1000);
}

function checkAnswer() {
  const selectedOption = document.querySelector('.option.selected');
  if (!selectedOption) return;

  const selectedAnswer = Array.from(optionsEl.children).indexOf(selectedOption);
  const question = quizData[currentQuestion];

  if (selectedAnswer === question.correct) {
      score++;
      selectedOption.classList.add('correct');
  } else {
      selectedOption.classList.add('incorrect');
      optionsEl.children[question.correct].classList.add('correct');
  }

  Array.from(optionsEl.children).forEach(button => button.disabled = true);
  clearInterval(timer);
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute('aria-valuenow', progress);
}

function showResults() {
  quizContainer.innerHTML = `
              <div class="results">
                  <div class="result-icon">
                      <i class="fas ${score > quizData.length / 2 ? 'fa-trophy text-success' : 'fa-times-circle text-danger'}"></i>
                  </div>
                  <div class="score">Your score: ${score}/${quizData.length}</div>
                  <p>${score > quizData.length / 2 ? 'Selamat!' : 'Better luck next time!'}</p>
                  <button class="btn btn-primary" onclick="location.reload()">Restart Quiz</button>
              </div>
          `;
}

nextBtn.addEventListener('click', () => {
  checkAnswer();
  currentQuestion++;
  if (currentQuestion < quizData.length) {
      loadQuestion();
  } else {
      showResults();
  }
});

loadQuestion();