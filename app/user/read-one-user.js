$(document).ready(function(){
 
    // handle 'read one' button clickread_one?user_id=2
    $(document).on('click', '.read-one-user-button', function(){
        // get user id
		var id = $(this).attr('data-id');
		
		$.getJSON("http://localhost/api/user/read_one.php?user_id=" + id, function(data){
			// read users button will be here
			// start html
			var read_one_user_html="";
			 
			// when clicked, it will show the user's list
			read_one_user_html+="<div id='read-users' class='btn btn-primary pull-right m-b-15px read-users-button'>";
				read_one_user_html+="<span class='glyphicon glyphicon-list'></span> Read users";
			read_one_user_html+="</div>";
			
			// user data will be shown in this table
			read_one_user_html+="<table class='table table-bordered table-hover'>";
			 
				// user firstname
				read_one_user_html+="<tr>";
					read_one_user_html+="<td class='w-30-pct'>Firstname</td>";
					read_one_user_html+="<td class='w-70-pct'>" + data.user_firstname + "</td>";
				read_one_user_html+="</tr>";
			 
				// user lastname
				read_one_user_html+="<tr>";
					read_one_user_html+="<td>Lastname</td>";
					read_one_user_html+="<td>" + data.user_lastname  + "</td>";
				read_one_user_html+="</tr>";
			 
				// user email
				read_one_user_html+="<tr>";
					read_one_user_html+="<td>Email</td>";
					read_one_user_html+="<td>" + data.user_email + "</td>";
				read_one_user_html+="</tr>";
			 				
				// planname
				read_one_user_html+="<tr>";
					read_one_user_html+="<td>Plan Name</td>";
					read_one_user_html+="<td>" + data.plan_name + "</td>";
				read_one_user_html+="</tr>";
			 
			 
			read_one_user_html+="</table>";
			
			// inject html to 'page-content' of our app
			$("#page-content").html(read_one_user_html);
			 
			// chage page title
			changePageTitle("Create user");
		});
				
    });
 
});