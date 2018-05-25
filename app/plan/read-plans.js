$(document).ready(function(){
 
    // show list of plans on first load
	$(document).on('click', '.view-plans-button', function(){		
		showPlans();
	});
 
	$(document).on('click', '.view-users-button', function(){		
		showUsers();
	});
 
 
 
});
 
// showplans() method will be here
// function to show list of plans
function showPlans(){
	
					
	
		 // get list of plans from the API
		$.getJSON("http://localhost/api/plan/read.php", function(data){
									
		// html for listing plans
		var read_plans_html="";
		 
		// when clicked, it will load the create plan form
		read_plans_html+="<div id='create-plan' class='btn btn-primary pull-right m-b-15px create-plan-button'>";
			read_plans_html+="<span class='glyphicon glyphicon-plus'></span> Create plans";
		read_plans_html+="</div>";
		
		
		// start table
		read_plans_html+="<table class='table table-bordered table-hover'>";
	 
		// creating our table heading
		read_plans_html+="<tr>";
			read_plans_html+="<th class='w-25-pct'>Plan Name</th>";			
			read_plans_html+="<th class='w-25-pct text-align-center'>Action</th>";
		read_plans_html+="</tr>";
		 
		// loop through returned list of data
		$.each(data.records, function(key, val) {
		 
			// creating new table row per record
			read_plans_html+="<tr>";
		 
				read_plans_html+="<td>" + val.plan_name + "</td>";
				
		 
				// 'action' buttons
				read_plans_html+="<td>";
					// read one plan button
					read_plans_html+="<button class='btn btn-primary m-r-10px read-one-plan-button' data-id='" + val.plan_id + "'>";
						read_plans_html+="<span class='glyphicon glyphicon-eye-open'></span> Read";
					read_plans_html+="</button>";
		 
					// edit button
					read_plans_html+="<button class='btn btn-info m-r-10px update-plan-button' data-id='" + val.plan_id + "'>";
						read_plans_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
					read_plans_html+="</button>";
		 
					// delete button
					read_plans_html+="<button class='btn btn-danger delete-plan-button' data-id='" + val.plan_id + "'>";
						read_plans_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
					read_plans_html+="</button>";
				read_plans_html+="</td>";
		 
			read_plans_html+="</tr>";
		 
		});
	 
		// end table
		read_plans_html+="</table>";
		
		
		
		
		// inject to 'page-content' of our app
		$("#page-content").html(read_plans_html);
		
		// chage page title
		changePageTitle("Read plans");
			 
		
	
	 });
}