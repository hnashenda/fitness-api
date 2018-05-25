<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/day.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare day object
$day = new Day($db);
 
// get day day_id
$data = json_decode(file_get_contents("php://input"));
 
// set day day_id to be deleted
$day->day_id = $data->day_id;
 
// delete the day
if($day->delete()){
    echo '{';
        echo '"message": "day was deleted."';
    echo '}';
}
 
// if unable to delete the day
else{
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>