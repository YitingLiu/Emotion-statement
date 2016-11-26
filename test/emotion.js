var dev=15;

var Emotion=function(pos,emo,c){
  this.pos=pos.copy();
  this.emo=emo;
  this.c=c;
  this.results = [];
  
  this.render=function(){
    // console.log(this.emo);
    push();
    translate(pos.x,pos.y);
    fill(this.c);
    for(var i=0;i<5;i++){
      ellipse(random(-dev,dev),random(-dev,dev),100+2*random(-dev,dev));
    }
    pop();
  }
}