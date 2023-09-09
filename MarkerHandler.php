<?php


if(isset($_POST["action"])){
	include "db/db_connect.php";


	if($_POST["action"] == "delete"){




			$id = mysql_real_escape_string($_POST["id"]);
			
			$sql = "DELETE FROM markierungen WHERE ID = '$id'";
			
			if($res = mysql_query($sql)){
				echo "true";
			}
			else{
				echo "false";
			}


	}
	else if($_POST["action"] == "add"){
			
	
		$name = mysql_real_escape_string($_POST["name"]);
		$x = mysql_real_escape_string($_POST["x"]);
		$y = mysql_real_escape_string($_POST["y"]);
		$notiz = mysql_real_escape_string($_POST["notiz"]);
		$notiz = str_replace("\\r\\n", '<br>',$notiz);
		$notiz = str_replace("\\n", '<br>', $notiz);
		$notiz = str_replace(chr(13), '<br>', $notiz);
		$symbol = mysql_real_escape_string($_POST["symbol"]);
		$maphash = mysql_real_escape_string($_POST["maphash"]);
		$imageURL = mysql_real_escape_string($_POST["imageURL"]);
		
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
		
		
		
		$sql = "INSERT INTO markierungen (X,Y,Name,Notiz,Symbol,ImageURL, KarteFK) VALUES ('$x','$y','$name','$notiz','$symbol','$imageURL','$KarteFK')";
		if($res = mysql_query($sql)){
				
				
				$id = mysql_insert_id();
				echo $id;
				
		}
		else{
				echo "false";
		}
		
			
	}
	else if($_POST["action"] == "edit"){
			
	
		$name = mysql_real_escape_string($_POST["name"]);
		$notiz = mysql_real_escape_string($_POST["notiz"]);
		$notiz = str_replace("\\r\\n", '<br>',$notiz);
		$notiz = str_replace("\\n", '<br>', $notiz);
		$notiz = str_replace(chr(13), '<br>', $notiz);
		$symbol = mysql_real_escape_string($_POST["symbol"]);
		$imageURL = mysql_real_escape_string($_POST["imageURL"]);
		$id = mysql_real_escape_string($_POST["id"]);
	
		
		
		$sql = "UPDATE markierungen SET Name='$name', Notiz='$notiz', Symbol='$symbol', ImageURL='$imageURL' WHERE ID = '$id'";
		if($res = mysql_query($sql)){
				
				echo "true";
				
		}
		else{
				echo "false";
		}
		
			
	}


	include "db_close.php";

}

