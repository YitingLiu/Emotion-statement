//  JSON
var emoJSON={"Joy":{"pos":{"x":0.16,"y":0.47},"color":"rgba(255, 224, 130, 0.4)","size":95},"Sadness":{"pos":{"x":0.27,"y":0.61},"color":"rgba(197,225,165,0.4)","size":68},"Trust":{"pos":{"x":0.34,"y":0.37},"color":"rgba(255,204,128,0.4)","size":108},"Fear":{"pos":{"x":0.42,"y":0.56},"color":"rgba(255,171,145,0.4)","size":72},"Disgust":{"pos":{"x":0.54,"y":0.37},"color":"rgba(159,168,218,0.4)","size":91},"Satisfied":{"pos":{"x":0.57,"y":0.6},"color":"rgba(239,154,154,0.4)","size":85},"Anger":{"pos":{"x":0.71,"y":0.47},"color":"rgba(179,157,219,0.4)","size":96},"Surprise":{"pos":{"x":0.86,"y":0.6},"color":"rgba(244,143,177,0.4)","size":90},"Anticipation":{"pos":{"x":0.72,"y":0.25},"color":"rgba(206,147,216,0.4)","size":96},"Nervous":{"pos":{"x":0.85,"y":0.35},"color":"rgba(255, 224, 130, 0.4)","size":60}};
//-------------------------------p5 ---------------
var emotionsText = ["Joy", "Sadness", "Trust", "Fear", "Disgust", "Satisfied", "Anger", "Surprise", "Anticipation", "Nervous"];
// var colors = [
//   "rgba(255, 224, 130, 0.4)",
//   "rgba(197,225,165,0.4)",
//   "rgba(255,204,128,0.4)",
//   "rgba(255,171,145,0.4)",
//   "rgba(159,168,218,0.4)",
//   "rgba(239,154,154,0.4)",
//   "rgba(179,157,219,0.4)",
//   "rgba(244,143,177,0.4)",
//   "rgba(206,147,216,0.4)"
// ];

var ps;

function setup(){
  var canvas=createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('canvasContainer');
  noStroke();

  ps = new ParticleSystem();

  emotionsText.forEach(function(e){
    // console.log(emoJSON[e]);
    var property=emoJSON[e];
    var pos = createVector(property.pos.x,property.pos.y);
    ps.addParticle(pos,e,property.color);
  })
//-------------JQuery---------

  // var selectedEmotions=[];

  // $('h4').click(function(){
  //   var e=$(this).html();
  //   if($(this).hasClass("selected")){
  //     //remove class selected
  //     $(this).removeClass('selected');
  //     var index=selectedEmotions.indexOf(e);
  //     if(index>-1){
  //       selectedEmotions.splice(index,1);
  //     }
  //   } else{
  //     $(this).addClass('selected');
  //     selectedEmotions.push(e);
  //   }

  //   var emotionInput=document.getElementById('emotionInput');
  //   emotionInput.value="";
  //   selectedEmotions.forEach(function(e){
  //     if(emotionInput.value==""){
  //       emotionInput.value += e;
  //     } else {
  //       emotionInput.value+=","+e;
  //     }
  //   })
  // })
}

function draw(){
  clear();
  ps.run();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function mouseClicked() {
  var mousePos=createVector(mouseX/width,mouseY/height);  //percentage!!!
  for(var i=0;i<ps.particles.length;i++){
    var e=emotionsText[i];
    var pos = createVector(emoJSON[e].pos.x,emoJSON[e].pos.y);
    var distance = p5.Vector.dist(mousePos,pos);
    console.log(distance);
    if(distance<0.1){
      if(ps.particles[i].selected){
        ps.particles[i].selected=false;
      }else{
        ps.particles[i].selected=true;
      }
    }
    // console.log(emoJSON[e]);
  }
    getValue();
}

var selectedEmotions=[];

function getValue(){

  ps.particles.forEach(function(e){
    var index=selectedEmotions.indexOf(e.emo);
    if(e.selected){
      if(index<0){
        selectedEmotions.push(e.emo);
      }
    } else {
      if(index>-1){
        selectedEmotions.splice(index,1);
      }
    }
  })
  // console.log(event.target);
  // var emotion = event.target.innerHTML;
  console.log(selectedEmotions);

  var emotionInput=document.getElementById('emotionInput');
  emotionInput.value=""
  selectedEmotions.forEach(function(e){
    if(emotionInput.value==""){
      emotionInput.value += e;
    } else {
      emotionInput.value+=","+e;
    }
  })

}


  // var selectedEmotions=[];

  // $('h4').click(function(){
  //   var e=$(this).html();
  //   if($(this).hasClass("selected")){
  //     //remove class selected
  //     $(this).removeClass('selected');
  //     var index=selectedEmotions.indexOf(e);
  //     if(index>-1){
  //       selectedEmotions.splice(index,1);
  //     }
  //   } else{
  //     $(this).addClass('selected');
  //     selectedEmotions.push(e);
  //   }

  //   var emotionInput=document.getElementById('emotionInput');
  //   emotionInput.value="";
  //   selectedEmotions.forEach(function(e){
  //     if(emotionInput.value==""){
  //       emotionInput.value += e;
  //     } else {
  //       emotionInput.value+=","+e;
  //     }
  //   })
  // })







