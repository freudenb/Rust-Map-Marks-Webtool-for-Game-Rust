<!DOCTYPE html>
<head>
<link rel="shortcut icon" href="icons/favicon.ico" type="image/x-icon" /> 
<title>Rust Map Marks Statistics</title>
<style>

p {

	font-size:42pt;
	font-family:sans-serif;
	color: black;
}

body{
	background-color:#535a5d;
}

h2 {
font-family:sans-serif;
		font-size:64pt;
	font-weight:bolder;
}

</style>
</head>
<body>
<h2>Rust Map Marks Statistics</h2>
<?php

function getDL(){
		
		$handle = fopen("RustMapOverlaydownloads.txt", "r");
		$d = fgets($handle);
		fclose($handle);
		return $d;
		
}

function getEntrys($table){
	
	
	$sql = "SELECT COUNT(*) FROM ".$table;
	$result = mysql_query($sql);
	if(!$result){

		echo mysql_error();
		return -1;
	}
	else{
		$row = mysql_fetch_row($result);
		return $row[0];

	}
	
	
}

include "db/db_connect.php";

$tables = array("markierungen", "labels", "areas", "karten");
$color = "#c86f64";

foreach($tables as $t){
	
	echo "<p>".strtoupper ($t).": <span style='font-weight:bolder; color:".$color."'>".getEntrys($t)."</span></p>";

}

echo "<p>Overlay Downloads: <span style='font-weight:bolder; color:".$color."'>".getDL()."</span></p>";




include "db_close.php";

?>
</body>