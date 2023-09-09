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

function download(){
	
window.open("RustMapOverlay/Rust_Map_Overlay_1_0_.zip");

document.getElementById('manuallyDownload').innerHTML = "<p>Disable your Pop-Up Blocker or click <a style='color:#fc4e5c' href='RustMapOverlay/Rust_Map_Overlay_1_0_.zip'>here</a> to start manually</p>";
}


</script>
</head>
<body onload='window.setTimeout(function(){download()},2000);'>
<div id='container'> 
	<div id='head'>
	</div>
	<div id='navi'>
		<?php 
		include "printNavigation.php";
		?>
	</div>
	<div id='content'>
	
	<p>Your download will start soon! </p>
	<div id='manuallyDownload'></div>
		<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<!-- rustOverlayDownload -->
	<ins class="adsbygoogle"
		 style="display:inline-block;width:728px;height:90px"
		 data-ad-client="ca-pub-3675767177176962"
		 data-ad-slot="6359525650"></ins>
	<script>
	(adsbygoogle = window.adsbygoogle || []).push({});
	</script><br>
	<a href='./'>back to rustmapmarks.com</a>
	</div>
	<div id='footer'>
	<?php
	include "printFooter.php"
	?>
	</div>
</div>
</body>
</html>
	