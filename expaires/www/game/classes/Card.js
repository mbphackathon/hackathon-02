function Card(screen)
{
    this.screen=screen;
    this.fontSize=20;
}


Card.prototype.renderQuestion=function(question, container)
{
    this.element=document.createElement('div');
    this.element.setAttribute('class', 'card question');



    var fontSize=25;
    var paddingTop=40;

    if(question.getCaption().length>30) {
        var fontSize=14;
        var paddingTop=15;
    }
    else if(question.getCaption().length>20) {
        var fontSize=19;
        var paddingTop=30;
    }


    this.element.innerHTML=
        '<div class="flip-container">'+
            '<div class="flipper">'+
                '<div class="front"><div class="caption" style="font-size:'+fontSize+'px; padding-top: '+paddingTop+'px">'+
                    question.getCaption()+
                '</div></div>'+
            '<div class="back">'+
        '<div style="background-image: url(picto/carte-verte.png); height:100%; width:100%"></div>'+
            '</div>'+
        '</div>'+
    '</div>';

    container.appendChild(this.element);
}

Card.prototype.saveAnswer=function(answer) {
    this.screen.saveAnswer(answer);
}



Card.prototype.destroy=function(timeout) {
    setTimeout(function() {
        $(this.element).fadeOut(function() {
            $(this.element).remove();
        }.bind(this));
    }.bind(this), timeout)
}


Card.prototype.renderAnswer=function(answer, container)
{


    this.element=document.createElement('div');
    this.element.setAttribute('class', 'card answer');


    var pictoIndex=Math.round(1+Math.random()*3);


    if(answer.getScore()) {
        var bgURL='picto/carte-verte.png';
    }
    else {
        var bgURL='picto/carte-retournee.png';
    }



    this.element.innerHTML=
        '<div class="flip-container" >'+
        '<div class="flipper">'+
        '<div class="front"><img src="picto/picto'+pictoIndex+'.png" class="picto-00"/><div class="caption">'+
        answer.getCaption()+
        '</div><img src="picto/picto'+pictoIndex+'.png" class="picto-01"/></div>'+
        '<div class="back">'+
            '<div style="background-image: url('+bgURL+'); height:100%; width:100%"></div>'+
        '</div>'+
        '</div>'+
        '</div>';

    this.element.manager=this;
    this.element.answer=answer;




    $(this.element).click(function() {
        $(this.element).find('.flip-container').addClass('flip');

        this.flipCards();
        this.element.manager.saveAnswer(this.element.answer);
    }.bind(this))


    $(this.element).mouseover(function() {
        $(this.element).find('.front').addClass('icon');
    }.bind(this));

    $(this.element).mouseout(function() {
        $(this.element).find('.front').removeClass('icon');
    }.bind(this))



    container.appendChild(this.element);

}



Card.prototype.flip=function(timeout) {
    setTimeout(function() {
        $(this.element).find('.flip-container').addClass('flip')
    }.bind(this), timeout);
}

Card.prototype.flipCards=function() {
    //this.screen.returnQuestionCard();
    this.screen.returnCards();

}