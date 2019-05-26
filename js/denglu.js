changeRootFont();

function changeRootFont() {
	document.documentElement.style.fontSize = ((window.innerWidth / 750) * 100) + 'px';
}
window.addEventListener('resize', changeRootFont, false)
var b = true;

var timer = null;
var number = 60;
var bOnOff = true;
var sId = "";
new Vue({
		el: "#vue-user",
		data: {

		},
		methods: {
			onBlur: function() {
				var str = $("#username").val();
				var re = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!re.test(str)) {
					$("#prompt").css("display", "block");
					b = false;
					return false;
				} else {
					$("#prompt").css("display", "none");
					b = true;
				}
			},
			change: function() {
				if($('#btn-number').hasClass('psw_now')) {
					$('.download_psw').hide();
					$('.download_code').show();
					$('#btn-number').val('密码登录');
					$('#btn-number').removeClass('psw_now').addClass('code_now');
				} else {
					$('.download_psw').show();
					$('.download_code').hide();
					$('#btn-number').val('验证码登录');
					$('#btn-number').removeClass('code_now').addClass('psw_now');

				}
			},
			getid: function() {
				if(b == true && $("#username").val().length != 0) {
					$.ajax({
						type: "get",
						url: "http://localhost:8080/user/getTelCode",
						dataType: "jsonp",
						jsonp: "callback",
						data: {
							"userPhone": $("#username").val()
						},
						success: function(data) {
							if(data.status == "none") {
								alert("该用户未注册");
							} else {
								sId = data.sessionId;
								if(bOnOff) {
									bOnOff = false;
									timer = setInterval(function() {
										if(number > 0) {
											number--;
											$("#id").val(number + " s");
											$("#id").attr("disabled", "disabled");
										} else {
											clearInterval(timer);
											$("#id").val("获取验证码");
											$("#id").attr("disabled", false);
											number = 60;
											bOnOff = !bOnOff;
										}
									}, 1000);
								}

							}
						},
						error: function() {
							alert("请求失败");
						}
					});
				} else {
					alert("请填写正确的手机号");
				}

			},
			submit: function() {
				if($('#btn-number').val() == "验证码登录") {
					if($("#username").val().length == 0 || $("#password").val().length == 0) {
						alert("手机号/密码不能为空");
					} else if(b == false) {;
					} else {
						$.ajax({
							type: "get",
							url: "http://localhost:8080/user/dologin",
							dataType: "jsonp",
							jsonp: "callback",
							data: {
								"username": $("#username").val().toString(),
								"password": $("#password").val().toString()
							},
							success: function(data) {
								$.cookie("sessionId",data.sessionId);
								console.log(data);
								if(data.code == "true") {
									window.location.href = "homepage.html";
								} else {
									alert("密码和账号不匹配")
								}
							},
							error: function() {
								alert("请求失败");
							}
						});
					}
				} else if($('#btn-number').val() == "密码登录") {
					if($("#username").val().length == 0 || $("#code").val().length == 0) {
						alert("手机号/密码不能为空");
					} else if(b == false) {;
					} else {
						$.ajax({
							type: "get",
							url: "http://localhost:8080/user/plogin",
							dataType: "jsonp",
							jsonp: "callback",
							data: {
								"phone": $("#username").val(),
								"code": $("#code").val(),
								"sessionId": sId
							},
							success: function(data1) {
								$.cookie("sessionId",data1.sessionId);
								if(data1.code == "true") {
									window.location.href = "homepage.html";
								} else {
									alert("验证码不匹配")
								}
							},
							error: function() {
								alert("请求失败");
							}
						});
					}
				}
			}
		}

	}

);

$("#username").focus(function() {
	$("#prompt").css("display", "none");
	b = true;
});
$("#btn-register").click(function() {
	window.location.href = "zhuce.html";
});