# JSGraphicsPipeline (Netbeans Project) - Version 1.5

An implementation of a 3D graphics pipeline in Javascript. Only fillRect(x,y,1,1) in html5 canvas to draw items on the screen. Everything from drawing polygons.

![alt tag](https://raw.githubusercontent.com/Renedix/JsGraphicsPipeline/master/public_html/Screenshot.png)


Click and drag the graphics area to rotate the camera.

## Pending items ##
 - Fix the 3D clipping issue
 - Refactor into single file

##1.0##
 - Relative sizing of border (complete)
 - Shared global graphical objects (complete)
 - Cohen Sutherland Line Clipping algorithm (complete)
 
##1.1##
 - Basic square controls (rotate-x,z, translate-x,y) (complete)
 - FIX Clipping of polygon now works correctly with some additional logic for lines outside of view (complete)
 - FIX Rounded coordinates before writing to screen (complete)
 - Perspective projection (in view D) (complete)
	- Perspective transformation needs to be calculated before the translation to view (complete)
	- Create a perspective projection (without matrix multiplication) (complete)
	
##1.2##
 - CHANGE - Changed the Drawers into a logical order (A - no clipping, B -  Cohen Sutherland, C - Cohen Sutherland + Additional Logic, D - Perspective) (complete)
 - Create a rotating X command (complete)
 - Create a cube (complete)
 - Back-face culling should be executed before everything (complete)
 - Have the cube in the centre of the screen, and have the controls rotate the cube in place (complete)
 
##1.3##
 - FIX Centre of projection distance is determined by the size of the view (complete)
 - Views and Drawers = the same thing. These two js files need to be merged together. (complete)
 - Removed other views (1,2,3) (complete)
 - Change camera angle (complete)
 - Generate multiple random cubes to test Z-Buffer Algorithm (complete)
 - Remove controls (complete)

##1.4##
 - (BEGIN) Z Buffer Algorithm
	- Create getZ function for a face (complete)
	- ZBuffer needs to be an object with methods (init'd in ViewDrawer) (complete)
	- FIX Cohensutherland Algorithm returned pair-duplicate points (complete)
	- Draw the outlines of the polygons (complete)
	
##1.4.5##
 - FIX Reverted Cohen Sutherland Algorithm (complete)
 - FIX Drawing the cube when it has been translated (complete)
 - FIX Draw background, then draw only the pixels that have been added (complete)
 - Scan Line, ZBuffer Algorithm (complete)
 
##1.5##
 - Camera Matrix extracted and handled by an external controller object (complete)
 - Camera rotation can be controlled by the mouse (complete)
 - Camera can be reset (complete)
