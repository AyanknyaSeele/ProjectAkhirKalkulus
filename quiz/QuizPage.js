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
      question: "Fungsi pertidaksamaan dalam matematika adalah untuk menunjukkan perbandingan?",
      options: ["Memetakan satu bilangan riil di domain ke satu bilangan riil lain di kodomain", 
                "Untuk menghitung jarak", 
                "Konsep suatu fungsi hanya mendekati nilai tertentu, tetapi tidak benar-benar berada pada nilai tersebut", 
                "Untuk menunjukkan perbandingan ukuran dua objek atau lebih"],
      correct: 3
  },
  {
      question: "Hasil pertidaksamaan Linear dari 5x - 10  > 5?",
      options: ["x > -3", 
                "x > 2", 
                "x > 3", 
                "x > -2"],
      correct: 0
  },
  {
      question: "Berapakah hasil dari pertidaksamaan linear 2x – 1 > 3?",
      options: ["x > -2", 
                "x > 2", 
                "x > 5", 
                "x > -1"],
      correct: 1
  },
  {
      question: "Berapakah himpunan penyelesaian dari pertidaksamaan kuadrat ini 2x - 3x – 5 >= 0?",
      options: ["x ≤ -5", 
                "x ≥ 1", 
                "x ≤ -6", 
                "x ≥ 6"],
      correct: 0
  },
  {
    question: "Berapakah hasil dari 6x - 9x + 12 > 3?",
    options: ["x > -6", 
              "x < 3", 
              "x < -9", 
              "x > 6"],
    correct: 1
  },
  {
    question: "Berapakah penyelesaian dari pertidaksamaan pecahan (x + 2) / (x - 1) > 0?",
    options: ["{x| < 2 atau x > -1}", 
              "{x| < 2 atau x > 1}", 
              "{x| < -2 atau x > -1}", 
              "{x| < -2 atau x > 1}"],
    correct: 3
  },
  {
    question: "Selesaikan pecahan berikut x + 5 / x - 3 ≤ 0?",
    options: ["x ∈ (-5 , 3]", 
              "x ∈ [-5 , 3)", 
              "x ∈ [3 , -5]", 
              "x ∈ (-5 , -3)"],
    correct: 1
  },
  {
    question: "Himpunan penyelesaian dari pertidaksamaan √x-4 - 2 < 0 adalah ?",
    options: ["{x| 4 ≤ x < 8}", 
              "{x| 2 < x < 8}", 
              "{x| 4 ≤ x < 12}", 
              "{x| 0 ≤ x < 8}"],
    correct: 0
  },
  {
    question: "Himpunan penyelesaian dari pertidaksamaan √1x + 2 < 0 adalah ?",
    options: ["x < 3", 
              "x ≤ 3", 
              "x > 3", 
              "Tidak ada jawaban yang benar"],
    correct: 3
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

function timeOut() {
  Swal.fire({
    title: "Waktu Habis",
    text: "Anda Akan Masuk Ke Halaman Score",
    icon: "info",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Lihat Skor",
  }).then(() => {
    showResults()
  });
}


function startTimer() {
  timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Time: ${timeLeft}s`;
      if (timeLeft <= 0) {
          clearInterval(timer);
          checkAnswer();
          timeOut();
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