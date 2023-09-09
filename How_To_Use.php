<!DOCTYPE html> 
<html>
<head>
<title>Rust Map Marks - How to Use</title>
<meta name="description" content="detailed explanation about the tool">
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
	<h1>How to Use</h1>
	
	<h3>View Mode</h3>
	<p>In the View Mode you only can view the marks not edit them by navigate with your mouse to the marks.
	The View Mode is indicated by the blue eye in the interface.
	</p>
	<img src='icons/eye_inv.png' width='30' height='30' alt='viewmode indicator blue eye'>
	
	<h3>Edit Mode</h3>
	<p>
		The Edit Mode is indicated by the green pencil in the interface.
	</p>
	<img src='icons/icon_pencil.png' width='30' height='30' alt='viewmode indicator blue eye'>
	
	<h4>Place a Mark</h4>
	<p>To place a mark you have to be in Edit Mode. Click on the position you want your mark to be. In the popped up interface you give it a name an icon and add a note. When you are finished click on "submit". Your mark will then be saved. You can see the status on the interface below the icon for the current mode.</p>
	
	<h4>Edit a Mark</h4>
	<p>To edit a mark you need to be in Edit Mode. Click on a mark that is already placed and change on the interface the text you want. When you are finished click on "edit".</p>
	
	<h4>Delete a Mark</h4>
	<p>To delete a mark you need to be in Edit Mode. Click on a mark and click on "delete" on the interface.</p>
	
	<h3>Switch from View Mode into Edit Mode</h3>
	<p>In order to switch from View Mode into Edit Mode you need to enter your password and click on "login" in the interface.</p>
	</div>
	<div id='footer'>
	<?php
	include "printFooter.php"
	?>
	</div>
</div>
</body>
</html>
	