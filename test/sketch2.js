var emotionsText = ["Joy", "Sadness", "Trust", "Fear", "Disgusting", "Satisfied", "Anger", "Surprise", "Anitcipatoin"];
var recordsFromDB;

var ps;

var colors = [
  "rgba(255, 224, 130, 0.4)",
  "rgba(197,225,165,0.4)",
  "rgba(255,204,128,0.4)",
  "rgba(255,171,145,0.4)",
  "rgba(159,168,218,0.4)",
  "rgba(239,154,154,0.4)",
  "rgba(179,157,219,0.4)",
  "rgba(244,143,177,0.4)",
  "rgba(206,147,216,0.4)"
];

// function preload() {
//   emotionsFromDB=loadJSON("https://emotion-statement.herokuapp.com/api/get");
// }

function preload() {
  var url = 'emotion.json';
  recordsFromDB = loadJSON(url);
}

function setup() {
  recordsFromDB = recordsFromDB.record;
  createCanvas(window.innerWidth, window.innerHeight);
  // console.log(emotionsText);
  noStroke();
  ps=new ParticleSystem();

  emotionsText.forEach(function(e) {
    var pos = createVector(randomGaussian(width / 2, 200), randomGaussian(height / 2, 200));
    ps.addParticle(pos,e,random(colors));
  });
}


function draw() {
  clear();
  ps.run();
  ps.assort(recordsFromDB);
  


  // emotions.forEach(function(e) {
  //   console.log("THE CURRENT EMOTION IS --> " + e.emo);
  //   console.log("IT HAS THESE RESULTS --> ");
  //   console.log("-----------------------------------------");
  // })

}