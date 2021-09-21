// Pseudocode for filtering functionality: iteration4
// [x] query search input field
// [x] add eventlistener to above var for 'keyup'?
// [] function that takes the input and filters through the ideas array for matching included strings
// [] perhaps add 'hidden' to classList of cards that do not match the filter
// [] be able to unhide all cards when search is empty/deleted


// querySelectors go below
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var saveButton = document.querySelector('.js-save-button');
var cardContainer = document.querySelector('.js-card-section');
var showStarredButton = document.querySelector('.js-show-starred-button');
var searchInput = document.querySelector('#searchInput');

// other variables go below
var ideas = [];
var starredIdeas = [];
var filteredIdeas = [];
saveButton.disabled = true;

// eventListeners go below
saveButton.addEventListener('click', createIdeaCard);
titleInput.addEventListener('keydown', disableEmptyInputs);
bodyInput.addEventListener('keydown', disableEmptyInputs);
cardContainer.addEventListener('click', determineStarOrDelete);
window.addEventListener('load', retrieveArray);
showStarredButton.addEventListener('click', toggleSaveButton);
searchInput.addEventListener('keyup', searchIdeasArray);

//functions and event handler go below
function searchIdeasArray(){
  var searchValue = searchInput.value.toLowerCase();
  for(var i = 0; i < ideas.length; i++){
    var titleValue = ideas[i].title.toLowerCase();
    var bodyValue = ideas[i].body.toLowerCase();
    if(titleValue.includes(searchValue) || bodyValue.includes(searchValue)){
      filteredIdeas.push(ideas[i]);
    }
  }
  showSearchedCards();
  filteredIdeas = [];
};

function showSearchedCards() {
  cardContainer.innerHTML = "";
  for (var i = 0; i < filteredIdeas.length; i++) {
    if (filteredIdeas[i].star) {
      cardContainer.innerHTML += `
        <article class="card-article js-card-article">
          <div class="card-top-bar" id="${filteredIdeas[i].id}">
            <img class="star-active-icon js-star-active-icon" id="redStar" src="./Assets/star-active.svg">
            <img class="white-delete-icon js-white-delete-icon" src="./Assets/delete.svg">
          </div>
          <div class="card-body">
            <h3 class="idea-title">${filteredIdeas[i].title}</h3>
            <p class="idea-body">${filteredIdeas[i].body}</p>
          </div>
          <div class="card-bottom-bar">
            <img class="comment-icon" src="./Assets/comment.svg">
            <p class="bottom-bar-comment">Comment</p>
          </div>
        </article>`;
    } else {
      cardContainer.innerHTML += `
        <article class="card-article js-card-article">
          <div class="card-top-bar" id="${filteredIdeas[i].id}">
            <img class="white-star-icon js-white-star-icon" id="whiteStar" src="./Assets/star.svg">
            <img class="white-delete-icon js-white-delete-icon" src="./Assets/delete.svg">
          </div>
          <div class="card-body">
            <h3 class="idea-title">${filteredIdeas[i].title}</h3>
            <p class="idea-body">${filteredIdeas[i].body}</p>
          </div>
          <div class="card-bottom-bar">
            <img class="comment-icon" src="./Assets/comment.svg">
            <p class="bottom-bar-comment">Comment</p>
          </div>
        </article>`;
    }
  }
};

function showStarredCards() {
  cardContainer.innerHTML = "";
  for (var i = 0; i < starredIdeas.length; i++) {
      cardContainer.innerHTML += `
        <article class="card-article js-card-article">
          <div class="card-top-bar" id="${starredIdeas[i].id}">
            <img class="star-active-icon js-star-active-icon" id="redStar" src="./Assets/star-active.svg">
            <img class="white-delete-icon js-white-delete-icon" src="./Assets/delete.svg">
          </div>
          <div class="card-body">
            <h3 class="idea-title">${starredIdeas[i].title}</h3>
            <p class="idea-body">${starredIdeas[i].body}</p>
          </div>
          <div class="card-bottom-bar">
            <img class="comment-icon" src="./Assets/comment.svg">
            <p class="bottom-bar-comment">Comment</p>
          </div>
        </article>`
  }
  starredIdeas = [];
};

function saveStarredCards() {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].star) {
      starredIdeas.push(ideas[i]);
    }
  }
  showStarredCards();
};

function toggleSaveButton() {
  if (showStarredButton.innerText === 'Show Starred Ideas') {
    saveStarredCards();
    showStarredButton.innerText = 'Show All Ideas';
  } else {
    showIdeaCards();
    showStarredButton.innerText = 'Show Starred Ideas';
  }
};

function retrieveArray() {
  var retrievedArray = window.localStorage.getItem('array');
  var array = JSON.parse(retrievedArray);
  debugger;
  for (var i = 0; i < array.length; i++) {
    // ideas[i] =  array[i];
    var idea = array[i]
    ideas[i] = new Idea(idea.title, idea.body, idea.id, idea.star)
  }
    showIdeaCards();
};

function saveArray() {
  var stringifiedArray = JSON.stringify(ideas);
  window.localStorage.setItem('array', stringifiedArray);
};

function determineStarOrDelete() {
  if (event.target.classList.contains('js-white-star-icon')) {
    starIdeaCard();
  } else if (event.target.classList.contains('js-star-active-icon')) {
    unStarIdeaCard();
  } else if (event.target.classList.contains('js-white-delete-icon')) {
    removeIdeaCard();
  }
};

function starIdeaCard() {
  var ideaId = Number(event.target.parentNode.id);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === ideaId) {
      ideas[i].star = true;
    }
  }
  saveArray();
  showIdeaCards();
};

function unStarIdeaCard() {
  var ideaId = Number(event.target.parentNode.id);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === ideaId) {
      ideas[i].star = false;
    }
  }
  saveArray();
  showIdeaCards();
};

function removeIdeaCard() {
  var ideaId = Number(event.target.parentNode.id);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === ideaId) {
      ideas[i].deleteFromStorage(event.target.parentNode.id);
      ideas.splice(i, 1);
    }
  }
  saveArray();
  showIdeaCards();
};

function disableEmptyInputs() {
  if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
    saveButton.classList.remove('disable-button');
  }
};

function resetInputForm() {
  titleInput.value = "";
  bodyInput.value = "";
  saveButton.disabled = true;
  saveButton.classList.add('disable-button');
};

function showIdeaCards() {
  cardContainer.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].star) {
      cardContainer.innerHTML += `
        <article class="card-article js-card-article">
          <div class="card-top-bar" id="${ideas[i].id}">
            <img class="star-active-icon js-star-active-icon" id="redStar" src="./Assets/star-active.svg">
            <img class="white-delete-icon js-white-delete-icon" src="./Assets/delete.svg">
          </div>
          <div class="card-body">
            <h3 class="idea-title">${ideas[i].title}</h3>
            <p class="idea-body">${ideas[i].body}</p>
          </div>
          <div class="card-bottom-bar">
            <img class="comment-icon" src="./Assets/comment.svg">
            <p class="bottom-bar-comment">Comment</p>
          </div>
        </article>`;
    } else {
      cardContainer.innerHTML += `
        <article class="card-article js-card-article">
          <div class="card-top-bar" id="${ideas[i].id}">
            <img class="white-star-icon js-white-star-icon" id="whiteStar" src="./Assets/star.svg">
            <img class="white-delete-icon js-white-delete-icon" src="./Assets/delete.svg">
          </div>
          <div class="card-body">
            <h3 class="idea-title">${ideas[i].title}</h3>
            <p class="idea-body">${ideas[i].body}</p>
          </div>
          <div class="card-bottom-bar">
            <img class="comment-icon" src="./Assets/comment.svg">
            <p class="bottom-bar-comment">Comment</p>
          </div>
        </article>`;
    }
  }
};

function createIdeaCard() {
  var ideaCard = new Idea(titleInput.value, bodyInput.value);
  ideas.push(ideaCard);
  saveArray();
  ideaCard.saveToStorage();
  showIdeaCards();
  resetInputForm();
};
