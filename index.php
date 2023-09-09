<!DOCTYPE html> 
<html>
<head>
<title>Rust Map Marks - Interactive Map Tool for Rust</title>
<meta name="description" content="Interactive Map Tool for Rust. Create custom map, locate your position, share it with your teammates!">
<style type="text/css">
		@import url("style.css");
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



<style>
@import url("style.css");
#localizerCanvas{
			background-image:url("RustMap.jpg");
			background-repeat:no-repeat;
	
}

#coordsDiv{
	position:fixed;
	bottom: 0px;
	width:200px;
	height:auto;
	background-color:rgba(0,0,0,0.75);
	color:white;
	padding:10px;
	padding-left:15px;
	box-shadow: 2px 2px 6px rgba(10, 10, 10, 0.75);

}

#coordsDiv p{
	Font-Size:10pt;
}
#coordsDiv h3{
	Font-Size:10pt;
}

#indexInfoDiv{
	position:fixed;
	bottom:280px;
	width:320px;
	height:auto;
	background-color:rgba(0,0,0,0.75);
	color:white;
	padding:10px;
	padding-left:15px;
	box-shadow: 2px 2px 6px rgba(10, 10, 10, 0.75);

}

#indexInfoDiv li{
	Font-Size:10pt;
	font-family:sans-serif, verdana;
}
#indexInfoDiv h3{
	Font-Size:11pt;
}

#indexInfoDiv a{
font-weight:bolder;
font-size:11pt;

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


</style>


<script src="rustmapmarker.js" type="text/javascript"></script>
<script src="localizer.js" type="text/javascript"></script>
<script src="areaTool.js" type="text/javascript"></script>
<script src="labelTool.js" type="text/javascript"></script>

<script>

var ZoneLabels = new Array();

</script>
<?php

include "db/db_connect.php";

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
?>




</head>
<body onload='pushZoneLabels(); initLocalizer()'>
	
	<div id='content' >
	<div id='navi'>
		<?php 
		include "printNavigation.php";
		?>
	</div>
	<div id='messagediv'> 	<?php 
		include "printMessage.php";
		?>
	</div>
	<div id='indexInfoDiv'>
		<h3>Welcome on Rust Map Marks</h3><i>
		<ul>
		<li><a href='RustLocalizer.php'>locate</a> your position</li>
		<li><a href='CreateMap.php'>create</a> your map using the interactive map tool</li>
		<li>share your map with friends</li>
		<li>mark areas, leave notes, place labels</li>
		<li>test it on the <a href='maps.php?h=UPxTghv0iDnqs'>Public Map (pw:rust123)</a></li>
		<li>check out the <a href='RustMapOverlay.php'><span style='color:rgb(206,65,43)'>Map Overlay</span></a> for Rust</li>
		<li>more about Rust Map Marks <a href='About.php'>here</a></li>
		</ul></i>
	</div>
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
	<div id='coordsDiv'>
	<h3>Rust Locator</h3>
	<p><i>Enter your position and see where you are</i></p>
	<p>X:<input id='x' type='text' name='x'></p>
	<p>Y:<input id='y' type='text' name='y'></p>
	<p>Z:<input id='z' type='text' name='z'></p>
	<button class='button' id='LocalizerSubmitButton' onclick='setMark()'>Locate</button>
	
	<div style='margin-top:10px' class="addthis_toolbox addthis_default_style addthis_16x16_style">
		<a class="addthis_button_facebook"></a>
		<a class="addthis_button_google_plusone_share"></a>
		<a class="addthis_button_twitter"></a>
		<a class="addthis_button_compact"></a><a class="addthis_counter addthis_bubble_style"></a>
		</div>
		<script type="text/javascript">var addthis_config = {"data_track_addressbar":false};</script>
		<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52cbff3e4808ee1e"></script>
		<!-- AddThis Button END -->
	</div>
	
	
	<canvas id='localizerCanvas' style='border:1px solid black'></canvas>
	</div>
	<div id='footer'  style='margin-left:300px; padding:5px;'>
	<?php
	include "printFooter.php"
	?>
	</div>

</body>
</html>
	