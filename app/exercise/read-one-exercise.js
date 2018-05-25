$(document).ready(function(){
 
    // handle 'read one' button clickread_one?user_id=2
    $(document).on('click', '.read-one-exercise-button', function(){
        // get exercise id
		var id = $(this).attr('data-id');
		
		$.getJSON("http://localhost/api/exercise/read_one.php?exercise_id=" + id, function(data){
			// read exercises button will be here
			// start html
			var read_one_exercise_html="";
			 
			// when clicked, it will show the exercise's list
			read_one_exercise_html+="<div id='read-exercises' class='btn btn-primary pull-right m-b-15px view-exercises-button'>";
				read_one_exercise_html+="<span class='glyphicon glyphicon-list'></span> Read exercises";
			read_one_exercise_html+="</div>";
			
			// exercise data will be shown in this table
			read_one_exercise_html+="<table class='table table-bordered table-hover'>";
			 
				// exercise fname
				read_one_exercise_html+="<tr>";
					read_one_exercise_html+="<td class='w-30-pct'>exercise name</td>";
					read_one_exercise_html+="<td class='w-70-pct'>" + data.exercise_name + "</td>";
				read_one_exercise_html+="</tr>";			 	
			 
			read_one_exercise_html+="</table>";
			
			// inject html to 'page-content' of our app
			$("#page-content").html(read_one_exercise_html);
			 
			// chage page title
			changePageTitle("Create exercise");
		});
				
    });
 
});