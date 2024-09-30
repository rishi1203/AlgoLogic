const quizData = [
  {
    question: "1. Which data structure in Python follows the First In, First Out (FIFO) principle?",
    options: ["Stack" ,"Queue" ,"Set" , "Dictionary"],
    answer: "Queue" ,
  },
  {
    question: "2. What is the time complexity of searching for an element in a dictionary (dict) in Python?",
    options: ["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: "O(1)",
  },
  {
    question: "3. Which sorting algorithm is implemented by the built-in function 'sorted()' in Python?",
    options: ["Quick Sort","Merge Sort","Bubble Sort","Insertion Sort"],
    answer: "Merge Sort",
  },
  {
    question: "4. Which data structure in Python allows duplicate elements but does not maintain the order of insertion?",
    options: ["List","Tuple","Set" , "Dictionary"],
    answer: "Set",
  },
  {
    question: "5. What is the time complexity of appending an element to a list (list) in Python?",
    options: ["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: "O(1)",
  },
  {
    question: "6. Which data structure in Python is mutable?",
    options: ["List","Tuple", "Set","Dictionary"],
    answer: "List",
  },
  {
    question: "7. In Python, which sorting algorithm is used by the list.sort() method?",
    options: ["Quick Sort","Merge Sort","Bubble Sort","Insertion Sort"],
    answer: "Quick Sort",
  },
  {
    question: "8. Which data structure is typically used to implement a priority queue in Python?",
    options: ["List","Tuple","Set","Heap"],
    answer: "Heap",
  },
  {
    question: "9. What is the time complexity of searching for an element in a set in Python?",
    options: ["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: "O(1)",
  },
  {
    question: "10. Which of the following statements about tuples in Python is true?",
    options: ["Tuples are mutable","Tuples allow duplicate elements","Tuples can be used as keys in dictionaries","Tuples have a sort() method for sorting elements"],
    answer: "Tuples can be used as keys in dictionaries",
  },
  {
    question: "11. Which data structure in Python is implemented using a hash table?",
    options: ["List","Tuple", "Set","Dictionary"],
    answer: "Dictionary",
  },
  {
    question: "12. What is the time complexity of removing an element from a dictionary (dict) in Python?",
    options: ["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: "O(1)",
  },
  {
    question: "13. In Python, which data structure is ordered and indexed?",
    options: ["List","Tuple", "Set","Dictionary"],
    answer: "List",
  },
  {
    question: "14. Which sorting algorithm has the worst-case time complexity of O(n^2) in Python?",
    options: ["Quick Sort" , "Merge Sort","Bubble Sort","Insertion Sort"],
    answer: "Bubble Sort",
  },
  {
    question: "15. What is the time complexity of accessing an element by index in a list (list) in Python?",
    options: ["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: "O(1)",
  }
];


const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();

