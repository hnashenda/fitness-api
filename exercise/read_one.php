<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/exercise.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$exercise = new Exercise($db);
 
// set ID property of exercise to be edited
$exercise->id = isset($_GET['exercise_id']) ? $_GET['exercise_id'] : die();
 
// read the details of product to be edited
$exercise->readOne();
 
 //echo $exercise->readOne();
// create array
$exercise_arr = array(
    "exercise_id" =>  $exercise->id,
	"exercise_name" =>  $exercise->exercise_name
);
 
// make it json format
print_r(json_encode($exercise_arr));
?>