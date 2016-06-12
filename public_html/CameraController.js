function createCameraController(){

	var controller = new Object();
		controller.xRotation = 0;
		controller.yRotation = 0;
		controller.zRotation = 0;
		controller.xTrans    = 0;
		controller.yTrans    = 0;
		controller.zTrans    = 0;
	
		controller.getCameraMatrix = function(COPDistance){
		
			var trans1    = createTranslationMatrix(0,0,-COPDistance);
			var rotateX = createRotationMatrixX(controller.xRotation);
			var rotateY = createRotationMatrixY(controller.yRotation);
			var rotateZ = createRotationMatrixZ(controller.zRotation);
			var trans2    = createTranslationMatrix(0,0,COPDistance);
			
			var rotateMatrix = rotateX.multiplyMatrix(rotateY).multiplyMatrix(rotateZ);			
			var transRotateMatrix = trans1.multiplyMatrix(rotateMatrix).multiplyMatrix(trans2);
			
			var transMatrix = createTranslationMatrix(controller.xTrans,controller.yTrans,controller.zTrans);
			
			return transMatrix.multiplyMatrix(transRotateMatrix);
		}
		
		controller.moveXRotation = function(val){
			this.xRotation = this.xRotation+val;
		}
		
		controller.moveYRotation= function(val){
			this.yRotation = this.yRotation+val;
		}
		
		controller.moveZRotation= function(val){
			this.zRotation = this.zRotation+val;
		}
		
		controller.moveXTrans= function(val){
			this.xTrans = this.xTrans+val;
		}
		
		controller.moveYTrans= function(val){
			this.yTrans = this.yTrans+val;
		}
		
		controller.moveZTrans= function(val){
			this.zTrans = this.zTrans+val;
		}
		
		controller.resetCamera= function(){
			this.xRotation = 0;
			this.yRotation = 0;
			this.zRotation = 0;
			this.xTrans    = 0;
			this.yTrans    = 0;
			this.zTrans    = 0;
		}
		
		return controller;
	
}