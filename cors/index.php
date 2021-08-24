<?php
if(!isset($_REQUEST['url']){
$html="<p> usage : http://impk.herokuapp.com/cors?url=&lt;url to content&gt;";
	die($html);
}
header("Cross-Origin: *");
$fileUrl=$_REQUEST['url'];
$ch = curl_init($fileUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);

# get the content type
$mime=curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
header("Content-Type: $mime");
echo file_get_contents($fileUrl);