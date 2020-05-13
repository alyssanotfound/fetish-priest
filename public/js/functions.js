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
      $('.yellowbox span').addClass("remove");
      // $("#references").removeClass("hidden");
      $(".toggletext").each(function(){
            $(".toggletext").removeClass("hidden");
            $('.number3').css("color", "white");
            $('.highlight').css("color", "yellow");
            textOnDesktop = true;
       });
      $(".dash").addClass("remove");
    } else if (ww >= 601) {
      $(".textbox").removeClass("hidden");
      $(".textbox").height("96%");
      $("#readmore").removeClass("hidden");
      $('.yellowbox span').removeClass("remove");
      // $("#references").addClass("hidden");
      $(".toggletext").each(function() {
            $(".toggletext").addClass("hidden");
            $('.number3').css("color", "black");
            $('.highlight').css("color", "white");
            textOnDesktop = false;
       });
      $(".dash").removeClass("remove");
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
        var ww = document.body.clientWidth;
    	if (buttonson == true) {  		
    		$( ".circle" ).addClass('hidden');
    		//just in case any descriptions are on, loop thru and make sure they are all hidden
    		$(".desc").addClass("hidden");
            //remove item divs so they arent overlapping other info
            $(".wrap").addClass('remove');
            $(".shop p").css({
                color: "white", 
                backgroundColor: "blue"
            });
            buttonson = false;
    	} else if (buttonson == false) {
            //make divs visible
            $(".wrap").removeClass('remove');
            //turn on buttons but first turn off textbox if its visible
            if ($(".textbox").hasClass("hidden")==false && ww < 600) {
                //textbox is already open, so close it
                $(".textbox").addClass("hidden");
                $('.info-button').css("background-image", "url(../assets/info-button.png");
            }
    		$( ".circle" ).removeClass('hidden');
    		buttonson = true;
            $(".shop p").css({
                color: "blue", 
                backgroundColor: "yellow"
            });
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
            //this is if the text box isn't visible yet, so check if shop buttons are on
            if (buttonson == true) { 
            console.log("trying to open textbox, buttons are on, turn them off.");       
            $( ".circle" ).addClass('hidden');
            buttonson = false;
            //just in case any descriptions are on, loop thru and make sure they are all hidden
            $(".desc").addClass("hidden");
            //remove item divs so they arent overlapping other info
            $(".wrap").addClass('remove');
            $(".shop p").css({
                color: "white", 
                backgroundColor: "blue"
            });
            } 
            //now open textbox
            $(".textbox").removeClass("hidden");
            $(".textbox").height(($(window).height() - 150) +"px");
            $('.info-button').css("background-image", "url(../assets/info-button-x.png");
        } else if ($(".textbox").hasClass("hidden")==false) {
            //textbox is already open, so close it
            $(".textbox").addClass("hidden");
            $('.info-button').css("background-image", "url(../assets/info-button.png");
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
                // $('.yellowbox span').removeClass("remove");
                // $('.highlight').css("color", "yellow");  
            });
            $("#readmore").text("[READ LESS]");
            textOnDesktop = true;
        } else {
            $(".toggletext").each(function() {
                $(".toggletext").addClass("hidden");
                $('.number3').css("color", "black");
                // $('.yellowbox span').addClass("remove");
                // $('.highlight').css("color", "white"); 
            });
            $("#readmore").text("[READ MORE]");
            textOnDesktop = false;
        }
    });
});

//HOVER FUNCTIONALITY - DESKTOP
$(function() {
    $( "#readmore" ).hover(
      function() {
        $(".toggletext").removeClass( "hidden" );
        $('.number3').css("color", "white");
        // $('.yellowbox span').removeClass("remove");
        // $('.highlight').css("color", "yellow");
      }, function() {
        console.log("hide");
        if (textOnDesktop == false){
            $(".toggletext").addClass( "hidden" );
            $('.number3').css("color", "black");
            // $('.yellowbox span').addClass("remove");
            // $('.highlight').css("color", "white");
        }
      }
    );
});

//LOGO / SUBSCRIBE BUTTON - DESKTOP
$(function() {
    $(".logo").click(function(){
        console.log("logo clicked");
        $("#mc_embed_signup").toggle();
        $(".credits").toggle();
    });
});

//CREDITS - DESKTOP
$(function() {
    $(".credits").click(function(){
        $(".creditstext").toggle();
        startScroll();
    });
});

function startScroll() {
    var marquee = $('div.creditstext');
    marquee.each(function() {
        console.log("scrolling should work");
        var mar = $(this),indent = mar.width();
        mar.marquee = function() {
            indent--;
            mar.css('text-indent',indent);
            if (indent < -1 * mar.children('div.creditsscroll').width()) {
                indent = mar.width();
            }
        };
        mar.data('interval',setInterval(mar.marquee,1000/60));
    });
};
