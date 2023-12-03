// Function to add a new question to the list
 function addQuestionToList() {
  const questionInput = document.querySelector('.question-input');
  const questionText = questionInput.value.trim();

  if (questionText !== '') {
      const image = document.querySelector('.popup-content img').cloneNode(true);

      const newItem = document.createElement('li');
      newItem.classList.add('item');

      const qaIcon = document.createElement('img');
      qaIcon.classList.add('QAicon');
      qaIcon.src = image.src;
      newItem.appendChild(qaIcon);

      const answerCountIcon = document.createElement('span');
      answerCountIcon.classList.add('answer-count-icon');
      newItem.appendChild(answerCountIcon);

      const questionSpan = document.createElement('span');
      questionSpan.classList.add('add-question');
      questionSpan.textContent = questionText;
      newItem.appendChild(questionSpan);

      const triangleButton = document.createElement('div');
      triangleButton.classList.add('triangle-button', 'toggle-list');
      newItem.appendChild(triangleButton);

      const answersList = document.createElement('ul');
      answersList.classList.add('answers');
      newItem.appendChild(answersList);


      const answerInput = document.createElement('input');
      answerInput.classList.add('answer-input');
      answerInput.type = 'text';
      answerInput.placeholder = 'Enter your Answer';
      newItem.appendChild(answerInput);

      const submitAnswerBtn = document.createElement('button');
      submitAnswerBtn.classList.add('submit-answer');
      submitAnswerBtn.textContent = 'Submit';
      newItem.appendChild(submitAnswerBtn);


     // Append both input and button to the answers list
      answersList.appendChild(answerInput);
      answersList.appendChild(submitAnswerBtn);
      
      const list1 = document.querySelector('.list:first-child ul');
      if (list1) {
          // Use prepend to add the new item at the top
          list1.prepend(newItem);
      }

      questionInput.value = '';
      document.getElementById('popup').style.display = 'none';

      // Reinitialize listeners for the newly added elements
      initializeListeners();
      updateanswerCount();
  }
}

function initializeListeners() {
// Add click event listeners to toggle the visibility of answers
const triangleButtons = document.querySelectorAll('.triangle-button');

triangleButtons.forEach(button => {
    const answers = button.parentElement.querySelector('.answers');
    answers.style.display = 'none'; // Hide the answers initially

    button.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the event from bubbling to the parent (item)

    button.parentElement.classList.toggle('open');
    answers.style.display = answers.style.display === 'none' ? 'block' : 'none';
    });
});

  // Add an event listener to handle answer submission
  document.querySelectorAll('.submit-answer').forEach(submitAnswerBtn => {
  submitAnswerBtn.addEventListener('click', () => {
  console.log('Submit button cicked');

  const answers = submitAnswerBtn.parentElement;
  const answerInput = answers.querySelector('.answer-input');
  const newAnswer = answerInput.value.trim();

  console.log('Answer:', newAnswer);

  if (newAnswer !== '') {
      const dateSpan = document.createElement('span');
      dateSpan.classList.add('date');
      
      const currentDate = new Date().toLocaleDateString(); // Get current date
      
      dateSpan.textContent = `·${currentDate}`;
      dateSpan.style.fontSize = '9px'; // Change the font size
      dateSpan.style.color = '#0000005C'; // Change the color
      
      const newListItem = document.createElement('li');
      newListItem.textContent = `A: ${newAnswer}`;
      newListItem.appendChild(dateSpan); // Append the dateSpan to the newListItem
      
      answers.insertBefore(newListItem, answerInput);
      answerInput.value = '';

      updateanswerCount();
  }
  });
  });  
}

// Add an event listener to the "Submit" button to update the answer count when new answers are added
document.querySelectorAll('.answers button').forEach(submitBtn => {
  submitBtn.addEventListener('click', () => {
      // Wait for any asynchronous operation or use appropriate logic to add new answers
      // For example, after adding a new answer dynamically:
      // ...

      // Call the function to update the answer count
      updateanswerCount();
  });
});

  // Function to update the answer count icon
  function updateanswerCount() {
      const triangleButtons = document.querySelectorAll('.triangle-button');
      triangleButtons.forEach(button => {
          const answers = button.parentElement.querySelector('.answers');
          const answerCountIcon = button.parentElement.querySelector('.answer-count-icon');
          const answerCount = answers.querySelectorAll('li').length;
          answerCountIcon.textContent = answerCount;
      });
  } 

  // Show the popup
  var btn = document.getElementById('btn');
  btn.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('popup').style.display = 'block';

      document.getElementById('close-popup').addEventListener('click', function() {
          document.getElementById('popup').style.display = 'none';
      });
  });

  document.querySelectorAll('.submit-question').forEach(submitQuestionBtn => {
  submitQuestionBtn.addEventListener('click', addQuestionToList);
  });

  // Call initializeListeners initially
  initializeListeners();