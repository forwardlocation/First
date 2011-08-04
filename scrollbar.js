$('document').ready(function() {
	$('head').append('<style>.scrollWrapper { height:inherit; width:14px; position:relative; overflow:visible; float:right; } .scrollUp { width:inherit; height:13px; border-bottom:1px solid black; background-color:#DDD; } .barWrapper { width:inherit; position:relative; background-color:#DDD; } .scrollBar { height:20%; width:12px; position:relative; margin:0 auto; box-shadow:2px 2px 2px #444; background-color:#FFF; -moz-border-radius:7px; border-radius:7px; } .scrollDown { width:inherit; height:13px; border-top:1px solid black; background-color:#DDD; } .arrowStyle { width:14px; height:14px; position:absolute; text-align:center; font-size:12px; color:#222; cursor:default; }</style>');
	setTimeout("showScrollBars()", 500);
});

function scrollUp(event) {
	scrollIndex = $(this).attr('scrollIndex');
	$('.makeScrollable[scrollIndex="'+scrollIndex+'"]').find('.scrollUp').click();
}

function scrollDown(event) {
	scrollIndex = $(this).attr('scrollIndex');
	$('.makeScrollable[scrollIndex="'+scrollIndex+'"]').find('.scrollDown').click();
}

function mainScrollUp(event) {
	event.stopPropagation();
	toHeight = $(this).parent().parent().scrollTop() - (($(this).parent().parent()[0].scrollHeight - $(this).parent().parent().height()) * 0.1);
	$(this).parent().parent().scrollTop(toHeight);
	$(this).parent().css('top', $(this).parent().parent().scrollTop()+'px');
	percent = $(this).parent().parent().scrollTop() / ($(this).parent().parent()[0].scrollHeight - $(this).parent().parent().height());
	$(this).parent().find('.scrollBar').css('top', ($(this).parent().find('.barWrapper').height() - $(this).parent().find('.scrollBar').height()) * percent+'px');
}

function mainScrollDown(event) {
	event.stopPropagation();
	toHeight = $(this).parent().parent().scrollTop() + (($(this).parent().parent()[0].scrollHeight - $(this).parent().parent().height()) * 0.1);
	$(this).parent().parent().scrollTop(toHeight);
	$(this).parent().css('top', $(this).parent().parent().scrollTop()+'px');
	percent = $(this).parent().parent().scrollTop() / ($(this).parent().parent()[0].scrollHeight - $(this).parent().parent().height());
	$(this).parent().find('.scrollBar').css('top', ($(this).parent().find('.barWrapper').height() - $(this).parent().find('.scrollBar').height()) * percent+'px');
}

function showScrollBars() {
	$('.makeScrollable').css({overflow: 'hidden'}).each(function(index, element) {
		thisHeight = $(this).height() - 28;
		$(this).prepend('<div class="scrollWrapper"><div class="scrollUp"></div><div class="barWrapper" style="height:'+thisHeight+'px;"><div class="scrollBar"></div></div><div class="scrollDown"></div></div>');
		upArrowTop = $(this).find('.scrollUp').offset().top;
		upArrowLeft = $(this).find('.scrollUp').offset().left;
		downArrowTop = $(this).find('.scrollDown').offset().top;
		downArrowLeft = $(this).find('.scrollDown').offset().left;
		$(this).attr('scrollIndex', index);
		$('body').append('<div class="arrowStyle up" style=" top:'+upArrowTop+'px; left:'+upArrowLeft+'px;" scrollIndex="'+index+'">&uArr;</div><div class="arrowStyle down" style=" top:'+downArrowTop+'px; left:'+downArrowLeft+'px;" scrollIndex="'+index+'">&dArr;</div>');
		$(this).scrollTop(0);
	});
	$('.scrollBar').draggable({containment: 'parent', axis: 'y', drag: function(event, ui) {
		totalHeight = $(this).parent().height() - $(this).height();
		topPos = $(this).position().top;
		parentHeight = ($(this).parent().parent().parent()[0].scrollHeight - $(this).parent().parent().parent().height()) * (topPos / totalHeight);
		$(this).parent().parent().parent().scrollTop(parentHeight);
		$(this).parent().parent().css('top', $(this).parent().parent().parent().scrollTop()+'px');
	}});
	$('.scrollUp').click(mainScrollUp);
	$('.scrollDown').click(mainScrollDown);
	$('.up').click(scrollUp);
	$('.down').click(scrollDown);
}