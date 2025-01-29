// quiz.js
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyr3tWr3htAiclJwx2R5KjwrPA5eTBIvniaA3dz0ILhs2FNh3LtdDGYZqXc4f4WVuQD5g/exec"; // Replace with your actual deployment URL

let selectedQuizType = '';
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Utility functions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function shuffleOptions(question) {
  if (question.type === 'true_false') return;

  const originalOptions = [...question.options];
  shuffleArray(question.options);

  if (question.type === 'multiple_choice') {
    const correctOption = originalOptions[question.correctAnswerIndex];
    question.correctAnswerIndex = question.options.indexOf(correctOption);
  } else if (question.type === 'check_all_that_apply') {
    const correctOptions = question.correctAnswerIndices.map(idx => originalOptions[idx]);
    question.correctAnswerIndices = correctOptions.map(opt => question.options.indexOf(opt));
  }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ldap-field').style.display = 'block';
  document.getElementById('ldap-next-button').addEventListener('click', handleLdapNext);
  document.getElementById('ldap-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLdapNext();
  });
});

// Core quiz functionality
function handleLdapNext() {
  const ldapInput = document.getElementById('ldap-input').value.trim();
  if (!ldapInput) {
    document.getElementById('ldap-error').style.display = 'block';
    return;
  }
  document.getElementById('ldap-error').style.display = 'none';
  document.getElementById('ldap-field').style.display = 'none';
  document.getElementById('question-count-selection').style.display = 'block';

  document.querySelectorAll('#question-count-selection button').forEach(btn => {
    btn.addEventListener('click', () => {
      startQuiz(parseInt(btn.dataset.start), parseInt(btn.dataset.end));
    });
  });
}

function startQuiz(start, end) {
  const quizTypes = {
    '0-15': 'Easy',
    '15-40': 'Medium',
    '40-50': 'Hard'
  };
  selectedQuizType = quizTypes[`${start}-${end}`];
  
  document.getElementById('question-count-selection').style.display = 'none';
  document.getElementById('quiz-content').style.display = 'block';

  const selectedQuestions = window.questionBank.slice(start, end);
  shuffleArray(selectedQuestions);
  selectedQuestions.forEach(shuffleOptions);

  quizQuestions = selectedQuestions;
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];

  const nextButton = document.getElementById('next-button');
  nextButton.replaceWith(nextButton.cloneNode(true));
  document.getElementById('next-button').addEventListener('click', handleNextButton);

  displayQuestion(currentQuestionIndex);
}

// Question display logic
function displayQuestion(index) {
  const question = quizQuestions[index];
  document.getElementById('question-number').textContent = `Question ${index + 1} of ${quizQuestions.length}`;
  document.getElementById('question-type').textContent = `Type: ${formatQuestionType(question.type)}`;
  document.getElementById('question-text').textContent = question.question;

  const optionsList = document.getElementById('options-list');
  optionsList.innerHTML = '';
  
  question.userSelectedAnswerIndices = [];
  question.userSelectedAnswerIndex = null;

  const nextButton = document.getElementById('next-button');
  nextButton.disabled = true;
  nextButton.textContent = index === quizQuestions.length - 1 ? 'Submit' : 'Next';

  renderQuestionOptions(question, optionsList);
  updateProgressBar(index);
}

function renderQuestionOptions(question, optionsList) {
  if (question.type === 'true_false') {
    optionsList.append(
      createOptionButton(question, 0, 'True'),
      createOptionButton(question, 1, 'False')
    );
  } else {
    question.options.forEach((option, i) => {
      optionsList.appendChild(createOptionButton(
        question, 
        i, 
        option, 
        question.type === 'check_all_that_apply'
      ));
    });
  }
}

function createOptionButton(question, index, text, isCheckbox = false) {
  const button = document.createElement('button');
  button.className = 'option-button';
  button.textContent = text;
  button.dataset.optionIndex = index;

  if (question.type === 'check_all_that_apply') {
    if (question.userSelectedAnswerIndices.includes(index)) {
      button.classList.add('selected-answer');
    }
  } else if (question.userSelectedAnswerIndex === index) {
    button.classList.add('selected-answer');
  }

  button.addEventListener('click', () => handleOptionClick(question, button));
  return button;
}

// Answer handling
function handleOptionClick(question, button) {
  const selectedIndex = parseInt(button.dataset.optionIndex);
  const nextButton = document.getElementById('next-button');

  if (['multiple_choice', 'true_false'].includes(question.type)) {
    document.querySelectorAll('#options-list .option-button').forEach(btn => {
      btn.classList.remove('selected-answer');
    });
    button.classList.add('selected-answer');
    question.userSelectedAnswerIndex = selectedIndex;
    nextButton.disabled = false;
  } else {
    button.classList.toggle('selected-answer');
    const index = question.userSelectedAnswerIndices.indexOf(selectedIndex);
    if (index > -1) {
      question.userSelectedAnswerIndices.splice(index, 1);
    } else {
      question.userSelectedAnswerIndices.push(selectedIndex);
    }
    nextButton.disabled = question.userSelectedAnswerIndices.length === 0;
  }
}

// Navigation and scoring
function handleNextButton() {
  const question = quizQuestions[currentQuestionIndex];
  const isCorrect = checkAnswerCorrectness(question);
  
  if (isCorrect) score++;
  
  userAnswers.push(createAnswerObject(question, isCorrect));
  
  if (++currentQuestionIndex < quizQuestions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    showFinalScore();
  }
}

function checkAnswerCorrectness(question) {
  if (question.type === 'check_all_that_apply') {
    return arraysEqual(
      [...question.userSelectedAnswerIndices].sort(),
      [...question.correctAnswerIndices].sort()
    );
  }
  return question.userSelectedAnswerIndex === question.correctAnswerIndex;
}

function createAnswerObject(question, isCorrect) {
  return {
    question: question.question,
    type: question.type,
    selected: question.type === 'check_all_that_apply' 
      ? [...question.userSelectedAnswerIndices] 
      : question.userSelectedAnswerIndex,
    correct: question.type === 'check_all_that_apply' 
      ? [...question.correctAnswerIndices] 
      : question.correctAnswerIndex,
    options: [...question.options],
    explanation: question.explanation,
    isCorrect: isCorrect
  };
}

// Final results and submission
function showFinalScore() {
  const percentage = ((score / quizQuestions.length) * 100).toFixed(2);
  const ldap = document.getElementById('ldap-input').value.trim();
  const quizContainer = document.getElementById('quiz-container');

  submitResults(ldap, percentage);
  buildResultsSummary(ldap, percentage);
  setupPDFDownload(ldap);
  quizContainer.innerHTML = createResultsHTML(ldap, percentage);
}

function submitResults(ldap, percentage) {
  const payload = {
    ldap: ldap,
    quizType: selectedQuizType,
    score: `${score}/${quizQuestions.length}`
  };

  console.log('Submitting results:', payload);

  fetch(WEB_APP_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(handleResponse)
  .then(handleSuccess)
  .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

function handleSuccess(result) {
  console.log('Server response:', result);
  if (result.result === 'success') {
    alert('Results saved successfully!');
  } else {
    throw new Error(result.message || 'Unknown server error');
  }
}

function handleError(error) {
  console.error('Submission error:', error);
  alert(`Error saving results: ${error.message}`);
}

// Results display
function buildResultsSummary(ldap, percentage) {
  let summaryHTML = `
  <div id="pdf-content">
    <div class="score-header">
      <h2>Score: ${score}/${quizQuestions.length} (${percentage}%)</h2>
      <h3>LDAP: ${ldap}</h3>
    </div>
    <div id="summary"><h2>Detailed Summary:</h2><ul>`;

  userAnswers.forEach((answer, index) => {
    summaryHTML += createAnswerHTML(answer, index + 1);
  });

  summaryHTML += `</ul></div></div>
    <button id="download-pdf-button">Download PDF</button>
    <button id="restart-button">Restart Quiz</button>`;

  return summaryHTML;
}

function createAnswerHTML(answer, number) {
  const [userAnswer, correctAnswer] = getAnswerTexts(answer);
  return `
    <li class="summary-item">
      <div class="question-block">
        <p class="question-type">Type: ${formatQuestionType(answer.type)}</p>
        <p class="question-text">Question ${number}: ${answer.question}</p>
        <p class="${answer.isCorrect ? 'correct' : 'incorrect'}">Your Answer: ${userAnswer}</p>
        ${!answer.isCorrect ? `<p class="correct">${answer.type === 'check_all_that_apply' ? 'Correct Answers' : 'Correct Answer'}: ${correctAnswer}</p>` : ''}
        <p class="explanation">Explanation: ${answer.explanation}</p>
      </div>
    </li>`;
}

function getAnswerTexts(answer) {
  if (answer.type === 'check_all_that_apply') {
    return [
      answer.selected.length 
        ? answer.selected.map(i => answer.options[i]).join(', ') 
        : 'No answer selected',
      answer.correct.map(i => answer.options[i]).join(', ')
    ];
  }
  return [
    answer.options[answer.selected] || 'No answer selected',
    answer.options[answer.correct]
  ];
}

// PDF generation
function setupPDFDownload(ldap) {
  document.getElementById('download-pdf-button').addEventListener('click', () => {
    const element = document.getElementById('pdf-content');
    const clone = element.cloneNode(true);
    
    document.body.appendChild(clone);
    
    html2pdf().set({
      margin: [10, 15, 10, 15],
      filename: `quiz-results-${ldap}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait' 
      }
    }).from(clone).save().then(() => {
      document.body.removeChild(clone);
    });
  });
}

// Helper functions
function formatQuestionType(type) {
  const types = {
    'multiple_choice': 'Multiple Choice',
    'true_false': 'True/False',
    'check_all_that_apply': 'Check All That Apply'
  };
  return types[type] || 'Unknown Type';
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, idx) => val === b[idx]);
}

function updateProgressBar(index) {
  document.getElementById('progress-bar').style.width = 
    `${((index + 1) / quizQuestions.length) * 100}%`;
}

function createResultsHTML(ldap, percentage) {
  return `
  <div id="pdf-content">
    <div class="score-header">
      <h2>Score: ${score}/${quizQuestions.length} (${percentage}%)</h2>
      <h3>LDAP: ${ldap}</h3>
    </div>
    <div id="summary"><h2>Detailed Summary:</h2><ul>
      ${userAnswers.map((answer, i) => createAnswerHTML(answer, i + 1)).join('')}
    </ul></div>
    <button id="download-pdf-button">Download PDF</button>
    <button id="restart-button">Restart Quiz</button>
  </div>`;
}

// Restart handler
document.addEventListener('click', (e) => {
  if (e.target.id === 'restart-button') {
    location.reload();
  }
});