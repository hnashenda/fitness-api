<?php
class Day{
 
    // database connection and table name
    private $conn;
    private $table_name = "days";
 
    // object properties
    public $day_id;
    public $day_name ;
	public $exercise_id;
	public $exercise_name;
	public $user_email;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
		$this->exercise_id =array();
		$this->exercise_name =[];
    }
	
	// read days
	function read(){
	 
		// prepare query statement
		
		$query = "SELECT * FROM days";
		
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	
	// create day
	function create(){
	 
		$sql = "		
		INSERT IGNORE INTO " . $this->table_name . " SET day_name=:day_name; 
		SET @day_id = LAST_INSERT_ID();";
		$theLength = sizeof($this->exercise_id);
		for ($x = 0; $x < $theLength; $x++) {
			$sql .= "INSERT INTO days_exercises (day_id,exercise_id) VALUES(@day_id, ".$this->exercise_id[$x].");";			
		}
		
		
		try {
			$stmt = $this->conn->prepare($sql);
			
			$this->day_name=htmlspecialchars(strip_tags($this->day_name));
			// bind values
			$stmt->bindParam(":day_name", $this->day_name);
			
			
			$stmt->execute();
		}
		catch (PDOException $e)
		{
			echo $e->getMessage();
			die();
		}		
		 
	}
	// used when filling up the update day form
	function readOne(){
	 
		$query ="SELECT days.day_name,exercises.exercise_name FROM days LEFT JOIN days_exercises ON days_exercises.day_id = days.day_id LEFT JOIN exercises ON exercises.exercise_id = days_exercises.exercise_id WHERE days.day_id = ?";
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id of plan to be updated
		$stmt->bindParam(1, $this->id);
		
		// execute query
		$stmt->execute();	 
		
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
		{
			//echo $row['day_name'] . "\n";
			
			$this->day_name = $row['day_name'];		
		
			$this->exercise_name[]=$row['exercise_name'];
			
		}
		
	}
	
	// update the day
	function update(){
		
		//echo "the days id is ".$this->day_id;
	 
		$sql = "UPDATE " . $this->table_name . " SET day_name=:day_name WHERE day_id = :day_id ; 
			DELETE FROM days_exercises WHERE day_id = :day_id;
			";
			
			$theLength = sizeof($this->exercise_id);
			for ($x = 0; $x < $theLength; $x++) {
				$sql .= "INSERT INTO days_exercises (day_id,exercise_id) VALUES(".$this->day_id.", ".$this->exercise_id[$x].");";
				//$sql .= "INSERT INTO days_exercises (day_id,exercise_id) VALUES(5, 10);";
			}
			
			try {
				$stmt = $this->conn->prepare($sql);
				
				// sanitize
				$this->day_name=htmlspecialchars(strip_tags($this->day_name));			
				$this->day_id=htmlspecialchars(strip_tags($this->day_id));
				
				// bind new values
				$stmt->bindParam(':day_name', $this->day_name);			
				$stmt->bindParam(':day_id', $this->day_id);
				
				
				$stmt->execute();
			}
			catch (PDOException $e)
			{
				echo $e->getMessage();
				die();
			}
		
	}
	
	// delete the product
	function delete(){
	 
		$query = "DELETE FROM " . $this->table_name . " WHERE day_id = ?";		
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->day_id=htmlspecialchars(strip_tags($this->day_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->day_id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 	 
		return false;
		 
	}
	
	function email(){	 
		
		$query = "SELECT user_email  FROM users WHERE day_id = ?";		
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->day_id=htmlspecialchars(strip_tags($this->day_id));
	 
		// bind id of record to email
		$stmt->bindParam(1, $this->day_id);
	 
		// execute query
		if($stmt->execute()){
	 	 
		// execute query
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC))		{
				//echo $row['day_name'] . "\n";
				
				$this->user_email[] = $row['user_email'];		
				
			}
			return true;
		}
		 
		 return false;
	}
	
	
	
}