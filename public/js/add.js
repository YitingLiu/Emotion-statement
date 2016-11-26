
//-------------------------------p5---------------
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
    var text=createElement("h4",this.emo);
    text.position(pos.x,pos.y);
    text.parent('canvasContainer');
    pop();
  }
}

var emotionsText = ["Joy", "Sadness", "Trust", "Fear", "Disgusting", "Satisfied", "Anger", "Surprise", "Anitcipatoin"];

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

function setup(){
  var canvas=createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('canvasContainer');
  noStroke();

  var emotions=[];
  emotionsText.forEach(function(e){
    var pos = createVector(randomGaussian(width / 2, 200), randomGaussian(height / 2, 200));
    emotions.push(new Emotion(pos, e, random(colors)));
  })
  emotions.forEach(function(e){
    e.render();
  })



//-------------JQuery---------

var selectedEmotions=[];

$('h4').click(function(){
  var e=$(this).html();
  if($(this).hasClass("selected")){
    //remove class selected
    $(this).removeClass('selected');
    var index=selectedEmotions.indexOf(e);
    if(index>-1){
      selectedEmotions.splice(index,1);
    }
  } else{
    $(this).addClass('selected');
    selectedEmotions.push(e);
  }

  var emotionInput=document.getElementById('emotionInput');
  emotionInput.value="";
  selectedEmotions.forEach(function(e){
    if(emotionInput.value==""){
      emotionInput.value += e;
    } else {
      emotionInput.value+=","+e;
    }
  })
})



// function getValue(){
//   // console.log(event.target);

//   // var emotion = event.target.innerHTML;
//   // console.log(emotion);

//   var emotionInput=document.getElementById('emotionInput');

//   if(emotionInput.value==""){
//       emotionInput.value += emotion;
//   } else {
//     emotionInput.value+=","+emotion;
//   }
// }

}







