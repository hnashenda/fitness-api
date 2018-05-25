<?php
class Days_Exercises{
 
    // database connection and table name
    private $conn;
    private $table_name = "days_exercises";
 
    // object properties
    public $day_id;
    public $plan_id ;
   
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	// read days
	function read(){	
		
		$query = "SELECT * FROM " . $this->table_name . " ";
		
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}		
	
}