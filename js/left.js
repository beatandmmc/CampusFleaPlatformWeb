//点击菜单li变色
	$("#meu li a").on("click",function(){	
		$(this).parent().children().css("color","red");
		$(this).parent().parent().find("a").css("color","black");
		$(this).css("color","red")
		
	})	


//	$("#meu li a").on("click",function(){	
//		
//		$("#meu li a").removeClass("color");
//		$(this).addClass("color");
//	})	


//$('#meu li a').click(function () {
//  var f = this;
//  $('#meu li a').each(function () {
//  		$(this).addClass('active');
//  	}else{
//  		$(this).addClass('none');
//  	}
//  })
//})
//var menu = document.getElementsByTagName('meu');
//for (var j= 0; j < menu.length; j++) {
//	var links = menu.getElementsByTagName('a');
//	for (var i = 0; i < links.length; i++) {
//  links[i].onclick = function () {
//      for (var j = 0; j < links.length; j++) {
//          if(links[j] == this) {
//              this.style.color = 'red';
//          } else {
//              links[j].style.color = '';
//          }
//      }
//  }
//}
//}
//点击上传
$("#info-upload").click(function(){
	window.location.href="backstrage-detail.html";
})
$("#det-upload").click(function(){
	window.location.href="backstage-information.html";
})
$("#seri-upload").click(function(){
	window.location.href="backstrage-detail.html";
})
//实现图片切换
 $(".panel-heading").click(function(){
  var imgSrc=$(this).find("img").attr("src");
	 if(imgSrc=="img/logo2.jpg"){
	  	$(this).find("img").attr("src","img/logo1.jpg");
	  	}else{
	    	$(this).find("img").attr("src","img/logo2.jpg");
	    }	  	    
	 })
//单行删除
$('body').on('click','.del',function(){
    video_id = $(this).parent().nextAll("#video_id");
    if(confirm("确定要删除数据吗")){
        var link = $(this).parents("tr");
        link.remove();
    }else{
        return;
    }
})
//页面全选隐藏
$(function(){
    $(".table tr").each(function(){
        $(this).children("td:first").hide();
        $(this).children("th:first").hide();
    })
})
//点击批量删除
$("#more-delete").click(function(){
			//全选框显示
    	$(".table tr").each(function(){
	        $(this).children("td:first").show();
	        $(this).children("th:first").show();
	    });
			//立即删除等显示
  		$('#more-delete').css("display","none");
	    $('#cancel').css("display","block");
	    $('#at-once-delete').css("display","block");
})
//点击取消
$("#cancel").click(function(){
			//全选框隐藏
    	$(".table tr").each(function(){
	        $(this).children("td:first").hide();
	        $(this).children("th:first").hide();
	    });
	    //立即删除等隐藏
			$('#more-delete').css("display","block");
	    $('#cancel').css("display","none");
	    $('#at-once-delete').css("display","none");
})
//全选不选转换
var choose_flag = true;
$("#allchoose").click(function(){
    if(choose_flag){
        $("input[name='file']").prop("checked",true);
        $("#allchoose").html("不选");
    }else{
        $("input[name='file']").prop("checked", false);
        $("#allchoose").html("全选");
    }
    choose_flag = !choose_flag;
})
//点击立即删除按钮
$("#at-once-delete").click(function(){
	var arrId = [];
    if(!$('input[name="file"]').is(':checked')) {
        alert("未选择系列！");
    }else {
        if(confirm("确定要删除选中的数据吗？")) {
            $("input[name='file']:checked").each(function(){
                alert($(this).siblings().text());
                n = $(this).parents("tr").index() + 1;
                $(".table").find("tr:eq(" + n + ")").remove();
            })
        }else{
            return;
        }
    }
    //全选框隐藏
    	$(".table tr").each(function(){
	        $(this).children("td:first").hide();
	        $(this).children("th:first").hide();
	    });
	    //立即删除等隐藏
			$('#more-delete').css("display","block");
	    $('#cancel').css("display","none");
	    $('#at-once-delete').css("display","none");
})
