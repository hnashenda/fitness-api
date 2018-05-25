$(document).ready(function(){
  
    // show html form when 'create day' button was clicked
    $(document).on('click', '.create-day-button', function(){
        // workout days api call will be here
		
		// load list of days
		$.getJSON("http://localhost/api/exercise/read.php", function(data){
			
			var exercises_options_html="";
				exercises_options_html+="<select name='exercise_id' class='form-control' size='5' multiple>";
				$.each(data.records, function(key, val){
					exercises_options_html+="<option value='" + val.exercise_id + "'>" + val.exercise_name  + "</option>";
				});
				exercises_options_html+="</select>";
							
		// 'create day form' handle will be here

		// we have our html form here where day information will be entered
		// we used the 'required' html5 property to prevent empty fields
		var create_day_html="";
		 
		// 'read days' button to show list of days
		create_day_html+="<div id='read-days' class='btn btn-primary pull-right m-b-15px view-days-button'>";
			create_day_html+="<span class='glyphicon glyphicon-list'></span> Read days";
		create_day_html+="</div>";
			
		// 'create day' html form
		create_day_html+="<form id='create-day-form' action='#' method='post' border='0'>";
			create_day_html+="<table class='table table-hover table-responsive table-bordered'>";
		 
				// name field
				create_day_html+="<tr>";
					create_day_html+="<td>day Name</td>";
					create_day_html+="<td><input type='text' name='day_name' class='form-control' required /></td>";
				create_day_html+="</tr>";
		 		 
				// exercises 'select' field
				create_day_html+="<tr>";
					create_day_html+="<td>Select Exercises</td>";
					create_day_html+="<td>" + exercises_options_html + "</td>";
				create_day_html+="</tr>";
		 
		 
				// button to submit form
				create_day_html+="<tr>";
					create_day_html+="<td></td>";
					create_day_html+="<td>";
						create_day_html+="<button type='submit' class='btn btn-primary'>";
							create_day_html+="<span class='glyphicon glyphicon-plus'></span> Create day";
						create_day_html+="</button>";
					create_day_html+="</td>";
				create_day_html+="</tr>";
		 
			create_day_html+="</table>";
		create_day_html+="</form>";
		
		
		create_day_html+="<p><script type='text/javascript'>";
		create_day_html+="$(document).ready(function() {";
		create_day_html+="$('select').multicheckbox();";
		create_day_html+="});";
		create_day_html+="</script></p>";
		
		
		// inject html to 'page-content' of our app
		$("#page-content").html(create_day_html);
		 
		// chage page title
		changePageTitle("Create day");
		});	
		
    });
 
    
		
	// will run if create day form was submitted
	$(document).on('submit', '#create-day-form', function(){
		// form data will be here
		// get form data
		var form_data=JSON.stringify($(this).serializeObject());
		
		// submit form data to api
		$.ajax({
			url: "http://localhost/api/day/create.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				// day was created, go back to days list
				showDays();
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