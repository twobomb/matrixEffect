var canvas,ctxW = 500,ctxH = 500,ctx;
$(function(){
	canvas =   document.createElement("canvas");
	canvas.width  = ctxW;
	canvas.height = ctxH;
	$("body").append(canvas);
	ctx = canvas.getContext("2d");
	handler();
});
var layers = {
	symbols:"01",
	minIndent:5,
	maxIndent:10,
	vIndent:10,//верт отступ
	speedMin:1,
	speedMax:5,
	info:[
		{
			blur:6,
			size:10
		},
		{
			blur:3,
			size:15
		},
		{
			blur:0,
			size:20
		}
	],
	getRS:function () {
		return this.symbols[getRandomInt(0,this.symbols.length-1)];
	},
	init:function(){
			for(var i = 0 ; i < this.info.length;i++) {
				this.dataInfo.push([]);
				var arr = [];
				for (var  x = 0 + getRandom(this.minIndent, this.maxIndent); x < ctxW; x += +getRandom(this.minIndent, this.maxIndent)) {
					arr.push([this.getRS()]);
					this.dataInfo[i].push({
						offsetX:x,//отступ,x
						speed: getRandom(this.speedMin,this.speedMax),//Скорость
						offsetY:0//отступ,у
					});
				}
				this.data.push(arr);
			}
	},
	draw:function(){
		if(this.data.length == 0)
			this.init();
		ctx.clearRect(0,0,ctxW,ctxH);
		// ctx.shadowOffsetX = 0;
		// ctx.shadowOffsetY = 0;
		// ctx.shadowBlur = 10;
		for(var i = 0;i < this.data.length; i++) {//Перебор слоев
			//ctx.filter = "blur(" + this.info[i].blur + "px)";
			ctx.font = this.info[i].size + "px Lucida Console";
			for (var j = 0; j < this.data[i].length; j++) {//Перебор рядов
				var info = this.dataInfo[i][j];//!!! ДОЛЖЕН ПЕРЕДАТБСЯ ПО ССЫЛКЕ
				for (var k = 0,offY = info.offsetY; k < this.data[i][j].length; k++) {//Перебор строк
					ctx.fillText(this.data[i][j][k],info.offsetX,offY);
					offY-=this.info[i].size + this.vIndent;
				}
				info.offsetY+=info.speed;
				if(info.offsetY - this.info[i].size > ctxH){
					info.offsetY-= this.info[i].size + this.vIndent;
					this.data[i][j].splice(0,1);
				}
				if(info.offsetY - (this.info[i].size + this.vIndent)*this.data[i][j].length > 0){
					this.data[i][j].push(this.getRS());
				}
			}
		}
	},
	data:[],
	dataInfo:[]
};
function getRandom(min,max){
	return Math.random() * (max - min) + min;
}
function getRandomInt(min,max){
	return Math.round(Math.random() * (max - min) + min);
}
function handler() {
	layers.draw();
	console.log(layers.data[0][0].length);
	setTimeout(handler,1000/60);
}