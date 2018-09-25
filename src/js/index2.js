//引入配置文件
require(['config'],function(){
    //引入js模块
    require(['jquery','common'],function($){


        //轮播图
        jQuery(function($){

            /*
                思路:
                    1.把所有图片叠加在一个容器里(设置相对定位)
                    2.留一张图片在容器里,把剩下的图片都放在容器的右边位置(设置绝对定位)
                    3.把容器里的图片左移,把容器右边的图片左移移动到容器里
            */
           
           var allLi = $('.banner_img li');//得到所有的li
           var iW = allLi.eq(0).width();//得到一个li的宽度

           //动态创建焦点
           var html = '';
           for(var i=0;i<allLi.length;i++){
            html += '<span>' + '</span>';
           }
           $('.spot').html(html);
           $('.spot span').eq(0).addClass('active');

           //开启定时器让图片运动起来
           //图片统一放在右侧,第一张图片放在可视区
           
           //改变元素li的style属性(内联样式)
           $('.banner_img li').css('left',iW+'px');
           $('.banner_img li').eq(0).css('left',0);

           //开定时器运动
            var now = 0;
            var timer = null;

            clearInterval(timer);
            timer = setInterval(next, 2000); //每隔3秒切换一个图片

            function next() {
                //当前图片
                $('.banner_img li').eq(now).animate({
                    'left': -iW
                }, 1000);//当前图片向左移动

                //判断索引值界限
                now = ++now > $('.banner_img li').length - 1 ? 0 : now;
                //下一张图片
                $('.banner_img li').eq(now).css('left', iW + 'px');
                $('.banner_img li').eq(now).animate({
                    'left': 0
                }, 1000);
                spot();
            };

            //焦点跟随
            function spot() {
                $('.spot span').eq(now).addClass('active').siblings().removeClass('active');//链式调用
            }

            //鼠标经过停下来
            //hover(enter[,leave])
            //enter:鼠标移入时执行;leave:鼠标移出时执行
            $('#banner').hover(function() {
                clearInterval(timer);
            }, function() {
                timer = setInterval(next, 2000);
            });

            //点击焦点切换图片
            $('.spot span').click(function() {

                if($(this).index() > now) {
                    //右侧切入
                    $('.banner_img li').eq(now).animate({
                        'left': -iW
                    }, 1000);//当前图片左移
                    $('.banner_img li').eq($(this).index()).css('left', iW + 'px');
                    $('.banner_img li').eq($(this).index()).animate({
                        'left': 0
                    }, 1000);//下一张图片左移
                    now = $(this).index();
                    spot();//焦点跟随
                }

                if($(this).index() < now) {
                    //从左侧进入
                    $('.banner_img li').eq(now).animate({
                        'left': iW
                    }, 1000);
                    $('.banner_img li').eq($(this).index()).css('left', -iW + 'px');
                    $('.banner_img li').eq($(this).index()).animate({
                        'left': 0
                    }, 1000);
                    now = $(this).index();
                    spot();//焦点跟随
                }
            });


        });


        //ajax加载数据
        
        let goodslist_1 = document.querySelector('.goodslist_1');
        let goodslist_2 = document.querySelector('.goodslist_2');
        let goodslist_3 = document.querySelector('.goodslist_3');
        let goodslist_4 = document.querySelector('.goodslist_4');
        let goodslist_5 = document.querySelector('.goodslist_5');

        //把所有的id放在一个数组里面,方便后面在不同的位置生成数据
        let arr = ['G001','G002','G003','G004','G005','G006','G007','G008','G009','G010','G011','G012','G013','G014','G015','G016','G017','G018','G019','G020','G021','G022','G023','G024','G025','G026','G027','G028','G029','G030','G031','G032','G033','G034','G035','G036','G037','G038','G039','G040','G041','G042','G043','G044','G045']
        // ajax核心步骤
        // 1）创建请求对象
        let xhr = new XMLHttpRequest();

        // 4)在js中处理数据
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4){
                let data = JSON.parse(xhr.responseText);

                    //根据数据生成html结构
                    let content1 = '';
                    let content2 = '';
                    let content3 = '';
                    let content4 = '';
                    let content5 = '';

                for(var i=0;i<data.length;i++){
                    //如果没有li标签,单独给a标签添加class属性添加不上(不知道为什么)
                    if(data[i].id == arr[0]){
                        content1 += `<li class="skip" data-guid="${data[i].id}"><div><a href="#"  class="all">
                        <img src="${data[i].imgurl}"/ >
                        </a></div></li>
                        `
                    }

                    if(data[i].id>=arr[1] && data[i].id<=arr[12]){
                        content2 += `<li class="skip" data-guid="${data[i].id}"><a  href="#" class="all" >
                            <div class=".img_box" style="width:100px;height:100px;margin:0 auto;position:relative;">
                                <img src="${data[i].imgurl}"/ style="width:100px;height:100px;">
                                <span style="position:absolute;left:0;top:0;display:block;width:10px;line-height:1;font-size:8px;padding:2px;border:1px solid #3a3a3a;border-radius:2px;">${data[i].presell}</span>
                            </div>
                            <p style="margin-top:10px;font-size:12px;color:#3a3a3a;text-align:center;overflow:hidden;">${data[i].name}</p>
                            <p style="overflow:hidden;text-align:center;">
                                <span style="font-size:12px;line-height:20px;height:20px;display:inline-block;color:#ff8000;">${data[i].price}</span>
                                <span style="display:inline-block;width:18px;height:18px;border:1px solid #bfbfbf;border-radius:50%;color:#ff8000;float:right;cursor:pointer;">${data[i].addbtn}</span>
                            </p>
                            </a></li>`
                    }

                    if(data[i].id == arr[13]){
                        content3 += `<li class="skip" data-guid="${data[i].id}"><div><a href="#"  class="all">
                        <img src="${data[i].imgurl}"/ >
                        </a></div></li>
                        `
                    }

                    if(data[i].id>=arr[14] && data[i].id<=arr[16]){
                        content4 += `<li class="skip" data-guid="${data[i].id}"><a  href="#"  class="all">
                            <div class=".img_box" style="width:100px;height:100px;margin:0 auto;position:relative;">
                                <img src="${data[i].imgurl}"/ style="width:100px;height:100px;">
                                <span style="position:absolute;left:0;top:0;display:block;width:10px;line-height:1;font-size:8px;padding:2px;border:1px solid #3a3a3a;border-radius:2px;">${data[i].presell}</span>
                            </div>
                            <p style="margin-top:10px;font-size:12px;color:#3a3a3a;text-align:center;overflow:hidden;">${data[i].name}</p>
                            <p style="overflow:hidden;text-align:center;">
                                <span style="font-size:12px;line-height:20px;height:20px;display:inline-block;color:#ff8000;">${data[i].price}</span>
                                <span style="display:inline-block;width:18px;height:18px;border:1px solid #bfbfbf;border-radius:50%;color:#ff8000;float:right;cursor:pointer;">${data[i].addbtn}</span>
                            </p>
                            </a></li>`
                    }

                    if(data[i].id>=arr[17] && data[i].id<=arr[44]){
                        content5 += `<li class="skip" data-guid="${data[i].id}"><a href="#"  class="all">
                        <div class=".img_box" style="width:120px;height:120px;margin:20px 0;position:relative;display:inline-block;">
                            <img src="${data[i].imgurl}"/ style="width:100px;height:100px;">
                            <span style="position:absolute;left:0;top:0;display:block;width:10px;line-height:1;font-size:8px;padding:2px;border:1px solid #3a3a3a;border-radius:2px;">${data[i].presell}</span>
                        </div>
                        <div class="rt" >
                            <h5>${data[i].name1}</h5>
                            <p>${data[i].name2}</p>
                            <p >${data[i].price}</p>
                        </div>
                            <span style="display:inline-block;width:18px;height:18px;border:1px solid #bfbfbf;border-radius:50%;color:#ff8000;float:right;margin-top:90px;">${data[i].addbtn}</span>
                            </a></li>`
                    }








                    //拼接a标签,获取当前商品:data[i]
                    // content4 += `<a href="#" data-guid="${data[i].id}" >
                    //     <div class=".img_box" style="width:120px;height:120px;margin:20px 0;position:relative;display:inline-block;">
                    //         <img src="${data[i].imgurl}"/ style="width:100px;height:100px;">
                    //         <span style="position:absolute;left:0;top:0;display:block;width:10px;line-height:1;font-size:8px;padding:2px;border:1px solid #3a3a3a;border-radius:2px;">${data[i].presell}</span>
                    //     </div>
                    //     <div class="rt" >
                    //         <h5>${data[i].name1}</h5>
                    //         <p>${data[i].name2}</p>
                    //         <p >${data[i].price}</p>
                    //     </div>
                    //         <span style="display:inline-block;width:18px;height:18px;border:1px solid #bfbfbf;border-radius:50%;color:#ff8000;float:right;margin-top:90px;">${data[i].addbtn}</span>
                    // </a>`
                }


                // 写入页面
                goodslist_1.innerHTML = content1;
                goodslist_2.innerHTML = content2;
                goodslist_3.innerHTML = content3;
                goodslist_4.innerHTML = content4;
                goodslist_5.innerHTML = content5;


            }

        }

        // 2）配置参数，建立与服务器的连接
        xhr.open('get','../api/index.php');

        // 3）发送请求
        xhr.send();


        //点击跳转到详情页并读取商品cookie
    
        let fruitday = document.querySelector('#fruitday');

        
        //绑定点击事件,跳转到详情页
        fruitday.onclick = function(e){
            e = e || window.event;
            let target = e.target || e.srcElement;

            //获取当前li
            //先获取当前a标签
            let currenta = target.parentNode.parentNode;
            // console.log(currenta);
            let currentLi = currenta.parentNode;
            // console.log(currentLi);


            let params = '';
            let guid = currentLi.getAttribute('data-guid');//得到当前id

            params = 'id' + '=' +guid;
            console.log(params);
            location.href = 'html/detail.html?'+params;

        }

    });
});