
var rsvp_form = $("#rsvp-google-form");
console.log(rsvp_form[0]);

canVote = true;


$( ".room1 > .container" ).hide();
$( ".room3 > .container" ).hide();

var room = 2;
var user = undefined;

$( "#rsvp-btn" ).click(function() {
  room = 3
  $(".room2").removeClass("right");
  $(".room2").addClass("left");
  $( ".room2 > .container" ).fadeOut( "fast", function() {
    $( ".room2" ).animate({ "width": "-=100vw" }, "slow" );
    $( ".room3" ).animate({ "width": "+=100vw" }, "slow", function() {
      $( ".room3 > .container" ).fadeIn("slow");
    });
  });
});

$( "#vote-btn" ).click(function() {
    room = 1;
    $(".room2").removeClass("left");
    $(".room2").addClass("right");
    $( ".room2 > .container").fadeOut( "fast", function() {
      $( ".room1" ).animate({ "width": "+=100vw" }, "slow" );
      $( ".room2" ).animate({ "width": "-=100vw" }, "slow", function() {
        $(".room1 > .container").fadeIn("slow");
      });
    });
});
 
$( "#back-btn-1" ).click(function(){
  room = 2
  $( ".room1 > .container" ).fadeOut( "fast", function() {
    $( ".room1" ).animate({ "width": "-=100vw" }, "slow" );
    $( ".room2" ).animate({ "width": "+=100vw" }, "slow", function() {
      $( ".room2 > .container" ).fadeIn( "slow" );
    });
  });
});

$( "#back-btn-2" ).click(function(){
  room = 2
  $( ".room3 > .container" ).fadeOut( "fast", function() {
    $( ".room3" ).animate({ "width": "-=100vw" }, "slow" );
    $( ".room2" ).animate({ "width": "+=100vw" }, "slow", function() {
      $( ".room2 > .container" ).fadeIn( "slow" );
    });
  });
});

$(document).keydown(function(e) {
    if(e.which == 37) { //left
      if(room == 2 && canVote) {
        room = 1;
        $(".room2").removeClass("left");
        $(".room2").addClass("right");
        $( ".room2 > .container").fadeOut( "fast", function() {
          $( ".room1" ).animate({ "width": "+=100vw" }, "slow" );
          $( ".room2" ).animate({ "width": "-=100vw" }, "slow", function() {
            $(".room1 > .container").fadeIn("slow");
          });
        });
      } else if (room == 3) {
        room = 2;
          $( ".room3 > .container" ).fadeOut( "fast", function() {
            $( ".room3" ).animate({ "width": "-=100vw" }, "slow" );
            $( ".room2" ).animate({ "width": "+=100vw" }, "slow", function() {
              $( ".room2 > .container" ).fadeIn( "slow" );
            });
          });
      }
    } else if (e.which == 39) { //right
      if(room == 2) {
          $( ".room2 > .container" ).fadeOut( "fast", function() {
            room = 3;
            $(".room2").removeClass("right");
            $(".room2").addClass("left");
            $( ".room2" ).animate({ "width": "-=100vw" }, "slow" );
            $( ".room3" ).animate({ "width": "+=100vw" }, "slow", function() {
              $( ".room3 > .container" ).fadeIn("slow");
            });
          }); 
      } else if(room == 1) {
        $( ".room1 > .container" ).fadeOut( "fast", function() {
          room = 2;
          $( ".room1" ).animate({ "width": "-=100vw" }, "slow" );
          $( ".room2" ).animate({ "width": "+=100vw" }, "slow", function() {
            $( ".room2 > .container" ).fadeIn( "slow" );
          });
        });
      }
    }
});

$(document).on("swipeleft",function(){
    if(room == 2) {
      $( ".room2 > .container" ).fadeOut( "fast", function() {
        room = 3;
        $(".room2").removeClass("right");
        $(".room2").addClass("left");
        $( ".room2" ).animate({ "width": "-=100vw" }, "slow" );
        $( ".room3" ).animate({ "width": "+=100vw" }, "slow", function() {
          $( ".room3 > .container" ).fadeIn("slow");
        });
      }); 
  } else if(room == 1) {
    $( ".room1 > .container" ).fadeOut( "fast", function() {
      room = 2;
      $( ".room1" ).animate({ "width": "-=100vw" }, "slow" );
      $( ".room2" ).animate({ "width": "+=100vw" }, "slow", function() {
        $( ".room2 > .container" ).fadeIn( "slow" );
      });
    });
  }
});

$(document).on("swiperight",function(){
  if(room == 2 && canVote) {
    room = 1;
    $(".room2").removeClass("left");
    $(".room2").addClass("right");
    $( ".room2 > .container").fadeOut( "fast", function() {
      $( ".room1" ).animate({ "width": "+=100vw" }, "slow" );
      $( ".room2" ).animate({ "width": "-=100vw" }, "slow", function() {
        $(".room1 > .container").fadeIn("slow");
      });
    });
  } else if (room == 3) {
    room = 2;
      $( ".room3 > .container" ).fadeOut( "fast", function() {
        $( ".room3" ).animate({ "width": "-=100vw" }, "slow" );
        $( ".room2" ).animate({ "width": "+=100vw" }, "slow", function() {
          $( ".room2 > .container" ).fadeIn( "slow" );
        });
      });
  }
});

function checkCookie() {
    user = Cookies.get('name');
    if (user != undefined) {
        $("#welcome_msg").text("Welcome Back " + user + "!!");
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           Cookies.set('name', user, { expires: 40, path: '/' });
           if(user != "" || user != undefined) {
             $("#welcome_msg").text("Welcome, " + user + "!!");
             $("#entry_436026593").val(user);
           } else {
             $("#welcome_msg").text("Welcome, Guest!!");
           }
       } else {
          $("#welcome_msg").text("Welcome, Guest!!");
        }
    }
    checkRSVP(user);
    checkVote(user);
}

function checkRSVP(user) {
  var status = Cookies.get('rsvp');
  if(status) {
    if(user != undefined && user != "") {
      $("#rsvp-form").html("<h3>" + user + ", see you at banquet!! </h3>");
    }
    $("#rsvp-form").html("<h3> See you at banquet!! </h3>");
  }
}

function checkVote() {
  var status = Cookies.get('vote');
  if(status) {
    $("#vote-form").html("<h3> Thank you for voting :) </h3>");
  }
}

function cacheRSVP() {
  Cookies.set('rsvp', true, { expires: 40, path: '/' });
  if(user != undefined && user != "") {
    $("#rsvp-form").html("<h3>" + user + ", see you at banquet!! </h3>");
  } else {
    $("#rsvp-form").html("<h3> See you at banquet!! </h3>");
  }
  $('#back-btn-2').click();
}

function cacheVote() {
  Cookies.set('vote', true, { expires: 40, path: '/' });
  $("#vote-form").html("<h3> Thank you for voting :) </h3>");
  $('#back-btn-1').click();
}