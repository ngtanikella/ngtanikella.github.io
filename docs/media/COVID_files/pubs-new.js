(function() {
	/* IE forEach Polyfill */
	if ('NodeList' in window && !NodeList.prototype.forEach) {
		console.info('polyfill for IE11');
		NodeList.prototype.forEach = function (callback, thisArg) {
		  thisArg = thisArg || window;
		  for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		  }
		};
	  }

	/* If the column it too tall, collapse it to one collumn. */
	var magazines = document.querySelectorAll(".magazine-layout");
  
	magazines.forEach(function(item) {
	  if (item.clientHeight > window.innerHeight) {
		item.classList.add("magazine-layout--collapsed");
	  }
	});
	
	actualResizeHandler();
	window.addEventListener("resize", resizeThrottler, false);
  
	var resizeTimeout;
	function resizeThrottler() {
	  // ignore resize events as long as an actualResizeHandler execution is in the queue
	  if (!resizeTimeout) {
		resizeTimeout = setTimeout(function() {
		  resizeTimeout = null;
		  actualResizeHandler();
  
		  // The actualResizeHandler will execute at a rate of 15fps
		}, 66);
	  }
	}
  
	function actualResizeHandler() {
	  var textDivHeight = document.querySelectorAll(".magazine-layout");
  
	  textDivHeight.forEach(function(item) {
		item.classList.remove("magazine-layout--collapsed");
  
		if (item.clientHeight > window.innerHeight - 100) {
		  item.classList.add("magazine-layout--collapsed");
		} else if (item.clientHeight < window.innerHeight - 100) {
		  item.classList.remove("magazine-layout--collapsed");
		}
	  });
	}
  
	var info_icon = document.querySelector("#js-info-button");
	var info_trigger = document.querySelectorAll(".js-info-trigger");
	var info_content = document.querySelector("#js-info-content");
	var hero = document.querySelector(".hero--feature");
  
	info_trigger.forEach(function(trigger) {
	  trigger.addEventListener("click", toggleHeaderInfo);
	});
  
	function toggleHeaderInfo() {
	  var trigger = this;
	  var contentHeight = info_content.scrollHeight;

	  info_content.classList.toggle("hero__info-content--open");
  
	  if ("true" === info_icon.getAttribute("aria-expanded")) {
		info_icon.setAttribute("aria-expanded", false);
		hero.style.maxHeight = null;
	  } else {
		info_icon.setAttribute("aria-expanded", true);
	  	if (contentHeight > info_content.clientHeight) { 
	  		hero.style.maxHeight = contentHeight+'px';
	  	}
	  }
	}
  
	// link: https://stackoverflow.com/questions/11805955/how-to-get-the-distance-from-the-top-for-an-element
	function getPosition(element) {
	  var xPosition = 0;
	  var yPosition = 0;
  
	  while(element) {
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	  }
  
	  return { x: xPosition, y: yPosition };
	}
  
  
	/**
	*   Check the position of the window vs the location of the element
	*   and apply attributes when the window scrolls past the element.
	*
	*   @param element object Selected element for sticky.
	*   @param target object Optional. Target to begin sticky, if none defined the element is used.
	*   @param stickyOffset int Optional. Pixels allowed to scroll past the target.
	*   @param marginOffset int Optional. Pixels from top to offset element when it is sticky.
	*/
	function makeSticky(element, target, stickyOffset, marginOffset, stickySmall ) {
	  var intViewportWidth = window.innerWidth;
	  stickyOffset = stickyOffset ? stickyOffset : null; 
	  marginOffset = marginOffset ? marginOffset : null; 
	  stickySmall = stickySmall ? stickySmall : null; 
	  if (1200 < intViewportWidth && !stickySmall){
		// @link https://stackoverflow.com/questions/11373741/detecting-by-how-much-user-has-scrolled
		var scrollTop =
			window.pageYOffset !== undefined
		? window.pageYOffset
		: (
		  document.documentElement ||
		  document.body.parentNode ||
		  document.body
		).scrollTop;
  
		if (target - stickyOffset < scrollTop) {
		  element.classList.add("stuck");
		  if (marginOffset) {
			element.style.top = marginOffset + "px";
		  }
		} else if (element.classList.contains("sticky")) {
		  element.classList.remove("stuck");
		  if (marginOffset) {
			element.style.top = null;
		  }
		}
	  } else if (element.classList.contains("sticky")) {
		element.classList.remove("stuck");
		if (marginOffset) {
		  element.style.top = null;
		}
	  }
	}
  
	// Get all the items with the class sticky and put them into with thier attributes into an object array.
	function stickyInit(){
	  var stickyItems = [];
	  var sticky_all = document.querySelectorAll(".sticky");
  
	  for (var i = 0; i < sticky_all.length; i++){
		var item = sticky_all[i];
		var target = document.querySelector('#'+item.dataset.stickyanchor) || item; // Must have a target with a unique ID
		var stickyOffset = item.dataset.scrolloffset || null; 
		var marginOffset = item.dataset.marginoffset || null;
		var stickySmall = item.dataset.stickysmall || null;
		var targetDistance = getPosition(target).y;
  
		var stickyInfo = [ item, targetDistance, stickyOffset, marginOffset, stickySmall ]
		stickyItems.push(stickyInfo);
	  }
  
	  window.addEventListener("scroll", srollThrottler, false);
  
	  var scrollTimeout;
	  function srollThrottler() {
		// ignore resize events as long as an actualResizeHandler execution is in the queue
		if (!scrollTimeout) {
		  scrollTimeout = setTimeout(function() {
			scrollTimeout = null;
			for (var i = 0; i < sticky_all.length; i++){
			  makeSticky(stickyItems[i][0], stickyItems[i][1], stickyItems[i][2], stickyItems[i][3], stickyItems[i][4]);
			}
			// The actualResizeHandler will execute at a rate of 15fps
		  }, 66);
		}
	  }
	}
  
  })();


//News youtube banner 
var videoID;
if(document.getElementById("banner-video-js") != null) {
	videoID = document.getElementById("banner-video-js").getAttribute("data-video-id");
} else {
	videoID=null;
}
var bannerPlayer;
function onYouTubePlayerAPIReady() {
	bannerPlayer = new YT.Player('banner-video-js', {
		videoId: videoID,
		height: '500',
		width: '1200'
	});
}

function onPlayerReady(event) {
	document.getElementById("banner-video-js").style.maxWidth = '100%';
	document.getElementById("banner-video-js").style.maxHeight = '40vw';
}


function onYouTubeIframeAPIReady() {
    if (typeof videos === 'undefined') return;
    
    for (var i = 0; i < videos.length; i++) {
		console.log(videos[i]);
        var curplayer = createPlayer(videos[i]);
        players[videos[i]] = curplayer;
		console.log(players);
    }
}

var players = new Array();

function createPlayer(playerInfo) {
    return new YT.Player('player'+playerInfo, {
        height: '420',
        width: '1024',
        videoId: playerInfo,
		playerVars: { 
			'modestbranding': 1,
			'rel': 0
		}
		
    });
}


defer(function() {

	$(document).ready(function(){
if(videoID != null){
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
$(".hero .playhead").on( "click", function() {
	$(".player-hero").removeAttr("style");
	$(".hero__image").attr("style","display:none");
	$(".socialpubs-menu").attr("style","display:none");
	$(".hero .playhead,.hero__info-button,.hero__info").attr("style","display:none");
	$(".hero").addClass("playing");
	bannerPlayer.playVideo();
	$("#banner-video-js").attr("style","max-width: 100%;");
});
});
	$("#slide-1").attr("data-active","true");
	$("#slide-1").attr('style','height:0;');//pubs is removing the hide class, need to add a height of zero because these are implemented differently
	
	
	$(".next").on("click", function() {
		var curr = $('.slide[data-active=true]');
		var next = $(curr[0]).next();
		if($(next[0]).hasClass("slide") === false) {
			next = $("#slide-1");
		}
		
		//console.log($(next[0]).children().attr('href'));
		//$('.hero__image--background').attr("style","background-image: url('"+$(next[0]).children().attr('href')+"')");
		$.get( "/_resources/php/pubs/img-srcset.php", { type: "src", img: $(next[0]).children().attr('href') } )
			.done(function(data) {
			$('.hero__image--background img').attr("src",data);
		});
		$.get( "/_resources/php/pubs/img-srcset.php", { type: "srcset", img: $(next[0]).children().attr('href') } )
			.done(function(data) {
			$('.hero__image--background img').attr("srcset",data);
		});
		$('.hero__info-content-inside').text($(next[0]).children().attr('title'));
		
		//$('.hero__image--background img').attr("src",$(next[0]).children().attr('href'));		  
		$(curr[0]).removeAttr("data-active");
		$(next[0]).attr("data-active","true");
		
		
	});
				 
	$(".prev").on("click", function() {
		var curr = $('.slide[data-active=true]');
		var next = $(curr[0]).next();
		if($(next[0]).hasClass("slide") === false) {
			next = $("#slide-1");
		}
		
		//console.log($(next[0]).children().attr('href'));
		//$('.hero__image--background').attr("style","background-image: url('"+$(next[0]).children().attr('href')+"')");
		$.get( "/_resources/php/pubs/img-srcset.php", { type: "src", img: $(next[0]).children().attr('href') } )
			.done(function(data) {
			$('.hero__image--background img').attr("src",data);
		});
		$.get( "/_resources/php/pubs/img-srcset.php", { type: "srcset", img: $(next[0]).children().attr('href') } )
			.done(function(data) {
			$('.hero__image--background img').attr("srcset",data);
		});
		$('.hero__info-content-inside').text($(next[0]).children().attr('title'));
		
		$(curr[0]).removeAttr("data-active");
		$(next[0]).attr("data-active","true");
		
	});


	//This is for when the categories get to be too big.
	/*$('.hero__byline__tags').addClass('hero-byline-tags-minimized');	
	$('.hero-byline-tags-minimized').mouseenter(function() {
		$(this).animate({ maxWidth: "100ch" }, 1500 );
		$(this).delay(1000).queue(function() { 
			$(this).removeClass('hero-byline-tags-minimized').dequeue();
			$('.hero__byline__tags').removeAttr("style");
        });
	});*/
});
