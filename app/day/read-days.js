$(document).ready(function(){
 
    // show list of days on first load
	$(document).on('click', '.view-days-button', function(){		
		showDays();
	});
 
});
 
// showdays() method will be here
// function to show list of days
function showDays(){
	
	
		 // get list of days from the API
		$.getJSON("http://localhost/api/day/read.php", function(data){
									
		// html for listing days
		var read_days_html="";
		 
		// when clicked, it will load the create day form
		read_days_html+="<div id='create-day' class='btn btn-primary pull-right m-b-15px create-day-button'>";
			read_days_html+="<span class='glyphicon glyphicon-plus'></span> Create days";
		read_days_html+="</div>";
		
		
		// start table
		read_days_html+="<table class='table table-bordered table-hover'>";
	 
		// creating our table heading
		read_days_html+="<tr>";
			read_days_html+="<th class='w-25-pct'>Day Name</th>";			
			read_days_html+="<th class='w-25-pct text-align-center'>Action</th>";
		read_days_html+="</tr>";
		 
		// loop through returned list of data
		$.each(data.records, function(key, val) {
		 
			// creating new table row per record
			read_days_html+="<tr>";
		 
				read_days_html+="<td>" + val.day_name + "</td>";
				
		 
				// 'action' buttons
				read_days_html+="<td>";
					// read one day button
					read_days_html+="<button class='btn btn-primary m-r-10px read-one-day-button' data-id='" + val.day_id + "'>";
						read_days_html+="<span class='glyphicon glyphicon-eye-open'></span> Read";
					read_days_html+="</button>";
		 
					// edit button
					read_days_html+="<button class='btn btn-info m-r-10px update-day-button' data-id='" + val.day_id + "'>";
						read_days_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
					read_days_html+="</button>";
		 
					// delete button
					read_days_html+="<button class='btn btn-danger delete-day-button' data-id='" + val.day_id + "'>";
						read_days_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
					read_days_html+="</button>";
				read_days_html+="</td>";
		 
			read_days_html+="</tr>";
		 
		});
	 
		// end table
		read_days_html+="</table>";
		
		
		
		
		// inject to 'page-content' of our app
		$("#page-content").html(read_days_html);
		
		// chage page title
		changePageTitle("Read days");
			 
		
	
	 });
}