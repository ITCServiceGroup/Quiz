/************************************
  quiz.js
************************************/

(function() { // Encapsulate to prevent global scope pollution
  let selectedQuizType = '';
  let quizQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];
  let timerInterval = null;
  let startTime = 0;
  const totalTime = 28 * 60; // 28 minutes in seconds

  // Reference the Supabase client from the global window object
  const supabase = window.supabase;
  if (!supabase) {
    console.error('Supabase client is not initialized.');
    alert('Supabase client failed to initialize. Please try again later.');
    return;
  }

  // Utility function to shuffle an array in place
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Utility function to choose n random items from an array (without repetition)
  function chooseRandomQuestions(arr, n) {
    const copy = arr.slice();
    shuffleArray(copy);
    return copy.slice(0, n);
  }

  // Function to shuffle options for a question and update correctAnswerIndex/Indices
  function shuffleOptions(question) {
    if (question.type === 'true_false') {
      return;
    }
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

  // Listen for DOM load
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ldap-field').style.display = 'block';
    document.getElementById('ldap-next-button').addEventListener('click', handleLdapNext);
    document.getElementById('ldap-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleLdapNext();
    });
  });

  function handleLdapNext() {
    const ldapInput = document.getElementById('ldap-input').value.trim().toLowerCase();
      if (!ldapInput) {
      document.getElementById('ldap-error').style.display = 'block';
      return;
    }
    document.getElementById('ldap-error').style.display = 'none';
    
    // Capture the additional fields
    const supervisor = document.getElementById('supervisor-select').value;
    const market = document.getElementById('market-select').value;
    
    // Save user data for later use
    userData = { ldap: ldapInput, supervisor: supervisor, market: market };
    
    // Hide the input page and start the quiz immediately
    document.getElementById('ldap-field').style.display = 'none';
    
    // (If there is a question count selection section, hide it)
    const qcElem = document.getElementById('question-count-selection');
    if (qcElem) {
      qcElem.style.display = 'none';
    }
    
    // Start the quiz
    startQuiz();
  }

  function startQuiz() {
    // Set quiz type to the constant value.
    selectedQuizType = "Advanced Service Tech Quiz";

    // Build the quiz by pulling 5 easy, 15 medium, and 5 hard questions.
    const easyQuestions = window.questionBank.slice(0, 15);
    const mediumQuestions = window.questionBank.slice(15, 40);
    const hardQuestions = window.questionBank.slice(40, 50);
    
    const chosenEasy = chooseRandomQuestions(easyQuestions, 5);
    const chosenMedium = chooseRandomQuestions(mediumQuestions, 15);
    const chosenHard = chooseRandomQuestions(hardQuestions, 5);
    
    // Combine and shuffle the selected questions.
    quizQuestions = chosenEasy.concat(chosenMedium, chosenHard);
    shuffleArray(quizQuestions);
    
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    // Hide any difficulty selection (if present) and show quiz content.
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('progress-bar-container').style.display = 'block';
    
    // Initialize the Next button event listener.
    const nextButton = document.getElementById('next-button');
    nextButton.replaceWith(nextButton.cloneNode(true));
    document.getElementById('next-button').addEventListener('click', handleNextButton);
    
    // Initialize and start the timer.
    startTime = Date.now();
    startTimer(totalTime);
    
    // (Optional) Create a timer display element if not present.
    let timerElem = document.getElementById('timer');
    if (!timerElem) {
      timerElem = document.createElement('div');
      timerElem.id = 'timer';
      // Place the timer at the top of the quiz-content.
      const quizContent = document.getElementById('quiz-content');
      quizContent.insertAdjacentElement('afterbegin', timerElem);
    }
    
    updateTimerDisplay(totalTime);
    
    displayQuestion(currentQuestionIndex);
  }

  function startTimer(duration) {
    let timeRemaining = duration;
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay(timeRemaining);
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endQuizDueToTimeout();
      }
    }, 1000);
  }

  function updateTimerDisplay(seconds) {
    const timerElem = document.getElementById('timer');
    if (timerElem) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      timerElem.textContent = `Time Remaining: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }

  // Called when time runs out.
  function endQuizDueToTimeout() {
    // For any unanswered questions, mark them as incorrect.
    for (let i = currentQuestionIndex; i < quizQuestions.length; i++) {
      const question = quizQuestions[i];
      if (question.type === 'check_all_that_apply') {
        userAnswers.push({
          question: question.question,
          type: question.type,
          selected: [],
          correct: question.correctAnswerIndices,
          explanation: question.explanation,
          options: question.options,
          isCorrect: false
        });
      } else {
        userAnswers.push({
          question: question.question,
          type: question.type,
          selected: null,
          correct: question.correctAnswerIndex,
          explanation: question.explanation,
          options: question.options,
          isCorrect: false
        });
      }
    }
    // End the quiz and show the summary.
    showFinalScore();
  }

  function displayQuestion(index) {
    console.log(`Displaying question ${index + 1}`);
    const question = quizQuestions[index];
    document.getElementById('question-number').textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    const questionTypeElement = document.getElementById('question-type');
    questionTypeElement.textContent = `Type: ${formatQuestionType(question.type)}`;
    console.log(`Set question type text: ${questionTypeElement.textContent}`);
    document.getElementById('question-text').textContent = question.question;
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';
    question.userSelectedAnswerIndices = question.userSelectedAnswerIndices || [];
    question.userSelectedAnswerIndex = question.userSelectedAnswerIndex || null;
    const nextButton = document.getElementById('next-button');
    nextButton.disabled = true;
    nextButton.textContent = (index === quizQuestions.length - 1) ? 'Submit' : 'Next';
    
    if (question.type === 'true_false') {
      renderTrueFalseOptions(question, optionsList);
    } else if (question.type === 'multiple_choice') {
      renderMultipleChoiceOptions(question, optionsList);
    } else if (question.type === 'check_all_that_apply') {
      renderCheckAllThatApplyOptions(question, optionsList);
    }
    
    const progressPercentage = ((index + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
  }

  function renderTrueFalseOptions(question, optionsList) {
    const trueButton = createOptionButton(question, 0, 'True');
    const falseButton = createOptionButton(question, 1, 'False');
    optionsList.appendChild(trueButton);
    optionsList.appendChild(falseButton);
  }

  function renderMultipleChoiceOptions(question, optionsList) {
    question.options.forEach((option, optionIndex) => {
      const optionButton = createOptionButton(question, optionIndex, option);
      optionsList.appendChild(optionButton);
    });
  }

  function renderCheckAllThatApplyOptions(question, optionsList) {
    question.options.forEach((option, optionIndex) => {
      const optionButton = createOptionButton(question, optionIndex, option, true);
      optionsList.appendChild(optionButton);
    });
  }

  function createOptionButton(question, index, text, isCheckbox = false) {
    const button = document.createElement('button');
    button.classList.add('option-button');
    button.textContent = text;
    button.dataset.optionIndex = index;
    if (question.type === 'check_all_that_apply') {
      if (question.userSelectedAnswerIndices.includes(index)) {
        button.classList.add('selected-answer');
      }
    } else {
      if (question.userSelectedAnswerIndex === index) {
        button.classList.add('selected-answer');
      }
    }
    button.setAttribute('aria-label', `Option ${index + 1}: ${text}`);
    button.addEventListener('click', () => handleOptionClick(question, button));
    return button;
  }

  // --- Modified: Allow changing answer until Next is pressed ---
  function handleOptionClick(question, button) {
    const selectedIndex = parseInt(button.dataset.optionIndex);
    if (question.type === 'multiple_choice' || question.type === 'true_false') {
      // Remove selected class from all buttons (do not disable them)
      const allButtons = document.querySelectorAll('#options-list .option-button');
      allButtons.forEach(btn => {
        btn.classList.remove('selected-answer');
      });
      // Select the clicked button
      button.classList.add('selected-answer');
      question.userSelectedAnswerIndex = selectedIndex;
      question.userSelectedAnswerIndices = [];
      // Enable Next button; user may change selection as desired
      document.getElementById('next-button').disabled = false;
    } else if (question.type === 'check_all_that_apply') {
      if (button.classList.contains('selected-answer')) {
        button.classList.remove('selected-answer');
        const idx = question.userSelectedAnswerIndices.indexOf(selectedIndex);
        if (idx > -1) {
          question.userSelectedAnswerIndices.splice(idx, 1);
        }
      } else {
        button.classList.add('selected-answer');
        question.userSelectedAnswerIndices.push(selectedIndex);
      }
      document.getElementById('next-button').disabled = (question.userSelectedAnswerIndices.length === 0);
    }
  }
  // --- End Modification ---

  function handleNextButton() {
    const question = quizQuestions[currentQuestionIndex];
    if (!question) {
      showFinalScore();
      return;
    }
    if (question.type === 'check_all_that_apply') {
      const selected = question.userSelectedAnswerIndices;
      const correct = question.correctAnswerIndices;
      const isCorrect = arraysEqual(selected.sort(), correct.sort());
      if (isCorrect) {
        score++;
      }
      userAnswers.push({
        question: question.question,
        type: question.type,
        selected: selected,
        correct: correct,
        explanation: question.explanation,
        options: question.options,
        isCorrect: isCorrect
      });
    } else {
      const selected = question.userSelectedAnswerIndex;
      const correct = question.correctAnswerIndex;
      const isCorrect = selected === correct;
      if (isCorrect) {
        score++;
      }
      userAnswers.push({
        question: question.question,
        type: question.type,
        selected: selected,
        correct: correct,
        explanation: question.explanation,
        options: question.options,
        isCorrect: isCorrect
      });
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion(currentQuestionIndex);
    } else {
      endTimer();
      showFinalScore();
    }
  }

  function endTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  }

  function showFinalScore() {
    // Compute time taken in seconds
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const percentage = ((score / quizQuestions.length) * 100).toFixed(2);
    const ldap = userData.ldap;
    const supervisor = userData.supervisor;
    const market = userData.market;
    const quizContainer = document.getElementById('quiz-container');
    const textScore = `${score}/${quizQuestions.length} (${percentage}%)`;
    const numericScore = parseFloat((score / quizQuestions.length).toFixed(2));
  
    saveQuizResultToSupabase(ldap, selectedQuizType, textScore, numericScore, supervisor, market, timeTaken)
      .then(() => {
        buildSummaryHTML(ldap, textScore, numericScore, timeTaken);
      })
      .catch(() => {
        buildSummaryHTML(ldap, textScore, numericScore, timeTaken);
      });
  }

  async function saveQuizResultToSupabase(ldap, quizType, scoreText, scoreValue, supervisor, market, timeTaken) {
    console.log("Attempting to save quiz result to Supabase...");
    console.log("Data:", { ldap, quizType, scoreText, scoreValue, supervisor, market, timeTaken });
    try {
      const { data, error } = await supabase
        .from('Quiz Results')
        .insert([
          {
            ldap: ldap,
            quiz_type: quizType,
            score_text: scoreText,
            score_value: scoreValue,
            supervisor: supervisor,
            market: market,
            time_taken: timeTaken
          }
        ]);
      if (error) {
        console.error('Supabase insert error:', error);
        alert('Failed to save quiz result to Supabase.');
        throw error;
      } else {
        console.log('Supabase insert success:', data);
      }
    } catch (err) {
      console.error('Error saving to Supabase:', err);
      alert('Error saving to Supabase.');
      throw err;
    }
  }

  function buildSummaryHTML(ldap, textScore, numericScore, timeTaken) {
    const percentage = ((numericScore) * 100).toFixed(2);
    const quizContainer = document.getElementById('quiz-container');
    let summaryHTML = `
      <div id="pdf-content">
        <div style="margin-bottom: 20px;">
          <h2 style="margin-bottom: 5px;">Score: ${score}/${quizQuestions.length} (${percentage}%)</h2>
          <h3 style="margin: 0;">LDAP: ${ldap}</h3>
          <p style="margin: 0;">Time Taken: ${timeTaken} seconds</p>
        </div>
        <div id="summary"><h2>Detailed Summary:</h2><ul>
    `;
    userAnswers.forEach((answer, index) => {
      let userAnswerText = '';
      let correctAnswerText = '';
      if (answer.type === 'check_all_that_apply') {
        userAnswerText = answer.selected.length > 0
          ? answer.selected.map(idx => answer.options[idx]).join(', ')
          : 'No answer selected';
        correctAnswerText = answer.correct.map(idx => answer.options[idx]).join(', ');
      } else {
        userAnswerText = answer.options[answer.selected] || 'No answer selected';
        correctAnswerText = answer.options[answer.correct];
      }
      summaryHTML += `
        <li class="summary-item">
          <div class="question-block">
            <p class="question-text">Question ${index + 1}: ${answer.question}</p>
            <p class="question-type">Type: ${formatQuestionType(answer.type)}</p>
            <p class="${answer.isCorrect ? 'correct' : 'incorrect'}">Your Answer: ${userAnswerText}</p>
            ${!answer.isCorrect ? `<p class="correct">Correct Answer: ${correctAnswerText}</p>` : ''}
            <p class="explanation">Explanation: ${answer.explanation}</p>
          </div>
        </li>`;
    });
    summaryHTML += `
        </ul></div>
      </div>
      <button id="download-pdf-button">Download PDF</button>
      <button id="restart-button">Restart Quiz</button>
    `;
    quizContainer.innerHTML = summaryHTML;
    document.getElementById('download-pdf-button').addEventListener('click', () => {
      const element = document.getElementById('pdf-content');
      const opt = {
        margin: [10, 15, 10, 15],
        filename: `quiz-results-${ldap}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'avoid-all'], avoid: '.question-block' }
      };
      const clone = element.cloneNode(true);
      document.body.appendChild(clone);
      html2pdf().set(opt).from(clone).save().then(() => {
        document.body.removeChild(clone);
      });
    });
    document.getElementById('restart-button').addEventListener('click', () => location.reload());
  }

  function formatQuestionType(type) {
    switch (type) {
      case 'multiple_choice':
        return 'Multiple Choice';
      case 'true_false':
        return 'True/False';
      case 'check_all_that_apply':
        return 'Check All That Apply';
      default:
        return 'Unknown Type';
    }
  }

  function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
  }

  function updateProgressBar(index) {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) {
      console.error('Progress bar element not found!');
      return;
    }
    if (quizQuestions.length === 0) {
      console.warn('No quiz questions available to calculate progress.');
      return;
    }
    const progress = ((index + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.style.transition = 'width 0.5s ease-in-out';
    console.log(`Progress updated: ${progress}%`);
  }
})();