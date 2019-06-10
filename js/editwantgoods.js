$(document).ready(function () {
    var str = window.location.href;
    var itemId = str.split("?itemId=")[1];


    //填充商品信息
    $.ajax({
        //url :'http://192.168.43.213:8080/shopping/buyerCart',
        url :'http://39.107.247.211:8080/CampusFleaPlatform_war/wantgoods/wantItemDetail',
        type: 'GET',
        async:true,
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            "itemId":itemId
        },
        success:function(data) {
            console.log(data);
            console.log(data.data);
            var info = data.data;
            $('#goodsName').val(info.name);
            $('#describle').val(info.describle);
            $('#catelogId').val(info.catelogId);
            imgURLs = data.data.imgUrl;
            var arr = data.data.imgUrl.split(";");
            //获取旧图片的个数和旧图片数组
            oldImgCount = arr.length-1;
            oldImgArr = arr;
            oldImgArr.splice(oldImgCount,1);
            for (var i = 0; i < oldImgCount; i++) {
                //alert(arr[i]);
                var div = document.createElement("div"),
                    img = document.createElement("img"),
                    del = document.createElement("div");
                div.className = "pic old";
                del.className = 'del';
                del.innerText = 'X';
                img.src = arr[i];
                div.appendChild(img);
                div.appendChild(del);
                $('.pic_box')[0].appendChild(div);
            }
        },
        error:function(){
            console.log("error")
        }
    });


    //为外面的盒子绑定一个点击事件
    $("#uploadImgBtn").click(function () {
        /*
         1、先获取input标签
         2、给input标签绑定change事件
         3、把图片回显
         */
        //      1、先回去input标签
        var $input = $(".uploadImg");
        console.log($input);
//      2、给input标签绑定change事件
        $input.on("change" , function (){
            //补充说明：因为我们给input标签设置multiple属性，因此一次可以上传多个文件
            //获取选择图片的个数
            var files = this.files;
            var length = files.length;
            console.log("选择了"+ length +"张图片");
            //3、回显
            $.each(files, function(key,value){
                //每次都只会遍历一个图片数据
                var div = document.createElement("div"),
                    img = document.createElement("img"),
                    del = document.createElement("div");
                div.className = "pic";
                del.className = 'del';
                del.innerText = 'X';
                var fr = new FileReader();
                fr.onload = function() {
                    img.src = this.result;
                    div.appendChild(img);
                    div.appendChild(del);
                    $('.pic_box')[0].appendChild(div);
                };
                fr.readAsDataURL(value);
            });
            //4、我们把当前input标签的id属性remove
            $input.removeAttr("id");
            //我们做个标记，再class中再添加一个类名就叫test
            var newInput = '<input class="uploadImg test" type="file" name="fileUploads" multiple>';
            $(this).after($(newInput));
        });
    });

    var oldImgCount;
    var oldImgArr = [];

//新上传的图片
    var fileArr = [];
    var formData= new FormData();
    $('#uploadImgBtn').on('change','.uploadImg',function(){
        var $file = $(".uploadImg");  //所有input file组
        var fileObj = $file[$file.length-2];  //获得最新添加了file的input(倒数第二个)
        var files = fileObj.files;
        var n = files.length;   //获取当前input的file数
        if(n>0){
            for(var i=0;i<n;i++){
                fileArr.push(files[i])
            }
        }
        console.log(fileArr)
    });


//上传信息
    $('.setting-save').click(function(){
        //获取旧图片
        var oldImgStr = oldImgArr.join(';');
        console.log(oldImgStr);
        oldImgStr = oldImgStr+';';
        formData.append("urls",oldImgStr);

        //获取新图片
        //遍历fileArr，把文件全部交给formData的files属性
        for(var i=0;i<fileArr.length;i++){
            formData.append('files',fileArr[i]);
        }
        //console.log($('#describle').val());
//        formData.append("userId",$('#userId').val());
        formData.append("sessionId",$.cookie('sessionId'));
        formData.append("itemId",itemId);
        formData.append("goodsName",$('#goodsName').val());
        formData.append("price",$('#price').val());
        formData.append("realPrice",$('#realPrice').val());
        formData.append("catelogId",$('#catelogId').val());
        formData.append("describle",$('#describle').val());
        $.ajax({
            url :'http://192.168.43.213:8080/wantgoods/modifyWantGoods',
            type: 'POST',
            async: true,
            data:formData,
            processData: false,
            contentType: false,
            success: function (data) {
                alert('修改成功！')
                window.location.href="mywantgoodsdetail.html?itemId="+itemId;
                console.log(data);
            },
            error: function () {
                console.log("修改闲置商品失败")
            }
        });
    });


//删除图片
//两种方式，判断旧图片数组的长度实现
    $('.pic_box').on('click', '.del', function () {
        var index= $(".pic").index($(this).parent());
        console.log('index='+index);
        console.log('oldImgCount='+oldImgCount);
        console.log('oldImgArr='+oldImgArr);

        //当前元素下标属于旧图片
        if(index < oldImgCount){
            oldImgArr.splice(index,1);
            oldImgCount--;
            console.log(oldImgArr)
        } else {
            console.log(index-oldImgCount);
            fileArr.splice(index-oldImgCount,1);
            console.log(fileArr)
        }
        $(this).parent().remove();
    });

});
