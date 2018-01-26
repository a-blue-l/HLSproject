$(function(){
	//配置fullpage
	$('#fullpageId').fullpage({
		//Navigation
		menu: '#menu',
		lockAnchors: false,//是否锚点起作用
		anchors:['firstPage', 'secondPage', 'threePage'],//锚点
		navigation: false,//导航点是否显示
		navigationPosition: 'right',//导航点位置
		navigationTooltips: ['firstSlide', 'secondSlide', 'threeSlide'],
		showActiveTooltip: true,

		//Scrolling
		css3: true,
		scrollingSpeed: 300,
		scrollBar: false,//是否使用滚动条
		easing: 'easeInOutCubic',
		easingcss3: 'ease',
		loopBottom: false,//循环滚动  最后一个滑动是否跳动到第一个
		loopTop: false,//循环滚动  第一个滑动是否跳动到最后一个
		dragAndMove: false,
		normalScrollElements: '',//可以避免自动滚动，，如果页面中有滑动内容
		touchSensitivity: 15,//屏幕触控灵敏度

		//Accessibility
		animateAnchor: true,//链接到指定页面
		recordHistory: false,//是否将滚动加入到浏览器history   手机返回键设置

		//Design
		controlArrows: true,
		verticalCentered: true,
		fixedElements: '#header, .footer',

		//Custom selectors
		sectionSelector: '.section',
		slideSelector: '.slide',

		lazyLoading: true,//懒加载
	});

	// 切换部分
	$('.carNav li').click(function(){
		var thisNum = $(this).index();
		$('.carNav li').removeClass('active');
		$(this).addClass('active');
		ulContain(thisNum);
	})
	// 控制下方部分的显示
	var ulContain = function (num) {
		$('.containCon').removeClass('active');
		$('.containCon').eq(num).addClass('active');
	}

	// 清除loading
	$(window).load(function(){
		var loadNo = setTimeout(function(){
			$('#loading').hide();
			clearTimeout(loadNo);
		},500)
	})
})