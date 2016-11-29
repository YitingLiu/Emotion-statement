var emotionsText = ["Joy", "Sadness", "Trust", "Fear", "Disgusting", "Satisfied", "Anger", "Surprise", "Anitcipatoin"];
var emotionsFromDB;

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
  emotionsFromDB = loadJSON(url);
}

function setup() {
  emotionsFromDB = emotionsFromDB.emotions;
  createCanvas(window.innerWidth, window.innerHeight);
  // console.log(emotionsText);
  noStroke();

  var emotions = [];
  emotionsText.forEach(function(e) {
    var pos = createVector(randomGaussian(width / 2, 200), randomGaussian(height / 2, 200));
    emotions.push(new Emotion(pos, e, random(colors)));
  });
  emotions.forEach(function(e) {
    e.render();
    // let's look in our database results, and add a result to our emotion if the values match
    var currentEmotion = e.emo;
    //console.log("THE CURRENT EMOTION WE ARE LOOKING FOR --> " + currentEmotion)
    // loop through our emotionsFromDB array, and if the DB result matches our current emotion, 
    // then add that entry to our results for that emotion
    emotionsFromDB.forEach(function(emotionRecord) {
      var currentEmotionsFromDB = emotionRecord.emotions;
      //console.log("THE CURRENT DB RESULT --> " + currentEmotionsFromDB);
      if (currentEmotionsFromDB.indexOf(currentEmotion) > -1) {
        //In the array!
        e.results.push(emotionRecord);
      } else {
        //Not in the array
        return false;
      }
    })
  })


  emotions.forEach(function(e) {
    console.log("THE CURRENT EMOTION IS --> " + e.emo);
    console.log("IT HAS THESE RESULTS --> ");
    console.log("-----------------------------------------");
  })

}


function draw() {

}