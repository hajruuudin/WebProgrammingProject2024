<?php
//Set reporting
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

//Database credentials
define("DB_NAME", "mystylist");
define("DB_PORT", 3306);
define("DB_USER", "root");
define("DB_PASS", "root");
define("DB_HOST", "localhost");