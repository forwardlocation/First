/*
To enable this script, add the attribute 'ddbox' to any element that contains all the images you would like to be in the lightbox gallery.
Set the 'ddbox' attribute to be a string that the full size images end with.
For example my thumbnail images are named like 'thumbnail.png' and the full size image is named 'thumbnailFull.png', so the attribute i would add to the containing element would be ddbox="Full".
This attribute can be left empty, in that case the lightbox will show the same image as the thumbnail when brought up. For example you could add ddbox="" to an element, and when an image is clicked, the light box will appear with the fullsize of the image that was selected.
*/

var imgArray;
var thisIndex;
var oldHeight;
var oldWidth;

$('document').ready(function() {
	imgArray = new Array();
	thisIndex = -1;
	$(window).resize(function(event) {
		if(thisIndex != -1) {
			imgArray[thisIndex].height = oldHeight;
			imgArray[thisIndex].width = oldWidth;
			winHeight = window.innerHeight;
			winWidth = window.innerWidth;
			if((imgArray[thisIndex].height + 60) > winHeight) {
				imgArray[thisIndex].height = window.innerHeight - 60;
				ratio = imgArray[thisIndex].height / oldHeight;
				imgArray[thisIndex].width *= ratio;
			}
			if((imgArray[thisIndex].width + 60) > winWidth) {
				imgArray[thisIndex].width = window.innerWidth - 60;
				ratio = imgArray[thisIndex].width / oldWidth;
				imgArray[thisIndex].height *= ratio;
			}
			curWidth = imgArray[thisIndex].width + 40;
			curHeight = imgArray[thisIndex].height + 40;
			toTop = (window.innerHeight - curHeight) / 2;
			toLeft = (window.innerWidth - curWidth) / 2;
			$('#lightOverlay').css({width: window.innerWidth+'px', height: window.innerHeight+'px'});
			$('#leftArrow, #rightArrow, #lightClose, #lightCounter, #lightList').css({display: 'none'});
			$('#lightBox').stop().animate({width: (imgArray[thisIndex].width + 40), height: (imgArray[thisIndex].height + 40), top: toTop+'px', left: toLeft+'px'}, 1000, function() {
				lightHeight = $('#lightBox').height();
				lightHeight = (lightHeight / 2) - 50
				lightWidth = $('#lightBox').width();
				$('#leftArrow').css({top: lightHeight+'px', display: 'block'});
				$('#rightArrow').css({top: lightHeight+'px', left: lightWidth+'px', display: 'block'});
				$('#lightClose').css({left: (lightWidth + 20)+'px', display: 'block'});
				$('#lightCounter').css({top: ($('#lightBox').height() - 30)+'px', left: (lightWidth + 10)+'px', display: 'block'});
				$('#lightList').css({display: 'block'});
				$(this).css('overflow', 'visible');
			});
		}
	});
	$('[ddbox] img').click(showLitUp);
	$('[ddbox] img').each(function(index, element) {
		tnImg = new String($(this).attr('src'));
		preUrl = tnImg.substr(0, tnImg.length - 4);
		postUrl = tnImg.substr(tnImg.length - 4);
		fullUrl = preUrl+$('[ddbox]').attr('ddbox')+postUrl;
		imgArray[index] = new Image();
		imgArray[index].src = fullUrl;
		$(this).attr('lightIndex', index);
	});
});

function showLitUp(newIndex) {
	winWidth = window.innerWidth;
	winHeight = window.innerHeight;
	halfWidth = winWidth / 2;
	halfHeight = winHeight / 2;
	if(typeof(newIndex) == "number") {
		thisIndex = newIndex;
	}
	else {
		thisIndex = parseInt($(this).attr('lightIndex'));
	}
	oldHeight = imgArray[thisIndex].height;
	oldWidth = imgArray[thisIndex].width;
	
	if(imgArray[thisIndex].height > winHeight) {
		imgArray[thisIndex].height = window.innerHeight - 60;
		ratio = imgArray[thisIndex].height / oldHeight;
		imgArray[thisIndex].width *= ratio;
	}
	if(imgArray[thisIndex].width > winWidth) {
		imgArray[thisIndex].width = window.innerWidth - 60;
		ratio = imgArray[thisIndex].width / oldWidth;
		imgArray[thisIndex].height *= ratio;
	}
	
	$('body').append('<div style="width:'+winWidth+'px; height:'+winHeight+'px; position:fixed; top:0px; left:0px; background-color:rgba(150, 150, 150, .3); cursor:pointer;" id="lightOverlay"></div>');
	$('#lightOverlay').append('<div style="width:0px; height:0px; position:relative; top:'+halfHeight+'px; left:'+halfWidth+'px; background-color:#FFF; -moz-border-radius:15px; border-radius:15px; text-align:center;" id="lightBox"></div>');
	$('#lightBox').animate({width: (imgArray[thisIndex].width + 40), height: '20px', top: '-=10px', left: '-='+((imgArray[thisIndex].width + 40) / 2)+'px'}, 500, function() {
		$(this).animate({height: (imgArray[thisIndex].height + 40), top: '-='+((imgArray[thisIndex].height + 20) / 2)+'px'}, 500, function() {
			$(this).append('<div style="height:20px;"></div>').append(imgArray[thisIndex]);
			$('#lightOverlay').click(destroyLit);
			showSides();
		});
	});
}

function showSides() {
	lightHeight = $('#lightBox').height();
	lightHeight = (lightHeight / 2) - 50
	lightWidth = $('#lightBox').width() - 50;
	$('#lightBox').append('<div style="width:50px; height:100px; position:absolute; top:'+lightHeight+'px; left:0px; -moz-border-radius:15px 0 0 15px; border-radius:15px 0 0 15px; font:40px Arial; background-color:#FFF; text-align:center; opacity:0;" id="leftArrow"><div style="height:30px;"></div><</div><div style="width:50px; height:100px; position:absolute; top:'+lightHeight+'px; left:'+lightWidth+'px; -moz-border-radius:0 15px 15px 0; border-radius:0 15px 15px 0; font:40px Arial; background-color:#FFF; text-align:center; opacity:0;" id="rightArrow"><div style="height:30px;"></div>></div><div style="width:0px; height:0px; position:absolute; top:25px; left:'+(lightWidth + 95)+'px; -moz-border-radius:25px; border-radius:25px; font:30px Arial; background-color:#FFF; text-align:center; opacity:0;" id="lightClose"><div style="height:8px;"></div></div><div style="width:0px; height:0px; position:absolute; top:'+($('#lightBox').height() - 15)+'px; left:'+(lightWidth + 160)+'px; -moz-border-radius:10px; border-radius:10px; font:15px Arial; background-color:#FFF; text-align:center; opacity:0;" id="lightCounter"><div style="height:6px;"></div></div><div style="width:50px; height:0px; position:absolute; top:0px; left:-120px; -moz-border-radius:10px; border-radius:10px; font:10px Arial; background-color:#FFF; text-align:center; opacity:0;" id="lightList">Show Image</div>');
	$('#leftArrow').hover(function(event) {
		$(this).css({color: '#FFF', backgroundColor: '#000'});
	}, function(event) {
		$(this).css({color: '#000', backgroundColor: '#FFF'});
	}).animate({left: '-=50px', opacity: 1}, 750, function() {
		$(this).click(showLastImg);
	});
	$('#rightArrow').hover(function(event) {
		$(this).css({color: '#FFF', backgroundColor: '#000'});
	}, function(event) {
		$(this).css({color: '#000', backgroundColor: '#FFF'});
	}).animate({left: '+=50px', opacity: 1}, 750, function() {
		$(this).click(showNextImg);
	});
	$('#lightClose').hover(function(event) {
		$(this).css({width: '60px', height: '60px', top: '-5px', left: ($(this).position().left - 5)+'px', '-moz-border-radius': '30px', 'border-radius': '30px', color: '#FFF', backgroundColor: '#000'});
		$(this).children().first().css('height', '13px');
	}, function(event) {
		$(this).css({width: '50px', height: '50px', top: '0px', left: ($(this).position().left + 5)+'px', '-moz-border-radius': '30px', 'border-radius': '30px', color: '#000', backgroundColor: '#FFF'});
		$(this).children().first().css('height', '8px');
	}).animate({width: '50px', height: '50px', top: '-=25px', left: '-=25px', opacity: 1}, 750, function() {
		$(this).children().first().after('X');
		$(this).click(destroyLit);
	});
	$('#lightCounter').animate({width: '200px', height: '30px', top: '-=15px', left: '-=100px', opacity: 1}, 750, function() {
		$(this).children().first().after('Image '+(thisIndex + 1)+' of '+(parseInt($('[lightindex]').last().attr('lightindex')) + 1));
	});
	$('#lightList').animate({height: (26 + ($('[lightindex]').length * 26))+'px', opacity: 1}, 750, function() {
		$('[lightindex]').each(function(index, element) {
			if(thisIndex == index) {
				$('#lightList').append('<br /><button onclick="javascript:event.stopPropagation();" style="background-color:#000; color:#FFF; border:none;">'+(index + 1)+'</button>');
			}
			else {
				$('#lightList').append('<br /><button onclick="javascript:destroyLit(showLitUp, '+index+');">'+(index + 1)+'</button>');
			}
		});
	});
	$('#lightBox, #lightBox *').click(function(event) {
		event.stopPropagation();
	});
}

function showLastImg(event) {
	nextIndex = thisIndex;
	nextIndex--;
	if(nextIndex < 0) {
		nextIndex = parseInt($('[lightindex]').last().attr('lightindex'));
	}
	destroyLit(showLitUp, nextIndex);
}

function showNextImg(event) {
	nextIndex = thisIndex;
	nextIndex++;
	if(nextIndex > parseInt($('[lightindex]').last().attr('lightindex'))) {
		nextIndex = 0;
	}
	destroyLit(showLitUp, nextIndex);
}

function destroyLit(callBack, arg) {
	halfHeight = window.innerHeight / 2;
	halfWidth = window.innerWidth / 2;
	$('#lightBox img').remove();
	$('#lightBox').animate({height: '20px', top: '+='+((imgArray[thisIndex].height + 40) / 2)+'px'}, 500, function() {
		$(this).animate({width: '0px', height: '0px', top: halfHeight+'px', left: halfWidth+'px'}, 500, function() {
			$('#lightOverlay').remove();
			imgArray[thisIndex].height = oldHeight;
			imgArray[thisIndex].width = oldWidth;
			thisIndex = -1;
			if(typeof(callBack) == "function") {
				callBack(arg);
			}
		});
	});
}