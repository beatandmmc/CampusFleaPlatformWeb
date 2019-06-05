changeRootFont();
 function changeRootFont() {
         document.documentElement.style.fontSize = ((window.innerWidth / 750) * 100) + 'px';
          } 
         window.addEventListener('resize', changeRootFont, false)
//验证手机号是否合规         
var b=true;
var m= true;
//手机号未注册
var bm=true;
//邮箱
var by=true;
new Vue({
	el:"#vue-form",
	data:{
	},
	methods:{
		QQ:function(){
			var str =$("#QQ").val().toString();
			var re1=/^[1-9][0-9]{4,14}/;
			if(!re1.test(str)||$("#QQ").val().length==0){
					      		$(".QQ").css("display","block");
					      		b=false;
					      		return false;
					      	}else{
				      		    $(".QQ").css("display","none");
				      		    b=true;
					      	}
		},
//		email:function(){
//			var str =$("#E-mail").val();
////			var re2 = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
//			var re2 = /^[a-zA-Z0-9]{10}$/;
//			if(!re2.test(str)||$("#E-mail").val().length==0){
//					      		$(".email").css("display","block");
//					      		b=false;
//					      		return false;
//					      	}else{
//				      		    $(".email").css("display","none");
////				      		    $.ajax({
////				      		    	type:"get",
////				      		    	url:"http://localhost:8080/checkEmailController/checkEmail",
////				      		    	dataType:"jsonp",
////			  	                    jsonp:"jsonpCallback",
////				      		    	data:{"userEmail":$("#E-mail").val()},
////				      		    	success:function(data){
////                                      if(data.suc==0){
////				      		    			by=true;
////				      		    		}else{
////				      		    			alert("该邮箱已经被注册过");
////				      		    			by=false;
////					      		        }
////				      		    	},
////				      		    	error:function(){
////				      		    		alert("邮箱请求失败")
////				      		    	}
////				      		    });
//					      	}
//		},
		phone:function(){
			 var str=$("#phone").val();
		     var re3=/^[1][3,4,5,7,8][0-9]{9}$/;
			if(!re3.test(str)){
	      		$(".phone").css("display","block");
	      		b=false;
	      		m=false;
	      		return false;
			}else{
			    $(".phone").css("display","none");
			    b=true;
			    m=true;
			    $.ajax({
					type:"get",
					url:"http://localhost:8080/user/checkPhone",
					dataType:"jsonp",
			  	    jsonp:"callback",
					data:{"userPhone":$("#phone").val()},
					success:function(data1){
						if(data1.code=="no"){
						  bm=true;	
						  alert("手机号校验成功")
						}else{
						  alert("该手机号已经被注册");
						  bm=false;
						}
					},
					error:function(){
						alert("手机号请求失败");
					}
				});
			}
		},
//		userClass:function(){
//			var str=$("#userClass").val();
//		    var re4=/^[+]{0,1}(\d+)$/;
//			if(!re4.test(str)||$("#userClass").val().length==0){
//					      		$(".userClass").css("display","block");
//					      		b=false;
//					      		return false;
//					      	}else{
//				      		    $(".userClass").css("display","none");
//				      		    b=true;
//					      	}
//		},
		pwd:function(){
			var str=$("#pwd").val();
			var re5=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,16}$/;
			if(!re5.test(str)||$("#pwd").val().length==0){
					      		$(".pwd").css("display","block");
					      		b=false;
					      		return false;
					      	}else{
				      		    $(".pwd").css("display","none");
				      		    b=true;
					      	}
		},
		getid: function() {
			if(b == true && $("#phone").val().length != 0 &&m==true&&bm==true){
				$.ajax({
					type: "get",
					url: "http://localhost:8080/user/getTelCode",
					dataType: "jsonp",
					jsonp: "callback",
					data: {
						"userPhone": $("#phone").val()
					},
					success: function(data) {
						//不存在
						if(data.msg == "fail") {
							alert("获取验证码失败了");
						} else {
							sId = data.sessionId;
							if(bOnOff) {
								bOnOff = false;
								timer = setInterval(function() {
									if(number > 0) {
										number--;
										$("#code").val(number + " s");
										$("#code").attr("disabled", "disabled");
									} else {
										clearInterval(timer);
										$("#code").val("获取验证码");
										$("#code").attr("disabled", false);
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
		psd:function(){
			if($("#pwd").val()===$("#psd").val()&&$("#psd").val().length!=0){
				$(".psd").css("display","none");
				b=true;
			}else{
				$(".psd").css("display","block");
				b=false;
			}
		},
		
	}
})
$("#QQ").focus(function(){
	$(".QQ").css("display","none");
	b=true;
});
$("#E-mail").focus(function(){
	$(".email").css("display","none");
	b=true;
});
$("#phone").focus(function(){
	$(".phone").css("display","none");
	b=true;
});
$("#pwd").focus(function(){
	$(".pwd").css("display","none");
	b=true;
});
$("#psd").focus(function(){
	$(".psd").css("display","none");
	b=true;
});
var timer = null;
var number = 60;
var bOnOff = true;
var sId="";
//$("#code").click(function(){
//	console.log(m,bm);
//	  if(m==true&&$("#phone").val()!=""&&bm==true){
//	  	$.ajax({
//	  	type:"get",
//	  	url:"http://localhost:8080/getCodeController/getCode",
//	  	dataType:"jsonp",
//		jsonp:"jsonpCallback",
//	  	data:{"userPhone":$("#phone").val()},
//	  	success:function(data1){
//						if(data1.err=="0"){
//							alert("该手机号已经被注册");
//						}else{
//							sId =data1.sessionId;
//							if(bOnOff){
//		  	                       bOnOff = false;
//						  timer = setInterval(function(){
//							  if(number>0){
//								   number--;
//								   $("#code").val(number+" s");
//								    $("#code").attr("disabled","disabled");
//							  }else{
//								   clearInterval(timer);
//								   $("#code").val("获取验证码");
//								   $("#code").attr("disabled",false);
//								   number = 60;
//								   bOnOff = !bOnOff;
//							  }
//					    },1000);
//			     }
//						}
//			    },
//	  	error:function(){
//	  		alert("验证码请求失败")
//	  	}
//	  });
//
//	  }
//	  else{
//	  	alert("请填写正确的手机号");
//	  }
//
//});
$("#sub").click(function(){
	var sex="";
   if($("#x1").is(":checked")==true){
	  sex=$("#x1").val();	
   }else if($("#x2").is(":checked")==true){
	  sex=$("#x2").val();
   }
//  alert(b,by,$("#check").is(":checked"),$("#x1").is(":checked"),$("#x2").is(":checked"));
	if(b==true&&$("#check").is(":checked")==true&&(($("#x1").is(":checked")==true||$("#x2").is(":checked")==true)&&by==true)){
	  //var speciality =$("#province").val()+"-"+$("#city").val();
	  $.ajax({
	    	type:"get",
	    	url:"http://localhost:8080/user/register",
	    	dataType:"jsonp",
			jsonp:"callback",
	data:{"username":$("#name").val(),"sessionId":sId,"sex":sex,"qq":$("#QQ").val(), "phone":$("#phone").val(),"password":$("#pwd").val(),"code":$("#number").val()},
	    	success:function(data1){
	    		if(data1.code=="true"){
	    			window.location.href="denglu.html";
	    		}else{
	    			alert("验证码错误");
	    		}
	    	},
	    	error:function(){
	    		alert("表单请求失败");
	    	}
	    });
	}
	else{
		alert("表单提交失败");
	}
})

  var list1 = new Array;
    var list2 = new Array;
    list1[list1.length] = "哲学";
    list1[list1.length] = "经济学";
    list1[list1.length] = "法学";
    list1[list1.length] = "教育学";
    list1[list1.length] = "文学";
    list1[list1.length] = "历史学";
    list1[list1.length] = "理学";
    list1[list1.length] = "工学";
    list1[list1.length] = "农学";
    list1[list1.length] = "医学";
    list1[list1.length] = "军事学";
    list1[list1.length] = "管理学";
    list1[list1.length] = "艺术学";
    list1[list1.length] = "其它";

    list2[list2.length] = new Array("哲学","逻辑学","宗教学");
    list2[list2.length] = new Array("经济学", "经济统计学", "财政学", "税收学","金融学", "金融工程", "保险学", "投资学","国际经济与贸易", "贸易经济");
    list2[list2.length] = new Array("法学", "政治学与行政学", "国际政治", "外交学", "社会学", "社会工作", "民族学","科学社会主义", "中国共产党历史", "思想政治教育", "治安学","侦查学","边防管理");
    list2[list2.length] = new Array("教育学", "科学教育", "人文教育", "教育技术学", "艺术教育", "学前教育", "小学教育", "特殊教育", "体育教育", "运动训练","社会体育指导与管理", "武术与民族传统体育", "运动人体科学");
    list2[list2.length] = new Array("汉语言文学", "汉语言", "汉语国际教育", "中国少数民族语言文学","古典文献学", "英语", "俄语", "德语","法语");
    list2[list2.length] = new Array("历史学", "世界史", "考古学", "文物与博物馆学");
    list2[list2.length] = new Array("数学与应用数学", "信息与计算科学", "物理学", "应用物理学", "核物理", "化学", "应用化学", 
    "天文学", "地理科学", "自然地理与资源环境", "人文地理与城乡规划", "地理信息科学", "大气科学", "应用气象学", "海洋科学", "海洋技术", "地球物理学类", 
    "空间科学与技术", "地质学", "地球化学", "生物科学", "生物技术", "生物信息学", "生态学", "心理学", "应用心理学", "统计学", "应用统计学");

    list2[list2.length] = new Array("理论与应用力学", "工程力学", "机械工程", "机械设计制造及其自动化", "材料成型及控制工程", "机械电子工程", "工业设计",
    "过程装备与控制工程", "车辆工程", "汽车服务工程", "测控技术与仪器", "材料科学与工程", "材料物理", "材料化学", "冶金工程", "金属材料工程", "无机非金属材料工程", 
    "高分子材料与工程", "复合材料与工程", "能源与动力工程", "电气工程及其自动化", "智能电网信息工程", "光源与照明", "电气工程与智能控制", "电子信息工程", "应用心理学", "电子科学与技术", 
    "通信工程", "微电子科学与工程", "光电信息科学与工程", "自动化", "计算机科学与技术", "软件工程", "网络工程", "信息安全", "物联网工程", "土木工程", 
    "测绘工程", "地质工程", "采矿工程", "石油工程", "纺织工程", "交通工程", "海洋工程类", "核工程类", "农业水利工程", "工程物理", 
    "环境工程", "环境科学与工程", "农业工程", "环境科学", "建筑学", "安全工程", "生物工程", "消防工程");

    list2[list2.length] = new Array("农学", "园艺", "植物保护", "植物科学与技术", "种子科学与工程", "设施农业科学与工程", "农业资源与环境",
    "野生动物与自然保护区管理", "水土保持与荒漠化防治", "动物科学", "动物药学", "林学", "园林", "森林保护", "水产养殖学", "水产养殖学", "海洋渔业科学与技术", 
    "草业科学");

    list2[list2.length] = new Array("基础医学", "临床医学", "口腔医学", "预防医学", "食品卫生与营养学", "中医学", "针灸推拿学",
    "中西医临床医学", "中药资源与开发", "医学检验技术", "医学影像技术", "眼视光学", "康复治疗学", "口腔医学技术", "卫生检验与检疫", "护理学");

    list2[list2.length] = new Array("军事思想及军事历史", "战略学", "战役学", "战术学", "军队指挥学", "军制学", "军队政治工作学", "军事后勤学与军事装备学");

    list2[list2.length] = new Array("管理科学", "信息管理与信息系统", "工程管理", "房地产开发与管理", "工程造价", "工商管理", "市场营销",
    "会计学", "财务管理", "人力资源管理", "审计学", "资产评估", "物业管理", "文化产业管理", "农林经济管理", "农村区域发展", "公共事业管理", 
    "行政管理", "劳动与社会保障", "土地资源管理", "城市管理", "图书馆学", "档案学", "信息资源管理","物流管理", "工业工程", "电子商务", "旅游管理", "酒店管理", "会展经济与管理");


    list2[list2.length] = new Array("艺术史论", "音乐表演", "音乐学", "作曲与作曲技术理论", "舞蹈表演", "舞蹈学", "舞蹈编导",
    "表演", "戏剧学", "电影学", "戏剧影视文学", "广播电视编导", "戏剧影视导演", "戏剧影视美术设计", "录音艺术", "录音艺术", "播音与主持艺术", 
    "动画", "美术学", "绘画", "雕塑", "摄影", "艺术设计学", "视觉传达设计", "环境设计", "产品设计", "服装与服饰设计", "公共艺术", "工艺美术", "数字媒体艺术");

    list2[list2.length] = new Array("其他");
 
//  var ddlProvince = document.getElementById("province");
//  var ddlCity = document.getElementById("city");
//  for(var i =0;i<list1.length; i++)
//  {
//      var option = document.createElement("option");
//      option.appendChild(document.createTextNode(list1[i]));
//      option.value = list1[i];
//      ddlProvince.appendChild(option);
//      //city initialize
//      var firstprovince = list2[0];
//      for (var j = 0; j < firstprovince.length; j++) {
//          var optioncity = document.createElement("option");
//          optioncity.appendChild(document.createTextNode(firstprovince[j]));
//          optioncity.value = firstprovince[j];
//          ddlCity.appendChild(optioncity);
//      }
//  }
//  function indexof(obj,value)
//  {
//      var k=0;
//      for(;k<obj.length;k++)
//      {
//          if(obj[k] == value)
//          return k;
//      }
//      return k;
//  }
//  function selectprovince(obj) {
//      ddlCity.options.length = 0;//clear
//      var index = indexof(list1,obj.value);
//      var list2element = list2[index];
//      for(var i =0;i<list2element.length; i++)
//      {
//          var option = document.createElement("option");
//          option.appendChild(document.createTextNode(list2element[i]));
//          option.value = list2element[i];
//          ddlCity.appendChild(option);
//      }
//  }
