<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$user = new User($db);
 
// set ID property of user to be edited
$user->id = isset($_GET['user_id']) ? $_GET['user_id'] : die();
 
// read the details of product to be edited
$user->readOne();
 
 echo $user->readOne();
// create array
$user_arr = array(
    "user_id" =>  $user->id,
	"user_firstname" =>  $user->user_firstname,
    "user_lastname" => $user->user_lastname,
    "user_email" => $user->user_email,
	"plan_id" => $user->plan_id,
	"plan_name" => $user->plan_name
 
);
 
// make it json format
print_r(json_encode($user_arr));
?>