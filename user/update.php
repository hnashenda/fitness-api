<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
 // prepare user object
$user = new User($db);
 
// get id of prouserduct to be edited
$data = json_decode(file_get_contents("php://input"));
 
 
// set ID property of user to be edited
$user->user_id = $data->user_id;
//$user->id = $data->id; 
// set user property values
$user->user_firstname = $data->user_firstname;
$user->user_lastname = $data->user_lastname;
$user->user_email = $data->user_email;
$user->plan_id = $data->plan_id;

 
// update the user
if($user->update()){
    echo '{';
        echo '"message": "User was updated."';
    echo '}';
}
 
// if unable to update the user, tell the user
else{
    echo '{';
        echo '"message": "Unable to update user."';
    echo '}';
}
?>