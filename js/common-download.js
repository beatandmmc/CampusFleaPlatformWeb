$("#quit").click(function(){

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

                //alert("退出成功！");
                $.cookie('sessionId', '', { expires: -1 });
                //$("#fabu").css("display","none");
                window.location.href="homepage.html";
            }else{
                console.log("退出失败!");
                $.cookie('sessionId', '', { expires: -1 });
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
$("#buycart-box").click(function(){
    window.location.href="buycart.html";
});