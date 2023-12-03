function handleAnswerSubmission() {
  console.log('Submit button clicked');

  const answers = this.parentElement;
  const answerInput = answers.querySelector('.answer-input');
  const newAnswer = answerInput.value.trim();

  console.log('Answer:', newAnswer);

  if (newAnswer !== '') {
      const dateSpan = document.createElement('span');
      dateSpan.classList.add('date');

      const currentDate = new Date().toLocaleDateString(); // Get the current date

      dateSpan.textContent = `·${currentDate}`;
      dateSpan.style.fontSize = '9px'; // Change the font size
      dateSpan.style.color = '#0000005C'; // Change the color

      const newListItem = document.createElement('li');
      newListItem.textContent = `A: ${newAnswer}`;
      newListItem.appendChild(dateSpan); // Append the dateSpan to the newListItem

      answers.insertBefore(newListItem, answerInput);
      answerInput.value = '';

      // Append the new answer to the corresponding item in the other list
      const otherList = answers.parentElement.id === 'list-left' ? document.getElementById('list-right') : document.getElementById('list-left');

      const newItemRight = newListItem.cloneNode(true); // Clone only the answer item

      if (answers.parentElement.id === 'list-left') {
          // Only append to the other list if the current list is the "New" list
          otherList.querySelector('.answers').prepend(newItemRight);
      }

      // Find the corresponding item in the other list and append the new answer
      const correspondingItem = otherList.querySelector('.add-question');
      const correspondingAnswersList = otherList.querySelector('.answers');
      const correspondingNewAnswer = newAnswer;

      const dateSpanRight = document.createElement('span');
      dateSpanRight.classList.add('date');
      dateSpanRight.textContent = `·${currentDate}`;
      dateSpanRight.style.fontSize = '9px';
      dateSpanRight.style.color = '#0000005C';

      const newListItemRight = document.createElement('li');
      newListItemRight.textContent = `A: ${correspondingNewAnswer}`;
      newListItemRight.appendChild(dateSpanRight);

      correspondingAnswersList.insertBefore(newListItemRight, correspondingAnswersList.firstChild);

      updateanswerCount();
  }
}









