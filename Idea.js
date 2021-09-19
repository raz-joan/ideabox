class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
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

  getFromStorage() {
    var retrievedData = window.localStorage.getItem(this.id);
    var data = JSON.parse(retrievedData);
    ideas.push(data);
  }
}
