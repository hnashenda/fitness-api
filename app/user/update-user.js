$(document).ready(function(){
 
    // show html form when 'update user' button was clicked
    $(document).on('click', '.update-user-button', function(){
        // get product id
		var user_id= $(this).attr('data-id');				
		
		// read one record based on given product id
		$.getJSON("http://localhost/api/user/read_one.php?user_id=" + user_id, function(data){
		
			// values will be used to fill out our form
			var user_firstname = data.user_firstname;
			var user_lastname = data.user_lastname;
			var user_email = data.user_email;	
			var plan_id = data.plan_id;
			var plan_name = data.plan_name;			
			// load list of plans will be here			
			
			// load list of plans
			$.getJSON("http://localhost/api/plan/read.php", function(data){
			 
				// build 'plans option' html
				// loop through returned list of data
				var plans_options_html="";
				plans_options_html+="<select name='plan_id' class='form-control'>";
			 
				$.each(data.records, function(key, val){
					 
					// pre-select option is plan id is the same
					if(val.plan_id==plan_id){
						plans_options_html+="<option value='" + val.plan_id + "' selected>" + val.plan_name + "</option>";
					}
			 
					else{
						plans_options_html+="<option value='" + val.plan_id + "'>" + val.plan_name + "</option>";
					}
				});
				plans_options_html+="</select>";
				 
				// update product html will be here						
			
			// store 'update product' html to this variable
			var update_user_html="";
			 
			// 'read users' button to show list of users
			update_user_html+="<div id='read-users' class='btn btn-primary pull-right m-b-15px read-users-button'>";
				update_user_html+="<span class='glyphicon glyphicon-list'></span> Read users";
			update_user_html+="</div>";
			
			// build 'update user' html form
		// we used the 'required' html5 property to prevent empty fields
		update_user_html+="<form id='update-user-form' action='#' method='post' border='0'>";
			update_user_html+="<table class='table table-hover table-responsive table-bordered'>";
		 
				// firstname field
				update_user_html+="<tr>";
					update_user_html+="<td>Firstname</td>";
					update_user_html+="<td><input value=\"" + user_firstname + "\" type='text' name='user_firstname' class='form-control' required /></td>";
				update_user_html+="</tr>";
		 
				// lastname field
				update_user_html+="<tr>";
					update_user_html+="<td>Lastname</td>";
					update_user_html+="<td><input value=\"" + user_lastname + "\" type='text' name='user_lastname' class='form-control' required /></td>";
				update_user_html+="</tr>";
		 
					// email field
				update_user_html+="<tr>";
					update_user_html+="<td>Email</td>";
					update_user_html+="<td><input value=\"" + user_email + "\" type='text' name='user_email' class='form-control' required /></td>";
				update_user_html+="</tr>";
				
				
				// plans 'select' field
				update_user_html+="<tr>";
					update_user_html+="<td>Plans</td>";
					update_user_html+="<td>" + plans_options_html + "</td>";
				update_user_html+="</tr>";
				
		 
				update_user_html+="<tr>";
		 
					// hidden 'user id' to identify which record to delete
					update_user_html+="<td><input value=\"" + user_id + "\" name='user_id' type='hidden' /></td>";
		 
					// button to submit form
					update_user_html+="<td>";
						update_user_html+="<button type='submit' class='btn btn-info'>";
							update_user_html+="<span class='glyphicon glyphicon-edit'></span> Update user";
						update_user_html+="</button>";
					update_user_html+="</td>";
		 
				update_user_html+="</tr>";
		 
			update_user_html+="</table>";
		update_user_html+="</form>";
					
			// inject to 'page-content' of our app
		$("#page-content").html(update_user_html);
		 
		// chage page title
		changePageTitle("Update user");		
			
			});						
			
		});
		
    });
     
    // 'update user form' submit handle will be here
	// will run if 'create user' form was submitted
	$(document).on('submit', '#update-user-form', function(){
		 
		// get form data will be here 
		// get form data
		var form_data=JSON.stringify($(this).serializeObject());
		 		 
		// submit form data to api
		$.ajax({
			url: "http://localhost/api/user/update.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				// user was created, go back to products list
				showUsers();
			},
			error: function(xhr, resp, text) {
				// show error to console
				console.log(xhr, resp, text);
				console.warn(xhr.responseText);
			}
		}); 		 		 
		 
		return false;
	});		
	
});