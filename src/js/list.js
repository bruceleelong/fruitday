//引入配置文件
require(['config'],function(){
    //引入js模块
    require(['jquery','common'],function($){

        //返回上一页
        var imgback = document.querySelector('.imgback');
        imgback.onclick = function(){
            history.back();
        }


        //ajax加载数据
        

        // ajax核心步骤
        // 1）创建请求对象
        let xhr = new XMLHttpRequest();

        // 4)在js中处理数据
        xhr.onreadystatechange = ()=>{

            if(xhr.readyState === 4){
                let data = JSON.parse(xhr.responseText);
                let allgoods = document.querySelector('.allgoods');
                allgoods.innerHTML = data.map(item=>{
                    return`<li data-guid="${item.id}" style="height:105px;padding:10px;border-bottom: 1px solid #d8d8d8;">
                    <a href="#" style="display:block;width:100%;height:105px;color: #3a3a3a;">
                        <img src="${item.imgurl}" style="width: 105px;height: 105px;margin-right: 10px;border-radius: 4px;float:left;"/>
                        <p style="background:none;">${item.name}</p>
                        <p style="background:none;">${item.date}</p>
                        <p style="background:none;">
                            <span style="width:0;color: #ff8000;font-size:20px;">${item.price}</span>
                            <img src="${item.imgurl2}"/ style="width:20px;height:20px;float:right;padding:8px;">
                        </p>
                        
                    </a>
                    </li>
                    `
                }).join('');



            }
        }


        // 2）配置参数，建立与服务器的连接
        xhr.open('get','../api/list.php');

        // 3）发送请求
        xhr.send();


        //排序
        let box1 = document.querySelector('.box1');
        let desc = false;
        box1.onclick = e=>{
            // 价格排序
            if(e.target.className === 'sort-price'){
                desc = !desc;

                xhr.open('get','../api/list.php?sort=price' + (desc?'&desc':''),true);
                xhr.send();
            }

            // // // 时间排序(没有效果)
            // if(e.target.className === 'sort-date'){
            //     desc = !desc;
                

            //     xhr.open('get','../api/list.php?sort=date' + (desc?'&desc':''),true);
            //     xhr.send();

            // }
        }

        // //声明一个变量存放点击次数
        // var i=1;
        // function datePaixu(){
        //     //时间从低到高排序
        //     let data = JSON.parse(xhr.responseText);
        //     if(i%2!=0){
        //         data.sort(function(a,b){
        //             return Date.parse(a.date)-Date.parse(b.date);
        //         })
        //         i++;
               
        //     }
        //     //时间从高到低排序
        //     else{
        //         data.sort(function(a,b){
        //             return Date.parse(a.date)-Date.parse(b.date);
        //         })
        //         data.reverse();
        //         i++;
                
        //     }
        // }


        //绑定点击事件,跳转到详情页
        var allgoods = document.querySelector('.allgoods');
        allgoods.onclick = function(e){
            e = e || window.event;
            let target = e.target || e.srcElement;

            //获取当前li
            //先获取当前a标签
            let currenta = target.parentNode;
            // console.log(currenta);
            let currentLi = currenta.parentNode;
            // console.log(currentLi);


            let params = '';
            let guid = currentLi.getAttribute('data-guid');//得到当前id

            params = 'id' + '=' +guid;
            console.log(params);
            location.href = '../html/detail.html?'+params;

        }



    });
});