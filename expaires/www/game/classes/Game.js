function Game() {
    this.questions = [];
    this.player = new Player();

    this.currentQuestion = 0;

    this.board = new Board(this);

    this.answers = [];

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
    return this.questions[this.currentQuestion];
};


Game.prototype.saveAnswer = function (question) {
    this.answers.push(question);
    this.currentQuestion++;
    if (!this.isFinished()) {
        this.nextQuestion();
    }
    else {

        this.finish();

        //this.board.clear();
    }

    /*
     console.debug(
     sessionStorage.getItem("answers")
     );
     */


    //sessionStorage.setItem("answers", JSON.stringify(this.answers));

}


Game.prototype.nextQuestion = function () {
    this.board.nextQuestion(
        this.getCurrentQuestion()
    );
};

Game.prototype.getScore = function () {

    var score = {};


    for (var index = 0; index < this.questions.length; index++) {
        if(typeof(score[this.questions[index].getDimension()])=='undefined') {
            score[this.questions[index].getDimension()] = {
                'score': 0,
                'max': 0
            };
        }
        score[this.questions[index].getDimension()].max++;
    }


    for (var index = 0; index < this.questions.length; index++) {
        score[this.questions[index].getDimension()].max+=this.questions[index].getMaxScore();
        score[this.questions[index].getDimension()].score += this.questions[index].getScore();
    }
    return score;
}

Game.prototype.renderScreen = function () {

    return this.board.renderScreen(this.getCurrentQuestion());
}


Game.prototype.isFinished = function () {
    if (this.currentQuestion == this.questions.length) {
        return true;
    }
    else {
        return false;
    }
}


Game.prototype.render = function () {
    this.board.render();
}

Game.prototype.start = function () {
    this.renderScreen();
};

Game.prototype.finish = function () {
    this.board.clear();
    //sessionStorage.setItem('score', JSON.stringify(this.getScore()));
    localStorage.setItem('score', JSON.stringify(this.getScore()));
}
