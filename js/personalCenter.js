$(function() {
    getUserName();
    queryXZ();
    queryBC();  
});
$('.xianzhi').click(function(){
	queryXZ()
})
$('.qiugou').click(function(){
	queryQG()
})
//$('.buycart').click(function(){
//	queryBC()
//})

function queryXZ(){
	$.ajax({
        //url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
        url: 'http://192.168.43.213:8080/goods/myGoods',
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
            var goods_html = template('my-xianzhi-template', {
                model: data.data
            });
            $('#xianzhi').html(goods_html);
            tableMethod()

        },
        error: function() {
            console.log("error")
        }
    });
}


function queryQG(){
	$.ajax({
        //url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
        url: 'http://192.168.43.213:8080/wantgoods/myWantGoods',
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
            var goods_html = template('my-qiugou-template', {
                model: data.data
            });
            $('#qiugou').html(goods_html);
            tableMethod()

        },
        error: function() {
            console.log("error")
        }
    });
}

function queryBC(){
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
            var goods_html = template('my-buycart-temp', {
                model: data.data
            });
            $('tbody').html(goods_html);
            tableMethod()
         	
        },
        error: function() {
            console.log("error")
        }
    });
}
function getItemDetail(itemId){
	//alert(itemId);
	//alert(itemId);
	window.location.href="../html/mygoodsdetail.html?itemId="+itemId;
	//alert(id)
}
function getwantItemDetail(itemId){
	//alert(itemId);
	//alert(itemId);
	window.location.href="../html/mywantgoodsdetail.html?itemId="+itemId;
	//alert(id)
}

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

function getUserName() {
	if(typeof($.cookie('sessionId')) == 'string') {
		$("#username").css("display", "inline-block");
		console.log($.cookie('sessionId'));
		$.ajax({
			//url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
			url: 'http://192.168.43.213:8080/user/getUserName',
			type: 'GET',
			async: true,
			dataType: 'jsonp',
			jsonp: 'callback',
			timeout: 5000,
			data: {
				"sessionId": $.cookie('sessionId')
			},
			success: function(data) {
				//alert(data);
				if(data.code == "true") {
					$("#user").html(data.username);

				}
				$('.undone').css('display', 'none');
				$('.done').css('display', 'block');

			},
			error: function() {
				console.log("error")
			}
		});
	} else {
		$('#username').hide();
		$('.btn-primary').show();
	}

}
function tableMethod() {
	if(!document.getElementsByClassName) {
		document.getElementsByClassName = function(cls) {
			var ret = [];
			var els = document.getElementsByTagName('*');
			for(var i = 0, len = els.length; i < len; i++) {

				if(els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
					ret.push(els[i]);
				}
			}
			return ret;
		}
	}

	var table = document.getElementById('cartTable'); // 购物车表格
	var selectInputs = document.getElementsByClassName('check'); // 所有勾选框
	var checkAllInputs = document.getElementsByClassName('check-all') // 全选框
	var tr = table.children[1].rows; //行
	var selectedTotal = document.getElementById('selectedTotal'); //已选商品数目容器
	var priceTotal = document.getElementById('priceTotal'); //总计
	var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
	var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表容器
	var selected = document.getElementById('selected'); //已选商品
	var foot = document.getElementById('foot');

	// 更新总数和总价格，已选浮层
	function getTotal() {
		var seleted = 0;
		var price = 0;
		var HTMLstr = '';
		for(var i = 0, len = tr.length; i < len; i++) {
			if(tr[i].getElementsByTagName('input')[0].checked) {
				tr[i].className = 'on';
				seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
				price += parseFloat(tr[i].cells[4].innerHTML);
				HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
			} else {
				tr[i].className = '';
			}
		}

		selectedTotal.innerHTML = seleted;
		priceTotal.innerHTML = price.toFixed(2);
		selectedViewList.innerHTML = HTMLstr;

		if(seleted == 0) {
			foot.className = 'foot';
		}
	}

	// 计算单行价格
	function getSubtotal(tr) {
		var cells = tr.cells;
		var price = cells[2]; //单价
		var subtotal = cells[4]; //小计td
		var countInput = tr.getElementsByTagName('input')[1]; //数目input
		var span = tr.getElementsByTagName('span')[1]; //-号
		//写入HTML
		subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
		//如果数目只有一个，把-号去掉
		if(countInput.value == 1) {
			span.innerHTML = '';
		} else {
			span.innerHTML = '-';
		}
	}

	// 点击选择框
	for(var i = 0; i < selectInputs.length; i++) {
		selectInputs[i].onclick = function() {
			if(this.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
				for(var j = 0; j < selectInputs.length; j++) {
					selectInputs[j].checked = this.checked;
				}
			}
			if(!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
				for(var i = 0; i < checkAllInputs.length; i++) {
					checkAllInputs[i].checked = false;
				}
			}
			getTotal(); //选完更新总计
		}
	}

	// 显示已选商品弹层
	selected.onclick = function() {
		if(selectedTotal.innerHTML != 0) {
			foot.className = (foot.className == 'foot' ? 'foot show' : 'foot');
		}
	}

	//已选商品弹层中的取消选择按钮
	selectedViewList.onclick = function(e) {
		var e = e || window.event;
		var el = e.srcElement;
		if(el.className == 'del') {
			var input = tr[el.getAttribute('index')].getElementsByTagName('input')[0]
			input.checked = false;
			input.onclick();
		}
	}

	//为每行元素添加事件
	for(var i = 0; i < tr.length; i++) {
		//将点击事件绑定到tr元素
		tr[i].onclick = function(e) {
			var e = e || window.event;
			var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
			var cls = el.className; //触发元素的class
			var countInout = this.getElementsByTagName('input')[1]; // 数目input
			var value = parseInt(countInout.value); //数目
			//通过判断触发元素的class确定用户点击了哪个元素
			switch(cls) {
				case 'add': //点击了加号
					countInout.value = value + 1;
					getSubtotal(this);
					break;
				case 'reduce': //点击了减号
					if(value > 1) {
						countInout.value = value - 1;
						getSubtotal(this);
					}
					break;
				case 'delete': //点击了删除
					var conf = confirm('确定删除此商品吗？');
					if(conf) {
						var goodArr = [$(this).attr('goodId')]
						console.log(goodArr)
						delGoods(goodArr)
						this.parentNode.removeChild(this);
					}
					break;
			}
			getTotal();
		}
		// 给数目输入框绑定keyup事件
		//tr[i].getElementsByTagName('input')[1].onkeyup = function () {
		//    var val = parseInt(this.value);
		//    if (isNaN(val) || val <= 0) {
		//        val = 1;
		//    }
		//    if (this.value != val) {
		//        this.value = val;
		//    }
		//    getSubtotal(this.parentNode.parentNode); //更新小计
		//    getTotal(); //更新总数
		//}
	}

	// 点击全部删除
	deleteAll.onclick = function() {
		if(selectedTotal.innerHTML != 0) {
			var con = confirm('确定删除所选商品吗？'); //弹出确认框
			if(con) {
				var goodsArr = [];
				for(var i = 0; i < tr.length; i++) {
					// 如果被选中，就删除相应的行
					var trObj = tr[i].getElementsByTagName('input')[0];
					if(trObj.checked) {
						var goodId = trObj.parentNode.parentNode.getAttribute('goodId')
						goodsArr.push(goodId)
						tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
						i--; //回退下标位置
					}
				}
				console.log(goodsArr)
				delGoods(goodsArr)
			}
		} else {
			alert('请选择商品！');
		}
		getTotal(); //更新总数
	}

	// 默认全选
	checkAllInputs[0].checked = true;
	checkAllInputs[0].onclick();

}

function delGoods(goodsArr) {
	console.log(goodsArr)
	//删除商品ajax
	$.ajax({
		//url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
		url: 'http://192.168.43.213:8080/shopping/delCart',
		type: 'GET',
		async: true,
		dataType: 'jsonp',
		jsonp: 'callback',
		timeout: 5000,                
		traditional: true,//这里设置为true,不然后台接收到的参数会带上[]，导致数据无法正常接收
		data: {
			"sessionId": typeof($.cookie('sessionId')) == 'string' ? $.cookie('sessionId') : '',
			'goodsId': goodsArr
		},
		success: function(data) {
			console.log(data.code);

		},
		error: function() {
			console.log("error")
		}
	});
	//删除商品ajax结束
}
var picObj = $('#up-pic');
$('.submit-info').click(function(){
	var formData = new FormData();

	//console.log($('#up-pic')[0].files[0]);
	formData.append("file",$('#up-pic')[0].files[0]);
	formData.append("sessionId",typeof($.cookie('sessionId')) == 'string' ? $.cookie('sessionId') : '');
	formData.append("name",$('#name').val());
	formData.append("QQ",$('#QQ').val());
	formData.append("school",$('#school').val());
	formData.append("speciality",$('#speciality').val());
	$.ajax({
		url :'http://192.168.43.213:8080/user/modifyUser',
		type: 'POST',
		async: true,
		data:formData,
		processData: false,
		contentType: false,
		success: function (data) {
			if(data.code == "true"){
				alert('修改成功！');
			}else{
				console.log("擦亮失败!");
			}
			
			console.log(data);
			$('.close-info').attr('data-dismiss','modal')

		},
		error: function () {
			console.log("上传error")
		}
	});
});


function myConfirm(){
	var r=confirm("此操作不保存用户信息，确认关闭？");
	if (r==true){
		$('.close-info').attr('data-dismiss','modal')
	}
	else{
		$('.close-info').attr('data-dismiss','')
	}
}

//请求用户信息填充
$('.user-modify').click(function(){
	$.ajax({
		//url :'http://39.107.247.211:8080/CampusFleaPlatform_war/goods/catelog',
		url: 'http://192.168.43.213:8080/shopping/delCart',
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
			$('#name').val(data.name);
			$('#QQ').val(data.QQ);
			$('#school').val(data.school);
			$('#speciality').val(data.speciality);
			//头像的src不为空
			if(data.src){
				$('#head-pic').attr('src',data.src)
			}
		},
		error: function() {
			console.log("请求用户信息error")
		}
	});
});






