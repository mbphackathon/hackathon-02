function Board(game)
{
    this.game=game;
}


Board.prototype.render=function() {
    this.element=document.createElement('div');
    this.element.setAttribute('id', 'board');
    document.body.appendChild(this.element);
}


Board.prototype.saveAnswer=function(question) {

    this.game.saveAnswer(question);

    //this.board.saveAnswer(question, answer);
}


Board.prototype.clear=function() {
    this.screen.clear();
}



Board.prototype.nextQuestion=function(question) {
    this.screen.clear();
    setTimeout(function() {
        this.renderScreen(question);
    }.bind(this), 700);
}


Board.prototype.renderScreen = function (question) {
    if(!this.screen) {
        this.screen = new Screen(
            this,
            question
        );
    }
    else {
        this.screen.setQuestion(question);
    }

    this.screen.render(this.element);
    return screen;

}