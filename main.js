
// querySelectors go below
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var saveButton = document.querySelector('.js-save-button');

// other variables go below
var ideas = [];

// eventListeners go below
saveButton.addEventListener('click', verifyInput);

// functions and event handler go below
function verifyInput() {
  // check the title input for string
  // check the body input for string
  // if not both are true, alert!
  // create an idea instance
  // then push this instance into the ideas array
  // idea instance should show on card in bottom section
  if (titleInput.value === "" || bodyInput.value === "") {
   window.alert('Wait! you must input a title and body');
  } else {
    saveToArray(titleInput.value, bodyInput.value);
  }
}

function saveToArray(title, body) {
  var ideaCard = new Idea(title, body);
  ideas.push(ideaCard);
}
