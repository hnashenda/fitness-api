<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate exercise object
include_once '../objects/exercise.php';
 
$database = new Database();
$db = $database->getConnection();
 
$exercise = new Exercise($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set exercise property values
$exercise->exercise_name = $data->exercise_name;

 
// create the exercise
if($exercise->create()){
    echo '{';
        echo '"message": "exercise was created."';
    echo '}';
}
 
// if unable to create the exercise, tell the exercise
else{
    echo '{';
        echo '"message": "Unable to create exercise."';
    echo '}';
}
?>