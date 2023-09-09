<?php

if(isset($_POST["hash"])){

	include "db/db_connect.php";
	$hash = mysql_real_escape_string($_POST["hash"]);
	$sql = "SELECT * FROM karten WHERE Hash='$hash'";
	
	if($res = mysql_query($sql)){
		
		$r = mysql_fetch_object($res);
		
		$cryppw = crypt($_POST["pw"], $r->Salt);
		
	
		
		
		if($cryppw == $r->PW){
		
			echo "true";
		}
		else{
			echo "false";
		}
	
	}else{
	
		echo mysql_error();
	}
	
	
	
	

	include "db_close.php";
}