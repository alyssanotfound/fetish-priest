var buttonson = false;
var currItem;
var textOnDesktop = false;

//CHECK BROWSER WIDTH, ADD/REMOVE CLASSES
jQuery(document).ready(function($) {
  var alterClass = function() {
    var ww = document.body.clientWidth;
    if (ww < 600) {
      $(".textbox").addClass("hidden");
      $("#readmore").addClass("hidden");
      $("#references").removeClass("hidden");
      $(".toggletext").each(function(){
            $(".toggletext").removeClass("hidden");
            $('.number3').css("color", "white");
            $('.highlight').css("color", "yellow");
            textOnDesktop = true;
       });
    } else if (ww >= 601) {
      $(".textbox").removeClass("hidden");
      $(".textbox").height("96%");
      $("#readmore").removeClass("hidden");
      $("#references").addClass("hidden");
      $(".toggletext").each(function() {
            $(".toggletext").addClass("hidden");
            $('.number3').css("color", "black");
            $('.highlight').css("color", "white");
            textOnDesktop = false;
       });
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
        if ($(".textbox").hasClass("hidden")==true) {
            $(".textbox").removeClass("hidden");
            $(".textbox").height(($(window).height() - 150) +"px");
            $('.info-button').css("background-image", "url(../public/assets/info-button-x.png");
        } else if ($(".textbox").hasClass("hidden")==false) {
            $(".textbox").addClass("hidden");
            $('.info-button').css("background-image", "url(../public/assets/info-button.png");
        }
    });
});

//READ MORE BUTTON - DESKTOP 
$(function() {
    $( "#readmore" ).click(function() {
        if (textOnDesktop==false) {
            $(".toggletext").each(function(){
                $(".toggletext").removeClass("hidden");
                $('.number3').css("color", "white");
                $('.highlight').css("color", "yellow");
                textOnDesktop = true;
            });
        } else {
            $(".toggletext").each(function() {
                $(".toggletext").addClass("hidden");
                $('.number3').css("color", "black");
                $('.highlight').css("color", "white");
                textOnDesktop = false;
            });
        }
    });
});

//HOVER FUNCTIONALITY - DESKTOP
$(function() {
    $( "#readmore" ).hover(
      function() {
        $(".toggletext").removeClass( "hidden" );
        $('.number3').css("color", "white");
        $('.highlight').css("color", "yellow");
      }, function() {
        console.log("hide");
        if (textOnDesktop == false){
            $(".toggletext").addClass( "hidden" );
            $('.number3').css("color", "black");
            $('.highlight').css("color", "white");
        }
      }
    );
});

//LOGO / SUBSCRIBE BUTTON - DESKTOP
$(function() {
    $(".logo").click(function(){
        console.log("logo clicked");
        $("#mc_embed_signup").toggle();
    });
});

