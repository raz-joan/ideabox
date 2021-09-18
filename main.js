// PSEUDOCODE:
//



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
    removeIdeaCard();
  }
};
// if (event.target.classList.contains('delete-button')) {
//     event.target.parentNode.classList.add('hidden');
// }

function starIdeaCard() {
  var ideaId = Number(event.target.parentNode.id);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === ideaId) {
      ideas[i].star = true;
      event.target.classList.add('hidden');
      var filledInStar = event.target.previousElementSibling;
      filledInStar.classList.remove('hidden');
    }
  };
  // var whiteStar = document.getElementById('whiteStar');
  // var filledInStar = document.getElementById('redStar')
  // whiteStar.classList.add('hidden');
  // filledInStar.classList.remove('hidden');

  // console.log(whiteStar)
  // whiteStar.classList.add('hidden');
  // whiteStar.previousSibling.classList.remove('hidden');
};

function removeIdeaCard() {
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
          <img class="star-active-icon hidden js-star-active-icon" id="redStar" src="./Assets/star-active.svg">
          <img class="white-star-icon js-white-star-icon" id="whiteStar" src="./Assets/star.svg">
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
