<?php

header('content-type:application:json;charset=utf8');  
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');  

$files = $_FILES['theFile']; // 获取传输文件数据
$fileName = iconv('utf-8', 'gbk', $_REQUEST['fileName']);
$destination = 'E:/uploadDir/'; // 存放目录
$totalSize = $_REQUEST['totalSize'];
$isLastChunk = $_REQUEST['isLastChunk'];

if ($files['error'] > 0) {
    $status = 500;
} else { // 文件上传操作

    // 如果文件存在 删除重新上传
    if (file_exists($destination . $fileName) && filesize($destination . $fileName) == $totalSize) {
        unlink($destination . $fileName);
    }

    // FILE_APPEND 防止文件内容被覆盖
    if (!file_put_contents($destination . $fileName, file_get_contents($files['tmp_name']), FILE_APPEND)) {
        $status = 501;
    } else {
        if ($isLastChunk === '1') {
            if (filesize($destination . $fileName) == $totalSize) {
                $status = 200;
            } else {
                $status = 502;
            }
        } else {
            $status = 200;
        }
    }
}

    echo json_encode(array(
            'status' => $status,
            'totalSize' => filesize($destination . $fileName),
            'isLastChunk' => $isLastChunk
        ));

?>