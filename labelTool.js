function Label(x, y, text, color, size, rotation){

	this.position = new Point(x,y);
	this.text = text;
	this.color = color;
	this.alive = true;
	this.id = -1;
	this.rotation = rotation;
	this.size = size;
	
	
	this.draw = function(ctx){
		
		ctx.fillStyle = this.color;
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = "bold "+this.size+"px verdana";
		ctx.shadowColor = "#222";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 3;

		
		ctx.save();
		ctx.translate(this.position.x,this.position.y);
		ctx.rotate(this.rotation * Math.PI/180);
		ctx.fillText(this.text, 0, 0);
		ctx.restore();
		
		ctx.shadowColor = "rgba(0,0,0,0)";
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 0;
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

var defaultLabel = new Label(0,0,"My Label", "rgba(0,0,0,.5)", 20, 0);
var Labels = new Array();

function createLabelForm(headline, mode, index){
	
	var c  = "";
	var s = "";
	var rot = "";
	var text = "";
	if(mode == "new"){
		c = defaultLabel.getColor();
		index = -1;
		s = defaultLabel.size;
		rot = defaultLabel.rotation;
		
	}else{
		c = Labels[index].getColor();
		s = Labels[index].size;
		rot =  Labels[index].rotation;
		text = Labels[index].text;
	}
	
	var form = "<h3>"+headline+"</h3>";
	form+= "<p>Text:<input onkeyup='updateDefaultLabelText("+index+")' type='text' value='"+text+"' size='20' id='LabelTextForm' name='LabelText'></input></p>";
	form+="<p>Color:</p>";
	form+="<p>R: 0 <input oninput='updateDefaultLabelColor("+index+")' onchange='updateDefaultLabelColor("+index+")' id='labelColorR' value="+c.r+" type='range' name='r' min='0' max='255'>255</p>";
	form+="<p>G: 0 <input oninput='updateDefaultLabelColor("+index+")' onchange='updateDefaultLabelColor("+index+")' id='labelColorG' value="+c.g+" type='range' name='g' min='0' max='255'>255</p>";
	form+="<p>B: 0 <input oninput='updateDefaultLabelColor("+index+")' onchange='updateDefaultLabelColor("+index+")' id='labelColorB' value="+c.b+" type='range' name='b' min='0' max='255'>255</p>";
	form+="<p>A: 20<input oninput='updateDefaultLabelColor("+index+")' onchange='updateDefaultLabelColor("+index+")' id='labelColorA' value="+Math.floor(c.a*100)+" type='range' name='a' min='20' max='100'>100</p>";
	form+="<div id='colorcodepreviewbox'><p>R: "+c.r+" G: "+c.g+" B: "+c.b+" A: "+Math.floor(c.a*100)+"</p></div>"
	form+="<p>Size:</p>";
	form+="<p> 5 <input oninput='updateDefaultLabelSize("+index+")' onchange='updateDefaultLabelSize("+index+")' id='labelSize' value="+s+" type='range' name='size' min='5' max='50'>50</p>";
	form+="<p>Rotation:</p>";
	form+="<p> -180 <input oninput='updateDefaultLabelRotation("+index+")' onchange='updateDefaultLabelRotation("+index+")' id='labelRotation' value="+rot+" type='range' name='size' min='-180' max='180'>180</p>";
	
	if(mode == "new"){
		form+= "<button class='button' onclick='submitNewLabel();' id='newLabelSubmitButton'>Submit</button><button  class='button' onclick='cancelNewLabel();' id='newLabelCancelButton'>Cancel</button></div>";
	}
	else{
		form+= "<button class='button' onclick='EditLabel("+index+",\""+Labels[index].text+"\");' id='EditLabelSubmitButton'>Apply</button><button class='button' onclick='DeleteLabel("+index+");' id='DeleteLabelButton'>Delete</button><button  class='button' onclick='cancelEditLabel("+index+",\""+Labels[index].text+"\",\""+Labels[index].color+"\","+Labels[index].size+","+Labels[index].rotation+");' id='newLabelCancelButton'>Cancel</button></div>";
	}
	
	return form;
}

function addLabel(label){
	l = new Label(label.position.x, label.position.y, label.text, label.color ,label.size, label.rotation);
	Labels.push(l);
}

function submitNewLabel(){
	if(!validationcheck(defaultLabel.text, "Label Text")){
		return
	}
	addLabel(defaultLabel);
	addLabelQuery(Labels.length-1);
	cancelNewLabel();
}

function cancelNewLabel(){
	PlacingLabel = false;
	markerdiv.style.visibility  ="hidden";
	defaultLabel.text = "My Label";
	defaultLabel.rotation = 0;
	defaultLabel.size = 20;
}

function updateDefaultLabelSize(index){
	var size = document.getElementById('labelSize').value;
	if(index == -1){
		defaultLabel.size = size;
		
	}else{
		Labels[index].size = size;
	}
}

function updateDefaultLabelRotation(index){
	var rot = document.getElementById('labelRotation').value;
	if(index == -1){
		defaultLabel.rotation = rot;
		
	}else{
		Labels[index].rotation = rot;
	}

}

function updateDefaultLabelText(index){

	var text = document.getElementById('LabelTextForm').value;
	
	if(index == -1){
		defaultLabel.text = text;
		
	}else{
		Labels[index].text = text;
	}
	
}

function updateDefaultLabelColor(index){

	var r = document.getElementById('labelColorR').value;
	var g = document.getElementById('labelColorG').value;
	var b = document.getElementById('labelColorB').value;
	var a = parseInt(document.getElementById('labelColorA').value)/100;
	var rgba = "rgba("+r+","+g+","+b+","+a+")";
	if(index == -1){
		defaultLabel.color = rgba;
		
	}else{
		Labels[index].color = rgba;
	}
	
	document.getElementById('colorcodepreviewbox').innerHTML = "<p>R: "+r+" G: "+g+" B: "+b+" A: "+Math.floor(a*100)+"</p>"
}


function EditLabel(index, text){

	if(!validationcheck(Labels[index].text, "Label Text")){
		Labels[index].text = text;
		document.getElementById('LabelTextForm').value = text;
		return
	}
	editLabelQuery(index);
	EditingLabel = false;
	markerdiv.style.visibility  ="hidden";
	//ajaxquery
}

function DeleteLabel(index){
	deleteLabelQuery(index);
	Labels[index].alive = false;
	EditingLabel = false;
	markerdiv.style.visibility  ="hidden";
}

function cancelEditLabel(index, text, color, size, rotation){
	
	Labels[index].text = text;
	Labels[index].color = color;
	Labels[index].size = size;
	Labels[index].rotation = rotation;
	EditingLabel = false;
	markerdiv.style.visibility  ="hidden";
}

function isInside(x, y, z1, z2, z3, z4) {
    x1 = Math.min(z1, z3);
    x2 = Math.max(z1, z3);
    y1 = Math.min(z2, z4);
    y2 = Math.max(z2, z4);
    if ((x1 <= x ) && ( x <= x2) && (y1 <= y) && (y <= y2)) {
              return true;
    } else {
        return false;
    };
};