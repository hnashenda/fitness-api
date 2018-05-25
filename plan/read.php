<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/plan.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$plan = new Plan($db);
 
// query products
$stmt = $plan->read();

$num = $stmt->rowCount();
 

 
// check if more than 0 record found
if($num>0){
 
    // plans array
    $plans_arr=array();
    $plans_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
		
		
        extract($row);
 
        $plans_item=array(
            "plan_id" => $plan_id,
            "plan_name" => $plan_name
        );
 
		// echo "so far so good".$plans_item;
 
        array_push($plans_arr["records"], $row);
    }
 
    echo json_encode($plans_arr);
}
 
else{
    echo json_encode(
        array("message" => "No plans found.")
    );
}
?>