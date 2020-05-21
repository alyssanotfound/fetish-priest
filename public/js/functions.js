var buttonson = false;
var currItem;
var textOnDesktop = false;
var textHover = false;


//CHECK BROWSER WIDTH, ADD/REMOVE CLASSES
jQuery(document).ready(function($) {
  var ww = document.body.clientWidth;
  //don't add hover shop effect if mobile bc is sticky
  if (ww >= 600) {
    $("<style type='text/css'> .shop p:hover{ background-color: yellow; color: blue;} </style>").appendTo("head");
  }
  var alterClass = function() {
    if (ww < 600) {
      var vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      //find width of logo to place it evenly
      var logoW = $(".logo img").width();
      // console.log(logoW);
      var dis = ((ww / 6) - logoW) / 2;
      // console.log(dis);
      $(".logo").css({'left': dis  + 'px'});
      //remove inline height assigned in desktop mode, if there
      $(".textbox").css("height","");
      $("#mc_embed_signup").css({'top':''});
      $(".logo").css({'top':''});
      $(".textbox").addClass("hidden");
      $("#readmore").addClass("hidden");
      // var currH = calc(vh*80)
      // $(".textbox").height(calc(vh * 80));
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
      // var position = $(".creditstext").position();
      var position = $('.info-desktop').offset();
      var h = $('.info-desktop').outerHeight();
      console.log(h);
      // console.log(position);
      var mTop = position.top + h;
      console.log(mTop);
      $("#mc_embed_signup").css({'top': mTop  + 'px'});
      // $(".logo").css({'top': mTop  + 'vh'});
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
      // e.preventDefault();
      var ww = document.body.clientWidth;
    	if (buttonson == true) {  		
    		$( ".circle" ).addClass('hidden');
    		//just in case any descriptions are on, loop thru and make sure they are all hidden
    		$(".desc").addClass("hidden");
        //remove item divs so they arent overlapping other info
        $(".wrap").addClass('remove');
        $(".shop p").removeClass('yellowOn');
        // $(".shop p").css({
        //     color: "white", 
        //     backgroundColor: "blue"
        // });
        // alert("highlight off");
        // alert($(".shop p").attr("class"));
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
        
        $(".shop p").addClass('yellowOn');
        // alert("highlight on");
        // alert($(".shop p").attr("class"));
        // $(".shop p").css({
        //     color: "blue", 
        //     backgroundColor: "yellow"
        // });
        buttonson = true;
      }
	});
});

//fix shop button hover issue
// function fix() {
//   var el = this;
//   var par = el.parentNode;
//   var next = el.nextSibling;
//   alert(el);
//   par.removeChild(el);
//   setTimeout(function() {par.insertBefore(el, next);}, 0)
// }

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
            $(".shop p").removeClass('yellowOn');
            // $(".shop p").css({
            //     color: "white", 
            //     backgroundColor: "blue"
            // });
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
        // console.log("mouse in on textbox");
        if (textHover == true ){
           revealText(); 
        }
      }, function() {
        // console.log("mouse out in on textbox");
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
    $(".number3").removeClass( "hidden" );
    // $('.number3').css("color", "yellow");
}

function hideText() {
    $(".toggletext").addClass( "hidden" );
    $(".number3").addClass( "hidden" );
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
            // jsConveyor1.pauseAnim();
        }
    });
});

//CREDITS - DESKTOP

// window.jsConveyor1 = "hello";
// $(function() {
//     window.jsConveyor1 = $('.js-conveyor-1').jConveyorTicker({
//       start_paused: true
//     });
// });

$(function() {
    $(".credits").click(function(){
        // $(".creditstext").toggle();
        if ( $('.creditstext').css('visibility') == 'hidden' ) {
            $('.creditstext').css('visibility','visible');
            startScroll();
            // jsConveyor1.playAnim();
        } else {
            $('.creditstext').css('visibility','hidden');
            // jsConveyor1.pauseAnim();
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
        // jsConveyor1.pauseAnim();
    }
  });
});
