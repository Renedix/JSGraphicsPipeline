var useZBuffer = true;

function createViewDrawer(	x,
						y,
						width,
						height,
						color,
						faces){
	var drawer = new Object();
		drawer.width		=width;
		drawer.height		=height;
		drawer.color		=color;
		drawer.x			=x;
		drawer.y			=y;
		drawer.globalFaces  = faces;
		drawer.cameraController = createCameraController();
		
		/*Generate background image*/
		if (useZBuffer==true){
			drawer.zBuffer = createZBuffer(x,y,width,height,color);
		}
		
		/*Projection parameters*/
		drawer.COPDistance = width/2;
		drawer.perspectiveMatrix = createPerspectiveMatrix(drawer.COPDistance,1);
		drawer.cameraPosition = createPoint(0,0,-drawer.COPDistance,0);
		
		console.log(width/2);
		
		drawer.draw	=function(CTX){
			
			if (useZBuffer ==true) {
				this.zBuffer.drawBackground(CTX);
			}else{
				//draw background
				CTX.fillStyle=this.color;
				CTX.fillRect(this.x,this.y,this.width,this.height);
			}
			
			//Clone the globals, since they are shared.
			var faces = cloneGlobals(this.globalFaces);

			//Rotate Scene for Camera
			faces = applyMatrixToFaces(faces,drawer.cameraController.getCameraMatrix(drawer.COPDistance));
			
			//remove faces that are not facing the camera
			faces = backfaceCulling(faces,this.cameraPosition);
	
			for(var j=0;j<faces.length;j++){
				
				CTX.fillStyle=faces[j].color;
				
				var drawPoints = faces[j].points;
				
				//Transform into perspective projection
				drawPoints = transformToPerspective(drawPoints, this.perspectiveMatrix);
				
				//Translate the points to the ViewPort
				drawPoints = translateFaceToView(drawPoints,this);
				
				//Clip edges
				drawPoints = cohenSutherLandClipPoints(drawPoints,this,true);
				
				if (useZBuffer ==false){
					//draw on the 
					drawPointsOnView(CTX,drawPoints);
				}
				
				if(drawPoints!=null){
					faces[j].points = drawPoints;
				}else{
					faces.splice(j,1);
					j--;
				}
			}
			
			drawer.scanLine = initializeScanLine(faces);
			drawer.scanLine.draw(CTX,this.zBuffer,this.width+this.x);
		}
		
		//BORDERS
		drawer.getNorthBorder=function(){
			var points = new Array();
			
			points[0] = createPoint(this.x,this.y,1,1);
			points[1] = createPoint(this.x+this.width,this.y,1,1);
		
			return points;
		}
		drawer.getSouthBorder=function(){
			var points = new Array();
			
			points[0] = createPoint(this.x,this.y+this.height,1);
			points[1] = createPoint(this.x+this.width,this.y+this.height,1);
		
			return points;
		}
		drawer.getWestBorder=function(){
			var points = new Array();
			
			points[0] = createPoint(this.x,this.y,1,1);
			points[1] = createPoint(this.x,this.y+this.height,1,1);
		
			return points;
		}
		drawer.getEastBorder=function(){
			var points = new Array();
			
			points[0] = createPoint(this.x+this.width,this.y,1,1);
			points[1] = createPoint(this.x+this.width,this.y+this.height,1,1);
		
			return points;
		}

	return drawer;
}

function transformToPerspective(points,perspectiveMatrix){
	for(var i=0;i<points.length;i++){
		points[i] = points[i].applyMatrix(perspectiveMatrix);
		points[i].applyP();
	}
	return points;
}

function backfaceCulling(faces,cameraPosition){
	var facesToDraw = new Array();
	for(var i=0;i<faces.length;i++){
		//getFaceNormal
		faces[i].applyNormal();
		
		if (faces[i].normal != null) {
			//calculate dot product
			var dotProduct = calculateDotProduct(faces[i],cameraPosition);
			
			if (dotProduct>=0) {
				facesToDraw.push(faces[i]);
			}
		}
	}
	return facesToDraw;
}

function calculateDotProduct(face,cameraPosition){
	var a = face.normal;
	var v0 = face.points[0];
	var p = cameraPosition;
	
	var b = p.difference(v0);
	
	var dotProduct = a.x*b.x+a.y*b.y+a.z*b.z;
	
	return dotProduct;
}

function applyMatrixToFaces(faces,matrix){
	for(var i = 0;i<faces.length;i++){
		faces[i].applyMatrix(matrix);
	}
	return faces;
}

function toggleZBuffer(){
	if(useZBuffer==true){
		useZBuffer = false;
	}else{
		useZBuffer = true;
	}
	wind.draw(CTX);
}

function moveBack(faces,units){
	
	for(var i=0;i<faces.length;i++){
		faces[i] = applyMatrixToFaces(faces[i],transMatrix);
	}
	return faces;
}