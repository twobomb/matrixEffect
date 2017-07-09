var canvas,ctxW =1000,ctxH = 500,ctx;
$(function(){
	ctxW = $(document).width();
	ctxH = $(document).height();
	canvas =   document.createElement("canvas");
	canvas.width  = ctxW;
	canvas.height = ctxH;
	$("body").append(canvas);
	ctx = canvas.getContext("2d");
	handler();
});
var layers = {
	symbols:"01234刃難雪次述令戸",
	minIndent:5,
	maxIndent:10,
	vIndent:10,//верт отступ
	speedMin:7,
	speedMax:17,
	sizeMin:10,
	sizeMax:25,
	countSizeMax:100,
	countSizeMin:10,
	maxObjects:80,
	fontName:"PT Sans",
	noCollision:true,
	getRS:function () {
		return this.symbols[getRandomInt(0,this.symbols.length-1)];
	},
	generateLine:function () {
		var s = "";
		var countS = getRandomInt(this.countSizeMin,this.countSizeMax);
		for(var i = 0; i< countS;i++)
			s+=this.getRS();
		var speed = getRandom(this.speedMin,this.speedMax);
		var size = getRandomInt(this.sizeMin,this.sizeMax);
		var ln,x;
			x = getRandom(0, ctxW);
			ln = new line(s, x, speed, size);
			if (this.noCollision) {
				for (var i = 0; i < this.data.length; i++) {
					var r1 = this.data[i].getRect();
					var r2 = ln.getRect();
					if (r1.x + r1.w > r2.x && r1.x < r2.x + r2.w &&
						r1.y + r1.h > r2.y && r1.y < r2.y + r2.h) {
						return false;
					}
				}
			}
		return ln;
	},
	checker:function(){
			for(var i = 0; i < this.data.length;i++)
				if(this.data[i].getUpY()> ctxH)
					this.data.splice(i--,1);
			var it = this.maxObjects - this.data.length ;
			while(it-- > 0){
				var l =this.generateLine();
				if(l)
					this.data.push(l);
			}
	},
	draw:function(){
		this.data.map(function (el) {
			el.draw();
		})
	},
	data:[]
};
function line(sArr,x,speed,size){
	this.sArr = sArr;
	this.x = x;
	this.vIndent = layers.vIndent;
	this.y = 0;
	this.speed = speed;
	this.size = size;
	this.getUpY = function () {
		return this.y+this.vIndent - (this.size+this.vIndent)*this.sArr.length;
	};
	this.getRect = function () {
		ctx.font = this.size +"px "+layers.fontName;
		return {
			w:ctx.measureText(sArr[0]).width,
			x:this.x,
			y:this.getUpY(),
			h:(this.size+this.vIndent)*this.sArr.length-1
		};
	};
	this.draw = function () {
		// ctx.strokeStyle = "#0F0";
		// var r = this.getRect();
		// ctx.strokeRect(r.x,r.y,r.w,r.h);

		var grd=ctx.createLinearGradient(ctxW/2,0,ctxW/2,ctxH);
		grd.addColorStop(0,"#999");
		grd.addColorStop(0.5,"#00ff00");
		grd.addColorStop(1,"#89ff89");

		ctx.fillStyle=grd;
		ctx.font = this.size +"px "+layers.fontName;
		for(var i = 0,offY = this.y; i < this.sArr.length;i++){
			if(offY < ctxH)
				ctx.fillText(this.sArr[i],this.x,offY);
			offY-=this.size + this.vIndent;
			if(offY < -this.size)
				break;
		}
		this.y +=this.speed;
	}
}
function getRandom(min,max){
	return Math.random() * (max - min) + min;
}
function getRandomInt(min,max){
	return Math.round(Math.random() * (max - min) + min);
}
function handler() {
	ctx.clearRect(0,0,ctxW,ctxH);
	layers.checker();
	layers.draw();
	setTimeout(handler,1000/60);
}