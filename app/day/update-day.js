$(document).ready(function(){
	 
    // show html form when 'update day' button was clicked
    $(document).on('click', '.update-day-button', function(){
        // get product id
		var day_id= $(this).attr('data-id');
		var selected_fields_day = [];
				
		
		// read one record based on given product id
		$.getJSON("http://localhost/api/day/read_one.php?day_id=" + day_id, function(data){
		
			// values will be used to fill out our form
			var day_name = data.day_name;
			
			//console.log("the day name"+day_name);	
			// load list of exercise will be here
			
			getExercises().then(function(selected_fields_day){
				  //received data!
				 
			
			$.getJSON("http://localhost/api/exercise/read.php", function(data){
			
			
				var done="";
				var exercises_options_html="";
				
				//console.log("part 1 loop");
				exercises_options_html+="<select name='exercise_id' class='form-control' size='5' multiple>";
			 
					$.each(data.records, function(key, val){
						 done=true;
						//console.log("part 2 loop");
							for (var key_sel in selected_fields_day["records"]  ){
							
								if(val.exercise_id == selected_fields_day["records"][key_sel].exercise_id && day_id == selected_fields_day["records"][key_sel].day_id){	
									exercises_options_html+="<option value='" + val.exercise_id + "' selected>" + val.exercise_name + "</option>";
									done = false;
									break;
								}
						 
							}
							if(done){							
								exercises_options_html+="<option value='" + val.exercise_id + "'>" + val.exercise_name + "</option>";
							}
						});
			
						
			
			// store 'update product' html to this variable
			var update_day_html="";
			 
			// 'read days' button to show list of days
			update_day_html+="<div id='read-days' class='btn btn-primary pull-right m-b-15px view-days-button'>";
				update_day_html+="<span class='glyphicon glyphicon-list'></span> Read days";
			update_day_html+="</div>";
			
			// build 'update day' html form
		// we used the 'required' html5 property to prevent empty fields
		update_day_html+="<form id='update-day-form' action='#' method='post' border='0'>";
			update_day_html+="<table class='table table-hover table-responsive table-bordered'>";
		 
				// firstname field
				update_day_html+="<tr>";
					update_day_html+="<td>day name</td>";
					update_day_html+="<td><input value=\"" + day_name + "\" type='text' name='day_name' class='form-control' required /></td>";
				update_day_html+="</tr>";		 
				

				// days 'select' field
						update_day_html+="<tr>";
							update_day_html+="<td>Exercises</td>";
							update_day_html+="<td>" + exercises_options_html + "</td>";
						update_day_html+="</tr>";		 
								 

				
				update_day_html+="<tr>";
		 
					// hidden 'day id' to identify which record to delete
					update_day_html+="<td><input value=\"" + day_id + "\" name='day_id' type='hidden' /></td>";
		 
					// button to submit form
					update_day_html+="<td>";
						update_day_html+="<button type='submit' class='btn btn-info'>";
							update_day_html+="<span class='glyphicon glyphicon-edit'></span> Update day";
						update_day_html+="</button>";
					update_day_html+="</td>";
		 
				update_day_html+="</tr>";
		 
			update_day_html+="</table>";
		update_day_html+="</form>";
		
		update_day_html+="<p><script type='text/javascript'>";
		update_day_html+="$(document).ready(function() {";
		update_day_html+="$('select').multicheckbox();";
		update_day_html+="});";
		update_day_html+="</script></p>";

		
			// inject to 'page-content' of our app
		$("#page-content").html(update_day_html);
		 
		// chage page title
		changePageTitle("Update day");		
			
			
		});	
			
		//here
		});	
			
									
		});
		
    });
     
    // 'update day form' submit handle will be here
	// will run if 'create day' form was submitted
	$(document).on('submit', '#update-day-form', function(){
		 
		// get form data will be here 
		// get form data
		var form_data=JSON.stringify($(this).serializeObject());
		 
		 
		// submit form data to api
		$.ajax({
			url: "http://localhost/api/day/update.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				// day was created, go back to products list
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



function getExercises(){
		
		var selected_fields_day = [];
		return $.getJSON("http://localhost/api/days_exercises/read.php", function(data){
				
				//console.log("selected fields"+day_name);	
				
				$.each(data.records, function(key, val){
					
					selected_fields_day.push({day_id:val.day_id,exercise_id:val.exercise_id});
					
					//console.log("key "+key+" value day_id "+val.day_id +" exercise_id "+val.exercise_id );
				});	
				
				return selected_fields_day;
			});	
	}