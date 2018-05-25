<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/day.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$day = new Day($db);
 
// set ID property of day to be edited
$day->id = isset($_GET['day_id']) ? $_GET['day_id'] : die();
 
// read the details of product to be edited
$day->readOne();
 
 //echo $day->readOne();
// create array
$day_arr = array(
    "day_id" =>  $day->id,
	"day_name" =>  $day->day_name,
	"exercise_name" =>  $day->exercise_name
);
 
// make it json format
print_r(json_encode($day_arr));
?>