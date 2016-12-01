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

function setup(){ 
  var canvas=createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('canvasContainer');
  getDataFromDB();
}

function draw(){

}

function renderEmotions(records){
	console.log(records);
}