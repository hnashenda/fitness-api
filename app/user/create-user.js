$(document).ready(function(){
 
    // show html form when 'create user' button was clicked
    $(document).on('click', '.create-user-button', function(){
        // workout plans api call will be here
		// load list of categories
		
			
		
			$.getJSON("http://localhost/api/plan/read.php", function(data){
				// build workout plans option html
				// loop through returned list of data
				
				var plans_options_html="";
				
				plans_options_html+="<select name='plan_id' class='form-control'>";
				$.each(data.records, function(key, val){
					plans_options_html+="<option value='" + val.plan_id + "'>" + val.plan_name + "</option>";
				});
				plans_options_html+="</select>";
			
		
		// 'create user form' handle will be here
	
		// we have our html form here where user information will be entered
		// we used the 'required' html5 property to prevent empty fields
		var create_user_html="";
		 
		// 'read users' button to show list of users
		create_user_html+="<div id='read-users' class='btn btn-primary pull-right m-b-15px read-users-button'>";
			create_user_html+="<span class='glyphicon glyphicon-list'></span> Read users";
		create_user_html+="</div>";
			
		// 'create user' html form
		create_user_html+="<form id='create-user-form' action='#' method='post' border='0'>";
			create_user_html+="<table class='table table-hover table-responsive table-bordered'>";
		 
				// name field
				create_user_html+="<tr>";
					create_user_html+="<td>First Name</td>";
					create_user_html+="<td><input type='text' name='user_firstname' class='form-control' required /></td>";
				create_user_html+="</tr>";
		 
				// last field
				create_user_html+="<tr>";
					create_user_html+="<td>Last Name</td>";
					create_user_html+="<td><input type='text'name='user_lastname' class='form-control' required /></td>";
				create_user_html+="</tr>";
		 
				// email field
				create_user_html+="<tr>";
					create_user_html+="<td>Email</td>";
					create_user_html+="<td><input type='text'name='user_email' class='form-control' required /></td>";
				create_user_html+="</tr>";
		 
				// plans 'select' field
				create_user_html+="<tr>";
					create_user_html+="<td>Plans</td>";
					create_user_html+="<td>" + plans_options_html + "</td>";
				create_user_html+="</tr>";
		 
				// button to submit form
				create_user_html+="<tr>";
					create_user_html+="<td></td>";
					create_user_html+="<td>";
						create_user_html+="<button type='submit' class='btn btn-primary'>";
							create_user_html+="<span class='glyphicon glyphicon-plus'></span> Create user";
						create_user_html+="</button>";
					create_user_html+="</td>";
				create_user_html+="</tr>";
		 
			create_user_html+="</table>";
		create_user_html+="</form>";
		
		// inject html to 'page-content' of our app
		$("#page-content").html(create_user_html);
		 
		// chage page title
		changePageTitle("Create user");
			
		});
    });
 
    
		
	// will run if create user form was submitted
	$(document).on('submit', '#create-user-form', function(){
		// form data will be here
		// get form data
		var form_data=JSON.stringify($(this).serializeObject());
		
		// submit form data to api
		$.ajax({
			url: "http://localhost/api/user/create.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				// user was created, go back to users list
				showUsers();
			},
			error: function(xhr, resp, text) {
				// show error to console
				console.log(xhr, resp, text);
			}
		});
		 
		return false;
		
	});
	
	
	
});