$(function(){

//搜索框
//http://list.mogujie.com/module/mget?code=tips&keyWord=%E9%AB%98%E8%85%B0%E7%BA%AF%E8%89%B2%E7%9F%AD%E8%A2%96t%E6%81%A4&callback=__GET_SEARCH_RESULT_1__&_=1498441997009




$("#search").keyup(function(){
	var oUl = $(".search-content");
	var html = "";
	$.ajax({
		type:"get",
		url:"http://list.mogujie.com/module/mget",
		async:true,
		dataType:"jsonp",
		jsonp:"callback",
		data:{'code':'tips','keyWord':$("#search").val()},
		success:function(str){
//			console.log(str.data.tips.data);
			var datas = str.data.tips.data;
			
			for(var i=0;i<datas.length;i++){
				html += '<li><a href="http://list.mogujie.com/s?q='+$("#search").val()+'">'+datas[i].tag+'</a></li>';
			}
			oUl.html(html) ;
			sd();
//			console.log(html);
		}
	});
	
});

//console.log($(".search-content li"))
function sd(){
	$(".search-content li").click(function(){
		$("#search").val($(".search-content li a").html());
		$(".search-content").hide();
	
	});
	
}




//	轮播图
	$('#main-slider').carousel({
	  interval: 3000
	})






//	博客博文瀑布流

//原理：1.把所有的li的高度值放到数组里面
//   2.第一行的top都为0
//	 3.计算高度值最小的值是哪个li
//	 4.把接下来的li放到那个li的下面
	var margin = 22;//这里设置间距
	var li=$(".met-index-news #news-grid li");//这里是区块名称
	var	li_W = li[0].offsetWidth;//取区块的实际宽度（包含间距，这里使用源生的offsetWidth函数，不适用jQuery的width()函数是因为它不能取得实际宽度，例如元素内有pandding就不行了）
	function liuxiaofan(){//定义成函数便于调用
		var h=[];//记录区块高度的数组
		var n = document.documentElement.offsetWidth/li_W|0;//窗口的宽度除以区块宽度就是一行能放几个区块
		for(var i = 0;i < li.length;i++) {//有多少个li就循环多少次
			li_H = li[i].offsetHeight;//获取每个li的高度
			if(i < n) {//n是一行最多的li，所以小于n就是第一行了
				h[i]=li_H;//把每个li放到数组里面
				li.eq(i).css("top",0);//第一行的Li的top值为0
				li.eq(i).css("left",i * li_W);//第i个li的左坐标就是i*li的宽度
				}
			else{
				min_H =Math.min.apply(null,h) ;//取得数组中的最小值，区块中高度值最小的那个
				minKey = getarraykey(h, min_H);//最小的值对应的指针
				h[minKey] += li_H+margin ;//加上新高度后更新高度值
				li.eq(i).css("top",min_H+margin);//先得到高度最小的Li，然后把接下来的li放到它的下面
				li.eq(i).css("left",minKey * li_W);	//第i个li的左坐标就是i*li的宽度
				
			}
			//$("h3").eq(i).text("编号："+i+"，高度："+li_H);//把区块的序号和它的高度值写入对应的区块H3标题里面			
		}
		$(".met-index-news #news-grid").height(h.max()+"px");
		
	}
	 Array.prototype.max=function(){
        var maxH = 0;
        for(var i=0;i<this.length;i++){
            maxH=Math.max(maxH,this[i]);
        }
        return maxH;
    }
	/* 使用for in运算返回数组中某一值的对应项数(比如算出最小的高度值是数组里面的第几个) */
	function getarraykey(s, v) {for(k in s) {if(s[k] == v) {return k;}}}
	/*这里一定要用onload，因为图片不加载完就不知道高度值*/
	window.onload = function() {liuxiaofan();};
	/*浏览器窗口改变时也运行函数*/
	window.onresize = function() {liuxiaofan();};
	
	
	
//	返回顶部
$("#toTop").click(function(){
		$("body").animate({
			scrollTop:0
		},500)
	});
	
	$(window).scroll(function(){
		if($(this).scrollTop() < 100){
			$("#toTop").css("bottom","-100px");
		}else{
			$("#toTop").css("bottom","60px");
			$("#toTop").css("z-index","10000");
		}
	});
	
	
	
});



//滚动监听	
(function($){
	var goTo = $(".met-index-body");
	var guide = $(".un-hr-bar-r .un-hr-nav");
	var guideLi = $(".un-hr-bar-r .un-hr-nav li a");
console.log(goTo);
console.log(guideLi);
	var index=0;
	var direct=0; 
	
	//设置宽高
	var resetFun = function(){ goTo.each(function(){  $(this).height( $(window).height() ) }); }
	resetFun();

	//屏幕滚动
	var goToFun = function(){ 
		direct=0; 
		if(index<0){ index=0; return }
		if(index>=guideLi.size()){ index=guideLi.size()-1; return }
		$("html,body").stop().animate({ scrollTop:$(window).height()*index },300,"swing",function(){direct=0; }); guideLi.removeClass("un-dot-a").eq(index).addClass("un-dot-a");  
	}
	
	guideLi.each(function(i){ $(this).click(function(){  index=guideLi.index( $(this) ); goToFun(); }) });

	$(window).resize(function(){ resetFun() });


	/* 滚轮事件 */ 
	var scrollFunc=function(e){ 
		e=e || window.event; 
		if(e.wheelDelta){ direct+= (-e.wheelDelta/120); }else if(e.detail){ direct+=e.detail/3 ; } 
		
		if( direct>=8 ){ goToFun( index++ ) }
		if( direct<=-8 ){ goToFun( index-- ) }
	} 
	if( document.addEventListener){ document.addEventListener('DOMMouseScroll',scrollFunc,false); }
	 window.onmousewheel=document.onmousewheel=scrollFunc; 

})(jQuery);


