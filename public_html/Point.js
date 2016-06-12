function createPoint(
	x,
	y,
	z,
	p){
	var point = new Object();
		point.x=x;
		point.y=y;
		point.z=z;
		point.p=p;
		point.applyMatrix = function (matrix){
			var newX = (this.x*matrix.a1)+(this.y*matrix.a2)+(this.z*matrix.a3)+(this.p*matrix.a4);
			var newY = (this.x*matrix.b1)+(this.y*matrix.b2)+(this.z*matrix.b3)+(this.p*matrix.b4);
			var newZ = (this.x*matrix.c1)+(this.y*matrix.c2)+(this.z*matrix.c3)+(this.p*matrix.c4);
			var newP = (this.x*matrix.d1)+(this.y*matrix.d2)+(this.z*matrix.d3)+(this.p*matrix.d4);
			return createPoint(newX,newY,newZ,newP);
		}
		point.toString = function(){
			var result = '(x:'+this.x+', y:'+this.y+')';
			return result;
		}
		point.equals = function(point){
			if(this.x==point.x&&this.y==point.y&&this.z==point.z){
				return true;
			}
			return false;
		}
		point.clone = function(){
			return createPoint(this.x,this.y,this.z,this.p);
		}
		point.applyP = function(){
			this.x = this.x/this.p;
			this.y = this.y/this.p;
			this.z = this.z/this.p;
		}
		point.difference = function(point){
			var vX = this.x-point.x;
			var vY = this.y-point.y;
			var vZ = this.z-point.z;
			
			return createPoint(vX,vY,vZ,1);
		}
		point.normalize = function(){
			var magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
			this.x = this.x/magnitude;
			this.y = this.y/magnitude;
			this.z = this.z/magnitude;
		}
		point.inBoundaries = function(minX,maxX,minY,maxY,minZ,maxZ){
			if (!(this.x>=minX)
				&& (this.x<=maxX)
				&& (this.y>=minY)
				&& (this.y<=maxY)
				&& (this.z>=minZ)
				&& (this.z<=maxZ)){
				console.log(this.x>=minX)
				console.log(this.x<=maxX)
				console.log(this.y>=minY)
				console.log(this.y<=maxY)
				console.log(this.z>=minZ)
				console.log(this.z<=maxZ)
				}
			return (this.x>=minX)
				&& (this.x<=maxX)
				&& (this.y>=minY)
				&& (this.y<=maxY)
				&& (this.z>=minZ)
				&& (this.z<=maxZ);
		}
	return point;
}