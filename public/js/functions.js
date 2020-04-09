var buttonson = false;
var descon = false;

console.log(buttonson);
console.log(descon);

$(function() {
    $( ".shop" ).click(function() {
    	if (buttonson == true) {  		
    		$( ".circle" ).addClass('hidden');
    		buttonson = false;
    		if (descon == true) {
    			$( ".desc" ).addClass('hidden');
    			descon = false;
    		}
    	} else if (buttonson == false) {
    		$( ".circle" ).removeClass('hidden');
    		buttonson = true;
    	}
	});
});

$(function() {
    $( ".circle" ).click(function() {
		if (buttonson == true && descon == false) {  
			console.log("show descriptions");		
    		$( ".desc" ).removeClass('hidden');
    		descon = true;
    	} else if (buttonson == true && descon == true) {
    		console.log("hide descriptions");
			$( ".desc" ).addClass('hidden');
			descon = false;
		}
	});
});
