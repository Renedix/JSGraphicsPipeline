var lineColor = 'black';

function createZBuffer(x,y,width,height,color){
	var object = new Object();
		object.x = Math.round(x);
		object.y = Math.round(y);
		object.width = width;
		object.height = height;
		object.maxX = Math.round(width)+object.x;
		object.maxY = Math.round(height)+object.y;
		object.color=color;
		object.zbuffer;
		
		object.drawBackground = function(CTX){
			CTX.fillStyle=this.color;
			CTX.fillRect(this.x,this.y,this.width,this.height);
			this.zbuffer = new Array();
		}
		
		object.drawFaces = function(CTX,face){
			var point1;
			var point2;
			
			//go through all faces, draw the points
			for(var i=1;i<=face.points.length;i++){
				point1 = face.points[i-1];
				if(i==face.points.length){
					point2 = face.points[0];
				}else{
					point2 = face.points[i];
				}
				this.drawLine(CTX,point1,point2,face);
			}
		}
		
		object.drawPixel = function(CTX,x,y,z,color,face){
			if (!(x>this.x&&x<this.maxX&&y>this.y&&y<this.maxY)){
				return;
			}
			
			var pixelColumn = this.zbuffer[x];
			if (pixelColumn==null){
				CTX.fillStyle = color;
				CTX.fillRect(x,y,1,1);
				this.zbuffer[x] = new Array();
				this.zbuffer[x][y] = this.createBuffPixel(color,z,face);
			}else if(pixelColumn[y]==null){
				CTX.fillStyle = color;
				CTX.fillRect(x,y,1,1);
				this.zbuffer[x][y] = this.createBuffPixel(color,z,face);
			}else{
				var pixel = pixelColumn[y];
				if (pixel.z>z){
					CTX.fillStyle = color;
					CTX.fillRect(x,y,1,1);
					this.zbuffer[x][y] = this.createBuffPixel(color,z,face);
				}
			}
			
		}
		
		object.createBuffPixel = function(color,z,face){
			var object = new Object();
				object.color = color;
				object.z     = z;
				object.face  = face;
			return object;
		}
		
		object.drawLineHorizontalLineWE = function(CTX, p1x, p2x, y,face){
			
			var fromX;
			var toX;
			var pixelText = "";
			
			if (p1x<p2x){
				fromX = p1x;
				toX = p2x;
			}else{
				fromX = p2x;
				toX = p1x;
			}
			
			var x = Math.round(fromX);
			var xIncrement = 1;
			
			pixelText = "for Y="+y+":\n";
			while (x <= toX){
				pixelText = pixelText+", "+x;
				z = face.getZ(x,y);
				this.drawPixel(CTX,x,y,z,face.color,face);
				x=x+xIncrement;
			}
		}
		
		object.drawLine = function(CTX, p1, p2, face){			
			if (p1.x==p2.x&&p1.y==p2.y){return;}
		
			var x = p1.x;
			var y = p1.y;
			var z;
			
			var yIncrement;
			if (p1.y<p2.y){
				yIncrement = 1;
			}else{
				yIncrement = -1;
			}
			
			var xIncrement;
			if (p1.x<p2.x){
				xIncrement = 1;
			}else{
				xIncrement = -1;
			}
			
			var yDif = Math.abs(p1.y-p2.y);
			var xDif = Math.abs(p1.x-p2.x);
		
			if (p1.y==p2.y){//horizontal line
				while (x != p2.x+xIncrement){
					z = face.getZ(x,y);
					this.drawPixel(CTX,x,y,z,lineColor);
					x=x+xIncrement;
				}
			}
			else if(p1.x==p2.x){//Vertical line
				while (y != p2.y+yIncrement){
					z = face.getZ(x,y);
					this.drawPixel(CTX,x,y,z,lineColor);
					y=y+yIncrement;
				}
				
			}else if(xDif>yDif){
				
				var errorAdjustment = Math.abs(yDif/xDif);
				var error = 0;
				
				while (x!= p2.x+xIncrement){
					z = face.getZ(x,y);
					this.drawPixel(CTX,x,y,z,lineColor);
					error = error+errorAdjustment;
					if(error>=0.5){
						y=y+yIncrement;
						error = error - 1;
					}
					x = x+xIncrement;
				}
			}else if(xDif<yDif){
				var errorAdjustment = Math.abs(xDif/yDif);
				var error = 0;
				
				while (y!= p2.y+yIncrement){
					z = face.getZ(x,y);
					this.drawPixel(CTX,x,y,z,lineColor);
					error = error+errorAdjustment;
					if(error>=0.5){
						x=x+xIncrement;
						error = error - 1;
					}
					y = y+yIncrement;
				}
			
			}else{
				while (x!=p2.x){
					z = face.getZ(x,y);
					this.drawPixel(CTX,x,y,z,lineColor);
					x = x+xIncrement;
					y = y+yIncrement;
				}
			}
		}
	
	return object;
}











