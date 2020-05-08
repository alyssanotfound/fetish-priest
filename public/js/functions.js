var buttonson = false;
var currItem;
var textOnDesktop = false;

//CHECK BROWSER WIDTH, ADD/REMOVE CLASSES
jQuery(document).ready(function($) {
  var alterClass = function() {
    var ww = document.body.clientWidth;
    if (ww < 600) {
      $(".textbox").addClass("hidden");
    } else if (ww >= 601) {
      $(".textbox").removeClass("hidden");
      $(".textbox").height("96%");
    };
  };
  $(window).resize(function(){
    alterClass();
  });
  //Fire it when the page first loads:
  alterClass();
});


//SHOP BUTTON
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

//INDIVIDUAL PRODUCT BUTTONS
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

//INFO BUTTON - MOBILE
$(function() {
    $( ".info-button" ).click(function() {
        // console.log("info clicked on mobile, reveal block");

        if ($(".textbox").hasClass("hidden")==true) {
            $(".textbox").removeClass("hidden");
            $(".textbox").height(($(window).height() - 210) +"px");
            $('.info-button').css("background-image", "url(../public/assets/info-button-x.png");
            // console.log("height of textbox is : " + ($(window).height() - 210));
        } else if ($(".textbox").hasClass("hidden")==false) {
            $(".textbox").addClass("hidden");
            $('.info-button').css("background-image", "url(../public/assets/info-button.png");
        }
    });
});

//READ MORE BUTTON - DESKTOP 
$(function() {
    $( "#readmore" ).click(function() {
        // console.log("toggle text");
        if (textOnDesktop==false) {
            $(".toggletext").each(function(){
                // console.log("text isnt visible, turn on");
                $(".toggletext").removeClass("hidden");
                $('.number3').css("color", "white");
                $('.highlight').css("color", "yellow");
                textOnDesktop = true;
            });
        } else {
            $(".toggletext").each(function() {
                // console.log("turn off text");
                $(".toggletext").addClass("hidden");
                $('.number3').css("color", "black");
                $('.highlight').css("color", "white");
                textOnDesktop = false;
            });
        }
    });
});

