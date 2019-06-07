var imgURLs;
$(document).ready(function() {
	//发起请求获取商品详情信息
	var str = window.location.href;
	var itemId = str.split("?itemId=")[1];
//	alert(itemId);
	
	getItemDetail(itemId);	
	

	$(function() {

		$('.tabs a').click(function() {

			var $this = $(this);
			$('.panel').hide();
			$('.tabs a.active').removeClass('active');
			$this.addClass('active').blur();
			var panel = $this.attr("href");
			$(panel).show();
			return false;
		}) //end click

		$(".tabs li:first a").click() //web 浏览器，单击第一个标签吧

	}) //end ready

	$(".centerbox li").click(function() {
		$("li").removeClass("now");
		$(this).addClass("now")

	});
	getUserName();
});

function getItemDetail(itemId){
	$.ajax({
    	//url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
    	url :'http://192.168.43.213:8080/goods/itemDetail',
        type: 'GET',
        async:true,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 5000,
        data: {
             "itemId" : itemId
        },
        success: function(data) {
            console.log(data.data);
            var info = data.data;
            $('.imgname').html(info.name);
            $('.describle').html(info.describle);
            $('.realPrice').html(info.realPrice);
            $('.newPrice').html(info.price);
            $('.centerbox').attr('item-id',itemId);
            $("#addCart").html(itemId);
            imgURLs = data.data.imgUrl;
            var arr = data.data.imgUrl.split(";");
            for (var i = 0; i < arr.length-1; i++) {
				//alert(arr[i]);
				var imgHTML=document.createElement('img');
				imgHTML.src = arr[i];
				imgHTML.width = 400;
				imgHTML.height = 500;
				$("#showbox").append(imgHTML); 	
				
			}
            var showproduct = {
				"boxid": "showbox",
				"sumid": "showsum",
				"boxw": 400,
				"boxh": 500,
				"sumw": 60, //列表每个宽度,该版本中请把宽高填写成一样
				"sumh": 60, //列表每个高度,该版本中请把宽高填写成一样
				"sumi": 7, //列表间隔
				"sums": 5, //列表显示个数
				"sumsel": "sel",
				"sumborder": 1, //列表边框，没有边框填写0，边框在css中修改
				"lastid": "showlast",
				"nextid": "shownext"
			}; //参数定义	 
            $.ljsGlasses.pcGlasses(showproduct); //方法调用，务必在加载完后执行
        },
        error:function(){
            console.log("放大镜error")
        }
    });
	
}
function getUserName(){
	if( typeof($.cookie('sessionId'))== 'string'){
		$("#username").css("display","inline-block");
		console.log($.cookie('sessionId'));
		$.ajax({
	    	//url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
	    	url :'http://192.168.43.213:8080/user/getUserName',
	        type: 'GET',
	        async:true,
	        dataType: 'jsonp',
	        jsonp: 'callback',
	        timeout: 5000,
	        data: {
	            "sessionId":$.cookie('sessionId')
	        },
	        success: function(data) {
	            //alert(data);
	            if(data.code=="true"){
	            	$("#user").html(data.username);
	            	
	            }
	            $('.undone').css('display','none');
	            $('.done').css('display','block');
	
	        },
	        error:function(){
	            console.log("error")
	        }
    	});
	}else{
		$('#username').hide();
		$('.btn-primary').show();
	}

}

function addToCart(){
	var itemId = $("#addCart").html();
//	var goodsName = $('.imgname').html();
//	var describle =  $('.describle').html();
//	var realPrice = $('.realPrice').html();
//  var newPrice = $('.newPrice').html();       
    //$("#addCart").html(itemId);
	var sessionId = $.cookie('sessionId');
	console.log($.cookie('sessionId'));
	console.log(itemId);
	$.ajax({
    	url :'http://192.168.43.213:8080/shopping/buyerCart',
        type: 'GET',
        async:true,
        dataType: 'jsonp',
        jsonp: 'callback',
        //timeout: 5000,
        data: {
        	"itemId":itemId,
        	"amount":1,
            "sessionId":typeof($.cookie('sessionId'))== 'string' ? $.cookie('sessionId'): ''
        },
        success:function(data) {
        	console.log(data);
            if(data.code=="true"){
            	alert("加入成功"); 	
            }
        },
        error:function(){
        	alert("hehe");
            console.log("error")
        }
	});
   
}
$("#userSubmit").click(function(){
	window.location.href="denglu.html";
});

$("#register").click(function(){
	window.location.href="zhuce.html";
});

//商品操作
//编辑
$('#goods-edit').click(function(){
	var itemId = $('.centerbox').attr('item-id');
	window.location.href = '../html/editGoods.html?itemId='+itemId;
});
//擦亮
$('#goods-up').click(function(){
	$.ajax({
		url :'http://192.168.43.213:8080/goods/polish',
		type: 'GET',
		async:true,
		dataType: 'jsonp',
		jsonp: 'callback',
		//timeout: 5000,
		data: {
			"itemId":$('.centerbox').attr('item-id')
		},
		success:function(data) {
			console.log(data);
			if(data.codde=="true"){
				alert("擦亮成功！");
			}else{
				console.log("擦亮失败!");
			}

		},
		error:function(){
			console.log("error")
		}
	});
});
//删除
$('#goods-del').click(function(){
	$.ajax({
		url :'http://192.168.43.213:8080/shopping/buyerCart',
		type: 'GET',
		async:true,
		dataType: 'jsonp',
		jsonp: 'callback',
		//timeout: 5000,
		data: {
			"itemId":$('.centerbox').attr('item-id')
		},
		success:function(data) {
			console.log(data);

		},
		error:function(){
			console.log("error")
		}
	});
});