<?php

function curPageName() {
 return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
}


if(curPageName() != "maps.php" && curPageName() != "RustLocalizer.php" && curPageName() != "index.php" && curPageName() != ""){
	echo '<!-- AddThis Smart Layers BEGIN -->
	<!-- Go to http://www.addthis.com/get/smart-layers to customize -->
	<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52cbff3e4808ee1e"></script>
	<script type="text/javascript">
	  addthis.layers({
		\'theme\' : \'dark\',
		\'share\' : {
		  \'position\' : \'left\',
		  \'numPreferredServices\' : 5
		}   
	  });
	</script>
	<!-- AddThis Smart Layers END -->';
}
echo "<div style='border-top:1px dashed black; margin-top:20px;'><a href='RustMapOverlay.php'>Rust Map Overlay</a><a style='margin-left:20px' href='About.php'>About</a><a style='margin-left:20px' href='imp.html'>Imprint</a>
<p style='font-size:10pt; color:grey;'>Rust is a registered trademark of Facepunch Studios. This site is in no way associated with Facepunch Studios.</p>
</div>
";