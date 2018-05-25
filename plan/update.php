<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/plan.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
 // prepare plan object
$plan = new Plan($db);
 
// get id of plan to be edited
$data = json_decode(file_get_contents("php://input"));
  	
// set ID property of plan to be edited
$plan->plan_id = $data->plan_id;

// set plan property values
$plan->plan_name = $data->plan_name;

if(isset($data->day_id)){
$plan->day_id = $data->day_id;
}
 
 
 $plan->email();
 
// create array
$plan_arr = array(
    "user_email" =>  $plan->user_email
	//"day_name" =>  "hubert plan"
);
 
 //---------------------------------------uncomment next lines inorder to Email update on plan ------------------------------------------
 
/*$to_email =print_r( $plan->user_email, true );
$subject = 'Workout plan has been updated';
$message = 'This mail is sent notify that changes have been made to your workout plan';
$headers = 'From: noreply@virtuagym.com';
mail($to_email,$subject,$message,$headers);*/
  
 
// update the plan
if($plan->update()){
    echo '{';
        echo '"message": "Plan was updated."';
    echo '}';
}
 
// if unable to update the plan, tell the plan
else{
    echo '{';
        echo '"message": "Unable to update plan."';
    echo '}';
}
?>