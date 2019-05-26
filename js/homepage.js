
$(function () {
	
    $.ajax({
    	//url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
    	url :'http://192.168.43.213:8080/goods/catelog',
        type: 'GET',
        async:true,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 5000,
        data: {
            "pageNum" : 1,
            "pageSize" : 8,
            "catalog" : 0
        },
        success: function(data) {
            console.log(data);
            var goods_html = template('type_goods_temp', {model:data.data});
            $('.goods-list').html(goods_html);

        },
        error:function(){
            console.log("error")
        }
    });
    getUserName();
});
var pagenum = 1;
var flag_more = true;
$(".xust-nav").children('li').click(function(){
    pagenum = 1;
    var catelogid = $(this).attr('catelogid');
    var catelogname = $(this).text();
    $('.catelog-name').html(catelogname).attr('catelogid',catelogid);
    getGoods(catelogid);
});
function getUserName(){
//	console.log($.cookie('sessionId'));
//	console.log(typeof($.cookie('sessionId')));
//	console.log(typeof(undefined));
	if(typeof($.cookie('sessionId'))== 'string'){
		console.log($.cookie('sessionId'));
		$("#username").css("display","inline-block");
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
	            console.log(data);
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
function getGoods(catelogid){
	$('.over').hide();
    flag_more = true;
    $.ajax({
        //url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
        url :'http://192.168.43.213:8080/goods/catelog',
        type: 'GET',
        async:true,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 5000,
        data: {
            "pageNum" : 1,
            "pageSize" : 8,
            "catalog" : catelogid
        },
        success: function(data) {
            console.log(data);
            var goods_html = template('type_goods_temp', {model:data.data});
            $('.goods-list').html(goods_html);

        },
        error:function(){
            console.log("error")
        }
    });
}

function getMore(catelogid){
    $.ajax({
        //url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
        url :'http://192.168.43.213:8080/goods/catelog',
        type: 'GET',
        async:true,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 5000,
        data: {
            "pageNum" : pagenum,
            "pageSize" : 8,
            "catalog" : catelogid
        },
        success: function(data) {
        	console.log(data);
            console.log(parseInt(data.pages)+1);
            console.log(pagenum);

            if(pagenum < parseInt(data.pages)+1){
            	var goods_html = template('type_goods_temp', {model:data.data});

	            $('.goods-list').append(goods_html);
            }else{
            	$('.over').show();
            	flag_more = false;
            }
            

        },
        error:function(){
            console.log("error")
        }
    });
}




$(document).on("scroll",function(){
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var endHeight = docHeight - scrollTop - windowHeight;
    if (endHeight <= 0) {
        pagenum++;
        var catelogid = $('.catelog-name').attr('catelogid');
        if(flag_more){
        	//再次请求
        	getMore(catelogid);
        }
    }
});

$('.publish').click(function(){
    location.href = '../html/pubGoods.html'
});
$("#quit").click(function(){
		window.location.href="homepage.html";
		//清除所有cookie函数
//		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
//		if(keys) {
//			for(var i = keys.length; i--;)
//			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
//		}
		$.cookie('sessionId', '', { expires: -1 });
});
$("#userSubmit").click(function(){
	window.location.href="denglu.html";
});

$("#register").click(function(){
	window.location.href="zhuce.html";
});
/*$("#item").click(function(){
	alert("hahha");
})*/

function getItemDetail(itemId){
	//alert(itemId);
	var itemId = itemId;
	//alert(itemId);
	window.location.href="../html/shopdetail.html?itemId="+itemId;
	//alert(id)
	
	
}



