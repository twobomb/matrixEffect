var canvas,ctxW = 500,ctxH = 500,ctx;
$(function(){
	canvas =   document.createElement("canvas");
	canvas.width  = ctxW;
	canvas.height = ctxH;
	$("body").append(canvas);
	ctx = canvas.getContext("2d");
});