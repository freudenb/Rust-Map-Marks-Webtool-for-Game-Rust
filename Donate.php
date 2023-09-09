<!DOCTYPE html> 
<html>
<head>
<title>Rust Map Marks - Donate</title>
<meta name="description" content="Rust Map Marks create interactive Maps for RUST. Donate here if you like">
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
<link rel="shortcut icon" href="icons/favicon.ico" type="image/x-icon" /> 
</head>
<body>
<div id='container'> 
	<div id='head'>
	</div>
	<div id='navi'>
		<?php 
		include "printNavigation.php";
		?>
	</div>
	<div id='content'>
	 
	 <h1>Donate</h1>
	 <p>If you like Rust Map Marks it would be awesome from you if you donate to support the development! :)</p>
	
	<h2>&euro; EUR</h2>
	<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
	<input type="hidden" name="cmd" value="_s-xclick">
	<input type="hidden" name="hosted_button_id" value="S6GZT4XATY6W2">
	<input type="image" src="https://www.paypalobjects.com/en_US/DE/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
	<img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1">
	</form>
	
	<h2>&dollar; USD</h2>
	<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
	<input type="hidden" name="cmd" value="_s-xclick">
	<input type="hidden" name="hosted_button_id" value="SPRQT8HHNKLWW">
	<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
	<img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1">
	</form>

	
	<h2>&pound; GBP</h2>
	<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
	<input type="hidden" name="cmd" value="_s-xclick">
	<input type="hidden" name="hosted_button_id" value="8VN2N6WS3J6XE">
	<input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online.">
	<img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1">
	</form>


	
	</div>
	<div id='footer'>
	<?php
	include "printFooter.php"
	?>
	</div>
</div>
</body>
</html>
	