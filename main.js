// querySelectors go below
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var saveButton = document.querySelector('.js-save-button');
var cardContainer = document.querySelector('.js-card-section');

// other variables go below
var ideas = [];
saveButton.disabled = true;

// eventListeners go below
saveButton.addEventListener('click', saveToArray);
titleInput.addEventListener('change', disableEmptyInputs);
bodyInput.addEventListener('change', disableEmptyInputs);

//functions and event handler go below
function disableEmptyInputs() {
  if (titleInput.value === "" || bodyInput.value === "") {
    saveButton.disabled = true;
  } else {
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
      <article class="card-article">
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

function saveToArray() {
  var ideaCard = new Idea(titleInput.value, bodyInput.value);
  ideas.push(ideaCard);
  showIdeaCards();
  clearInputs();
};
