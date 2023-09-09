<?php
if(isset($_POST["action"])){
	include "db/db_connect.php";
	
	if($_POST["action"] == "delete"){

		$id = mysql_real_escape_string($_POST["id"]);
		
		$sql = "DELETE FROM areas WHERE ID = '$id'";
		
		if($res = mysql_query($sql)){
			echo "true";
		}
		else{
			echo "false";
		}


	}
	else if($_POST["action"] == "add"){
	
		$maphash = mysql_real_escape_string($_POST["maphash"]);
		$KarteFK = "";
		$sql = "SELECT ID FROM karten WHERE Hash = '$maphash'";
		if($res = mysql_query($sql)){
			$r  = mysql_fetch_object($res);
			$KarteFK = $r->ID;
			
		}
		else{
			echo "false";
			return;
		}
		
		$color =  mysql_real_escape_string($_POST["color"]);
		$points =  mysql_real_escape_string($_POST["points"]);
		
		$sql = "INSERT INTO areas (Color,Points,KarteFK) VALUES ('$color','$points','$KarteFK')";
		if($res = mysql_query($sql)){
				
				
				$id = mysql_insert_id();
				echo $id;
				
		}
		else{
				echo "false";
		}
	
	
	}
	else if($_POST["action"] == "edit"){
	
		$id = mysql_real_escape_string($_POST["id"]);
		$color =  mysql_real_escape_string($_POST["color"]);
		
		$sql = "UPDATE areas SET Color='$color' WHERE ID = '$id'";
		if($res = mysql_query($sql)){
				
				echo "true";
				
		}
		else{
				echo "false";
		}
		
	
	}
	
	
	
	
	
	
	
	
	
	include "db_close.php";

}