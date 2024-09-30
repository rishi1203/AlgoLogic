const quizData = [
  {
    question: "1. What is the time complexity of searching for an element in a sorted array using binary search in C++?",
    options: ["O(1)","O(log n)","O(n)","O(n^2)"],
    answer: 1,
  },
  {
    question: "2. Which data structure in C++ follows the Last In, First Out (LIFO) principle?",
    options: ["Queue","Stack","Linked List","Array"],
    answer: 1,
  },
  {
    question: "3. What is the time complexity of inserting an element into the middle of a vector in C++?",
    options: ["O(1)","O(n)","O(log n)","O(n^2)"],
    answer: 1,
  },
  {
    question: "4. Which sorting algorithm is implemented by the 'std::sort()' function in C++?",
    options: ["Quick Sort","Merge Sort","Bubble Sort","Insertion Sort"],
    answer: 0,
  },
  {
    question: "5. Which of the following data structures in C++ is implemented as a double-ended queue?",
    options: ["vector","list","deque","map"],
    answer: 2,
  },
  {
    question: "6. What is the time complexity of appending an element to a vector in C++?",
    options: ["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: 0,
  },
  {
    question: "7. In C++, which data structure is typically used to implement a priority queue?",
    options: ["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: 3,
  },
  {
    question: "8. Which of the following data structures in C++ uses a hash table for storing elements?",
    options: ["vector","list","set","map"],
    answer: 2,
  },
  {
    question: "9. What is the time complexity of removing an element from the end of a vector in C++?",
    options:["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: 0,
  },
  {
    question: "10. Which sorting algorithm is known for its stability in C++?",
    options: ["Quick Sort","Merge Sort", "Bubble Sort","Insertion Sort"],
    answer: 1,
  },
  {
    question: "11. Which of the following data structures in C++ allows for constant-time insertion and deletion at both ends?",
    options: ["vector","list","deque","stack"],
    answer: 2,
  },
  {
    question: "12. What is the time complexity of searching for an element in a set in C++?",
    options: ["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: 1,
  },
  {
    question: "13. Which of the following statements about the map container in C++ is true?",
    options: ["It does not allow duplicate keys", "It is implemented using a dynamic array", "It does not allow constant-time access to elements by key" , "It does not allow iterating over its elements"],
    answer: 0,
  },
  {
    question: "14. What is the time complexity of removing an element from the front of a deque in C++?",
    options: ["O(1)" , "O(log n)" , "O(n)", "O(n log n)"],
    answer: 0,
  },
  {
    question: "15. In C++, what is the time complexity of finding an element in a map?",
    options: ["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: 1,
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

