/*$('input').attr('autocomplete', 'off');
$('img').attr({
    'ondrag': 'return false',
    'ondragdrop': 'return false',
    'ondragstart': 'return false',
    'oncontextmenu': 'return false'
});*/

/*POPUP*/ /* manual --> http://dimsemenov.com/plugins/magnific-popup/documentation.html */
$('.popup-link').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',
    mainClass: 'mfp-fade',
    callbacks: {
        beforeOpen: function() {
            if($(window).width() < 700) {
                this.st.focus = false;
            } else {
                this.st.focus = '#name';
            }
        }
    }
});

/*SCROLL-LINK*/
$('.scroll-link').click( function(){ 
var scroll_el = $(this).attr('href'); 
headerHeight =  $('.header_wrap').height(); 
    if ($(scroll_el).length != 0) { 
    $('html, body').animate({ scrollTop: $(scroll_el).offset().top-headerHeight }, 600);
    }
    return false; 
});

/*DISABLE SCROLL FUNC*/
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}
function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}

