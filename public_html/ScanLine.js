function initializeScanLine(faces){
	//local
	var face;
	var point1;
	var point2;
	var prevPoint;
	var edge;

	var ScanLine = new Object();
		ScanLine.unprocessedEdges = new Array();
		ScanLine.unprocessedEdgesBackup = new Array();
		ScanLine.minY;
	
	ScanLine.createEdgeRecord = function(p1,p2,face,id){
		var m = (p2.x-p1.x)/(p2.y-p1.y);
		var maxY;
		var minY;
		var x;
		
		if (p1.y>p2.y){
			maxY = p1.y;
			minY = p2.y;
			x = p2.x;
		}
		else{
			maxY = p2.y;
			minY = p1.y;
			x = p1.x;
		}
		
		if (p1.x==p2.x){
			m = 0;
		}
		
		var object = new Object();
			object.m = m;
			object.x    = x;
			object.minY = minY;
			object.maxY = maxY;
			object.face = face;
			object.id = id;
			
		if (maxY==minY){
			return null;
		}
			
		return object;
	}
	
	ScanLine.removeActiveEdges = function(activeEdges,currentY){
		var edge;
		for(var i=0;i<activeEdges.length;i++){
			edge = activeEdges[i];
			if (edge.maxY<=currentY){
				activeEdges.splice(i,1);
				i--;
			}
		}
		return activeEdges;
	}
	
	ScanLine.addNextEdges = function(y,activeEdges){
		var edge;
		var newEdge;
		
		for(var i=0;i<this.unprocessedEdges.length;i++){
			minY = this.unprocessedEdges[i].minY;
			maxY = this.unprocessedEdges[i].maxY;
			if (y<minY){
				break;
			}
			
			if(y>=minY && y<maxY){
				newEdge = this.unprocessedEdges.splice(i,1)[0];
				activeEdges.push(newEdge);
				i--;
			}else if(y==maxY){
				newEdge = this.unprocessedEdges.splice(i,1)[0];
				i--;
			}
		}
		
		return activeEdges;
	}
	
	ScanLine.draw = function(CTX, zBuffer, maxX){
	
		var activeEdges = new Array();
		var y = Math.round(this.minY);
		var parity;
		var edge;
		var toX;
		
		//until there are no edges to process..
		while (activeEdges.length > 0 || this.unprocessedEdges.length>0){
			parity = 0;		

			//Pull from unprocessedEdges to activeEdges
			activeEdges = this.addNextEdges(y,activeEdges);

			activeEdges.sort(function(a,b){
				return (a.id+(a.x/1000))-(b.id+(b.x/1000));
			});
			
			for(var i=0;i<activeEdges.length;){
				zBuffer.drawLineHorizontalLineWE(CTX, activeEdges[i].x, activeEdges[i+1].x, y,activeEdges[i].face);
				activeEdges[i].x   = activeEdges[i].x  +activeEdges[i].m;
				activeEdges[i+1].x = activeEdges[i+1].x+activeEdges[i+1].m;
				i=i+2;
			}
			
			//Remove finished edges
			activeEdges = this.removeActiveEdges(activeEdges,y+1);
			
			y++;
		}
	}
		
	//Loop through every pair of points of every face and add it to the globalEdgeList
	for (var i=0;i<faces.length;i++){
		facePoints = faces[i].points;
		for (var j=0;j<facePoints.length;j++){
			if (j==0){
				point1 = facePoints[facePoints.length-1];
			}else{
				point1 = facePoints[j-1];
			}
			
			point2 = facePoints[j];
			
			edge = ScanLine.createEdgeRecord(point1,point2,faces[i],i);
		
			if(edge!=null){
				ScanLine.unprocessedEdges.push(edge);
			}
			
			if (ScanLine.minY>point1.y||j==0&&i==0){
				ScanLine.minY = point1.y;
			}
		}
	}
	
	//Order the edges by minY, face, minX
	ScanLine.unprocessedEdges.sort(function(a,b){
		return ((1000*a.minY)+a.id+(a.x/1000))-((1000*b.minY)+b.id+(b.x/1000));
	});
	
	for(var i=0;i<ScanLine.unprocessedEdges.length;i++){
		ScanLine.unprocessedEdgesBackup.push(ScanLine.unprocessedEdges[i]);
	}
	
	//console.log(ScanLine.unprocessedEdgesBackup);
	
	return ScanLine;
}