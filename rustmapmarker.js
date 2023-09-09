var rustcanvas = 0;
var Grid = 0;
var ZoneNamesCanvas = 0;
var ctx = 0;
var width = 2745;
var height = 1690;
var scalex = 1;
var scaley = 1;
var markerdiv = 0;

var currentx = 0;
var currenty = 0;
var PlacingNewMark = false;
var EditingMark = false;
var PlacingArea = false;
var SubmitingNewArea = false;
var EditingArea = false;
var PlacingLabel = false;
var EditingLabel = false;
var MarkRadius = -1;

var showLabels = true;
var showAreas = true;
var showMarks = true;
var showGrid = true;
var showZoneLabels = true;

var mousex = 0;
var mousey = 0;

var alphabetString = "abcdefghijklmnopqrstuvwxyz";
var Alphabet = alphabetString.toUpperCase().split("");
var CurrentTool = "MarkTool";

var SymbolSrc=["bandits.png","arrow.png","loot.png", "woodhouses.png", "metalhouses.png", "questionmark.png", "exclamationmark.png", "pistol.png", "marker1.png", "marker2.png", "marker3.png" , "cam1.png"];
var SymbolImages = new Array();

function createAlphabetArray(){
	
	
	for(var i = 0; i<26;i++){
		Alphabet.push("A"+Alphabet[i]);
	}
	for(var i = 0; i<25;i++){
		Alphabet.push("B"+Alphabet[i]);
	}
	
}

function loadSymbolImages(){

	for(var i = 0; i<SymbolSrc.length; i++){
		
		SymbolImages.push(new Image());
		SymbolImages[i].onload = function(){};
		SymbolImages[i].src = SymbolSrc[i];
	}
	MarkRadius = 12;//SymbolImages[0].width/2;
}

function getDistance(x1, y1, x2, y2){
	
	var dx = x2 - x1;
	var dy = y2 - y1;
	
	return Math.sqrt(dx*dx + dy*dy);
}

function setTool(tool){
	CurrentTool = tool;
	
	markerdiv.style.visibility  ="hidden";
	PlacingNewMark = false;
	EditingMark = false;
	PlacingArea = false;
	EditingArea = false;
	SubmitingNewArea = false;
	PlacingLabel = false;
	EditingLabel = false;
	
	document.getElementById('MarkToolButton').src = "icons/MarkToolIcon.png";
	document.getElementById('AreaToolButton').src = "icons/AreaToolIcon.png";
	document.getElementById('LabelToolButton').src = "icons/LabelToolIcon.png";
	document.getElementById(tool+'Button').src = "icons/"+tool+"IconActive.png";
}

function createToolBar(){

	var toolbar = "<p>Tools:</p><br>";
	//toolbar += "<button class='button' onclick='setTool(\"MarkTool\")' id='MarkToolButton'>Mark Tool</button>";
	toolbar += "<img title='Mark Tool' src='icons/MarkToolIcon.png' class='toolbarbutton' onclick='setTool(\"MarkTool\")' id='MarkToolButton'>";
	//toolbar += "<button class='button' onclick='setTool(\"AreaTool\")' id='AreaToolButton'>Area Tool</button>";
	toolbar += "<img title='Area Tool' src='icons/AreaToolIcon.png' class='toolbarbutton' onclick='setTool(\"AreaTool\")' id='AreaToolButton'>";
	toolbar += "<img title='Label Tool' style='margin-left:6px;' src='icons/LabelToolIcon.png' class='toolbarbutton' onclick='setTool(\"LabelTool\")' id='LabelToolButton'>";
	//toolbar += "<button class='button' onclick='setTool(\"LabelTool\")' id='LabelToolButton'>Label Tool</button>";
	
	return toolbar;
}

function createViewCheckBoxes(){
	var checkboxes = "<p>View</p>";
	checkboxes += "<p>Zone Names <br><input type='checkbox' id='ZoneLabelsViewCheckbox' onchange='showZoneLabels = !showZoneLabels' name='ZoneLabels' checked></p>";
	checkboxes += "<p>Marks <br><input type='checkbox' id='MarkViewCheckbox' onchange='showMarks = !showMarks' name='Marks' checked></p>";
	checkboxes += "<p> Labels<br><input type='checkbox' id='LabelViewCheckbox' onchange='showLabels = !showLabels' name='Label' checked></p>";
	checkboxes += "<p>Areas <br><input type='checkbox' id='AreasViewCheckbox' onchange='showAreas = !showAreas' name='Areas' checked></p>";
	checkboxes += "<p>Grid <br><input type='checkbox' id='GridViewCheckbox' onchange='showGrid = !showGrid' name='Drid' checked></p>";
	document.getElementById('Views').innerHTML = checkboxes;
}


function cancelNewMark(){
	
	markerdiv.style.visibility  ="hidden";
	PlacingNewMark = false;
}

function validationcheck(input, type){
		
		var re = /[^a-zA-Z0-9\u0410-\u044F?!#:,|.()\-%$ß\\äüö\n\r_\s]/;
		
		if(input.length == 0 && type != "Note"){
			alert("Insert "+type+"!");
			return false;
		}
		if(input.length >= 500){
			alert(type+" to long! (500 characters maximum)");
			return false;
		}
		if(input.match(re)){
			alert(re.exec(input)+" not allowed");
			return false;
		}
		else{
			return true;
		}
	
}

function addURL(url){
	
	if(url.length == 0){
		return url;
	}
	
	var pre = url.slice(0,3);
	if(pre != "www"){
		pre = url.slice(0,7);	
		
		if(pre != "http://"){
			url = "http://"+url;
		}
	}
	return url;
}

function validateURL(url){

	var re = /[^a-zA-Z0-9.\/:\-%$_]/;
	var datatype = url.slice(url.length-3, url.length);
	;
	if(url.length == 0){
		return true;
	}
	
	if(url.match(re)){
		var wrongchar = re.exec(url)
		if(wrongchar == " "){
			wrongchar = "\"  \"";
		}
		alert("In Image URL: "+wrongchar+" not allowed");
		return false;
	}
	
	if((datatype == "png" || datatype == "jpg" || datatype == "bmp" || datatype == "gif")&& url.charAt(url.length-4) == "."){
			
			return true;
	}
	else{
		alert("Not a valid image link! Use direkt link to image [urlname]/[imagename].[imagetype]\nAllowed imagetypes: jpg, png, bmp, gif");
		return false;
	}


}

function submitNewMark(){
	
	var name = document.getElementById("newMarkName").value;
	var notiz = document.getElementById("newMarkNotiz").value;
	var imageURL = document.getElementById("newMarkImage").value;
	
	if(!validationcheck(name, "Name") || !validationcheck(notiz, "Note")){
		return
	}
	
	var symbolnr = -1;
	for(var i = 0; i<SymbolSrc.length; i++){
		if(document.getElementById("symbol"+i).checked){
			symbolnr = i;
			break;
		}
	
	}
	if(symbolnr==-1){
		alert("Choose a Icon!");
		return
	}
	
	var tempnotiz = notiz.replace(new RegExp('\r\n','g'), "<br>");
	tempnotiz = notiz.replace(new RegExp('\n','g'), "<br>");
	
	var cx = currentx;
	var cy = currenty;
	
	if(SymbolSrc[symbolnr] == "marker1.png" || SymbolSrc[symbolnr] == "marker2.png" || SymbolSrc[symbolnr] == "marker3.png"){
		cy -= SymbolImages[symbolnr].height/2 - MarkRadius/2 + 1;
	}
	
	var newMark = new Markierung(cx,cy,name,tempnotiz, symbolnr);
	
	if(!validateURL(imageURL)){
		return
	}
	imageURL = addURL(imageURL);
	newMark.imageURL = imageURL;
	
	addMarkierung(newMark);
	addMark(newMark, markierungen.length-1);
	PlacingNewMark = false;
	markerdiv.style.visibility  ="hidden";
}

function createMarkInfo(markierung){
	
	var text = "";//"<img src='"+SymbolSrc[markierung.symbol]+"'>"
	text+= "<h3>"+markierung.name+"</h3>";
	if(markierung.imageURL.length != 0){
		text+="<img id='markImage' src='"+markierung.imageURL+"' alt='Image not found!'>";
	}
	text+= ""
	var tempnotiz = markierung.notiz.replace(new RegExp('\r\n','g'), "<br>");
	tempnotiz = markierung.notiz.replace(new RegExp('\n','g'), "<br>");
	text+="<p>Note:<br> "+tempnotiz+"</p>";
	return text;
}

function submitEditMark(markierungNR){
	//todo
	var name = document.getElementById("newMarkName").value;
	var notiz = document.getElementById("newMarkNotiz").value;
	var imageURL = document.getElementById("EditMarkImage").value;
		
	if(!validationcheck(name, "Name") || !validationcheck(notiz, "Note")){
		return
	}
	
	var symbolnr = -1;
	for(var i = 0; i<SymbolSrc.length; i++){
		if(document.getElementById("symbol"+i).checked){
			symbolnr = i;
			break;
		}
	
	}
	if(symbolnr==-1){
		alert("Choose a Icon!");
		return
	}
	
	if(!validateURL(imageURL)){
		return
	}
	imageURL = addURL(imageURL);
	var tempnotiz = notiz.replace(new RegExp('\r\n','g'), "<br>");
	tempnotiz = notiz.replace(new RegExp('\n','g'), "<br>");
	
	markierungen[markierungNR].name = name;
	markierungen[markierungNR].notiz = tempnotiz;
	markierungen[markierungNR].symbol = symbolnr;
	markierungen[markierungNR].imageURL = imageURL;
	editMark(markierungNR);
	
	
	

	
	markerdiv.style.visibility  ="hidden";
	EditingMark = false;
}

function DeleteMark(markierungNR){

	deleteMark(markierungNR);
	markerdiv.style.visibility  ="hidden";
	EditingMark = false;
	markierungen[markierungNR].alive = false;
}

function cancelEditMark(){
	
	markerdiv.style.visibility  ="hidden";
	EditingMark = false;
}

function createIconTable(){
	
	var form = "<table>";
	form+="<tr>";
	for(var i = 0; i<SymbolSrc.length; i++){
		form+="<td><img src='"+SymbolSrc[i]+"'></td>";
		
	}
	
	form+="</tr><tr>"
	for(var i = 0; i<SymbolSrc.length; i++){
		form+="<td><input id='symbol"+i+"' type='radio' name='symbol' ></td>";
		
	}
	
	form+="</tr></table>";
	
	return form;
}

function createEditForm(markierungNR){
	
	var m = markierungen[markierungNR];
	var form = "<h3>Edit Mark:</h3>";
	
	form+="<div id='NewMarkForm'><p>Name:<br><input id='newMarkName' value='"+m.name+"' name='name' type='textarea' size='20' maxlength='20'></p>";
	form += createIconTable();
	if(m.imageURL != ""){
		
		form += "<p>Image:<br><input id='EditMarkImage' value='"+m.imageURL+"' name='MarkImage' type='text' size='50' maxlength='200'></p>";
	}
	else{
		form += "<button id='imageButton' onclick='toggleImageButton(\"EditMarkImage\");' class='button' >Add Image</button><br>";
		form += "<input style='display:none' id='EditMarkImage' onfocus='document.getElementById(\"EditMarkImage\").value=\"\"' onlick='document.getElementById(\"EditMarkImage\").value=\"\"' name='MarkImage' type='text' size='40' maxlength='200'>";
  
	}
	var tempnotiz = m.notiz.replace(new RegExp('<br>','g'),"\r\n");
	
    form+="<p>Note:<br><textarea id='newMarkNotiz' name='notiz' rows='2' cols='20'>"+tempnotiz+"</textarea></p>";
	form+= "<button class='button' onclick='submitEditMark("+markierungNR+");' id='EditMarkSubmitButton'>Edit</button><button  class='button' onclick='DeleteMark("+markierungNR+");' id='EditMarkDeleteButton'>Delete</button><button  class='button' onclick='cancelEditMark();' id='EditMarkCancelButton'>Cancel</button></div>";
	return form;
	
	
	
}

function toggleImageButton(id){
		
	var d = document.getElementById(id);
	var button = document.getElementById('imageButton');
	if(d.style.display == "none"){
		d.style.display = "block";
		document.getElementById(id).value="insert url to your image";
		document.getElementById('imageButton').innerHTML = "cancel";
	}
	else{
		d.style.display = "none";
		d.value = "";
		document.getElementById('imageButton').innerHTML = "Add Image";
	}
}

function createNewMarkForm(){

	var form = "<h3>Add new Mark:</h3>";
	form+="<div id='NewMarkForm'><p>Name:<br><input id='newMarkName' name='name' type='text' size='20' maxlength='20'></p>";
	form += createIconTable();
	form += "<button id='imageButton' onclick='toggleImageButton(\"newMarkImage\");'  class='button' >Add Image</button><br>";
	form += "<input style='display:none' id='newMarkImage' onfocus='document.getElementById(\"newMarkImage\").value=\"\"' onlick='document.getElementById(\"newMarkImage\").value=\"\"' name='MarkImage' type='text' size='50' maxlength='200'>";
    form+="<p>Note:<br><textarea id='newMarkNotiz' name='notiz' rows='2' cols='20'></textarea></p>";
	form+= "<button class='button' onclick='submitNewMark();' id='newMarkSubmitButton'>Submit</button><button  class='button' onclick='cancelNewMark();' id='newMarkCancelButton'>Cancel</button></div>";
	return form;
}

function checkForMouseOverMark(evt){
		
			var rect = rustcanvas.getBoundingClientRect();
			var x = evt.clientX - rect.left;
			var y = evt.clientY - rect.top;		
			
			if(PlacingNewMark == false && EditingMark == false && SubmitingNewArea == false && EditingArea == false){
				markerdiv.style.visibility ="hidden";
			}
			if(EditingMark == false && PlacingNewMark == false && SubmitingNewArea == false && EditingArea == false){
			
				for(var i = 0; i<markierungen.length;i++){
				
						if(markierungen[i].alive){
							var mx = markierungen[i].x;
							var my = markierungen[i].y;
							if(getDistance(x,y,mx,my )<= MarkRadius){
								markerdiv.innerHTML = createMarkInfo(markierungen[i]);
								y+= getOffset( rustcanvas ).top-1;
								//markerdiv.style="width:200px; padding:5px; background-color:rgba(0,0,0,0.75); position:absolute; left:"+x+"px; top:"+y+"px;";
								markerdiv.style.position = "absolute";
								markerdiv.style.left = x+"px";
								markerdiv.style.top = y+"px";
								markerdiv.style.visibility ="visible";
								break;
							}
						}
				}
			
			
			}

}

function drawAreas(){
	
	for(var i = 0; i<Areas.length;i++){
				if(Areas[i].alive){
					Areas[i].draw(ctx);
				}
	}

}

function drawLabels(){
	for(var i = 0; i<Labels.length;i++){
			
			if(Labels[i].alive){
				Labels[i].draw(ctx);
							
			}
		}
}

function drawMarks(){
	for(var i = 0; i<markierungen.length;i++){
			
			if(markierungen[i].alive){
			
				var x = markierungen[i].x;
				var y = markierungen[i].y;
				ctx.drawImage(SymbolImages[markierungen[i].symbol],x-SymbolImages[markierungen[i].symbol].width/2,y-SymbolImages[markierungen[i].symbol].height/2);
			}
	}
}


function drawAlphaCheetoMap(){
	
	ctx.clearRect(0,0,rustcanvas.width, rustcanvas.height);
	//ctx.drawImage(RustMapImage, 0, 0, RustMapImage.width, RustMapImage.height);
	if(showGrid){
		ctx.drawImage(Grid,0,0);
	}
	if(showAreas){
		drawAreas();
	}
	
	if(PlacingArea || SubmitingNewArea){
		defaultArea.draw(ctx);
		ctx.beginPath();
		ctx.arc(defaultArea.points[0].x, defaultArea.points[0].y,AreaFinishPointRadius, 0, 2 * Math.PI, false);
		ctx.fillStyle = '#8ED6FF';
		ctx.fill();
	}
	
	if(showZoneLabels){
		ctx.drawImage(ZoneNamesCanvas,0,0);
	}
	
	if(PlacingLabel){
		defaultLabel.draw(ctx);
	}

	if(showLabels){
		drawLabels();
	}
	if(PlacingNewMark){
		ctx.beginPath();
		ctx.arc(currentx, currenty,5, 0, 2 * Math.PI, false);
		ctx.fillStyle = '#8ED6FF';
		ctx.fill();
	}
	
	if(showMarks){
		drawMarks();
	}
	ctx.strokeStyle = "rgba(0,0,0,0)";
	ctx.fillStyle = "rgba(0,0,0,0)";
	requestAnimationFrame(drawAlphaCheetoMap);
		
}


function drawKronixMap(){

	ctx.clearRect(0,0,rustcanvas.width, rustcanvas.height);
	//ctx.drawImage(RustMapImage, 0, 0, RustMapImage.width, RustMapImage.height);
	if(showGrid){
		ctx.drawImage(Grid,0,0);
	}
	if(showAreas){
		drawAreas();
	}
	
	if(PlacingArea || SubmitingNewArea){
		defaultArea.draw(ctx);
		ctx.beginPath();
		ctx.arc(defaultArea.points[0].x, defaultArea.points[0].y,AreaFinishPointRadius, 0, 2 * Math.PI, false);
		ctx.fillStyle = '#8ED6FF';
		ctx.fill();
	}
	
	if(showZoneLabels){
		ctx.drawImage(ZoneNamesCanvas,0,0);
	}
	
	
	if(PlacingLabel){
		defaultLabel.draw(ctx);
	}
	
	
	if(showLabels){
		drawLabels();
	}
	if(PlacingNewMark){
		ctx.beginPath();
		ctx.arc(currentx, currenty,5, 0, 2 * Math.PI, false);
		ctx.fillStyle = '#8ED6FF';
		ctx.fill();
	}
	
	if(showMarks){
		drawMarks();
	}
	ctx.strokeStyle = "rgba(0,0,0,0)";
	ctx.fillStyle = "rgba(0,0,0,0)";
	requestAnimationFrame(drawKronixMap);

}

function drawZoneNames(ctx){
	
	for(var i = 0; i<ZoneLabels.length;i++){
				
		ZoneLabels[i].draw(ctx);
							
	}	
	
}

function drawGrid(ctx, spacing, ImageWidth, ImageHeight){
	
	var linesvertical =  ImageWidth / spacing;
	var lineshorizontal = ImageHeight / spacing;
	 ctx.strokeStyle = "rgba(0,0,0,0.2)";
	 ctx.fillStyle = "rgba(0,0,0,1)";
	 
	 ctx.shadowColor = "#222";
	 ctx.shadowOffsetX = 2;
	 ctx.shadowOffsetY = 2;
	 ctx.shadowBlur = 3;
	 
	for(var i = 0 ; i < linesvertical; i++){
	  ctx.beginPath();
      ctx.moveTo( i * spacing, 0);
      ctx.lineTo(i * spacing, height);
      ctx.stroke();
	
	  ctx.textBaseline = "top";
	  ctx.textAlign = "left";
	  ctx.font = "bold 10px verdana";
	  
	  ctx.fillText(Alphabet[i] ,5+(i * spacing), ImageHeight-15);
		
	}
	
	for(var i = 0 ; i < lineshorizontal; i++){
	  ctx.beginPath();
      ctx.moveTo( 0, i * spacing);
      ctx.lineTo(width, i * spacing);
      ctx.stroke();
	  ctx.textBaseline = "top";
	  ctx.textAlign = "left";
	  ctx.font = "bold 10px verdana";
	  ctx.fillText(Math.floor(lineshorizontal)-i,5,5+(i * spacing));	
	}
	

}

function update(){
	
	Grid = document.createElement('canvas');
	Grid.width =  RustMapImage.width;
	Grid.height =  RustMapImage.height;

	
	ZoneNamesCanvas = document.createElement('canvas');
	ZoneNamesCanvas.width =  RustMapImage.width;
	ZoneNamesCanvas.height =  RustMapImage.height;

	if(map == 0){
		
	
		drawGrid(Grid.getContext('2d'), 50, RustMapImage.width, RustMapImage.height);
		drawZoneNames(ZoneNamesCanvas.getContext('2d'));

		drawAlphaCheetoMap();
	
	}
	else if(map == 1){
	
		var gridImage = new Image();
		gridImage.src = "map/RUST_MAP_V2_grid.png";
		
		gridImage.onload = function(){
			var gridCTX = Grid.getContext('2d');
			gridCTX.drawImage(gridImage,0,0,RustMapImage.width,RustMapImage.height);
		};
		
		var ZoneNameImage = new Image();
		ZoneNameImage.src = "map/RUST_MAP_V2_NAMES - Kopie.png";	

		ZoneNameImage.onload = function(){
			var ZoneNameCTX = ZoneNamesCanvas.getContext('2d');
			ZoneNameCTX.drawImage(ZoneNameImage,0,0,RustMapImage.width, RustMapImage.height);
		};
		
		drawKronixMap();
		
	
	}


}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft;// - el.scrollLeft;
        _y += el.offsetTop; //- el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}



function canvasclickevent(evt){

		var rect = rustcanvas.getBoundingClientRect();
		var x = evt.clientX - rect.left;
		var y = evt.clientY - rect.top;	
		currentx = x;
		currenty = y;
		
	if(CurrentTool == "MarkTool"){
		
		if(EditingMark){
			EditingMark = false;
		}
		x+=5;
		y+=5 + getOffset( rustcanvas ).top;
		//markerdiv.style="width:200px; padding:5px;  background-color:rgba(0,0,0,0.75); position:absolute; left:"+x+"px; top:"+y+"px;";
		markerdiv.style.position = "absolute";
		markerdiv.style.left = x+"px";
		markerdiv.style.top = y+"px";
		markerdiv.style.visibility ="visible";
		PlacingNewMark = true;
		markerdiv.innerHTML = createNewMarkForm();
	
	}
	else if(CurrentTool == "AreaTool"){
		
		var index = -1;
		if(!PlacingArea && !SubmitingNewArea){
		//check ob auf area geklickt
		
			for(var i = 0; i<Areas.length; i++){
				
				if(Areas[i].alive && checkForMouseInArea(x, y, Areas[i])){
					index = i;
					
				}
			}
			
		
		}
		//ja editieren
		if(index != -1){
				
				markerdiv.style.position = "absolute";
				markerdiv.style.left = x+"px";
				markerdiv.style.top = y + getOffset( rustcanvas ).top +"px";
				markerdiv.style.visibility ="visible";
				markerdiv.innerHTML = createAreaForm("Edit Area:","edit",index);
				EditingArea = true;
		}//nein neue area platzieren
		else{
		
		
			if(!PlacingArea){
				//start placing area
				EditingArea = false;
				markerdiv.style.visibility = "hidden";
				PlacingArea = true;
				var color = defaultArea.color;
				defaultArea = new Area(color);
				defaultArea.finished = false;
				defaultArea.addPoint(x,y);
				defaultArea.addPoint(x,y);
				
			}
			else{
				//is placing area -> add new point if klick not on start point
				
				if(getDistance(x,y,defaultArea.points[0].x, defaultArea.points[0].y)<= AreaFinishPointRadius){
				
					//finish
					
					PlacingArea = false;
					SubmitingNewArea = true;
					defaultArea.finished = true;
					//display Area Form
					markerdiv.style.position = "absolute";
					markerdiv.style.left = x+"px";
					markerdiv.style.top = y + getOffset( rustcanvas ).top +"px";
					markerdiv.style.visibility ="visible";
					markerdiv.innerHTML = createAreaForm("Add new Area:","new",-1);
					
				}
				else{
					defaultArea.points[defaultArea.points.length-1].x = Math.floor(x);
					defaultArea.points[defaultArea.points.length-1].y = Math.floor(y);
					defaultArea.addPoint(x,y);
				}
			
			}
		}
	}
	else if(CurrentTool == "LabelTool"){
		
			//collision check mit mouse und label
			//collison ja -> edit label
			//collision nein -> new label
			if(!EditingLabel){
				var index = -1;
				
				for(var i = 0; i < Labels.length; i++){
					
					var metrics = ctx.measureText(Labels[i].text);
					Math.floor(metrics.width);
					var z1 = Labels[i].position.x - metrics.width/2;
					var z2 = Labels[i].position.y -  Labels[i].size/2;
					var z3 = Labels[i].position.x + metrics.width/2;
					var z4 = Labels[i].position.y +  Labels[i].size/2;
					if(Labels[i].alive && isInside(x, y, z1, z2, z3, z4)){
						index = i;
						break;
					}
				}			
			
		
			
				defaultLabel.position.x = x;
				defaultLabel.position.y = y;
				markerdiv.style.position = "absolute";
				markerdiv.style.left = defaultLabel.position.x+"px";
				markerdiv.style.top =  defaultLabel.position.y+10+getOffset( rustcanvas ).top+"px";
				markerdiv.style.visibility ="visible";
				var headline = "Add new Label";
				var mode = "new";
			
			
				if(index != -1){
					headline = "Edit Label";
					mode = "edit";
					EditingLabel = true;
				}
				else{
					PlacingLabel = true;
				}
				markerdiv.innerHTML = createLabelForm(headline, mode, index);
			}
				
		
	}
}

function markerdivclickevent(evt){

	var rect = rustcanvas.getBoundingClientRect();
	var x = evt.clientX - rect.left;
	var y = evt.clientY - rect.top;	
	
	if(CurrentTool == "MarkTool"){
		if(!PlacingNewMark){
			for(var i = 0; i<markierungen.length;i++){
				var mx = markierungen[i].x;
				var my = markierungen[i].y;
				if(getDistance(x,y,mx,my )<= MarkRadius && EditingMark == false && markierungen[i].alive){
					markerdiv.innerHTML = createEditForm(i);
					y+= getOffset( rustcanvas ).top;
					//markerdiv.style="width:200px; padding:5px; background-color:rgba(0,0,0,0.75); position:absolute; left:"+x+"px; top:"+y+"px;";
					markerdiv.style.position = "absolute";
					markerdiv.style.left = x+"px";
					markerdiv.style.top = y+"px";
					markerdiv.style.visibility ="visible";
					EditingMark = true;
					return
				}
		
			}
		}
	}
	else if(CurrentTool == "AreaTool"){
		
		
	}
}

function setUpEditMode(){
	
		rustcanvas.addEventListener('click', canvasclickevent, false);
		markerdiv.addEventListener('click', markerdivclickevent, false);

}

function disableEditMode(){
	markerdiv.removeEventListener('click', markerdivclickevent);
	rustcanvas.removeEventListener('click', canvasclickevent);
}

function init(){
	
	
	
	rustcanvas = document.getElementById("RustMapCanvas");
	ctx = rustcanvas.getContext("2d");
	RustMapImage.src = MapImages[map];
	document.getElementById('responseDiv').innerHTML = "<p>Loading...</p>";
	RustMapImage.onload = function(){
		rustcanvas.width = RustMapImage.width;
		rustcanvas.height = RustMapImage.height;
		document.getElementById('responseDiv').innerHTML = "<p>Ready</p>";
	};

	loadSymbolImages();
	markerdiv = document.getElementById("submitMarkerDiv");
	setEditMode(false);
	createViewCheckBoxes();
	createAlphabetArray();

	
	rustcanvas.addEventListener('mousemove', function(evt){	
		if(!PlacingArea && !PlacingLabel && !EditingLabel && showMarks){	
			checkForMouseOverMark(evt);
		}
		if(PlacingArea){
			areaPlacing(evt);
		}
		
		var rect = rustcanvas.getBoundingClientRect();
		mousex = evt.clientX - rect.left;
		mousey = evt.clientY - rect.top;	
		if(map == 0){
			document.getElementById('Coords').innerHTML = "<p>"+Alphabet[Math.floor(mousex/50)]+Math.floor(Math.floor(RustMapImage.height/49)-mousey/50)+"</p>";		
		}
		
				
	}, false);
	
	
	
	markerdiv.addEventListener('mousemove', function(evt){
		
		if(!PlacingArea && !PlacingLabel && !EditingLabel && showMarks){	
			checkForMouseOverMark(evt);
		}
	
	}, false);
	
	rustcanvas.addEventListener('click',function(evt){
	
		if(!editmode){
		
			//alert("Login to enable Edit Mode!");
			var rect = rustcanvas.getBoundingClientRect();
			var x = evt.clientX - rect.left;
			var y = evt.clientY - rect.top;	
			y+= getOffset( rustcanvas ).top;
			markerdiv.style.position = "absolute";
			markerdiv.style.left = x+"px";
			markerdiv.style.top = y+"px";
			markerdiv.style.visibility ="visible";
			markerdiv.innerHTML = "<p style='font-size:10pt;'><b>Login to enable Edit Mode!<b></p>";
		}
	
	},false);
	
	
	
	window.onkeydown = function(evt){
		if(evt.keyCode == 27 && editmode){
			setTool(CurrentTool);
		}
	};
	

	
	update();
	//setInterval(function(){update()},50);
	
	
}