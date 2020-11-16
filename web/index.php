<?php
echo "hello world";


$db = parse_url(getenv("DATABASE_URL"));

/*print("pgsql:" . sprintf(
    "host=%s;port=%s;user=%s;password=%s;dbname=%s",
    $db["host"],
    $db["port"],
    $db["user"],
    $db["pass"],
    ltrim($db["path"]);*/
