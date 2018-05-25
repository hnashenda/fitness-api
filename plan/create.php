<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate plan object
include_once '../objects/plan.php';
 
$database = new Database();
$db = $database->getConnection();
 
$plan = new Plan($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set plan property values
$plan->plan_name = $data->plan_name;


if(isset($data->day_id)){
$plan->day_id = $data->day_id;
}
 
// create the plan
if($plan->create()){
    echo '{';
        echo '"message": "Plan was created."';
    echo '}';
}
 
// if unable to create the plan, tell the plan
else{
    echo '{';
        echo '"message": "Unable to create plan."';
    echo '}';
}
?>