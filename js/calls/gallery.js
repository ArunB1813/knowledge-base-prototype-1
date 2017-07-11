$('.fotorama').fotorama({
	width: '100%',
	allowfullscreen: true,
	nav: 'thumbs',
	fit: 'cover',
	arrows: 'true',
	autoplay: '5000',
	trackpad: true,
	captions: false,
	keyboard: true,
});


$('.fotorama').on('fotorama:fullscreenenter fotorama:fullscreenexit', function (e, fotorama) {
	if (e.type === 'fotorama:fullscreenenter') {
		$('.fotorama__caption__wrap').css('opacity','1');
		fotorama.setOptions({
			fit: 'contain',
			captions: true
		});
	} else {
		$('.fotorama__caption__wrap').css('opacity','0');
		fotorama.setOptions({
			fit: 'cover',
			captions: false
		});
	}
});  


$('.fotorama').on('fotorama:ready', function (e, fotorama) {
	if ($(window).width() <= 1024) {
		fotorama.setOptions({
			ratio: '16/9'
		});
	} else {
		fotorama.setOptions({
			ratio: '21/9'
		});

		/*custom hover event on left/right side*/
		var $stage = $('.fotorama__stage');
		$stage.on('mousemove', function(e) {
		    var width = $(this).width(),
		    	offset = $(this).offset(),
		    	x = e.pageX - offset.left;

			if (x / width < .333) {
		    	$('.fotorama__arr--prev').addClass('hover');
		    	$('.fotorama__arr--next').removeClass('hover');
		        
		    } else {
		        $('.fotorama__arr--next').addClass('hover');
		    	$('.fotorama__arr--prev').removeClass('hover');
		    }
		});
		$stage.on('mouseout', function(){
		     $('.fotorama__arr').removeClass('hover');
		});
	};

	if ($(window).width() <= 767) {
		fotorama.setOptions({
			thumbwidth: '46px',
			thumbheight: '46px',
		});
	} else {
		fotorama.setOptions({
			thumbwidth: '64px',
			thumbheight: '64px',
		});

		/*stop autoplay if hover*/
		var $fotorama = $('.fotorama'),
		    interval = $fotorama.data('autoplay'),
		    fotorama = $fotorama.data('fotorama');
		$fotorama.hover(
			function() {
				fotorama.stopAutoplay();
			}, function() {;
				fotorama.startAutoplay(interval);
			}
		);
	};
});