function Question() {

    this.caption = '';
    this.answers = [];
    this.answer = null;
    this.dimension = null;



};

Question.prototype.loadFromJSON = function (json) {

    this.caption = json.question;
    this.dimension=json.dimension;
    for (var index = 0; index < json.answers.length; index++) {
        var answer = new Answer();
        answer.loadFromJSON(json.answers[index]);
        this.answers[index] = answer;
    }

    return this;
};


Question.prototype.getMaxScore=function() {

    for(var index=0; index<this.answers.length; index++) {
        if(this.answers[index].getScore()) {
            return this.answers[index].getScore();
        }
    }
    return 0;
}


Question.prototype.getAnswers=function() {
    return this.answers;
}


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
