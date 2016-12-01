var dev = 15;

var Particle = function(pos, emo, c) {
  this.pos = pos.copy();
  // this.pos;
  this.emo = emo;
  this.c = c;
  // this.petal=false;
  // this.xoff = random() * 10;
  // this.yoff = random() * 1000;
  this.renderResults = false;
  // this.noRenderResults=true;
  // this.dev = [];
  this.results = [];
  this.needReset=false;

  this.resultsParticleSystem = [];

  // for (var i = 0; i < 4; i++) {
  //   this.dev.push(new p5.Vector(random(-dev, dev), random(-dev, dev), 100 + 2 * random(-dev, dev)));
  // }

  this.render = function(a, i) {
    // console.log(this.emo);
    // this.xoff += 0.005;
    // this.yoff += 0.005;
    // console.log(this.pos);
    // push();
    // translate(this.pos.x, this.pos.y);
    // fill(this.c);
    // rect(this.pos.x, this.pos.y, a / 2, 50);

    // ellipse(0, 0, 100);
    // for (var i = 0; i < 4; i++) {
    //   ellipse(this.dev[i].x, this.dev[i].y, this.dev[i].z);
    // }

    // fill(255);
    // textAlign(CENTER, CENTER);
    // textFont("Comfortaa");
    // textSize(25);
    // text(this.emo, this.pos.x, this.pos.y);

    // if(this.renderResults && this.noRenderResults){


    //   console.log(this.resultsParticleSystem);

    //   this.noRenderResults=false;
    // }
    // pop();


    if(this.needReset){
      var pos=this.pos;
      this.resultsParticleSystem.forEach(function(e){
        e.position=p5.Vector.add(pos,createVector(random(-10,10),0));
      })
    }

    if (this.renderResults) {
      for (var i = 0; i < this.resultsParticleSystem.length; i++) {
        for (var j = 0; j < this.resultsParticleSystem.length; j++) {
          if (i !== j) {
            var forceRepel = this.resultsParticleSystem[j].calculateRepel(this.resultsParticleSystem[i]);
            this.resultsParticleSystem[i].applyForce(forceRepel);

            // var forceAttraction = this.resultsParticleSystem[j].calculateAttraction(this.resultsParticleSystem[i]);
            // this.resultsParticleSystem[i].applyForce(forceAttraction);
          }
        }
        
        this.resultsParticleSystem[i].check();
        this.resultsParticleSystem[i].update();
        this.resultsParticleSystem[i].render();
      }
      // this.resultsParticleSystem.forEach(function(e,i) {

      //   if(i !==j)
      //   e.update();
      //   e.render();
      // })
    }
    // }
    // var text=createElement("h4",this.emo);
    // text.position(pos.x,pos.y);
    // text.parent('canvasContainer');
  }


  this.findIt = function(records) {
    var currentEmo = this.emo;
    var results = [];
    records.forEach(function(r) {
        var currentEmotionsRecords = r.emotions;
        // console.log("currentEmotionsRecords: "+currentEmotionsRecords);
        if (currentEmotionsRecords.indexOf(currentEmo) > -1) {
          results.push(r);
        }
      })
      // console.log(results);
    this.results = results;


    // var position = createVector(random(-10,10), 0);
    var rps = [];
    var posi=this.pos;
    this.results.forEach(function(e, i) {
      // console.log(e);
      e.people.forEach(function(p) {
        rps.push(new resutlParticle(p5.Vector.add(posi,createVector(random(-10,10),0)), p));
      });
      rps.push(new resutlParticle(p5.Vector.add(posi,createVector(random(-10,10),0)), e.place));
      e.things.forEach(function(t) {
        rps.push(new resutlParticle(p5.Vector.add(posi,createVector(random(-10,10),0)), t));
      });
      rps.push(new resutlParticle(p5.Vector.add(posi,createVector(random(-10,10),0)), e.weather));
    });
    this.resultsParticleSystem = rps;
  }
}

var ParticleSystem = function(position) {
  this.particles = [];

  this.addParticle = function(pos, e, c) {
    this.particles.push(new Particle(pos, e, c));
  };

  this.run = function() {
    var num = this.particles.length;
    var a = width / num;
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      p.render(a, i);
    }
  };

  this.assort = function(records) {
    this.particles.forEach(function(p) {
      p.findIt(records);
    })
  };
}


var resutlParticle = function(position, content) {
  this.position = position.copy();
  this.acceleration = createVector(0, random(-100,-5));
  this.velocity = createVector(random(-1, 1), random(-10,0));
  this.content=content;
  this.col=random(colors);
  this.size=content.length*15;
  this.xoff=random(100);
  this.yoff=random(1000);

  this.applyForce = function(f) {
    this.acceleration.add(f);
  };

  this.render = function() {
    // var a=random(30,100);
    //noise
    this.xoff += 0.005;
    this.yoff += 0.005;
    push();
    translate(this.position.x+noise(this.xoff)*50, this.position.y+noise(this.yoff)*50);
    fill(this.col);
    ellipse(0,0, this.size, this.size);

    fill(255);
    textAlign(CENTER, CENTER);
    textFont("Comfortaa");
    textSize(20);
    text(this.content,0,0)

    pop();
  }

  this.update = function() {
    this.velocity.limit(10);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);



    this.acceleration.mult(0);
    this.velocity.mult(0.9);

  }

  this.check=function(){
    if (this.position.x > width-this.size/2-30) {
      this.position.x = width-this.size/2-30;
      this.velocity.x *= -1;
    } else if (this.position.x < this.size/2+30) {
      this.velocity.x *= -1;
      this.position.x = this.size/2+30;
    }
    if (this.position.y > height-this.size/2-230) {
      this.velocity.y *= -1;
      this.position.y = height-this.size/2-230;
    } else if(this.position.y<this.size/2+30){
      this.velocity.y*=-1;
      this.position.y=this.size/2+30;
    }
  }

  this.calculateRepel = function(m) {
    // Calculate direction of force
    var force = p5.Vector.sub(m.position,this.position);
    // Distance between objects
    var distance = force.mag();
    // if(distance<200){
      // Normalize vector (distance doesn't matter here, we just want this vector for direction   
      force.normalize();                     
      // Get force vector --> magnitude * direction
      force.div(distance);
      force.mult(20);
      return force;
    // }
  };


  // this.calculateAttraction = function(m) {
  //   // Calculate direction of force
  //   var force = p5.Vector.sub(this.position,m.position);
  //   // Distance between objects
  //   var distance = force.mag();
  //   // if(distance<200){
  //     // Normalize vector (distance doesn't matter here, we just want this vector for direction   
  //     // force.normalize();                     
  //     // Get force vector --> magnitude * direction
  //     if(distance>200){
  //     force.div(30);
  //     // force.mult(20);
  //     return force;
  //   }
  //   // }
  // };

}

var colors = [
  "rgba(255, 224, 130, 0.8)",
  "rgba(197,225,165,0.8)",
  "rgba(255,204,128,0.8)",
  "rgba(255,171,145,0.8)",
  "rgba(159,168,218,0.8)",
  "rgba(239,154,154,0.8)",
  "rgba(179,157,219,0.8)",
  "rgba(244,143,177,0.8)",
  "rgba(206,147,216,0.8)"
];

// String.prototype.replaceAt=function(index, character) {
//     return this.substr(0, index) + character + this.substr(index+character.length);
// }

// var Particle = function(position) {
//   this.acceleration = createVector(0, 0.05);
//   this.velocity = createVector(random(-1, 1), random(-1, 0));
//   this.position = position.get();
//     this.lifespan = 255.0;

//   this.run = function() {
//     this.update();
//     this.display();
//   };

//   // Method to update position
//   this.update = function(){
//     this.velocity.add(this.acceleration);
//     this.position.add(this.velocity);
//     this.lifespan -= 2;
//   };

//   // Method to display
//   this.display = function() {
//     stroke(255, this.lifespan);
//     strokeWeight(2);
//     fill(127, this.lifespan);
//     ellipse(this.position.x, this.position.y, 12, 12);
//   };

//   // Is the particle still useful?
//   this.isDead = function(){
//     if (this.lifespan < 0.0) {
//         return true;
//     } else {
//       return false;
//     }
//   };
// }