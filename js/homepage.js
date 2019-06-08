
$(function () {
    newGoods();
    getUserName();
});
function newGoods(){
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
            var goods_html = template('type_goods_temp', {model:data.data});
            $('.goods-list').html(goods_html);

        },
        error:function(){
            console.log("error")
        }
    });
}
var pagenum = 1;
var flag_more = true;
$(".xust-nav").children('li').click(function(){
    pagenum = 1;
    var catelogid = $(this).attr('catelogid');
    var catelogname = $(this).text();
    $('.catelog-name').html(catelogname).attr('catelogid',catelogid);
    getGoods(catelogid);
});

//搜索
$('.goods-search').click(function(){
	var str = $('.search-text').val()
	searchQuery(str)
});

function searchQuery(str){
	console.log(str)
		$.ajax({
    	//url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
    	url :'http://192.168.43.213:8080/goods/search',
        type: 'GET',
        async:true,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 5000,
        data: {
            str:str
        },
        success: function(data) {
        	console.log(data)
            if(data.data.length == 0){
            	console.log('meide')
            	$('.catelog-name').html('最新发布');
            	$('.nothing').show()
            	$('.over').hide()
            	newGoods()
            }else{
            	$('.nothing').hide()
            	$('.over').show()
           		$('.catelog-name').html(str);
	            var search_html = template('type_search_temp', {model:data.data});
	            $('.goods-list').html(search_html);
	            flag_more = false;
            }
            
            
        },
        error:function(){
            console.log("搜索error")
        }
   });
}


//求购
$('.want-center').click(function(){
	var str = $('.search-text').val()
	wantQuery()
});

function wantQuery(){
		$.ajax({
    	//url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
    	url :'http://192.168.43.213:8080/wantgoods/selectWantGoods',
        type: 'GET',
        async:true,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 5000,
        
        success: function(data) {
        	console.log(data)
            if(data.data.length == 0){
            	console.log('meide')
            	$('.catelog-name').html('最新发布');
            	$('.nothing').show()
            	$('.over').hide()
            	newGoods()
            }else{
            	$('.nothing').hide()
            	$('.over').show()
           		$('.catelog-name').html('求购商品');
	            var want_html = template('type_want_temp', {model:data.data});
	            $('.goods-list').html(want_html);
	            flag_more = false;
            }
            
            
        },
        error:function(){
            console.log("求购error")
        }
   });
}



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
	$('.nothing').hide();
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

//$('.publish').click(function(){
//  location.href = '../html/pubGoods.html'
//});
$("#quit").click(function(){
		window.location.href="homepage.html";
		//清除所有cookie函数
//		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
//		if(keys) {
//			for(var i = keys.length; i--;)
//			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
//		}
	$.ajax({
        //url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
        url :'http://192.168.43.213:8080/user/logout',
        type: 'GET',
        async:true,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 5000,
        data: {
            "sessionId": typeof($.cookie('sessionId')) == 'string' ? $.cookie('sessionId') : ''
        },
        success: function(data) {
        	if(data.code == "true"){
        		$.cookie('sessionId', '', { expires: -1 });
				alert("退出成功！");
				
			}else{
				console.log("退出失败!");
			}
        },
        error:function(){
            console.log("error")
        }
    });
	
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
$("#buycart-btn").click(function(){
	window.location.href="buycart.html";
});


function getItemDetail(itemId){
	//alert(itemId);
	var itemId = itemId;
	//alert(itemId);
	window.location.href="../html/shopdetail.html?itemId="+itemId;
	//alert(id)
}
function getWantItemDetail(itemId){
	//alert(itemId);
	var itemId = itemId;
	//alert(itemId);
	window.location.href="../html/wantshopdetail.html?itemId="+itemId;
	//alert(id)
}



$('#user').click(function(){
	window.location.href='../html/personalCenter.html'
});
