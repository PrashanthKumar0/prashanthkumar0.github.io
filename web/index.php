<?php
error_reporting(E_ALL);
/*
host 

ec2-3-213-106-122.compute-1.amazonaws.com

*/
echo "hello world";

echo "<pre>";

$db = parse_url(getenv("DATABASE_URL"));
$conn=NULL;

try{
	extract($db);
	$dbname=ltrim($path);
     $conn=PDO("pgsql:host=$host;port=$port;dbname=$dbname",$user,$pass);

     var_dump($conn);
}catch (Exception $e){
	 echo $e;
}
echo "connected to database";
echo "</pre>";
