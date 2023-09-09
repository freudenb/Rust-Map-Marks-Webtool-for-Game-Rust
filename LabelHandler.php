<?php
if(isset($_POST["action"])){
	include "db/db_connect.php";

	if($_POST["action"] == "delete"){

			$id = mysql_real_escape_string($_POST["id"]);
			
			$sql = "DELETE FROM labels WHERE ID = '$id'";
			
			if($res = mysql_query($sql)){
				echo "true";
			}
			else{
				echo "false";
			}

	}
	else if($_POST["action"] == "add"){
	
		
		$rotation = mysql_real_escape_string($_POST["rotation"]);
		$text = mysql_real_escape_string($_POST["text"]);
		$size = mysql_real_escape_string($_POST["size"]);
		$color = mysql_real_escape_string($_POST["color"]);
		$maphash = mysql_real_escape_string($_POST["maphash"]);
		$x = mysql_real_escape_string($_POST["x"]);
		$y = mysql_real_escape_string($_POST["y"]);
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
		
		$sql = "INSERT INTO labels (X,Y,Text,Rotation,Size,Color,KarteFK) VALUES ('$x','$y','$text','$rotation','$size','$color','$KarteFK')";
		if($res = mysql_query($sql)){
				
				
				$id = mysql_insert_id();
				echo $id;
				
		}
		else{
				echo "false";
		}
		
		
		
	
	}
	else if($_POST["action"] == "edit"){
	
		
		$text = mysql_real_escape_string($_POST["text"]);
		$rotation = mysql_real_escape_string($_POST["rotation"]);
		$size = mysql_real_escape_string($_POST["size"]);
		$color = mysql_real_escape_string($_POST["color"]);
		$id = mysql_real_escape_string($_POST["id"]);
				
		
		$sql = "UPDATE labels SET Text='$text', Rotation='$rotation', Size='$size', Color='$color' WHERE ID = '$id'";
		if($res = mysql_query($sql)){
				
				echo "true";
				
		}
		else{
				echo "false";
		}
	
	
	
	}
	include "db_close.php";

}
