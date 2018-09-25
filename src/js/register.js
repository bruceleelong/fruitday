//引入配置文件
require(['config'],function(){
    //引入js模块
    require(['jquery','common',],function($){


        //用户注册登录切换
        
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




        //用户注册
        
        var username1 = document.querySelector('#username1');
        var password1 = document.querySelector('#password1');
        var btnReg1 = document.querySelector('.btnReg1');

        let statusCode = [200,304];

        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(statusCode.indexOf(xhr.status)>=0){
        let res = xhr.responseText;
        
                // 获取父元素
                // let formGroup = username1.parentNode;
                let txt1 = document.querySelector('.txt1');

                if(res === 'no'){//用户名注册失败
                    txt1.innerText = '该用户名已注册';
                }else if(res === 'yes'){
                    txt1.innerText = '';
                }
            }
        }

        // 检测用户是否被占用
        username1.onblur = ()=>{
            xhr.open('get','../api/check_user.php?username1='+username1.value,true);
            xhr.send();
        }

        let xhr_reg = new XMLHttpRequest();
        xhr_reg.onload = function(){
            if(statusCode.indexOf(xhr_reg.status)>=0){
                let res = xhr_reg.responseText;
                if(res === 'success'){
                    // location.href = '../index.html';
                    tabItems[0].className = '';
                    tabContents[0].style.display = 'none';
                    tabItems[1].className = 'active';
                    tabContents[1].style.display = 'block';
                }else{
                    alert('注册失败');
                }
            }
        }

        //用户注册
        btnReg1.onclick = function(){
            // 获取用户名，密码
            let _username1 = username1.value;
            let _password1 = password1.value;

            xhr_reg.open('get',`../api/reg.php?username1=${_username1}&password1=${_password1}`,true);
            xhr_reg.send();
        }




        //用户登录
        var username2 = document.querySelector('#username2');
        var password2 = document.querySelector('#password2');
        var btnReg2 = document.querySelector('.btnReg2');

        let statusCode2 = [200,304];

        let xhr2 = new XMLHttpRequest();
        xhr2.onload = function(){
            if(statusCode2.indexOf(xhr2.status)>=0){
                let res = xhr2.responseText;

                if(res == 'success'){
                    location.href = '../index.html';
                }else{
                    alert('用户名或密码错误');
                        
                }
            }
        }

        btnReg2.onclick = function(){
            let _username2 = username2.value;
            let _password2 = password2.value;

            xhr2.open('get',`../api/login.php?username2=${_username2}&password2=${_password2}`,true);
            xhr2.send();
        }


    });
});