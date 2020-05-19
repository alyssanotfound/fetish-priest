var buttonson = false;
var currItem;
var textOnDesktop = false;
var textHover = false;


//CHECK BROWSER WIDTH, ADD/REMOVE CLASSES
jQuery(document).ready(function($) {

  var alterClass = function() {
    var ww = document.body.clientWidth;
    if (ww < 600) {
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      $(".textbox").addClass("hidden");
      $("#readmore").addClass("hidden");
      // $('.yellowbox span').addClass("remove");
      // $("#references").removeClass("hidden");
      $(".toggletext").each(function(){
            revealText();
            // $('.highlight').css("color", "yellow");
            textOnDesktop = true;
       });
      $(".dash").addClass("remove");
      // alert("Size of window is, height: " + $(window).height() + ", width: " + $(window).width());
    } else if (ww >= 601) {
      $(".textbox").removeClass("hidden");
      $(".textbox").height(($(window).height() - $(".shop").outerHeight()) +"px");
      // console.log("window height is: " + $(window).height());
      // console.log("shop height is: " + $(".shop").outerHeight());
      // console.log("default yellowbox height: " + $(".yellowbox").outerHeight());
      // console.log("yellowbox height should be: " + ((($(window).height())/3) - $(".shop").outerHeight()) +"px");
      $(".yellowbox").outerHeight(((($(window).height())/3) - $(".shop").outerHeight()) +"px");
      // console.log("yellowbox actual height: " + $(".yellowbox").outerHeight());
      $("#readmore").removeClass("hidden");
      // $('.yellowbox span').removeClass("remove");
      // $("#references").addClass("hidden");
      $(".toggletext").each(function() {
            hideText();
            // $('.highlight').css("color", "white");
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
            // $(".textbox").height(($(window).height() - $(".shop").outerHeight()) +"px");
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
    $( "#readmore span" ).click(function() {
        if (textOnDesktop==false) {
            $(".toggletext").each(function(){
                revealText(); 
            });
            $("#readmore span").text("[READ LESS]");
            textOnDesktop = true;
            textHover = false;
        } else {
            $(".toggletext").each(function() {
                hideText();
            });
            $("#readmore span").text("[READ MORE]");
            textOnDesktop = false;
            textHover = false;
        }
    });
});

//HOVER FUNCTIONALITY - DESKTOP
//read more hover
$(function() {
    $( "#readmore span" ).hover(
      function() {
        revealText();
        textHover = true;
      }, function() {
        //will never trigger anything when mouseOff 'read more' because it'll always be a hover state of div
        // console.log("hide");
        // if (textOnDesktop == false){
        //     hideText();
        // }
      }
    );
});

$(function() {
    $( ".textbox" ).hover(
      function() {
        console.log("mouse in on textbox");
        if (textHover == true ){
           revealText(); 
        }
      }, function() {
        console.log("mouse out in on textbox");
        // console.log("hide");
        if (textOnDesktop == false){
        hideText();
        textHover = false;
        }
      }
    );
});

// $('#readmore').is(":hover") == false && 

function revealText() {
    $(".toggletext").removeClass( "hidden" );
    $('.number3').css("color", "yellow");
}

function hideText() {
    $(".toggletext").addClass( "hidden" );
    $('.number3').css("color", "black");
}

//LOGO / SUBSCRIBE BUTTON - DESKTOP
$(function() {
    $(".logo").click(function(){
        // console.log("logo clicked");
        // alert("HTML: " + $("html").css("background-size"));
        $("#mc_embed_signup").toggle();
        $(".credits").toggle();
        if ($('.creditstext').css('visibility') == 'visible') {
            $('.creditstext').css('visibility','hidden');
            jsConveyor1.pauseAnim();
        }
    });
});

//CREDITS - DESKTOP

// window.jsConveyor1 = "hello";
$(function() {
    window.jsConveyor1 = $('.js-conveyor-1').jConveyorTicker({
      start_paused: true
    });
});

$(function() {
    $(".credits").click(function(){
        // $(".creditstext").toggle();
        if ( $('.creditstext').css('visibility') == 'hidden' ) {
            $('.creditstext').css('visibility','visible');
            jsConveyor1.playAnim();
        } else {
            $('.creditstext').css('visibility','hidden');
            jsConveyor1.pauseAnim();
        }
    });
});


