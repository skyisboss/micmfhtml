$('[data-toggle="tooltip"]').tooltip();

// 左边栏 菜单展开手风琴效果
$('.sidebar-element>li.parent').on('click',function(){
	var that = $(this);
    that.children('.sub-menu').slideToggle(180,function(){
    	if (that.hasClass('open')) {
    		that.removeClass('open');
    	}else{
    		that.addClass('open');
    	}
    });
    that.siblings().children('.sub-menu').slideUp(180).parent('.parent').removeClass('open');      
})





//自定义滚动条
if ($('.fixed-sidebar').length >0) {
	var ps = new PerfectScrollbar('.sidebar-scroll');
}
if ($('.boxed-layout').length >0) {
	$('body').css('height','100%');
}





// 左边栏 展开
$('.menu-toggle,.menubg').on('click',function(){
	var width = $(window).width();
	if (width > 768 ) {
		$('body').addClass('full');
	}
	if ($('body').hasClass('show-sidebar')) {
		$('body').removeClass('show-sidebar');
		$('body').removeClass('full');
	}else{
		$('body').addClass('show-sidebar');		
	}
})

// 右边栏 展开
$('.sidebar-tap').on('click',function(){
	if ($('body').hasClass('show-right-sidebar')) {
		$('body').removeClass('show-right-sidebar');
		$(this).find('.fa').addClass('fa-spin');
	}else{
		$('body').addClass('show-right-sidebar');
		$(this).find('.fa').removeClass('fa-spin');	
	}
})

// 返回顶部
$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 80) {
            $('.go-top').fadeIn();
        }
        else {
            $('.go-top').fadeOut();
        }
    });
});
$('.go-top').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 500);
});

// 滚动数字

$.fn.countTo = function (options) {
	options = options || {};
	
	return $(this).each(function () {
		// set options for current element
		var settings = $.extend({}, $.fn.countTo.defaults, {
			from:            $(this).data('from'),
			to:              $(this).data('to'),
			speed:           $(this).data('speed'),
			refreshInterval: $(this).data('refresh-interval'),
			decimals:        $(this).data('decimals')
		}, options);
		
		// how many times to update the value, and how much to increment the value on each update
		var loops = Math.ceil(settings.speed / settings.refreshInterval),
			increment = (settings.to - settings.from) / loops;
		
		// references & variables that will change with each update
		var self = this,
			$self = $(this),
			loopCount = 0,
			value = settings.from,
			data = $self.data('countTo') || {};
		
		$self.data('countTo', data);
		
		// if an existing interval can be found, clear it first
		if (data.interval) {
			clearInterval(data.interval);
		}
		data.interval = setInterval(updateTimer, settings.refreshInterval);
		
		// initialize the element with the starting value
		render(value);
		
		function updateTimer() {
			value += increment;
			loopCount++;
			
			render(value);
			
			if (typeof(settings.onUpdate) == 'function') {
				settings.onUpdate.call(self, value);
			}
			
			if (loopCount >= loops) {
				// remove the interval
				$self.removeData('countTo');
				clearInterval(data.interval);
				value = settings.to;
				
				if (typeof(settings.onComplete) == 'function') {
					settings.onComplete.call(self, value);
				}
			}
		}
		
		function render(value) {
			var formattedValue = settings.formatter.call(self, value, settings);
			$self.html(formattedValue);
		}
	});
};
$.fn.countTo.defaults = {
	from: 0,               // the number the element should start at
	to: 0,                 // the number the element should end at
	speed: 1000,           // how long it should take to count between the target numbers
	refreshInterval: 100,  // how often the element should be updated
	decimals: 0,           // the number of decimal places to show
	formatter: formatter,  // handler for formatting the value before rendering
	onUpdate: null,        // callback method for every time the element is updated
	onComplete: null       // callback method for when the element finishes updating
};
function formatter(value, settings) {
	return value.toFixed(settings.decimals);
}
// custom formatting example
$('.value').data('countToOptions', {
formatter: function (value, options) {
  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
}
});
// start all the timers
$('.value').each(count); 
function count(options) {
var $this = $(this);
options = $.extend({}, options || {}, $this.data('countToOptions') || {});
$this.countTo(options);
}

