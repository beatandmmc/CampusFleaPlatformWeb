//����˵�li��ɫ
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
//����ϴ�
$("#info-upload").click(function(){
	window.location.href="backstrage-detail.html";
})
$("#det-upload").click(function(){
	window.location.href="backstage-information.html";
})
$("#seri-upload").click(function(){
	window.location.href="backstrage-detail.html";
})
//ʵ��ͼƬ�л�
 $(".panel-heading").click(function(){
  var imgSrc=$(this).find("img").attr("src");
	 if(imgSrc=="img/logo2.jpg"){
	  	$(this).find("img").attr("src","img/logo1.jpg");
	  	}else{
	    	$(this).find("img").attr("src","img/logo2.jpg");
	    }	  	    
	 })
//����ɾ��
$('body').on('click','.del',function(){
    video_id = $(this).parent().nextAll("#video_id");
    if(confirm("ȷ��Ҫɾ��������")){
        var link = $(this).parents("tr");
        link.remove();
    }else{
        return;
    }
})
//ҳ��ȫѡ����
$(function(){
    $(".table tr").each(function(){
        $(this).children("td:first").hide();
        $(this).children("th:first").hide();
    })
})
//�������ɾ��
$("#more-delete").click(function(){
			//ȫѡ����ʾ
    	$(".table tr").each(function(){
	        $(this).children("td:first").show();
	        $(this).children("th:first").show();
	    });
			//����ɾ������ʾ
  		$('#more-delete').css("display","none");
	    $('#cancel').css("display","block");
	    $('#at-once-delete').css("display","block");
})
//���ȡ��
$("#cancel").click(function(){
			//ȫѡ������
    	$(".table tr").each(function(){
	        $(this).children("td:first").hide();
	        $(this).children("th:first").hide();
	    });
	    //����ɾ��������
			$('#more-delete').css("display","block");
	    $('#cancel').css("display","none");
	    $('#at-once-delete').css("display","none");
})
//ȫѡ��ѡת��
var choose_flag = true;
$("#allchoose").click(function(){
    if(choose_flag){
        $("input[name='file']").prop("checked",true);
        $("#allchoose").html("��ѡ");
    }else{
        $("input[name='file']").prop("checked", false);
        $("#allchoose").html("ȫѡ");
    }
    choose_flag = !choose_flag;
})
//�������ɾ����ť
$("#at-once-delete").click(function(){
	var arrId = [];
    if(!$('input[name="file"]').is(':checked')) {
        alert("δѡ��ϵ�У�");
    }else {
        if(confirm("ȷ��Ҫɾ��ѡ�е�������")) {
            $("input[name='file']:checked").each(function(){
                alert($(this).siblings().text());
                n = $(this).parents("tr").index() + 1;
                $(".table").find("tr:eq(" + n + ")").remove();
            })
        }else{
            return;
        }
    }
    //ȫѡ������
    	$(".table tr").each(function(){
	        $(this).children("td:first").hide();
	        $(this).children("th:first").hide();
	    });
	    //����ɾ��������
			$('#more-delete').css("display","block");
	    $('#cancel').css("display","none");
	    $('#at-once-delete').css("display","none");
})
