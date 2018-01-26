$(function(){ 
	// 判断会前还是会中
	var isFrist = false;
	var isjoinSucc = false;//是否报名成功
	// 根据链接判断

	// 阻止滑动事件 利用fullpage
	$('.fullpageNo').fullpage({
		normalScrollElements: '.winlistPeople',//可以避免自动滚动，，如果页面中有滑动内容
	});
	
	$('#submit').click(function(){
		$('#loading.submitLoading').show();
		// 提交表单
		var name = $('#name').val();
		var number = $('#number').val();
		if (name.length == 0 || number.length == 0) {
			$('.errorText').html('提交信息不能为空<br/>请检查之后再提交哦');
			$('#loading.submitLoading').hide();
			$('.jumpblack').show();
			return false;
		}
		$.post('http://submit.cn',{'name': name, 'number': number},function(date){
			console.log(date)
			if (date.status === 1) {
				$('.iserror').hide();
				$('.issuccess').show();
				// if () {
				// 	// 会前
				// 	$('.errorText').html('恭喜您，报名成功！<br/>2月2日贺利氏与您不见不散br/>您可继续查看贺利氏年会的相关资讯br/>现场更有精彩大奖br/>不容错过');
				// } else {
				// 	// 会中
				// 	$('.errorText').html('恭喜您，报名成功！<br/>您可继续查看贺利氏年会的相关资讯br/>现场更有精彩大奖br/>不容错过');
				// }
				isjoinSucc = true;
			} else if(date.status === 2) {
				$('.iserror').show();
				$('.issuccess').hide();
				$('.errorText').html('抱歉，报名失败<br/>此次年会活动仅面向于贺利<br/>氏 HMTS、HCI、HMS、<br/>HNS 员工。');
			} else {
				$('.iserror').show();
				$('.issuccess').hide();
				$('.errorText').html('您输入的信息有误<br/>报名失败<br/>您可直接拨打以下电话进行咨询：<br/><a class="telHref" href="tel:(021) 3357 5651">(021) 3357 5651');
			}
			$('#loading.submitLoading').hide();
			$('.jumpblack').show();
		},'json')
	})
	// 设置时间函数
	var isFalg = [false, false, false, false, false, false, false, false]; //该轮是否抽完
	var dataSetIn;
	var urlArr = ['http://winner1.cn','http://winner2.cn','http://winner3.cn'];
	var urlCan = urlArr[0];
	var thisDot = 0;
	var dataSou = function(){
		// 轮循获取数据
		$.post(urlCan,{},function(date){
			if (date.status === '1') {
				$('.winlistPeople').eq(thisDot).find('div').append(date.peopleList);
			}
		},'json')
		scroll(thisDot);
	}
	// 获取中奖名单
	$('.winnerListNav li').click(function(){
		var thisNum = $(this).index();
		thisDot = thisNum;
		urlCan = urlArr[thisNum];
		if ($(this).hasClass('noClick')) {
			$('.winlistPeople').eq(thisDot).find('div').text('抱歉，该活动尚未开始')
		} else {
			dataSetIn = setInterval(dataSou, 3000);
			scroll(thisNum);
		}
		$('.jumpblack .winnerError').removeClass('active');
		$('.jumpblack .winnerError').eq(thisNum).addClass('active');
		$('.jumpblack').show();
	})

	// 执行滑动效果
	var scroll = function(number){
		var myScroll;
		switch (number) {
			case 0:
				myScroll = new IScroll('#people1');
				break;
			case 1:
				myScroll = new IScroll('#people2');
				break;
			case 2:
				myScroll = new IScroll('#people3');
				break;
			case 3:
				myScroll = new IScroll('#people4');
				break;
			case 4:
				myScroll = new IScroll('#people5');
				break;
			case 5:
				myScroll = new IScroll('#people6');
				break;
			case 6:
				myScroll = new IScroll('#people7');
				break;
			case 7:
				myScroll = new IScroll('#people8');
				break;
			case 8:
				myScroll.destroy();
				myScroll = null;
				break;
			default: 
				throw 'no arguments';
				break;
		}
		
	}
	$('.jumpblack').on('touchstart',function(){
		if (isjoinSucc) {
			window.location.href = 'premeeting.html';
		}
	})
	// 关闭弹框
	$('.closeError').click(function(){
		if (isjoinSucc) {
			window.location.href = 'premeeting.html';
		} else {
			$('.jumpblack').hide();
			if (dataSetIn) {
				clearInterval(dataSetIn);
			}
		}
	})
})