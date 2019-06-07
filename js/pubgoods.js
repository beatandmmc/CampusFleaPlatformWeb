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
    });

    $('.setting-save').click(function(event){
        //遍历fileArr，把文件全部交给formData的files属性
        for(var i=0;i<fileArr.length;i++){
            formData.append('files',fileArr[i]);
        }
        //console.log($('#describle').val());
//        formData.append("userId",$('#userId').val());
		formData.append("sessionId",typeof($.cookie('sessionId')) == 'string' ? $.cookie('sessionId') : '');
        formData.append("goodsName",$('#goodsName').val());
        formData.append("price",$('#price').val());
        formData.append("realPrice",$('#realPrice').val());
        formData.append("catelogId",$('#catelogId').val());
        formData.append("describle",$('#describle').val());
        $.ajax({
            url :'http://192.168.43.213:8080/goods/publishGoods',
            type: 'POST',
            async: true,
            data:formData,
            processData: false,
            contentType: false,
            success: function (data) {
            	alert('发布成功！')
                window.location.href="homepage.html";
                console.log(data);
            },
            error: function () {
                console.log("上传error")
            }
        });
    });

    $(document).ready(function () {
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
        })
    });

    //删除图片
    $('.pic_box').on('click', '.del', function () {
        var index= $(".pic").index($(this).parent());
        console.log(index);
        fileArr.splice(index,1);
        $(this).parent().remove();
        console.log(fileArr)
    });