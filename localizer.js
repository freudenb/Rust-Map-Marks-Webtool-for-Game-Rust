var RMap = new Image()
var localizerCanvas = 0;
var localizerCTX = 0;
var mz0 = -7200.0;
var mx0 = 2470.0;
var d = 3.29;


var Grid = 0;

var MouseMapCoodsX = 0;
var MouseMapCoodsZ = 0;

var MouseX = 0;
var MouseY = 0;

function Mark(mx,my,mz){
	
	this.mx = mx;
	this.my = my;
	this.mz = mz;
	this.radius = 1100.0;
	this.draw = function(ctx){
		
		 drawMark(ctx,this.mx,this.mz);
		
		 if(this.radius > 0){
			this.radius -= 20;
			if(this.radius <0) this.radius = 0;
			var coords = getPixelCoords(this.mx, this.mz);
			ctx.beginPath();
			ctx.arc(coords.px,coords.py,this.radius,0,2*Math.PI);
			ctx.strokeStyle = "orange";
			ctx.stroke();
		}
	}

}

var Marks = new Array();



function initLocalizer(){
	
	localizerCanvas = document.getElementById("localizerCanvas");
	localizerCTX  = localizerCanvas.getContext("2d");
	createAlphabetArray();
	
	RMap.src = "RustMap.jpg";
	
	RMap.onload = function(){
		localizerCanvas.width = RMap.width;
		localizerCanvas.height = RMap.height;
		
		Grid = document.createElement('canvas');
		Grid.width = RMap.width;
		Grid.height = RMap.height;
		drawGrid(Grid.getContext('2d'),50,RMap.width ,RMap.height);
		drawZoneNames(Grid.getContext('2d'));
		
		
		localizerCanvas.addEventListener('mousemove', function(evt){
	
		var rect = localizerCanvas.getBoundingClientRect();
		MouseX = evt.clientX - rect.left;
		MouseY = evt.clientY - rect.top;
		
		//console.log(MouseX+" : "+MouseY);
		var MapCoords = getMapCoords(MouseX, MouseY);
		MouseMapCoodsX = Math.floor(MapCoords.mx);
		MouseMapCoodsZ =  Math.floor(MapCoords.mz);
		//console.log(MapCoords.mx+" : "+MapCoords.mz);
		},false);
	
	
		localizerCanvas.addEventListener('click', function(evt){
		
			
			var rect = localizerCanvas.getBoundingClientRect();
			MouseX = evt.clientX - rect.left;
			MouseY = evt.clientY - rect.top;
			
			var MapCoords = getMapCoords(MouseX, MouseY)
			addMark(MapCoords.mx,0,MapCoords.mz);
			
			
		
		},false);
	
		

		
		draw();
	
	};
	
	
	
	
	
}

function drawMark(ctx,mx,mz){
	var coords = getPixelCoords(mx, mz);
	ctx.beginPath();
	ctx.arc(coords.px,coords.py,5,0,2*Math.PI);
	ctx.fillStyle = "rgb(206,65,43)";
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(coords.px,coords.py,5,0,2*Math.PI);
	ctx.strokeStyle = "#000";
	ctx.stroke();
}

function getPixelCoords(mx, mz){
	
	var py =  (mx - mx0)/ d;
	var px =   (mz - mz0) / d;
	return {px:px,py:py};
}

function getMapCoords(px,py){
	
	var mx = py * d + mx0;
	var mz = px * d + mz0;
	
	return {mx:mx,mz:mz};
}

function draw(){
	
	localizerCTX.clearRect(0,0,localizerCanvas.width, localizerCanvas.height);
	localizerCTX.drawImage(Grid,0,0,RMap.width ,RMap.height);
	
	
	
	for(var i = 0; i<Marks.length; i++){
		
		Marks[i].draw(localizerCTX);
		
	}
	localizerCTX.shadowColor = "#222";
	localizerCTX.shadowOffsetX = 2;
	localizerCTX.shadowOffsetY = 2;
	localizerCTX.shadowBlur = 3;
	localizerCTX.fillStyle = "#fdb343";
	localizerCTX.font = "bold 10pt Verdana";
	localizerCTX.fillText("x: "+MouseMapCoodsX+" y: 400 z: "+MouseMapCoodsZ  , MouseX-10, MouseY+40);
	localizerCTX.shadowColor = "#222";
	localizerCTX.shadowOffsetX = 0;
	localizerCTX.shadowOffsetY = 0;
	localizerCTX.shadowBlur = 0;
	
	requestAnimationFrame(draw);
}

function addMark(mx,my,mz){
	
	Marks.push(new Mark(mx,my,mz));
	
}



function setMark(){
	
	var mx = document.getElementById('x').value;
	var my = document.getElementById('y').value;
	var mz = document.getElementById('z').value;
	addMark(mx,my,mz);


}