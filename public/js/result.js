var recordsFromDB;
var getDataFromDB=function(){
	ps=new ParticleSystem;
	emotionTypes=[];
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
var emotionTypes=[];
function setup(){ 
  getDataFromDB();
  var canvas=createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('canvasContainer');
  noStroke();


  // rectMode(RADIUS);
}


function draw(){
	clear();
	checkMousePosition();
	ps.run();
}

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
	    // console.log(e);
	    var a=width/emotionTypes.length;
	    var pos = createVector(i * a + a / 2,height - 50);
	    ps.addParticle(pos,e,property.color);
	})

	// sort into results
	ps.assort(records);
	ps.particles.forEach(function(e){
		// if(!e.results){
		// console.log(e);
	});

	buildBarChart();
	renderCards();

}

function checkMousePosition() {
	if(mouseY>height-200){
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


function buildBarChart(){

	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	var labellll=[];
	var dataaaaa=[];
	var colorrrr=[];
	ps.particles.forEach(function(e){
		labellll.push(e.emo);
		dataaaaa.push(e.results.length);
		colorrrr.push(e.c);
	});

	Chart.defaults.global.legend.display = false;
	Chart.defaults.global.tooltips.enabled=false;
	Chart.defaults.global.defaultFontFamily = 'Comfortaa';

	var data = {
	    // chart labels
	    labels: labellll,//["January", "February", "March", "April", "May"],
	    // array of datasets to plot
	    // could be only 1 if there's just 1 dataset

	    datasets: [
	        {
	            // label: "My First dataset",
	            backgroundColor: colorrrr,
	            // borderColor: "rgba(75,192,192,0.5)",
	            // borderWidth: 1,
	            data: dataaaaa
	        }
	    ]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#bar-chart-chart-options


	var options = {
		scales:{
			xAxes:[{
				gridLines:{
					display:false,
				},
				barPercentage:1,
				// position:"bottom",
				ticks:{
					fontColor:"#fff",
					fontSize:20
				}

			}],
			yAxes: [{
                display: false,
                // barThickness:40,
                // categoryPercentage:0.8,
				// barPercentage:0.5,
				ticks: {
					beginAtZero:true,
				}
            }],
		}
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("barChart").getContext("2d");
	
	// now, create the bar chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myBarChart = new Chart(ctx, {
	    type: 'bar',
	    // type: 'horizontalBar', // horizontal bards
	    data: data,
	    options: options
	});
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

function renderCards(){
	console.log(records);
	$('#cardHolder').empty();
	records.forEach(function(e){
		var htmlToAdd ='<div class="col-sm-3"><div class="card"><h5>'+e.emotions+
		'</h5><p><span>Location: </span>'+e.place+'</p><p><span>With </span>'+
		e.people+'</p><p><span>Activity: </span>'+e.things+'</p><p>'+
		e.steps+'<span> steps taken</span></p><p><span>Weather: </span>'+
		e.weather+'</p><p><span>Sleep Quality: </span>'+
		e.sleepQuality+'%</p><p><span>Sleep for </span>'+e.sleepTime+'h last night</p><button type="button" id="'+
		e._id+'" onclick="deleteRecord(event)">Delete</button><button type="button" id="'+
		e._id+'" onclick="editRecord(event)">Edit</button></div></div>';
		$('#cardHolder').append(htmlToAdd);
	})
}

function deleteRecord(){
	var targetedId = event.target.id;
	console.log('the record to delete is ' + targetedId);

	// now, let's call the delete route with AJAX
	jQuery.ajax({
		url : '/api/delete/'+targetedId,
		dataType : 'json',
		success : function(response) {
			// now, let's re-render the animals
			getDataFromDB();
		}
	})

	event.preventDefault();
}

// function buildBubbleChart(){
// 	var data = {
//     datasets: [
//         {
//             label: 'First Dataset',
//             data: [
//                 {
//                     x: 20,
//                     y: 30,
//                     r: 15
//                 },
//                 {
//                     x: 40,
//                     y: 10,
//                     r: 10
//                 }
//             ],
//             backgroundColor:"#FF6384",
//             hoverBackgroundColor: "#FF6384",
//         }]
// 	};
// 	var options={
// 	        elements: {
// 	            points: {
// 	                borderWidth: 1,
// 	                borderColor: 'rgb(0, 0, 0)'
// 	            }
// 	        }
// 	    };

// 	var ctx = document.getElementById("bubbleChart").getContext("2d");
// 	var myBubbleChart = new Chart(ctx,{
// 	    type:"bubble",
// 	    data:data,
// 	    options: options
// 	});
// }