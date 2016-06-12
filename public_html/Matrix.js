function createMatrix(
	a1,a2,a3,a4,
	b1,b2,b3,b4,
	c1,c2,c3,c4,
	d1,d2,d3,d4){
	var matrix = new Object();
		matrix.a1=a1;
		matrix.a2=a2;
		matrix.a3=a3;
		matrix.a4=a4;
		
		matrix.b1=b1;
		matrix.b2=b2;
		matrix.b3=b3;
		matrix.b4=b4;
		
		matrix.c1=c1;
		matrix.c2=c2;
		matrix.c3=c3;
		matrix.c4=c4;
		
		matrix.d1=d1;
		matrix.d2=d2;
		matrix.d3=d3;
		matrix.d4=d4;
		
		matrix.multiplyMatrix = function multiplyMatrices(m){
			var a1 = this.a1*m.a1 +
					 this.a2*m.b1 +
					 this.a3*m.c1 +
					 this.a4*m.d1 ;
					 
			var a2 = this.a1*m.a2 +
					 this.a2*m.b2 +
					 this.a3*m.c2 +
					 this.a4*m.d2 ;
					 
			var a3 = this.a1*m.a3 +
					 this.a2*m.b3 +
					 this.a3*m.c3 +
					 this.a4*m.d3 ;
					 
			var a4 = this.a1*m.a4 +
					 this.a2*m.b4 +
					 this.a3*m.c4 +
					 this.a4*m.d4 ;
					 
			var b1 = this.b1*m.a1 +
					 this.b2*m.b1 +
					 this.b3*m.c1 +
					 this.b4*m.d1 ;
					 
			var b2 = this.b1*m.a2 +
					 this.b2*m.b2 +
					 this.b3*m.c2 +
					 this.b4*m.d2 ;
					 
			var b3 = this.b1*m.a3 +
					 this.b2*m.b3 +
					 this.b3*m.c3 +
					 this.b4*m.d3 ;
					 
			var b4 = this.b1*m.a4 +
					 this.b2*m.b4 +
					 this.b3*m.c4 +
					 this.b4*m.d4 ;
					 
			var c1 = this.c1*m.a1 +
					 this.c2*m.b1 +
					 this.c3*m.c1 +
					 this.c4*m.d1 ;
					 
			var c2 = this.c1*m.a2 +
					 this.c2*m.b2 +
					 this.c3*m.c2 +
					 this.c4*m.d2 ;
					 
			var c3 = this.c1*m.a3 +
					 this.c2*m.b3 +
					 this.c3*m.c3 +
					 this.c4*m.d3 ;
					 
			var c4 = this.c1*m.a4 +
					 this.c2*m.b4 +
					 this.c3*m.c4 +
					 this.c4*m.d4 ;
					 
			var d1 = this.d1*m.a1 +
					 this.d2*m.b1 +
					 this.d3*m.c1 +
					 this.d4*m.d1 ;
					 
			var d2 = this.d1*m.a2 +
					 this.d2*m.b2 +
					 this.d3*m.c2 +
					 this.d4*m.d2 ;
					 
			var d3 = this.d1*m.a3 +
					 this.d2*m.b3 +
					 this.d3*m.c3 +
					 this.d4*m.d3 ;
					 
			var d4 = this.d1*m.a4 +
					 this.d2*m.b4 +
					 this.d3*m.c4 +
					 this.d4*m.d4 ;
					 
			return createMatrix(	a1,	a2,	a3, a4,
								b1, b2, b3, b4,
								c1, c2, c3, c4,
								d1, d2, d3, d4);
		}
	
	return matrix;
}

function createScaleMatrix(xScale,yScale,zScale){
	var matrix = createMatrix(xScale,0,		0,		0,
							 0,		yScale,	0,		0,
							 0,		0,		zScale, 0,
							 0,		0,		0,		1);
	return matrix;
}

function createTranslationMatrix(xTrans,yTrans,zTrans){
	var matrix = createMatrix(1,0,0,xTrans,
							 0,1,0,yTrans,
							 0,0,1,zTrans,
							 0,0,0,1);

	return matrix;
}

function createRotationMatrixZ(degrees){	
	var radians = degrees * (Math.PI / 180);

	var matrix = createMatrix(
	Math.cos(radians),	-Math.sin(radians),	0,	0,
	Math.sin(radians),	Math.cos(radians),	0,	0,
	0,					0,					1,	0,
	0,					0,					0,	1
	);
	
	return matrix;
}

function createRotationMatrixX(degrees){	
	var radians = degrees * (Math.PI / 180);

	var matrix = createMatrix(
	1,					0,	0,					0,
	0,	Math.cos(radians),	-Math.sin(radians),	0,
	0,	Math.sin(radians),	Math.cos(radians),	0,
	0,	0,					0,					1
	);
	
	return matrix;
}

function createRotationMatrixY(degrees){	
	var radians = degrees * (Math.PI / 180);

	var matrix = createMatrix(
	Math.cos(radians),	0,	Math.sin(radians),	0,
	0,					1,	0,					0,
	-Math.sin(radians),	0,	Math.cos(radians),	0,
	0,					0,	0,					1
	);
	
	return matrix;
}

function createTransRotateMatrixZ(degrees, xTrans, yTrans,zTrans){
	var mv1 = createTranslationMatrix(xTrans,yTrans,zTrans);
	
	var rt1 = createRotationMatrixZ(degrees);
	
	var mv2 = createTranslationMatrix(-xTrans,-yTrans,-zTrans);
	
	var combin1 = mv1.multiplyMatrix(rt1);
	var combin2 = combin1.multiplyMatrix(mv2);
	
	return combin2;
}

function createTransRotateMatrixX(degrees, xTrans, yTrans, zTrans){
	var mv1 = createTranslationMatrix(xTrans,yTrans,zTrans);
	
	var rt1 = createRotationMatrixX(degrees);
	
	var mv2 = createTranslationMatrix(-xTrans,-yTrans,-zTrans);
	
	var combin1 = mv1.multiplyMatrix(rt1);
	var combin2 = combin1.multiplyMatrix(mv2);
	
	return combin2;
}

function createPerspectiveMatrix(z0,scale){
	var varZ = 1/z0;
	
	var newMatrix = createMatrix(	scale,	0,		0,		0,
									0,		scale,	0,		0,
									0,		0,		0,		0,
									0,		0,		varZ,	1);
	
	return newMatrix;
}