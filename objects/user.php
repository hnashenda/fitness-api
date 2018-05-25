<?php
class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "users";
 
    // object properties
    public $user_id;
    public $user_firstname ;
    public $user_lastname;
    public $user_email;
	public $plan_id;
   
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	// read users
	function read(){
	 
	 $query = "SELECT plans.plan_name, users.user_id, users.user_firstname, users.user_lastname, users.user_email, users.plan_id FROM users LEFT JOIN plans  ON users.plan_id = plans.plan_id";
		// prepare query statement
		
		//$query = "SELECT * FROM users";
		
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	
	// create user
	function create(){
	 
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					user_firstname=:user_firstname, user_lastname=:user_lastname, user_email=:user_email, plan_id=:plan_id";
	 
		//$query= "INSERT INTO users (user_firstname, user_lastname,user_email) VALUES (?, ?,?)";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->user_firstname=htmlspecialchars(strip_tags($this->user_firstname));
		$this->user_lastname=htmlspecialchars(strip_tags($this->user_lastname));
		$this->user_email=htmlspecialchars(strip_tags($this->user_email));		
		$this->plan_id=htmlspecialchars(strip_tags($this->plan_id));	
		
		// bind values
		$stmt->bindParam(":user_firstname", $this->user_firstname);
		$stmt->bindParam(":user_lastname", $this->user_lastname);
		$stmt->bindParam(":user_email", $this->user_email);
		$stmt->bindParam(":plan_id", $this->plan_id);
		
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
	// used when filling up the update user form
	function readOne(){	 
	
	$query = "SELECT plans.plan_name as plan_name, users.user_id, users.user_firstname, users.user_lastname, users.user_email, users.plan_id FROM users LEFT JOIN plans  ON users.plan_id = plans.plan_id WHERE	users.user_id = ?";
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id of user to be updated
		$stmt->bindParam(1, $this->id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		$this->user_firstname = $row['user_firstname'];
		$this->user_lastname = $row['user_lastname'];
		$this->user_email = $row['user_email'];
		$this->plan_id = $row['plan_id'];
		$this->plan_name = $row['plan_name'];
		
	}
	
	// update the user
	function update(){
	 
		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					user_firstname = :user_firstname,
					user_lastname = :user_lastname,
					user_email = :user_email,
					plan_id = :plan_id	
				WHERE
					user_id = :user_id";
	 //user_firstname=:user_firstname, user_lastname=:user_lastname, user_email=:user_email";
		//$query = "UPDATE users SET user_firstname=?, user_lastname=?, user_email=? WHERE user_id=?";
         
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->user_firstname=htmlspecialchars(strip_tags($this->user_firstname));
		$this->user_lastname=htmlspecialchars(strip_tags($this->user_lastname));
		$this->user_email=htmlspecialchars(strip_tags($this->user_email));	
		$this->category_id=htmlspecialchars(strip_tags($this->plan_id));
		$this->user_id=htmlspecialchars(strip_tags($this->user_id));
	 
		// bind new values
		$stmt->bindParam(':user_firstname', $this->user_firstname);
		$stmt->bindParam(':user_lastname', $this->user_lastname);
		$stmt->bindParam(':user_email', $this->user_email);	
		$stmt->bindParam(':plan_id', $this->plan_id);			
		$stmt->bindParam(':user_id', $this->user_id);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete the user
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE user_id = ?";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->user_id=htmlspecialchars(strip_tags($this->user_id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->user_id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
	
	
}