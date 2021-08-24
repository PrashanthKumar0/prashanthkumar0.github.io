<?php
header("Cross-Origin:*");
$fileUrl=$_REQUEST['url'];
$ch = curl_init($fileUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);

# get the content type
echo curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

#echo file_get_contents($fileUrl);