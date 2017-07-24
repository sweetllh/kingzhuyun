$(function(){
		
	function erMsg(msg){
		return "<div class='prompt-message'>"+msg+"</div>"
	}
	
	//验证部分
function validForm(){
	//验证
return $("#form0").validate({
		onfocusout:function(element){$(element).valid();},
		rules:{
			'UserName':{required:true,mobilemail:true},
			'UserPsw':{required:true,maxlength:20,minlength:6},
			'ConfirmUserPsw':{required:true,equalTo:"#UserPsw"},
			'VerifyCode':{ required: true, digits: true,maxlength:6, minlength: 6,equalTo:"#send-sms" },
			'checkbox':{required:true}
		},

		messages:{
			'UserName':{
				required:erMsg("请输入手机号或邮箱"),
				mobilemail:erMsg("请输入正确的手机号或者邮箱")
			},
			'UserPsw':{
				required:erMsg("请输入新密码"),
				maxlength:erMsg("密码长度6~20"),
				minlength:erMsg("密码长度6~20")
			},
			'ConfirmUserPsw':{
				required:erMsg("请输入确认密码"),
				equalTo:erMsg("两次密码不一致")
			},
			'VerifyCode':{
				required:erMsg("验证码不能为空"),
				digits:erMsg("验证码只包含数字"),
				maxlength:erMsg("验证码为6位"),
				minlength:erMsg("验证码为6位"),
				equalTo:erMsg("请输入正确的验证码")
			}
		}
	
	});

};	

var mobileReg = /^1\d{10}$/;
	var emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	
	//验证码
	$("#send-sms").click(function(){
		var userName = $("#UserName").val();
		var num = Math.round(Math.random()*999999);
		if(num<100000){
			return "0" + num;
			if(num<10000){
				return "0" + num;
				if(num<1000){
					return "0" + num;
						if(num<100){
							return "0" + num;
							if(num<10){
								return "0" + num;
							}
						}
				}
			}
		}
		if(emailReg.test(userName)){
			$("#send-sms").val(num);
			$("#send-sms").css("font-family","georgia");
			$("#send-sms").css("font-size","26px");
			return;
		}
		if(userName.length==11 && mobileReg.test(userName)){
			$("#send-sms").val(num);
			$("#send-sms").css("font-family","georgia");
			$("#send-sms").css("font-size","26px");
			return;
		}
		alert("请输入手机号或者邮箱");
		return;
	})
	
	//条款验证
//	function chkform(){
//		if(!document.getElementsByName("checkbox")[0].checked){
//      	alert("请阅读条款并同意我们的条款才可以继续申请");
//			return false;
//		}
//	}
	
//	$(".btn-submit").click(function(){
//      return chkform();
//	});


	
	//注册表单验证
	$(validForm());
		
	
	
	var db = openDatabase('reglogin','1.0','textdb','1024*1024');
	db.transaction(function(tx){
//		tx.executeSql('drop table userinf');
		tx.executeSql('create table if not exists userinf(id integer primary key AutoIncrement,name,password)');
	});
	
	
	$(".btn-submit").click(function (){
		console.log(validForm().form());
		if(validForm().form() && $("#VerifyCode").val()==$("#send-sms").val()){
			if($("#UserName").val()&&$("#UserPsw").val()){
				db.transaction(function(tx){
					tx.executeSql('select * from userinf where name="'+$("#UserName").val()+'"',[],function(con,data){
						var leg = data.rows.length;
						if(leg>0){
							alert('该用户已被注册');
							window.location.href="login.html";
						}
						else{
							var sql='insert into userinf(name,password) values("' + $("#UserName").val() + '","' + $("#UserPsw").val() + '")'
						//	tx.executeSql('insert into userinf(id,name,password) values("' + $("#UserName").val() + '","' + $("#UserPsw").val() + '")');
							tx.executeSql(sql);
							alert('注册成功');
							window.location.href="login.html";
						}
					});

				});
			}else{
				alert('请填写完整的账号密码！');
			}
			 
		}
		else{
			
		}
	});
	
	
	
	
	
});





//$.ajax({
//				type:"post",
//				url:"guestBook/guestbook/index.php",
//				async:true,
//				data:{
//					'm':'index',
//					'a':'reg',
//					'username':$('#UserName').val(),
//					'password':$('#UserPsw').val()
//				},
//				success:function(str){
//					var arr = JSON.parse(str);
//					alert(arr.message);
//					$('.opr').hide();
//					$('.regsuccess').show();
//				},
//				error:function(){
//					alert('ajax请求失败！');
//				}
//			});