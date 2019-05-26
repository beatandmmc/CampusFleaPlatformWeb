$(function () {
    $.ajax({
        url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
        //url :'http://192.168.43.213:8080/goods/catelog',
        type: 'GET',
        async:true,
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 5000,
        data: {
            "pageNum" : 1,
            "pageSize" : 6,
            "catalog" : 0
        },
        success: function(data) {
            console.log(data);
            var goods_html = template('type_goods_temp', {model:data.data});
            $('tbody').html(goods_html);

        },
        error:function(){
            console.log("error")
        }
    });
});
