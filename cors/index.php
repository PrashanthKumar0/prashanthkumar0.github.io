<?php
header("Cross-Origin:*");
$fileUrl=$_REQUEST['url'];
$ch = curl_init($fileUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);

# get the content type
$mime=curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
header("mime-type:$mime");
echo file_get_contents($fileUrl);