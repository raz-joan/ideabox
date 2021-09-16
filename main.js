
// querySelectors go below
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var saveButton = document.querySelector('.js-save-button');
var cardContainer = document.querySelector('.js-card-section');

// other variables go below
var ideas = [];

// eventListeners go below
saveButton.addEventListener('click', verifyInput);

// functions and event handler go below
function showIdeaCards() {
  cardContainer.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    cardContainer.innerHTML += `<article class="card-article">
        <div class="card-top-bar">
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

function saveToArray(title, body) {
  var ideaCard = new Idea(title, body);
  ideas.push(ideaCard);
  showIdeaCards();
};

function verifyInput() {
  if (titleInput.value === "" || bodyInput.value === "") {
   window.alert('Wait! you must input a title and body');
  } else {
    saveToArray(titleInput.value, bodyInput.value);
  }
};
