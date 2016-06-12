function createSquare(){
	var square = createFace('yellow');
		square.points = new Array();
		square.points[0] = createPoint(1,	1,	5,1);
		square.points[1] = createPoint(50,	1,	5,1);
		square.points[2] = createPoint(50,	50,	5,1);
		square.points[3] = createPoint(1,	50,	5,1);
		
		
	var matrix = createTranslationMatrix(100,200,30);
	var matrix2 = createScaleMatrix(2,2,1);

	square.applyMatrix(matrix);
	//square.applyMatrix(matrix2);
		
	return square;
}

function createTriangle(){
	var square = createFace('blue');
		square.points = new Array();
		square.points[0] = createPoint(0,	0,	0,1);
		square.points[1] = createPoint(-50,	150,	0,1);
		square.points[2] = createPoint(150,	150,	0,1);
		
	return square;
}

function createConcave(){
	var square = createFace('grey');
		square.points = new Array();
		square.points[0] = createPoint(1,	1,	1,1);
		square.points[1] = createPoint(50,	1,	1,1);
		square.points[2] = createPoint(50,	15,	1,1);
		square.points[3] = createPoint(35,	15,	1,1);
		square.points[4] = createPoint(35,	35,	1,1);
		square.points[5] = createPoint(50,	35,	1,1);
		square.points[6] = createPoint(50,	50,	1,1);
		square.points[7] = createPoint(1,	50,	1,1);
		
	var matrix = createTranslationMatrix(50,50,10);
	var matrix2 = createScaleMatrix(2,2,1);

	square.applyMatrix(matrix);
	square.applyMatrix(matrix2);
		
	return square;
}

function createCube(){
	var cube = new Array();
	
	var frontFace = createFace('white');
		frontFace.points = new Array();
		frontFace.points[0] = createPoint(1,1,1,1);
		frontFace.points[1] = createPoint(1,2,1,1);
		frontFace.points[2] = createPoint(2,2,1,1);
		frontFace.points[3] = createPoint(2,1,1,1);
		
	var backFace = createFace('yellow');
		backFace.points = new Array();
		backFace.points[0] = createPoint(1,1,2,1);
		backFace.points[1] = createPoint(2,1,2,1);
		backFace.points[2] = createPoint(2,2,2,1);
		backFace.points[3] = createPoint(1,2,2,1);
		
	var topFace = createFace('red');
		topFace.points = new Array();
		topFace.points[0] = createPoint(1,1,1,1);
		topFace.points[1] = createPoint(2,1,1,1);
		topFace.points[2] = createPoint(2,1,2,1);
		topFace.points[3] = createPoint(1,1,2,1);
		
	var rightFace = createFace('blue');
		rightFace.points[0] = createPoint(2,1,1,1);
		rightFace.points[1] = createPoint(2,2,1,1);
		rightFace.points[2] = createPoint(2,2,2,1);
		rightFace.points[3] = createPoint(2,1,2,1);
		
	var leftFace = createFace('green');
		leftFace.points[0] = createPoint(1,1,1,1);
		leftFace.points[1] = createPoint(1,1,2,1);
		leftFace.points[2] = createPoint(1,2,2,1);
		leftFace.points[3] = createPoint(1,2,1,1);
		
	var bottomFace = createFace('orange');
		bottomFace.points[0] = createPoint(1,2,1,1);
		bottomFace.points[1] = createPoint(1,2,2,1);
		bottomFace.points[2] = createPoint(2,2,2,1);
		bottomFace.points[3] = createPoint(2,2,1,1);
		
	var scaleMatrix = createScaleMatrix(15,15,15);
	var transMatrix = createTranslationMatrix(10,10,0);
	
	cube[0] = frontFace;
	cube[1] = backFace;
	cube[2] = topFace;
	cube[3] = rightFace;
	cube[4] = leftFace;
	cube[5] = bottomFace;
	

	for(var i = 0;i<cube.length;i++){
		cube[i].applyMatrix(scaleMatrix);
		cube[i].applyMatrix(transMatrix);
	}
	
	return cube;
}

function createCubeFace(){
	var cube = new Array();
	
	var rightFace = createFace('red');
		rightFace.points[0] = createPoint(2,1,1,1);
		rightFace.points[1] = createPoint(2,2,1,1);
		rightFace.points[2] = createPoint(2,2,2,1);
		rightFace.points[3] = createPoint(2,1,2,1);
		
	var scaleMatrix = createScaleMatrix(10,10,10);
	
	var translationMatrix = createTranslationMatrix(-600,-200,10);
	
	cube[0] = rightFace;

	for(var i = 0;i<cube.length;i++){
		cube[i].applyMatrix(scaleMatrix);
		cube[i].applyMatrix(translationMatrix);
	}
	
	return cube;
}


function zBufferTest2(){

	//middle
	var cube1 = createCube();
	
	//north
	var cube2 = createCube();
	
	//west
	var cube3 = createCube();
	
	//top
	var cube4 = createCube();
	
	var cubeWidth = cube1[0].points[1].x-cube1[0].points[2].x;
	
	var eastMatrix = createTranslationMatrix(cubeWidth,0,0);
	var northMatrix = createTranslationMatrix(0,cubeWidth,0);
	
	applyMatrix(cube2,northMatrix);
	
	applyMatrix(cube3,eastMatrix);
	
	applyMatrix(cube4,northMatrix);
	applyMatrix(cube4,eastMatrix);
	
	var distance = 0;
	var trans = createTranslationMatrix(-distance,-distance,0);
	
	applyMatrix(cube1,trans);
	applyMatrix(cube2,trans);
	applyMatrix(cube3,trans);
	applyMatrix(cube4,trans);
	
	var faces = new Array();
		faces.push.apply(faces,cube1);
		faces.push.apply(faces,cube2);
		//faces.push.apply(faces,cube3);
		//faces.push.apply(faces,cube4);
		
		
		
		
	return faces;
}

function applyMatrix(polygon,matrix){
	for(var i=0;i<polygon.length;i++){
		polygon[i].applyMatrix(matrix);
	}
}


function createRandomCubes(){
	var firstCube = createCube();
	
	var cubeWidth = firstCube[0].points[1].x-firstCube[0].points[2].x+1;
	
	var maxWidth = 25;
	var maxDepth = 15;
	var numberOfCubes = 60;
	
	var x,z;
	var matrix;
	var cube;
	var cubes = new Array();
	
	for(var i=0;i<numberOfCubes;i++){
		x = Math.round(Math.random()*maxWidth)-(maxWidth/2);
		y = Math.round(Math.random()*maxDepth)-(maxDepth/2);
		
		matrix = createTranslationMatrix(x*cubeWidth,y*maxDepth,0);
		
		cube = createCube();
		cube.x = x;
		cube.y = y;
		
		applyMatrix(cube,matrix);
		
		cubes.push.apply(cubes,cube);
	}
	
	return cubes;
}

function zBufferTest(){
	var rightCube = createCube();
	var leftCube = createCube();
	
	var cubeWidth = leftCube[0].points[1].x-leftCube[0].points[2].x;
	
	var eastMatrix = createTranslationMatrix(cubeWidth,0,0);
	var northMatrix = createTranslationMatrix(0,cubeWidth,0);
	
	applyMatrix(rightCube,northMatrix);
	applyMatrix(rightCube,eastMatrix);
	applyMatrix(leftCube,eastMatrix);
	
	var faces = new Array();
		faces.push.apply(faces,leftCube);
		faces.push.apply(faces,rightCube);
		
	
		
	return faces;
}

function testGetZFunction(){

	var p1 = createPoint(1.123456789,123,1123.1289,1);
	var p2 = createPoint(1.123456789,-223,123.123456789,1);
	var p3 = createPoint(123.08583,-2.123456789,1.123456789,1);
	
	var face = createFace('white');
		face.points[0] = p1;
		face.points[1] = p2;
		face.points[2] = p3;
		face.applyNormal();
		
	var z = face.getZ(p1.x,p1.y);
		console.log('z before:'+p1.z+', after:'+z);
		console.log('difference: '+Math.abs(p1.z-z));
		
	z = face.getZ(p2.x,p2.y);
		console.log('z before:'+p2.z+', after:'+z);
		console.log('difference: '+Math.abs(p2.z-z));
		
	z = face.getZ(p3.x,p3.y);
		console.log('z before:'+p3.z+', after:'+z);
		console.log('difference: '+Math.abs(p3.z-z));
		
}