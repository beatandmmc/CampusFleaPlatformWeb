  changeRootFont();
 function changeRootFont() {
         document.documentElement.style.fontSize = ((window.innerWidth / 750) * 100) + 'px';
          } 
         window.addEventListener('resize', changeRootFont, false);
var b=true;
new Vue({
	el:"#vue-user",
	data:{
		
	},
	methods:{
		//手机号失去焦点的时候
			onBlur:function(){
			      	var str=$("#username").val();
			      	var re=/^[1][3,4,5,7,8][0-9]{9}$/;
	      	if(!re.test(str)){
	      		  $("#prompt").css("display","block");
	            b=false;
	      	}else{
		      		$("#prompt").css("display","none");
		      		b = true;
	      	}
      },
      //点击注册时跳转页面
      zhuce:function(){
      	window.location.href="zhuce.html";
      }
  }
})
    
var timer = null;
var number = 60;
var bOnOff = true;
var sId = "";
$("#id").click(function(){
	  if(b==true&&$("#username").val().length!=0){
	  	    $.ajax({
			  	type:"get",
			  	url:"http://localhost:8080/codeController/selectUser",
			  	dataType:"jsonp",
			  	jsonp:"jsonpCallback",
			  	data:{"userPhone":$("#username").val()},
			  	success:function(data){
			  		if(data.err==0){
			  			alert("该用户未注册");
			  		}else{
			  			sId = data.sessionId;
			  			$.cookie("userIdx",data.userId);
			  			$.cookie("groupId",data.groupId);
			  			$.cookie("userstatus",data.keykey);
			  			$.cookie("userPhoto",data.userImage);
			  		  	if(bOnOff){
		  	          bOnOff = false;
						      timer = setInterval(function(){
							    if(number>0){
								   		number--;
								   		$("#id").val(number+" s");
								    	$("#id").attr("disabled","disabled");
							    }else{
								   		clearInterval(timer);
								   		$("#id").val("获取验证码");
								   		$("#id").attr("disabled",false);
								   		number = 60;
								   		bOnOff = !bOnOff;
							    }
					        },1000);
			        }
			  	  }
			  	},
			  	error:function(){
			  		alert("请求失败");
			  	}
			  });
		}else{
	  	alert("请填写正确的手机号");
	  }
}); 

 $("#sub").click(function(){
      	if($("#username").val().length==0||$("#code").val().length==0){
			      	    	alert("手机号/密码不能为空");
			  }else if(b==false){
			      	   	  ;
			  }else{
      	    	$.ajax({
							      		type:"get",
							      		url:"http://localhost:8080/codeController/checkCode",
							      		dataType:"jsonp",
			  	              jsonp:"jsonpCallback",
							      		data:{"number":$("#code").val(),"sessionId":sId},
							      		success:function(data1){
							      			if(data1.suc==1){
							      				window.location.href="message.html";
							      			}else{
							      				alert("验证码不匹配")
							      			}
							      		},
							      		error:function(){
							      			alert("请求失败");
							      		}
			      	      });
			      	  }
      })
$("#username").focus(function(){
	$("#prompt").css("display","none")
	b=true;
});
/*$("#btn-number").click(function(){
	window.location.href="denglu.html";
});*/