$(document).ready(function(){
  
    // show html form when 'create plan' button was clicked
    $(document).on('click', '.create-exercise-button', function(){
       
		// we have our html form here where exercise information will be entered
		// we used the 'required' html5 property to prevent empty fields
		var create_exercise_html="";
		 
		// 'read exercises' button to show list of exercises
		create_exercise_html+="<div id='read-exercises' class='btn btn-primary pull-right m-b-15px view-exercises-button'>";
			create_exercise_html+="<span class='glyphicon glyphicon-list'></span> Read exercises";
		create_exercise_html+="</div>";
			
		// 'create exercise' html form
		create_exercise_html+="<form id='create-exercise-form' action='#' method='post' border='0'>";
			create_exercise_html+="<table class='table table-hover table-responsive table-bordered'>";
		 
				// name field
				create_exercise_html+="<tr>";
					create_exercise_html+="<td>exercise Name</td>";
					create_exercise_html+="<td><input type='text' name='exercise_name' class='form-control' required /></td>";
				create_exercise_html+="</tr>";
		 
				// button to submit form
				create_exercise_html+="<tr>";
					create_exercise_html+="<td></td>";
					create_exercise_html+="<td>";
						create_exercise_html+="<button type='submit' class='btn btn-primary'>";
							create_exercise_html+="<span class='glyphicon glyphicon-plus'></span> Create exercise";
						create_exercise_html+="</button>";
					create_exercise_html+="</td>";
				create_exercise_html+="</tr>";
		 
			create_exercise_html+="</table>";
		create_exercise_html+="</form>";
		
		// inject html to 'page-content' of our app
		$("#page-content").html(create_exercise_html);
		 
		// chage page title
		changePageTitle("Create exercise");
					
    });
 		
	// will run if create exercise form was submitted
	$(document).on('submit', '#create-exercise-form', function(){
		// form data will be here
		// get form data
		var form_data=JSON.stringify($(this).serializeObject());
		
		// submit form data to api
		$.ajax({
			url: "http://localhost/api/exercise/create.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				// exercise was created, go back to exercises list
				showExercises();
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