var buttonson = false;
var currItem;
var textOnDesktop = false;
var textHover = false;
var v;
var ww;

//CHECK BROWSER WIDTH, ADD/REMOVE CLASSES
jQuery(document).ready(function($) {
  ww = document.body.clientWidth;
  //don't add hover shop effect if mobile bc is sticky
  if (ww >= 600) {
    $("<style type='text/css'> .shop p:hover{ background-color: yellow; color: blue;} </style>").appendTo("head");
  }
  var alterClass = function() {
    ww = document.body.clientWidth;
    if (ww < 600) {
      v = "mobile";
      var vh = window.innerHeight * 0.01;
      //set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      //find width of logo to place it evenly
      var logoW = $(".logo img").width();
      var dis = ((ww / 6) - logoW) / 2;
      $(".logo").css({'left': dis  + 'px'});
      //remove inline height assigned in desktop mode, if there
      $(".textbox").css("height","");
      $(".textbox").css("top","");
      $("#mc_embed_signup").css({'top':''});
      $(".logo").css({'top':''});
      $(".textbox").addClass("hidden");
      $("#readmore").addClass("hidden");
      $(".toggletext").each(function(){
            revealText();
            textOnDesktop = true;
       });
      $(".dash").addClass("remove");
    } else if (ww >= 601) {
      v = "desktop";
      $(".textbox").removeClass("hidden");
      $(".textbox").height(($(window).height() - $(".shop").outerHeight()) +"px");
      var topM = $(".shop").outerHeight();
      $(".textbox").css({'top': topM + 'px'});
      $(".logo").css('left','');
      var position = $('.info-desktop').offset();
      var h = $('.info-desktop').outerHeight();
      var mTop = position.top + h;
      //set shop buttons to be a percent of img width
      $("#mc_embed_signup").css({'top': mTop  + 'px'});
      $(".yellowbox").outerHeight(((($(window).height())/3) - $(".shop").outerHeight()) +"px");
      $("#readmore").removeClass("hidden");
      $(".toggletext").each(function() {
            hideText();
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
        if (v == "mobile") {
          $(".shop").removeClass('yellowOn'); 
        } else if (v == "desktop") {
          $(".shop p").removeClass('yellowOn');
        }
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
        if (v == "mobile") {
          $(".shop").addClass('yellowOn'); 
        } else if (v == "desktop") {
          $(".shop p").addClass('yellowOn');
        }
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
            //this is if the text box isn't visible yet, so check if shop buttons are on
            if (buttonson == true) { 
              console.log("trying to open textbox, buttons are on, turn them off.");       
              $( ".circle" ).addClass('hidden');
              buttonson = false;
              //just in case any descriptions are on, loop thru and make sure they are all hidden
              $(".desc").addClass("hidden");
              //remove item divs so they arent overlapping other info
              $(".wrap").addClass('remove');
              // $(".shop p").removeClass('yellowOn');
              if (v == "mobile") {
                $(".shop").removeClass('yellowOn'); 
              } else if (v == "desktop") {
                $(".shop p").removeClass('yellowOn');
              }
            } 
            //now open textbox
            $(".textbox").removeClass("hidden");
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
      }
    );
});

$(function() {
    $( ".textbox" ).hover(
      function() {
        if (textHover == true ){
           revealText(); 
        }
      }, function() {
        if (textOnDesktop == false){
        hideText();
        textHover = false;
        }
      }
    );
});

function revealText() {
    $(".toggletext").removeClass( "hidden" );
    $(".number3").removeClass( "hidden" );
}

function hideText() {
    $(".toggletext").addClass( "hidden" );
    $(".number3").addClass( "hidden" );
}

//LOGO / SUBSCRIBE BUTTON - DESKTOP
$(function() {
    $(".logo").click(function(){
        $("#mc_embed_signup").toggle();
        $(".credits").toggle();
        if ($('.creditstext').css('visibility') == 'visible') {
            $('.creditstext').css('visibility','hidden');
        }
    });
});

//CREDITS - DESKTOP
$(function() {
    $(".credits").click(function(){
        if ( $('.creditstext').css('visibility') == 'hidden' ) {
            $('.creditstext').css('visibility','visible');
            startScroll();
        } else {
            $('.creditstext').css('visibility','hidden');
        }
    });
});

function startScroll() {
  $('.js-conveyor-1').jConveyorTicker();
}

//RESET MAILING LIST on SUBMIT
$(function() {
  $("#mc-embedded-subscribe").click(function(){
    console.log("form submitted");
    $("#mc_embed_signup").toggle();
    $(".credits").toggle();
    if ($('.creditstext').css('visibility') == 'visible') {
      $('.creditstext').css('visibility','hidden');
    }
  });
});
