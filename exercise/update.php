<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/exercise.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
 // prepare exercise object
$exercise = new Exercise($db);
 
// get id of proexerciseduct to be edited
$data = json_decode(file_get_contents("php://input"));
 
 
// set ID property of exercise to be edited
$exercise->exercise_id = $data->exercise_id;
//$exercise->id = $data->id; 
// set exercise property values
$exercise->exercise_name = $data->exercise_name;

 
// update the exercise
if($exercise->update()){
    echo '{';
        echo '"message": "exercise was updated."';
    echo '}';
}
 
// if unable to update the exercise, tell the exercise
else{
    echo '{';
        echo '"message": "Unable to update exercise."';
    echo '}';
}
?>