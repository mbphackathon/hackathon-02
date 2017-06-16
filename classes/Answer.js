function Answer() {
    this.score = 0;
    this.caption = '';
}


Answer.prototype.loadFromJSON = function (json) {
    this.caption = json.caption;
    this.score = json.score;
    return this;
}


Answer.prototype.getScore = function () {
    return this.score;
};


Answer.prototype.getCaption = function () {
    return this.caption;
};