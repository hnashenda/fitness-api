$(document).ready(function(){
 
    // app html
    app_html="";
 
    app_html+="<div class='container'>";
 
        app_html+="<div class='page-header'>";
            app_html+="<h1 id='page-title'>Read</h1>";
			
			// when clicked, it will load the create user form
			
			app_html+="<div id='nav-button' class='btn btn-primary pull-left m-b-15px view-users-button'>";
				app_html+="<span class='glyphicon glyphicon-user'></span>";
			app_html+="</div>";
			
			app_html+="<div id='nav-button' class='btn btn-primary pull-left m-b-15px view-plans-button'>";
				app_html+="<span class='glyphicon glyphicon-plus'></span> Plans";
			app_html+="</div>";
			
			app_html+="<div id='nav-button' class='btn btn-primary pull-left m-b-15px view-days-button'>";
				app_html+="<span class='glyphicon glyphicon-plus'></span> Days";
			app_html+="</div>";
			
			app_html+="<div id='nav-button' class='btn btn-primary pull-left m-b-15px view-exercises-button'>";
				app_html+="<span class='glyphicon glyphicon-plus'></span> Exercises";
			app_html+="</div>";
			
        app_html+="</div>";
 
        // this is where the contents will be shown.
        app_html+="<div id='page-content'></div>";
 
    app_html+="</div>";
 
    // inject to 'app' in index.html
    $("#app").html(app_html);
 
});
 
// change page title
function changePageTitle(page_title){
 
    // change page title
    $('#page-title').text(page_title);
 
    // change title tag
    document.title=page_title;
}
 
// function to make form values to json format
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};