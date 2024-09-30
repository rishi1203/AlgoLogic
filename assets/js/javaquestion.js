const quizData = [
  {
    question: "1. What is the time complexity of inserting an element into the middle of an ArrayList in Java?",
    options: ["O(1)" , "O(n)" ,  "O(log n)", "O(n^2)" ],
    answer: "O(n)",
  },
  {
    question: "2. Which data structure in Java follows the Last In, First Out (LIFO) principle? ",
    options: ["Queue", "Stack", "Linked List", "Array"],
    answer: "Stack",
  },
  {
    question: "3. Which sorting algorithm has the best time complexity in the worst-case scenario? ",
    options: ["Bubble Sort","Insertion Sort","Quick Sort","Merge Sort"],
    answer: "Merge Sort",
  },
  {
    question: "4. What is the main advantage of using a HashMap over a TreeMap in Java? ",
    options: ["HashMap maintains elements in sorted order","HashMap allows null keys and values","HashMap guarantees constant-time performance for basic operations","HashMap implements the Comparable interface for sorting"],
    answer: "HashMap allows null keys and values",
  },
  {
    question: "5. Which of the following data structures uses a dynamic array to store elements and provides constant-time access to elements based on an index?",
    options: ["Linked List","ArrayDeque","HashSet","PriorityQueue"],
    answer: "ArrayDeque",
  },
  {
    question: "6. What is the worst-case time complexity of the binary search algorithm?",
    options: ["O(1)","O(log n)","O(n)","O(n^2)"],
    answer: "O(log n)",
  },
  {
    question: "7. Which Java collection class is specifically designed for implementing a FIFO (First In, First Out) data structure?",
    options: ["TreeSet","LinkedList","PriorityQueue","ArrayDeque"],
    answer: "ArrayDeque",
  },
  {
    question: "8. In Java, which sorting algorithm is used by the Arrays.sort() method for sorting primitive data types?",
    options: ["Quick Sort","Merge Sort","Bubble Sort","Insertion Sort"],
    answer: "Quick Sort",
  },
  {
    question: "9. Which of the following data structures is typically used to implement a priority queue?",
    options: ["Array","LinkedList","Heap","TreeMap"],
    answer: "Heap",
  },
  {
    question: "10. What is the time complexity of adding an element to a TreeSet in Java?",
    options: ["O(1)","O(log n)","O(n)","O(n log n)"],
    answer: "O(log n)",
  },
  {
    question: "11. Which of the following statements about a doubly linked list is true?",
    options: ["It requires less memory than a singly linked list","It can only be traversed in one direction","It allows for constant-time insertion and deletion at both ends","It does not allow for backward traversal"],
    answer: "It can only be traversed in one direction",
  },
  {
    question: "12. Which sorting algorithm is known for its ability to efficiently sort nearly sorted arrays or lists?",
    options: ["Quick Sort","Bubble Sort", "Insertion Sort", "Merge Sort"],
    answer: "Insertion Sort",
  },
  {
    question: "13. What is the time complexity of finding an element in a HashSet in Java?",
    options: ["O(1)", "O(log n)","O(n)","O(n log n)"],
    answer: "O(1)",
  },
  {
    question: "14. Which of the following data structures does NOT implement the List interface in Java?",
    options: ["ArrayList","LinkedList","HashSet","Vector"],
    answer: "HashSet",
  },
  {
    question: "15. In Java, what is the default initial capacity of an ArrayList?",
    options: [5, 10, 16,20],
    answer: 16,
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

