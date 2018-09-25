//引入配置文件
require(['config'],function(){
    //引入js模块
    require(['jquery','common'],function($){

        var imb = document.querySelector('.imb');
        var tab = document.querySelector('.tab');
        var tabItems = tab.children[0].children;
        var tabContents = tab.children[1].children;

        //点击返回上一页
        imb.onclick = function(){
            history.back();
        }

        //点击商品,详情,评价切换
        for(var i=0;i<tabItems.length;i++){
            if(i===0){
                //高亮mainleft中的第一个div
                tabItems[i].className = 'active';
            }else{
                //隐藏除第一个box1以外的其他box
                tabContents[i].style.display = 'none';
            }

            // 给html元素添加idx属性，保存对应索引值
            tabItems[i].idx = i;

            //点击切换
            tabItems[i].onclick = function(){
                for(var i=0;i<tabItems.length;i++){
                    if(i == this.idx){
                        //高亮当前div
                        tabItems[i].className = 'active';

                        //显示当前box
                        tabContents[i].style.display = 'block';
                    }else{
                        //隐藏其他高亮
                        tabItems[i].className = '';

                        //隐藏其他box
                        tabContents[i].style.display = 'none';
                    }
                }
            }
        }



        //ajax请求,返回数据信息
        //获取首页传递过来的id
        
        let params = location.search;
        console.log(params);
        params = params.slice(1);
        console.log(params);


        // 1）创建请求对象
        let xhr = new XMLHttpRequest();

         // 4)在js中处理数据
        xhr.onreadystatechange = ()=>{
            // 事件会执行4次，但只有在最后一次才确认获取到数据
            if(xhr.readyState === 4){
                let data =JSON.parse(xhr.responseText);

                // // 用对象来保存所有商品信息
                // let goodslist = Cookie.get('goodslist');//[{},{}], ''得到的是每个单独的商品的cookie值//页面刷新也能够保存之前的商品信息cookie

                // if(goodslist === ''){
                //     goodslist = [];
                // }else{
                //     goodslist = JSON.parse(goodslist);
                // }



                // console.log(data);
                
                let box1_1 = document.querySelector('.box1_1');
                // let guid = box1_1.children[0].getAttribute('data-guid');
                //在这里声明会报错(不知道原因),在下面声明不会报错
                //Uncaught TypeError: Cannot read property 'getAttribute' of undefined

                box1_1.innerHTML = data.map(item=>{
                    return `<li data-guid="${item.id}">
                        <img src="${item.imgurl}"/>
                        <h3 class="tom">${item.name}</h3>
                        <h4>${item.name1}</h4>
                        <p class="price">${item.price}</p>
                        <span>${item.name2}</span></li>
                    `
                }).join('');
                console.log(box1_1);


                // let guid = box1_1.children[0].getAttribute('data-guid');//获取当前商品id

                // // 获取商品信息，并写入对象
                // let mygoods = {
                //     guid:guid,
                //     imgurl:box1_1.children[0].children[0].src,
                //     name1:box1_1.children[0].children[1].innerText,
                //     name2:box1_1.children[0].children[2].innerText,
                //     price:box1_1.children[0].children[3].innerText,
                //     name3:box1_1.children[0].children[4].innerText,
                //     qty:1
                // }
                // console.log(mygoods);

                // // 把当前商品写入数组
                // goodslist.push(mygoods);
                // console.log(goodslist);

                // //写入cookie
                // //方法一
                // document.cookie = 'goodslist=' + JSON.stringify(goodslist);
                // console.log(goodslist);


            }
                // var goodslist = Cookie.get('goodslist');
                // console.log(goodslist);
        }

        // 2）配置参数，建立与服务器的连接
        xhr.open('get','../api/detail.php?'+params,true);

        // 3）发送请求
        xhr.send();




        //点击"加入购物车"读取商品信息cookie
        
        // 用对象来保存所有商品信息
        var goodslist = Cookie.get('goodslist');//[{},{}], ''得到的是每个单独的商品的cookie值//页面刷新也能够保存之前的商品信息cookie

        if(goodslist === ''){
            goodslist = [];
        }else{
            goodslist = JSON.parse(goodslist);
        }


        var bottom = document.querySelector('#bottom');
        var quantity = document.querySelector('.quantity');
        var qt = quantity.innerText*1;
        

        bottom.onclick = function(e){
            e = e || window.event;
            var target = e.target || e.srcElement;
            // console.log(target);//span
            
            // 判断是否点击到按钮
            if(target.parentNode.className === 'addtocart'){
                // 把商品信息保存到cookie
                //  * 图片
                //  * 名字
                //  * 价格
                // cookie数量限制：
                //  * 数量：50个
                //  * 只能写入字符串
                // 解决：利用对象保存一个商品


                var box1_1 = document.querySelector('.box1_1');
                
                var currentLi = box1_1.children[0];// 获取当前li
                var guid = currentLi.getAttribute('data-guid');//获取当前商品id

                // 判断商品是否为第一次添加
                for(var i=0;i<goodslist.length;i++){
                    if(goodslist[i].guid === guid){
                        // 如果goodslist中有一个商品跟当前guid一样，说明为多次添加
                        goodslist[i].qty++;
                        break;
                    }
                }



                // 循环跑完，无法找到相同id，说明为第一次添加
                // 如何判断循环跑完
                if(i===goodslist.length){
                    //获取商品信息,并写入对象
                    var mygoods = {
                        guid:guid,
                        imgurl:currentLi.children[0].src,
                        name1:currentLi.children[1].innerText,
                        name2:currentLi.children[2].innerText,
                        price:currentLi.children[3].innerText,
                        name3:currentLi.children[4].innerText,

                        // 商品数量：第一次添加（为1），多次添加（在原来基础上+1）
                        qty:1
                    }
                    // 把当前商品写入数组
                    // goodslist = [];//写入前先清空之前的cookie信息
                    goodslist.push(mygoods);
                    console.log(goodslist);
                }
                


                //写入cookie
                //方法一
                // document.cookie = 'goodslist=' + JSON.stringify(goodslist);
                //方法二
                Cookie.set('goodslist',JSON.stringify(goodslist));

                console.log(goodslist);

                qt+=1;//商品数量加加
                // console.log(qt);
                quantity.innerText = qt;
                // console.log(quantity.innerText);
                
                //阻止a标签默认跳转
                e.preventDefault();
            }



            //跳转到购物车页面
            var toCart = document.querySelector('.tocart');
            if(target.parentNode.className === 'tocart'){
                //获取商品cookie
                // goodslist = Cookie.get('goodslist');
                // console.log(goodslist);
                location.href = '../html/cart.html';

                //阻止a标签默认跳转
                e.preventDefault();
            }
        }

        
    });
});