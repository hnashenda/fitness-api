<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/plan.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare plan object
$plan = new Plan($db);
 
// get plan plan_id
$data = json_decode(file_get_contents("php://input"));
 
// set plan plan_id to be deleted
$plan->plan_id = $data->plan_id;
 
// delete the plan
if($plan->delete()){
    echo '{';
        echo '"message": "Plan was deleted."';
    echo '}';
}
 
// if unable to delete the plan
else{
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>