$(function(){
		
		
	function erMsg(msg){
		return "<div class='prompt-message'>"+msg+"</div>"
	}
	
	//验证部分
function validForm(){
	//验证
return $("#form1").validate({
		onfocusout:function(element){$(element).valid();},
		rules:{
			'UserName':{required:true},
			'UserPsw':{required:true,maxlength:20,minlength:6},
			'VerifyCode':{ required: true, digits: true,maxlength:6, minlength: 6,equalTo:"#send-sms" }
		},

		messages:{
			'UserName':{
				required:erMsg("用户名不能为空"),
			},
			'UserPsw':{
				required:erMsg("请输入新密码"),
				maxlength:erMsg("密码长度6~20"),
				minlength:erMsg("密码长度6~20")
			},
			'VerifyCode':{
				required:erMsg("验证码不能为空"),
				digist:erMsg("验证码只包含数字"),
				maxlength:erMsg("验证码为6位"),
				minlength:erMsg("验证码为6位"),
				equalTo:erMsg("请输入正确的验证码")
			}
		}
	
	});

};	



	
	//验证码
	$("#send-sms").click(function(){
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
		$("#send-sms").val(num);
		$("#send-sms").css("font-family","georgia");
		$("#send-sms").css("font-size","26px");
	});	
	
	
	
	
	//注册表单验证
	$(validForm());
		
	
	//登录
	
	var db = openDatabase('reglogin','1.0','textdb','1024*1024');
	db.transaction(function(tx){
	//	tx.executeSql('drop table userinf');
		tx.executeSql('create table if not exists userinf(id integer primary key AutoIncrement,name,password)');
	});
	var blogin = true;
	
	$(".btn-submit").click(function (){
		console.log(validForm().form());
		if(validForm().form() && $("#VerifyCode").val()==$("#send-sms").val()){
			
			if($("#UserName").val()&&$("#UserPsw").val()){
				db.transaction(function(tx){
					tx.executeSql('select * from userinf' ,[],function(con,data){
						var leg = data.rows.length,i;
						for(var i=0;i<leg;i++){
							if($("#UserName").val()==data.rows.item(i).name&&$("#UserPsw").val()==data.rows.item(i).password){
								window.localStorage.setItem('users',data.rows.item(i).name);
								blogin = false;
								break;
							}
						}
						if(blogin){
							alert('请输入正确的账号和密码！');
						}else{
							alert('登录成功！');
							
							window.location.href="index.html";
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