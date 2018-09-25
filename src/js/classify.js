//引入配置文件
require(['config'],function(){
    //引入js模块
    require(['jquery','common'],function($){

        var box = document.querySelector('.box');
        var tab = document.querySelector('.tab');
        var tabItems = tab.children[0].children;
        var tabContents = tab.children[1].children;

        //初始化
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


        box.onclick = function(e){
            e = e || window.event;
            var target = e.target || e.srcElement;
            if(target.className === 'jump'){
                location.href = '../html/list.html';
            }
        }

    });
});