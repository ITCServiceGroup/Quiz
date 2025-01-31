/************************************
  quiz.js
************************************/

(function() { // Encapsulate to prevent global scope pollution
  let selectedQuizType = '';
  let quizQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];

  // Reference the Supabase client from the global window object
  const supabase = window.supabase;

  if (!supabase) {
    console.error('Supabase client is not initialized.');
    alert('Supabase client failed to initialize. Please try again later.');
    return; // Exit if Supabase is not initialized
  }

  // Utility function to shuffle an array in place
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to shuffle options for a question and update correctAnswerIndex/Indices
  function shuffleOptions(question) {
    if (question.type === 'true_false') {
      // No need to shuffle 'true_false' options
      return;
    }

    // For 'multiple_choice' and 'check_all_that_apply' questions
    const originalOptions = [...question.options];
    shuffleArray(question.options);

    if (question.type === 'multiple_choice') {
      // Find the new index of the correct answer
      const correctOption = originalOptions[question.correctAnswerIndex];
      question.correctAnswerIndex = question.options.indexOf(correctOption);
    } else if (question.type === 'check_all_that_apply') {
      // Find the new indices of the correct answers
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
    const ldapInput = document.getElementById('ldap-input').value.trim();
    if (!ldapInput) {
      document.getElementById('ldap-error').style.display = 'block';
      return;
    }
    document.getElementById('ldap-error').style.display = 'none';
    document.getElementById('ldap-field').style.display = 'none';
    document.getElementById('question-count-selection').style.display = 'block';

    const countButtons = document.querySelectorAll('#question-count-selection button');
    countButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const start = parseInt(btn.dataset.start);
        const end = parseInt(btn.dataset.end);
        startQuiz(start, end);
      });
    });
  }

  function startQuiz(start, end) {
    // Determine quiz type based on start and end
    if (start === 0 && end === 15) {
      selectedQuizType = 'Easy';
    } else if (start === 15 && end === 40) {
      selectedQuizType = 'Medium';
    } else if (start === 40 && end === 50) {
      selectedQuizType = 'Hard';
    }

    // Hide the question count selection and show quiz content
    document.getElementById('question-count-selection').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';

    // **Show the Progress Bar**
    document.getElementById('progress-bar-container').style.display = 'block';

    // Select the subset of questions
    const selectedQuestions = window.questionBank.slice(start, end);

    // Shuffle the selected questions
    shuffleArray(selectedQuestions);

    // Shuffle options for each question
    selectedQuestions.forEach(question => {
      shuffleOptions(question);
    });

    quizQuestions = selectedQuestions;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

    // Remove existing event listeners on the "next-button"
    const nextButton = document.getElementById('next-button');
    nextButton.replaceWith(nextButton.cloneNode(true));
    document.getElementById('next-button').addEventListener('click', handleNextButton);

    // **Update Progress Bar to 0% at Start**
    document.getElementById('progress-bar').style.width = `0%`;

    displayQuestion(currentQuestionIndex);
  }

  function displayQuestion(index) {
    console.log(`Displaying question ${index + 1}`);

    const question = quizQuestions[index];
    document.getElementById('question-number').textContent = `Question ${index + 1} of ${quizQuestions.length}`;

    const questionTypeElement = document.getElementById('question-type');

    // **Directly update the text content without any transition classes**
    questionTypeElement.textContent = `Type: ${formatQuestionType(question.type)}`;
    console.log(`Set question type text: ${questionTypeElement.textContent}`);

    // **Update Question Text**
    document.getElementById('question-text').textContent = question.question;

    // **Render Options**
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';

    // Clear any previous selections
    question.userSelectedAnswerIndices = question.userSelectedAnswerIndices || [];
    question.userSelectedAnswerIndex = question.userSelectedAnswerIndex || null;

    // Reset action buttons
    const nextButton = document.getElementById('next-button');
    nextButton.disabled = true;

    // Change button text to "Submit" if it's the last question
    if (index === quizQuestions.length - 1) {
      nextButton.textContent = 'Submit';
    } else {
      nextButton.textContent = 'Next';
    }

    // Render options based on question type
    if (question.type === 'true_false') {
      renderTrueFalseOptions(question, optionsList);
    } else if (question.type === 'multiple_choice') {
      renderMultipleChoiceOptions(question, optionsList);
    } else if (question.type === 'check_all_that_apply') {
      renderCheckAllThatApplyOptions(question, optionsList);
    }

    // **Update progress bar**
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

    // If previously selected, highlight
    if (question.type === 'check_all_that_apply') {
      if (question.userSelectedAnswerIndices.includes(index)) {
        button.classList.add('selected-answer');
      }
    } else {
      if (question.userSelectedAnswerIndex === index) {
        button.classList.add('selected-answer');
      }
    }

    button.addEventListener('click', () => handleOptionClick(question, button));
    return button;
  }

  function handleOptionClick(question, button) {
    const selectedIndex = parseInt(button.dataset.optionIndex);

    if (question.type === 'multiple_choice' || question.type === 'true_false') {
      // Deselect all other buttons
      const allButtons = document.querySelectorAll('#options-list .option-button');
      allButtons.forEach(btn => {
        btn.classList.remove('selected-answer');
      });
      // Select the clicked one
      button.classList.add('selected-answer');
      question.userSelectedAnswerIndex = selectedIndex;
      question.userSelectedAnswerIndices = [];

      document.getElementById('next-button').disabled = false;
    } else if (question.type === 'check_all_that_apply') {
      if (button.classList.contains('selected-answer')) {
        // Unselect
        button.classList.remove('selected-answer');
        const idx = question.userSelectedAnswerIndices.indexOf(selectedIndex);
        if (idx > -1) {
          question.userSelectedAnswerIndices.splice(idx, 1);
        }
      } else {
        // Select
        button.classList.add('selected-answer');
        question.userSelectedAnswerIndices.push(selectedIndex);
      }

      // Enable Next/Submit button if at least one selected
      if (question.userSelectedAnswerIndices.length > 0) {
        document.getElementById('next-button').disabled = false;
      } else {
        document.getElementById('next-button').disabled = true;
      }
    }
  }

  function handleNextButton() {
    const question = quizQuestions[currentQuestionIndex];

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
      // multiple_choice or true_false
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
      showFinalScore();
    }
  }

  function showFinalScore() {
    const percentage = ((score / quizQuestions.length) * 100).toFixed(2);
    const ldap = document.getElementById('ldap-input').value.trim();
    const quizContainer = document.getElementById('quiz-container');

    // Prepare textual and numeric versions
    const textScore = `${score}/${quizQuestions.length} (${percentage}%)`;
    const numericScore = parseFloat((score / quizQuestions.length).toFixed(2)); // e.g., 0.67

    // Save to Supabase with Enhanced Logging
    saveQuizResultToSupabase(ldap, selectedQuizType, textScore, numericScore)
      .then(() => {
        // Build the summary UI only after successful insertion
        buildSummaryHTML(ldap, textScore, numericScore);
      })
      .catch(() => {
        // Even if saving fails, build the summary
        buildSummaryHTML(ldap, textScore, numericScore);
      });
  }

  async function saveQuizResultToSupabase(ldap, quizType, scoreText, scoreValue) {
    console.log("Attempting to save quiz result to Supabase...");
    console.log("Data:", { ldap, quizType, scoreText, scoreValue });

    try {
      const { data, error } = await supabase
        .from('Service Tech Quiz Results')   // Use exact table name (with spaces)
        .insert([
          {
            ldap: ldap,
            quiz_type: quizType,
            score_text: scoreText,
            score_value: scoreValue
            // date_of_test will default to NOW() automatically in the DB
          }
        ]);

      if (error) {
        console.error('Supabase insert error:', error);
        alert('Failed to save quiz result to Supabase.');
        throw error; // To ensure the promise is rejected
      } else {
        console.log('Supabase insert success:', data);
        // Optionally notify the user
        // alert('Quiz result saved to Supabase!');
      }
    } catch (err) {
      console.error('Error saving to Supabase:', err);
      alert('Error saving to Supabase.');
      throw err;
    }
  }

  function buildSummaryHTML(ldap, textScore, numericScore) {
    const percentage = ((numericScore) * 100).toFixed(2);
    const quizContainer = document.getElementById('quiz-container');

    // Build the summary UI
    let summaryHTML = `
      <div id="pdf-content">
        <div style="margin-bottom: 20px;">
          <h2 style="margin-bottom: 5px;">Score: ${score}/${quizQuestions.length} (${percentage}%)</h2>
          <h3 style="margin: 0;">LDAP: ${ldap}</h3>
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
      <p class="${answer.isCorrect ? 'correct' : 'incorrect'}">Your Answer: ${userAnswerFormatted}</p>
      ${!answer.isCorrect ? `<p class="correct">Correct Answer: ${correctAnswerFormatted}</p>` : ''}
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

    // Add event listeners for the new buttons
    document.getElementById('download-pdf-button').addEventListener('click', () => {
      const element = document.getElementById('pdf-content');
      const opt = {
        margin: [10, 15, 10, 15],
        filename: `quiz-results-${ldap}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          logging: true,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['css', 'avoid-all'],
          avoid: '.question-block'
        }
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

    const progress = ((index + 1) / quizQuestions.length) * 100; // +1 to reflect the current question
    progressBar.style.width = `${progress}%`;
    progressBar.style.transition = 'width 0.5s ease-in-out';

    console.log(`Progress updated: ${progress}%`);
  }

})();