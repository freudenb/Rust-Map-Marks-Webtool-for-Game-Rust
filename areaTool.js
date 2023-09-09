
function Point(x,y){
	this.x = x;
	this.y = y;
}

function Area(color){

	this.points = new Array();
	this.id = -1;
	this.alive = true;
	this.color = color;
	this.finished = true;
	this.addPoint = function(x,y){
	 this.points.push(new Point(Math.floor(x),Math.floor(y)));
	}
	
	this.draw = function(ctx){
		
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.points[0].x, this.points[0].y);
		ctx.lineWidth = 2;
		for(var i = 1; i<this.points.length; i++){
			
			ctx.lineTo(this.points[i].x, this.points[i].y);
		
		}
				
		if(this.finished){
			ctx.closePath();
			ctx.fill();
		}else{
			ctx.stroke();
		}
		
	}
	
	this.getColor = function(){
	
		var tempcolor = this.color.split(",");
		var r = tempcolor[0].slice(5,tempcolor[0].length);
		var g = tempcolor[1];
		var b = tempcolor[2];
		var a = tempcolor[3].slice(0,tempcolor[3].length-1);
		return {r:r, g:g, b:b, a:a};
	}


}

var defaultArea = new Area("rgba(255,215,0,0.35)");
var Areas = new Array();
var AreaFinishPointRadius = 5;

function addArea(Area){
	Areas.push(Area);
}	

function areaPlacing(evt){

	var rect = rustcanvas.getBoundingClientRect();
	var x = evt.clientX - rect.left;
	var y = evt.clientY - rect.top;	
	defaultArea.points[defaultArea.points.length-1].x = Math.floor(x);
	defaultArea.points[defaultArea.points.length-1].y = Math.floor(y);
	
}

function createAreaForm(headline, mode, index){
	
	var c  = "";
	if(mode == "new"){
		c = defaultArea.getColor();
		index = -1;
	}else{
		c = Areas[index].getColor();
	}
	var form = "<h3>"+headline+"</h3>";
	form+="<p>Color:</p>";
	form+="<p>R: 0 <input oninput='updateDefaultAreaColor("+index+")' onchange='updateDefaultAreaColor("+index+")' id='areaColorR' value="+c.r+" type='range' name='r' min='0' max='255'>255</p>";
	form+="<p>G: 0 <input oninput='updateDefaultAreaColor("+index+")' onchange='updateDefaultAreaColor("+index+")' id='areaColorG' value="+c.g+" type='range' name='g' min='0' max='255'>255</p>";
	form+="<p>B: 0 <input oninput='updateDefaultAreaColor("+index+")' onchange='updateDefaultAreaColor("+index+")' id='areaColorB' value="+c.b+" type='range' name='b' min='0' max='255'>255</p>";
	form+="<p>A: 20<input oninput='updateDefaultAreaColor("+index+")' onchange='updateDefaultAreaColor("+index+")' id='areaColorA' value="+Math.floor(c.a*100)+" type='range' name='a' min='20' max='100'>100</p>";
	form+="<div id='colorcodepreviewbox'><p>R: "+c.r+" G: "+c.g+" B: "+c.b+" A: "+Math.floor(c.a*100)+"</p></div>"
	if(mode == "new"){
		form+= "<button class='button' onclick='submitNewArea();' id='newAreaSubmitButton'>Submit</button><button  class='button' onclick='cancelNewArea();' id='newAreaCancelButton'>Cancel</button></div>";
	}
	else{
		form+= "<button class='button' onclick='EditArea("+index+");' id='EditAreaSubmitButton'>Apply</button><button class='button' onclick='DeleteArea("+index+");' id='DeleteAreaButton'>Delete</button><button  class='button' onclick='cancelEditArea(\""+Areas[index].color+"\","+index+");' id='newAreaCancelButton'>Cancel</button></div>";
	}
	return form;

}

function updateDefaultAreaColor(index){
	
	var r = document.getElementById('areaColorR').value;
	var g = document.getElementById('areaColorG').value;
	var b = document.getElementById('areaColorB').value;
	var a = parseInt(document.getElementById('areaColorA').value)/100;
	var rgba = "rgba("+r+","+g+","+b+","+a+")";
	if(index == -1){
		defaultArea.color = rgba;
	}else{
		Areas[index].color = rgba;
	}
	
	document.getElementById('colorcodepreviewbox').innerHTML = "<p>R: "+r+" G: "+g+" B: "+b+" A: "+Math.floor(a*100)+"</p>"
}

function cancelEditArea(originColor, index){
	Areas[index].color = originColor;
	EditingArea = false;
	markerdiv.style.visibility  ="hidden";
}

function cancelNewArea(){
	SubmitingNewArea = false;
	markerdiv.style.visibility  ="hidden";
}

function EditArea(index){
	editAreaQuery(index);
	EditingArea = false;
	markerdiv.style.visibility  ="hidden";
}

function DeleteArea(index){
	deleteAreaQuery(index);
	Areas[index].alive = false;
	EditingArea = false;
	markerdiv.style.visibility  ="hidden";
}

function submitNewArea(){
		
	addArea(defaultArea);
	addAreaQuery(Areas.length-1);
	cancelNewArea();

}


function validateInput(name, notiz){

	if(!validationcheck(name, "Name") || !validationcheck(notiz, "Note")){
		return false
	}
	
	var tempnotiz = notiz.replace(new RegExp('\r\n','g'), "<br>");
	tempnotiz = notiz.replace(new RegExp('\n','g'), "<br>");
	
	return {name:name, note:tempnotiz};
}

function pnpoly(nvert, vertx, verty, testx, testy)
{
	var i, j, c = 0;
	for (i = 0, j = nvert-1; i < nvert; j = i++) {
	   if ( ((verty[i]>testy) != (verty[j]>testy)) &&
	   (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
		c = !c;
	}
	return c;
}

function checkForMouseInArea(mousex, mousey, area){
	
	var vertx = new Array();
	var verty = new Array();
	for(var i = 0; i<area.points.length; i++){
		vertx.push(area.points[i].x);
		verty.push(area.points[i].y);
	}
	
	
	return pnpoly(area.points.length,  vertx, verty, mousex, mousey);
}
