//---------------------------------ADD-------------------------------//


function renderAllReports(){
	jQuery.ajax({
		url:'/api/get',
		dataType:'json',
		success:function(res){
			console.log(res);
		}
	})	
}


//---------------------------------ADD-------------------------------//
