// CUSTOM JS FILE //


function getValue(event){
	// console.log(event.target);

	var emotion = event.target.innerHTML;
	console.log(emotion);
	var emotionInput=document.getElementById('emotionInput');

	if(emotionInput.value==""){
			emotionInput.value += emotion;
	} else {
		emotionInput.value+=","+emotion;
	}
}

function renderAllReports(){
	jQuery.ajax({
		url:'/api/get',
		dataType:'json',
		success:function(res){
			console.log(res);
		}
	})	
}