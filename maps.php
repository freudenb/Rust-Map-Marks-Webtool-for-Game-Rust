<!DOCTYPE html> 
<html>
<head>
<meta name="description" content="Rust Map Marks | Tool for creating interactive maps for Rust survival game by facepunch studios">
<meta name="author" content="mf2888">
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-46938332-1', 'rustmapmarks.com');
  ga('send', 'pageview');

</script>
<style type="text/css">
		@import url("style.css");
</style>
<script>
var mapsource = "RustMap.jpg";

var RustMapImage = new Image();
var editmode = true;
function setEditMode(e){
	if(e){
		editmode = true;
		document.getElementById('currentMode').innerHTML = "<img src='icons/icon_pencil.png' width='20' height='20'>";
		document.getElementById('EditModeForm').innerHTML = "";
		document.getElementById('toolbar').innerHTML = createToolBar();
		setTool('MarkTool');
		setUpEditMode();
	}
	else{
		editmode = false;
		document.getElementById('currentMode').innerHTML = "<img src='icons/eye_inv.png' width='20' height='20'>";
		disableEditMode();
	}
	
}

function Markierung(x, y, name, notiz, symbol){
	this.x = x;
	this.y = y;
	this.name = name;
	this.notiz = notiz;
	this.symbol = symbol;
	this.imageURL = "";
	this.id = -1;
	this.alive = true;
	
}

var markierungen = new Array();
function addMarkierung(markierung){
	
	markierungen.push(markierung);
}
var ZoneLabels = new Array();


</script>
<script src="ajaxQuerys.js" type="text/javascript"></script>
<script src="rustmapmarker.js" type="text/javascript"></script>
<script src="areaTool.js" type="text/javascript"></script>
<script src="labelTool.js" type="text/javascript"></script>
<link rel="shortcut icon" href="icons/favicon.ico" type="image/x-icon" /> 
<?php

if(isset($_GET["h"])){
	include "db/db_connect.php";
	$hash = mysql_real_escape_string($_GET["h"]);
	$responseString = "";
	//datenbankabfrage;
	//echo javascriptcode
	
	$sql = "SELECT * FROM karten WHERE Hash = '$hash'";
	$res = mysql_query($sql);
	$count = mysql_num_rows($res);
	
	$MapImages = array("RustMap.jpg", "map/RUST_MAP_V2_simple.png");
	
	
	
	if($count > 0){
		
		$r = mysql_fetch_object($res);
		echo "<title>RustMapMarks - ".$r->Name ."</title>";
		$responseString .=$r->Name;
		//Load Marks
		$sql2 = "SELECT * FROM markierungen WHERE KarteFK = (SELECT ID FROM karten WHERE Hash = '$hash')";
		if($result = mysql_query($sql2)){
			echo "<script>";
			echo "var maphash='".$r->Hash ."';";
			echo "var MapImages = ['".$MapImages[0]."', '".$MapImages[1]."' ];";
			echo "var map =". $r->Map .";";
			echo "function pushMarks(){";
			echo "document.getElementById('MapNameDiv').innerHTML = '<h4>".$responseString."</h4>';";
			echo "var mark =\"\";\n\n";
			while($row = mysql_fetch_object($result)){
				
				echo "mark = new Markierung(".$row->X .",".$row->Y .",'".$row->Name ."','".$row->Notiz ."',".$row->Symbol .");";
				echo "mark.id = ".$row->ID .";";
				echo "mark.imageURL = \"".$row->ImageURL ."\";";
				echo "addMarkierung(mark);\n";
			
			}
			echo "};";
			echo "document.body.onload = pushMarks();";
			
			echo "</script>\n";
		
			
		}
		else{
			echo mysql_error();
			
		}
	
		//Load Areas
		$sql2 = "SELECT * FROM areas WHERE KarteFK = (SELECT ID FROM karten WHERE Hash = '$hash')";
		if($result = mysql_query($sql2)){
				
			echo "<script>";	
			echo "function pushAreas(){";
				echo "var area =\"\";\n\n";
				while($row = mysql_fetch_object($result)){
					echo "area = new Area('".$row->Color ."');\n";
					//points
					$points = json_decode($row->Points,true);
					
					for($i = 0; $i<count($points); $i++){
						echo "area.addPoint(".$points[$i]['x'].",".$points[$i]['y'].");";
					}
					echo "\n area.id = ".$row->ID .";\n";
					echo "addArea(area);\n";
				}
			
			echo "};\n";
			echo "\n</script>\n";
				
		}
		else{
			echo mysql_error();
			
		}
		
		//Load Label
		$sql2 = "SELECT * FROM labels WHERE KarteFK = (SELECT ID FROM karten WHERE Hash = '$hash')";
		if($result = mysql_query($sql2)){
				
			echo "<script>";	
			echo "function pushLabels(){";
				echo "var label =\"\";\n";
				while($row = mysql_fetch_object($result)){
					echo "label = new Label(".$row->X .",".$row->Y .",'".$row->Text ."','".$row->Color ."',".$row->Size .",".$row->Rotation .");\n";	
					echo "addLabel(label);\n";
					echo "Labels[Labels.length-1].id=".$row->ID .";";
				}
			
			echo "};\n";
			echo "\n</script>\n";
				
		}
		else{
			echo mysql_error();
			
		}
		
		
		//Load ZoneLabels
		$sql2 = "SELECT * FROM labels WHERE KarteFK = 3690";
		if($result = mysql_query($sql2)){
				
			echo "<script>";	
			echo "function pushZoneLabels(){";
				echo "var label =\"\";\n";
				while($row = mysql_fetch_object($result)){
					echo "label = new Label(".$row->X .",".$row->Y .",'".$row->Text ."','".$row->Color ."',".$row->Size .",".$row->Rotation .");\n";	
					echo "ZoneLabels.push(label);\n";
					echo "ZoneLabels[ZoneLabels.length-1].id=".$row->ID .";";
				}
			
			echo "};\n";
			echo "\n</script>\n";
				
		}
		else{
			echo mysql_error();
			
		}
		
		
		
	}


		
	

	echo "<style>
	
		#RustMapCanvas{
			background-image:url(".$MapImages[$r->Map].");
			background-repeat:no-repeat;
			
		}
		
		#navi{
		
			position:fixed;
			top: 0px;
			width:100%;
			height:auto;
			background-color:rgba(0,0,0,0.75);
			color:white;
			padding:10px;
			margin-top:0px;
			padding-left:15px;
			box-shadow: 2px 2px 6px rgba(10, 10, 10, 0.75);

		}	
	
	
	</style>";
	
	
	
	include "db_close.php";

}


?>

</head>

<?php

	

		
	



	if($count > 0){
		echo "<body onload='pushMarks(); pushAreas(); pushLabels();  pushZoneLabels(); init();'>
		<div id='navi'>";
		
		include "printNavigation.php";
		
		echo "</div>
		<div id='content'>

		
		<canvas id='RustMapCanvas'></canvas>								

		";
	}
	else{	
	echo "<body>
	<div id='navi'>";
	
		include "printNavigation.php";

	echo "</div>
	<div id='content'>

	";
	echo "<h1 style='margin-left:70px;'><b>Map not found!</b></h1>

	";
	

	}

?>



		<div id='Views'></div>
		<div id='submitMarkerDiv'></div>
		<div id='GUIDiv'>
		<div style='float:left; margin-right:10px; ' id='currentMode'></div>
		<div id='MapNameDiv'></div>
		<div id='Coords'></div>
		<div id='ads'>
				<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
			<!-- rustmapmarksAdLeaderboard -->
			<ins class="adsbygoogle"
				 style="display:inline-block;width:728px;height:90px"
				 data-ad-client="ca-pub-3675767177176962"
				 data-ad-slot="3628751652"></ins>
			<script>
			(adsbygoogle = window.adsbygoogle || []).push({});
			</script>
		</div>
		
		<div id='EditModeForm'>
		<p>Login to enable Edit Mode</p><br>
		<input type='text' value='enter password' onfocus='getElementById("EditModeFormPW").value=""; getElementById("EditModeFormPW").type="password"' onclick='getElementById("EditModeFormPW").value=""; getElementById("EditModeFormPW").type="password"' size='15' id='EditModeFormPW'>
		<button  class='button' onclick='login(maphash,document.getElementById("EditModeFormPW").value);' id='EditModeFormButton'>Login</button>
		</div>
		
		
		<div id='toolbar'></div>
		<div id='responseDiv'></div><br>
		<!-- AddThis Button BEGIN -->
		<div class="addthis_toolbox addthis_default_style addthis_16x16_style">
		<a class="addthis_button_facebook"></a>
		<a class="addthis_button_google_plusone_share"></a>
		<a class="addthis_button_twitter"></a>
		<a class="addthis_button_compact"></a><a class="addthis_counter addthis_bubble_style"></a>
		</div>
		<script type="text/javascript">var addthis_config = {"data_track_addressbar":false};</script>
		<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52cbff3e4808ee1e"></script>
		<!-- AddThis Button END -->
				</div>

	</div>
	<div id='footer'><div style='margin-left:300px; padding:5px;'>
	<?php
	include "printFooter.php"
	?>
	</div>
	</div>



</body>
</html>
	