function Screen(board, question)
{
    this.board=board;
    this.question=question;

    this.cards=[];
}



Screen.prototype.saveAnswer=function(answer) {
    this.question.setAnswer(answer);

    this.board.saveAnswer(this.question);
}


Screen.prototype.clear=function() {
    for(var index=this.cards.length-1; index>=0; index--) {
        this.cards[index].destroy((this.cards.length-index)*100);
    }
    this.cards=[];
    this.question=null;
}

Screen.prototype.setQuestion=function(question) {
    this.question=question;
}


Screen.prototype.render=function(container)
{

    if(!this.questionPlaceholder) {
        this.questionPlaceholder=document.createElement('div');
        this.questionPlaceholder.setAttribute('class', 'questionPlaceholder');
        container.appendChild(this.questionPlaceholder);

    }

    if(!this.answerPlaceholder) {
        this.answerPlaceholder=document.createElement('div');
        this.answerPlaceholder.setAttribute('class', 'answerPlaceholder');
        container.appendChild(this.answerPlaceholder);
    }





    var questionCard=new Card(this);
    questionCard.renderQuestion(this.question, this.questionPlaceholder);

    this.cards.push(questionCard);

    var answers=this.question.getAnswers();
    for(index=0; index<answers.length; index++) {
        var answerCard=new Card(this);
        answerCard.renderAnswer(answers[index], this.answerPlaceholder);

        this.cards.push(answerCard);
    }



    //console.debug(this.question);
    //return screen;
}


