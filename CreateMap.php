<!DOCTYPE html> 
<html>
<head>
<title>Rust Map Marks - Create Map</title>
<meta name="description" content="Create a new Rust Mark Map with Rust Map Marks and share it with your team!">
<meta name="author" content="mf2888">

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-46938332-1', 'rustmapmarks.com');
  ga('send', 'pageview');

</script>

<script type="text/javascript">

function validate(){
	
	var re = /[^a-zA-Z0-9\u0410-\u044F?!#:,|.()%$ß\\äüö\n\r_\s]/;
	var errortext = "";
	 
	if(document.getElementById("newMapName").value.length < 3){
		errortext+="Map Name to short! (3 characters minimun) \n";
	}
	
	if(document.getElementById("newMapName").value.length > 20){
		errortext+="Map Name to long! (20 characters maximum) \n";
	}
	var name = document.getElementById("newMapName").value;
	if(name.match(re)){
		errortext+=re.exec(name)+" not allowed! \n";
	}	
	
	if(document.getElementById("newMapPW1").value.length < 5){
		errortext+="Map Password to short! (5 characters minimun) \n";
	}
	
		
	if(document.getElementById("newMapPW1").value.length > 15){
		errortext+="Map Password to long! (15 characters maximum) \n";
	}
	
	var pw1 = document.getElementById("newMapPW1").value;
	if(pw1.match(re)){
		errortext+=re.exec(pw1)+" not allowed! \n";
	}
	
	if(document.getElementById("newMapPW2").value != document.getElementById("newMapPW1").value){
		errortext+="Passwords doesn't not match!";
	}
	
	if(errortext.length == 0){

		return true;
	}
	else{
		alert(errortext);
		return false;
	}
	

}

function mapPreview(){
	
	var map = document.getElementById('mapSelect').value;
	
	var mapsrc;
	var mapIMG = new Image();
	if(map == 0){
		mapsrc = "AlphaCheetoMapPreview.png";
	}
	else if(map == 1){
		mapsrc = "kronixmappreview.png";
	}
	
	
	
	
	
	document.getElementById('MapPreviewDiv').innerHTML = "<img src='"+mapsrc+"' style='margin-top:20px; margin-left:50px; border:1px solid black'>";
	
}

</script>
<style type="text/css">
		@import url("style.css");
</style>
<link rel="shortcut icon" href="icons/favicon.ico" type="image/x-icon" /> 
</head>
<body onload='mapPreview()'>
<div id='container'> 
	<div id='head'>

	</div>
	<div id='navi'>
		<?php 
		include "printNavigation.php";
		?>
	</div>
	<div id='content'>
	 <h1>Create new Rust Mark Map</h1>
	 <p>Note: Rust Map Marks is currently in beta there could be bugs. There is no official Rust Map released yet so long we use community made maps.
	 Credits to Alpha Cheeto and [MwK] Kronix for the current map.
	 </p>
	 
	 
	 
	<?php

	

	if(isset($_POST["submitNewMap"])){
		$salt = substr ( str_shuffle ( './0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' ) , 0, 22 );
		include "db/db_connect.php";

		$name = mysql_real_escape_string($_POST["Name"]);
		$pw1 =   mysql_real_escape_string($_POST["pw1"]);
		$pw2 =   mysql_real_escape_string($_POST["pw2"]);
		$map =  mysql_real_escape_string($_POST["Map"]);
		
		if($pw1 != $pw2){
			echo "<p><b>Passwords doesn't match!</b></p>";
			return;
		}
		
		
		$h = $name;
		$hash = crypt($h, $salt);
		$hash = str_replace(".", "0", $hash);
		$hash = str_replace("/", "1", $hash);
		
		$pw1 = crypt($pw1,$salt);
		
		$sql = "INSERT INTO karten (Name,Map,PW,Salt,Hash) VALUES ('$name', '$map','$pw1', '$salt','$hash')";
		
		if(mysql_query($sql)){
			$url = $_SERVER['HTTP_HOST'];
			if(strpos($url,'mf2888') !== false){
				$url.="/rustmapmarks";
			}
			echo "<p>New Map Created!</p>
				<p>Your Map can be viewed under: </p>
				<input type='text' size='100' value='".$url."/maps.php?h=".$hash."'><br><br>
				<a href='maps.php?h=".$hash."'><span style='color:rgb(206,65,43)'>G</span>o to your map</a>
			
				<p style='font-size:10pt;'>Note: save your link and password</p>
			";
		}
		else{
			echo mysql_error();
		}
		
		
		
		
		include "db_close.php";

	}
	else{

		echo "<div id='newMapFormDiv' style='float:left'>
		<form action='CreateMap.php' onSubmit='return validate()' method='POST'>
		<p>Map Name:</p>
		<input type='text' name='Name' size='12' id='newMapName'>
		<p>Map:</p>
		<select id='mapSelect' onchange='mapPreview()' name='Map'  size='1'> 
		<option  value='1' selected>Kronix</option>
		<option value='0'>Alpha Cheeto</option>
		</select> 
		
		<p>Map Password:</p>
		<input type='password' size='12' name='pw1' id='newMapPW1'>
		<p>Repeat Password:</p>
		<input type='password' size='12' name='pw2' id='newMapPW2'><br><br>
		<input class='button' type='submit'  name='submitNewMap' id='newMapSubmitButton' value='Create New Map'>
		</form>
		</div>";

		
	}

	?>
	<div id='MapPreviewDiv' ></div>

	</div>
	<div id='footer'>
	<?php
	include "printFooter.php"
	?>
	</div>
</div>

</body>
</html>