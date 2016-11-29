var dev=15;

var Particle=function(pos,emo,c){
  this.pos=pos.copy();
  this.emo=emo;
  this.c=c;
  this.xoff=random()*10;
  this.yoff=random()*1000;
  this.dev=[];
  this.r=[];
  for(var i=0;i<4;i++){
    this.dev.push(new p5.Vector(random(-dev,dev),random(-dev,dev)));
    this.r.push(100+2*random(-dev,dev));
  }
  this.results = [];

  this.render=function(){
    // console.log(this.emo);
    this.xoff+=0.01;
    this.yoff+=0.01;
    push();
    translate(pos.x+noise(this.xoff)*50,pos.y+noise(this.yoff)*50);
    fill(this.c);
    
    ellipse(0,0,100);
    for(var i=0;i<4;i++){
      ellipse(this.dev[i].x,this.dev[i].y,this.r[i]);
    }
    
    pop();
  }
}