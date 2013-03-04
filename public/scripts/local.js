$(document).ready(function() {
	initWidgets(this);
});

var initWidgets = function(ctx) {
	$('.datepicker', ctx).datepicker({dateFormat: 'dd/mm/yy'});
}
