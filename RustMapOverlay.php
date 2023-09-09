<!DOCTYPE html> 
<html>
<head>
<title>Rust Map Overlay - Download</title>
<meta name="description" content="Download Rust Map Overlay - display a map over your Rust window">
<style type="text/css">
		@import url("style.css");
.downloadbutton {
   background-color: rgba(0,170,212,1);
   padding: 10px;
   display: inline-block;
   font-size: 14px;
   color: white;
   font-weight:bold;
   font-family:sans serif,verdana;
   border:1px outset black;
   border-radius:5px;
   margin:2px;
   height:auto;
    box-shadow: 2px 2px 6px rgba(0,0,0,.4) inset;
}

.downloadbutton:hover {
   
  
  
}

.downloadbutton:active {
	 color:rgba(206,65,43,1);
	 border:1px inset black;
}
</style>
<link rel="shortcut icon" href="icons/favicon.ico" type="image/x-icon" /> 
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-46938332-1', 'rustmapmarks.com');
  ga('send', 'pageview');

</script>
<script>
var xmlhttp = new XMLHttpRequest();

function query(d){
		
		
		xmlhttp.open("POST","RustMapOverlaydownloads.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){
				var action = d;
				if(xmlhttp.readyState == 4 && xmlhttp.status==200){
				
						document.getElementById('downloadsDiv').innerHTML = "<p>Downloads: <b>"+xmlhttp.responseText+"</b></p>";

				}
			
		}
		
		xmlhttp.send("action="+d);
	
	
}




</script>
</head>
<body onload='query("get");'>
<div id='container'> 
	<div id='head'>
	</div>
	<div id='navi'>
		<?php 
		include "printNavigation.php";
		?>
	</div>
	<div id='content'>
	<a href="http://imgur.com/kpdnEgb" title="Rust Map Overlay Screenshot"><img src="http://i.imgur.com/kpdnEgb.jpg" width='50%' height='50%'alt="Rust Map Overlay Screenshot" title="Hosted by imgur.com" /></a>
		<br>
		<h3>Rust Map Overlay 1.0 </h3>
		<button onclick='query("add"); window.setTimeout(function(){window.open("http://adf.ly/eD1Te");},10); ' class='downloadbutton' id='rustmapmoverlayDownloadButton'>Download</button>
		
		<div id='downloadsDiv'></div>
	
		
		<h4>Description:</h4>
		<p>
		Rust Map Overlay is a little programm that lets you display a map over your Rust window. 
		You can zoom in and out and navigate through the map. </p>

		<h4>Quick Setup:</h4>
		<p>
		1. Add a Map (Download one here: <a href='http://playrustwiki.com/wiki/Ingame_Maps'>Maps</a>) to the folder where the .exe is located and change the map name to your added map name in the settings.ini  <br>Example: Map=MyMap.png<br>
		2. Start RustMapOverlay.exe  (it is also possible to start Rust Map Overlay when Rust is already running)<br>
		3. Start Rust in Window Mode <br>
		4. You can now display your map with M (Default Key)
		<br><br>
		Closes automaticly when Rust window is closed.<br>
		If you want to close it yourself activate the Rust Map Overlay Window and press ESC.
		</p>

		<h4>Controls:</h4>
		<p>
		Mousewheel Scroll: zoom in and out<br>
		Mousewheel Press: center your Map<br>
		Drag Mouse: navigate over your Map<br>
		ToggleKey: change between Rust Map Overlay and Rust
		</p>
		<h4>Settings:</h4>
		<p>
		in settings.ini<br><br>

		Map=map.jpg   			//Path to your map image<br>
		Transparancy=80			//Transparancy of the window. values between 20 and 100 allowed<br>
		ScrollSpeed=8			//Scrollspeed values between 1 and 10 allowed<br>
		toggleKey=0x4D			//Key Code which toggles the map (0x4D = M).<br> Look here for key codes: <br>
						  <a href='http://msdn.microsoft.com/en-us/library/windows/desktop/dd375731%28v=vs.85%29.aspx'>Key Codes</a><br>
					
						
		rustWindowTitle=PlayRust 	//Rust Window Title<br>
		showLogo=true			//Show the Rust Map Overlay logo in the upper left corner set it to true or false
		</p>
		
		<h4>Requirements:</h4>
		<p>Tested under Windows 7 64 Bit</p><br><br>
		
		<p>
		Rust is Copyright Facepunch Studios and is not affiliated with this programm.
		</p>
	</div>
	<div id='footer'>
	<?php
	include "printFooter.php"
	?>
	</div>
</div>
</body>
</html>
	