function createWindow(x,y,width,height,color,canvas){
	var bord = 0.008;
	var newWindow = new Object;
		newWindow.x		=x;
		newWindow.y		=y;
		newWindow.width	=width;
		newWindow.height=height;
		newWindow.color	=color;
		newWindow.canvas = canvas;
		newWindow.globalFaces = new Array();
			newWindow.globalFaces = createRandomCubes();
		
		moveFacesRight(newWindow.globalFaces);
		
		newWindow.view = createViewDrawer(
										x+(width*bord),/*X*/
										y+(height*bord),/*Y*/
										width*(1-2*bord),/*width*/
										height*(1-2*bord),/*height*/
										'grey',/*color*/
										newWindow.globalFaces);/*shared objects*/
		
		newWindow.draw	=function(CTX){
			this.canvas.width = this.canvas.width;
			CTX.fillStyle=this.color;
			CTX.fillRect(this.x,this.y,this.width,this.height);
			this.view.draw(CTX);
		}
		
		newWindow.getController = function(){
			return newWindow.view.cameraController;
		}
	return newWindow;
}

function moveFacesRight(faces){
	var matrix = createTranslationMatrix(50,100,0);
	for(var i =0;i<faces.length;i++){
		faces[i].applyMatrix(matrix);
	}
}