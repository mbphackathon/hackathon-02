function Game() {
    this.questions = [];
    this.player = new Player();

    this.currentQuestion = 0;
};


Game.prototype.load = function (descriptor) {

    for (var index = 0; index < descriptor.questions.length; index++) {
        var question = new Question();
        question.loadFromJSON(
            descriptor.questions[index]
        );
        this.questions[index] = question;
    }

    return this;

};

Game.prototype.getCurrentQuestion = function () {
    console.debug(this.questions[this.currentQuestion]);
    return this.questions[this.currentQuestion];
};

Game.prototype.getScore = function () {

    var score = {};

    for (var index = 0; index < this.questions.length; index++) {
        score[this.questions[index].getDimension()] = 0;
    }


    for (var index = 0; index < this.questions.length; index++) {
        score[this.questions[index].getDimension()] += this.questions[index].getScore();
    }
    return score;
}

Game.prototype.renderScreen = function () {
    var screen = new Screen(
        this.getCurrentQuestion()
    );

}


Game.prototype.isFinished = function () {
    if (this.currentQuestion == this.questions.length) {
        return true;
    }
    else {
        return false;
    }
}


Game.prototype.start = function () {

};

Game.prototype.finish = function () {

}