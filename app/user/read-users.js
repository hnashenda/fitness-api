$(document).ready(function(){
 
    // show list of users on first load
    showUsers();
 
});
 
// showUsers() method will be here
// function to show list of users
function showUsers(){
		
	 // get list of users from the API
	$.getJSON("http://localhost/api/user/read.php", function(data){
		
	// html for listing users
	var read_users_html="";
	 
	// when clicked, it will load the create user form
	read_users_html+="<div id='create-user' class='btn btn-primary pull-right m-b-15px create-user-button'>";
		read_users_html+="<span class='glyphicon glyphicon-plus'></span> Create user";
	read_users_html+="</div>";
	
	
	// start table
	read_users_html+="<table class='table table-bordered table-hover'>";
 
    // creating our table heading
    read_users_html+="<tr>";
        read_users_html+="<th class='w-25-pct'>First Name</th>";
        read_users_html+="<th class='w-10-pct'>Last Name</th>";
        read_users_html+="<th class='w-15-pct'>Email</th>";
        read_users_html+="<th class='w-25-pct text-align-center'>Action</th>";
    read_users_html+="</tr>";
     
    // loop through returned list of data
	$.each(data.records, function(key, val) {
	 
		// creating new table row per record
		read_users_html+="<tr>";
	 
			read_users_html+="<td>" + val.user_firstname + "</td>";
			read_users_html+="<td>" + val.user_lastname + "</td>";
			read_users_html+="<td>" + val.user_email + "</td>";
	 
			// 'action' buttons
			read_users_html+="<td>";
				// read one user button
				read_users_html+="<button class='btn btn-primary m-r-10px read-one-user-button' data-id='" + val.user_id + "'>";
					read_users_html+="<span class='glyphicon glyphicon-eye-open'></span> Read";
				read_users_html+="</button>";
	 
				// edit button
				read_users_html+="<button class='btn btn-info m-r-10px update-user-button' data-id='" + val.user_id + "'>";
					read_users_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
				read_users_html+="</button>";
	 
				// delete button
				read_users_html+="<button class='btn btn-danger delete-user-button' data-id='" + val.user_id + "'>";
					read_users_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
				read_users_html+="</button>";
			read_users_html+="</td>";
	 
		read_users_html+="</tr>";
	 
	});
 
	// end table
	read_users_html+="</table>";
		
	// inject to 'page-content' of our app
	$("#page-content").html(read_users_html);
	
	// chage page title
	changePageTitle("Read users");
	
	
	
	 
	});
}