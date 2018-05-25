$(document).ready(function(){
  
    // show html form when 'create plan' button was clicked
    $(document).on('click', '.create-plan-button', function(){
        // workout days api call will be here
		
		// load list of days
			$.getJSON("http://localhost/api/day/read.php", function(data){
								
				// build categories option html
				// loop through returned list of data
				var days_options_html="";
				days_options_html+="<select name='day_id' class='form-control' size='5' multiple>";
				$.each(data.records, function(key, val){
					days_options_html+="<option value='" + val.day_id + "'>" + val.day_name  + "</option>";
				});
				days_options_html+="</select>";								
		
		// 'create plan form' handle will be here

		// we have our html form here where plan information will be entered
		// we used the 'required' html5 property to prevent empty fields
		var create_plan_html="";
		 
		// 'read plans' button to show list of plans
		create_plan_html+="<div id='read-plans' class='btn btn-primary pull-right m-b-15px view-plans-button'>";
			create_plan_html+="<span class='glyphicon glyphicon-list'></span> Read plans";
		create_plan_html+="</div>";
			
		// 'create plan' html form
		create_plan_html+="<form id='create-plan-form' action='#' method='post' border='0'>";
			create_plan_html+="<table class='table table-hover table-responsive table-bordered'>";
		 
				// name field
				create_plan_html+="<tr>";
					create_plan_html+="<td>Plan Name</td>";
					create_plan_html+="<td><input type='text' name='plan_name' class='form-control' required /></td>";
				create_plan_html+="</tr>";
		 
				// days 'select' field
				create_plan_html+="<tr>";
					create_plan_html+="<td>Select Days</td>";
					create_plan_html+="<td>" + days_options_html + "</td>";
				create_plan_html+="</tr>";
				
		 
				// button to submit form
				create_plan_html+="<tr>";
					create_plan_html+="<td></td>";
					create_plan_html+="<td>";
						create_plan_html+="<button type='submit' class='btn btn-primary'>";
							create_plan_html+="<span class='glyphicon glyphicon-plus'></span> Create plan";
						create_plan_html+="</button>";
					create_plan_html+="</td>";
				create_plan_html+="</tr>";
		 
			create_plan_html+="</table>";
		create_plan_html+="</form>";
		
		
				create_plan_html+="<p><script type='text/javascript'>";
				create_plan_html+="$(document).ready(function() {";
				create_plan_html+="$('select').multicheckbox();";
				create_plan_html+="});";
				create_plan_html+="</script></p>";
		
		// inject html to 'page-content' of our app
		$("#page-content").html(create_plan_html);
		 
		// chage page title
		changePageTitle("Create plan");
		});	
		
    }); 
    		
	// will run if create plan form was submitted
	$(document).on('submit', '#create-plan-form', function(){
		// form data will be here
		// get form data
		var form_data=JSON.stringify($(this).serializeObject());
		
		// submit form data to api
		$.ajax({
			url: "http://localhost/api/plan/create.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				// plan was created, go back to plans list
				showPlans();
			},
			error: function(xhr, resp, text) {
				// show error to console
				console.log(xhr, resp, text);
				console.warn(xhr.responseText);
			}
		});
		 
		return false;
		
	});		
	
	$(document).on('click', '.read-plans-button', function(){
	//	window.history.back();
	history.back();
	});	
	
	
	
	
	
});