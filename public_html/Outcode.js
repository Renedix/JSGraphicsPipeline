function createOutcode(x,y,view){
	var outcode = new Object();
		outcode.x = x;
		outcode.y = y;
		outcode.viewX = view.x;
		outcode.viewY = view.y;
		if (x<view.x){
			outcode.bit1 = true;
		}else{
			outcode.bit1 = false;
		}
		
		if (x>view.x+view.width){
			outcode.bit2 = true;
		}else{
			outcode.bit2 = false;
		}
		
		if (y>view.y+view.height){
			outcode.bit3 = true;
		}else{
			outcode.bit3 = false;
		}
		
		if (y<view.y){
			outcode.bit4 = true;
		}else{
			outcode.bit4 = false;
		}

		outcode.isLeft = function(){
				return this.bit1;
			}
		outcode.isRight = function(){
				return this.bit2;
			}
		outcode.isBottom = function(){
				return this.bit3;
			}
		outcode.isTop = function(){
				return this.bit4;
			}
		outcode.isInside = function(){
			return (!this.isTop() && !this.isBottom() && !this.isLeft() && !this.isRight());
			}
		outcode.isOutside = function(outcode){
			if ((this.isTop() && this.isTop()	== outcode.isTop()) 	||
				(this.isBottom() && this.isBottom()	== outcode.isBottom()) ||
				(this.isLeft() && this.isLeft()	== outcode.isLeft()) 	||
				(this.isRight() && this.isRight()	== outcode.isRight()) ){
				return true;
			}
			return false;
		}
		outcode.equals = function(outcode){
			if( this.isTop()	==outcode.isTop() 	&&
				this.isBottom()	==outcode.isBottom()&&
				this.isLeft()	==outcode.isLeft() 	&&
				this.isRight()	==outcode.isRight() ) {
				return true;
			}
			return false;
		}
		outcode.toString = function(){
			return 'top:'+this.isTop()+', bottom:'+this.isBottom()+', left:'+this.isLeft()+', right:'+this.isRight()+' x:'+this.x+', y:'+this.y+'\n viewX:'+this.viewX+', viewY:'+this.viewY;
		}
		
	return outcode;
}














