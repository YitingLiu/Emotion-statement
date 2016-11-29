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
  }
}