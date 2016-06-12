var debug = false;

function createFace(color){
	var face = new Object();
		face.color	= color;
		face.points = new Array();
		face.V1 = null;
		face.V2 = null;
		face.applyMatrix = function(matrix){
			for(var i=0;i<this.points.length;i++){
				this.points[i] = this.points[i].applyMatrix(matrix);
			}
		}
		face.normal = null;
		face.normalPoint = null;
		
		face.clone = function(){
			var newFace = createFace(color);
			for(var i=0;i<this.points.length;i++){
				newFace.points[i] = this.points[i].clone();
			}	
			return newFace;
		}
		
		face.toString = function(){
			var result = '';
			for(var i=0;i<this.points.length;i++){
				result += this.points[i].toString()+'\n';
			}
			return result;
		}
		
		face.applyNormal = function(){
			if (this.points.length<3){
				this.normal = null;
			}
			
			var p1 = this.points[0];
			var p2 = this.points[1];
			var p3 = this.points[2];
			
			this.V1 = p2.difference(p1);
			this.V2 = p3.difference(p1);
			
			//calculate cross product
			var newX = (this.V1.y*this.V2.z) - (this.V1.z*this.V2.y);
			var newY = (this.V1.z*this.V2.x) - (this.V1.x*this.V2.z);
			var newZ = (this.V1.x*this.V2.y) - (this.V1.y*this.V2.x);
			
			//calculate magnitude
			//var magnitude = Math.sqrt((newX * newX) + (newY * newY) + (newZ * newZ));
			
			//var newX = newX/magnitude;
			//var newY = newY/magnitude;
			//var newZ = newZ/magnitude;
			
			this.normal = createPoint(newX,newY,newZ,1);
			this.normalPoint = createPoint(p1.x,p1.y,p1.z,0);
		}
		
		face.getZ = function(x,y){
			
			var point = this.normalPoint;
					
			return 1/this.normal.z*(
					(this.normal.x*point.x) +
					(this.normal.y*point.y) +
					(this.normal.z*point.z) -
					(this.normal.x*x) -
					(this.normal.y*y)
			);
		}
		
	return face;
}