$('head').append('<style>.scrollWrapper { height:inherit; width:14px; position:relative; overflow:visible; float:right; } .scrollUp { width:inherit; height:13px; border-bottom:1px solid black; background-color:#DDD; } .barWrapper { width:inherit; position:relative; background-color:#DDD; } .scrollBar { height:20%; width:12px; position:relative; margin:0 auto; box-shadow:2px 2px 2px #444; background-color:#FFF; -moz-border-radius:6px; border-radius:6px; } .scrollDown { width:inherit; height:13px; border-top:1px solid black; background-color:#DDD; } .arrowStyle { width:14px; height:14px; position:absolute; text-align:center; font-size:12px; color:#222; cursor:default; }</style>');

(function($) {
	$.fn.customScrollbar = function(options) {
		var settings = {
			width: 14,
			upBgColor: '#DDD',
			downBgColor: '#DDD',
			barBgColor: '#DDD',
			barColor: '#FFF'
		};
		
		var methods = {
			scrollUp: function(event) {
				thisPointer = $(this).parent().find('.scrollUp');
				heightArg = (($(thisPointer).parent().parent()[0].scrollHeight - $(thisPointer).parent().parent().height()) * 0.1);
				toHeight = $(thisPointer).parent().parent().scrollTop() - heightArg;
				$(thisPointer).parent().parent().scrollTop(toHeight);
				$(thisPointer).parent().css('top', $(thisPointer).parent().parent().scrollTop()+'px');
				percent = $(thisPointer).parent().parent().scrollTop() / ($(thisPointer).parent().parent()[0].scrollHeight - $(thisPointer).parent().parent().height());
				topPos = ($(thisPointer).parent().find('.barWrapper').height() - $(thisPointer).parent().find('.scrollBar').height()) * percent;
				$(thisPointer).parent().find('.scrollBar').css('top', topPos+'px');
			},
			scrollDown: function(event) {
				if($(this).parent().parent().scrollTop() < $.data($(this).parent().parent()[0], 'scrollHeight')) {
					thisPointer = $(this).parent().find('.scrollDown');
					heightArg = (($(thisPointer).parent().parent()[0].scrollHeight - $(thisPointer).parent().parent().height()) * 0.1);
					toHeight = $(thisPointer).parent().parent().scrollTop() + heightArg;
					$(thisPointer).parent().parent().scrollTop(toHeight);
					$(thisPointer).parent().css('top', $(thisPointer).parent().parent().scrollTop()+'px');
					percent = $(thisPointer).parent().parent().scrollTop() / ($(thisPointer).parent().parent()[0].scrollHeight - $(thisPointer).parent().parent().height());
					topPos = ($(thisPointer).parent().find('.barWrapper').height() - $(thisPointer).parent().find('.scrollBar').height()) * percent;
					$(thisPointer).parent().find('.scrollBar').css('top', topPos+'px');
				}
			}
		};
		
		$('.up').live('click', methods.scrollUp);
		$('.down').live('click', methods.scrollDown);
		
		return this.each(function(index, element) {
			if(!($.data(this, 'isScrolling'))) {
				$.data(this, 'scrollHeight', $(this)[0].scrollHeight - $(this).height());
				$.data(this, 'isScrolling', true);
				$(this).addClass('makeScrollable');
				thisHeight = $(this).height() - 28;
				$(this).prepend('<div class="scrollWrapper"><div class="scrollUp"></div><div class="barWrapper" style="height:'+thisHeight+'px;"><div class="scrollBar"></div></div><div class="scrollDown"></div></div>');
				$(this).scrollTop(0);
				$(this).find('.scrollBar').draggable({containment: 'parent', axis: 'y', drag: function(event, ui) {
					if($(this).parent().parent().parent().scrollTop() <= $.data($(this).parent().parent().parent()[0], 'scrollHeight')) {
						totalHeight = $(this).parent().height() - $(this).height();
						topPos = $(this).position().top;
						parentHeight = ($(this).parent().parent().parent()[0].scrollHeight - $(this).parent().parent().parent().height()) * (topPos / totalHeight);
						$(this).parent().parent().parent().scrollTop(parentHeight);
						$(this).parent().parent().css('top', $(this).parent().parent().parent().scrollTop()+'px');
					}
					else {
						totalHeight = $(this).parent().height() - $(this).height();
						topPos = $(this).position().top;
						parentHeight = ($(this).parent().parent().parent()[0].scrollHeight - $(this).parent().parent().parent().height()) * (topPos / totalHeight);
						$(this).parent().parent().parent().scrollTop(parentHeight - 1);
						$(this).parent().parent().css('top', $(this).parent().parent().parent().scrollTop()+'px');
					}
				}});
				upArrowTop = $(this).find('.scrollUp').position().top;
				upArrowLeft = $(this).find('.scrollUp').position().left;
				downArrowTop = $(this).find('.scrollDown').position().top;
				downArrowLeft = $(this).find('.scrollDown').position().left;
				$(this).find('.scrollWrapper').append('<div class="arrowStyle up" style=" top:'+upArrowTop+'px; left:'+upArrowLeft+'px;">&uArr;</div><div class="arrowStyle down" style=" top:'+downArrowTop+'px; left:'+downArrowLeft+'px;">&dArr;</div>');
			}
		});
	};
})(jQuery);