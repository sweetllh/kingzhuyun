
$(function(){
	
	//头部导航
	
	$(".header .mobileMenuBtn").click(function(){
		$(".header .mobileMenuBtn").toggleClass("active");
		$(".header .header_menu").toggleClass("active");
		$(".header .mobileMenuBtn_shad").toggleClass("active");
	});
	
	$(".header .mobileMenuBtn_shad").click(function(){
		$(".header .mobileMenuBtn").toggleClass("active");
		$(".header .header_menu").toggleClass("active");
		$(".header .mobileMenuBtn_shad").toggleClass("active");
	});
	
	
	//侧边栏咨询盒子
	$(".aside .consulting").click(function(){
		$(".aside .consulting").addClass("active");
		$(".consulting-box").css("right","40px");
	});
	
	$(".consulting-box .close").click(function(){
		$(".aside .consulting").removeClass("active");
		$(".consulting-box").css("right","-250px");
	});
	
	
	//	侧边栏的出现和隐藏
	$("#close").click(function(){
		
		$("#show").animate({
			width:"40px"
		},100);
		
		$(".aside,#toTop,#close").animate({
			width:0
		},100);
	});
	
	$("#show").click(function(){
		
		$("#show").animate({
			width:0
		},100);
		
		$(".aside,#toTop,#close").animate({
			width:"40px"
		},100);
	})
	
	
	
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
	
	
})
