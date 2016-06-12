function getFaceToViewTranslation(view){
	var addX = view.x+(view.width/2);
	var addY = view.y+(view.height/2);
	
	return createTranslationMatrix(addX,addY,0);
}

function translateFaceToView(points,view){
	var addX = view.x+(view.width/2);
	var addY = view.y+(view.height/2);
	
	for(var i = 0;i < points.length;i++){
		points[i].x = points[i].x+addX;
		points[i].y = points[i].y+addY;
	}
	return points;
}

function drawPointsOnView(CTX,drawPoints){

	if (drawPoints!=null&&drawPoints.length>0){
		CTX.beginPath();
		CTX.moveTo(drawPoints[0].x,drawPoints[0].y);
		

		for (var i=1;i<drawPoints.length;i++){
			 if(i==1){
				var line = 'Drew line =  point '+drawPoints[0].toString()+', to point '+drawPoints[1].toString();
			 }else{
				var line = 'Drew line =  point '+drawPoints[i-1].toString()+', to point '+drawPoints[i].toString();
			 }
			 //console.log(line);
			 CTX.lineTo(drawPoints[i].x,drawPoints[i].y);
		}
		CTX.closePath();
		CTX.fill();
		
		//CTX.strokeStyle='black'
		//CTX.moveTo(drawPoints[0].x,drawPoints[0].y);

		for (var i=1;i<drawPoints.length;i++){
		//	 CTX.lineTo(drawPoints[i].x,drawPoints[i].y);
		}
		//CTX.closePath();
		//CTX.stroke();
	}
}

function cloneGlobals(faceGlobals){
	var faces = new Array();
	for(var i=0;i<faceGlobals.length;i++){
		faces[i] = faceGlobals[i].clone();
	}
	return faces;
}