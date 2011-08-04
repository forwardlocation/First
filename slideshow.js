/*
To enable this script, add the class 'slideshow' to the block level element that should contain the slideshow.
The only other thing that should be added is an onload event on the body tag of the page.
onLoad="javascript:setSlideTimes(1, 5, 10, 'fade')"
The 'setSlideTimes' function tells the slide show how to function.

The first argument :
The first number sent to the function, in my example above it is 1, is the total time in seconds that the transition between slides will take.
This means that each slide will take a half a second to slide out and a half a second for the new slide to come in, making the total time 1 second.

The second argument :
The second number sent to the function, in my example above it is 5, is the amount of time in seconds to hold on a slide before it changes to the next slide.

The third argument :
The third number sent to the function, in my example above it is 10, is the amount of time in seconds to hold on a slide if the user veiwing the slide show chooses to veiw a specific slide by clicking one of the slide selector buttons.
This means that if one of the buttons representing a slide is clicked, it will begin to slide the current slide out and bring the selected one in to veiw immediatly, but once the slide is in place, it will hold on this slide for 10 seconds in my example before showing the next slide and resuming the normal slide time set by the second argument.

The fourth argument :
The fourth argument sent to the function, in my example above it is 'fade', determines how the slides will leave and enter the slide show.
Possible values for this are 'up', 'down', 'left', 'right', and 'fade'.
If i direction is sent, then when a slide leaves the slide show it will move in this direction, and the new slide entering will enter from the opposite direction.
If 'fade' is sent to the function, then the slides will simply fade in and out of veiw.
*/

var slideTime;
var changeTime;
var holdTime;
var slideTimer;
var numSlides;
var curSlide;
var slideOut;
var slideSetup;
var slideIn;
var holdTimer;

$('document').ready(function() {
	curSlide = 0;
	$('head').append('<style>.selectorOuter { width:20px; height:20px; float:left; -moz-border-radius:10px; border-radius:10px; background-color:#000; } .selectorInner { width:14px; height:14px; -moz-border-radius:7px; border-radius:7px; background-color:#FFF; margin:0 auto; }</style>');
	$('.slideshow').css({overflow: 'hidden', backgroundColor: '#000'});
	$('.slideshow').children().each(function(index, element) {
		$(this).css('position', 'relative');
		if(index != 0) {
			$(this).css('display', 'none');
		}
	});
	setTimeout("addElements()", 500);
});

function incSlide() {
	nextId = curSlide + 1;
	if(nextId == numSlides) {
		nextId = 0;
	}
	return nextId;
}

function addElements() {
	numSlides = $('.slideshow').eq(0).children().length;
	slideTop = $('.slideshow').eq(0).offset().top + $('.slideshow').height() - 25;
	slideLeft = $('.slideshow').eq(0).offset().left + $('.slideshow').width() - (20 * numSlides) - 5;
	$('body').append('<div id="slideSelector" style="width:'+(numSlides * 20)+'px; height:20px; position:absolute; top:'+slideTop+'px; left:'+slideLeft+'px;"></div>');
	for(i = 0;i < numSlides;i++) {
		$('#slideSelector').append('<div id="'+i+'" class="selectorOuter"><div style="height:3px;"></div><div class="selectorInner"></div></div>');
	}
	$('.selectorOuter').hover(function(event) {
		$(this).css({cursor: 'pointer', backgroundColor: '#00F'});
	}, function(event) {
		$(this).css({cursor: 'auto', backgroundColor: '#000'});
	});
	$('#slideSelector #'+curSlide).children().eq(1).css({backgroundColor: '#999'});
	$('.selectorOuter').click(function(event) {
		event.stopPropagation();
		clearInterval(slideTimer);
		changeSlide(parseInt($(this).attr('id')));
		clearTimeout(holdTimer);
		holdTimer = setTimeout("resumeSlide()", holdTime);
	});
}

function resumeSlide() {
	changeSlide();
	slideTimer = setInterval("changeSlide()", changeTime);
}

function changeSlide(index) {
	if(typeof(index) == "number") { nextSlide = index; }
	else { nextSlide = incSlide(); }
	$('.slideshow').children().eq(curSlide).animate(slideOut, (slideTime / 2), function() {
		$(this).css({display: 'none'});
		$('#slideSelector').children().eq(curSlide).children().eq(1).css({backgroundColor: '#FFF'});
		curSlide = nextSlide;
		$('#slideSelector').children().eq(curSlide).children().eq(1).css({backgroundColor: '#999'});
		$('.slideshow').children().eq(curSlide).css(slideSetup).animate(slideIn, (slideTime / 2), function() {
		});
	});
}

function setSlideTimes(slide, change, hold, direction) {
	slideTime = slide * 1000;
	changeTime = change * 1000;
	holdTime = hold * 1000;
	if(direction == "left") {
		slideOut = {left: '-='+$('.slideshow').eq(0).width()+'px', opacity: 0};
		slideSetup = {display: 'block', left: $('.slideshow').eq(0).width()+'px', opacity: 0};
		slideIn = {left: '0px', opacity: 1};
	}
	if(direction == "up") {
		slideOut = {top: '-='+$('.slideshow').eq(0).height()+'px', opacity: 0};
		slideSetup = {display: 'block', top: $('.slideshow').eq(0).height()+'px', opacity: 0};
		slideIn = {top: '0px', opacity: 1};
	}
	if(direction == "right") {
		slideOut = {left: $('.slideshow').eq(0).width()+'px', opacity: 0};
		slideSetup = {display: 'block', left: '-'+$('.slideshow').eq(0).width()+'px', opacity: 0};
		slideIn = {left: '0px', opacity: 1};
	}
	if(direction == "down") {
		slideOut = {top: $('.slideshow').eq(0).height()+'px', opacity: 0};
		slideSetup = {display: 'block', top: '-'+$('.slideshow').eq(0).height()+'px', opacity: 0};
		slideIn = {top: '0px', opacity: 1};
	}
	if(direction == "fade") {
		slideOut = {opacity: 0};
		slideSetup = {display: 'block', opacity: 0};
		slideIn = {opacity: 1};
	}
	slideTimer = setInterval("changeSlide(null)", changeTime);
}