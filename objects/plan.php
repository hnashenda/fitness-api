<?php
class Plan{
 
    // database connection and table name
    private $conn;
    private $table_name = "plans";
 
    // object properties
    public $plan_id;
    public $plan_name ;
	public $day_id;
	public $day_name;
    public $user_email;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
		$this->day_id =array();
		$this->day_name =[];
    }
	
	// read plans
	function read(){	 
		
		$query = "SELECT * FROM plans";
		
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	
	// create plan
	function create(){
		
		$sql = "		
		INSERT IGNORE INTO " . $this->table_name . " SET plan_name=:plan_name; 
		SET @plan_id = LAST_INSERT_ID();";
		$theLength = sizeof($this->day_id);
		for ($x = 0; $x < $theLength; $x++) {
			$sql .= "INSERT INTO days_plans (day_id,plan_id) VALUES(".$this->day_id[$x].", @plan_id);";			
		}
				
		try {
			$stmt = $this->conn->prepare($sql);
			
			$this->plan_name=htmlspecialchars(strip_tags($this->plan_name));
			// bind values
			$stmt->bindParam(":plan_name", $this->plan_name);
			
			
			$stmt->execute();
		}
		catch (PDOException $e)
		{
			echo $e->getMessage();
			die();
		}
				 
	}
	// used when filling up the update plan form
	function readOne(){
	 
		$query ="SELECT plans.plan_name,days.day_name FROM plans LEFT JOIN days_plans ON days_plans.plan_id = plans.plan_id LEFT JOIN days ON days.day_id = days_plans.day_id WHERE plans.plan_id = ?";
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id of plan to be updated
		$stmt->bindParam(1, $this->id);				
	 
		// execute query
		$stmt->execute();
	 		
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
		{
			//echo $row['day_name'] . "\n";
			
			$this->plan_name = $row['plan_name'];		
		
			$this->day_name[]=$row['day_name'];
			
		}	 
		
	}
	
	// update the plan
	function update(){
	 	
			$sql = "UPDATE " . $this->table_name . " SET plan_name=:plan_name WHERE plan_id = :plan_id ; 
			DELETE FROM days_plans WHERE plan_id = :plan_id;
			";
			
			$theLength = sizeof($this->day_id);
			for ($x = 0; $x < $theLength; $x++) {
				$sql .= "INSERT INTO days_plans (day_id,plan_id) VALUES(".$this->day_id[$x].", ".$this->plan_id.");";
			}
			
			try {
				$stmt = $this->conn->prepare($sql);
				
				// sanitize
				$this->plan_name=htmlspecialchars(strip_tags($this->plan_name));			
				$this->plan_id=htmlspecialchars(strip_tags($this->plan_id));
				
				// bind new values
				$stmt->bindParam(':plan_name', $this->plan_name);			
				$stmt->bindParam(':plan_id', $this->plan_id);
				
				
				$stmt->execute();
								
			}
			catch (PDOException $e)
			{
				echo $e->getMessage();
				die();
			}
		
		
		/*	$userEmail="SELECT user_email  FROM users where plan_id = :plan_id'";			
		
		  try {
				$stmt = $this->conn->prepare($userEmail);
				
				// sanitize
						
				$this->plan_id=htmlspecialchars(strip_tags($this->plan_id));
				
				// bind new values
						
				$stmt->bindParam(':plan_id', $this->plan_id);
				
				
				$stmt->execute();
				
				@mail(
				
				"$userEmail",

				
				"New order added",

				
				"Workout plan has been modified .\n\n". 
				"To view it, please go to:\n".
				"http://fhfhfhf/db/orders_view.php?SelectedID=$recID",

				
				"From: webmaster@virtuagym.com"
			);
				
				
				// our modified code for sending the email notification
			
				
			}
			catch (PDOException $e)
			{
				echo $e->getMessage();
				die();
			}
		*/
		
		
		
	/*								===============				working code	             ================
	
	$query = "UPDATE
					" . $this->table_name . "
				SET
					plan_name = :plan_name				
				WHERE
					plan_id = :plan_id";	 		
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->plan_name=htmlspecialchars(strip_tags($this->plan_name));			
		$this->plan_id=htmlspecialchars(strip_tags($this->plan_id));
	 
		// bind new values
		$stmt->bindParam(':plan_name', $this->plan_name);			
		$stmt->bindParam(':plan_id', $this->plan_id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;*/
	}
	
	// delete the product
	function delete(){
	 
		// delete query
		//$query = "DELETE FROM " . $this->table_name . " WHERE plan_id = ?";				
	 
		$query = "DELETE FROM " . $this->table_name . " WHERE plan_id = ?";		
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->plan_id=htmlspecialchars(strip_tags($this->plan_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->plan_id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 	 
		return false;
		 
	}
	
	function email(){	 
		
		$query = "SELECT user_email  FROM users WHERE plan_id = ?";		
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->plan_id=htmlspecialchars(strip_tags($this->plan_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->plan_id);
	 
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