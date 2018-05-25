<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/day.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
 // prepare day object
$day = new Day($db);
 
// get id of day to be edited
$data = json_decode(file_get_contents("php://input"));
 
 
// set ID property of day to be edited
$day->day_id = $data->day_id;
//$day->id = $data->id; 
// set day property values
$day->day_name = $data->day_name;

if(isset($data->exercise_id)){
$day->exercise_id = $data->exercise_id;
} 
 
 
$day->email();
 
// create array
$day_arr = array(
    "user_email" =>  $day->user_email
	//"day_name" =>  "hubert plan"
);
 
 //---------------------------------------uncomment next lines inorder to Email update on day ------------------------------------------
 
/*$to_email =print_r( $day->user_email, true );
$subject = 'Workout day has been updated';
$message = 'This mail is sent notify that changes have been made to your workout plan';
$headers = 'From: noreply@virtuagym.com';
mail($to_email,$subject,$message,$headers);*/
  
 
 
 
// update the day
if($day->update()){
    echo '{';
        echo '"message": "day was updated."';
    echo '}';
}
 
// if unable to update the day, tell the day
else{
    echo '{';
        echo '"message": "Unable to update day."';
    echo '}';
}
?>