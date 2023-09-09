<?php

$server="localhost";
$user="root";
$passwort="";
$db="rustmapmarks";

$dbconn = mysql_connect($server,$user,$passwort);
if (!$dbconn)	{ 
  echo " Verbindung fehlgeschlagen";
	exit();
}

$dbselect = mysql_select_db($db,$dbconn);
if (!$dbselect)	{ 
  echo " Datenbank nicht erreichbar";
	exit();
}
?>
