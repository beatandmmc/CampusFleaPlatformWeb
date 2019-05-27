changeRootFont();
function changeRootFont(){
	document.documentElement.style.fontSize=((window.innerWidth/750)*100)+"px"
}
window.addEventListener("resize",changeRootFont,false);

$("#back").click(function(){
		window.location.href="wode.html";
})
//个人信息ajax
$(document).ready(function(){
	$.ajax({
		type:"get",
		data:{"userId":$.cookie("userIdx")},
		url:"http://localhost:8080/centerController/getAdminInfo",
		dataType:"jsonp",
		jsonp:"jsonpCallback",
		async:true,
		success:function(json){
			var data=json.user;
			console.log(data);
				$("#userImg").attr('src',data.userImage);
				$("#name span").html(data.adminitorName);
				$("#sex span").html(data.adminSex);
				$("#age span").html(data.adminBirthday);
				$("#qq span").html("暂无");
				$("#emile span").html("暂无");
				$("#tel span").html(data.adminitorPhone);
				$("#userClass span").html(data.classId);
		},
		error:function(){
			alert("error");
		},
	});
})
