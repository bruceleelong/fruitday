<?php
    
    include 'connect.php';//require('connect.php');//引入连接数据库的php文件

    // 获取前端参数
    $id = isset($_GET['id']) ? $_GET['id'] : null;

    // 编写sql语句
    $sql = "select * from goodsdetail2 where id='$id'";

    //获取查询结果集
    $result = $conn->query($sql);

    //使用查询结果集,得到一个数组
    $row = $result->fetch_all(MYSQLI_ASSOC);

    //释放结果集,避免资源浪费
    $result->close();

    //关闭数据库,避免资源浪费
    $conn->close();

    //把结果输入到前端
    echo json_encode($row,JSON_UNESCAPED_UNICODE);

?>