//引入配置文件
require(['config'],function(){
    //引入js模块
    require(['jquery','common'],function($){

        //返回上一页
        var imgback = document.querySelector('.imgback');
        imgback.onclick = function(){
            history.back();
        }



        //获取详情页中的商品cookie
        
        var box2 = document.querySelector('#box2');
        var totalPrice = document.querySelector('.totalPrice');
        // var quantity = document.querySelector('.quantity');
        var list = document.querySelector('.list');

        //用于保存商品信息
        var goodslist;
        
        
        render();
        //渲染页面
        function render(){
            goodslist = Cookie.get('goodslist');
            //得到的是cookie的值,这里把所有的商品当做一个数据集合goodslist,每个商品相当于里面的一个cookie
            
            if(goodslist === ''){
                goodslist = [];
            }else{
                goodslist = JSON.parse(goodslist);
            }

            console.log(goodslist);

            // 用于保存总价金额
            var total = 0;

            //把商品写入页面
            //创建ul
            var ul = document.createElement('ul');
            ul.innerHTML = goodslist.map(goods=>{
                // 计算总价
                total += goods.price.slice(1) * goods.qty;

                return `<li class="list" data-guid="goods.guid">
                    <p class="good_check">
                        <input type="checkbox" name="good" value=""/>
                    </p>
                    <a href="#">
                        <div class="box2_1">
                            <img src="${goods.imgurl}"/>
                        </div>
                        <div class="box2_2">
                            <h3>${goods.name1}</h3>
                            <p>${goods.price}</p>
                        </div>
                    </a>
                    <div class="box2_3">
                        <img src="../img/cart/3.png" class="btnSub"/>
                        <span class="quantity">${goods.qty}</span>
                        <img src="../img/cart/4.png" class="btnAdd"/>
                    </div>
                    </li>

                    `
            }).join('');
            
            //把ul写入页面
            box2.innerHTML = '';//要先清空,否则之前的信息也保存在里面
            box2.appendChild(ul);

            //写入总价
            totalPrice.innerText = '￥'+total;

            //点击添加商品数量
            // box2.onclick = function(e){
            //     var quantity = document.querySelector('.quantity');//必须在这里声明,不能在全局声明.全局声明会报错 Cannot read property 'innerText' of null


            //     console.log(888);

            //     e = e || window.event;
            //     var target = e.target || e.srcElement;
            //     var currentLi = target.parentNode.parentNode;

            //     var guid = currentLi.getAttribute('data-guid')
            //     // console.log(target);
                
            //     for(var i=0;i<goodslist.length;i++){
            //         if(target.className === 'btnAdd'){
            //             quantity.innerText ++;
            //         }
            //     }

            // }
            
        };


        
        jQuery(function($){

            //添加商品数量
            $('#box2').on('click','.btnAdd',function(){
                //html(): （等同于原生js中的innerHTML）
                
                //取值div.html()：取得第一个匹配元素的html内容
                var val = $(this).prev().html();
                val++;
                if(val >= 100){
                    val = 100;
                }

                //赋值div.html(‘:’)：设置匹配元素的内容
                $(this).prev().html(val);

                //小计计算每行总价
                price($(this));//这里的实参指的是加减数量按钮

                var goodslist = Cookie.get('goodslist');
                // var arr = checkAll();//声明变量arr,把函数checknum()赋值给arr,arr作为实参传递给下面两个函数进行调用.

                //总数量
                // allnum(goodslist);
                //总价格
                allprice($(this));

            });


            //减少商品数量
            $('#box2').on('click','.btnSub',function(){
                //html(): （等同于原生js中的innerHTML）
                
                //取值div.html()：取得第一个匹配元素的html内容
                var val = $(this).next().html();
                val--;
                if(val <= 1){
                    val = 1;
                }

                //赋值div.html(‘:’)：设置匹配元素的内容
                $(this).next().html(val);

                //小计计算每行总价
                price($(this));//这里的实参指的是加减数量按钮

                var goodslist = Cookie.get('goodslist');
                // var arr = checkAll();//声明变量arr,把函数checknum()赋值给arr,arr作为实参传递给下面两个函数进行调用.

                //总数量
                // allnum(goodslist);
                //总价格
                allprice($(this));

            });


            //计算每行价格
            function price(now){
                //声明单价
                var pri = now.parent().prev().children(1).children(1).next().text();
                pri = pri.slice(1);
                console.log(pri);

                //声明数量
                var num = now.parent().find('span').html();
                console.log(num);
                
                //计算价格
                var all = pri * num;//每行的总价
                console.log(all);
                

            }

            //全选/不选
            // var ischecked = true;
            // $('.allchecked').on('click',function(){
            //     //attr(name[,val]) 设置/获取html标签属性
            //     //prop(attr[,val]) 获取/设置DOM节点属性（一般修改布尔类型属性）
            //     if(ischecked) {
            //         $('.allchecked').prop('checked', 'checked');
            //         $('.good_check input').prop('checked', 'checked');
            //     } else {//removeAttr() 从每一个匹配的元素中删除一个属性
            //         $('.allchecked').removeAttr('checked');
            //         $('.good_check input').removeAttr('checked');
            //     }
            //     ischecked = !ischecked;//更换开关状态

            //     // var arr = checknum();//声明变量arr,把函数checknum()赋值给arr,arr作为实参传递给下面两个函数进行调用.

            //     //总数量
            //     allnum();
            //     //总价格
            //     allprice();
            // })
            
            var $checkbox = $('#box2 ul :checkbox');//表单选择器$(‘:input’),:checkbox //匹配所有复选按钮.

            $('.allchecked').click(function(){
                //prop(attr[,val]) 获取/设置DOM节点属性（一般修改布尔类型属性）
                //console.log(this);//<input type="checkbox" class="allchecked">
                
                $checkbox.prop('checked',this.checked);

            })


            // //勾选的数量
            // function checknum() {
            //     var arr = [];
            //     var le = $('.good_check input').size();//报错,没有找到原因 $(...).size is not a function
            //     //size() 方法返回被 jQuery 选择器匹配的元素的数量。
            //     for(var i = 0; i < le; i++) {
            //         if($('.good_check input').eq(i).prop('checked')) {//prop()获取在匹配的元素集中的第一个元素的属性值。
            //             arr.push(i);
            //         }
            //     }
            //     return arr;
            // }
            
            // function checkAll(){
            //     //获取已勾选的数量
            //     //从所有复选框中筛选出已勾选的复选框
            //     //filter(expr|obj|ele|fn): 筛选出与指定表达式匹配的元素集合。这个方法用于缩小匹配* 的范围。用逗号分隔多个表达式
            //     //:checked //匹配所有被选中的元素(复选框、单选框等，select中的option)
            //     var $checked = $checkbox.filter(':checked');
            //     $('.allchecked').prop('checked',$checked.length === $checkbox.length);
                
            // };


                
            //数量
            function allnum(goodslist){
                var num = 0;
                for(var i=0;i<goodslist.length;i++){
                    num += parseInt($('.quantity').eq(goodslist[i]).html());
                }
                $('.allnum').html('结算('+ num +')');
            }

            //总价
            // function allprice(goodslist){
            //     var price = 0;
            //     var pi = $('.box2_2 p').html().slice(1);
            //     console.log(pi);

            //     var num = $('.quantity').html();
            //     console.log(num);

            //     // for(var i=0;i<goodslist.length;i++){
                    
            //     // }
            //     $('.totalPrice').html('￥'+ price);
            // }


            //总价
            function allprice(now){
                var price = 0;
                var ul = document.querySelector('ul');
                var allLi = ul.children;
                
                var total_price = 0;

                for(var i=0;i<allLi.length;i++){
                    //声明单价
                    var pri = $('#box2').find('ul li').eq(i).find('.box2_2 p').text().slice(1);

                    //声明数量
                    var num = $('#box2').find('ul li').eq(i).find('.box2_3 span').text();

                    var all = parseFloat(pri * num);//每行的总价
                    total_price = total_price + all;
                }

                $('.totalPrice').html('￥'+ total_price);
            }


        });
        

            




    });
});