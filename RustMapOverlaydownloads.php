<?php

$DOWNLOADFILE = "RustMapOverlaydownloads.txt";

function getDL(){
		
		$handle = fopen("RustMapOverlaydownloads.txt", "r");
		$d = fgets($handle);
		fclose($handle);
		return $d;
		
}	

function setDownloads($c){
		$handle = fopen("RustMapOverlaydownloads.txt", "w");
		fwrite($handle, $c);
		fclose($handle);
}

if(isset($_POST["action"])){
	
	if(!file_exists("RustMapOverlaydownloads.txt")){
		 $handle = fopen("RustMapOverlaydownloads.txt", "w");
		 fclose($handle);
		  setDownloads(0);
		
	}
	include "db/db_connect.php";
	$action = mysql_real_escape_string($_POST["action"]);
	include "db_close.php";
	$response = "";
	
	if($action == "add"){
		$downloads = getDL();
		$downloads += 1;
		 setDownloads($downloads);
		 $response = $downloads;
		
	}
	
	if($action == "get"){
		
		$response = getDL();
	
	}

	echo $response;
}