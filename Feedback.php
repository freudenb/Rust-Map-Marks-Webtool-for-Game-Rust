<!DOCTYPE html> 
<html>
<head>
<title>Rust Map Marks - Feedback</title>
<meta name="description" content="Send your Feedback to the developer of Rust Map Marks">
 <link rel="stylesheet" type="text/css" href="FormLib/lib/css/depage-forms.css">
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
		
		#FeedbackForm-submit{
			
			margin-left:215px;
		}
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
	<h1>Feedback</h1>
	<p>Noticed any bugs or have some useful suggestions on new features? Let me know!</p>
		<?php

		require_once('FormLib/htmlform.php');
		$form = new depage\htmlform\htmlform('FeedbackForm', array('label' => 'Submit'));

		
		 $form->addSingle('anliegen', array(
		'label' => 'Type:',
		'skin' => 'select',
		'list' => array(
		'bug' => 'Bug',
		'suggestion' => 'Suggestion',
		'message' => 'Message',
		),
		'required' => true,
		));
		
		
		 $form->addTextarea('message', array(
		'label' => 'Message:',
		'required' => true,
		'cols' =>30,
		'rows' =>15,
		));

	
		
		$form->process();
		if ($form->validate()) {
			include "db/db_connect.php";
			$data = $form->getValues();
			$anliegen = mysql_real_escape_string($data["anliegen"]);
			$message = mysql_real_escape_string($data ["message"]);
			
			mail("info@rustmapmarks.com", "Rust Map Marks Feedback - ".$anliegen, $message, "From: Rust Map Marks <info@rustmapmarks.com>");
			
			$sql = "CREATE TABLE IF NOT EXISTS `feedback` (
			`ID` int(11) NOT NULL AUTO_INCREMENT,
			  `Anliegen` text NOT NULL,
			  `Message` text NOT NULL,
			  PRIMARY KEY (`ID`)
			) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";
			if(!mysql_query($sql)){
				echo "<p>couldn't create table</p>";
			}
			
			$sql = "INSERT INTO feedback (Anliegen, Message) VALUES ('$anliegen','$message')";
			
			if(!mysql_query($sql)){
				echo mysql_error();
			}
			else{
				echo "<p><br>Thanks for your support!</b></p>";
			}
			include "db_close.php";
			$form->clearSession();
		} else {
			echo ($form);
		}
		?>

	</div>
	<div id='footer'>
	<?php
	include "printFooter.php"
	?>
	</div>
</div>
</body>
</html>
	

