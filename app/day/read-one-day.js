$(document).ready(function(){
 
    // handle 'read one' button clickread_one?user_id=2
    $(document).on('click', '.read-one-day-button', function(){
        // get day id
		var id = $(this).attr('data-id');
		
	
		
		$.getJSON("http://localhost/api/day/read_one.php?day_id=" + id, function(data){
			// read days button will be here
			// start html
			var read_one_day_html="";
			 
			// when clicked, it will show the day's list
			read_one_day_html+="<div id='read-days' class='btn btn-primary pull-right m-b-15px view-days-button'>";
				read_one_day_html+="<span class='glyphicon glyphicon-list'></span> Read days";
			read_one_day_html+="</div>";
			
			// day data will be shown in this table
			read_one_day_html+="<table class='table table-bordered table-hover'>";
			 
				// day name
				read_one_day_html+="<tr>";
					read_one_day_html+="<td class='w-30-pct'>day name</td>";
					read_one_day_html+="<td class='w-70-pct'>" + data.day_name + "</td>";
				read_one_day_html+="</tr>";		

				// day name
				for (var exercise_name in data.exercise_name ){
					read_one_day_html+="<tr>";
						read_one_day_html+="<td class='w-30-pct'>Day name</td>";
						read_one_day_html+="<td class='w-70-pct'>" + data.exercise_name[exercise_name] + "</td>";
					read_one_day_html+="</tr>";	
				}			 			
			 
			read_one_day_html+="</table>";
			
			// inject html to 'page-content' of our app
			$("#page-content").html(read_one_day_html);
			 
			// chage page title
			changePageTitle("Create day");
		});
				
    });
 
});