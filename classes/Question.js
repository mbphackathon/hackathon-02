function Question() {

    this.caption = '';
    this.answers = [];
    this.answer = null;

    this.dimension = null;
};

Question.prototype.loadFromJSON = function (json) {
    this.caption = json.question;
    for (var index = 0; index < json.answers.length; index++) {
        var answer = new Answer();
        answer.loadFromJSON(json.answers[index]);
        this.answers[index] = answer;
    }

    return this;
};

Question.prototype.getDimension = function () {
    return this.dimension;
}

Question.prototype.getCaption = function () {
    return this.caption;
};

Question.prototype.setAnswer = function (answer) {
    this.answer = answer;
    return this;
};

Question.prototype.getScore = function () {
    if (this.answer) {
        return this.answer.getScore();
    }
    else {
        return 0;
    }

};
