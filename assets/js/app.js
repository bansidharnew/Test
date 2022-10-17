const main = document.querySelector('.wrapper')
const body = document.body

const welcomeScreen = document.querySelector('.welcome-screen')
const valereheader = document.querySelector('.valere')
const welcomeTitle = document.querySelector('.welcome-title')
const tunnelSection = document.querySelector('.tunnel-section')
const secondSection = document.querySelector('.second-section')
const secondSectionButton = document.querySelector(
    '.second-section .second-section_button button',
)
const secondSectionDescription = document.querySelector(
    '.second-section .second-section_description',
)

//const removable = document.querySelector(".removable");

/* Scrolling logic:
    if tunnel section is on screen then scroll to the 2nd fold.
    condition is on line 96 */

const tunnelObserverOptions = {
    root: null,
    threshold: 0,
    rootMargin: '0px 0px 0px 0px',
}
var runScroll = 'false'
const tunnelObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            runScroll = true
        } else {
            runScroll = false
        }
    })
}, tunnelObserverOptions)

window.addEventListener('DOMContentLoaded', (event) => {
    tunnelObserver.observe(tunnelSection)
})

// document.addEventListener("DOMContentLoaded", function() {
//   var well = document.getElementById('well');
//   var fps = new FullPageScroll(well);
//   var indicator = document.createElement('section');
//   indicator.className = 'indicator';
//   var slideIndicators = [];
//   fps.slides.forEach(function(slide, index){
//     var slideIndicator = document.createElement('div');
//     slideIndicator.onclick = function() {
//       fps.goToSlide(index);
//     }
//     if (index === fps.currentSlide) {
//       slideIndicator.className = "active";
//     }
//     indicator.appendChild(slideIndicator);
//     slideIndicators.push(slideIndicator);
//   });
//   document.body.appendChild(indicator);
//   fps.onslide = function() {
//     slideIndicators.forEach(function(slideIndicator, index) {
//       if (index === fps.currentSlide) {
//         slideIndicator.className = "active";
//       } else {
//         slideIndicator.className = "";
//       }
//     });
//   }
// });

setTimeout(() => {
    tunnelSection.style.opacity = 1
}, 1500)
setTimeout(() => {
        this.window.scrollTo(0, 0)
    }, 2500)
    /* Fade out welcome screen */

setTimeout(() => {
    welcomeScreen.style.opacity = 0
        /* enable scroll after inital load */
    $('body').removeClass('disable-scroll')
        /* footer.js won't work if there are fixed elements, this way animation is always shown */

    setTimeout(() => {
        /* remove whole element */
        welcomeScreen.style.display = 'none'
    }, 1850)
}, 3000)

setTimeout(() => {
    //tunnelSection.style.opacity = 0;
    if (runScroll) {
        jQuery.fn.fullpage.moveTo(2)
    }
    /*setTimeout(() => {
      tunnelSection.style.display = "none";
      removable.style.display = "none";
      removable.remove();
    }, 2000);*/
}, 15000)

// alert('01')
jQuery(document).ready(function($) {
    //alert(document.body.clientWidth);

    var alterClass = function() {
        var ww = document.body.clientWidth

        if (ww <= 981) {
            $('body').css('overflow', 'auto')
            $('.active-panel').removeClass('wrapper')
        } else if (ww > 981) {
            $('body').css('overflow', 'hidden')
            $('.active-panel').addClass('wrapper')
        }
    }
    $(window).resize(function() {
            alterClass()
        })
        //Fire it when the page first loads:
    alterClass()
})

// $( document ).ready(function() {

//      if ( $(window).width() < 767 ) {
//         $(".scroll_page").removeClass("page");

//    }
// });

//     if ( $(window).width() < 767 ) {
//         $(".scroll_page").removeClass("page");
//     }
// });

// $(window).on('resize', function(){
//      if ( $(window).width() < 767 ) {
//         $(".scroll_page").removeClass("page");
//     }else{
//       $(".scroll_page").addClass("page");
//     }
//    });

// $( document ).ready(function() {

//     // if ($('.second-section').visible(true)) {
//     if ($(".second-section").is(":visible") == true) {
//           $(".scrlbutton").click(function(){

//           $('html, body').animate({
//               scrollTop: $("#third-section-first").offset().top
//           }, 2000);
//         });
//       } else {

//       }
// });

$(document.body).addClass('body-overflow')
$(document).ready(function() {
    $('body').removeClass('body-overflow')
        // $(".valere").css("display", "none");
})
setTimeout(function() {
    // alert('02')
    $('#ctn-preloader').addClass('loaded')
        // Una vez haya terminado el preloader aparezca el scroll
        // alert('03')
    $('body').removeClass('no-scroll-y')
        // alert('04')

    if ($('#ctn-preloader').hasClass('loaded')) {
        // alert('50')
        // Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
        $('#preloader')
            .delay(1000)
            .queue(function() {
                $(this).remove()
            })
    }
}, 2000);
('use strict')
// $(document).ready(function() {
//   var $wrap = $(".wrapper"),
//       pages = $(".page").length,
//       scrolling = false,
//       currentPage = 1,
//       $navPanel = $(".nav-panel"),
//       $scrollBtn = $(".scroll-btn"),
//       $navBtn = $(".nav-btn");

//   /*****************************
//   ***** NAVIGATE FUNCTIONS *****
//   *****************************/
//   function manageClasses() {
//     $wrap.removeClass(function (index, css) {
//       return (css.match (/(^|\s)active-page\S+/g) || []).join(' ');
//     });
//     $wrap.addClass("active-page" + currentPage);
//     $navBtn.removeClass("active");
//     $(".nav-btn.nav-page" + currentPage).addClass("active");
//     //$navPanel.addClass("invisible");
//     scrolling = true;
//     setTimeout(function() {
//       //$navPanel.removeClass("invisible");
//       scrolling = false;
//     }, 1000);
//   }
//   function navigateUp() {
//     console.log("up")
//     if (currentPage > 1) {
//       currentPage--;
//       if (Modernizr.csstransforms) {
//         manageClasses();
//       } else {
//         $wrap.animate({"top": "-" + ( (currentPage - 1) * 100) + "%"}, 1000);
//       }
//     }
//   }

//   function navigateDown() {
//     console.log("down")
//     if (currentPage < pages) {
//       currentPage++;
//       if (Modernizr.csstransforms) {
//         manageClasses();
//       } else {
//         $wrap.animate({"top": "-" + ( (currentPage - 1) * 100) + "%"}, 1000);
//       }
//     }
//   }

//   /*********************
//   ***** MOUSEWHEEL *****
//   *********************/
//   $(document).on("mousewheel DOMMouseScroll", function(e) {

//     console.log("mouse")
//     if (!scrolling) {
//       if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
//         navigateUp();
//       } else {
//         navigateDown();
//       }
//     }
//   });

//   /**************************
//   ***** RIGHT NAVIGATION ****
//   **************************/

//   /* NAV UP/DOWN BTN PAGE NAVIGATION */
//   $(document).on("click", ".scroll-btn", function() {
//     console.log("scroll")
//     if ($(this).hasClass("up")) {
//       navigateUp();
//     } else {
//       navigateDown();
//     }
//   });

//   /* NAV CIRCLE DIRECT PAGE BTN */
//   $(document).on("click", ".nav-btn:not(.active)", function() {
//     if (!scrolling) {
//       var target = $(this).attr("data-target");
//       if (Modernizr.csstransforms) {
//         $wrap.removeClass(function (index, css) {
//           return (css.match (/(^|\s)active-page\S+/g) || []).join(' ');
//         });
//         $wrap.addClass("active-page" + target);
//         $navBtn.removeClass("active");
//         $(this).addClass("active");
//         $navPanel.addClass("invisible");
//         currentPage = target;
//         scrolling = true;
//         setTimeout(function() {
//           $navPanel.removeClass("invisible");
//           scrolling = false;
//         }, 1000);
//       } else {
//         $wrap.animate({"top": "-" + ( (target - 1) * 100) + "%"}, 1000);
//       }
//     }
//   });

// });

secondSectionButton.addEventListener('click', () => {
    jQuery.fn.fullpage.moveSectionDown()
    secondSectionButton.style.opacity = 0
    secondSectionDescription.style.opacity = 0

    setTimeout(() => {
        secondSectionButton.style.opacity = 1
        secondSectionDescription.style.opacity = 1
    }, 2000)
})