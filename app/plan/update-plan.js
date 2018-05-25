$(document).ready(function(){
	 
    // show html form when 'update plan' button was clicked
    $(document).on('click', '.update-plan-button', function(){
        // get product id
		var plan_id= $(this).attr('data-id');
		
		//var selected_fields = [];
		
		// read one record based on given product id
		$.getJSON("http://localhost/api/plan/read_one.php?plan_id=" + plan_id, function(data){
		
			// values will be used to fill out our form
			var plan_name = data.plan_name;
						 
			getDays().then(function(selected_fields){
				 
			$.getJSON("http://localhost/api/day/read.php", function(data){
			 
				// build 'categories option' html
				// loop through returned list of data
				var done="";
				var days_options_html="";
				days_options_html+="<select name='day_id' class='form-control' size='5' multiple>";
			 
					$.each(data.records, function(key, val){
						 done=true;
						 
							for (var key_sel in selected_fields["records"] ){
								if(val.day_id == selected_fields["records"][key_sel].day_id && plan_id == selected_fields["records"][key_sel].plan_id){	
									days_options_html+="<option value='" + val.day_id + "' selected>" + val.day_name + "</option>";
									done = false;
									break;
								}
						 
							}
							if(done){							
								days_options_html+="<option value='" + val.day_id + "'>" + val.day_name + "</option>";
							}
						});
							
							
					
				//});
				days_options_html+="</select>";
				 
				// update product html will be here
				
					// store 'update product' html to this variable
					var update_plan_html="";
					 
					// 'read plans' button to show list of plans
					update_plan_html+="<div id='read-plans' class='btn btn-primary pull-right m-b-15px view-plans-button'>";
						update_plan_html+="<span class='glyphicon glyphicon-list'></span> Read plans";
					update_plan_html+="</div>";
					
					// build 'update plan' html form
				// we used the 'required' html5 property to prevent empty fields
				update_plan_html+="<form id='update-plan-form' action='#' method='post' border='0'>";
					update_plan_html+="<table class='table table-hover table-responsive table-bordered'>";
				 
						// firstname field
						update_plan_html+="<tr>";
							update_plan_html+="<td>Plan name</td>";
							update_plan_html+="<td><input value=\"" + plan_name + "\" type='text' name='plan_name' class='form-control' required /></td>";
						update_plan_html+="</tr>";		 
								 
								 
						// days 'select' field
						update_plan_html+="<tr>";
							update_plan_html+="<td>Days</td>";
							update_plan_html+="<td>" + days_options_html + "</td>";
						update_plan_html+="</tr>";		 
								 
								 
								 
								 
						update_plan_html+="<tr>";
				 
							// hidden 'plan id' to identify which record to delete
							update_plan_html+="<td><input value=\"" + plan_id + "\" name='plan_id' type='hidden' /></td>";
				 
							// button to submit form
							update_plan_html+="<td>";
								update_plan_html+="<button type='submit' class='btn btn-info'>";
									update_plan_html+="<span class='glyphicon glyphicon-edit'></span> Update plan";
								update_plan_html+="</button>";
							update_plan_html+="</td>";
				 
						update_plan_html+="</tr>";
				 
					update_plan_html+="</table>";
				update_plan_html+="</form>";
				
				
				
				update_plan_html+="<p><script type='text/javascript'>";
				update_plan_html+="$(document).ready(function() {";
				update_plan_html+="$('select').multicheckbox();";
				update_plan_html+="});";
				update_plan_html+="</script></p>";
				
							
					// inject to 'page-content' of our app
				$("#page-content").html(update_plan_html);
				 
				// chage page title
				changePageTitle("Update plan");		
									
				
			});
			
			//here
				});
			
		});
		
    });
     
    // 'update plan form' submit handle will be here
	// will run if 'create plan' form was submitted
	$(document).on('submit', '#update-plan-form', function(){
		 
		// get form data will be here 
		// get form data
		var form_data=JSON.stringify($(this).serializeObject());
		 
		 
		// submit form data to api
		$.ajax({
			url: "http://localhost/api/plan/update.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				// plan was created, go back to products list
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
			
});


function getDays(){
		
		var selected_fields = [];
		return $.getJSON("http://localhost/api/days_plans/read.php", function(data){
				$.each(data.records, function(key, val){
					
					selected_fields.push({day_id:val.day_id,plan_id:val.plan_id});
					
					//console.log("selected key "+key+" seleced value day_id "+val.day_id +" slected value plan_id "+val.plan_id );
				});	
			 return selected_fields;
			});	
	}

