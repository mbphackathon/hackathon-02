function Card(screen)
{
    this.screen=screen;
}


Card.prototype.renderQuestion=function(question, container)
{
    this.element=document.createElement('div');
    this.element.setAttribute('class', 'card question');


    this.element.innerHTML=
        '<div class="flip-container">'+
            '<div class="flipper">'+
                '<div class="front"><div class="caption">'+
                    question.getCaption()+
                '</div></div>'+
            '<div class="back">'+
                '<!-- back content -->'+
            '</div>'+
        '</div>'+
    '</div>';

    container.appendChild(this.element);
}

Card.prototype.saveAnswer=function(answer) {

    this.screen.saveAnswer(answer);

    //console.debug(answer);
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


    var bgURL='picto/carte-retournee.png';


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
        this.manager.saveAnswer(this.answer);




    }.bind(this))


    container.appendChild(this.element);

}