
var xmlhttp = new XMLHttpRequest();

function loadingImage(src){
	return "<img src='"+src+"'>"
}

function login(hash,pw){
	
	if(pw.length > 4){
	
		
		xmlhttp.open("POST","EditModeLogin.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
				
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			
					if(xmlhttp.responseText == "true"){
						
						document.getElementById('responseDiv').innerHTML = "<p>logged in</p>";
						setEditMode(true);
					}
					else{
						document.getElementById('responseDiv').innerHTML = "<p>wrong password</p>";
						setEditMode(false);
					}

				
				}
				else{
					
					document.getElementById('responseDiv').innerHTML = "<p>logging in...</p>"+loadingImage("icons/301.gif");
				
				}
	
		}
		
		xmlhttp.send("hash="+hash+"&pw="+pw);
	
	}
	else{
	
		alert("Password to short! (5 characters minimum)");
	}
}

function deleteMark(markierungNR){


		xmlhttp.open("POST","MarkerHandler.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
				
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			
					if(xmlhttp.responseText == "true"){
						
						document.getElementById('responseDiv').innerHTML = "<p>mark deleted</p>";
					
					}
					else{
						document.getElementById('responseDiv').innerHTML = "<p>Error: mark not deleted</p>";
					
					}

				
				}
				else{
					
					document.getElementById('responseDiv').innerHTML = "<p>deleting mark...</p>"+loadingImage("icons/301.gif");
				
				}
	
		}
		
		xmlhttp.send("action=delete&id="+markierungen[markierungNR].id);
	
}
	
	


function addMark(newMark, index){

		xmlhttp.open("POST","MarkerHandler.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
				var i = index;
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			
					
					if(xmlhttp.responseText == "false"){
						document.getElementById('responseDiv').innerHTML = "<p>Error: mark not added</p>";
					
					}
					else{
						
						document.getElementById('responseDiv').innerHTML = "<p>mark added</p>";
						markierungen[i].id = parseInt(xmlhttp.responseText);
					}
			
				
				}
				else{
					
					document.getElementById('responseDiv').innerHTML = "<p>adding mark...</p>"+loadingImage("icons/301.gif");
				
				}
	
		}
		
		var querystring = "name="+newMark.name;
		querystring+= "&x="+newMark.x;
		querystring+= "&y="+newMark.y;
		querystring+= "&notiz="+newMark.notiz;
		querystring+= "&symbol="+newMark.symbol;
		querystring+= "&imageURL="+newMark.imageURL;
		querystring+= "&maphash="+maphash;
		
		xmlhttp.send("action=add&"+querystring);
	
}

function editMark(index){

		
		xmlhttp.open("POST","MarkerHandler.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
			
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			
					
					if(xmlhttp.responseText == "false"){
						document.getElementById('responseDiv').innerHTML = "<p>Error: mark not edited</p>";
					
					}
					else{
						
						document.getElementById('responseDiv').innerHTML = "<p>mark edited</p>";
						
					}
					
					
				
				}
				else{
					
					document.getElementById('responseDiv').innerHTML = "<p>editing mark...</p>"+loadingImage("icons/301.gif");
				
				}
	
		}
		var mark = markierungen[index];
		var querystring = "name="+mark.name;
		querystring+= "&notiz="+mark.notiz;
		querystring+= "&symbol="+mark.symbol;
		querystring+= "&imageURL="+mark.imageURL;
		querystring+= "&id="+mark.id;
		xmlhttp.send("action=edit&"+querystring);
	
}


function deleteAreaQuery(AreaIndex){


		xmlhttp.open("POST","AreaHandler.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
				
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			
					if(xmlhttp.responseText == "true"){
						
						document.getElementById('responseDiv').innerHTML = "<p>area deleted</p>";
					
					}
					else{
						document.getElementById('responseDiv').innerHTML = "<p>Error: area not deleted</p>";
					
					}

				
				}
				else{
					
					document.getElementById('responseDiv').innerHTML = "<p>deleting area...</p>"+loadingImage("icons/301.gif");
				
				}
	
		}
		
		xmlhttp.send("action=delete&id="+Areas[AreaIndex].id);
	
}


function addAreaQuery(index){

		xmlhttp.open("POST","AreaHandler.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
				var i = index;
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			
					
					if(xmlhttp.responseText == "false"){
						document.getElementById('responseDiv').innerHTML = "<p>Error: area not added</p>";
					
					}
					else{
						
						document.getElementById('responseDiv').innerHTML = "<p>area added</p>";
						Areas[i].id = parseInt(xmlhttp.responseText);
						
					}
			
				
				}
				else{
					
					document.getElementById('responseDiv').innerHTML = "<p>adding area...</p>"+loadingImage("icons/301.gif");
				
				}
	
		}
		
		var querystring = "color="+Areas[index].color;
		querystring+= "&maphash="+maphash;
		querystring+= "&points="+JSON.stringify(Areas[index].points);
		xmlhttp.send("action=add&"+querystring);
	
}

function editAreaQuery(index){

		
		xmlhttp.open("POST","AreaHandler.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
			
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			
					
					if(xmlhttp.responseText == "false"){
						document.getElementById('responseDiv').innerHTML = "<p>Error: area not edited</p>";
					
					}
					else{
						
						document.getElementById('responseDiv').innerHTML = "<p>area edited</p>";
						
					}
					
					
				
				}
				else{
					
					document.getElementById('responseDiv').innerHTML = "<p>editing area...</p>"+loadingImage("icons/301.gif");
				
				}
	
		}
		
		var querystring = "color="+Areas[index].color;
		querystring+= "&id="+Areas[index].id;		
		xmlhttp.send("action=edit&"+querystring);
	
}

function deleteLabelQuery(LabelIndex){


		xmlhttp.open("POST","LabelHandler.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
				
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			
					if(xmlhttp.responseText == "true"){
						
						document.getElementById('responseDiv').innerHTML = "<p>label deleted</p>";
					
					}
					else{
						document.getElementById('responseDiv').innerHTML = "<p>Error: label not deleted</p>";
					
					}

				
				}
				else{
					
					document.getElementById('responseDiv').innerHTML = "<p>deleting label...</p>"+loadingImage("icons/301.gif");
				
				}
	
		}
		
		xmlhttp.send("action=delete&id="+Labels[LabelIndex].id);
	
}

function addLabelQuery(index){

		xmlhttp.open("POST","LabelHandler.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
				var i = index;
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			
					
					if(xmlhttp.responseText == "false"){
						document.getElementById('responseDiv').innerHTML = "<p>Error: label not added</p>";
					
					}
					else{
						
						document.getElementById('responseDiv').innerHTML = "<p>label added</p>";
						Labels[i].id = parseInt(xmlhttp.responseText);
					}
			
				
				}
				else{
					
					document.getElementById('responseDiv').innerHTML = "<p>adding label...</p>"+loadingImage("icons/301.gif");
				
				}
	
		}
		
		var querystring = "color="+Labels[index].color;
		querystring+= "&maphash="+maphash;
		querystring+= "&size="+Labels[index].size;
		querystring+= "&text="+Labels[index].text;
		querystring+= "&rotation="+Labels[index].rotation;
		querystring+= "&x="+Labels[index].position.x;
		querystring+= "&y="+Labels[index].position.y;
		xmlhttp.send("action=add&"+querystring);
	
}

function editLabelQuery(index){

		
		xmlhttp.open("POST","LabelHandler.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
			
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			
					
					if(xmlhttp.responseText == "false"){
						document.getElementById('responseDiv').innerHTML = "<p>Error: label not edited</p>";
					
					}
					else{
					
						document.getElementById('responseDiv').innerHTML = "<p>label edited</p>";
						
					}
					
					
				
				}
				else{
					
					document.getElementById('responseDiv').innerHTML = "<p>editing label...</p>"+loadingImage("icons/301.gif");
				
				}
	
		}
		
		var querystring = "color="+Labels[index].color;
		querystring+= "&text="+Labels[index].text;
		querystring+= "&id="+Labels[index].id;	
		querystring+= "&size="+Labels[index].size;
		querystring+= "&rotation="+Labels[index].rotation;		
		xmlhttp.send("action=edit&"+querystring);
	
}
	
