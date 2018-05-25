$(document).ready(function(){
	 
    // show html form when 'update exercise' button was clicked
    $(document).on('click', '.update-exercise-button', function(){
        // get product id
		var exercise_id= $(this).attr('data-id');
		
		// read one record based on given product id
		$.getJSON("http://localhost/api/exercise/read_one.php?exercise_id=" + exercise_id, function(data){
		
			// values will be used to fill out our form
			var exercise_name = data.exercise_name;
						 
			// load list of exercises will be here
			
			// store 'update product' html to this variable
			var update_exercise_html="";
			 
			// 'read exercises' button to show list of exercises
			update_exercise_html+="<div id='read-exercises' class='btn btn-primary pull-right m-b-15px view-exercises-button'>";
				update_exercise_html+="<span class='glyphicon glyphicon-list'></span> Read exercises";
			update_exercise_html+="</div>";
			
			// build 'update exercise' html form
		// we used the 'required' html5 property to prevent empty fields
		update_exercise_html+="<form id='update-exercise-form' action='#' method='post' border='0'>";
			update_exercise_html+="<table class='table table-hover table-responsive table-bordered'>";
		 
				// firstname field
				update_exercise_html+="<tr>";
					update_exercise_html+="<td>exercise name</td>";
					update_exercise_html+="<td><input value=\"" + exercise_name + "\" type='text' name='exercise_name' class='form-control' required /></td>";
				update_exercise_html+="</tr>";		 
						 
				update_exercise_html+="<tr>";
		 
					// hidden 'exercise id' to identify which record to delete
					update_exercise_html+="<td><input value=\"" + exercise_id + "\" name='exercise_id' type='hidden' /></td>";
		 
					// button to submit form
					update_exercise_html+="<td>";
						update_exercise_html+="<button type='submit' class='btn btn-info'>";
							update_exercise_html+="<span class='glyphicon glyphicon-edit'></span> Update exercise";
						update_exercise_html+="</button>";
					update_exercise_html+="</td>";
		 
				update_exercise_html+="</tr>";
		 
			update_exercise_html+="</table>";
		update_exercise_html+="</form>";
					
			// inject to 'page-content' of our app
		$("#page-content").html(update_exercise_html);
		 
		// chage page title
		changePageTitle("Update exercise");				
			
		});
		
    });
     
    // 'update exercise form' submit handle will be here
	// will run if 'create exercise' form was submitted
	$(document).on('submit', '#update-exercise-form', function(){
		 
		// get form data will be here 
		// get form data
		var form_data=JSON.stringify($(this).serializeObject());
		 
		 
		// submit form data to api
		$.ajax({
			url: "http://localhost/api/exercise/update.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				// exercise was created, go back to products list
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