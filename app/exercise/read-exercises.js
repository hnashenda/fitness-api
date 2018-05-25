$(document).ready(function(){
 
    // show list of exercises on first load
	$(document).on('click', '.view-exercises-button', function(){		
		showExercises();
	});
 
});
 
// showexercises() method will be here
// function to show list of exercises
function showExercises(){
		
	
		 // get list of exercises from the API
		$.getJSON("http://localhost/api/exercise/read.php", function(data){
									
		// html for listing exercises
		var read_exercises_html="";
		 
		// when clicked, it will load the create exercise form
		read_exercises_html+="<div id='create-exercise' class='btn btn-primary pull-right m-b-15px create-exercise-button'>";
			read_exercises_html+="<span class='glyphicon glyphicon-plus'></span> Create exercises";
		read_exercises_html+="</div>";
		
		
		// start table
		read_exercises_html+="<table class='table table-bordered table-hover'>";
	 
		// creating our table heading
		read_exercises_html+="<tr>";
			read_exercises_html+="<th class='w-25-pct'>Exercise Name</th>";			
			read_exercises_html+="<th class='w-25-pct text-align-center'>Action</th>";
		read_exercises_html+="</tr>";
		 
		// loop through returned list of data
		$.each(data.records, function(key, val) {
		 
			// creating new table row per record
			read_exercises_html+="<tr>";
		 
				read_exercises_html+="<td>" + val.exercise_name + "</td>";
				
		 
				// 'action' buttons
				read_exercises_html+="<td>";
					// read one exercise button
					read_exercises_html+="<button class='btn btn-primary m-r-10px read-one-exercise-button' data-id='" + val.exercise_id + "'>";
						read_exercises_html+="<span class='glyphicon glyphicon-eye-open'></span> Read";
					read_exercises_html+="</button>";
		 
					// edit button
					read_exercises_html+="<button class='btn btn-info m-r-10px update-exercise-button' data-id='" + val.exercise_id + "'>";
						read_exercises_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
					read_exercises_html+="</button>";
		 
					// delete button
					read_exercises_html+="<button class='btn btn-danger delete-exercise-button' data-id='" + val.exercise_id + "'>";
						read_exercises_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
					read_exercises_html+="</button>";
				read_exercises_html+="</td>";
		 
			read_exercises_html+="</tr>";
		 
		});
	 
		// end table
		read_exercises_html+="</table>";
		
		
		
		
		// inject to 'page-content' of our app
		$("#page-content").html(read_exercises_html);
		
		// chage page title
		changePageTitle("Read exercises");
			 
		
	
	 });
}