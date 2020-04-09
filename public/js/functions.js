var buttonson = false;
var currItem;

$(function() {
    $( ".shop" ).click(function() {
    	if (buttonson == true) {  		
    		$( ".circle" ).addClass('hidden');
    		buttonson = false;
    		//just in case any descriptions are on, loop thru and make sure they are all hidden
    		$(".desc").addClass("hidden");
    	} else if (buttonson == false) {
    		$( ".circle" ).removeClass('hidden');
    		buttonson = true;
    	}
	});
});

$(function() {
    $( ".circle" ).click(function() {
    	currItem = $(this).siblings().hasClass("hidden");
    	if (currItem == true) {
    		$(this).siblings().removeClass("hidden");
    	} else if (currItem == false) {
    		$(this).siblings().addClass("hidden");
    	}
	});
});
