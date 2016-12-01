var recordsFromDB;
var getDataFromDB=function(){
	jQuery.ajax({
		url : '/api/get',
		dataType : 'json',
		success: function(response){
			// console.log(response);
			records=response.record;
			// console.log(records);
			renderEmotions(records);
		}
	})
}
var ps;

function setup(){ 
  var canvas=createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('canvasContainer');
  noStroke();
  rectMode(RADIUS);
  ps=new ParticleSystem;
  getDataFromDB();
}


function draw(){
	clear();
	checkMousePosition();
	ps.run();
}
/*
emotions:Array[2]
people:Array[1]
place:"soho"
sleepTime:9.44
steps:5674
temp:11
things:Array[1]
*/
var emotionTypes=[];
// var propertyLibrary=[{
// 		"x":0.6,
// 		"y":0.47,
// 		"color":"rgba(255, 224, 130, 0.4)",
// 		"size":95
// 	},{
// 		"x":0.27,
// 		"y":0.61,
// 		"color":"rgba(197,225,165,0.4)",
// 		"size":68
// 	},{
// 		"x":0.34,
// 		"y":0.37,
// 		"color":"rgba(255,204,128,0.4)",
// 		"size":108
// 	},{

// }];
// "Fear":{"pos":{"x":0.42,"y":0.56},"color":"rgba(255,171,145,0.4)","size":72},"Disgust":{"pos":{"x":0.54,"y":0.37},"color":"rgba(159,168,218,0.4)","size":91},"Satisfied":{"pos":{"x":0.57,"y":0.6},"color":"rgba(239,154,154,0.4)","size":85},"Anger":{"pos":{"x":0.71,"y":0.47},"color":"rgba(179,157,219,0.4)","size":96},"Surprise":{"pos":{"x":0.86,"y":0.6},"color":"rgba(244,143,177,0.4)","size":90},"Anticipation":{"pos":{"x":0.72,"y":0.25},"color":"rgba(206,147,216,0.4)","size":96},"Nervous":{"pos":{"x":0.85,"y":0.35},"color":"rgba(255, 224, 130, 0.4)","size":60}};
var emoJSON={"joy":{"pos":{"x":0.16,"y":0.47},"color":"rgba(255, 224, 130, 0.8)","size":95},
"sadness":{"pos":{"x":0.27,"y":0.61},"color":"rgba(197,225,165,0.8)","size":68},
"trust":{"pos":{"x":0.34,"y":0.37},"color":"rgba(255,204,128,0.8)","size":108},
"fear":{"pos":{"x":0.42,"y":0.56},"color":"rgba(255,171,145,0.8)","size":72},
"disgust":{"pos":{"x":0.54,"y":0.37},"color":"rgba(159,168,218,0.8)","size":91},
"satisfied":{"pos":{"x":0.57,"y":0.6},"color":"rgba(239,154,154,0.8)","size":85},
"anger":{"pos":{"x":0.71,"y":0.47},"color":"rgba(179,157,219,0.8)","size":96},
"surprise":{"pos":{"x":0.86,"y":0.6},"color":"rgba(244,143,177,0.8)","size":90},
"anticipation":{"pos":{"x":0.72,"y":0.25},"color":"rgba(206,147,216,0.8)","size":106},
"nervous":{"pos":{"x":0.85,"y":0.35},"color":"rgba(255, 224, 130, 0.8)","size":60}};

function renderEmotions(records){
	// get emotion types, store in emotionsText array!
	records.forEach(function(e){
		var emotionsArrayFromDB=e.emotions;
		emotionsArrayFromDB.forEach(function(emo){
			var index=emotionTypes.indexOf(emo);
			if(index<0){
	      		//not in the array, add a new emotionTypes
				emotionTypes.push(emo);
			} 
		});
	});	

	// create particles
	emotionTypes.forEach(function(e,i){
	    var property=emoJSON[e];
	    console.log(e);
	    var a=width/emotionTypes.length;
	    var pos = createVector(i * a + a / 2,height - 50);
	    ps.addParticle(pos,e,property.color);
	})

	// sort into results
	ps.assort(records);
	ps.particles.forEach(function(e){
		// if(!e.results){
			console.log(e);
	})

}

function checkMousePosition() {
	if(mouseY>height-100){
		var num=ps.particles.length;
		var a=width/num;
		ps.particles.forEach(function(e,i){
			if(mouseX>(i*a) && mouseX<(i*a+a)){
				e.renderResults=true;
				// if(e.needReset){
				// 	e.resultsParticleSystemReset();
				// }
				e.needReset=false;
				for(var j=0;j<ps.particles.length;j++){
					if(j!=i){
						ps.particles[j].renderResults=false;
						ps.particles[j].needReset=true;

					}
				}
			} 
		})
	}

  // var mousePos=createVector(mouseX/width,mouseY/height);  //percentage!!!

  // ps.particles.forEach(function(e){
  //   var distance = p5.Vector.dist(mousePos,e.pos);
  //   if(distance<0.1){
  //   	e.petal=true;
  //   } else {
		// e.petal=false;
  //   }
  // })
}

function mouseClicked(){

}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

  // for(var i=0;i<ps.particles.length;i++){

  //   var pos = createVector(emoJSON[e].pos.x,emoJSON[e].pos.y);
  //   var distance = p5.Vector.dist(mousePos,pos);
  //   console.log(distance);
  //   if(distance<0.1){
  //     if(ps.particles[i].selected){
  //       ps.particles[i].selected=false;
  //     }else{
  //       ps.particles[i].selected=true;
  //     }
  //   }
  //   // console.log(emoJSON[e]);
  // }
    // getValue();



// function toTitleCase(str)
// {
//     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// }