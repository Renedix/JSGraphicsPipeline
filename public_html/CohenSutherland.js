
function cohenSutherLandClipPoints(points,view,damiensAdditionalLogic){
	var p1,p2;
	var pointResults;
	var newPoints = new Array();

	for (var i=1;i<=points.length;i++){
		var pnt1;
		var pnt2;
		if(i==points.length) {
			pnt1=i-1;
			pnt2=0;
		}else{
			pnt1=i-1;
			pnt2=i;
		}
		p1 = points[pnt1];
		p2 = points[pnt2];		
		
		pointResults = cohenSutherlandLineClip(p1,p2,view,damiensAdditionalLogic);
		
		//if it has to be drawn
		if (pointResults != null) {
			newPoints.push(pointResults[0]);
			newPoints.push(pointResults[1]);
		}
	}
	
	return newPoints;
}

function cohenSutherlandLineClip(point0,point1,view,damiensAdditionalLogic){
	var x0 = point0.x;
	var y0 = point0.y;
	var x1 = point1.x;
	var y1 = point1.y;

	var outcode0 = createOutcode(x0,y0,view);
	var outcode1 = createOutcode(x1,y1,view);
	var accept = false;
	
	var yMax = view.height+view.y;
	var xMax = view.width+view.x;
	var yMin = view.y;
	var xMin = view.x;
	
	//caught in infinite loop
	while(true){
		if((outcode0.isInside() && outcode1.isInside())){//if line is inside, then no need to do any calculations
			accept = true;
			break;
		} else if(outcode0.isOutside(outcode1)){
			if(damiensAdditionalLogic){
				var point0 = clipPoint(x0,y0,outcode0,view);
				var point1 = clipPoint(x1,y1,outcode1,view);
				x0 = point0.x;
				x1 = point1.x;
				y0 = point0.y;
				y1 = point1.y;
				accept = true;
				break;
			}else{
				break;
			}
		}else{ //otherwise, it could intersect the border. Need to do some calculations
			var x,y;
			var outcodeOut;
			
			//Atleast one point is outside the border, use it
			if(!outcode0.isInside()){
				outcodeOut = outcode0;
			}else{
				outcodeOut = outcode1;
			}
			
			//Find the intersection point
			if(outcodeOut.isTop()) {
				x = x0 + (x1-x0)*(yMin-y0)/(y1-y0);
				y = yMin;
			}else if(outcodeOut.isBottom()){
				x = x0 + (x1-x0)*(yMax-y0)/(y1-y0);
				y = yMax;
			}else if(outcodeOut.isRight()){
				y = y0 + (y1-y0) * (xMax - x0)/(x1-x0);
				x = xMax;
			}else if(outcodeOut.isLeft()){
				y = y0 + (y1-y0) * (xMin - x0)/(x1-x0);
				x = xMin;
			}
			
			//set the new point
			if (outcodeOut.equals(outcode0)) {
				x0 = x;
				y0 = y;
				outcode0 = createOutcode(x0,y0,view);
			}else{
				x1 = x;
				y1 = y;
				outcode1 = createOutcode(x1,y1,view);
			}
		}
	}
	
	if(accept==true){
		var newPoints = new Array();
			newPoints[0] = createPoint(Math.round(x0),Math.round(y0),1,1);
			newPoints[1] = createPoint(Math.round(x1),Math.round(y1),1,1);
		return newPoints;
	}
	return null;
}



function clipPoint(x,y,outcode,view){
	var newPoint;

	if (outcode.isTop() && outcode.isLeft()){
		newPoint = createPoint(view.x-1,view.y-1,1,1);
	}else if(outcode.isTop() && outcode.isRight()){
		newPoint = createPoint(view.x+view.width+1,view.y-1,1,1);
	}else if(outcode.isBottom() && outcode.isLeft()){
		newPoint = createPoint(view.x-1,view.y+view.height+1,1,1);
	}else if(outcode.isBottom() && outcode.isRight()){
		newPoint = createPoint(view.x+view.width+1,view.y+view.height+1,1,1);
	}else if(outcode.isTop()){
		newPoint = createPoint(x,view.y-1,1,1);
	}else if(outcode.isRight()){
		newPoint = createPoint(view.x+view.width+1,y,1,1);
	}else if(outcode.isBottom()){
		newPoint = createPoint(x,view.y+view.height+1,1,1);
	}else if(outcode.isLeft()){
		newPoint = createPoint(view.x-1,y,1,1);
	}else{
		newPoint = createPoint(x,y,1,1);;
	}
	
	return newPoint;
}