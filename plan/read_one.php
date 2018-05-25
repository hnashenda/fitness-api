<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/plan.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$plan = new Plan($db);
 
// set ID property of plan to be edited
$plan->id = isset($_GET['plan_id']) ? $_GET['plan_id'] : die();
 
// read the details of plan to be edited
$plan->readOne();
 
// create array
$plan_arr = array(
    "plan_id" =>  $plan->id,
	"plan_name" =>  $plan->plan_name,
	"day_name" =>  $plan->day_name
	//"day_name" =>  "hubert plan"
);
 
// make it json format
print_r(json_encode($plan_arr));
?>