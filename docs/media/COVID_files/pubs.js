var pubsLoad = true;
window.mobile = true;
var defaultSocial = $('#content_body');

/* On Ready */
$(document).ready(function() {
	/*
	To fix tabing to the exta info on news and magazine stories banner images
	*/
	$("#info-click").focus(function(){
		$(this).click();
	});

	/* social media icon positioning; old News stories */
	if($(document).width() < 1200) { $('#social-links').css('position','static'); }
	else {$('#social-links').css({'position':'absolute', 'top':(defaultSocial.offset().top) + 'px', 'left':(defaultSocial.offset().left - 68) + 'px'});}
	
	// Position info caption icon	
	if($(document).width() >= 1025 && $('.jumbo #info-click').length) {
		$('.jumbo #info-click').css({'position':'absolute', 'left':(defaultSocial.offset().left + 5) + 'px'});
	}
	else if($(document).width() >= 1025 && $('#info-click').length) {
		$('#info-click').css({'position':'absolute', 'left': '5px'});
	}
	$('#info-click').css('display','block');
	
	// Toggle comments button
	$('#comment-button a').on('click', function() {
		$('#comment-holder').show();
		$(this).hide();
		event.preventDefault();
	});
	$('#comments a').on('click', function() {
		$('#comment-holder').show();
		$('#comment-button').hide();
		event.preventDefault();
	});
	
	// Carousel
	var current	= parseInt(1);
	var count = $('#banner-media div.slide').length; //Number of slides, determined by the number of elements with the class of 'slide'
	var url		= null;
	var embed	= null;
	if($('div.banner').children().children().hasClass('video-wrap')) {
		var yt_int, yt_players={},
		initYT = function() {
			$(".ytplayer").each(function() {
				yt_players[this.id] = new YT.Player(this.id);
			});
		};

		$.getScript("//www.youtube.com/player_api", function() {
			yt_int = setInterval(function(){
				if(typeof YT === "object"){
					initYT();
					clearInterval(yt_int);
				}
			},500);
		});
	}

	      $("#comment-button").on("click", function(event){
    
            var d = document, s = d.createElement('script');

            s.src = '//mtunews.disqus.com/embed.js';

            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
			  
			console.log(disqus_config);  
              
      });
      $("#comments a, .hero__comments a").on("click", function(event) {
             event.preventDefault();
             $("#comment-button a").trigger("click");
            $("html, body").animate({ scrollTop: $("#comment-wrap").offset().top - 300}, 800);
	});
	// Show the arrows/circles if there's more than 1 slides
	if($('.slide').length > 1) {$('#prev, #next, #media-nav').show();}
	
	var defaultVid = ''; // Fixing annoying YT inconsistencies with thumbnail file
	if($('#slide-1').hasClass('video-wrap')) defaultVid = $('#banner-media').css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
	
	function showSlide(current) {
		$('#slide-' + current).removeClass('hide');
		if(typeof yt_players !== 'undefined' && $('.ytplayer').length > 0 && yt_players['video-1'].getPlayerState() !== 5) { yt_players['video-1'].pauseVideo(); }
		//$('#banner, #banner-media').fadeTo('fast', 0.5, function() {
			embed = $('#slide-' + current + ' img').attr('src');
			$('div.' + current).addClass('active');
			if($('#slide-' + current).hasClass('video-wrap')) {
				/* For YouTube backgrounds */
				url = $('#slide-' + current + ' iframe').attr('src');
				url = url.split('?');
				embed = url[0].split('/');
				if(current !== 1) { embed = '//i.ytimg.com/vi/' + embed[4] + '/maxresdefault.jpg'; } else { embed = defaultVid }
				$('#info-launch, #publish-date').addClass('hide');
				$('#caption').hide();
			}else{
				$('#info-launch, #publish-date').removeClass('hide');
				$('#info-launch').parent().attr('href', $('#slide-' + current + ' img').attr('src'));
				$('#info-launch').parent().attr('title', $('#slide-' + current + ' img').attr('title'));
			}
				$('#banner, #banner-media').css('background-image','url(' + embed + ')');
				$('#banner-media').attr('rel','slide-' + current);
				$('#caption p').text($('#slide-' + current + ' img').attr('title'));
		//}).fadeTo('slow', 1);
	}
	
	// Show the caption on the slideshow
	$('#info-click, #hide-caption').click(function(){
		if($('#caption').is(':hidden')) {
			//$('#caption').slideDown('fast'); 
			$('#caption p').text($('#slide-' + current + ' img').attr('title'));
		}else{
			//$('#caption').slideUp('fast'); 
		}
		$('#caption p').text($('#slide-' + current + ' img').attr('title'));
	});
	
	$(document).on("click","#prev, #next",function(e){
		$('#slide-' + current).addClass('hide');
		$('div.' + current).removeClass('active');
		if(e.target.id === 'next') {
			if(current < count) {
				current = current + 1;
				showSlide(current);
			}else{
				current = 1;
				showSlide(current);
			}
		}else{
			if(current === 1) {
				current = count;
				showSlide(current);
			}else{
				current = current - 1;
				showSlide(current);
			}
		}
		$('#media-nav').show();
	});
	
	$("#media-nav").on("click", "div", function () {
		if('#slide-' + current !== $('#slide-' + $(this).attr('class').split(' ')[0])) {
			$('#slide-' + current).addClass('hide');
			$('div.' + current).removeClass('active');
			current = parseInt($(this).attr('class').split(' ')[0]);
			showSlide(current);
		}
	});	
	
	// Play mediazone video jcv remove once all pages published
	$('#playhead').on('click', function() {
		$('#video-1').attr('src',$('#video-1')[0].src+'&autoplay=1');
		$('#video-1').css('display','block');
		$(this).css('display','none');
		$('.video-wrap').css({'background':'black','display':'inherit'});
		$('#media-nav').hide();
	});
	
	// NEW STYLE Play mediazone video
	$('#banner-media .playhead').on('click', function() {
		$('#video-1').attr('src',$('#video-1')[0].src+'&autoplay=1');
		$('#video-1').css('display','block');
		$(this).css('display','none');
		$('.video-wrap').css({'background':'black','display':'inherit'});
		$('#media-nav').hide();
	});
});

/* On Window Load */
$(window).on('load', function() {
	var ImgSize;
	var smallImg = false;
	var rbarImg = false;
	var windowWidth = $(document).width();
	// Caption width for images in the body text, not the mediazone
	$('.caption').each(function() {
		if($(this).find('img').width()) {
			ImgSize=$(this).find('img').width();
			if(ImgSize==350){rbarImg=1}else if(ImgSize<350){smallImg=1}
			if($(this).find('img').attr('src').indexOf('scol') > -1 && mobile==1 || $(this).find('img').attr('src').indexOf('rside') > -1 && mobile==1) {
				$(this).addClass('wide-img');
			}
			else{
				if(rbarImg){
					if(windowWidth>999){
						$(this).css('max-width',ImgSize);
					}
					else if(windowWidth>=881){
						$(this).css('max-width',320);
					}
					else if(windowWidth>=768){
						$(this).css('max-width',275);
					}
					else if(windowWidth>=525){
						$(this).css('max-width',(windowWidth/2));	
					}
					else if(windowWidth>=350){
						$(this).css('max-width',ImgSize);
						$(this).parent().css('float',"left");
						$(this).parent().css('clear',"both");
						$(this).parent().css('width',"100%");
					}
					else{
						//no max-width needed on figure; alter image size
						$(this).find('img').css('width',"100%");
					}
				}
				else if(smallImg){
					if(windowWidth>=360){
						$(this).css('max-width',ImgSize);
					}
					else if(windowWidth>=320){
						$(this).css('max-width',ImgSize);
						$(this).parent().css('float',"left");
						$(this).parent().css('clear',"both");
						$(this).parent().css('width',"100%");
					}
					else{
						//no max-width needed on figure; alter image size
						$(this).find('img').css('width',"100%");
					}
				}
				else if(ImgSize>=windowWidth){
					//no max-width needed on figure
					console.log("Big image, small screen");
				}
				else{
					$(this).css('max-width',ImgSize);
				}
			}
		}
	});
});

/* On Window Resize */
$(window).on('resize',function(){
	if($(document).width() < 1025) { $('.jumbo #info-click').css('left','0px'); $('#info-click').css({'position':'absolute', 'left': '5px'});} else {
	$('.jumbo #info-click').css({'position':'absolute', 'left':(defaultSocial.offset().left + 5) + 'px'}); $('#info-click').css({'position':'absolute', 'left': '5px'});}
	if($(document).width() < 1200) { $('#social-links').css('position','static'); } else {
	$('#social-links').css({'position':'absolute', 'top':(defaultSocial.offset().top) + 'px', 'left':(defaultSocial.offset().left - 68) + 'px'}); }
});

/* Vertical social media icons, 1200px wide screens only */
if ($(window).width() > 1200) {
	$(document).ready(function() {
		if($(window).scrollTop()>800){
			$(".social-links.vertical").addClass("fix");
		}
	});
	
	$(window).scroll(function() {
		var scrollPosition = $(window).scrollTop();
		var footerPosition = $('footer').offset().top;
		if(scrollPosition>800){
			if((footerPosition - scrollPosition)< 440){
				// too close to the footer; position above footer
				$(".social-links.vertical").removeClass("fix");
				$(".social-links.vertical").addClass("fixed");
			}
			else{
				// not too close to footer; stick in the sweet spot
				$(".social-links.vertical").addClass("fix");
				$(".social-links.vertical").removeClass("fixed");
			}
		}
		else{
			// user is at the top of the page; no need to stick social icons
			$(".social-links.vertical").removeClass("fix");
			$(".social-links.vertical").removeClass("fixed");
		}
	});
}