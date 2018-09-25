<?php
    
    /*
        验证用户有效性
            * 验证用户是否被占用(用户是否存在数据库)
     */
    
    include 'connect.php';//引入连接数据库的php文件

    $username = isset($_GET['username']) ? $_GET['username1'] : null;

    // 编写sql语句
    // 查看表user中username='$username'的数据
    $sql = "select * from user where username='$username'";

    // 执行sql语句
    // 获取查询结果集
    $result = $conn->query($sql);

    // 判断是否获取到数据
    if($result->num_rows>0){//num_rows ：结果集中的数量，用于判断是否查询到结果
        echo "no";
    }else{
        echo "yes";
    }

?>