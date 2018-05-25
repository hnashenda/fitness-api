<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/exercise.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare exercise object
$exercise = new Exercise($db);
 
// get exercise exercise_id
$data = json_decode(file_get_contents("php://input"));
 
// set exercise exercise_id to be deleted
$exercise->exercise_id = $data->exercise_id;
 
// delete the exercise
if($exercise->delete()){
    echo '{';
        echo '"message": "exercise was deleted."';
    echo '}';
}
 
// if unable to delete the exercise
else{
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>