// Show the popup
var btn = document.getElementById ('btn');
btn.addEventListener ('click', function(e){
e.preventDefault(); popup.style.display = 'block'; 

// Close the popup when the "Close" button is clicked
document.getElementById('close-popup').addEventListener('click', function() {
    popup.style.display = 'none';
});   
//***************************************************************//
// Add event listener to handle adding question and image to the new list
document.querySelectorAll('.submit-question').forEach(submitQuestionBtn => {
  submitQuestionBtn.addEventListener('click', () => {
  console.log('Submit button cicked');

const question = submitQuestionBtn.parentElement;
const questionInput = question.querySelector('.question-input');
const newQuestion = questionInput.value.trim();

console.log('Question:', newQuestion);


if (question !== '') {
  const questionText = document.createElement('p');
  questionText.textContent = question;

  const image = document.querySelector('.popup-content img').cloneNode(true);

  const newItem = document.createElement('li');
  newItem.classList.add('item');
  newItem.appendChild(image);
  newItem.appendChild(questionText);

  const firstList = document.querySelector('.list:first-child .item-list'); // Select the first list
  if (firstList) {
      firstList.appendChild(newItem); // Append the new question and image to the first list
  } else {
      const newList = document.createElement('ul');
      newList.classList.add('item-list');
      newList.appendChild(newItem);
      const firstListContainer = document.querySelector('.list:first-child');
      firstListContainer.appendChild(newList); // Append the new list with the question and image to the first list container
  }

  // Clear input after adding question
  questionInput.value = '';
}


// Close the popup after adding the question
popup.style.display = 'none';
});
//***************************************************************//
})
})

// Automatically adjust the vertical line's height based on the list content
const verticalLine = document.getElementById('vertical-line');
const itemList = document.querySelector('.item-list');

function updateVerticalLineHeight() {
    const height = itemList.clientHeight;
    verticalLine.style.height = height + 'px';
}

// Add click event listeners to toggle the visibility of answers
const triangleButtons = document.querySelectorAll('.triangle-button');

triangleButtons.forEach(button => {
    const answers = button.parentElement.querySelector('.answers');
    answers.style.display = 'none'; // Hide the answers initially

    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the event from bubbling to the parent (item)

        button.parentElement.classList.toggle('open');
        answers.style.display = answers.style.display === 'none' ? 'block' : 'none';
        updateVerticalLineHeight();
    });
});
     
// Function to update the answer count icon
function updateanswerCount() {
    triangleButtons.forEach(button => {
        const answers = button.parentElement.querySelector('.answers');
        const answerCountIcon = button.parentElement.querySelector('.answer-count-icon');

        // Count the number of answers
        const answerCount = answers.querySelectorAll('li').length;

        // Update the answer count icon content
        answerCountIcon.textContent = answerCount;
    });
}

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
    
    dateSpan.textContent = ` - ${currentDate}`;
    dateSpan.style.fontSize = '9px'; // Change the font size
    dateSpan.style.color = '#0000005C'; // Change the color
    
    const newListItem = document.createElement('li');
    newListItem.textContent = `A: ${newAnswer}`;
    newListItem.appendChild(dateSpan); // Append the dateSpan to the newListItem
    
    answers.insertBefore(newListItem, answerInput);
    answerInput.value = '';

    updateanswerCount();
    updateVerticalLineHeight();
}
});
});

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


/////// Update the vertical line height on initial load
updateVerticalLineHeight();
updateanswerCount();   


