<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/day.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$day = new Day($db);
 
// query products
$stmt = $day->read();

$num = $stmt->rowCount();
 

 
// check if more than 0 record found
if($num>0){
 
    // days array
    $days_arr=array();
    $days_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
		
		
        extract($row);
 
        $days_item=array(
            "day_id" => $day_id,
            "day_name" => $day_name
        );
 
		// echo "so far so good".$days_item;
 
        array_push($days_arr["records"], $row);
    }
 
    echo json_encode($days_arr);
}
 
else{
    echo json_encode(
        array("message" => "No days found.")
    );
}
?>