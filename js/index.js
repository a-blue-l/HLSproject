$(function(){

	//获取该用户是否报名过
	// $.post('',{},function(date){
	// 	if () {
	// 		// 已经报名
	// 		$('.participation').text('查看详情').attr('href','premeeting.html');
	// 	}
	// },json) 

	var dpr = Number($('html').attr('data-dpr'));

	var index_Anim;
	//配置fullpage
	$('#fullpageId').fullpage({
		//Navigation
		menu: '#menu',
		lockAnchors: false,//是否锚点起作用
		anchors:['firstPage', 'secondPage'],//锚点
		navigation: false,//导航点是否显示
		navigationPosition: 'right',//导航点位置
		navigationTooltips: ['firstSlide', 'secondSlide'],
		showActiveTooltip: true,

		//Scrolling
		css3: true,
		scrollingSpeed: 300,
		scrollBar: false,//是否使用滚动条
		easing: 'easeInOutCubic',
		easingcss3: 'linear',
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

		//events
		onLeave: function(index, nextIndex, direction){
			//console.log(index);//从该页码进入当前页
			//console.log(nextIndex);//当前页数字标识
			// console.log(direction);//通过什么方式进入，上/下
			switch (index) {
				case 2:
					index_Anim = setTimeout(function(){
						stroke.loop();
						$('#canvas').show();
					},500)
					break;
			}
		},
		afterLoad: function(anchorLink, index){
			//console.log(anchorLink);//当前页锚点
			//console.log(index);//当前页数字标识
			switch (index) {
				case 2:
					$('#canvas').hide();
					clearTimeout(index_Anim);
					window.cancelAnimationFrame(thisSetIn)
					break;
			}
		},
		afterRender: function(){},//页面结构生成后触发的,初始化其他插件等
		afterResize: function(){},//浏览器窗口大小后触发
	});

	// 钱币飘落
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();
	var thisSetIn;
	var bodyW = $('.square-box').width();
	var bodyH = $('.square-box').height();
	var canvas = document.getElementById('canvas');
	canvas.width = bodyW;
	canvas.height = bodyH-4;
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.src="images/base/moneyIcon.png";
	// 初始函数	
	var stroke = {
		jump:function(){
			ctx.clearRect(0,0,bodyW,bodyH)
			down();
		},
		loop:function(){
			stroke.jump();
			thisSetIn = requestAnimationFrame(stroke.loop);
		}
	}

	stroke.loop();

	function rectobj(x,y,slide,size){
		this.x = x || 400;
		this.y = y || 400;
		this.slide = slide*(dpr/3);
		this.false = true;
		this.size = size;
	}
	rectobj.prototype.goto = function(){
		this.y += this.slide;
		if(this.y > bodyH){
			this.x = bodyW*Math.random();
			this.y = -bodyH/3*Math.random();
			this.slide = (Math.random()*5+1)*(dpr/3);
			this.false = true;
		}
	}
	// 掉落函数
	function down(){
		for(var i in objarr){
			if(objarr[i].false == true){
				objarr[i].false = false;
			}else{
				objarr[i].goto();
				ctx.beginPath();
				ctx.drawImage(img,objarr[i].x, objarr[i].y, objarr[i].size, objarr[i].size)
				ctx.stroke();
			}
		}
	}
	var objarr = [];
	for(var i = 0; i < 20; i ++){
		var xMath = bodyW*Math.random();
		var yMath = -bodyW/3*Math.random();
		objarr.push(new rectobj(xMath,yMath,Math.random()*5+1,(Math.random()*10+8)*dpr))
	}

	// 年会栏目按下事件
	$('.anniualList li').on({
		touchstart: function(){
			$(this).find('a').removeClass('colordisk').css({color:'#c1272d'});
		},
		touchend: function(){
			$(this).find('a').css({color:'#fff'}).addClass('colordisk');
		}
	})
	// 清除loading
	$(window).load(function(){
		var loadNo = setTimeout(function(){
			$('#loading').hide();
			clearTimeout(loadNo);
		},500)
	})
})