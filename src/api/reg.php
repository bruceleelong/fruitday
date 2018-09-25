<?php

    /*
        注册用户

            * 把数据写入数据库
     */
    
    include 'connect.php';//require('connect.php');//引入连接数据库的php文件

    // 获取前端参数
    $username = isset($_GET['username1']) ? $_GET['username1'] : null;
    $password = isset($_GET['password1']) ? $_GET['password1'] : null;

    if($username && $password){
        // 用户有效性验证
        // 编写sql语句
        $sql = "select * from user where username='$username'";//查看表user中username='$username'的数据

        //获取查询结果集
        $result = $conn->query($sql);

        if($result->num_rows>0){
            echo "fail";
        }else{
            // 对密码进行加密
            $password = md5($password);

            // 写入数据库
            $sql = "insert into user(username,password) values('$username','$password')";

            //获取查询结果集
            $result = $conn->query($sql);//返回布尔值,返回true说明注册成功

            if($result){
                echo "success";
            }else{
                echo "fail";
            }
        }
    }else{
        echo "无法获取用户名或密码";
    }
?>