
// querySelectors go below
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var saveButton = document.querySelector('.js-save-button');
var cardContainer = document.querySelector('.js-card-section');
// var disableInputs = document.querySelectorAll('.disable-input'); LOOK AT ME


// other variables go below
var ideas = [];

// saveButton.disabled = true;  LOOK AT ME

// eventListeners go below
saveButton.addEventListener('click', verifyInput);
disableInputs.addEventListener('change', disableEmptyInputs);

// functions and event handler go below
// function disableEmptyInputs(){
//   if(disableInputs.value === ""){
//     saveButton.disabled = true;
//   } else{
//     saveButton.disabled = false;
//   }
// } LOOK AT ME

function clearInputs() {
  titleInput.value = "";
  bodyInput.value = "";
}

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
  clearInputs();
};

function verifyInput() {
  if (titleInput.value === "" || bodyInput.value === "") {
   window.alert('must fill out form');
  } else {
    saveToArray(titleInput.value, bodyInput.value);
  }
};
