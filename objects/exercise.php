<?php
class Exercise{
 
    // database connection and table name
    private $conn;
    private $table_name = "exercises";
 
    // object properties
    public $exercise_id;
    public $exercise_name ;
   
   
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	// read exercises
	function read(){
	 
		// select all query
		/*$query = "SELECT
					c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
				FROM
					" . $this->table_name . " p
					LEFT JOIN
						categories c
							ON p.category_id = c.id
				ORDER BY
					p.created DESC";*/
	 
		// prepare query statement
		
		$query = "SELECT * FROM exercises";
		
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	
	// create exercise
	function create(){
	 
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					exercise_name=:exercise_name";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->exercise_name=htmlspecialchars(strip_tags($this->exercise_name));
		
	 
		// bind values
		$stmt->bindParam(":exercise_name", $this->exercise_name);
		
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
	// used when filling up the update exercise form
	function readOne(){
	 
		// query to read single record
		/*$query = "SELECT
					c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
				FROM
					" . $this->table_name . " p
					LEFT JOIN
						categories c
							ON p.category_id = c.id
				WHERE
					p.id = ?
				LIMIT
					0,1";*/
		$query  = "SELECT * FROM exercises WHERE exercise_id = ?";
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id of exercise to be updated
		$stmt->bindParam(1, $this->id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		$this->exercise_name = $row['exercise_name'];		
		
	}
	
	// update the exercise
	function update(){
	 
		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					exercise_name = :exercise_name				
				WHERE
					exercise_id = :exercise_id";
	 //exercise_firstname=:exercise_firstname, exercise_lastname=:exercise_lastname, exercise_email=:exercise_email";
		//$query = "UPDATE exercises SET exercise_firstname=?, exercise_lastname=?, exercise_email=? WHERE exercise_id=?";
         
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->exercise_name=htmlspecialchars(strip_tags($this->exercise_name));			
		$this->exercise_id=htmlspecialchars(strip_tags($this->exercise_id));
	 
		// bind new values
		$stmt->bindParam(':exercise_name', $this->exercise_name);			
		$stmt->bindParam(':exercise_id', $this->exercise_id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the product
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE exercise_id = ?";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->exercise_id=htmlspecialchars(strip_tags($this->exercise_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->exercise_id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
	
	
}