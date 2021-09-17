// PSEUDOCODE:
// [] On click, the card instance should be permanently removed from the array
//  AND from card section
// STEPS:
// [x] querySelect the delete icon
// [x] add eventListener to listen for 'click' on delete icon
// [x] create a function that splices the selected idea card
//  from the ideas saveToArray
// [x] target ID of card to
// [] invoke showIdeaCards within new function to repopulate the card section
//  without deleted card.


// querySelectors go below
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var saveButton = document.querySelector('.js-save-button');
var cardContainer = document.querySelector('.js-card-section');

// var cardArticle = document.querySelector('.js-card-article');

// other variables go below
var ideas = [];
saveButton.disabled = true;

// eventListeners go below
saveButton.addEventListener('click', saveToArray);
titleInput.addEventListener('keydown', disableEmptyInputs);
bodyInput.addEventListener('keydown', disableEmptyInputs);
cardContainer.addEventListener('click', identifyIdeaCard);

//functions and event handler go below

function identifyIdeaCard(ideaId) {
  var ideaId = Number(event.target.parentNode.id);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === ideaId) {
      ideas.splice(i, 1);
    }
  }
  showIdeaCards();
};

function disableEmptyInputs() {
  if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
    saveButton.classList.remove('disable-button');
  }
};

function clearInputs() {
  titleInput.value = "";
  bodyInput.value = "";
  saveButton.disabled = true;
  saveButton.classList.add('disable-button');
};

function showIdeaCards() {
  cardContainer.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    cardContainer.innerHTML += `
      <article class="card-article js-card-article">
        <div class="card-top-bar" id="${ideas[i].id}">
          <img class ="white-star-icon" src="./Assets/star.svg">
          <img class="white-delete-icon" src="./Assets/delete.svg">
        </div>
        <div class="card-body">
          <h3>${ideas[i].title}</h3>
          <p>${ideas[i].body}</p>
        </div>
        <div class="card-bottom-bar">
          <img class="comment-icon" src="./Assets/comment.svg">
          <p class="bottom-bar-comment">Comment</p>
        </div>
      </article>`;
  }
};

function saveToArray() {
  var ideaCard = new Idea(titleInput.value, bodyInput.value);
  ideas.push(ideaCard);
  showIdeaCards();
  clearInputs();
};
