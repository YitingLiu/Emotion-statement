var dev = 15;

var Particle = function(pos, emo, c) {
  this.pos = pos.copy();  // percentage!!!
  this.emo = emo;
  this.c = c;
  this.selected=false;
  this.xoff = random() * 10;
  this.yoff = random() * 1000;
  this.dev = [];
  for (var i = 0; i < 4; i++) {
    this.dev.push(new p5.Vector(random(-dev, dev), random(-dev, dev), 100 + 2 * random(-dev, dev)));
  }
  this.results = [];

  this.render = function() {
    // console.log(this.emo);
    this.xoff += 0.005;
    this.yoff += 0.005;
    push();
    translate(pos.x*width + noise(this.xoff) * 50, pos.y*height + noise(this.yoff) * 50);
    fill(this.c);

    ellipse(0, 0, 100);
    for (var i = 0; i < 4; i++) {
      ellipse(this.dev[i].x, this.dev[i].y, this.dev[i].z);
    }

    if(this.selected){
      fill(100);
    }else{
      fill(255);
    }
    textAlign(CENTER,CENTER);
    textFont("Comfortaa");
    textSize(18);
    text(this.emo,0,0);
    // var text=createElement("h4",this.emo);
    // text.position(pos.x,pos.y);
    // text.parent('canvasContainer');
    pop();
  };

  this.findIt = function(rcs) {
    rcs.forEach(function(r) {
      var currentEmotionsRecords = r.emotions;
      if (currentEmotionsRecords.indexOf(this.emo) > -1) {
        this.result.push(r);
      }
    })
  }
}

var ParticleSystem = function(position) {
  this.particles = [];

  this.addParticle = function(pos, e, c) {
    this.particles.push(new Particle(pos, e, c));
  };

  this.run = function() {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      p.render();
    }
  };

  this.assort = function(records) {
    this.particles.forEach(function(p) {
      p.findIt(records);
    })
  };
}