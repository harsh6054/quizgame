const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language"
      ],
      answer: 0
    },
    {
      question: "Which tag is used for JavaScript in HTML?",
      options: ["<js>", "<javascript>", "<script>", "<code>"],
      answer: 2
    },
    {
      question: "Which property changes background in CSS?",
      options: ["bgcolor", "color", "backgroundColor", "background"],
      answer: 3
    },
    {
      question: "Which element is used for CSS in HTML?",
      options: ["<css>", "<style>", "<script>", "<design>"],
      answer: 1
    },
    {
      question: "Method to parse JSON in JS?",
      options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "convert.JSON()"],
      answer: 0
    },
    {
      question: "Comment syntax in JavaScript?",
      options: ["<!-- -->", "//", "#", "/* */"],
      answer: 1
    },
    {
      question: "A JavaScript framework?",
      options: ["Laravel", "React", "Django", "Bootstrap"],
      answer: 1
    },
    {
      question: "Correct JavaScript variable?",
      options: ["int a = 10;", "var a = 10;", "dim a = 10;", "a := 10;"],
      answer: 1
    },
    {
      question: "Tag for line break in HTML?",
      options: ["<lb>", "<br>", "<break>", "<line>"],
      answer: 1
    },
    {
      question: "Full form of CSS?",
      options: [
        "Cascading Style Sheets",
        "Creative Style System",
        "Computer Style Sheet",
        "Colorful Style Syntax"
      ],
      answer: 0
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const resultEl = document.getElementById("result");
  const scoreEl = document.getElementById("score");
  const timeDisplay = document.getElementById("time");
  const progressBar = document.getElementById("progress-bar");
  
  const correctSound = document.getElementById("correct-sound");
  const wrongSound = document.getElementById("wrong-sound");
  const clickSound = document.getElementById("click-sound");
  
  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add("hide");
    document.getElementById("quiz").classList.remove("hide");
    showQuestion();
  }
  
  function showQuestion() {
    resetTimer();
    const q = questions[currentQuestion];
    questionEl.textContent = `Q${currentQuestion + 1}: ${q.question}`;
    optionsEl.innerHTML = "";
    progressBar.style.width = ((currentQuestion) / questions.length) * 100 + "%";
  
    q.options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => selectAnswer(index);
      optionsEl.appendChild(btn);
    });
  
    nextBtn.style.display = "none";
    startTimer();
  }
  
  function selectAnswer(index) {
    clearInterval(timer);
    const correct = questions[currentQuestion].answer;
    const buttons = optionsEl.querySelectorAll("button");
  
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct) {
        btn.classList.add("correct");
      }
      if (i === index && i !== correct) {
        btn.classList.add("wrong");
      }
    });
  
    if (index === correct) {
      correctSound?.play();
      score++;
    } else {
      wrongSound?.play();
    }
  
    nextBtn.style.display = "inline-block";
  }
  
  function startTimer() {
    timeLeft = 15;
    timeDisplay.textContent = timeLeft;
  
    timer = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(timer);
        selectAnswer(-1); // auto wrong
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timer);
    timeDisplay.textContent = 15;
  }
  
  nextBtn.addEventListener("click", () => {
    clickSound?.play();
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  
  function showResult() {
    document.getElementById("quiz").classList.add("hide");
    resultEl.classList.remove("hide");
    scoreEl.textContent = `${score} / ${questions.length}`;
    progressBar.style.width = "100%";
  }
  
  window.onload = startQuiz;
  