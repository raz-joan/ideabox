// PSEUDOCODE:
// [] querySelector cardContainer reused with new function for star direction
// [] add new eventlistener for above
// [] new function - to decide which
//   [] third function to decide which icon function is executed

//FRIDAY GOALS:
// [] refactor removeIdeaCard function (break for loop and conditional up into 2 functions)
// [] work on star button
//   will need white star icon AND filled in star icon
//   update this.star property in Idea class to be true via instance?
//   attempt a toggle between white and filled in start
// [] review iteration 4


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
cardContainer.addEventListener('click', determineStarOrDelete);

//functions and event handler go below
function determineStarOrDelete() {
  if (event.target.classList.contains('js-white-star-icon')) {
    starIdeaCard(event.target);
  } else if (event.target.classList.contains('js-white-delete-icon')) {
    removeIdeaCard(event.target);
  }
};
// if (event.target.classList.contains('delete-button')) {
//     event.target.parentNode.classList.add('hidden');
// }

function starIdeaCard(pancakes) {
  // YOU DO NOT NEED A DAMN QUERY STOP ASKING
  console.log(pancakes)
  pancakes.classList.add('hidden');
  pancakes.classList.remove('hidden');
};

function removeIdeaCard(ideaId) {
  var ideaId = Number(event.target.parentNode.id);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === ideaId) {
      ideas.splice(i, 1);
    }
  }
  showIdeaCards();
  console.log(event);
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
          <img class="white-star-icon js-white-star-icon" src="./Assets/star.svg">
          <img class="star-active-icon hidden" src="./Assets/star-active.svg">
          <img class="white-delete-icon js-white-delete-icon" src="./Assets/delete.svg">
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
