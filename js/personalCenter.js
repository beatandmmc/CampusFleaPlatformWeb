$(function() {
    getUserName();
    $.ajax({
        //url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
        url: 'http://192.168.43.213:8080/shopping/myCart',
        type: 'GET',
        async: true,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 5000,
        data: {
            "sessionId": typeof($.cookie('sessionId')) == 'string' ? $.cookie('sessionId') : ''
        },
        success: function(data) {
            console.log(data);
            var goods_html = template('type_goods_temp', {
                model: data.data
            });
            $('tbody').html(goods_html);
            tableMethod()

        },
        error: function() {
            console.log("error")
        }
    });
});



$(".sideBar li").click(function(){
    $('.contTitle').html($(this).text().trim());
    $('.sideBar a').removeClass('active');
    $(this).children('a').addClass('active');
});

//		$('#no-link').click();

var previewImg = document.getElementById('head-pic');
var fileInput = document.getElementById('up-pic');
fileInput.addEventListener('change', function () {
    var file = this.files[0];
    var reader = new FileReader();
    // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
    reader.addEventListener("load", function () {
        previewImg.src = reader.result;
    }, false);
    // 调用reader.readAsDataURL()方法，把图片转成base64
    reader.readAsDataURL(file);
}, false);