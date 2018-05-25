$(document).ready(function(){
 
    // handle 'read one' button clickread_one?user_id=2
    $(document).on('click', '.read-one-plan-button', function(){
        // get plan id
		var id = $(this).attr('data-id');
						
		$.getJSON("http://localhost/api/plan/read_one.php?plan_id=" + id, function(data){
			// read plans button will be here
			// start html
										
			var read_one_plan_html="";
			 
			// when clicked, it will show the plan's list
			read_one_plan_html+="<div id='read-plans' class='btn btn-primary pull-right m-b-15px view-plans-button'>";
				read_one_plan_html+="<span class='glyphicon glyphicon-list'></span> Read plans";
			read_one_plan_html+="</div>";
			
			// plan data will be shown in this table
			read_one_plan_html+="<table class='table table-bordered table-hover'>";
			 
				// plan name
				read_one_plan_html+="<tr>";
					read_one_plan_html+="<td class='w-30-pct'>Plan name</td>";
					read_one_plan_html+="<td class='w-70-pct'>" + data.plan_name + "</td>";
				read_one_plan_html+="</tr>";	
				
				// day name
				for (var day_name in data.day_name ){
					read_one_plan_html+="<tr>";
						read_one_plan_html+="<td class='w-30-pct'>Day name</td>";
						read_one_plan_html+="<td class='w-70-pct'>" + data.day_name[day_name] + "</td>";
					read_one_plan_html+="</tr>";	
				}
			 
			read_one_plan_html+="</table>";
			
			// inject html to 'page-content' of our app
			$("#page-content").html(read_one_plan_html);
			 
			// chage page title
			changePageTitle("Create plan");
		});
				
    });
 
});