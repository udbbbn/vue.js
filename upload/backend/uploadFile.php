<?php

header('content-type:application:json;charset=utf8');  
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');  

$files = $_FILES['fileInput']; // 获取传输数据
$destination = 'E:/uploadDir/'; // 存放目录
$arr = array();

// 将数组结构改变成所需结构
for ($i=0; $i < count($files['name']); $i++) { 
	$arr[$i]['name'] = $files['name'][$i];
	$arr[$i]['type'] = $files['type'][$i];
	$arr[$i]['tmp_name'] = $files['tmp_name'][$i];
	$arr[$i]['error'] = $files['error'][$i];
	$arr[$i]['size'] = $files['size'][$i];
}

// 改变结构后循环上传文件
for ($i=0; $i < count($arr); $i++) { 
	$fileName = $arr[$i]['name'];
	$fileType = $arr[$i]['type'];
	$fileError = $arr[$i]['type'];
	$fileSize = $arr[$i]['size'];
	$tmpName = $arr[$i]['tmp_name'];


	if ($fileError > 0) { // 发生错误
    //上传文件错误编号判断
    switch ($fileError) {
        case 1:
            $message="上传的文件超过了php.ini 中 upload_max_filesize 选项限制的值。"; 
            break;
        case 2:
            $message="上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值。"; 
            break;
        case 3:
            $message="文件只有部分被上传。"; 
            break;
        case 4:
            $message="没有文件被上传。";
            break;
        case 6:
            $message="找不到临时文件夹。"; 
            break;
        case 7:
            $message="文件写入失败"; 
            break;
        case 8:
            $message="由于PHP的扩展程序中断了文件上传";
            break;
    }
    exit("文件上传失败：".$message);
	}else {
		$fileName = iconv("UTF-8", "GBK", $fileName); // 把iconv抓取到的字符编码从utf-8 转为gbk
		$fileName = str_replace(".", time().".", $fileName); // 在名称后添加时间戳 防止重名覆盖
		if (move_uploaded_file($tmpName, $destination . $fileName)) {
			echo $fileName . "文件上传成功\n";
		}else {
			echo $fileName . "文件上传失败";
		}
	}
}
?>