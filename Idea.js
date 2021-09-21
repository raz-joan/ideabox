class Idea {
  constructor(title, body, id, star) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.star = star || false;
  }

  saveToStorage() {
    var stringifiedData = JSON.stringify(this);
    window.localStorage.setItem(this.id, stringifiedData);
  }

  deleteFromStorage() {
    window.localStorage.removeItem(this.id);
  }

  updateIdea() {

  }
};
